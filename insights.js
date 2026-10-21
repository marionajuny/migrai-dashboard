/* migrAI insights: statistical helpers and decision-oriented summaries.
   Loaded before app.js. Functions read the shared `state` and `safeNumber` at call time. */

const INSIGHT_SMALL_SAMPLE_FOLDS = 5;
const INSIGHT_BASELINE_MARGIN = 0.1;

function insightMean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function insightObservedLookup(level) {
  const rows = level === "city" ? state.cityObserved : state.observed;
  const lookup = new Map();
  rows.forEach((row) => {
    const value = safeNumber(row.value);
    const year = safeNumber(row.year);
    if (value !== null && year !== null) lookup.set(`${row.entity_id}|${year}`, value);
  });
  return lookup;
}

/* Compares the published model with the naive baseline "repeat the last observed value"
   on the same backtest pairs. `entityId` and `countryIso2` are optional filters. */
function naiveBaselineComparison({ level, horizon, entityId = null, countryIso2 = null }) {
  const lookup = insightObservedLookup(level);
  const pairs = state.backtestPredictions.filter((row) => row.level === level
    && safeNumber(row.horizon) === Number(horizon)
    && (entityId === null || String(row.entity_id) === String(entityId))
    && (countryIso2 === null || String(row.country_iso2 ?? "") === String(countryIso2)));
  const modelErrors = [];
  const naiveErrors = [];
  const folds = new Set();
  const models = new Set();
  pairs.forEach((row) => {
    const actual = safeNumber(row.actual);
    const prediction = safeNumber(row.prediction);
    const baseline = lookup.get(`${row.entity_id}|${safeNumber(row.forecast_origin_year)}`);
    if (actual === null || prediction === null || baseline === undefined) return;
    modelErrors.push(Math.abs(actual - prediction));
    naiveErrors.push(Math.abs(actual - baseline));
    folds.add(String(row.fold_id ?? row.forecast_origin_year));
    models.add(String(row.model_id ?? ""));
  });
  if (!modelErrors.length) return null;
  const modelMae = insightMean(modelErrors);
  const naiveMae = insightMean(naiveErrors);
  const improvement = naiveMae > 0 ? 1 - modelMae / naiveMae : null;
  const isNaiveMethod = [...models].every((model) => /PERSISTENCE/i.test(model)) && Math.abs(modelMae - naiveMae) < 1e-9;
  let verdict = "similar";
  if (isNaiveMethod) verdict = "naive";
  else if (improvement !== null && improvement >= INSIGHT_BASELINE_MARGIN) verdict = "better";
  else if (improvement !== null && improvement <= -INSIGHT_BASELINE_MARGIN) verdict = "worse";
  return {
    pairs: modelErrors.length,
    folds: folds.size,
    modelMae,
    naiveMae,
    improvement,
    verdict,
    smallSample: folds.size < INSIGHT_SMALL_SAMPLE_FOLDS,
  };
}

function naiveBaselineHeadline(result) {
  if (!result) return "Not available";
  if (result.verdict === "naive") return "Uses the naive method";
  const percent = Math.round(Math.abs(result.improvement ?? 0) * 100);
  if (result.verdict === "better") return `${percent}% lower error than naive`;
  if (result.verdict === "worse") return `${percent}% higher error than naive`;
  return "About the same as naive";
}

function naiveBaselineDetail(result) {
  if (!result) return "No verified backtest pairs with a matching last observed value.";
  const sample = `${result.pairs} pairs · ${result.folds} fold${result.folds === 1 ? "" : "s"}`;
  const caution = result.smallSample ? " Small evaluation sample: read with caution." : "";
  if (result.verdict === "naive") return `This horizon repeats the last observed value, so it cannot beat the naive baseline. ${sample}.${caution}`;
  return `Naive = repeat the last observed value. ${sample}.${caution}`;
}

function naiveBaselineTone(result) {
  if (!result) return "none";
  return result.verdict === "better" ? "good" : result.verdict === "worse" ? "bad" : "neutral";
}

/* ---------- Population index (used to express flows per 1,000 residents) ---------- */

const insightPopulation = { byKey: new Map(), latestByEntity: new Map(), loaded: false, loading: false };

async function loadInsightPopulation() {
  if (insightPopulation.loaded || insightPopulation.loading) return;
  insightPopulation.loading = true;
  try {
    const { data, error } = await supabaseClient.from("context_observations_latest")
      .select("entity_id,year,value")
      .eq("level", "country")
      .eq("indicator_id", "country_average_population")
      .limit(1000);
    if (error) return;
    (data ?? []).forEach((row) => {
      const year = safeNumber(row.year);
      const value = safeNumber(row.value);
      if (year === null || value === null || value <= 0) return;
      insightPopulation.byKey.set(`${row.entity_id}|${year}`, value);
      const latest = insightPopulation.latestByEntity.get(String(row.entity_id));
      if (!latest || year > latest.year) insightPopulation.latestByEntity.set(String(row.entity_id), { year, value });
    });
    insightPopulation.loaded = insightPopulation.byKey.size > 0;
  } finally {
    insightPopulation.loading = false;
  }
}

