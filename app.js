const SUPABASE_URL = "https://tiappaimkcdwgvvfdmda.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FlW59YdTdC-TUsH2pmwLfQ_pjsNa_sn";
const SITE_URL = "https://marionajuny.github.io/migrai-dashboard/";
const PASSWORD_RECOVERY_URL = new URL("?flow=recovery", SITE_URL).toString();
const PASSWORD_SETUP_FLOW = (() => {
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.slice(1));
  return query.get("flow") === "recovery" || ["recovery", "invite"].includes(hash.get("type"));
})();
let passwordSetupFlow = PASSWORD_SETUP_FLOW;

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  db: { schema: "migrai" },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

const ui = {
  authView: document.querySelector("#authView"),
  passwordView: document.querySelector("#passwordView"),
  dashboardView: document.querySelector("#dashboardView"),
  sessionControls: document.querySelector("#sessionControls"),
  sessionEmail: document.querySelector("#sessionEmail"),
  loginForm: document.querySelector("#loginForm"),
  emailInput: document.querySelector("#emailInput"),
  passwordInput: document.querySelector("#passwordInput"),
  resetButton: document.querySelector("#resetButton"),
  authMessage: document.querySelector("#authMessage"),
  passwordForm: document.querySelector("#passwordForm"),
  newPasswordInput: document.querySelector("#newPasswordInput"),
  repeatPasswordInput: document.querySelector("#repeatPasswordInput"),
  passwordMessage: document.querySelector("#passwordMessage"),
  logoutButton: document.querySelector("#logoutButton"),
  runSummary: document.querySelector("#runSummary"),
  connectionBadge: document.querySelector("#connectionBadge"),
  levelFilter: document.querySelector("#levelFilter"),
  entityFilter: document.querySelector("#entityFilter"),
  horizonFilter: document.querySelector("#horizonFilter"),
  observedMetric: document.querySelector("#observedMetric"),
  observedYear: document.querySelector("#observedYear"),
  forecastMetric: document.querySelector("#forecastMetric"),
  forecastYear: document.querySelector("#forecastYear"),
  changeMetric: document.querySelector("#changeMetric"),
  modelMetric: document.querySelector("#modelMetric"),
  availabilityMetric: document.querySelector("#availabilityMetric"),
  chart: document.querySelector("#chart"),
  chartTitle: document.querySelector("#chartTitle"),
  runDetails: document.querySelector("#runDetails"),
  forecastTableBody: document.querySelector("#forecastTableBody"),
  dashboardMessage: document.querySelector("#dashboardMessage"),
};

const state = {
  runs: [],
  forecasts: [],
  observed: [],
  initialized: false,
};

const numberFormatter = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("es-ES", {
  style: "percent",
  maximumFractionDigits: 1,
});

function setMessage(element, message = "", kind = "info") {
  element.textContent = message;
  element.dataset.state = kind;
}

function setBusy(button, busy) {
  button.disabled = busy;
  button.dataset.originalLabel ??= button.textContent;
  button.textContent = busy ? "Procesando…" : button.dataset.originalLabel;
}

function showView(name, session = null) {
  ui.authView.hidden = name !== "auth";
  ui.passwordView.hidden = name !== "password";
  ui.dashboardView.hidden = name !== "dashboard";
  ui.sessionControls.hidden = !session;
  ui.sessionEmail.textContent = session?.user?.email ?? "";
}

async function handleSession(session) {
  if (!session) {
    showView("auth");
    state.initialized = false;
    return;
  }

  showView("dashboard", session);
  if (!state.initialized) {
    await loadDashboard();
  }
}

ui.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = ui.loginForm.querySelector('button[type="submit"]');
  setBusy(button, true);
  setMessage(ui.authMessage);

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: ui.emailInput.value.trim(),
    password: ui.passwordInput.value,
  });

  if (error) {
    setMessage(ui.authMessage, "No se pudo iniciar sesión. Comprueba el correo y la contraseña.", "error");
  }
  setBusy(button, false);
});