/* Resident population for an entity and year; falls back to the latest published year for later target years. */
function insightPopulationFor(entityId, year) {
  const exact = insightPopulation.byKey.get(`${entityId}|${year}`);
  if (exact !== undefined) return exact;
  const latest = insightPopulation.latestByEntity.get(String(entityId));
  return latest && year > latest.year ? latest.value : null;
}

function insightPerThousand(value, entityId, year) {
  const population = insightPopulationFor(entityId, year);
  return population && Number.isFinite(value) ? value / population * 1000 : null;
}

/* ---------- Executive summary ---------- */

function insightFormatCount(value) {
  const number = Math.abs(value);
  if (number >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (number >= 1e4) return `${Math.round(value / 1e3)}k`;
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value);
}

function insightPercentChange(from, to) {
  return from ? (to - from) / Math.abs(from) * 100 : null;
}

function insightSignedPercent(value, digits = 0) {
  if (value === null || !Number.isFinite(value)) return "n/a";
  return `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(digits)}%`;
}

function insightStdDev(values) {
  const mean = insightMean(values);
  return values.length > 2 ? Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1)) : null;
}

function insightBaselinePhrase(level, horizons) {
  const parts = horizons.map((horizon) => {
    const result = naiveBaselineComparison({ level, horizon });
    if (!result) return null;
    if (result.verdict === "naive") return `${horizon}-year: repeats the last observed value`;
    const percent = Math.round(Math.abs(result.improvement ?? 0) * 100);
    const sample = `${result.folds} fold${result.folds === 1 ? "" : "s"}${result.smallSample ? ", small sample" : ""}`;
    if (result.verdict === "better") return `${horizon}-year: ${percent}% lower error than the naive method (${sample})`;
    if (result.verdict === "worse") return `${horizon}-year: ${percent}% higher error than the naive method (${sample})`;
    return `${horizon}-year: about the same as the naive method (${sample})`;
  }).filter(Boolean);
  return parts.join("; ");
}

function buildCountrySummary(country) {
  const entityId = String(country.id);
  const observations = state.observed
    .filter((row) => String(row.entity_id) === entityId && safeNumber(row.year) !== null && safeNumber(row.value) !== null)
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
  const latest = observations.at(-1);
  const forecasts = state.forecasts
    .filter((row) => String(row.entity_id) === entityId && forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null)
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const items = [];
  if (!latest) return [{ title: "Where it stands", text: `No valid observed immigration values are published for ${country.name}.` }];

  const latestYear = safeNumber(latest.year);
  const latestValue = safeNumber(latest.value);
  const peers = state.observed.filter((row) => safeNumber(row.year) === latestYear && safeNumber(row.value) !== null);
  const rank = peers.filter((row) => safeNumber(row.value) > latestValue).length + 1;
  const reference = observations.find((row) => safeNumber(row.year) === latestYear - 5) ?? observations[0];
  const referenceYear = safeNumber(reference.year);
  const change = referenceYear < latestYear ? insightPercentChange(safeNumber(reference.value), latestValue) : null;
  const rate = insightPerThousand(latestValue, entityId, latestYear);
  items.push({
    title: "Where it stands",
    text: `${country.name} recorded ${insightFormatCount(latestValue)} immigrants in ${latestYear}${rate !== null ? ` (${rate.toFixed(1)} per 1,000 residents)` : ""}, ranking ${rank} of ${peers.length} countries${change !== null ? `. That is ${insightSignedPercent(change)} versus ${referenceYear}` : ""}.`,
  });

  if (forecasts.length) {
    const lines = forecasts.map((row) => {
      const value = safeNumber(row.prediction);
      const delta = insightPercentChange(latestValue, value);
      return `${safeNumber(row.target_year)}: ${insightFormatCount(value)} (${insightSignedPercent(delta)})`;
    });
    const repeats = forecasts.some((row) => /PERSISTENCE/i.test(forecastModelLabel(row)));
    items.push({
      title: "What the models say",
      text: `Projected annual immigration, with change versus ${latestYear} — ${lines.join(" · ")}.${repeats ? " The 1-year figure repeats the last observed value, so read it as “no change assumed”, not as a prediction of stability." : ""}`,
    });
  } else {
    items.push({ title: "What the models say", text: "No valid forecasts are published for this country." });
  }

  const trust = insightBaselinePhrase("country", forecasts.map((row) => safeNumber(row.horizon)));
  items.push({
    title: "How much to trust it",
    text: trust
      ? `Backtest versus the naive method (“repeat the last value”) for all countries — ${trust}. These are selection-backtest results, not an independent test; intervals have no published coverage check.`
      : "No verified backtest comparison is available for these horizons.",
  });

  const watch = [];
  const h3 = forecasts.find((row) => safeNumber(row.horizon) === 3);
  const h5 = forecasts.find((row) => safeNumber(row.horizon) === 5);
  if (h3 && h5 && safeNumber(h5.prediction) < safeNumber(h3.prediction) * 0.8) {
    watch.push(`The 5-year projection (${insightFormatCount(safeNumber(h5.prediction))}) is lower than the 3-year one (${insightFormatCount(safeNumber(h3.prediction))}); each horizon uses a different method, so the path between them is not a single trajectory.`);
  }
  const wide = forecasts.filter((row) => {
    const bounds = intervalBounds(row, 95);
    const prediction = safeNumber(row.prediction);
    return bounds && prediction > 0 && (bounds.upper - bounds.lower) / prediction > 1;
  });
  if (wide.length) {
    watch.push(`The 95% ranges are wider than the forecast itself for the ${wide.map((row) => `${safeNumber(row.horizon)}-year`).join(", ")} horizon${wide.length === 1 ? "" : "s"} (for example ${insightFormatCount(intervalBounds(wide[0], 95).lower)} to ${insightFormatCount(intervalBounds(wide[0], 95).upper)} for ${safeNumber(wide[0].target_year)}): plan around ranges, not single figures.`);
  }
  const changes = [];
  for (let index = 1; index < observations.length; index += 1) {
    if (safeNumber(observations[index].year) === safeNumber(observations[index - 1].year) + 1 && safeNumber(observations[index - 1].value) > 0) {
      changes.push(Math.log(safeNumber(observations[index].value) / safeNumber(observations[index - 1].value)));
    }
  }
  if (changes.length > 4) {
    const history = changes.slice(0, -1);
    const spread = insightStdDev(history);
    const lastChange = changes.at(-1);
    if (spread && Math.abs(lastChange - insightMean(history)) / spread > 2) {
      watch.push(`The latest yearly change (${insightSignedPercent((Math.exp(lastChange) - 1) * 100)}) is unusual compared with this country's own history.`);
    }
  }
  items.push({
    title: "What to watch",
    text: watch.length ? watch.join(" ") : "No automatic warnings: the latest change, the horizon path and the interval widths are within normal ranges for this country.",
    tone: watch.length ? "alert" : "ok",
  });
  return items;
}