ui.resetButton.addEventListener("click", async () => {
  const email = ui.emailInput.value.trim();
  if (!email) {
    setMessage(ui.authMessage, "Escribe primero tu correo electrónico.", "error");
    ui.emailInput.focus();
    return;
  }

  setBusy(ui.resetButton, true);
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: PASSWORD_RECOVERY_URL });
  setBusy(ui.resetButton, false);

  if (error) {
    setMessage(ui.authMessage, "No se pudo enviar el enlace. Inténtalo de nuevo en unos minutos.", "error");
    return;
  }
  setMessage(ui.authMessage, "Revisa tu correo: te hemos enviado un enlace para definir la contraseña.");
});

ui.passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = ui.newPasswordInput.value;
  const repeated = ui.repeatPasswordInput.value;
  const button = ui.passwordForm.querySelector('button[type="submit"]');

  if (password !== repeated) {
    setMessage(ui.passwordMessage, "Las contraseñas no coinciden.", "error");
    return;
  }

  setBusy(button, true);
  const { error } = await supabaseClient.auth.updateUser({ password });
  setBusy(button, false);

  if (error) {
    setMessage(ui.passwordMessage, "No se pudo guardar la contraseña. Solicita un enlace nuevo.", "error");
    return;
  }

  passwordSetupFlow = false;
  setMessage(ui.passwordMessage, "Contraseña actualizada. Abriendo el dashboard…");
  const { data } = await supabaseClient.auth.getSession();
  window.history.replaceState({}, document.title, window.location.pathname);
  await handleSession(data.session);
});

ui.logoutButton.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  state.runs = [];
  state.forecasts = [];
  state.observed = [];
  showView("auth");
});

ui.levelFilter.addEventListener("change", () => {
  populateEntities();
  populateHorizons();
  refreshSelection();
});
ui.entityFilter.addEventListener("change", () => {
  populateHorizons();
  refreshSelection();
});
ui.horizonFilter.addEventListener("change", refreshSelection);

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  const setupSessionEvent = ["INITIAL_SESSION", "SIGNED_IN", "USER_UPDATED"].includes(event);
  if (event === "PASSWORD_RECOVERY" || (passwordSetupFlow && session && setupSessionEvent)) {
    showView("password", session);
    return;
  }
  await handleSession(session);
});

async function loadDashboard() {
  state.initialized = true;
  ui.connectionBadge.textContent = "Conectando";
  ui.connectionBadge.dataset.state = "loading";
  setMessage(ui.dashboardMessage);

  const [runsResponse, forecastsResponse] = await Promise.all([
    supabaseClient.from("runs").select("*").order("run_id", { ascending: false }).limit(25),
    supabaseClient.from("forecasts_latest").select("*").order("level").order("entity_name").order("horizon"),
  ]);

  const error = runsResponse.error ?? forecastsResponse.error;
  if (error) {
    state.initialized = false;
    ui.connectionBadge.textContent = "Sin acceso";
    ui.connectionBadge.dataset.state = "error";
    setMessage(
      ui.dashboardMessage,
      "La sesión es válida, pero las vistas todavía no están disponibles. Revisa la Data API y las políticas RLS.",
      "error",
    );
    return;
  }

  state.runs = runsResponse.data ?? [];
  state.forecasts = forecastsResponse.data ?? [];
  ui.connectionBadge.textContent = "Datos actualizados";
  ui.connectionBadge.dataset.state = "ready";

  renderRun();
  populateLevels();
  populateEntities();
  populateHorizons();
  await refreshSelection();
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined))];
}

function replaceOptions(select, entries) {
  select.replaceChildren();
  entries.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = label;
    select.append(option);
  });
}

function populateLevels() {
  const levels = unique(state.forecasts.map((row) => row.level));
  replaceOptions(
    ui.levelFilter,
    levels.map((level) => ({ value: level, label: level === "city" ? "Ciudad" : "País" })),
  );
}