function buildCitySummary(city, observations, forecasts, contextRows = []) {
  const items = [];
  const latest = observations.at(-1);
  if (!latest) return [{ title: "Where it stands", text: `No valid observed foreign-resident share is published for ${city.name}.` }];
  const latestYear = safeNumber(latest.year);
  const value = safeNumber(latest.value);
  const allCities = cityRecordsAcrossCountries().cities;
  const latestValues = allCities.map((item) => cityObservationSeries(item).at(-1)).filter(Boolean);
  const rank = latestValues.filter((point) => point.value > value).length + 1;
  const reference = observations.find((row) => row.year === latestYear - 5);
  const delta = reference ? value - reference.value : null;
  items.push({
    title: "Where it stands",
    text: `Foreign residents made up ${value.toFixed(1)}% of ${city.name}'s population in ${latestYear}, ranking ${rank} of ${latestValues.length} cities by latest value${delta !== null ? `, ${delta >= 0 ? "up" : "down"} ${Math.abs(delta).toFixed(1)} percentage points since ${reference.year}` : ""}. Latest years differ between cities.`,
  });

  const available = forecasts.filter(Boolean);
  const currentYear = new Date().getFullYear();
  if (available.length) {
    const lines = available.map((row) => `${safeNumber(row.target_year)}: ${safeNumber(row.prediction).toFixed(1)}% (${safeNumber(row.prediction) - value >= 0 ? "+" : "−"}${Math.abs(safeNumber(row.prediction) - value).toFixed(2)} pp)`);
    const elapsed = available.filter((row) => safeNumber(row.target_year) < currentYear);
    items.push({
      title: "What the model says",
      text: `Projected foreign-resident share — ${lines.join(" · ")}.${elapsed.length ? ` Target year${elapsed.length > 1 ? "s" : ""} ${elapsed.map((row) => safeNumber(row.target_year)).join(" and ")} ${elapsed.length > 1 ? "have" : "has"} already passed: use these as a model snapshot for comparison with actual data, not as a forward-looking estimate.` : ""}`,
    });
  } else {
    items.push({ title: "What the model says", text: "No City forecast is published for this city." });
  }

  const trust = [1, 3].map((horizon) => {
    const result = naiveBaselineComparison({ level: "city", horizon, entityId: city.id, countryIso2: city.countryId });
    if (!result) return null;
    const percent = Math.round(Math.abs(result.improvement ?? 0) * 100);
    const sample = `${result.folds} fold${result.folds === 1 ? "" : "s"}${result.smallSample ? ", small sample" : ""}`;
    return `${horizon}-year: ${result.verdict === "better" ? `${percent}% lower error than` : result.verdict === "worse" ? `${percent}% higher error than` : "about the same as"} the naive method (${sample})`;
  }).filter(Boolean);
  items.push({
    title: "How much to trust it",
    text: trust.length ? `Backtest versus “repeat the last value” for this city — ${trust.join("; ")}. Selection-backtest results, not an independent test.` : "No verified backtest comparison is available for this city.",
  });

  const context = [];
  const latestContext = (id) => contextRows.filter((row) => row.indicator_id === id && safeNumber(row.value) !== null).sort((a, b) => safeNumber(b.year) - safeNumber(a.year));
  const housing = latestContext("city_housing_price");
  if (housing.length > 1) {
    const past = housing.find((row) => safeNumber(row.year) <= safeNumber(housing[0].year) - 5);
    if (past) context.push(`residential prices are ${insightSignedPercent(insightPercentChange(safeNumber(past.value), safeNumber(housing[0].value)))} since ${safeNumber(past.year)} (${Math.round(safeNumber(housing[0].value))} EUR/m² in ${safeNumber(housing[0].year)})`);
  }
  const unemployment = latestContext("nuts2_unemployment_rate");
  if (unemployment.length) context.push(`regional unemployment is ${safeNumber(unemployment[0].value).toFixed(1)}% (${safeNumber(unemployment[0].year)})`);
  const seniors = latestContext("city_65plus_share");
  if (seniors.length) context.push(`${safeNumber(seniors[0].value).toFixed(1)}% of residents are aged 65+ (${safeNumber(seniors[0].year)})`);
  items.push({
    title: "Local context",
    text: context.length ? `Alongside this share: ${context.join("; ")}. These are co-occurring conditions, not explanations of the foreign-resident share.` : "Local context indicators are loading or not published for this city.",
  });
  return items;
}