function populateEntities() {
  const level = ui.levelFilter.value;
  const entities = new Map();
  state.forecasts
    .filter((row) => row.level === level)
    .forEach((row) => entities.set(row.entity_id, row.entity_name || row.entity_id));

  replaceOptions(
    ui.entityFilter,
    [...entities.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], "es"))
      .map(([value, label]) => ({ value, label })),
  );
}

function populateHorizons() {
  const rows = selectedEntityForecasts();
  replaceOptions(
    ui.horizonFilter,
    unique(rows.map((row) => row.horizon))
      .sort((a, b) => a - b)
      .map((horizon) => ({ value: horizon, label: `${horizon} ${horizon === 1 ? "año" : "años"}` })),
  );
}

function selectedEntityForecasts() {
  return state.forecasts.filter(
    (row) => row.level === ui.levelFilter.value && row.entity_id === ui.entityFilter.value,
  );
}

async function refreshSelection() {
  const rows = selectedEntityForecasts();
  const selected = rows.find((row) => String(row.horizon) === ui.horizonFilter.value) ?? rows[0];
  renderForecastMetrics(selected);
  renderForecastTable(rows);

  if (!selected) {
    state.observed = [];
    renderChart([], []);
    return;
  }

  const { data, error } = await supabaseClient
    .from("observed_latest")
    .select("year,value,level,entity_id,entity_name")
    .eq("level", selected.level)
    .eq("entity_id", selected.entity_id)
    .order("year");

  if (error) {
    setMessage(ui.dashboardMessage, "No se pudo cargar el histórico observado.", "error");
    return;
  }

  state.observed = data ?? [];
  renderObservedMetric(state.observed);
  renderChart(state.observed, rows);
  ui.chartTitle.textContent = selected.entity_name || selected.entity_id;
}

function renderForecastMetrics(row) {
  if (!row) {
    ui.forecastMetric.textContent = "—";
    ui.forecastYear.textContent = "Sin datos";
    ui.changeMetric.textContent = "—";
    ui.modelMetric.textContent = "—";
    ui.availabilityMetric.textContent = "No disponible";
    return;
  }

  ui.forecastMetric.textContent = formatNumber(row.prediction);
  ui.forecastYear.textContent = row.target_year ? `Año ${row.target_year}` : "Año no disponible";
  ui.modelMetric.textContent = row.model_id || "Sin modelo";
  ui.availabilityMetric.textContent = row.forecast_available ? "Disponible" : row.forecast_status || "No disponible";

  const change = row.last_observed_value
    ? (Number(row.prediction) - Number(row.last_observed_value)) / Math.abs(Number(row.last_observed_value))
    : null;
  ui.changeMetric.textContent = Number.isFinite(change) ? percentFormatter.format(change) : "—";
}

function renderObservedMetric(rows) {
  const latest = [...rows].sort((a, b) => Number(b.year) - Number(a.year))[0];
  ui.observedMetric.textContent = latest ? formatNumber(latest.value) : "—";
  ui.observedYear.textContent = latest ? `Año ${latest.year}` : "Sin datos";
}

function renderForecastTable(rows) {
  ui.forecastTableBody.replaceChildren();

  if (!rows.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No hay previsiones disponibles para esta selección.";
    row.append(cell);
    ui.forecastTableBody.append(row);
    return;
  }

  rows
    .sort((a, b) => Number(a.horizon) - Number(b.horizon))
    .forEach((forecast) => {
      const row = document.createElement("tr");
      const values = [
        forecast.target_year ?? "—",
        `${forecast.horizon} ${forecast.horizon === 1 ? "año" : "años"}`,
        formatNumber(forecast.prediction),
        formatRange(forecast.lower_80, forecast.upper_80),
        formatRange(forecast.lower_95, forecast.upper_95),
        forecast.forecast_available ? "Disponible" : forecast.forecast_status || "No disponible",
      ];
      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      });
      ui.forecastTableBody.append(row);
    });
}