function renderSummaryItems(container, items) {
  if (!container) return;
  container.replaceChildren();
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "exec-summary__item";
    if (item.tone) article.dataset.tone = item.tone;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const text = document.createElement("p");
    text.textContent = item.text;
    article.append(title, text);
    container.append(article);
  });
}

/* ---------- Correlations between indicators and immigration ---------- */

const CORRELATION_EXCLUDED = new Set(["country_net_migration_adjusted_rate"]);
const CORRELATION_LAGS = [0, 1, 2];
const insightContext = { series: null, labels: null, loading: null, failed: false };

async function loadAllCountryContext() {
  if (insightContext.series) return true;
  if (insightContext.loading) return insightContext.loading;
  insightContext.loading = (async () => {
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await supabaseClient.from("context_observations_latest")
        .select("entity_id,year,indicator_id,indicator_label,family,unit,value")
        .eq("level", "country")
        .order("entity_id").order("indicator_id").order("year")
        .range(from, from + 999);
      if (error) { insightContext.failed = true; return false; }
      rows.push(...(data ?? []));
      if ((data ?? []).length < 1000) break;
    }
    const series = new Map();
    const labels = new Map();
    rows.forEach((row) => {
      const value = safeNumber(row.value);
      const year = safeNumber(row.year);
      if (value === null || year === null) return;
      if (!series.has(row.indicator_id)) series.set(row.indicator_id, new Map());
      series.get(row.indicator_id).set(`${row.entity_id}|${year}`, value);
      labels.set(row.indicator_id, { label: row.indicator_label, family: row.family, unit: row.unit });
    });
    insightContext.series = series;
    insightContext.labels = labels;
    insightContext.failed = false;
    return true;
  })();
  const ok = await insightContext.loading;
  insightContext.loading = null;
  return ok;
}

function pearson(xs, ys) {
  const n = xs.length;
  if (n < 4) return null;
  const mx = insightMean(xs);
  const my = insightMean(ys);
  let sxx = 0; let syy = 0; let sxy = 0;
  for (let index = 0; index < n; index += 1) {
    sxx += (xs[index] - mx) ** 2;
    syy += (ys[index] - my) ** 2;
    sxy += (xs[index] - mx) * (ys[index] - my);
  }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
}

/* Two-sided 5% test using the Fisher transform. Indicative only: pooled country-years are not fully independent. */
function correlationIsSignificant(r, n) {
  if (r === null || n < 8) return false;
  const clipped = Math.max(-0.9999, Math.min(0.9999, r));
  return Math.abs(Math.atanh(clipped)) * Math.sqrt(n - 3) > 1.96;
}

function correlationStrength(r) {
  const magnitude = Math.abs(r);
  return magnitude < 0.2 ? "very weak" : magnitude < 0.4 ? "weak" : magnitude < 0.6 ? "moderate" : "strong";
}

function insightIsLevelUnit(unit) {
  return /pps|persons|eur/i.test(unit ?? "") && !/per 1,000|%/i.test(unit ?? "");
}

/* Year-over-year change of an indicator at (entity, year); log-change for level units, difference for rates. */
function indicatorChange(indicatorId, entityId, year) {
  const series = insightContext.series.get(indicatorId);
  const now = series?.get(`${entityId}|${year}`);
  const before = series?.get(`${entityId}|${year - 1}`);
  if (now === undefined || before === undefined) return null;
  if (insightIsLevelUnit(insightContext.labels.get(indicatorId)?.unit)) return now > 0 && before > 0 ? Math.log(now / before) : null;
  return now - before;
}

function immigrationChange(entityId, year, lookup) {
  const now = lookup.get(`${entityId}|${year}`);
  const before = lookup.get(`${entityId}|${year - 1}`);
  return now > 0 && before > 0 ? Math.log(now / before) : null;
}

function computeCorrelationTable({ entityId = null, removeYearEffects = true }) {
  const lookup = new Map();
  state.observed.forEach((row) => {
    const value = safeNumber(row.value);
    const year = safeNumber(row.year);
    if (value !== null && year !== null) lookup.set(`${row.entity_id}|${year}`, value);
  });
  const entities = entityId ? [String(entityId)] : [...new Set(state.observed.map((row) => String(row.entity_id)))];
  const years = [...new Set(state.observed.map((row) => safeNumber(row.year)).filter((year) => year !== null))].sort((a, b) => a - b);
  const rows = [];
  insightContext.labels.forEach((meta, indicatorId) => {
    if (CORRELATION_EXCLUDED.has(indicatorId)) return;
    const cells = CORRELATION_LAGS.map((lag) => {
      const points = [];
      entities.forEach((entity) => years.forEach((year) => {
        const y = immigrationChange(entity, year, lookup);
        const x = indicatorChange(indicatorId, entity, year - lag);
        if (x !== null && y !== null) points.push({ entity, year, x, y });
      }));
      let xs = points.map((point) => point.x);
      let ys = points.map((point) => point.y);
      if (removeYearEffects && !entityId) {
        const byYear = new Map();
        points.forEach((point) => {
          if (!byYear.has(point.year)) byYear.set(point.year, []);
          byYear.get(point.year).push(point);
        });
        xs = []; ys = [];
        byYear.forEach((group) => {
          if (group.length < 3) return;
          const mx = insightMean(group.map((point) => point.x));
          const my = insightMean(group.map((point) => point.y));
          group.forEach((point) => { xs.push(point.x - mx); ys.push(point.y - my); });
        });
      }
      const r = pearson(xs, ys);
      return { lag, r, n: xs.length, significant: correlationIsSignificant(r, xs.length) };
    });
    rows.push({ indicatorId, ...meta, cells });
  });
  return rows.sort((a, b) => Math.max(...b.cells.map((cell) => Math.abs(cell.r ?? 0))) - Math.max(...a.cells.map((cell) => Math.abs(cell.r ?? 0))));
}

function correlationSentence(row, cell, scopeLabel) {
  const timing = cell.lag === 0 ? "same year" : `${cell.lag} year${cell.lag === 1 ? "" : "s"} earlier`;
  const direction = cell.r > 0 ? "tended to move together" : "tended to move in opposite directions";
  const sign = cell.r < 0 ? "−" : "";
  return `${scopeLabel}: changes in ${row.label} (${timing}) and changes in immigration ${direction} — ${correlationStrength(cell.r)} link (r = ${sign}${Math.abs(cell.r).toFixed(2)}, n = ${cell.n}).`;
}

async function renderCorrelationPanel() {
  const container = document.querySelector("#contextCorrelationTable");
  if (!container) return;
  const scope = document.querySelector("#correlationScope").value;
  const removeYearEffects = document.querySelector("#correlationYearEffects").checked;
  const summary = document.querySelector("#correlationSummary");
  const note = document.querySelector("#correlationNote");
  container.replaceChildren();
  summary.textContent = "Loading contextual indicators…";
  const ok = await loadAllCountryContext();
  if (!ok) {
    summary.textContent = "Contextual indicators could not be loaded, so correlations are unavailable.";
    return;
  }
  const country = scope === "country" ? countryById(state.activeContextCountry) : null;
  if (scope === "country" && !country) {
    summary.textContent = "Select a country in the controls above to see its own relationships.";
    return;
  }
  const rows = computeCorrelationTable({ entityId: country ? country.id : null, removeYearEffects });
  const scopeLabel = country ? country.name : "Across Europe";
  document.querySelector("#correlationYearEffectsWrap").hidden = Boolean(country);

  const candidates = rows.flatMap((row) => row.cells.map((cell) => ({ row, cell })))
    .filter(({ cell }) => cell.r !== null && cell.significant)
    .sort((a, b) => Math.abs(b.cell.r) - Math.abs(a.cell.r));
  const seen = new Set();
  const top = candidates.filter(({ row }) => (seen.has(row.indicatorId) ? false : seen.add(row.indicatorId))).slice(0, 3);
  summary.replaceChildren();
  const strongest = Math.max(0, ...rows.flatMap((row) => row.cells.map((cell) => Math.abs(cell.r ?? 0))));
  if (top.length) {
    if (strongest < 0.4) {
      const lead = document.createElement("p");
      lead.className = "correlation-lead";
      lead.textContent = `No strong relationships: the strongest correlation is only ${strongest.toFixed(2)}. Contextual indicators on their own explain little of the year-to-year swings in immigration, so treat the links below as hints to investigate.`;
      summary.append(lead);
    }
    const list = document.createElement("ul");
    list.className = "correlation-findings";
    top.forEach(({ row, cell }) => {
      const item = document.createElement("li");
      item.textContent = correlationSentence(row, cell, scopeLabel);
      list.append(item);
    });
    summary.append(list);
  } else {
    summary.textContent = `${scopeLabel}, no indicator shows a statistically distinguishable link with yearly changes in immigration in this sample. That is a result in itself: it does not prove there is no relationship.`;
  }

  const table = document.createElement("table");
  table.className = "correlation-table";
  const head = table.createTHead().insertRow();
  ["Indicator", "Same year", "1 year earlier", "2 years earlier", "Sample"].forEach((label) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label;
    head.append(th);
  });
  const body = table.createTBody();
  rows.forEach((row) => {
    const tr = body.insertRow();
    const name = document.createElement("th");
    name.scope = "row";
    const title = document.createElement("strong");
    title.textContent = row.label;
    const family = document.createElement("small");
    family.textContent = row.family;
    name.append(title, family);
    tr.append(name);
    row.cells.forEach((cell) => {
      const td = tr.insertCell();
      if (cell.r === null) { td.textContent = "n/a"; td.className = "correlation-cell correlation-cell--empty"; return; }
      td.className = `correlation-cell${cell.significant ? " correlation-cell--significant" : ""}`;
      const alpha = Math.min(0.75, Math.abs(cell.r) * 1.5);
      td.style.background = cell.r >= 0 ? `rgba(245, 160, 105, ${alpha})` : `rgba(95, 181, 212, ${alpha})`;
      td.textContent = `${cell.r > 0 ? "+" : cell.r < 0 ? "−" : ""}${Math.abs(cell.r).toFixed(2)}${cell.significant ? " ●" : ""}`;
      td.title = `r = ${cell.r.toFixed(3)} · n = ${cell.n} · ${correlationStrength(cell.r)}${cell.significant ? " · statistically distinguishable from zero (5%, indicative)" : " · not distinguishable from zero"}`;
    });
    const sample = tr.insertCell();
    sample.className = "correlation-sample";
    sample.textContent = `n = ${Math.min(...row.cells.map((cell) => cell.n))}–${Math.max(...row.cells.map((cell) => cell.n))}`;
  });
  container.append(table);
  note.textContent = `Pearson correlation of year-over-year changes (not levels, which share long-run trends). Orange = move together, blue = move in opposite directions; ● = distinguishable from zero at 5% (indicative only, observations are not fully independent). ${country ? `Only ${country.name}'s own years are used, so samples are small.` : removeYearEffects ? "Europe-wide yearly shocks (for example 2022) are removed so the table compares countries within each year." : "Europe-wide yearly shocks are included, which can inflate links driven by events such as 2022."} “Net migration and statistical adjustment” is excluded because it overlaps with the immigration target. Correlation is not causation.`;
}