function renderRun() {
  const latest = state.runs.find((run) => run.is_latest) ?? state.runs[0];
  ui.runDetails.replaceChildren();

  if (!latest) {
    ui.runSummary.textContent = "No hay ejecuciones disponibles.";
    return;
  }

  ui.runSummary.textContent = `${latest.run_label || latest.run_id} · ${latest.n_forecasts ?? 0} previsiones`;
  const fields = [
    ["Ejecución", latest.run_id],
    ["Estado", latest.status],
    ["Origen", latest.trigger],
    ["Niveles", Array.isArray(latest.levels) ? latest.levels.join(", ") : latest.levels],
    ["Commit", latest.git_commit],
  ];

  fields.forEach(([label, value]) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value || "—";
    wrapper.append(term, description);
    ui.runDetails.append(wrapper);
  });
}

function renderChart(observedRows, forecastRows) {
  ui.chart.replaceChildren();
  const observed = observedRows
    .filter((row) => Number.isFinite(Number(row.year)) && Number.isFinite(Number(row.value)))
    .map((row) => ({ year: Number(row.year), value: Number(row.value), type: "observed" }));
  const forecasts = forecastRows
    .filter((row) => row.forecast_available && Number.isFinite(Number(row.target_year)) && Number.isFinite(Number(row.prediction)))
    .map((row) => ({ year: Number(row.target_year), value: Number(row.prediction), type: "forecast" }));
  const points = [...observed, ...forecasts].sort((a, b) => a.year - b.year);

  if (!points.length) {
    const empty = document.createElement("div");
    empty.className = "chart-empty";
    empty.textContent = "No hay datos suficientes para representar la evolución.";
    ui.chart.append(empty);
    return;
  }

  const width = 820;
  const height = 310;
  const margin = { top: 20, right: 28, bottom: 42, left: 68 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const years = points.map((point) => point.year);
  const values = points.map((point) => point.value);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valuePadding = Math.max((maxValue - minValue) * 0.12, 1);

  const x = (year) => margin.left + ((year - minYear) / Math.max(maxYear - minYear, 1)) * plotWidth;
  const y = (value) =>
    margin.top + (1 - (value - (minValue - valuePadding)) / Math.max(maxValue - minValue + valuePadding * 2, 1)) * plotHeight;

  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, "aria-hidden": "true" });
  for (let i = 0; i <= 4; i += 1) {
    const gridY = margin.top + (plotHeight / 4) * i;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: gridY, y2: gridY, stroke: "#dfe7e2" }));
  }

  const observedPath = observed.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
  if (observedPath) {
    svg.append(createSvg("path", { d: observedPath, fill: "none", stroke: "#0d756b", "stroke-width": "3", "stroke-linecap": "round" }));
  }

  const forecastPath = forecasts.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
  if (forecastPath) {
    svg.append(createSvg("path", { d: forecastPath, fill: "none", stroke: "#e8a838", "stroke-width": "3", "stroke-dasharray": "7 6", "stroke-linecap": "round" }));
  }

  points.forEach((point) => {
    const circle = createSvg("circle", {
      cx: x(point.year),
      cy: y(point.value),
      r: point.type === "forecast" ? 5 : 4,
      fill: point.type === "forecast" ? "#e8a838" : "#0d756b",
      stroke: "#fff",
      "stroke-width": "2",
    });
    const title = createSvg("title");
    title.textContent = `${point.year}: ${formatNumber(point.value)}`;
    circle.append(title);
    svg.append(circle);
  });

  unique(years).forEach((year) => {
    const label = createSvg("text", {
      x: x(year),
      y: height - 14,
      "text-anchor": "middle",
      fill: "#607470",
      "font-size": "11",
    });
    label.textContent = year;
    svg.append(label);
  });

  ui.chart.append(svg);
}

function createSvg(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? numberFormatter.format(number) : "—";
}

function formatRange(lower, upper) {
  return `${formatNumber(lower)} – ${formatNumber(upper)}`;
}

async function initialize() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    setMessage(ui.authMessage, "No se pudo validar la sesión. Recarga la página.", "error");
    showView("auth");
    return;
  }

  if (PASSWORD_SETUP_FLOW && data.session) {
    showView("password", data.session);
    return;
  }
  await handleSession(data.session);
}

initialize();