/* Statistics shown under the single-country scatter plot. */
function insightPairStats(pairs) {
  const levels = { r: pearson(pairs.map((point) => point.x), pairs.map((point) => point.y)), n: pairs.length };
  const sorted = [...pairs].sort((a, b) => a.year - b.year);
  const dx = []; const dy = [];
  for (let index = 1; index < sorted.length; index += 1) {
    if (sorted[index].year === sorted[index - 1].year + 1 && sorted[index].y > 0 && sorted[index - 1].y > 0) {
      dx.push(sorted[index].x - sorted[index - 1].x);
      dy.push(Math.log(sorted[index].y / sorted[index - 1].y));
    }
  }
  return { levels, changes: { r: pearson(dx, dy), n: dx.length } };
}

function insightRegressionLine(pairs) {
  const mx = insightMean(pairs.map((point) => point.x));
  const my = insightMean(pairs.map((point) => point.y));
  let sxx = 0; let sxy = 0;
  pairs.forEach((point) => { sxx += (point.x - mx) ** 2; sxy += (point.x - mx) * (point.y - my); });
  if (!sxx) return null;
  const slope = sxy / sxx;
  return { slope, intercept: my - slope * mx };
}

function insightScatterSentence(stats) {
  const fmt = (item) => (item.r === null ? "n/a" : `${item.r > 0 ? "+" : item.r < 0 ? "−" : ""}${Math.abs(item.r).toFixed(2)}`);
  return `Levels r = ${fmt(stats.levels)} (n = ${stats.levels.n}; inflated when both series trend over time) · Yearly changes r = ${fmt(stats.changes)} (n = ${stats.changes.n}; the more reliable reading).`;
}

document.addEventListener("DOMContentLoaded", () => {
  ["#correlationScope", "#correlationYearEffects"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("change", () => renderCorrelationPanel());
  });
});

/* ---------- Alerts (European Outlook) ---------- */

const ALERT_LARGE_PROJECTION_PERCENT = 50;

function insightCountrySignals(entityId, name) {
  const observations = state.observed
    .filter((row) => String(row.entity_id) === String(entityId) && safeNumber(row.year) !== null && safeNumber(row.value) !== null)
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
  const latest = observations.at(-1);
  if (!latest) return [];
  const forecasts = state.forecasts
    .filter((row) => String(row.entity_id) === String(entityId) && forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null)
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const signals = [];
  const changes = [];
  for (let index = 1; index < observations.length; index += 1) {
    if (safeNumber(observations[index].year) === safeNumber(observations[index - 1].year) + 1 && safeNumber(observations[index - 1].value) > 0) {
      changes.push(Math.log(safeNumber(observations[index].value) / safeNumber(observations[index - 1].value)));
    }
  }
  if (changes.length > 4) {
    const history = changes.slice(0, -1);
    const spread = insightStdDev(history);
    const lastChange = changes.at(-1);
    const zScore = spread ? (lastChange - insightMean(history)) / spread : 0;
    if (Math.abs(zScore) > 2) {
      signals.push({ severity: 3, magnitude: Math.abs(zScore), title: lastChange > 0 ? "Unusual rise" : "Unusual drop", detail: `${name}: ${insightSignedPercent((Math.exp(lastChange) - 1) * 100)} in ${safeNumber(latest.year)}, far outside its own yearly pattern (${Math.abs(zScore).toFixed(1)} standard deviations).` });
    }
  }
  const latestValue = safeNumber(latest.value);
  const large = forecasts
    .map((row) => ({ row, change: insightPercentChange(latestValue, safeNumber(row.prediction)) }))
    .filter((item) => item.change !== null && Math.abs(item.change) >= ALERT_LARGE_PROJECTION_PERCENT && safeNumber(item.row.horizon) > 1)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))[0];
  if (large) {
    signals.push({ severity: 2, magnitude: Math.abs(large.change) / 100, title: "Large projected change", detail: `${name}: ${insightSignedPercent(large.change)} by ${safeNumber(large.row.target_year)} (${safeNumber(large.row.horizon)}-year model). Check the interval before acting on it.` });
  }
  const h3 = forecasts.find((row) => safeNumber(row.horizon) === 3);
  const h5 = forecasts.find((row) => safeNumber(row.horizon) === 5);
  if (h3 && h5 && safeNumber(h5.prediction) < safeNumber(h3.prediction) * 0.8) {
    signals.push({ severity: 1, magnitude: 1 - safeNumber(h5.prediction) / safeNumber(h3.prediction), title: "Inconsistent horizons", detail: `${name}: the 5-year projection is ${Math.round((1 - safeNumber(h5.prediction) / safeNumber(h3.prediction)) * 100)}% lower than the 3-year one because each horizon uses a different method.` });
  }
  return signals.map((signal) => ({ ...signal, entityId: String(entityId), name }));
}

function renderOutlookAlerts() {
  const container = document.querySelector("#outlookAlerts");
  if (!container) return;
  container.replaceChildren();
  const alerts = listCountries().flatMap((country) => insightCountrySignals(country.id, country.name))
    .sort((a, b) => b.severity - a.severity || b.magnitude - a.magnitude);
  const subtitle = document.querySelector("#outlookAlertsSubtitle");
  if (!alerts.length) {
    subtitle.textContent = "No country currently triggers an alert";
    return;
  }
  subtitle.textContent = `${alerts.length} signal${alerts.length === 1 ? "" : "s"} across ${new Set(alerts.map((alert) => alert.entityId)).size} countries · rule-based, from published values`;
  const largeCount = new Set(alerts.filter((alert) => alert.title === "Large projected change").map((alert) => alert.entityId)).size;
  const total = listCountries().length;
  if (largeCount >= 8) {
    const lead = document.createElement("p");
    lead.className = "alerts-lead";
    lead.textContent = `${largeCount} of ${total} countries have projections beyond ±${ALERT_LARGE_PROJECTION_PERCENT}%. When this many countries move together, treat it as a feature of the extrapolation models rather than country-specific news, and prioritise the unusual-change and inconsistency flags.`;
    container.append(lead);
  }
  alerts.slice(0, 8).forEach((alert) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `alert-item alert-item--${alert.severity}`;
    const badge = document.createElement("span");
    badge.className = "alert-item__badge";
    badge.textContent = alert.severity === 3 ? "HIGH" : alert.severity === 2 ? "MEDIUM" : "LOW";
    const text = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = alert.title;
    const detail = document.createElement("small");
    detail.textContent = alert.detail;
    text.append(title, detail);
    button.append(badge, text);
    button.addEventListener("click", () => { selectCountry(alert.entityId); navigateToDashboardPage("country-intelligence"); });
    container.append(button);
  });
}

/* ---------- Export and sharing ---------- */

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(filename, header, rows) {
  const body = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`﻿${body}\n`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const EXPORT_HEADER = ["level", "entity_id", "entity_name", "record_type", "year", "value", "unit", "horizon", "model_id", "lower_80", "upper_80", "lower_95", "upper_95", "forecast_status", "run_id"];

function exportRowsFor(level, entityName, observed, forecasts, unit) {
  const rows = observed.filter((row) => safeNumber(row.value) !== null).map((row) => [level, row.entity_id, entityName, "observed", row.year, row.value, unit, "", "", "", "", "", "", "", ""]);
  forecasts.forEach((row) => rows.push([level, row.entity_id, entityName, "forecast", row.target_year, row.prediction, unit, row.horizon, row.model_id, row.lower_80, row.upper_80, row.lower_95, row.upper_95, row.forecast_status, row.run_id]));
  return rows;
}

function exportCountryCsv() {
  const country = currentCountry();
  if (!country) return;
  const observed = state.observed.filter((row) => String(row.entity_id) === String(country.id)).sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
  const forecasts = state.forecasts.filter((row) => String(row.entity_id) === String(country.id)).sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  downloadCsv(`migrai-country-${country.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`, EXPORT_HEADER, exportRowsFor("country", country.name, observed, forecasts, "persons per year"));
}

function currentCityRecord() {
  return cityRecordsAcrossCountries().cities.find((item) => item.id === state.selectedCity && item.countryId === state.selectedCountry) ?? null;
}

function exportCityCsv() {
  const city = currentCityRecord();
  if (!city) return;
  const observed = city.observed.slice().sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
  const forecasts = city.forecasts.slice().sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  downloadCsv(`migrai-city-${city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`, EXPORT_HEADER, exportRowsFor("city", city.name, observed, forecasts, "% of residents"));
}

async function copyShareLink(button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.textContent = "Link copied";
  } catch {
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => { button.textContent = original; }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#countryExportCsv")?.addEventListener("click", exportCountryCsv);
  document.querySelector("#cityExportCsv")?.addEventListener("click", exportCityCsv);
  document.querySelectorAll(".js-copy-link").forEach((button) => button.addEventListener("click", () => copyShareLink(button)));
});

/* ---------- One-page report (print to PDF) ---------- */

function reportRangeText(row, level, formatter) {
  const bounds = intervalBounds(row, level);
  return bounds ? `${formatter(bounds.lower)} – ${formatter(bounds.upper)}` : "—";
}

function printReport({ title, subtitle, items, rows, valueLabel, formatter }) {
  document.querySelector("#printReport")?.remove();
  const run = state.runs.find((item) => item.is_latest) ?? state.runs[0];
  const root = document.createElement("section");
  root.id = "printReport";
  const heading = document.createElement("header");
  const brand = document.createElement("p");
  brand.className = "print-report__brand";
  brand.textContent = "migrAI · Migration intelligence";
  const h1 = document.createElement("h1");
  h1.textContent = title;
  const sub = document.createElement("p");
  sub.className = "print-report__sub";
  sub.textContent = `${subtitle} · Run ${run?.run_label ?? run?.run_id ?? "n/a"} · Generated ${new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}`;
  heading.append(brand, h1, sub);
  root.append(heading);

  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "print-report__item";
    const h2 = document.createElement("h2");
    h2.textContent = item.title;
    const text = document.createElement("p");
    text.textContent = item.text;
    block.append(h2, text);
    root.append(block);
  });

  const table = document.createElement("table");
  const head = table.createTHead().insertRow();
  ["Year", "Type", valueLabel, "80% range", "95% range", "Method"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    head.append(th);
  });
  const body = table.createTBody();
  rows.forEach((row) => {
    const tr = body.insertRow();
    [row.year, row.type, formatter(row.value), row.r80, row.r95, row.method].forEach((value) => { tr.insertCell().textContent = value; });
  });
  root.append(table);

  const note = document.createElement("p");
  note.className = "print-report__note";
  note.textContent = "Estimates are analytical and descriptive; they are not guarantees. Accuracy figures come from the model-selection backtest, not an independent holdout, and intervals have no published coverage check. Correlation is not causation. Source: migrAI dashboard, protected Supabase views.";
  root.append(note);
  document.body.append(root);
  const cleanup = () => { root.remove(); window.removeEventListener("afterprint", cleanup); };
  window.addEventListener("afterprint", cleanup);
  window.print();
}

function printCountryReport() {
  const country = currentCountry();
  if (!country) return;
  const observed = state.observed.filter((row) => String(row.entity_id) === String(country.id) && safeNumber(row.value) !== null)
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year)).slice(-8);
  const forecasts = state.forecasts.filter((row) => String(row.entity_id) === String(country.id) && forecastIsAvailable(row))
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const format = (value) => new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value);
  printReport({
    title: `${country.name}: immigration outlook`,
    subtitle: "Annual immigration, persons per year",
    items: buildCountrySummary(country),
    valueLabel: "Persons per year",
    formatter: format,
    rows: [
      ...observed.map((row) => ({ year: row.year, type: "Observed", value: safeNumber(row.value), r80: "—", r95: "—", method: "—" })),
      ...forecasts.map((row) => ({ year: row.target_year, type: `Forecast (${row.horizon}y)`, value: safeNumber(row.prediction), r80: reportRangeText(row, 80, format), r95: reportRangeText(row, 95, format), method: modelDisplayName(forecastModelLabel(row)) })),
    ],
  });
}

function printCityReport() {
  const city = currentCityRecord();
  if (!city) return;
  const observations = cityObservationSeries(city);
  const forecasts = cityForecastSeries(city).filter(Boolean);
  const format = (value) => `${Number(value).toFixed(2)}%`;
  printReport({
    title: `${city.name}: foreign-resident share outlook`,
    subtitle: "Foreign residents, % of city population",
    items: buildCitySummary(city, observations, cityForecastSeries(city), state.contextCache.get(contextEntityCacheKey("city", city.id, city.countryId)) ?? []),
    valueLabel: "% of residents",
    formatter: format,
    rows: [
      ...observations.slice(-8).map((row) => ({ year: row.year, type: "Observed", value: row.value, r80: "—", r95: "—", method: "—" })),
      ...forecasts.map((row) => ({ year: row.target_year, type: `Forecast (${row.horizon}y)`, value: safeNumber(row.prediction), r80: reportRangeText(row, 80, format), r95: reportRangeText(row, 95, format), method: forecastModelLabel(row) || "—" })),
    ],
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#countryReportPdf")?.addEventListener("click", printCountryReport);
  document.querySelector("#cityReportPdf")?.addEventListener("click", printCityReport);
});
