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
  profileToggle: document.querySelector("#profileToggle"),
  profileMenu: document.querySelector("#profileMenu"),
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
  dashboardTitle: document.querySelector("#dashboardTitle"),
  dashboardSubtitle: document.querySelector("#dashboardSubtitle"),
  dashboardEyebrow: document.querySelector("#dashboardEyebrow"),
  dashboardBrand: document.querySelector("#dashboardBrand"),
  europeanPage: document.querySelector("#europeanOutlookPage"),
  countryPage: document.querySelector("#countryIntelligencePage"),
  benchmarkPage: document.querySelector("#countryBenchmarkPage"),
  contextPage: document.querySelector("#migrationContextPage"),
  reliabilityPage: document.querySelector("#forecastReliabilityPage"),
  cityPage: document.querySelector("#cityIntelligencePage"),
  methodologyPage: document.querySelector("#dataMethodologyPage"),
  navEuropean: document.querySelector("#navEuropeanOutlook"),
  navCountry: document.querySelector("#navCountryIntelligence"),
  navBenchmark: document.querySelector("#navCountryBenchmark"),
  navContext: document.querySelector("#navMigrationContext"),
  navReliability: document.querySelector("#navForecastReliability"),
  navCity: document.querySelector("#navCityIntelligence"),
  navMethodology: document.querySelector("#navMethodology"),
  countrySearch: document.querySelector("#countrySearch"),
  countrySearchOptions: document.querySelector("#countrySearchOptions"),
  mapMeasure: document.querySelector("#mapMeasure"),
  mapCountrySelect: document.querySelector("#mapCountrySelect"),
  mapRoot: document.querySelector("#europeMap"),
  mapTooltip: document.querySelector("#mapTooltip"),
  mapLegend: document.querySelector("#mapLegend"),
  mapCoverage: document.querySelector("#mapCoverage"),
  mapZoomIn: document.querySelector("#mapZoomIn"),
  mapZoomOut: document.querySelector("#mapZoomOut"),
  mapReset: document.querySelector("#mapReset"),
  timelineMarkers: document.querySelector("#timelineMarkers"),
  timelineRange: document.querySelector("#timelineRange"),
  timelineYear: document.querySelector("#timelineYear"),
  observedPeriod: document.querySelector("#observedPeriod"),
  forecastPeriod: document.querySelector("#forecastPeriod"),
  timelineBack: document.querySelector("#timelineBack"),
  timelineForward: document.querySelector("#timelineForward"),
  timelinePlay: document.querySelector("#timelinePlay"),
  horizonCards: document.querySelector("#horizonCards"),
  trendChart: document.querySelector("#trendChart"),
  trendDescription: document.querySelector("#trendDescription"),
  rankingList: document.querySelector("#rankingList"),
  rankingSubtitle: document.querySelector("#rankingSubtitle"),
  rankingLimit: document.querySelector("#rankingLimit"),
  rankingOrder: document.querySelector("#rankingOrder"),
  rankingEmpty: document.querySelector("#rankingEmpty"),
  insightsList: document.querySelector("#insightsList"),
  helpToggle: document.querySelector("#helpToggle"),
  helpDialog: document.querySelector("#outlookHelp"),
  helpRunNote: document.querySelector("#helpRunNote"),
  dashboardMessage: document.querySelector("#dashboardMessage"),
  intelligenceCountrySelect: document.querySelector("#intelligenceCountrySelect"),
  countryLatestYear: document.querySelector("#countryLatestYear"),
  countryLatestValue: document.querySelector("#countryLatestValue"),
  countryForecastCards: document.querySelector("#countryForecastCards"),
  countryHistoryTitle: document.querySelector("#countryHistoryTitle"),
  countryHistorySubtitle: document.querySelector("#countryHistorySubtitle"),
  countryChartPeriod: document.querySelector("#countryChartPeriod"),
  countryZoomIn: document.querySelector("#countryZoomIn"),
  countryZoomOut: document.querySelector("#countryZoomOut"),
  countryZoomReset: document.querySelector("#countryZoomReset"),
  countryChartExport: document.querySelector("#countryChartExport"),
  countryBand80: document.querySelector("#countryBand80"),
  countryBand95: document.querySelector("#countryBand95"),
  countryBandNote: document.querySelector("#countryBandNote"),
  countryHistoryChart: document.querySelector("#countryHistoryChart"),
  countryYoyMeasure: document.querySelector("#countryYoyMeasure"),
  countryYoyChart: document.querySelector("#countryYoyChart"),
  countryYoyNote: document.querySelector("#countryYoyNote"),
  countryForecastCompare: document.querySelector("#countryForecastCompare"),
  countryReliabilityNote: document.querySelector("#countryReliabilityNote"),
  cityExplorerCoverage: document.querySelector("#cityExplorerCoverage"),
  cityExplorerContent: document.querySelector("#cityExplorerContent"),
  countryInsightsList: document.querySelector("#countryInsightsList"),
  benchmarkSelectionCount: document.querySelector("#benchmarkSelectionCount"),
  benchmarkReset: document.querySelector("#benchmarkReset"),
  benchmarkSelectorToggle: document.querySelector("#benchmarkSelectorToggle"),
  benchmarkSelectorMenu: document.querySelector("#benchmarkSelectorMenu"),
  benchmarkSelectedCountries: document.querySelector("#benchmarkSelectedCountries"),
  benchmarkSelectionNote: document.querySelector("#benchmarkSelectionNote"),
  benchmarkPeriod: document.querySelector("#benchmarkPeriod"),
  benchmarkAbsoluteButton: document.querySelector("#benchmarkAbsoluteButton"),
  benchmarkIndexButton: document.querySelector("#benchmarkIndexButton"),
  benchmarkChartLegend: document.querySelector("#benchmarkChartLegend"),
  benchmarkTrendChart: document.querySelector("#benchmarkTrendChart"),
  benchmarkTrendSubtitle: document.querySelector("#benchmarkTrendSubtitle"),
  benchmarkTrendNote: document.querySelector("#benchmarkTrendNote"),
  benchmarkRankingYear: document.querySelector("#benchmarkRankingYear"),
  benchmarkRankingSubtitle: document.querySelector("#benchmarkRankingSubtitle"),
  benchmarkRankingList: document.querySelector("#benchmarkRankingList"),
  benchmarkRankingEmpty: document.querySelector("#benchmarkRankingEmpty"),
  benchmarkHeatmapMeasure: document.querySelector("#benchmarkHeatmapMeasure"),
  benchmarkHeatmap: document.querySelector("#benchmarkHeatmap"),
  benchmarkHeatmapLegend: document.querySelector("#benchmarkHeatmapLegend"),
  benchmarkHeatmapNote: document.querySelector("#benchmarkHeatmapNote"),
  benchmarkHorizon: document.querySelector("#benchmarkHorizon"),
  benchmarkDumbbell: document.querySelector("#benchmarkDumbbell"),
  benchmarkInsights: document.querySelector("#benchmarkInsights"),
  migrationCountrySelect: document.querySelector("#migrationCountrySelect"),
  migrationIndicatorSelect: document.querySelector("#migrationIndicatorSelect"),
  migrationPeriod: document.querySelector("#migrationPeriod"),
  migrationContextSubtitle: document.querySelector("#migrationContextSubtitle"),
  migrationHistoryChart: document.querySelector("#migrationHistoryChart"),
  migrationHistoryNote: document.querySelector("#migrationHistoryNote"),
  contextIndicatorLegend: document.querySelector("#contextIndicatorLegend"),
  contextIndicatorHeading: document.querySelector("#contextIndicatorHeading"),
  contextIndicatorDefinition: document.querySelector("#contextIndicatorDefinition"),
  contextIndicatorFamily: document.querySelector("#contextIndicatorFamily"),
  contextIndicatorUnit: document.querySelector("#contextIndicatorUnit"),
  contextIndicatorSource: document.querySelector("#contextIndicatorSource"),
  contextIndicatorCoverage: document.querySelector("#contextIndicatorCoverage"),
  contextScatterEmpty: document.querySelector("#contextScatterEmpty"),
  contextScatterChart: document.querySelector("#contextScatterChart"),
  contextOtherIndicators: document.querySelector("#contextOtherIndicators"),
  contextIndicatorCount: document.querySelector("#contextIndicatorCount"),
  reliabilityCountryScope: document.querySelector("#reliabilityCountryScope"),
  reliabilityCityScope: document.querySelector("#reliabilityCityScope"),
  reliabilityHorizon: document.querySelector("#reliabilityHorizon"),
  reliabilityModel: document.querySelector("#reliabilityModel"),
  reliabilityEntity: document.querySelector("#reliabilityEntity"),
  reliabilityHorizonCards: document.querySelector("#reliabilityHorizonCards"),
  reliabilityScatterEmpty: document.querySelector("#reliabilityScatterEmpty"),
  reliabilityScatterChart: document.querySelector("#reliabilityScatterChart"),
  reliabilityBacktestEmpty: document.querySelector("#reliabilityBacktestEmpty"),
  reliabilityBacktestChart: document.querySelector("#reliabilityBacktestChart"),
  reliabilityMetricStatus: document.querySelector("#reliabilityMetricStatus"),
  reliabilityModelProcess: document.querySelector("#reliabilityModelProcess"),
  reliabilityRankingTitle: document.querySelector("#reliabilityRankingTitle"),
  reliabilityRankingSubtitle: document.querySelector("#reliabilityRankingSubtitle"),
  reliabilityRankingEmpty: document.querySelector("#reliabilityRankingEmpty"),
  reliabilityRankingEmptyTitle: document.querySelector("#reliabilityRankingEmptyTitle"),
  reliabilityRankingEmptyText: document.querySelector("#reliabilityRankingEmptyText"),
  reliabilityRankingList: document.querySelector("#reliabilityRankingList"),
  reliabilityOpenCountry: document.querySelector("#reliabilityOpenCountry"),
  cityCountryFilter: document.querySelector("#cityCountryFilter"),
  citySearchInput: document.querySelector("#citySearchInput"),
  citySelect: document.querySelector("#citySelect"),
  cityScopeSummary: document.querySelector("#cityScopeSummary"),
  citySelectionNote: document.querySelector("#citySelectionNote"),
  cityKpiName: document.querySelector("#cityKpiName"),
  cityKpiCountry: document.querySelector("#cityKpiCountry"),
  cityKpiYear: document.querySelector("#cityKpiYear"),
  cityKpiShare: document.querySelector("#cityKpiShare"),
  cityKpiForecast1: document.querySelector("#cityKpiForecast1"),
  cityKpiForecast1Year: document.querySelector("#cityKpiForecast1Year"),
  cityKpiForecast3: document.querySelector("#cityKpiForecast3"),
  cityKpiForecast3Year: document.querySelector("#cityKpiForecast3Year"),
  cityKpiScope: document.querySelector("#cityKpiScope"),
  cityKpiScopeNote: document.querySelector("#cityKpiScopeNote"),
  cityTrendTitle: document.querySelector("#cityTrendTitle"),
  cityTrendChart: document.querySelector("#cityTrendChart"),
  cityTrendNote: document.querySelector("#cityTrendNote"),
  cityRankingCriterion: document.querySelector("#cityRankingCriterion"),
  cityRankingSubtitle: document.querySelector("#cityRankingSubtitle"),
  cityRankingList: document.querySelector("#cityRankingList"),
  cityRankingNote: document.querySelector("#cityRankingNote"),
  cityYoyMeasure: document.querySelector("#cityYoyMeasure"),
  cityYoyChart: document.querySelector("#cityYoyChart"),
  cityYoyNote: document.querySelector("#cityYoyNote"),
  cityForecastCompare: document.querySelector("#cityForecastCompare"),
  cityForecastCompareNote: document.querySelector("#cityForecastCompareNote"),
  cityProfileSubtitle: document.querySelector("#cityProfileSubtitle"),
  cityProfileContent: document.querySelector("#cityProfileContent"),
  cityInsights: document.querySelector("#cityInsights"),
  cityReliabilityMae: document.querySelector("#cityReliabilityMae"),
  cityReliabilityMaeNote: document.querySelector("#cityReliabilityMaeNote"),
  cityReliabilityWape: document.querySelector("#cityReliabilityWape"),
  cityReliabilityWapeNote: document.querySelector("#cityReliabilityWapeNote"),
  cityReliabilityR2: document.querySelector("#cityReliabilityR2"),
  cityReliabilityR2Note: document.querySelector("#cityReliabilityR2Note"),
  cityReliabilitySample: document.querySelector("#cityReliabilitySample"),
  cityReliabilitySampleNote: document.querySelector("#cityReliabilitySampleNote"),
  cityReliabilityInterval: document.querySelector("#cityReliabilityInterval"),
  cityReliabilityIntervalNote: document.querySelector("#cityReliabilityIntervalNote"),
  methodologyObservedCount: document.querySelector("#methodologyObservedCount"),
  methodologyMissingCount: document.querySelector("#methodologyMissingCount"),
  methodologyMissingNote: document.querySelector("#methodologyMissingNote"),
  methodologyTemporalCoverage: document.querySelector("#methodologyTemporalCoverage"),
  methodologyTemporalNote: document.querySelector("#methodologyTemporalNote"),
  methodologyTerritorialCoverage: document.querySelector("#methodologyTerritorialCoverage"),
  methodologyTerritorialNote: document.querySelector("#methodologyTerritorialNote"),
  methodologySourceCoverage: document.querySelector("#methodologySourceCoverage"),
  methodologySourceCoverageNote: document.querySelector("#methodologySourceCoverageNote"),
  methodologyForecastCount: document.querySelector("#methodologyForecastCount"),
  methodologyForecastNote: document.querySelector("#methodologyForecastNote"),
  methodologyCoverageLevel: document.querySelector("#methodologyCoverageLevel"),
  methodologySourceFilter: document.querySelector("#methodologySourceFilter"),
  methodologyCoverageGrid: document.querySelector("#methodologyCoverageGrid"),
  methodologyCoverageNote: document.querySelector("#methodologyCoverageNote"),
  methodologyRunMetadata: document.querySelector("#methodologyRunMetadata"),
  methodologyRunNote: document.querySelector("#methodologyRunNote"),
  methodologyEntityFilter: document.querySelector("#methodologyEntityFilter"),
  methodologyStatusLevel: document.querySelector("#methodologyStatusLevel"),
  methodologyHorizonFilter: document.querySelector("#methodologyHorizonFilter"),
  methodologyStatusFilter: document.querySelector("#methodologyStatusFilter"),
  methodologyRunFilter: document.querySelector("#methodologyRunFilter"),
  methodologyStatusRows: document.querySelector("#methodologyStatusRows"),
  methodologyStatusNote: document.querySelector("#methodologyStatusNote"),
};

const state = {
  runs: [],
  forecasts: [],
  observed: [],
  cityForecasts: [],
  cityObserved: [],
  backtestPredictions: [],
  backtestMetrics: [],
  backtestEntityMetrics: [],
  backtestViewsAvailable: true,
  contextRows: [],
  contextCache: new Map(),
  contextCacheEpoch: 0,
  contextViewsAvailable: true,
  contextRequestId: 0,
  selectedContextIndicator: null,
  initialized: false,
  years: [],
  selectedYear: null,
  selectedCountry: "all",
  mapFeatures: [],
  mapZoom: 1,
  playbackTimer: null,
  activePage: "european-outlook",
  countryChartZoom: 1,
  selectedCity: null,
  cityCountryFilter: null,
  selectedBenchmarkCountries: [],
  benchmarkMeasure: "absolute",
  reliabilityScope: "country",
  methodologySource: "all",
};

const numberFormatter = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 1,
});
const countryChangeFormatter = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });

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
  document.body.classList.toggle("dashboard-mode", name === "dashboard");
  document.documentElement.lang = name === "dashboard" ? "en" : "es";
  document.title = name === "dashboard" ? "European Migration Outlook · migrAI" : "Acceso privado · migrAI";
  ui.profileMenu.hidden = true;
  ui.profileToggle.setAttribute("aria-expanded", "false");
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
  stopPlayback();
  await supabaseClient.auth.signOut();
  state.runs = [];
  state.forecasts = [];
  state.observed = [];
  state.cityForecasts = [];
  state.cityObserved = [];
  state.backtestPredictions = [];
  state.backtestMetrics = [];
  state.backtestEntityMetrics = [];
  state.backtestViewsAvailable = true;
  state.contextRows = [];
  state.contextCache.clear();
  state.contextCacheEpoch += 1;
  state.contextRequestId += 1;
  state.contextViewsAvailable = true;
  state.years = [];
  state.selectedYear = null;
  state.selectedCountry = "all";
  state.selectedCity = null;
  state.selectedBenchmarkCountries = [];
  showView("auth");
});

ui.mapMeasure.addEventListener("change", renderOutlook);
ui.mapCountrySelect.addEventListener("change", () => {
  const previousCountry = state.selectedCountry;
  state.selectedCountry = ui.mapCountrySelect.value;
  if (previousCountry !== state.selectedCountry) {
    state.selectedCity = null;
    updateCityQuery(null);
  }
  if (state.selectedCountry === "all") {
    ui.countrySearch.value = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("country");
    url.searchParams.delete("city");
    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${window.location.hash}`);
  }
  else {
    ui.intelligenceCountrySelect.value = state.selectedCountry;
    ui.countrySearch.value = countryById(state.selectedCountry)?.name ?? "";
    updateCountryQuery();
  }
  renderOutlook();
  renderCountryIntelligence();
});
ui.countrySearch.addEventListener("change", () => {
  const query = normalizeName(ui.countrySearch.value);
  const country = listCountries().find((item) => normalizeName(item.name) === query || normalizeName(item.id) === query);
  if (country) {
    selectCountry(country.id);
    navigateToDashboardPage("country-intelligence");
  }
});
ui.navEuropean.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("european-outlook");
});
ui.dashboardBrand.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("european-outlook");
});
ui.navCountry.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("country-intelligence");
});
ui.navBenchmark.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("country-benchmark");
});
ui.navContext.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("migration-context");
});
ui.navReliability.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("forecast-reliability");
});
ui.navCity.addEventListener("click", (event) => {
  event.preventDefault();
  if (state.activePage !== "city-intelligence") state.cityCountryFilter = state.selectedCountry;
  navigateToDashboardPage("city-intelligence");
});
ui.navMethodology.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("data-methodology");
});
ui.methodologyCoverageLevel.addEventListener("change", renderDataMethodologyCoverage);
ui.methodologySourceFilter.addEventListener("change", () => {
  state.methodologySource = ui.methodologySourceFilter.value;
  renderDataMethodologyCoverage();
});
[ui.methodologyEntityFilter, ui.methodologyStatusLevel, ui.methodologyHorizonFilter, ui.methodologyStatusFilter, ui.methodologyRunFilter]
  .forEach((control) => control.addEventListener("change", renderDataMethodologyStatus));
ui.benchmarkSelectorToggle.addEventListener("click", () => {
  ui.benchmarkSelectorMenu.hidden = !ui.benchmarkSelectorMenu.hidden;
  ui.benchmarkSelectorToggle.setAttribute("aria-expanded", String(!ui.benchmarkSelectorMenu.hidden));
});
ui.benchmarkSelectorMenu.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-country-id]");
  if (!checkbox) return;
  const countryId = checkbox.dataset.countryId;
  if (checkbox.checked) {
    if (state.selectedBenchmarkCountries.length >= 5) {
      checkbox.checked = false;
      setMessage(ui.benchmarkSelectionNote, "You can compare up to five countries at a time.", "error");
      return;
    }
    if (!state.selectedBenchmarkCountries.includes(countryId)) state.selectedBenchmarkCountries.push(countryId);
  } else {
    state.selectedBenchmarkCountries = state.selectedBenchmarkCountries.filter((id) => id !== countryId);
  }
  renderCountryBenchmark();
});
ui.benchmarkSelectedCountries.addEventListener("click", (event) => {
  const remove = event.target.closest("button[data-remove-country]");
  if (!remove) return;
  state.selectedBenchmarkCountries = state.selectedBenchmarkCountries.filter((id) => id !== remove.dataset.removeCountry);
  renderCountryBenchmark();
});
ui.benchmarkReset.addEventListener("click", () => {
  state.selectedBenchmarkCountries = defaultBenchmarkCountries();
  ui.benchmarkPeriod.value = "all";
  state.benchmarkMeasure = "absolute";
  renderCountryBenchmark();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".benchmark-selector")) {
    ui.benchmarkSelectorMenu.hidden = true;
    ui.benchmarkSelectorToggle.setAttribute("aria-expanded", "false");
  }
});
ui.benchmarkPeriod.addEventListener("change", renderCountryBenchmark);
ui.benchmarkAbsoluteButton.addEventListener("click", () => {
  state.benchmarkMeasure = "absolute";
  renderCountryBenchmark();
});
ui.benchmarkIndexButton.addEventListener("click", () => {
  state.benchmarkMeasure = "index";
  renderCountryBenchmark();
});
ui.benchmarkRankingYear.addEventListener("change", renderCountryBenchmark);
ui.benchmarkHeatmapMeasure.addEventListener("change", renderCountryBenchmark);
ui.benchmarkHorizon.addEventListener("change", renderCountryBenchmark);
ui.migrationCountrySelect.addEventListener("change", () => {
  selectCountry(ui.migrationCountrySelect.value);
  renderMigrationContext();
});
ui.migrationIndicatorSelect.addEventListener("change", () => {
  state.selectedContextIndicator = ui.migrationIndicatorSelect.value || null;
  renderMigrationHistoryChart();
  renderContextScatter();
  renderOtherContextIndicators();
});
ui.migrationPeriod.addEventListener("change", renderMigrationHistoryChart);
ui.reliabilityCountryScope.addEventListener("click", () => {
  state.reliabilityScope = "country";
  renderForecastReliability();
});
ui.reliabilityCityScope.addEventListener("click", () => {
  state.reliabilityScope = "city";
  renderForecastReliability();
});
ui.reliabilityHorizon.addEventListener("change", renderForecastReliability);
ui.reliabilityModel.addEventListener("change", renderForecastReliability);
ui.reliabilityEntity.addEventListener("change", renderForecastReliability);
ui.reliabilityOpenCountry.addEventListener("click", () => {
  if (state.reliabilityScope !== "country" || ui.reliabilityEntity.value === "all") return;
  selectCountry(ui.reliabilityEntity.value);
  navigateToDashboardPage("country-intelligence");
});
ui.cityCountryFilter.addEventListener("change", () => {
  state.cityCountryFilter = ui.cityCountryFilter.value;
  const filtered = cityRecordsAcrossCountries().cities.filter((city) => ui.cityCountryFilter.value === "all" || city.countryId === ui.cityCountryFilter.value);
  state.selectedCity = filtered[0]?.id ?? null;
  ui.citySearchInput.value = "";
  if (filtered[0]) {
    state.selectedCountry = filtered[0].countryId;
    updateCountryQuery();
    updateCityQuery(filtered[0].id);
  }
  renderCityIntelligence();
});
ui.citySearchInput.addEventListener("input", () => {
  if (ui.citySearchInput.value.trim()) {
    ui.cityCountryFilter.value = "all";
    state.cityCountryFilter = "all";
  }
  renderCityIntelligence();
});
ui.citySelect.addEventListener("change", () => {
  const city = cityRecordsAcrossCountries().cities.find((item) => item.key === ui.citySelect.value);
  if (!city) return;
  state.selectedCountry = city.countryId;
  state.selectedCity = city.id;
  ui.cityCountryFilter.value = city.countryId;
  updateCountryQuery();
  updateCityQuery(city.id);
  renderCityIntelligence();
});
ui.cityRankingCriterion.addEventListener("change", renderCityRanking);
ui.cityYoyMeasure.addEventListener("change", renderCityYearChange);
window.addEventListener("resize", () => {
  if (state.activePage === "country-benchmark") renderBenchmarkTrendChart();
  if (state.activePage === "migration-context") renderMigrationHistoryChart();
  if (state.activePage === "city-intelligence") renderCityTrendChart();
});
ui.intelligenceCountrySelect.addEventListener("change", () => {
  selectCountry(ui.intelligenceCountrySelect.value);
  const url = new URL(window.location.href);
  url.searchParams.set("country", state.selectedCountry);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}#country-intelligence`);
});
ui.countryChartPeriod.addEventListener("change", () => {
  state.countryChartZoom = 1;
  renderCountryHistoryChart();
});
ui.countryZoomIn.addEventListener("click", () => {
  state.countryChartZoom = Math.min(state.countryChartZoom * 1.35, 3.5);
  renderCountryHistoryChart();
});
ui.countryZoomOut.addEventListener("click", () => {
  state.countryChartZoom = Math.max(state.countryChartZoom / 1.35, 1);
  renderCountryHistoryChart();
});
ui.countryZoomReset.addEventListener("click", () => {
  state.countryChartZoom = 1;
  ui.countryChartPeriod.value = "all";
  renderCountryHistoryChart();
});
ui.countryChartExport.addEventListener("click", exportCountryChart);
ui.countryBand80.addEventListener("change", renderCountryHistoryChart);
ui.countryBand95.addEventListener("change", renderCountryHistoryChart);
ui.countryYoyMeasure.addEventListener("change", renderCountryYearChange);
window.addEventListener("hashchange", applyDashboardRoute);
ui.timelineRange.addEventListener("input", () => selectYearIndex(Number(ui.timelineRange.value)));
ui.timelineBack.addEventListener("click", () => selectYearIndex(Math.max(0, state.years.indexOf(state.selectedYear) - 1)));
ui.timelineForward.addEventListener("click", () => selectYearIndex(Math.min(state.years.length - 1, state.years.indexOf(state.selectedYear) + 1)));
ui.timelinePlay.addEventListener("click", togglePlayback);
ui.mapZoomIn.addEventListener("click", () => setMapZoom(state.mapZoom * 1.2));
ui.mapZoomOut.addEventListener("click", () => setMapZoom(state.mapZoom / 1.2));
ui.mapReset.addEventListener("click", () => setMapZoom(1));
ui.rankingLimit.addEventListener("change", renderRanking);
ui.rankingOrder.addEventListener("change", renderRanking);
ui.helpToggle.addEventListener("click", () => ui.helpDialog.showModal());
ui.profileToggle.addEventListener("click", () => {
  ui.profileMenu.hidden = !ui.profileMenu.hidden;
  ui.profileToggle.setAttribute("aria-expanded", String(!ui.profileMenu.hidden));
});
document.addEventListener("click", (event) => {
  if (!ui.sessionControls.contains(event.target)) {
    ui.profileMenu.hidden = true;
    ui.profileToggle.setAttribute("aria-expanded", "false");
  }
});

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
  ui.connectionBadge.textContent = "Connecting";
  ui.connectionBadge.dataset.state = "loading";
  setMessage(ui.dashboardMessage);

  const [runsResponse, forecastsResponse, observedResponse, backtestPredictionsResponse,
    backtestMetricsResponse, backtestEntityMetricsResponse] = await Promise.all([
    supabaseClient.from("runs").select("*").order("run_id", { ascending: false }).limit(25),
    supabaseClient.from("forecasts_latest").select("*").in("level", ["country", "city"]).order("entity_name").order("horizon"),
    supabaseClient.from("observed_latest").select("*").in("level", ["country", "city"]).order("year"),
    supabaseClient.from("backtest_predictions_latest").select("*").order("target_year").limit(1000),
    supabaseClient.from("backtest_metrics_latest").select("*"),
    supabaseClient.from("backtest_entity_metrics_latest").select("*"),
  ]);

  const error = runsResponse.error ?? forecastsResponse.error ?? observedResponse.error;
  if (error) {
    state.initialized = false;
    ui.connectionBadge.textContent = "Access unavailable";
    ui.connectionBadge.dataset.state = "error";
    setMessage(
      ui.dashboardMessage,
      "Your session is valid, but the protected data views could not be loaded. Please try again later or contact the dashboard administrator.",
      "error",
    );
    return;
  }

  state.runs = runsResponse.data ?? [];
  const forecastRows = forecastsResponse.data ?? [];
  const observedRows = observedResponse.data ?? [];
  state.forecasts = forecastRows.filter((row) => row.level === "country");
  state.observed = observedRows.filter((row) => row.level === "country");
  state.cityForecasts = forecastRows.filter((row) => row.level === "city");
  state.cityObserved = observedRows.filter((row) => row.level === "city");
  state.backtestViewsAvailable = !backtestPredictionsResponse.error
    && !backtestMetricsResponse.error && !backtestEntityMetricsResponse.error;
  state.backtestPredictions = backtestPredictionsResponse.data ?? [];
  state.backtestMetrics = backtestMetricsResponse.data ?? [];
  state.backtestEntityMetrics = backtestEntityMetricsResponse.data ?? [];
  ui.connectionBadge.textContent = "Data connected";
  ui.connectionBadge.dataset.state = "ready";

  const latestRun = state.runs.find((run) => run.is_latest) ?? state.runs[0];
  ui.runSummary.textContent = latestRun
    ? `Latest available run · ${latestRun.run_label || latestRun.run_id || "Run details unavailable"}`
    : "Run information is not available.";
  ui.helpRunNote.textContent = latestRun
    ? `Data is read from the latest published Country and City views. Run reference: ${latestRun.run_label || latestRun.run_id || "Not available"}.`
    : "Run metadata is not available.";

  populateCountryControls();
  if (!state.selectedBenchmarkCountries.length) state.selectedBenchmarkCountries = defaultBenchmarkCountries();
  populateBenchmarkCountryMenu();
  buildTimeline();
  populateIntelligenceCountryControl();
  populateMigrationCountryControl();
  renderOutlook();
  renderDataMethodology();
  applyDashboardRoute();
  renderCountryIntelligence();
  loadEuropeMap();
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

function safeNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeName(value) {
  const normalized = String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
  const aliases = {
    czechrepublic: "czechia",
    greatbritain: "unitedkingdom",
    republicofireland: "ireland",
    slovakrepublic: "slovakia",
    thenetherlands: "netherlands",
    turkiye: "turkey",
    uk: "unitedkingdom",
  };
  return aliases[normalized] ?? normalized;
}

function listCountries() {
  const countries = new Map();
  [...state.forecasts, ...state.observed].forEach((row) => {
    if (!row.entity_id) return;
    const id = String(row.entity_id);
    countries.set(id, { id, name: row.entity_name || id });
  });
  return [...countries.values()].sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function populateCountryControls() {
  const countries = listCountries();
  replaceOptions(ui.mapCountrySelect, [
    { value: "all", label: "All available countries" },
    ...countries.map(({ id, name }) => ({ value: id, label: name })),
  ]);
  ui.countrySearchOptions.replaceChildren();
  countries.forEach(({ id, name }) => {
    const option = document.createElement("option");
    option.value = name;
    option.dataset.countryId = id;
    ui.countrySearchOptions.append(option);
  });
  const queryCountry = new URLSearchParams(window.location.search).get("country");
  const requested = countries.find((item) => String(item.id) === queryCountry
    || normalizeName(item.name) === normalizeName(queryCountry)
    || normalizeName(item.id) === normalizeName(queryCountry));
  state.selectedCountry = requested?.id ?? "all";
  ui.mapCountrySelect.value = state.selectedCountry;
  if (requested) ui.countrySearch.value = requested.name;
}

function buildTimeline() {
  const observedYears = state.observed
    .map((row) => safeNumber(row.year))
    .filter((year) => year !== null);
  const forecastYears = state.forecasts
    .filter((row) => row.forecast_available)
    .filter((row) => safeNumber(row.prediction) !== null)
    .map((row) => safeNumber(row.target_year))
    .filter((year) => year !== null);
  state.years = unique([...observedYears, ...forecastYears]).sort((a, b) => a - b);

  if (!state.years.length) {
    state.selectedYear = null;
    ui.timelineRange.max = "0";
    ui.timelineRange.value = "0";
    renderTimeline();
    return;
  }

  const latestObserved = observedYears.length ? Math.max(...observedYears) : state.years[0];
  if (!state.years.includes(state.selectedYear)) state.selectedYear = latestObserved;
  ui.timelineRange.min = "0";
  ui.timelineRange.max = String(state.years.length - 1);
  ui.timelineRange.value = String(state.years.indexOf(state.selectedYear));
  renderTimeline();
}

function renderTimeline() {
  const observedYears = state.observed.map((row) => safeNumber(row.year)).filter((year) => year !== null);
  const forecastYears = state.forecasts
    .filter((row) => row.forecast_available && safeNumber(row.prediction) !== null)
    .map((row) => safeNumber(row.target_year))
    .filter((year) => year !== null);
  const minObserved = observedYears.length ? Math.min(...observedYears) : null;
  const maxObserved = observedYears.length ? Math.max(...observedYears) : null;
  const minForecast = forecastYears.length ? Math.min(...forecastYears) : null;
  const maxForecast = forecastYears.length ? Math.max(...forecastYears) : null;
  ui.observedPeriod.textContent = minObserved === null ? "Observed · —" : `Observed · ${minObserved}–${maxObserved}`;
  ui.forecastPeriod.textContent = minForecast === null ? "Forecast · —" : `Forecast · ${minForecast}–${maxForecast}`;
  ui.timelineYear.textContent = state.selectedYear ?? "Not available";
  ui.timelineMarkers.replaceChildren();

  state.years.forEach((year, index) => {
    const isObserved = observedYears.includes(year);
    const isForecast = forecastYears.includes(year);
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `timeline-marker${isForecast && !isObserved ? " is-forecast" : " is-observed"}${year === state.selectedYear ? " is-selected" : ""}`;
    marker.textContent = String(year);
    marker.setAttribute("aria-pressed", String(year === state.selectedYear));
    marker.title = `${year} · ${isObserved && isForecast ? "Observed and forecast" : isForecast ? "Forecast" : "Observed"}`;
    marker.addEventListener("click", () => selectYearIndex(index));
    ui.timelineMarkers.append(marker);
  });
  const selectedIndex = state.years.indexOf(state.selectedYear);
  ui.timelineRange.value = String(Math.max(0, selectedIndex));
  ui.timelineRange.max = String(Math.max(0, state.years.length - 1));
  ui.timelineBack.disabled = selectedIndex <= 0;
  ui.timelineForward.disabled = selectedIndex < 0 || selectedIndex >= state.years.length - 1;
}

function selectYearIndex(index) {
  if (!state.years.length) return;
  const nextIndex = Math.min(Math.max(index, 0), state.years.length - 1);
  state.selectedYear = state.years[nextIndex];
  renderOutlook();
}

function togglePlayback() {
  if (state.playbackTimer) {
    stopPlayback();
    return;
  }
  if (state.years.length < 2) return;
  if (state.selectedYear === state.years[state.years.length - 1]) selectYearIndex(0);
  ui.timelinePlay.textContent = "Ⅱ Pause";
  ui.timelinePlay.setAttribute("aria-pressed", "true");
  state.playbackTimer = window.setInterval(() => {
    const index = state.years.indexOf(state.selectedYear);
    if (index >= state.years.length - 1) {
      stopPlayback();
      return;
    }
    selectYearIndex(index + 1);
  }, 1300);
}

function stopPlayback() {
  if (state.playbackTimer) window.clearInterval(state.playbackTimer);
  state.playbackTimer = null;
  ui.timelinePlay.textContent = "▶ Play";
  ui.timelinePlay.setAttribute("aria-pressed", "false");
}

function observedForEntityYear(entityId, year) {
  return state.observed.find((row) => String(row.entity_id) === String(entityId) && safeNumber(row.year) === year) ?? null;
}

function latestObservationForEntity(entityId) {
  return state.observed
    .filter((row) => String(row.entity_id) === String(entityId) && safeNumber(row.value) !== null && safeNumber(row.year) !== null)
    .sort((a, b) => safeNumber(b.year) - safeNumber(a.year))[0] ?? null;
}

function availableForecastsForYear(year, entityId = null) {
  const matches = state.forecasts
    .filter((row) => safeNumber(row.target_year) === year)
    .filter((row) => row.forecast_available && safeNumber(row.prediction) !== null)
    .filter((row) => entityId === null || String(row.entity_id) === String(entityId))
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const byEntity = new Map();
  matches.forEach((row) => {
    if (!byEntity.has(String(row.entity_id))) byEntity.set(String(row.entity_id), row);
  });
  return [...byEntity.values()];
}

function pointForCountryYear(country, year) {
  const observed = observedForEntityYear(country.id, year);
  const observedValue = safeNumber(observed?.value);
  if (observedValue !== null) return { type: "observed", value: observedValue, row: observed };
  const forecast = availableForecastsForYear(year, country.id)[0];
  if (forecast) return { type: "forecast", value: safeNumber(forecast.prediction), row: forecast };
  return null;
}

function metricForPoint(point, countryId, year, measure = ui.mapMeasure.value) {
  if (!point) return null;
  if (measure === "value") return point.value;

  let baseline = null;
  if (point.type === "observed") {
    baseline = safeNumber(observedForEntityYear(countryId, year - 1)?.value);
  } else {
    baseline = safeNumber(point.row.last_observed_value);
  }
  if (baseline === null) return null;
  const change = point.value - baseline;
  if (measure === "change") return change;
  if (baseline === 0) return null;
  return change / Math.abs(baseline);
}

function formatSigned(value, options = {}) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Not available";
  const formatted = numberFormatter.format(Math.abs(value));
  return `${value > 0 ? "+" : value < 0 ? "−" : ""}${formatted}${options.suffix ?? ""}`;
}

function countryById(id) {
  return listCountries().find((country) => country.id === String(id)) ?? null;
}

function selectedCountryName() {
  return state.selectedCountry === "all" ? "All countries" : countryById(state.selectedCountry)?.name ?? "Selected country";
}

function renderOutlook() {
  renderTimeline();
  renderMap();
  renderHorizonCards();
  renderTrendChart();
  renderRanking();
  renderInsights();
}

function populateIntelligenceCountryControl() {
  replaceOptions(ui.intelligenceCountrySelect, listCountries().map(({ id, name }) => ({ value: id, label: name })));
  if (state.selectedCountry !== "all" && countryById(state.selectedCountry)) {
    ui.intelligenceCountrySelect.value = state.selectedCountry;
  }
}

function populateMigrationCountryControl() {
  const countries = listCountries();
  replaceOptions(ui.migrationCountrySelect, countries.map(({ id, name }) => ({ value: id, label: name })));
  const preferred = countries.find((item) => item.id === state.selectedCountry)
    ?? countries.find((item) => normalizeName(item.name) === "spain")
    ?? countries[0];
  if (preferred) ui.migrationCountrySelect.value = preferred.id;
}

function navigateToDashboardPage(page) {
  const hash = page === "country-intelligence" ? "#country-intelligence"
    : page === "country-benchmark" ? "#country-benchmark"
      : page === "migration-context" ? "#migration-context"
        : page === "forecast-reliability" ? "#forecast-reliability"
          : page === "city-intelligence" ? "#city-intelligence"
            : page === "data-methodology" ? "#data-methodology" : "#european-outlook";
  if (window.location.hash === hash) applyDashboardRoute();
  else window.location.hash = hash;
}

function applyDashboardRoute() {
  if (!state.initialized || ui.dashboardView.hidden) return;
  const isReliabilityPage = window.location.hash === "#forecast-reliability";
  const isCityPage = window.location.hash === "#city-intelligence";
  const isMethodologyPage = window.location.hash === "#data-methodology";
  const isContextPage = window.location.hash === "#migration-context";
  const isBenchmarkPage = window.location.hash === "#country-benchmark";
  const isCountryPage = window.location.hash === "#country-intelligence";
  state.activePage = isMethodologyPage ? "data-methodology" : isCityPage ? "city-intelligence" : isReliabilityPage ? "forecast-reliability" : isContextPage ? "migration-context" : isBenchmarkPage ? "country-benchmark" : isCountryPage ? "country-intelligence" : "european-outlook";
  if ((isCountryPage || isContextPage || isCityPage) && state.selectedCountry === "all") {
    const countries = listCountries();
    const preferred = countries.find((item) => normalizeName(item.name) === "spain") ?? countries[0];
    if (preferred) state.selectedCountry = preferred.id;
  }
  ui.europeanPage.hidden = isCountryPage || isBenchmarkPage || isContextPage || isReliabilityPage || isCityPage || isMethodologyPage;
  ui.countryPage.hidden = !isCountryPage;
  ui.benchmarkPage.hidden = !isBenchmarkPage;
  ui.contextPage.hidden = !isContextPage;
  ui.reliabilityPage.hidden = !isReliabilityPage;
  ui.cityPage.hidden = !isCityPage;
  ui.methodologyPage.hidden = !isMethodologyPage;
  ui.navEuropean.classList.toggle("is-active", !isCountryPage && !isBenchmarkPage && !isContextPage && !isReliabilityPage && !isCityPage && !isMethodologyPage);
  ui.navCountry.classList.toggle("is-active", isCountryPage);
  ui.navBenchmark.classList.toggle("is-active", isBenchmarkPage);
  ui.navContext.classList.toggle("is-active", isContextPage);
  ui.navReliability.classList.toggle("is-active", isReliabilityPage);
  ui.navCity.classList.toggle("is-active", isCityPage);
  ui.navMethodology.classList.toggle("is-active", isMethodologyPage);
  ui.navMethodology.removeAttribute("aria-current");
  if (isCountryPage) {
    ui.navCountry.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Country Intelligence";
    ui.dashboardEyebrow.textContent = "COUNTRY · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "Explore a country's historical trajectory and future outlook";
    document.title = "Country Intelligence · migrAI";
    populateIntelligenceCountryControl();
    ui.mapCountrySelect.value = state.selectedCountry;
    ui.countrySearch.value = countryById(state.selectedCountry)?.name ?? "";
    renderCountryIntelligence();
  } else if (isBenchmarkPage) {
    ui.navBenchmark.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Country Benchmark";
    ui.dashboardEyebrow.textContent = "COUNTRY COMPARISON · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "Compare historical and forecast immigration patterns across countries";
    document.title = "Country Benchmark · migrAI";
    renderCountryBenchmark();
  } else if (isContextPage) {
    ui.navContext.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Migration Context";
    ui.dashboardEyebrow.textContent = "HISTORICAL CONTEXT · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "Explore how observed migration moves alongside wider conditions";
    document.title = "Migration Context · migrAI";
    populateMigrationCountryControl();
    renderMigrationContext();
  } else if (isReliabilityPage) {
    ui.navReliability.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Forecast Reliability";
    ui.dashboardEyebrow.textContent = "MODEL VALIDATION · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "See what the published validation evidence can—and cannot—support";
    document.title = "Forecast Reliability · migrAI";
    renderForecastReliability();
  } else if (isCityPage) {
    ui.navCity.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "City Intelligence";
    ui.dashboardEyebrow.textContent = "URBAN DATA · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "Explore foreign population shares and city-level forecasts";
    document.title = "City Intelligence · migrAI";
    renderCityIntelligence();
  } else if (isMethodologyPage) {
    ui.navMethodology.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Data & Methodology";
    ui.dashboardEyebrow.textContent = "DATA COVERAGE · TRANSPARENCY";
    ui.dashboardSubtitle.textContent = "Understand published data, forecast status and modelling scope";
    document.title = "Data & Methodology · migrAI";
    renderDataMethodology();
  } else {
    ui.navEuropean.setAttribute("aria-current", "page");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "European Migration Outlook";
    ui.dashboardEyebrow.textContent = "EUROPE · MIGRATION INTELLIGENCE";
    ui.dashboardSubtitle.textContent = "Explore historical immigration and future forecasts";
    document.title = "European Migration Outlook · migrAI";
    renderOutlook();
  }
}

function methodologySourceKey(row) {
  return Object.keys(row ?? {}).find((key) => /^(source(_family|_name|_id|_code)?|dataset(_name|_id)?|provider)$/i.test(key)) ?? null;
}

function methodologySourceLabel(row) {
  const key = methodologySourceKey(row);
  const value = key ? row[key] : null;
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function methodologyObservedRows() {
  return [...state.observed, ...state.cityObserved];
}

function methodologyCoverageRows() {
  const selectedLevel = ui.methodologyCoverageLevel.value;
  return methodologyObservedRows().filter((row) => {
    if (selectedLevel !== "all" && row.level !== selectedLevel) return false;
    if (state.methodologySource !== "all" && methodologySourceLabel(row) !== state.methodologySource) return false;
    return true;
  });
}

function renderDataMethodology() {
  renderDataMethodologySummary();
  renderDataMethodologySourceOptions();
  renderDataMethodologyCoverage();
  renderDataMethodologyRun();
  renderDataMethodologyStatus();
}

function renderDataMethodologySummary() {
  const rows = methodologyObservedRows();
  const validRows = rows.filter((row) => safeNumber(row.value) !== null && safeNumber(row.year) !== null);
  const missingRows = rows.filter((row) => safeNumber(row.value) === null).length;
  const years = unique(rows.map((row) => safeNumber(row.year)).filter((year) => year !== null)).sort((a, b) => a - b);
  const entityKey = (row) => String(row.entity_id ?? row.entity_name ?? "");
  const representedEntities = unique(rows.map(entityKey).filter(Boolean));
  const validEntities = unique(validRows.map(entityKey).filter(Boolean));
  const attributedRows = rows.filter((row) => methodologySourceLabel(row));
  const sourceFamilies = unique(attributedRows.map(methodologySourceLabel));
  const forecasts = [...state.forecasts, ...state.cityForecasts];
  const availableForecasts = forecasts.filter((row) => methodologyForecastStatus(row) === "available");
  const missingShare = rows.length ? Math.round(missingRows / rows.length * 100) : null;

  ui.methodologyObservedCount.textContent = numberFormatter.format(validRows.length);
  ui.methodologyMissingCount.textContent = numberFormatter.format(missingRows);
  ui.methodologyMissingNote.textContent = rows.length
    ? `${Math.round(missingRows / rows.length * 100)}% of published observed values are null or non-numeric`
    : "No observed rows are currently published";
  ui.methodologyTemporalCoverage.textContent = years.length ? `${years[0]}–${years.at(-1)}` : "Not available";
  ui.methodologyTemporalNote.textContent = years.length ? `${years.length} distinct observed years · ${numberFormatter.format(rows.length)} rows` : "No observed years are published";
  ui.methodologyTerritorialCoverage.textContent = `${numberFormatter.format(validEntities.length)} / ${numberFormatter.format(representedEntities.length)}`;
  ui.methodologyTerritorialNote.textContent = "Entities with a valid value / entities represented in observed rows";
  ui.methodologySourceCoverage.textContent = `${numberFormatter.format(attributedRows.length)} / ${numberFormatter.format(rows.length)}`;
  ui.methodologySourceCoverageNote.textContent = sourceFamilies.length
    ? `${sourceFamilies.length} source ${sourceFamilies.length === 1 ? "family" : "families"} represented in published rows`
    : "No source family is exposed in observed rows";
  ui.methodologyForecastCount.textContent = `${numberFormatter.format(availableForecasts.length)} / ${numberFormatter.format(forecasts.length)}`;
  const forecastStatuses = { available: 0, partial: 0, unavailable: 0 };
  forecasts.forEach((row) => { forecastStatuses[methodologyForecastStatus(row)] += 1; });
  ui.methodologyForecastNote.textContent = forecasts.length
    ? `${forecastStatuses.available} available · ${forecastStatuses.partial} partial · ${forecastStatuses.unavailable} unavailable`
    : "No forecast rows are currently published";
  ui.methodologyMissingCount.title = missingShare === null ? "No observed rows" : `${missingShare}% of published observed rows have a missing or non-numeric value`;
}

function renderDataMethodologySourceOptions() {
  const current = state.methodologySource;
  const families = unique(methodologyObservedRows().map(methodologySourceLabel).filter(Boolean)).sort((a, b) => a.localeCompare(b));
  const entries = [{ value: "all", label: "All published records" }, ...families.map((family) => ({ value: family, label: family }))];
  replaceOptions(ui.methodologySourceFilter, entries);
  ui.methodologySourceFilter.disabled = families.length === 0;
  if (families.includes(current)) {
    ui.methodologySourceFilter.value = current;
  } else {
    state.methodologySource = "all";
    ui.methodologySourceFilter.value = "all";
  }
  ui.methodologyCoverageNote.textContent = families.length
    ? "Available = every published row has a valid value; Partial = rows exist but some values are missing; No row = no observation for that entity-year."
    : "Source-family filtering is unavailable: the published observed views do not expose a source-family field. Coverage is based on valid observed rows only.";
}

function renderDataMethodologyCoverage() {
  const rows = methodologyCoverageRows();
  const entities = new Map();
  const years = unique(rows.map((row) => safeNumber(row.year)).filter((year) => year !== null)).sort((a, b) => a - b);
  rows.forEach((row) => {
    const id = String(row.entity_id ?? row.entity_name ?? "Unknown entity");
    if (!entities.has(id)) entities.set(id, { id, name: String(row.entity_name ?? row.entity_id ?? "Unknown entity"), level: row.level ?? "unknown", rows: [] });
    entities.get(id).rows.push(row);
  });
  ui.methodologyCoverageGrid.replaceChildren();
  if (!entities.size || !years.length) {
    const empty = document.createElement("p");
    empty.className = "methodology-empty";
    empty.textContent = "No observed entity-year rows match these filters.";
    ui.methodologyCoverageGrid.append(empty);
    return;
  }

  const table = document.createElement("table");
  table.className = "methodology-coverage-table";
  const caption = document.createElement("caption");
  caption.className = "sr-only";
  caption.textContent = "Observed record availability by entity and year";
  table.append(caption);
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  const entityHeading = document.createElement("th");
  entityHeading.scope = "col";
  entityHeading.textContent = "Entity";
  headRow.append(entityHeading);
  years.forEach((year) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = String(year);
    headRow.append(th);
  });
  head.append(headRow);
  table.append(head);
  const body = document.createElement("tbody");
  [...entities.values()].sort((a, b) => a.name.localeCompare(b.name, "en")).forEach((entity) => {
    const tr = document.createElement("tr");
    const label = document.createElement("th");
    label.scope = "row";
    label.textContent = entity.name;
    label.title = `${entity.name} · ${entity.level}`;
    tr.append(label);
    years.forEach((year) => {
      const yearRows = entity.rows.filter((row) => safeNumber(row.year) === year);
      const validCount = yearRows.filter((row) => safeNumber(row.value) !== null).length;
      const status = !yearRows.length ? "unavailable" : validCount === yearRows.length ? "available" : "partial";
      const cell = document.createElement("td");
      const mark = document.createElement("span");
      mark.className = `coverage-cell coverage-cell--${status}`;
      mark.setAttribute("aria-label", status === "available" ? "Available" : status === "partial" ? "Partial value" : "No row");
      mark.title = status === "available" ? `${year} · ${validCount} valid observation${validCount === 1 ? "" : "s"}`
        : status === "partial" ? `${year} · ${yearRows.length - validCount} missing or non-numeric value${yearRows.length - validCount === 1 ? "" : "s"}`
          : `${year} · no observed row`;
      cell.append(mark);
      tr.append(cell);
    });
    body.append(tr);
  });
  table.append(body);
  ui.methodologyCoverageGrid.append(table);
}

function methodologyField(row, matcher) {
  const key = Object.keys(row ?? {}).find((item) => matcher.test(item));
  const value = key ? row[key] : null;
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function methodologyForecastStatus(row) {
  const explicitlyAvailable = row?.forecast_available === true || row?.forecast_available === "true";
  const explicitlyUnavailable = row?.forecast_available === false || row?.forecast_available === "false";
  const hasPrediction = safeNumber(row?.prediction) !== null;
  const hasTarget = safeNumber(row?.target_year) !== null;
  if (explicitlyAvailable && hasPrediction && hasTarget) return "available";
  if (explicitlyAvailable || (!explicitlyUnavailable && (hasPrediction || hasTarget))) return "partial";
  return "unavailable";
}

function methodologyRunReference(row) {
  const value = row?.run_id ?? row?.run_label;
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function methodologyRunReferences(row) {
  return unique([row?.run_id, row?.run_label]
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map(String));
}

function renderDataMethodologyRun() {
  const latestRun = state.runs.find((run) => run.is_latest === true || run.is_latest === "true") ?? state.runs[0] ?? null;
  ui.methodologyRunMetadata.replaceChildren();
  const forecasts = [...state.forecasts, ...state.cityForecasts];
  const runRef = latestRun ? methodologyRunReference(latestRun) : "";
  const latestReferences = latestRun ? methodologyRunReferences(latestRun) : [];
  const linkedForecasts = forecasts.filter((row) => methodologyRunReferences(row).some((reference) => latestReferences.includes(reference)));
  const hasForecastRunLink = latestReferences.length > 0 && linkedForecasts.length > 0;
  const matchingForecasts = hasForecastRunLink ? linkedForecasts : forecasts;
  const latestModel = unique(matchingForecasts.map((row) => forecastModelLabel(row)).filter(Boolean)).join(" · ");
  const timeValue = latestRun ? methodologyField(latestRun, /^(created_at|updated_at|started_at|finished_at|completed_at|run_at|timestamp)$/i) : "";
  const timestamp = timeValue ? new Date(timeValue) : null;
  const formattedTimestamp = timestamp && !Number.isNaN(timestamp.getTime())
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(timestamp)
    : "Not published";
  const runLevel = latestRun ? methodologyField(latestRun, /^(level|updated_level|scope)$/i) : "";
  const runStatus = latestRun ? methodologyField(latestRun, /^(status|run_status|state)$/i) : "";
  const runVersion = latestRun ? methodologyField(latestRun, /^(version|pipeline_version|code_version)$/i) : "";
  const runCommit = latestRun ? methodologyField(latestRun, /^(commit|commit_sha|git_commit)$/i) : "";
  const metadata = [
    { label: "Run reference", value: runRef || "Not published" },
    { label: "Date & time", value: formattedTimestamp },
    { label: "Updated level", value: runLevel || "Not published" },
    { label: "Run status", value: runStatus || (latestRun ? "Not published" : "No run metadata") },
    { label: "Model", value: latestModel || "Not published in linked rows" },
    { label: "Pipeline version", value: runVersion || "Not published" },
    { label: "Commit", value: runCommit || "Not published" },
    { label: "Valid forecasts", value: numberFormatter.format(matchingForecasts.filter((row) => methodologyForecastStatus(row) === "available").length) },
  ];
  metadata.forEach(({ label, value }) => {
    const item = document.createElement("article");
    const term = document.createElement("span");
    term.textContent = label;
    const detail = document.createElement("strong");
    detail.textContent = value;
    item.append(term, detail);
    ui.methodologyRunMetadata.append(item);
  });
  ui.methodologyRunNote.textContent = latestRun
    ? `Fields marked “Not published” are not exposed by the current runs view. Forecast totals are counted from ${hasForecastRunLink ? "rows linked to this run" : "the current published rows; a run-level link is not exposed"}.`
    : "The dashboard could not find a run row in the published runs view.";
}

function setMethodologyOptions(select, allLabel, entries) {
  const previous = select.value;
  replaceOptions(select, [{ value: "all", label: allLabel }, ...entries]);
  if (entries.some((entry) => entry.value === previous)) select.value = previous;
}

function renderDataMethodologyStatus() {
  const forecasts = [...state.forecasts, ...state.cityForecasts];
  const level = ui.methodologyStatusLevel.value;
  const scopedRows = forecasts.filter((row) => level === "all" || row.level === level);
  const entities = new Map();
  scopedRows.forEach((row) => {
    const key = `${row.level ?? "unknown"}|${row.entity_id ?? row.entity_name ?? "unknown"}`;
    if (!entities.has(key)) entities.set(key, `${row.entity_name ?? row.entity_id ?? "Unknown entity"} · ${row.level ?? "level unavailable"}`);
  });
  setMethodologyOptions(ui.methodologyEntityFilter, "All entities", [...entities].sort((a, b) => a[1].localeCompare(b[1], "en")).map(([value, label]) => ({ value, label })));

  const horizons = unique(scopedRows.map((row) => safeNumber(row.horizon)).filter((value) => value !== null)).sort((a, b) => a - b);
  setMethodologyOptions(ui.methodologyHorizonFilter, "All horizons", horizons.map((value) => ({ value: String(value), label: `${value}-year` })));
  const statuses = unique(scopedRows.map(methodologyForecastStatus));
  setMethodologyOptions(ui.methodologyStatusFilter, "All statuses", ["available", "partial", "unavailable"].filter((value) => statuses.includes(value)).map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })));

  const runValues = unique(scopedRows.map(methodologyRunReference).filter(Boolean));
  const runRowsHaveReference = scopedRows.some((row) => methodologyRunReference(row));
  setMethodologyOptions(ui.methodologyRunFilter, "All runs", runValues.map((value) => ({ value, label: value })));
  ui.methodologyRunFilter.disabled = !runRowsHaveReference;

  const entityValue = ui.methodologyEntityFilter.value;
  const horizonValue = ui.methodologyHorizonFilter.value;
  const statusValue = ui.methodologyStatusFilter.value;
  const runValue = ui.methodologyRunFilter.value;
  const filtered = scopedRows.filter((row) => {
    const entityKey = `${row.level ?? "unknown"}|${row.entity_id ?? row.entity_name ?? "unknown"}`;
    if (entityValue !== "all" && entityKey !== entityValue) return false;
    if (horizonValue !== "all" && String(safeNumber(row.horizon)) !== horizonValue) return false;
    if (statusValue !== "all" && methodologyForecastStatus(row) !== statusValue) return false;
    if (runValue !== "all" && methodologyRunReference(row) !== runValue) return false;
    return true;
  });
  ui.methodologyStatusRows.replaceChildren();
  filtered.forEach((row) => {
    const tr = document.createElement("tr");
    const status = methodologyForecastStatus(row);
    const hasPrediction = safeNumber(row.prediction) !== null;
    const customNote = methodologyField(row, /^(notes?|status_note|forecast_note|message)$/i);
    const note = customNote || (status === "available" ? "Prediction and target year are published."
      : status === "partial" ? "Forecast is flagged, but its prediction or target year is missing."
        : "No usable forecast value is published for this row.");
    const originYear = methodologyField(row, /^(origin_year|forecast_origin_year|cutoff_year|training_cutoff_year|train_until_year|base_year)$/i);
    const cells = [
      String(row.entity_name ?? row.entity_id ?? "Unknown entity"),
      String(row.level ?? "Not published"),
      originYear || "Not published",
      safeNumber(row.target_year) === null ? "Not published" : String(safeNumber(row.target_year)),
      safeNumber(row.horizon) === null ? "Not published" : `${safeNumber(row.horizon)}-year`,
      forecastModelLabel(row) || "Not published",
      "",
      note,
    ];
    cells.forEach((value, index) => {
      const td = document.createElement("td");
      if (index === 6) {
        const badge = document.createElement("span");
        badge.className = `methodology-status-badge methodology-status-badge--${status}`;
        badge.textContent = status[0].toUpperCase() + status.slice(1);
        td.append(badge);
      } else {
        td.textContent = value;
      }
      tr.append(td);
    });
    tr.title = hasPrediction ? `${row.entity_name ?? row.entity_id ?? "Entity"} · ${status}` : note;
    ui.methodologyStatusRows.append(tr);
  });
  if (!filtered.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 8;
    cell.className = "methodology-table-empty";
    cell.textContent = "No published forecast rows match these filters.";
    row.append(cell);
    ui.methodologyStatusRows.append(row);
  }
  ui.methodologyStatusNote.textContent = runRowsHaveReference
    ? `${numberFormatter.format(filtered.length)} of ${numberFormatter.format(scopedRows.length)} published forecast rows match these filters.`
    : `${numberFormatter.format(filtered.length)} of ${numberFormatter.format(scopedRows.length)} published forecast rows match these filters. Run-level filtering is unavailable because forecast rows do not expose a run reference.`;
}

const benchmarkPalette = ["#fb984e", "#54b9e9", "#53c7a5", "#c77dff", "#f5c64d"];
const benchmarkFlags = {
  austria: "🇦🇹", belgium: "🇧🇪", bulgaria: "🇧🇬", croatia: "🇭🇷", cyprus: "🇨🇾", czechia: "🇨🇿",
  czechrepublic: "🇨🇿", denmark: "🇩🇰", estonia: "🇪🇪", finland: "🇫🇮", france: "🇫🇷", germany: "🇩🇪",
  greece: "🇬🇷", hungary: "🇭🇺", iceland: "🇮🇸", ireland: "🇮🇪", italy: "🇮🇹", latvia: "🇱🇻",
  lithuania: "🇱🇹", luxembourg: "🇱🇺", malta: "🇲🇹", netherlands: "🇳🇱", norway: "🇳🇴", poland: "🇵🇱",
  portugal: "🇵🇹", romania: "🇷🇴", slovakia: "🇸🇰", slovenia: "🇸🇮", spain: "🇪🇸", sweden: "🇸🇪",
  switzerland: "🇨🇭", turkey: "🇹🇷", turkiye: "🇹🇷", unitedkingdom: "🇬🇧", uk: "🇬🇧",
};

function benchmarkFlag(country) {
  return benchmarkFlags[normalizeName(country?.name)] ?? "";
}

function benchmarkColor(countryId) {
  const selectedIndex = state.selectedBenchmarkCountries.findIndex((id) => String(id) === String(countryId));
  const index = selectedIndex >= 0 ? selectedIndex : listCountries().findIndex((country) => country.id === String(countryId));
  return benchmarkPalette[(index < 0 ? 0 : index) % benchmarkPalette.length];
}

function benchmarkCountryCoverage(countryId) {
  const observedYears = new Set(state.observed
    .filter((row) => String(row.entity_id) === String(countryId) && safeNumber(row.year) !== null && safeNumber(row.value) !== null)
    .map((row) => safeNumber(row.year)));
  const forecastCount = state.forecasts.filter((row) => String(row.entity_id) === String(countryId)
    && forecastIsAvailable(row) && safeNumber(row.target_year) !== null && safeNumber(row.prediction) !== null).length;
  return { observed: observedYears.size, forecasts: forecastCount };
}

function defaultBenchmarkCountries() {
  return listCountries()
    .map((country) => ({ ...country, coverage: benchmarkCountryCoverage(country.id) }))
    .sort((a, b) => b.coverage.observed - a.coverage.observed
      || b.coverage.forecasts - a.coverage.forecasts
      || a.name.localeCompare(b.name, "en"))
    .slice(0, 5)
    .map((country) => country.id);
}

function selectedBenchmarkCountries() {
  return state.selectedBenchmarkCountries
    .slice(0, 5)
    .map((id) => countryById(id))
    .filter(Boolean);
}

function benchmarkObservationMap(countryId) {
  const rows = state.observed
    .filter((row) => String(row.entity_id) === String(countryId))
    .map((row) => ({ row, year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((item) => item.year !== null && item.value !== null)
    .sort((a, b) => a.year - b.year);
  const byYear = new Map();
  rows.forEach((item) => {
    if (!byYear.has(item.year)) byYear.set(item.year, item.row);
    else if (safeNumber(byYear.get(item.year).value) !== item.value) byYear.set(item.year, null);
  });
  return new Map([...byYear.entries()].filter(([, row]) => row));
}

function benchmarkObservations(countryId) {
  return [...benchmarkObservationMap(countryId).values()]
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
}

function benchmarkLatestObservation(countryId) {
  return benchmarkObservations(countryId).at(-1) ?? null;
}

function benchmarkForecastRows(countryId) {
  const rows = state.forecasts
    .filter((row) => String(row.entity_id) === String(countryId))
    .filter((row) => forecastIsAvailable(row) && safeNumber(row.horizon) !== null
      && safeNumber(row.target_year) !== null && safeNumber(row.prediction) !== null)
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon) || safeNumber(a.target_year) - safeNumber(b.target_year));
  const byHorizon = new Map();
  rows.forEach((row) => {
    if (!byHorizon.has(safeNumber(row.horizon))) byHorizon.set(safeNumber(row.horizon), row);
  });
  return [...byHorizon.values()].sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
}

function benchmarkComparableForecast(countryId, horizon) {
  const latest = benchmarkLatestObservation(countryId);
  if (!latest) return null;
  const row = benchmarkForecastRows(countryId).find((item) => safeNumber(item.horizon) === Number(horizon));
  if (!row) return null;
  const recordedBaseline = safeNumber(row.last_observed_value);
  const baseline = safeNumber(latest.value);
  if (recordedBaseline === null || baseline === null || Math.abs(recordedBaseline - baseline) > 0.000001) return null;
  return { row, latest, baseline, prediction: safeNumber(row.prediction), change: safeNumber(row.prediction) - baseline };
}

function benchmarkCommonYears(countryIds = state.selectedBenchmarkCountries) {
  if (!countryIds.length) return [];
  const yearSets = countryIds.map((id) => new Set(benchmarkObservationMap(id).keys()));
  if (yearSets.some((years) => years.size === 0)) return [];
  return [...yearSets[0]].filter((year) => yearSets.every((years) => years.has(year))).sort((a, b) => a - b);
}

function benchmarkSelectedYearWindow() {
  const years = benchmarkCommonYears();
  const length = ui.benchmarkPeriod.value === "all" ? years.length : Number(ui.benchmarkPeriod.value);
  return years.slice(Math.max(0, years.length - length));
}

function populateBenchmarkCountryMenu() {
  ui.benchmarkSelectorMenu.replaceChildren();
  listCountries().forEach((country) => {
    const coverage = benchmarkCountryCoverage(country.id);
    const label = document.createElement("label");
    label.className = "benchmark-country-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.countryId = country.id;
    checkbox.checked = state.selectedBenchmarkCountries.includes(country.id);
    checkbox.disabled = !checkbox.checked && state.selectedBenchmarkCountries.length >= 5;
    checkbox.setAttribute("aria-label", `Compare ${country.name}`);
    const flag = document.createElement("span");
    flag.className = "benchmark-country-option__flag";
    flag.textContent = benchmarkFlag(country);
    flag.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.className = "benchmark-country-option__name";
    name.textContent = country.name;
    const meta = document.createElement("small");
    meta.textContent = `${coverage.observed} observed years`;
    label.append(checkbox, flag, name, meta);
    ui.benchmarkSelectorMenu.append(label);
  });
}

function benchmarkYearsForSelection() {
  const years = [];
  state.selectedBenchmarkCountries.forEach((id) => {
    benchmarkObservationMap(id).forEach((row, year) => years.push(year));
    benchmarkForecastRows(id).forEach((row) => years.push(safeNumber(row.target_year)));
  });
  return unique(years).filter((year) => year !== null).sort((a, b) => a - b);
}

function syncBenchmarkSelect(select, entries, preferredValue) {
  const previous = select.value;
  replaceOptions(select, entries.length ? entries : [{ value: "", label: "Not available" }]);
  select.disabled = entries.length === 0;
  const next = [previous, preferredValue].find((value) => value !== undefined && entries.some((entry) => String(entry.value) === String(value)));
  if (next !== undefined) select.value = String(next);
}

function benchmarkPointForYear(countryId, year) {
  const observed = benchmarkObservationMap(countryId).get(Number(year));
  if (observed) return { value: safeNumber(observed.value), type: "Observed", row: observed };
  const forecasts = benchmarkForecastRows(countryId)
    .filter((row) => safeNumber(row.target_year) === Number(year))
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const forecast = forecasts[0];
  return forecast ? { value: safeNumber(forecast.prediction), type: "Forecast", row: forecast } : null;
}

function renderBenchmarkSelection() {
  state.selectedBenchmarkCountries = unique(state.selectedBenchmarkCountries).filter((id) => countryById(id)).slice(0, 5);
  populateBenchmarkCountryMenu();
  ui.benchmarkSelectionCount.textContent = `${state.selectedBenchmarkCountries.length} of 5 selected`;
  ui.benchmarkSelectorToggle.querySelector("span:first-child").textContent = state.selectedBenchmarkCountries.length
    ? "Add or remove countries…" : "Select countries…";
  ui.benchmarkSelectedCountries.replaceChildren();
  selectedBenchmarkCountries().forEach((country) => {
    const chip = document.createElement("span");
    chip.className = "benchmark-country-chip";
    chip.style.setProperty("--series-color", benchmarkColor(country.id));
    const flag = document.createElement("span");
    flag.className = "benchmark-country-chip__flag";
    flag.textContent = benchmarkFlag(country);
    flag.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.textContent = country.name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.removeCountry = country.id;
    remove.setAttribute("aria-label", `Remove ${country.name}`);
    remove.title = `Remove ${country.name}`;
    remove.textContent = "×";
    chip.append(flag, name, remove);
    ui.benchmarkSelectedCountries.append(chip);
  });
  ui.benchmarkSelectionNote.textContent = state.selectedBenchmarkCountries.length
    ? "The initial set uses countries with the broadest observed coverage. You can change it at any time."
    : "Select at least one country to display the comparison.";
}

function renderBenchmarkControls() {
  const selectedIds = state.selectedBenchmarkCountries;
  const availableYears = benchmarkYearsForSelection();
  const commonYears = benchmarkCommonYears();
  const preferredYear = commonYears.at(-1) ?? availableYears.filter((year) => selectedIds.some((id) => benchmarkObservationMap(id).has(year))).at(-1);
  syncBenchmarkSelect(ui.benchmarkRankingYear, availableYears.map((year) => ({ value: year, label: String(year) })), preferredYear);
  const horizons = unique(selectedIds.flatMap((id) => benchmarkForecastRows(id).map((row) => safeNumber(row.horizon))))
    .filter((horizon) => horizon !== null).sort((a, b) => a - b);
  const preferredHorizon = horizons.includes(3) ? 3 : horizons.includes(1) ? 1 : horizons[0];
  syncBenchmarkSelect(ui.benchmarkHorizon, horizons.map((horizon) => ({ value: horizon, label: `${horizon}-year` })), preferredHorizon);
  ui.benchmarkAbsoluteButton.setAttribute("aria-pressed", String(state.benchmarkMeasure === "absolute"));
  ui.benchmarkIndexButton.setAttribute("aria-pressed", String(state.benchmarkMeasure === "index"));
}

function benchmarkEmpty(container, message) {
  const empty = document.createElement("div");
  empty.className = "benchmark-empty-state";
  empty.textContent = message;
  container.replaceChildren(empty);
}

function benchmarkCompactNumber(value) {
  return new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function benchmarkSeriesPath(points, x, y, splitGaps = false) {
  const paths = [];
  let segment = [];
  points.slice().sort((a, b) => a.year - b.year).forEach((point) => {
    if (splitGaps && segment.length && point.year - segment.at(-1).year > 1) {
      if (segment.length > 1) paths.push(segment);
      segment = [];
    }
    segment.push(point);
  });
  if (segment.length > 1) paths.push(segment);
  return paths.map((items) => items.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" "));
}

function renderBenchmarkTrendChart() {
  ui.benchmarkTrendChart.replaceChildren();
  const countries = selectedBenchmarkCountries();
  const commonYears = benchmarkSelectedYearWindow();
  if (!countries.length) {
    ui.benchmarkTrendSubtitle.textContent = "Choose up to five countries to compare their annual flows";
    benchmarkEmpty(ui.benchmarkTrendChart, "Select one or more countries above to start the comparison.");
    ui.benchmarkChartLegend.replaceChildren();
    ui.benchmarkTrendNote.textContent = "";
    return;
  }
  if (!commonYears.length) {
    ui.benchmarkTrendSubtitle.textContent = "No common valid observed year is available for this selection";
    benchmarkEmpty(ui.benchmarkTrendChart, "The selected countries do not share a valid observed year in the published data.");
    ui.benchmarkChartLegend.replaceChildren();
    ui.benchmarkTrendNote.textContent = "Try a different country selection. Forecasts remain visible in the heatmap where a comparable baseline exists.";
    return;
  }

  const startYear = commonYears[0];
  const endYear = commonYears.at(-1);
  const indexBaseYear = commonYears.find((year) => countries.every((country) => {
    const row = benchmarkObservationMap(country.id).get(year);
    return row && safeNumber(row.value) !== 0;
  }));
  const indexed = state.benchmarkMeasure === "index";
  const baseValues = new Map(countries.map((country) => [country.id, indexBaseYear === undefined
    ? null : safeNumber(benchmarkObservationMap(country.id).get(indexBaseYear)?.value)]));
  const chartRows = countries.map((country) => {
    const observed = benchmarkObservations(country.id)
      .filter((row) => safeNumber(row.year) >= startYear && safeNumber(row.year) <= endYear)
      .map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value), row, type: "observed" }))
      .map((point) => ({ ...point, value: indexed ? (baseValues.get(country.id) ? point.value / baseValues.get(country.id) * 100 : null) : point.value }))
      .filter((point) => point.value !== null);
    const forecasts = benchmarkForecastRows(country.id)
      .map((row) => ({ year: safeNumber(row.target_year), value: safeNumber(row.prediction), row, type: "forecast", horizon: safeNumber(row.horizon) }))
      .map((point) => ({ ...point, value: indexed ? (baseValues.get(country.id) ? point.value / baseValues.get(country.id) * 100 : null) : point.value }))
      .filter((point) => point.year !== null && point.value !== null);
    const latest = benchmarkLatestObservation(country.id);
    const forecastsComparable = latest && forecasts.some((point) => {
      const baseline = safeNumber(point.row.last_observed_value);
      return baseline !== null && Math.abs(baseline - safeNumber(latest.value)) <= 0.000001;
    });
    const anchor = forecastsComparable && safeNumber(latest.year) >= startYear && safeNumber(latest.year) <= endYear
      ? [{ year: safeNumber(latest.year), value: indexed ? (baseValues.get(country.id) ? safeNumber(latest.value) / baseValues.get(country.id) * 100 : null) : safeNumber(latest.value), row: latest, type: "observed" }]
      : [];
    return { country, observed, forecasts, anchor };
  });
  const values = chartRows.flatMap((series) => [...series.observed, ...series.forecasts, ...series.anchor].map((point) => point.value));
  const years = chartRows.flatMap((series) => [...series.observed, ...series.forecasts, ...series.anchor].map((point) => point.year));
  if (!values.length || !years.length) {
    benchmarkEmpty(ui.benchmarkTrendChart, indexed && indexBaseYear === undefined
      ? "A historical index cannot be calculated because the selected countries have no shared non-zero base year."
      : "No historical or forecast values are available for this selection.");
    ui.benchmarkChartLegend.replaceChildren();
    return;
  }

  const width = Math.max(320, Math.round(ui.benchmarkTrendChart.getBoundingClientRect().width || 1000));
  const height = 365;
  const margin = { top: 20, right: 24, bottom: 48, left: 68 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const x = (year) => margin.left + (maxYear === minYear ? plotWidth / 2 : (year - minYear) / (maxYear - minYear) * plotWidth);
  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);
  const padding = maxValue === minValue ? Math.max(Math.abs(maxValue) * .1, 1) : (maxValue - minValue) * .1;
  minValue -= padding;
  maxValue += padding;
  const y = (value) => margin.top + (maxValue - value) / (maxValue - minValue) * plotHeight;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `Historical and forecast immigration comparison, ${countries.map((country) => country.name).join(", ")}` });
  for (let tick = 0; tick <= 4; tick += 1) {
    const value = minValue + (maxValue - minValue) * tick / 4;
    const yPos = y(value);
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: yPos, y2: yPos, class: "benchmark-gridline" }));
    const label = createSvg("text", { x: margin.left - 9, y: yPos + 4, "text-anchor": "end", class: "benchmark-axis-label" });
    label.textContent = indexed ? value.toFixed(0) : benchmarkCompactNumber(value);
    svg.append(label);
  }
  const yearTicks = unique(years).sort((a, b) => a - b);
  const tickCount = Math.min(8, yearTicks.length);
  const visibleTicks = tickCount === yearTicks.length || tickCount <= 1 ? yearTicks : Array.from({ length: tickCount }, (_, index) => yearTicks[Math.round(index * (yearTicks.length - 1) / (tickCount - 1))]);
  visibleTicks.forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 23, "text-anchor": "middle", class: "benchmark-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: height - margin.bottom, y2: height - margin.bottom, class: "benchmark-axis-line" }));
  const yTitle = createSvg("text", { x: 17, y: height / 2, transform: `rotate(-90 17 ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
  yTitle.textContent = indexed ? `Index (base ${indexBaseYear} = 100)` : "Persons per year";
  svg.append(yTitle);
  const xTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 4, "text-anchor": "middle", class: "benchmark-axis-title" });
  xTitle.textContent = "Year";
  svg.append(xTitle);

  const forecastYears = chartRows.flatMap((series) => series.forecasts.map((point) => point.year));
  const firstForecastYear = forecastYears.length ? Math.min(...forecastYears) : null;
  if (firstForecastYear !== null && firstForecastYear > minYear && firstForecastYear <= maxYear) {
    const divider = createSvg("line", { x1: x(firstForecastYear), x2: x(firstForecastYear), y1: margin.top, y2: margin.top + plotHeight, class: "benchmark-forecast-divider" });
    svg.append(divider);
    const label = createSvg("text", { x: x(firstForecastYear) + 5, y: margin.top + 11, class: "benchmark-divider-label" });
    label.textContent = "Forecast";
    svg.append(label);
  }

  chartRows.forEach((series) => {
    const color = benchmarkColor(series.country.id);
    benchmarkSeriesPath(series.observed, x, y, true).forEach((pathData) => {
      svg.append(createSvg("path", { d: pathData, class: "benchmark-series-line", stroke: color }));
    });
    const comparableForecastPoints = series.forecasts.filter((point) => {
      const latest = benchmarkLatestObservation(series.country.id);
      const baseline = safeNumber(point.row.last_observed_value);
      return latest && baseline !== null && Math.abs(baseline - safeNumber(latest.value)) <= 0.000001;
    });
    const forecastPathPoints = [...series.anchor, ...comparableForecastPoints].sort((a, b) => a.year - b.year);
    if (forecastPathPoints.length > 1) {
      const d = forecastPathPoints.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
      svg.append(createSvg("path", { d, class: "benchmark-series-line is-forecast", stroke: color }));
    }
    series.observed.forEach((point) => {
      const circle = createSvg("circle", { cx: x(point.year), cy: y(point.value), r: 3.4, class: "benchmark-series-point", fill: color });
      const title = createSvg("title");
      title.textContent = `${series.country.name} · ${point.year} · Observed · ${formatNumber(point.row.value)} persons/year${indexed ? ` · chart index ${point.value.toFixed(1)}` : ""}`;
      circle.append(title);
      svg.append(circle);
    });
    series.forecasts.forEach((point) => {
      const circle = createSvg("circle", { cx: x(point.year), cy: y(point.value), r: 4.6, class: "benchmark-series-point is-forecast", stroke: color });
      const title = createSvg("title");
      title.textContent = `${series.country.name} · ${point.year} · ${safeNumber(point.row.horizon)}-year forecast · ${formatNumber(point.row.prediction)} persons/year${indexed ? ` · chart index ${point.value.toFixed(1)}` : ""}`;
      circle.append(title);
      svg.append(circle);
    });
  });
  ui.benchmarkTrendChart.replaceChildren(svg);

  ui.benchmarkChartLegend.replaceChildren();
  countries.forEach((country) => {
    const item = document.createElement("span");
    item.className = "benchmark-chart-legend__item";
    const swatch = document.createElement("i");
    swatch.style.setProperty("--series-color", benchmarkColor(country.id));
    const flag = document.createElement("span");
    flag.textContent = benchmarkFlag(country);
    flag.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.textContent = country.name;
    item.append(swatch, flag, name);
    ui.benchmarkChartLegend.append(item);
  });
  ui.benchmarkTrendSubtitle.textContent = indexed
    ? `Historical index normalized to 100 in ${indexBaseYear ?? "a shared base year"}; forecasts use the same country-specific base`
    : `Annual immigration flows · ${startYear}–${endYear} common observed window`;
  ui.benchmarkTrendNote.textContent = "The historical index changes only the chart scale; original values are unchanged. Forecasts are displayed as published; heatmap and dumbbell changes require a matching observed baseline.";
}

function renderBenchmarkRanking() {
  ui.benchmarkRankingList.replaceChildren();
  const year = safeNumber(ui.benchmarkRankingYear.value);
  if (year === null) {
    ui.benchmarkRankingSubtitle.textContent = "No observed or forecast years are available";
    ui.benchmarkRankingEmpty.hidden = false;
    return;
  }
  const ranked = selectedBenchmarkCountries()
    .map((country) => ({ country, point: benchmarkPointForYear(country.id, year) }))
    .filter((item) => item.point && item.point.value !== null)
    .sort((a, b) => b.point.value - a.point.value);
  ui.benchmarkRankingSubtitle.textContent = `${year} · annual immigration flow (persons/year)`;
  ui.benchmarkRankingEmpty.hidden = ranked.length > 0;
  if (!ranked.length) return;
  const max = Math.max(...ranked.map((item) => Math.abs(item.point.value)), 1);
  ranked.forEach((item, index) => {
    const row = document.createElement("li");
    row.className = "benchmark-ranking-row";
    const rank = document.createElement("span");
    rank.className = "benchmark-ranking-row__rank";
    rank.textContent = String(index + 1);
    const flag = document.createElement("span");
    flag.className = "benchmark-ranking-row__flag";
    flag.textContent = benchmarkFlag(item.country);
    flag.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.className = "benchmark-ranking-row__name";
    name.textContent = item.country.name;
    name.style.setProperty("--series-color", benchmarkColor(item.country.id));
    const track = document.createElement("span");
    track.className = "benchmark-ranking-row__track";
    const bar = document.createElement("i");
    bar.style.width = `${Math.max(Math.abs(item.point.value) / max * 100, item.point.value === 0 ? 0 : 2)}%`;
    bar.style.setProperty("--series-color", benchmarkColor(item.country.id));
    track.append(bar);
    const value = document.createElement("strong");
    value.textContent = formatNumber(item.point.value);
    const kind = document.createElement("small");
    kind.textContent = item.point.type === "Forecast" ? `${safeNumber(item.point.row.horizon)}-year forecast` : "Observed";
    row.append(rank, flag, name, track, value, kind);
    ui.benchmarkRankingList.append(row);
  });
}

function renderBenchmarkHeatmap() {
  ui.benchmarkHeatmap.replaceChildren();
  ui.benchmarkHeatmapLegend.replaceChildren();
  const countries = selectedBenchmarkCountries();
  const horizons = unique(countries.flatMap((country) => benchmarkForecastRows(country.id).map((row) => safeNumber(row.horizon))))
    .filter((horizon) => horizon !== null).sort((a, b) => a - b);
  if (!countries.length || !horizons.length) {
    benchmarkEmpty(ui.benchmarkHeatmap, "Forecast horizons are not available for the selected countries.");
    ui.benchmarkHeatmapNote.textContent = "";
    return;
  }
  const measure = ui.benchmarkHeatmapMeasure.value;
  const cells = countries.map((country) => ({ country, items: horizons.map((horizon) => {
    const comparable = benchmarkComparableForecast(country.id, horizon);
    if (!comparable) return { horizon, comparable: null, value: null };
    const percent = comparable.baseline === 0 ? null : comparable.change / Math.abs(comparable.baseline) * 100;
    return { horizon, comparable, value: measure === "percent" ? percent : comparable.change };
  }) }));
  const values = cells.flatMap((row) => row.items.map((item) => item.value)).filter((value) => value !== null);
  const observedMaxAbs = values.length ? Math.max(...values.map(Math.abs)) : 0;
  const maxAbs = Math.max(observedMaxAbs, 1);
  const table = document.createElement("table");
  table.className = "benchmark-heatmap";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const countryHead = document.createElement("th");
  countryHead.scope = "col";
  countryHead.textContent = "Country";
  headRow.append(countryHead);
  horizons.forEach((horizon) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = `${horizon}y`;
    headRow.append(th);
  });
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  cells.forEach(({ country, items }) => {
    const row = document.createElement("tr");
    const header = document.createElement("th");
    header.scope = "row";
    header.className = "benchmark-heatmap__country";
    const flag = document.createElement("span");
    flag.textContent = benchmarkFlag(country);
    flag.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.textContent = country.name;
    header.append(flag, name);
    row.append(header);
    items.forEach(({ horizon, comparable, value }) => {
      const cell = document.createElement("td");
      const content = document.createElement("span");
      content.className = "benchmark-heat-cell";
      if (value === null) {
        content.classList.add("is-unavailable");
        content.textContent = "N/A";
        content.title = comparable ? "Percentage change is undefined because the observed baseline is zero." : "No available forecast with a baseline matching the latest observed value.";
      } else {
        const intensity = Math.min(Math.abs(value) / maxAbs, 1);
        content.classList.add(value > 0 ? "is-positive" : value < 0 ? "is-negative" : "is-neutral");
        content.style.setProperty("--heat-intensity", String(intensity));
        content.textContent = measure === "percent" ? formatSignedPercent(value) : formatSigned(value);
        const current = comparable.latest;
        content.title = `${country.name} · ${safeNumber(comparable.row.target_year)} target (${horizon}-year) · Observed ${safeNumber(current.year)}: ${formatNumber(comparable.baseline)} · Forecast: ${formatNumber(comparable.prediction)} persons/year · Change: ${formatSigned(comparable.change, { suffix: " persons" })}${comparable.baseline === 0 ? " · Percentage change undefined (zero baseline)" : ` · ${formatSignedPercent(comparable.change / Math.abs(comparable.baseline) * 100)}`}`;
      }
      cell.append(content);
      row.append(cell);
    });
    tbody.append(row);
  });
  table.append(thead, tbody);
  ui.benchmarkHeatmap.append(table);
  if (values.length) {
    const unit = measure === "percent" ? "%" : " persons/year";
    const legend = document.createElement("div");
    legend.className = "benchmark-diverging-legend";
    const low = document.createElement("span");
    low.textContent = measure === "percent" ? formatSignedPercent(-observedMaxAbs) : `${formatSigned(-observedMaxAbs)}${unit}`;
    const scale = document.createElement("i");
    const zero = document.createElement("span");
    zero.textContent = "0";
    const high = document.createElement("span");
    high.textContent = measure === "percent" ? formatSignedPercent(observedMaxAbs) : `${formatSigned(observedMaxAbs)}${unit}`;
    legend.append(low, scale, zero, high);
    ui.benchmarkHeatmapLegend.append(legend);
  } else {
    ui.benchmarkHeatmapLegend.textContent = "No comparable forecast changes are available to scale.";
  }
  ui.benchmarkHeatmapNote.textContent = measure === "percent"
    ? "The color scale is centered on zero. N/A includes unavailable or stale forecasts; percentage change is undefined for a zero baseline."
    : "The color scale is centered on zero. N/A includes unavailable or stale forecasts; cells compare annual flow with the latest observed flow.";
}

function renderBenchmarkDumbbell() {
  ui.benchmarkDumbbell.replaceChildren();
  const horizon = safeNumber(ui.benchmarkHorizon.value);
  if (horizon === null) {
    benchmarkEmpty(ui.benchmarkDumbbell, "No forecast horizons are available for this selection.");
    return [];
  }
  const rows = selectedBenchmarkCountries().map((country) => ({ country, comparison: benchmarkComparableForecast(country.id, horizon) }))
    .filter((item) => item.comparison);
  if (!rows.length) {
    benchmarkEmpty(ui.benchmarkDumbbell, `No ${horizon}-year forecasts have a baseline that matches the latest observed value.`);
    return [];
  }
  const width = Math.max(680, Math.round(ui.benchmarkDumbbell.getBoundingClientRect().width || 900));
  const height = Math.max(155, rows.length * 42 + 48);
  const margin = { left: 165, right: 26, top: 12, bottom: 30 };
  const values = rows.flatMap(({ comparison }) => [comparison.baseline, comparison.prediction]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const padding = max === min ? Math.max(Math.abs(max) * .08, 1) : (max - min) * .08;
  min -= padding;
  max += padding;
  const plotWidth = width - margin.left - margin.right;
  const x = (value) => margin.left + (value - min) / (max - min) * plotWidth;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${horizon}-year forecast compared with latest observed immigration for ${rows.map(({ country }) => country.name).join(", ")}` });
  for (let tick = 0; tick <= 4; tick += 1) {
    const value = min + (max - min) * tick / 4;
    svg.append(createSvg("line", { x1: x(value), x2: x(value), y1: margin.top, y2: height - margin.bottom, class: "benchmark-gridline" }));
    const label = createSvg("text", { x: x(value), y: height - 9, "text-anchor": "middle", class: "benchmark-axis-label" });
    label.textContent = benchmarkCompactNumber(value);
    svg.append(label);
  }
  rows.forEach(({ country, comparison }, index) => {
    const y = margin.top + 17 + index * 42;
    const color = benchmarkColor(country.id);
    const label = createSvg("text", { x: margin.left - 12, y: y + 4, "text-anchor": "end", class: "benchmark-dumbbell-label", fill: color });
    label.textContent = `${benchmarkFlag(country)} ${country.name}`;
    svg.append(label);
    svg.append(createSvg("line", { x1: x(comparison.baseline), x2: x(comparison.prediction), y1: y, y2: y, class: "benchmark-dumbbell-connector", stroke: color }));
    const observed = createSvg("circle", { cx: x(comparison.baseline), cy: y, r: 5.2, class: "benchmark-dumbbell-point", fill: color });
    const observedTitle = createSvg("title");
    observedTitle.textContent = `${country.name} · observed ${safeNumber(comparison.latest.year)} · ${formatNumber(comparison.baseline)} persons/year`;
    observed.append(observedTitle);
    const forecast = createSvg("circle", { cx: x(comparison.prediction), cy: y, r: 5.2, class: "benchmark-dumbbell-point is-forecast", stroke: color });
    const forecastTitle = createSvg("title");
    forecastTitle.textContent = `${country.name} · ${safeNumber(comparison.row.target_year)} ${horizon}-year forecast · ${formatNumber(comparison.prediction)} persons/year`;
    forecast.append(forecastTitle);
    svg.append(observed, forecast);
  });
  ui.benchmarkDumbbell.append(svg);
  return rows;
}

function benchmarkHistoricalChanges() {
  const years = benchmarkSelectedYearWindow();
  if (years.length < 2) return [];
  const from = years[0];
  const to = years.at(-1);
  return selectedBenchmarkCountries().map((country) => {
    const base = safeNumber(benchmarkObservationMap(country.id).get(from)?.value);
    const last = safeNumber(benchmarkObservationMap(country.id).get(to)?.value);
    if (base === null || last === null || base === 0) return null;
    return { country, from, to, base, last, change: last - base, percent: (last - base) / Math.abs(base) * 100 };
  }).filter(Boolean);
}

function renderBenchmarkInsights(dumbbellRows) {
  ui.benchmarkInsights.replaceChildren();
  const history = benchmarkHistoricalChanges();
  const highestHistory = history.slice().sort((a, b) => b.percent - a.percent)[0];
  const lowestHistory = history.slice().sort((a, b) => a.percent - b.percent)[0];
  const historicalRange = history.length > 1
    ? Math.max(...history.map((item) => item.percent)) - Math.min(...history.map((item) => item.percent)) : null;
  const forecastChanges = dumbbellRows.slice().filter((item) => item.comparison.baseline !== 0).map((item) => ({
    ...item,
    percent: item.comparison.change / Math.abs(item.comparison.baseline) * 100,
  })).sort((a, b) => b.percent - a.percent);
  const highestForecast = forecastChanges[0];
  const hasProjectedIncrease = highestForecast?.percent > 0;
  const mildestDecline = forecastChanges.find((item) => item.percent < 0);
  const zeroBaselineIncrease = dumbbellRows.filter((item) => item.comparison.baseline === 0 && item.comparison.change > 0)
    .sort((a, b) => b.comparison.change - a.comparison.change)[0];
  const zeroBaselineDecline = dumbbellRows.find((item) => item.comparison.baseline === 0 && item.comparison.change < 0);
  const forecastHorizon = safeNumber(ui.benchmarkHorizon.value);
  let forecastInsight;
  if (hasProjectedIncrease) {
    forecastInsight = { title: "Largest projected increase", value: `${highestForecast.country.name} · ${formatSignedPercent(highestForecast.percent)}`, detail: `${safeNumber(highestForecast.comparison.row.horizon)}-year forecast to ${safeNumber(highestForecast.comparison.row.target_year)}; ${formatSigned(highestForecast.comparison.change, { suffix: " persons/year" })} vs. latest observation.` };
  } else if (mildestDecline) {
    forecastInsight = { title: "Largest projected increase", value: "No increase at selected horizon", detail: `No selected forecast is higher than baseline; the smallest decline is ${mildestDecline.country.name} (${formatSignedPercent(mildestDecline.percent)} at ${forecastHorizon}-year horizon).` };
  } else if (zeroBaselineIncrease) {
    forecastInsight = { title: "Largest projected increase", value: `${zeroBaselineIncrease.country.name} · ${formatSigned(zeroBaselineIncrease.comparison.change, { suffix: " persons/year" })}`, detail: `Forecast to ${safeNumber(zeroBaselineIncrease.comparison.row.target_year)}; percentage change is undefined because the latest observed baseline is zero.` };
  } else if (zeroBaselineDecline) {
    forecastInsight = { title: "Largest projected increase", value: "No increase at selected horizon", detail: `${zeroBaselineDecline.country.name}: forecast difference ${formatSigned(zeroBaselineDecline.comparison.change, { suffix: " persons/year" })}; percentage change is undefined because its baseline is zero.` };
  } else if (forecastChanges.length || dumbbellRows.length) {
    forecastInsight = { title: "Largest projected increase", value: "No increase at selected horizon", detail: "All comparable selected forecasts are unchanged from their latest observations." };
  } else {
    forecastInsight = { title: "Largest projected increase", value: "Not available", detail: "No selected forecast has a valid, matching observed baseline for the chosen horizon." };
  }
  const commonYears = benchmarkSelectedYearWindow();
  const latestYear = commonYears.at(-1);
  const latestValues = selectedBenchmarkCountries().map((country) => ({ country, value: safeNumber(benchmarkObservationMap(country.id).get(latestYear)?.value) }))
    .filter((item) => item.value !== null);
  const spread = latestValues.length > 1 ? Math.max(...latestValues.map((item) => item.value)) - Math.min(...latestValues.map((item) => item.value)) : null;
  const lowest = latestValues.slice().sort((a, b) => a.value - b.value)[0];
  const highest = latestValues.slice().sort((a, b) => b.value - a.value)[0];
  const items = [
    highestHistory
      ? { title: "Strongest historical growth", value: `${highestHistory.country.name} · ${formatSignedPercent(highestHistory.percent)}`, detail: `${formatSigned(highestHistory.change, { suffix: " persons/year" })} from ${highestHistory.from} to ${highestHistory.to}.` }
      : { title: "Strongest historical growth", value: "Not available", detail: "At least two shared observed years and a non-zero baseline are required." },
    forecastInsight,
    historicalRange !== null
      ? { title: "Different historical evolution", value: `${countryChangeFormatter.format(historicalRange)} percentage points`, detail: `${lowestHistory.country.name} (${formatSignedPercent(lowestHistory.percent)}) to ${highestHistory.country.name} (${formatSignedPercent(highestHistory.percent)}) from ${commonYears[0]} to ${commonYears.at(-1)}.` }
      : { title: "Different historical evolution", value: "Not available", detail: "More than one country with comparable, non-zero historical baselines is required." },
    spread !== null
      ? { title: `Dispersion in ${latestYear}`, value: `${formatNumber(spread)} persons/year`, detail: `Observed range from ${lowest.country.name} (${formatNumber(lowest.value)}) to ${highest.country.name} (${formatNumber(highest.value)}). Descriptive comparison, not causal.` }
      : { title: "Dispersion of observed values", value: "Not available", detail: "At least two selected countries need an observed value in a shared year." },
  ];
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "benchmark-insight-card";
    const number = document.createElement("span");
    number.className = "benchmark-insight-card__number";
    number.textContent = String(index + 1);
    const content = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const value = document.createElement("strong");
    value.textContent = item.value;
    const detail = document.createElement("p");
    detail.textContent = item.detail;
    content.append(heading, value, detail);
    article.append(number, content);
    ui.benchmarkInsights.append(article);
  });
}

function renderCountryBenchmark() {
  if (!state.initialized) return;
  renderBenchmarkSelection();
  renderBenchmarkControls();
  renderBenchmarkTrendChart();
  renderBenchmarkRanking();
  renderBenchmarkHeatmap();
  const dumbbellRows = renderBenchmarkDumbbell();
  renderBenchmarkInsights(dumbbellRows);
}

function contextEntityCacheKey(level, entityId, countryIso2 = "") {
  return `${level}:${countryIso2}:${entityId}`;
}

async function loadContextRows(level, entityId, countryIso2 = "") {
  const key = contextEntityCacheKey(level, entityId, countryIso2);
  if (state.contextCache.has(key)) return state.contextCache.get(key);
  const cacheEpoch = state.contextCacheEpoch;
  let query = supabaseClient.from("context_observations_latest").select("*")
    .eq("level", level).eq("entity_id", String(entityId)).order("year").limit(1000);
  if (countryIso2) query = query.eq("country_iso2", countryIso2);
  const { data, error } = await query;
  if (cacheEpoch !== state.contextCacheEpoch) return [];
  if (error) {
    state.contextViewsAvailable = false;
    state.contextCache.set(key, []);
    return [];
  }
  state.contextViewsAvailable = true;
  const rows = data ?? [];
  state.contextCache.set(key, rows);
  return rows;
}

function contextIndicatorRows(rows = state.contextRows) {
  const byId = new Map();
  rows.forEach((row) => {
    if (!byId.has(row.indicator_id)) byId.set(row.indicator_id, row);
  });
  return [...byId.values()].sort((a, b) => a.family.localeCompare(b.family) || a.indicator_label.localeCompare(b.indicator_label));
}

function formatContextValue(value, unit) {
  const number = safeNumber(value);
  if (number === null) return "Not available";
  const digits = Math.abs(number) >= 1000 ? 0 : Math.abs(number) >= 10 ? 1 : 2;
  return `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits }).format(number)} ${unit ?? ""}`.trim();
}

function officialContextSourceUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "ec.europa.eu" ? url.href : null;
  } catch {
    return null;
  }
}

async function renderMigrationContext() {
  if (!state.initialized) return;
  if (state.selectedCountry === "all") {
    const countries = listCountries();
    const preferred = countries.find((item) => normalizeName(item.name) === "spain") ?? countries[0];
    if (preferred) state.selectedCountry = preferred.id;
  }
  populateMigrationCountryControl();
  const country = countryById(state.selectedCountry);
  if (!country) {
    state.contextRows = [];
    populateMigrationIndicatorOptions();
    renderMigrationHistoryChart();
    return;
  }
  const requestId = ++state.contextRequestId;
  const rows = await loadContextRows("country", country.id);
  if (requestId !== state.contextRequestId || state.selectedCountry !== country.id) return;
  state.contextRows = rows;
  populateMigrationIndicatorOptions();
  renderMigrationHistoryChart();
  renderContextScatter();
  renderOtherContextIndicators();
}

function populateMigrationIndicatorOptions() {
  const indicators = contextIndicatorRows();
  const current = state.selectedContextIndicator;
  replaceOptions(ui.migrationIndicatorSelect, indicators.map((row) => ({
    value: row.indicator_id,
    label: `${row.family} · ${row.indicator_label}`,
  })));
  ui.migrationIndicatorSelect.disabled = indicators.length === 0;
  const selected = indicators.some((row) => row.indicator_id === current)
    ? current
    : indicators.find((row) => row.indicator_id === "country_gdp_per_capita_pps")?.indicator_id
      ?? indicators[0]?.indicator_id
      ?? null;
  state.selectedContextIndicator = selected;
  if (selected) ui.migrationIndicatorSelect.value = selected;
}

function selectedCountryContextIndicator() {
  return state.contextRows.find((row) => row.indicator_id === state.selectedContextIndicator) ?? null;
}

function renderMigrationHistoryChart() {
  if (!state.initialized) return;
  ui.migrationHistoryChart.replaceChildren();
  const country = countryById(state.selectedCountry);
  if (!country) {
    benchmarkEmpty(ui.migrationHistoryChart, "No country-level observations are available for this selection.");
    ui.migrationContextSubtitle.textContent = "Country-level migration observations are not available";
    ui.migrationHistoryNote.textContent = "No context values are inferred when a source series is unavailable.";
    renderContextIndicatorMetadata(null, []);
    return;
  }

  let observations = state.observed
    .filter((row) => String(row.entity_id) === country.id)
    .map((row) => ({ row, year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((point) => point.year !== null && point.value !== null)
    .sort((a, b) => a.year - b.year);
  const fullContextSeries = state.contextRows
    .filter((row) => row.indicator_id === state.selectedContextIndicator)
    .map((row) => ({ row, year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((point) => point.year !== null && point.value !== null)
    .sort((a, b) => a.year - b.year);
  const selectedIndicator = fullContextSeries[0]?.row ?? null;
  let contextSeries = fullContextSeries;
  const period = ui.migrationPeriod.value;
  const commonYearCeiling = Math.max(observations.at(-1)?.year ?? 0, contextSeries.at(-1)?.year ?? 0);
  if (period !== "all" && commonYearCeiling) {
    const startYear = commonYearCeiling - Number(period) + 1;
    observations = observations.filter((point) => point.year >= startYear);
    contextSeries = contextSeries.filter((point) => point.year >= startYear);
  }
  const allYears = state.observed
    .filter((row) => String(row.entity_id) === country.id)
    .map((row) => safeNumber(row.year)).filter((year) => year !== null);
  const totalPeriod = allYears.length ? `${Math.min(...allYears)}–${Math.max(...allYears)}` : "coverage unavailable";
  ui.migrationContextSubtitle.textContent = `${country.name} · observed immigration and source-reported context · ${totalPeriod}`;
  ui.contextIndicatorLegend.textContent = selectedIndicator
    ? `${selectedIndicator.indicator_label} · ${selectedIndicator.unit}` : "Selected indicator · not available";
  renderContextIndicatorMetadata(selectedIndicator, fullContextSeries);

  if (!observations.length) {
    benchmarkEmpty(ui.migrationHistoryChart, "There are no valid observed immigration values for this country and period.");
    ui.migrationHistoryNote.textContent = "The contextual source remains descriptive; no migration value is generated from it.";
    return;
  }
  if (!contextSeries.length) {
    ui.migrationHistoryNote.textContent = !state.contextViewsAvailable
      ? "The protected contextual-data view is not yet configured or accessible. Observed immigration remains available; no context is inferred."
      : `No published ${selectedIndicator?.indicator_label ?? "contextual"} values match this country and time window. The observed immigration series remains visible; no values are imputed.`;
  } else {
    ui.migrationHistoryNote.textContent = "The two lines use separate labelled axes and only source-reported observed years. Co-movement is descriptive; it does not establish causality. Eurostat quality flags are retained in the source records.";
  }

  const width = Math.max(320, Math.round(ui.migrationHistoryChart.getBoundingClientRect().width || 860));
  const height = 330;
  const margin = { top: 24, right: 82, bottom: 50, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const years = unique([...observations.map((point) => point.year), ...contextSeries.map((point) => point.year)]).sort((a, b) => a - b);
  const minYear = years[0];
  const maxYear = years.at(-1);
  const immigrantValues = observations.map((point) => point.value);
  const contextValues = contextSeries.map((point) => point.value);
  const bounds = (values) => {
    const low = Math.min(...values);
    const high = Math.max(...values);
    const padding = Math.max((high - low) * .1, Math.abs(high) * .02, 1);
    return [low - padding, high + padding];
  };
  const [minImmigration, maxImmigration] = bounds(immigrantValues);
  const [minContext, maxContext] = contextValues.length ? bounds(contextValues) : [0, 1];
  const x = (year) => margin.left + (maxYear === minYear ? plotWidth / 2 : (year - minYear) / (maxYear - minYear) * plotWidth);
  const yImmigration = (value) => margin.top + (maxImmigration - value) / (maxImmigration - minImmigration) * plotHeight;
  const yContext = (value) => margin.top + (maxContext - value) / (maxContext - minContext) * plotHeight;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `Observed immigration and ${selectedIndicator?.indicator_label ?? "context"} for ${country.name}` });

  for (let tick = 0; tick <= 4; tick += 1) {
    const fraction = tick / 4;
    const immigrationValue = maxImmigration - fraction * (maxImmigration - minImmigration);
    const yPosition = margin.top + plotHeight * fraction;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: yPosition, y2: yPosition, class: "benchmark-gridline" }));
    const leftLabel = createSvg("text", { x: margin.left - 8, y: yPosition + 4, "text-anchor": "end", class: "benchmark-axis-label" });
    leftLabel.textContent = formatAxisNumber(immigrationValue);
    svg.append(leftLabel);
    if (contextValues.length) {
      const contextValue = maxContext - fraction * (maxContext - minContext);
      const rightLabel = createSvg("text", { x: width - margin.right + 9, y: yPosition + 4, "text-anchor": "start", class: "benchmark-axis-label" });
      rightLabel.textContent = formatAxisNumber(contextValue);
      svg.append(rightLabel);
    }
  }
  const tickCount = Math.min(7, years.length);
  const visibleTicks = tickCount === years.length || tickCount <= 1
    ? years
    : Array.from({ length: tickCount }, (_, index) => years[Math.round(index * (years.length - 1) / (tickCount - 1))]);
  visibleTicks.forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 22, "text-anchor": "middle", class: "benchmark-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: height - margin.bottom, y2: height - margin.bottom, class: "benchmark-axis-line" }));
  const leftTitle = createSvg("text", { x: 16, y: height / 2, transform: `rotate(-90 16 ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
  leftTitle.textContent = "Immigration · persons/year";
  svg.append(leftTitle);
  if (contextValues.length) {
    const rightTitle = createSvg("text", { x: width - 13, y: height / 2, transform: `rotate(-90 ${width - 13} ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
    rightTitle.textContent = `${selectedIndicator.indicator_label} · ${selectedIndicator.unit}`;
    svg.append(rightTitle);
  }
  const xTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 3, "text-anchor": "middle", class: "benchmark-axis-title" });
  xTitle.textContent = "Observed year";
  svg.append(xTitle);

  splitObservedSegments(observations.map(({ year, value }) => ({ year, value }))).forEach((segment) => {
    if (segment.length < 2) return;
    const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yImmigration(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "context-history-line" }));
  });
  observations.forEach(({ year, value }) => {
    const point = createSvg("circle", { cx: x(year), cy: yImmigration(value), r: 4, class: "context-history-point" });
    const title = createSvg("title");
    title.textContent = `${country.name} · ${year} · ${formatNumber(value)} persons/year · observed`;
    point.append(title);
    svg.append(point);
  });
  splitObservedSegments(contextSeries.map(({ year, value }) => ({ year, value }))).forEach((segment) => {
    if (segment.length < 2) return;
    const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yContext(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "context-indicator-line" }));
  });
  contextSeries.forEach(({ year, value }) => {
    const point = createSvg("circle", { cx: x(year), cy: yContext(value), r: 3.7, class: "context-indicator-point" });
    const title = createSvg("title");
    title.textContent = `${selectedIndicator.indicator_label} · ${year} · ${formatContextValue(value, selectedIndicator.unit)} · source-reported`;
    point.append(title);
    svg.append(point);
  });
  ui.migrationHistoryChart.replaceChildren(svg);
}

function renderContextIndicatorMetadata(indicator, rows) {
  const count = rows.length;
  const firstYear = count ? Math.min(...rows.map((row) => safeNumber(row.year)).filter((year) => year !== null)) : null;
  const lastYear = count ? Math.max(...rows.map((row) => safeNumber(row.year)).filter((year) => year !== null)) : null;
  ui.contextIndicatorHeading.textContent = indicator?.indicator_label ?? "No contextual series";
  ui.contextIndicatorDefinition.textContent = !state.contextViewsAvailable
    ? "The protected contextual-data view is not yet configured or accessible. The main dashboard data remains available."
    : indicator
    ? `${indicator.definition}${indicator.caveat ? ` ${indicator.caveat}` : ""}`
    : "No verified contextual values are published for this country. Values are never inferred or filled in.";
  ui.contextIndicatorFamily.textContent = indicator?.family ?? "Not available";
  ui.contextIndicatorUnit.textContent = indicator?.unit ?? "Not available";
  ui.contextIndicatorSource.replaceChildren();
  if (!indicator) {
    ui.contextIndicatorSource.textContent = "Not available";
  } else {
    const label = `${indicator.source_name} · ${indicator.source_dataset} · ${indicator.geography_level}`;
    const href = officialContextSourceUrl(indicator.source_url);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      ui.contextIndicatorSource.append(link);
    } else {
      ui.contextIndicatorSource.textContent = label;
    }
  }
  const flagged = rows.filter((row) => row.quality_flag).length;
  ui.contextIndicatorCoverage.textContent = indicator
    ? `${firstYear ?? "—"}–${lastYear ?? "—"} · ${count} values · ${flagged} flagged` : "Not available";
}

function renderContextScatter() {
  const indicator = selectedCountryContextIndicator();
  const country = countryById(state.selectedCountry);
  ui.contextScatterChart.hidden = true;
  ui.contextScatterChart.replaceChildren();
  ui.contextScatterEmpty.hidden = false;
  if (!indicator || !country) return;
  const observedByYear = new Map(state.observed
    .filter((row) => String(row.entity_id) === country.id)
    .map((row) => [safeNumber(row.year), safeNumber(row.value)])
    .filter(([year, value]) => year !== null && value !== null));
  const pairs = state.contextRows.filter((row) => row.indicator_id === indicator.indicator_id)
    .map((row) => ({ year: safeNumber(row.year), x: safeNumber(row.value), y: observedByYear.get(safeNumber(row.year)) }))
    .filter((point) => point.year !== null && point.x !== null && point.y !== null);
  if (pairs.length < 2) return;
  ui.contextScatterEmpty.hidden = true;
  ui.contextScatterChart.hidden = false;
  const width = Math.max(320, Math.round(ui.contextScatterChart.getBoundingClientRect().width || 600));
  const height = 270;
  const margin = { top: 18, right: 18, bottom: 46, left: 66 };
  let minX = Math.min(...pairs.map((point) => point.x));
  let maxX = Math.max(...pairs.map((point) => point.x));
  let minY = Math.min(...pairs.map((point) => point.y));
  let maxY = Math.max(...pairs.map((point) => point.y));
  if (minX === maxX) { minX -= 1; maxX += 1; }
  if (minY === maxY) { minY -= 1; maxY += 1; }
  const x = (value) => margin.left + (value - minX) / (maxX - minX) * (width - margin.left - margin.right);
  const y = (value) => height - margin.bottom - (value - minY) / (maxY - minY) * (height - margin.top - margin.bottom);
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${indicator.indicator_label} compared with observed immigration in ${country.name}` });
  svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: height - margin.bottom, y2: height - margin.bottom, class: "benchmark-axis-line" }));
  svg.append(createSvg("line", { x1: margin.left, x2: margin.left, y1: margin.top, y2: height - margin.bottom, class: "benchmark-axis-line" }));
  pairs.forEach((pair) => {
    const point = createSvg("circle", { cx: x(pair.x), cy: y(pair.y), r: 4, class: "context-scatter-point" });
    const title = createSvg("title");
    title.textContent = `${pair.year} · ${formatContextValue(pair.x, indicator.unit)} · ${formatNumber(pair.y)} persons/year`;
    point.append(title);
    svg.append(point);
  });
  const xLabel = createSvg("text", { x: margin.left + (width - margin.left - margin.right) / 2, y: height - 7, "text-anchor": "middle", class: "benchmark-axis-title" });
  xLabel.textContent = `${indicator.indicator_label} · ${indicator.unit}`;
  const yLabel = createSvg("text", { x: 15, y: height / 2, transform: `rotate(-90 15 ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
  yLabel.textContent = "Immigration · persons/year";
  svg.append(xLabel, yLabel);
  ui.contextScatterChart.append(svg);
}

function renderOtherContextIndicators() {
  const selectedId = state.selectedContextIndicator;
  const latestByIndicator = new Map();
  state.contextRows.forEach((row) => {
    const current = latestByIndicator.get(row.indicator_id);
    if (!current || safeNumber(row.year) > safeNumber(current.year)) latestByIndicator.set(row.indicator_id, row);
  });
  const items = [...latestByIndicator.values()].filter((row) => row.indicator_id !== selectedId)
    .sort((a, b) => a.family.localeCompare(b.family) || a.indicator_label.localeCompare(b.indicator_label));
  ui.contextOtherIndicators.replaceChildren();
  ui.contextIndicatorCount.textContent = state.contextViewsAvailable ? `${items.length} available` : "Not connected";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "context-family-empty";
    empty.textContent = state.contextViewsAvailable
      ? "No additional source-reported contextual indicators are available for this country."
      : "The protected contextual-data view is not yet configured or accessible.";
    ui.contextOtherIndicators.append(empty);
    return;
  }
  items.forEach((row, index) => {
    const item = document.createElement("div");
    const number = document.createElement("span");
    number.className = "context-family-icon";
    number.textContent = String(index + 1).padStart(2, "0");
    const description = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = row.indicator_label;
    const details = document.createElement("small");
    details.textContent = `${row.family} · ${row.source_name} · latest reported ${row.year}`;
    const href = officialContextSourceUrl(row.source_url);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = ` · ${row.source_dataset}`;
      details.append(link);
    }
    description.append(title, details);
    const value = document.createElement("b");
    value.textContent = formatContextValue(row.value, row.unit);
    item.append(number, description, value);
    ui.contextOtherIndicators.append(item);
  });
}

function reliabilityForecastRows(scope = state.reliabilityScope) {
  const rows = scope === "city" ? state.cityForecasts : state.forecasts;
  return rows.filter((row) => forecastIsAvailable(row)
    && safeNumber(row.horizon) !== null
    && safeNumber(row.target_year) !== null
    && safeNumber(row.prediction) !== null);
}

function reliabilityEntityKey(row) {
  const entityId = String(row?.entity_id ?? "");
  return state.reliabilityScope === "city" ? `${String(row?.country_iso2 ?? "")}|${entityId}` : entityId;
}

function reliabilityEntityLabel(row) {
  const name = row?.entity_name || row?.entity_id || "Unnamed entity";
  return state.reliabilityScope === "city" && row?.country_iso2 ? `${name} · ${row.country_iso2}` : name;
}

function populateReliabilityFilters() {
  const rows = reliabilityForecastRows();
  const previousModel = ui.reliabilityModel.value;
  const models = unique(rows.map((row) => forecastModelLabel(row)).filter(Boolean)).sort((a, b) => a.localeCompare(b));
  replaceOptions(ui.reliabilityModel, [
    { value: "all", label: models.length ? "All published model labels" : "No model labels published" },
    ...models.map((model) => ({ value: model, label: model })),
  ]);
  ui.reliabilityModel.disabled = models.length === 0;
  ui.reliabilityModel.value = models.includes(previousModel) ? previousModel : "all";

  const previousEntity = ui.reliabilityEntity.value;
  const entities = new Map();
  rows.forEach((row) => {
    if (row.entity_id === null || row.entity_id === undefined) return;
    const id = reliabilityEntityKey(row);
    entities.set(id, { id, name: reliabilityEntityLabel(row) });
  });
  const sortedEntities = [...entities.values()].sort((a, b) => a.name.localeCompare(b.name));
  replaceOptions(ui.reliabilityEntity, [
    { value: "all", label: state.reliabilityScope === "city" ? "All cities with published forecasts" : "All countries with published forecasts" },
    ...sortedEntities.map(({ id, name }) => ({ value: id, label: name })),
  ]);
  ui.reliabilityEntity.disabled = sortedEntities.length === 0;
  ui.reliabilityEntity.value = entities.has(previousEntity) ? previousEntity : "all";
}

function reliabilityFilteredForecastRows(horizon = null) {
  const selectedHorizon = horizon === null ? null : Number(horizon);
  const selectedModel = ui.reliabilityModel.value;
  const selectedEntity = ui.reliabilityEntity.value;
  return reliabilityForecastRows().filter((row) => (selectedHorizon === null || safeNumber(row.horizon) === selectedHorizon)
    && (selectedModel === "all" || forecastModelLabel(row) === selectedModel)
    && (selectedEntity === "all" || reliabilityEntityKey(row) === selectedEntity));
}

function reliabilityFilteredBacktestRows(horizon = null) {
  const selectedHorizon = horizon === null ? Number(ui.reliabilityHorizon.value) : Number(horizon);
  const selectedModel = ui.reliabilityModel.value;
  const selectedEntity = ui.reliabilityEntity.value;
  return state.backtestPredictions.filter((row) => row.level === state.reliabilityScope
    && safeNumber(row.horizon) === selectedHorizon
    && (selectedModel === "all" || String(row.model_id) === selectedModel)
    && (selectedEntity === "all" || reliabilityEntityKey(row) === selectedEntity));
}

function reliabilitySelectedMetric(horizon = Number(ui.reliabilityHorizon.value)) {
  const selectedEntity = ui.reliabilityEntity.value;
  const selectedModel = ui.reliabilityModel.value;
  const source = selectedEntity === "all" ? state.backtestMetrics : state.backtestEntityMetrics;
  return source.find((row) => row.level === state.reliabilityScope
    && safeNumber(row.horizon) === Number(horizon)
    && (selectedEntity === "all" || reliabilityEntityKey(row) === selectedEntity)
    && (selectedModel === "all" || String(row.model_id) === selectedModel)) ?? null;
}

function reliabilityHorizonMetric(horizon) {
  const selectedEntity = ui.reliabilityEntity.value;
  const source = selectedEntity === "all" ? state.backtestMetrics : state.backtestEntityMetrics;
  return source.find((row) => row.level === state.reliabilityScope
    && safeNumber(row.horizon) === Number(horizon)
    && (selectedEntity === "all" || reliabilityEntityKey(row) === selectedEntity)) ?? null;
}

function formatMetricValue(value, maximumFractionDigits = 2) {
  const number = safeNumber(value);
  return number === null
    ? "Not available"
    : new Intl.NumberFormat("en-GB", { maximumFractionDigits }).format(number);
}

function renderReliabilityHorizonCards() {
  ui.reliabilityHorizonCards.replaceChildren();
  const unit = state.reliabilityScope === "city" ? "% of resident population" : "persons per year";
  [1, 3, 5].forEach((horizon) => {
    const rows = reliabilityFilteredForecastRows(horizon);
    const metric = reliabilityHorizonMetric(horizon);
    const models = unique(rows.map((row) => forecastModelLabel(row)).filter(Boolean));
    const ranges80 = rows.filter((row) => intervalBounds(row, 80)).length;
    const ranges95 = rows.filter((row) => intervalBounds(row, 95)).length;
    const card = document.createElement("article");
    card.className = "outlook-panel reliability-horizon-card";
    const head = document.createElement("div");
    head.className = "reliability-horizon-card__head";
    const title = document.createElement("h3");
    title.textContent = `${horizon}-year outlook`;
    const badge = document.createElement("span");
    badge.className = "reliability-output-badge";
    badge.textContent = "Production output";
    head.append(title, badge);
    const modelLabel = document.createElement("span");
    modelLabel.className = "reliability-horizon-card__label";
    modelLabel.textContent = "Model label";
    const model = document.createElement("strong");
    model.className = "reliability-horizon-card__model";
    model.textContent = models.length === 1 ? models[0] : models.length > 1 ? `${models.length} model labels in selected records` : "Not published in output records";
    const countRow = document.createElement("div");
    countRow.className = "reliability-horizon-card__count";
    const count = document.createElement("strong");
    count.textContent = String(rows.length);
    const countLabel = document.createElement("span");
    countLabel.textContent = `available forecast outputs · ${unit}`;
    countRow.append(count, countLabel);
    const evidence = document.createElement("p");
    evidence.className = "reliability-horizon-card__evidence";
    evidence.textContent = metric
      ? `Backtest MAE ${formatMetricValue(metric.mae)} ${state.reliabilityScope === "city" ? "pp" : "persons/year"} · WAPE ${formatMetricValue(metric.wape_pct, 1)}% · ${metric.n_folds} folds / ${metric.n_observations} pairs`
      : state.backtestViewsAvailable
        ? "Verified backtest metrics are not available for this horizon."
        : "Protected backtest views are not yet configured or accessible.";
    const ranges = document.createElement("small");
    ranges.className = "reliability-horizon-card__ranges";
    ranges.textContent = rows.length
      ? `Published bounds on output rows · 80%: ${ranges80}/${rows.length} · 95%: ${ranges95}/${rows.length}`
      : "No output rows match the current filters.";
    card.append(head, modelLabel, model, countRow, evidence, ranges);
    ui.reliabilityHorizonCards.append(card);
  });
}

function renderReliabilityMetricStatus() {
  ui.reliabilityMetricStatus.replaceChildren();
  const result = reliabilitySelectedMetric();
  const errorUnit = state.reliabilityScope === "city" ? "pp" : "persons/year";
  [
    { label: "MAE", value: result ? `${formatMetricValue(result.mae)} ${errorUnit}` : "Not available", note: "Mean absolute error" },
    { label: "WAPE", value: result ? `${formatMetricValue(result.wape_pct, 1)}%` : "Not available", note: "Weighted absolute percentage error" },
    { label: "RMSE", value: result ? `${formatMetricValue(result.rmse)} ${errorUnit}` : "Not available", note: "Root mean squared error" },
    { label: "Evaluation sample", value: result ? `${result.n_observations} pairs · ${result.n_folds} folds` : "Not available", note: "Selected horizon and scope" },
  ].forEach((metric) => {
    const item = document.createElement("article");
    const label = document.createElement("span");
    label.textContent = metric.label;
    const value = document.createElement("strong");
    value.textContent = metric.value;
    const note = document.createElement("small");
    note.textContent = metric.note;
    item.append(label, value, note);
    ui.reliabilityMetricStatus.append(item);
  });
}

function renderReliabilityScatter() {
  const rows = reliabilityFilteredBacktestRows();
  if (!rows.length) {
    const title = ui.reliabilityScatterEmpty.querySelector("strong");
    const note = ui.reliabilityScatterEmpty.querySelector("p");
    title.textContent = state.backtestViewsAvailable ? "Backtesting pairs are not published" : "Backtest data view not connected";
    note.textContent = state.backtestViewsAvailable
      ? "This chart requires a row-level observed value and its matching historical prediction."
      : "The dashboard's current country and city outputs remain available; this panel needs its protected backtest views and read access.";
    ui.reliabilityScatterEmpty.hidden = false;
    ui.reliabilityScatterChart.hidden = true;
    return;
  }
  ui.reliabilityScatterEmpty.hidden = true;
  ui.reliabilityScatterChart.hidden = false;
  ui.reliabilityScatterChart.replaceChildren();

  const width = 480;
  const height = 275;
  const margin = { top: 16, right: 18, bottom: 44, left: 54 };
  const values = rows.flatMap((row) => [safeNumber(row.actual), safeNumber(row.prediction)]).filter((value) => value !== null);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.05;
  min -= pad;
  max += pad;
  const x = (value) => margin.left + ((value - min) / (max - min)) * (width - margin.left - margin.right);
  const y = (value) => height - margin.bottom - ((value - min) / (max - min)) * (height - margin.top - margin.bottom);
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Actual values versus backtest predictions" });
  svg.append(createSvg("line", { x1: x(min), y1: y(min), x2: x(max), y2: y(max), class: "reliability-scatter-reference" }));
  svg.append(createSvg("line", { x1: margin.left, y1: height - margin.bottom, x2: width - margin.right, y2: height - margin.bottom, class: "reliability-axis" }));
  svg.append(createSvg("line", { x1: margin.left, y1: margin.top, x2: margin.left, y2: height - margin.bottom, class: "reliability-axis" }));
  rows.forEach((row) => {
    const actual = safeNumber(row.actual);
    const prediction = safeNumber(row.prediction);
    if (actual === null || prediction === null) return;
    const point = createSvg("circle", { cx: x(actual), cy: y(prediction), r: 3.2, class: "reliability-scatter-point" });
    const title = createSvg("title");
    title.textContent = `${row.entity_name}: actual ${formatMetricValue(actual)} · predicted ${formatMetricValue(prediction)} · ${row.target_year}`;
    point.append(title);
    svg.append(point);
  });
  const xLabel = createSvg("text", { x: (margin.left + width - margin.right) / 2, y: height - 8, "text-anchor": "middle", class: "reliability-chart-label" });
  xLabel.textContent = state.reliabilityScope === "city" ? "Actual population share (percentage points)" : "Actual immigration (persons/year)";
  const yLabel = createSvg("text", { x: 15, y: height / 2, transform: `rotate(-90 15 ${height / 2})`, "text-anchor": "middle", class: "reliability-chart-label" });
  yLabel.textContent = state.reliabilityScope === "city" ? "Predicted share (pp)" : "Predicted immigration (persons/year)";
  svg.append(xLabel, yLabel);
  ui.reliabilityScatterChart.append(svg);
}

function renderReliabilityBacktestTimeline() {
  const rows = reliabilityFilteredBacktestRows();
  const grouped = new Map();
  rows.forEach((row) => {
    const year = safeNumber(row.target_year);
    const actual = safeNumber(row.actual);
    const prediction = safeNumber(row.prediction);
    if (year === null || actual === null || prediction === null) return;
    const cell = grouped.get(year) ?? { year, actual: 0, prediction: 0, count: 0 };
    cell.actual += actual;
    cell.prediction += prediction;
    cell.count += 1;
    grouped.set(year, cell);
  });
  const points = [...grouped.values()].sort((a, b) => a.year - b.year).map((cell) => ({
    year: cell.year,
    actual: cell.actual / cell.count,
    prediction: cell.prediction / cell.count,
  }));
  if (points.length < 2) {
    const title = ui.reliabilityBacktestEmpty.querySelector("strong");
    const note = ui.reliabilityBacktestEmpty.querySelector("p");
    title.textContent = state.backtestViewsAvailable ? "No fold-level records in the published views" : "Backtest data view not connected";
    note.textContent = state.backtestViewsAvailable
      ? "No illustrative folds or synthetic prediction paths are drawn. A dated backtest result set is needed for this timeline."
      : "The dashboard's current country and city outputs remain available; this panel needs its protected backtest views and read access.";
    ui.reliabilityBacktestEmpty.hidden = false;
    ui.reliabilityBacktestChart.hidden = true;
    return;
  }
  ui.reliabilityBacktestEmpty.hidden = true;
  ui.reliabilityBacktestChart.hidden = false;
  ui.reliabilityBacktestChart.replaceChildren();
  const width = 480;
  const height = 275;
  const margin = { top: 18, right: 18, bottom: 42, left: 48 };
  const values = points.flatMap((point) => [point.actual, point.prediction]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.08;
  min -= pad;
  max += pad;
  const firstYear = points[0].year;
  const lastYear = points.at(-1).year;
  const x = (year) => margin.left + ((year - firstYear) / Math.max(lastYear - firstYear, 1)) * (width - margin.left - margin.right);
  const y = (value) => height - margin.bottom - ((value - min) / (max - min)) * (height - margin.top - margin.bottom);
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Mean actual and predicted values by target year" });
  svg.append(createSvg("line", { x1: margin.left, y1: height - margin.bottom, x2: width - margin.right, y2: height - margin.bottom, class: "reliability-axis" }));
  svg.append(createSvg("line", { x1: margin.left, y1: margin.top, x2: margin.left, y2: height - margin.bottom, class: "reliability-axis" }));
  ["actual", "prediction"].forEach((key) => {
    const path = points.map((point, index) => `${index ? "L" : "M"}${x(point.year)},${y(point[key])}`).join(" ");
    svg.append(createSvg("path", { d: path, class: `reliability-series reliability-series--${key}` }));
    points.forEach((point) => {
      const marker = createSvg("circle", { cx: x(point.year), cy: y(point[key]), r: 3.2, class: `reliability-series-point reliability-series-point--${key}` });
      const title = createSvg("title");
      title.textContent = `${point.year} · ${key === "actual" ? "actual" : "predicted"} mean ${formatMetricValue(point[key])}`;
      marker.append(title);
      svg.append(marker);
    });
  });
  const legend = createSvg("text", { x: width / 2, y: height - 8, "text-anchor": "middle", class: "reliability-chart-label" });
  legend.textContent = `Orange: actual · Teal: predicted · mean per entity · ${points.length} target years`;
  svg.append(legend);
  ui.reliabilityBacktestChart.append(svg);
}

function renderReliabilityModelProcess() {
  ui.reliabilityModelProcess.replaceChildren();
  const horizon = Number(ui.reliabilityHorizon.value);
  const rows = reliabilityFilteredForecastRows(horizon);
  if (!rows.length) {
    benchmarkEmpty(ui.reliabilityModelProcess, "No production forecast records match this scope, horizon and filter selection.");
    return;
  }
  const groups = new Map();
  rows.forEach((row) => {
    const label = forecastModelLabel(row) || "Model label not published";
    groups.set(label, (groups.get(label) ?? 0) + 1);
  });
  [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([label, count]) => {
    const row = document.createElement("div");
    row.className = "reliability-model-row";
    const name = document.createElement("strong");
    name.textContent = label;
    const detail = document.createElement("span");
    detail.textContent = `${count} production forecast output${count === 1 ? "" : "s"} at ${horizon}-year horizon`;
    row.append(name, detail);
    ui.reliabilityModelProcess.append(row);
  });
}

function renderReliabilityRankingState() {
  const cityScope = state.reliabilityScope === "city";
  ui.reliabilityRankingTitle.textContent = cityScope ? "City error ranking" : "Country error ranking";
  ui.reliabilityRankingSubtitle.textContent = cityScope
    ? "Selected model and horizon · error in percentage points with sample size"
    : "Selected model and horizon · error in persons/year with sample size";
  ui.reliabilityRankingEmptyTitle.textContent = cityScope ? "City error ranking unavailable" : "Country error ranking unavailable";
  ui.reliabilityRankingEmptyText.textContent = !state.backtestViewsAvailable
    ? "The protected backtest views are not yet configured or accessible. The existing published forecast outputs remain available."
    : cityScope
      ? "No verified city-level backtest errors are available for this horizon. Percentage-point errors are kept separate from country person-count errors."
      : "No verified country-level backtest errors are available for this horizon.";
  const horizon = Number(ui.reliabilityHorizon.value);
  const selectedModel = ui.reliabilityModel.value;
  const rows = state.backtestEntityMetrics
    .filter((row) => row.level === state.reliabilityScope && safeNumber(row.horizon) === horizon
      && (selectedModel === "all" || String(row.model_id) === selectedModel)
      && safeNumber(row.mae) !== null)
    .sort((a, b) => safeNumber(a.mae) - safeNumber(b.mae));
  ui.reliabilityRankingEmpty.hidden = rows.length > 0;
  ui.reliabilityRankingList.hidden = rows.length === 0;
  ui.reliabilityRankingList.replaceChildren();
  const maximum = Math.max(...rows.map((row) => safeNumber(row.mae)), 0);
  rows.slice(0, 10).forEach((row, index) => {
    const item = document.createElement("article");
    item.className = "reliability-ranking-row";
    const rank = document.createElement("span");
    rank.className = "reliability-ranking-row__rank";
    rank.textContent = String(index + 1);
    const name = document.createElement("strong");
    name.textContent = reliabilityEntityLabel(row);
    const track = document.createElement("div");
    track.className = "reliability-ranking-track";
    const bar = document.createElement("i");
    bar.style.width = `${maximum === 0 ? 100 : Math.max(4, 100 - safeNumber(row.mae) / maximum * 100)}%`;
    track.append(bar);
    const score = document.createElement("small");
    score.textContent = `MAE ${formatMetricValue(row.mae)} ${cityScope ? "pp" : "persons/year"} · n=${row.n_observations}`;
    item.append(rank, name, track, score);
    ui.reliabilityRankingList.append(item);
  });
  ui.reliabilityOpenCountry.disabled = cityScope || ui.reliabilityEntity.value === "all";
}

function renderForecastReliability() {
  if (!state.initialized) return;
  ui.reliabilityCountryScope.setAttribute("aria-pressed", String(state.reliabilityScope === "country"));
  ui.reliabilityCityScope.setAttribute("aria-pressed", String(state.reliabilityScope === "city"));
  populateReliabilityFilters();
  renderReliabilityHorizonCards();
  renderReliabilityMetricStatus();
  renderReliabilityScatter();
  renderReliabilityBacktestTimeline();
  renderReliabilityModelProcess();
  renderReliabilityRankingState();
}

function currentCountry() {
  return countryById(state.selectedCountry);
}

function updateCountryQuery() {
  if (!state.selectedCountry || state.selectedCountry === "all") return;
  const url = new URL(window.location.href);
  url.searchParams.set("country", state.selectedCountry);
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${window.location.hash}`);
}

function updateCityQuery(cityId) {
  const url = new URL(window.location.href);
  if (cityId) url.searchParams.set("city", cityId);
  else url.searchParams.delete("city");
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${window.location.hash}`);
}

function formatSignedPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Not available";
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${countryChangeFormatter.format(Math.abs(value))}%`;
}

function currentCountryObservations() {
  return state.observed
    .filter((row) => String(row.entity_id) === state.selectedCountry)
    .filter((row) => safeNumber(row.year) !== null && safeNumber(row.value) !== null)
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
}

function currentCountryForecasts() {
  const byHorizon = new Map();
  state.forecasts
    .filter((row) => String(row.entity_id) === state.selectedCountry)
    .filter((row) => safeNumber(row.horizon) !== null)
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon))
    .forEach((row) => {
      const horizon = safeNumber(row.horizon);
      const existing = byHorizon.get(horizon);
      if (!existing || (!existing.forecast_available && row.forecast_available)) byHorizon.set(horizon, row);
    });
  return [...byHorizon.values()].sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
}

function forecastIsAvailable(row) {
  return row?.forecast_available === true || row?.forecast_available === "true";
}

function renderCountryIntelligence() {
  if (!state.initialized || state.selectedCountry === "all") return;
  const country = currentCountry();
  if (!country) return;
  populateIntelligenceCountryControl();
  ui.intelligenceCountrySelect.value = country.id;
  ui.countryHistoryTitle.textContent = `Immigration to ${country.name}: Historical Trend and Forecast`;

  const observations = currentCountryObservations();
  const latest = observations.at(-1);
  ui.countryLatestYear.textContent = latest ? String(safeNumber(latest.year)) : "Not available";
  ui.countryLatestValue.textContent = latest ? formatNumber(safeNumber(latest.value)) : "Not available";

  renderCountryForecastCards(country);
  renderCountryHistoryChart();
  renderCountryYearChange();
  renderCountryForecastComparison();
  renderCountryReliability();
  renderCityExplorer(country);
  renderCountryInsights(country, observations, currentCountryForecasts());
}

function renderCountryForecastCards(country) {
  ui.countryForecastCards.replaceChildren();
  const forecasts = currentCountryForecasts();
  [1, 3, 5].forEach((horizon) => {
    const row = forecasts.find((item) => safeNumber(item.horizon) === horizon);
    const available = forecastIsAvailable(row) && safeNumber(row?.prediction) !== null && safeNumber(row?.target_year) !== null;
    const card = document.createElement("article");
    card.className = "outlook-panel country-forecast-kpi";
    const heading = document.createElement("h2");
    heading.textContent = `Forecast ${horizon}-year`;
    const target = document.createElement("span");
    target.className = "country-forecast-kpi__target";
    target.textContent = available ? `Target ${safeNumber(row.target_year)}` : "Target year not available";
    const value = document.createElement("strong");
    value.textContent = available ? formatNumber(safeNumber(row.prediction)) : "Not available";
    const note = document.createElement("small");
    note.textContent = available
      ? `${country.name} · persons per year${forecastModelLabel(row) ? ` · ${forecastModelLabel(row)}` : ""}`
      : row ? "No valid forecast for this horizon" : "No forecast in the latest Country view";
    card.append(heading, target, value, note);
    ui.countryForecastCards.append(card);
  });
}

function forecastModelLabel(row) {
  if (!row) return "";
  const key = Object.keys(row).find((item) => /^(model|model_name|model_id|model_key|model_label|algorithm)$/i.test(item));
  const value = key ? row[key] : null;
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function intervalBounds(row, level) {
  if (!row) return null;
  const normalizedKeys = Object.keys(row).map((key) => ({ key, normalized: key.toLowerCase().replace(/[^a-z0-9]/g, "") }));
  const lowerKey = normalizedKeys.find(({ normalized }) => normalized.includes(String(level)) && /(lower|lo|lowerbound|lowerlimit)/.test(normalized));
  const upperKey = normalizedKeys.find(({ normalized }) => normalized.includes(String(level)) && /(upper|hi|upperbound|upperlimit)/.test(normalized));
  if (!lowerKey || !upperKey) return null;
  const lower = safeNumber(row[lowerKey.key]);
  const upper = safeNumber(row[upperKey.key]);
  if (lower === null || upper === null || lower > upper) return null;
  return { lower, upper };
}

function countryChartForecastPoints() {
  return currentCountryForecasts()
    .filter((row) => forecastIsAvailable(row))
    .map((row) => ({
      year: safeNumber(row.target_year),
      value: safeNumber(row.prediction),
      type: "forecast",
      row,
      horizon: safeNumber(row.horizon),
      band80: intervalBounds(row, 80),
      band95: intervalBounds(row, 95),
    }))
    .filter((point) => point.year !== null && point.value !== null)
    .sort((a, b) => a.year - b.year);
}

function countryChartDomain(observed, forecasts) {
  const points = [...observed.map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value) })), ...forecasts];
  const years = points.map((point) => point.year).filter((year) => year !== null);
  const lastObservedYear = observed.length ? safeNumber(observed.at(-1).year) : null;
  const minimumYear = years.length ? Math.min(...years) : null;
  const maximumYear = years.length ? Math.max(...years) : null;
  let start = minimumYear;
  if (ui.countryChartPeriod.value !== "all" && lastObservedYear !== null) {
    start = Math.max(minimumYear, lastObservedYear - Number(ui.countryChartPeriod.value) + 1);
  }
  if (state.countryChartZoom > 1 && start !== null && maximumYear !== null) {
    const span = Math.max((maximumYear - start) / state.countryChartZoom, 2);
    start = Math.max(minimumYear, maximumYear - span);
  }
  return { start, end: maximumYear, lastObservedYear };
}

function renderCountryHistoryChart() {
  ui.countryHistoryChart.replaceChildren();
  const country = currentCountry();
  if (!country) return;
  const observed = currentCountryObservations();
  const forecasts = countryChartForecastPoints();
  const points = [...observed.map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value), type: "observed", row })), ...forecasts];
  const has80 = forecasts.some((point) => point.band80);
  const has95 = forecasts.some((point) => point.band95);
  ui.countryBand80.disabled = !has80;
  ui.countryBand95.disabled = !has95;
  if (!has80) ui.countryBand80.checked = false;
  if (!has95) ui.countryBand95.checked = false;
  ui.countryBandNote.textContent = has80 || has95 ? "Only published bounds are shown" : "Uncertainty bounds are not available in this view";

  const modelLabels = unique(forecasts.map((point) => forecastModelLabel(point.row)).filter(Boolean));
  const runLabels = unique(forecasts.map((point) => point.row.run_label || point.row.run_id).filter(Boolean).map(String));
  ui.countryHistorySubtitle.textContent = `${country.name} · Persons per year${modelLabels.length ? ` · Models: ${modelLabels.join(", ")}` : ""}${runLabels.length === 1 ? ` · Run ${runLabels[0]}` : ""}`;
  if (!points.length) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty chart-empty";
    empty.textContent = "No observed or forecast values are available for this country.";
    ui.countryHistoryChart.append(empty);
    return;
  }

  const domain = countryChartDomain(observed, forecasts);
  const visibleObserved = observed.filter((row) => safeNumber(row.year) >= domain.start && safeNumber(row.year) <= domain.end);
  const visibleForecasts = forecasts.filter((point) => point.year >= domain.start && point.year <= domain.end);
  const values = [...visibleObserved.map((row) => safeNumber(row.value)), ...visibleForecasts.map((point) => point.value)];
  visibleForecasts.forEach((point) => {
    if (ui.countryBand80.checked && point.band80) values.push(point.band80.lower, point.band80.upper);
    if (ui.countryBand95.checked && point.band95) values.push(point.band95.lower, point.band95.upper);
  });
  const width = 900;
  const height = 410;
  const margin = { top: 23, right: 27, bottom: 52, left: 80 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const start = domain.start ?? Math.min(...points.map((point) => point.year));
  const end = Math.max(domain.end ?? start, start + 1);
  const rawMin = Math.min(0, ...values);
  const rawMax = Math.max(...values, 1);
  const padding = Math.max((rawMax - rawMin) * .08, 1);
  const minValue = rawMin < 0 ? rawMin - padding : 0;
  const maxValue = rawMax + padding;
  const x = (year) => margin.left + ((year - start) / (end - start)) * plotWidth;
  const y = (value) => margin.top + ((maxValue - value) / (maxValue - minValue)) * plotHeight;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `Immigration to ${country.name}, observed and forecast, in persons per year` });
  svg.dataset.countryChart = "true";

  for (let index = 0; index <= 4; index += 1) {
    const value = minValue + ((maxValue - minValue) * (4 - index)) / 4;
    const lineY = margin.top + (plotHeight * index) / 4;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: lineY, y2: lineY, class: "chart-gridline" }));
    const tick = createSvg("text", { x: margin.left - 11, y: lineY + 4, "text-anchor": "end", class: "chart-axis-label" });
    tick.textContent = formatAxisNumber(value);
    svg.append(tick);
  }

  if (domain.lastObservedYear !== null && domain.lastObservedYear >= start && domain.lastObservedYear <= end) {
    const separatorX = x(domain.lastObservedYear);
    svg.append(createSvg("line", { x1: separatorX, x2: separatorX, y1: margin.top, y2: margin.top + plotHeight, class: "chart-forecast-divider" }));
    const separatorLabel = createSvg("text", { x: separatorX + 5, y: margin.top + 12, class: "chart-axis-label chart-divider-label" });
    separatorLabel.textContent = `Last observed · ${domain.lastObservedYear}`;
    svg.append(separatorLabel);
  }

  visibleForecasts.forEach((point) => {
    [
      { enabled: ui.countryBand95.checked, bounds: point.band95, className: "country-uncertainty-band country-uncertainty-band--95", label: "95%" },
      { enabled: ui.countryBand80.checked, bounds: point.band80, className: "country-uncertainty-band country-uncertainty-band--80", label: "80%" },
    ].filter((band) => band.enabled && band.bounds).forEach((band) => {
      const rect = createSvg("rect", {
        x: x(point.year) - 12,
        y: y(band.bounds.upper),
        width: 24,
        height: Math.max(y(band.bounds.lower) - y(band.bounds.upper), 1),
        rx: 5,
        class: band.className,
      });
      const title = createSvg("title");
      title.textContent = `${point.year} ${band.label} uncertainty band · ${formatNumber(band.bounds.lower)}–${formatNumber(band.bounds.upper)} persons per year`;
      rect.append(title);
      svg.append(rect);
    });
  });

  splitObservedSegments(visibleObserved.map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value) }))).forEach((segment) => {
    if (segment.length < 2) return;
    const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "chart-line chart-line--observed" }));
  });
  const lastVisibleObservation = [...visibleObserved].reverse().find((row) => safeNumber(row.year) <= (domain.lastObservedYear ?? end));
  const forecastLine = [
    ...(lastVisibleObservation ? [{ year: safeNumber(lastVisibleObservation.year), value: safeNumber(lastVisibleObservation.value), type: "observed" }] : []),
    ...visibleForecasts,
  ].sort((a, b) => a.year - b.year);
  if (forecastLine.length > 1) {
    const path = forecastLine.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "chart-line chart-line--forecast" }));
  }

  visibleObserved.forEach((row) => {
    const year = safeNumber(row.year);
    const value = safeNumber(row.value);
    const circle = createSvg("circle", { cx: x(year), cy: y(value), r: 3.7, class: "chart-point chart-point--observed" });
    const title = createSvg("title");
    title.textContent = `${country.name} · ${year} · Observed · ${formatNumber(value)} persons per year`;
    circle.append(title);
    svg.append(circle);
  });
  visibleForecasts.forEach((point) => {
    const circle = createSvg("circle", { cx: x(point.year), cy: y(point.value), r: 6, class: "chart-point chart-point--forecast" });
    const title = createSvg("title");
    const interval = [point.band80 && `80% ${formatNumber(point.band80.lower)}–${formatNumber(point.band80.upper)}`, point.band95 && `95% ${formatNumber(point.band95.lower)}–${formatNumber(point.band95.upper)}`].filter(Boolean).join(" · ");
    title.textContent = `${country.name} · ${point.year} · Forecast +${point.horizon} year${forecastModelLabel(point.row) ? ` · ${forecastModelLabel(point.row)}` : ""} · ${formatNumber(point.value)} persons per year${interval ? ` · ${interval}` : ""}${point.row.run_label || point.row.run_id ? ` · Run ${point.row.run_label || point.row.run_id}` : ""}`;
    circle.append(title);
    svg.append(circle);
  });

  const visibleYears = unique([...visibleObserved.map((row) => safeNumber(row.year)), ...visibleForecasts.map((point) => point.year)]).sort((a, b) => a - b);
  const step = Math.max(1, Math.ceil(visibleYears.length / 9));
  visibleYears.filter((year, index) => index % step === 0 || year === visibleYears.at(-1)).forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 17, "text-anchor": "middle", class: "chart-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  const xTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 2, "text-anchor": "middle", class: "chart-axis-title" });
  xTitle.textContent = "Year";
  svg.append(xTitle);
  const yTitle = createSvg("text", { x: 20, y: margin.top + plotHeight / 2, transform: `rotate(-90 20 ${margin.top + plotHeight / 2})`, "text-anchor": "middle", class: "chart-axis-title" });
  yTitle.textContent = "Persons per year";
  svg.append(yTitle);
  ui.countryHistoryChart.append(svg);
}

function renderCountryYearChange() {
  ui.countryYoyChart.replaceChildren();
  const country = currentCountry();
  if (!country) return;
  const observations = currentCountryObservations();
  const changes = [];
  for (let index = 1; index < observations.length; index += 1) {
    const previous = observations[index - 1];
    const current = observations[index];
    const previousYear = safeNumber(previous.year);
    const currentYear = safeNumber(current.year);
    if (currentYear !== previousYear + 1) continue;
    const base = safeNumber(previous.value);
    const value = safeNumber(current.value);
    if (base === null || value === null) continue;
    const absolute = value - base;
    const percent = base === 0 ? null : absolute / Math.abs(base) * 100;
    if (ui.countryYoyMeasure.value === "percent" && percent === null) continue;
    changes.push({ from: previousYear, to: currentYear, value: ui.countryYoyMeasure.value === "percent" ? percent : absolute });
  }
  ui.countryYoyNote.textContent = ui.countryYoyMeasure.value === "percent"
    ? "Percent change uses the previous year's observed value as the denominator. Zero baselines are omitted."
    : "Absolute difference in observed persons per year.";
  if (!changes.length) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty";
    empty.textContent = "Insufficient consecutive observed years for a valid change series.";
    ui.countryYoyChart.append(empty);
    return;
  }
  const width = 520;
  const height = 205;
  const margin = { top: 12, right: 12, bottom: 36, left: 15 };
  const baselineY = margin.top + (height - margin.top - margin.bottom) / 2;
  const plotHeight = height - margin.top - margin.bottom;
  const maximum = Math.max(...changes.map((item) => Math.abs(item.value)), 1);
  const barSlot = (width - margin.left - margin.right) / changes.length;
  const barWidth = Math.max(5, Math.min(24, barSlot * .58));
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${country.name} year-over-year immigration change` });
  svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: baselineY, y2: baselineY, class: "chart-gridline chart-zero-line" }));
  changes.forEach((item, index) => {
    const magnitude = Math.abs(item.value) / maximum * (plotHeight / 2 - 5);
    const x = margin.left + index * barSlot + (barSlot - barWidth) / 2;
    const y = item.value >= 0 ? baselineY - magnitude : baselineY;
    const rect = createSvg("rect", { x, y, width: barWidth, height: Math.max(magnitude, 1), rx: 3, class: `country-change-bar${item.value < 0 ? " is-negative" : ""}` });
    const title = createSvg("title");
    const formatted = ui.countryYoyMeasure.value === "percent" ? formatSignedPercent(item.value) : `${formatSigned(item.value)} persons`;
    title.textContent = `${item.from} to ${item.to} · ${formatted}`;
    rect.append(title);
    svg.append(rect);
    const label = createSvg("text", { x: x + barWidth / 2, y: height - 13, "text-anchor": "middle", class: "chart-axis-label" });
    label.textContent = String(item.to);
    svg.append(label);
  });
  ui.countryYoyChart.append(svg);
}

function renderCountryForecastComparison() {
  ui.countryForecastCompare.replaceChildren();
  const observations = currentCountryObservations();
  const baseline = observations.at(-1);
  const rows = currentCountryForecasts().filter((row) => forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null);
  if (!baseline) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty";
    empty.textContent = "A valid observed baseline is required for this comparison.";
    ui.countryForecastCompare.append(empty);
    return;
  }
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty";
    empty.textContent = "No valid forecasts are available for this country.";
    ui.countryForecastCompare.append(empty);
    return;
  }
  const baseValue = safeNumber(baseline.value);
  const comparableRows = rows.filter((row) => {
    const recordedBaseline = safeNumber(row.last_observed_value);
    return recordedBaseline !== null && Math.abs(recordedBaseline - baseValue) <= 0.000001;
  });
  if (!comparableRows.length) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty";
    empty.textContent = "Forecasts are available, but their recorded baseline does not match the latest observed value. Change is not calculated.";
    ui.countryForecastCompare.append(empty);
    return;
  }
  const values = comparableRows.map((row) => safeNumber(row.prediction) - baseValue);
  const maxAbs = Math.max(...values.map(Math.abs), 1);
  comparableRows.forEach((row) => {
    const predicted = safeNumber(row.prediction);
    const targetYear = safeNumber(row.target_year);
    const change = predicted - baseValue;
    const percent = baseValue === 0 ? null : change / Math.abs(baseValue) * 100;
    const item = document.createElement("article");
    item.className = "forecast-compare-item";
    const label = document.createElement("div");
    label.className = "forecast-compare-item__heading";
    const horizon = document.createElement("strong");
    horizon.textContent = `${targetYear} · +${safeNumber(row.horizon)}-year`;
    const changeLabel = document.createElement("span");
    changeLabel.textContent = percent === null ? formatSigned(change, { suffix: " persons" }) : `${formatSignedPercent(percent)} · ${formatSigned(change, { suffix: " persons" })}`;
    label.append(horizon, changeLabel);
    const track = document.createElement("div");
    track.className = "forecast-change-track";
    const zero = document.createElement("span");
    zero.className = "forecast-change-track__zero";
    const bar = document.createElement("i");
    bar.className = `forecast-change-track__bar${change < 0 ? " is-negative" : ""}`;
    const barWidth = Math.max(Math.abs(change) / maxAbs * 46, 1);
    bar.style.width = `${barWidth}%`;
    bar.style.left = change >= 0 ? "50%" : `${50 - barWidth}%`;
    track.append(zero, bar);
    const details = document.createElement("p");
    details.textContent = `Observed ${safeNumber(baseline.year)}: ${formatNumber(baseValue)} · Forecast: ${formatNumber(predicted)} persons per year`;
    item.append(label, track, details);
    ui.countryForecastCompare.append(item);
  });
}

function renderCountryReliability() {
  const forecasts = currentCountryForecasts();
  const models = unique(forecasts.map((row) => forecastModelLabel(row)).filter(Boolean));
  ui.countryReliabilityNote.textContent = models.length
    ? `Production model${models.length > 1 ? "s" : ""}: ${models.join(", ")}. Country-level backtesting metrics are not included in the currently published views, so no accuracy score is inferred.`
    : "Country-level backtesting metrics are not included in the currently published views, so no accuracy score is inferred.";
}

function cityCountryReference(row) {
  const keys = ["country_name", "country", "country_id", "country_code", "country_iso2", "parent_country_name", "parent_country", "parent_country_id", "parent_entity_name"];
  for (const key of keys) {
    const value = row?.[key];
    if (value === null || value === undefined || value === "" || typeof value === "object") continue;
    const text = String(value);
    const matchingCountry = listCountries().find((country) => String(country.id) === text || normalizeName(country.name) === normalizeName(text) || normalizeName(country.id) === normalizeName(text));
    if (matchingCountry) return matchingCountry.id;
    const countryByCode = { es: "spain", esp: "spain", it: "italy", ita: "italy" }[normalizeName(text)];
    const codedCountry = countryByCode ? listCountries().find((country) => normalizeName(country.name) === countryByCode) : null;
    if (codedCountry) return codedCountry.id;
  }
  return null;
}

function cityRecordsForCurrentCountry() {
  const allRows = [...state.cityObserved, ...state.cityForecasts];
  const hasParentField = allRows.some((row) => ["country_name", "country", "country_id", "country_code", "country_iso2", "parent_country_name", "parent_country", "parent_country_id", "parent_entity_name"].some((key) => row?.[key] !== null && row?.[key] !== undefined && row?.[key] !== ""));
  const cityGroups = new Map();
  const getCity = (row) => {
    if (cityCountryReference(row) !== state.selectedCountry || !row.entity_id) return;
    const id = String(row.entity_id);
    if (!cityGroups.has(id)) cityGroups.set(id, { id, name: row.entity_name || id, observed: [], forecasts: [] });
    return cityGroups.get(id);
  };
  state.cityObserved.forEach((row) => {
    const city = getCity(row);
    if (city && Object.hasOwn(row, "year") && Object.hasOwn(row, "value")) city.observed.push(row);
  });
  state.cityForecasts.forEach((row) => {
    const city = getCity(row);
    if (city && Object.hasOwn(row, "horizon")) city.forecasts.push(row);
  });
  return { cities: [...cityGroups.values()].sort((a, b) => a.name.localeCompare(b.name, "en")), hasParentField, totalRows: allRows.length };
}

function cityRecordsAcrossCountries() {
  const allRows = [...state.cityObserved, ...state.cityForecasts];
  const parentKeys = ["country_name", "country", "country_id", "country_code", "country_iso2", "parent_country_name", "parent_country", "parent_country_id", "parent_entity_name"];
  const hasParentField = allRows.some((row) => parentKeys.some((key) => row?.[key] !== null && row?.[key] !== undefined && row?.[key] !== ""));
  const groups = new Map();
  const getCity = (row) => {
    const countryId = cityCountryReference(row);
    if (!countryId || !row?.entity_id) return null;
    const id = String(row.entity_id);
    const key = `${countryId}::${id}`;
    if (!groups.has(key)) groups.set(key, { key, id, name: row.entity_name || id, countryId, observed: [], forecasts: [] });
    const city = groups.get(key);
    if (!city.name || city.name === id) city.name = row.entity_name || id;
    return city;
  };
  state.cityObserved.forEach((row) => {
    const city = getCity(row);
    if (city && Object.hasOwn(row, "year") && Object.hasOwn(row, "value")) city.observed.push(row);
  });
  state.cityForecasts.forEach((row) => {
    const city = getCity(row);
    if (city && Object.hasOwn(row, "horizon")) city.forecasts.push(row);
  });
  const cities = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, "en") || (countryById(a.countryId)?.name ?? "").localeCompare(countryById(b.countryId)?.name ?? "", "en"));
  return { cities, hasParentField, totalRows: allRows.length };
}

function cityObservationSeries(city) {
  const byYear = new Map();
  city.observed
    .map((row) => ({ row, year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((item) => item.year !== null && item.value !== null)
    .sort((a, b) => a.year - b.year)
    .forEach((item) => {
      if (!byYear.has(item.year)) {
        byYear.set(item.year, item);
        return;
      }
      const existing = byYear.get(item.year);
      if (existing && Math.abs(existing.value - item.value) > 0.000001) byYear.set(item.year, null);
    });
  return [...byYear.values()].filter(Boolean).sort((a, b) => a.year - b.year);
}

function cityForecastSeries(city) {
  return [1, 3].map((horizon) => city.forecasts
    .filter((row) => safeNumber(row.horizon) === horizon && forecastIsAvailable(row)
      && safeNumber(row.target_year) !== null && safeNumber(row.prediction) !== null)
    .sort((a, b) => safeNumber(a.target_year) - safeNumber(b.target_year))[0] ?? null);
}

function cityPercent(value, digits = 2) {
  const number = safeNumber(value);
  return number === null ? "—" : `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits }).format(number)}%`;
}

function cityPercentagePoints(value, digits = 2) {
  const number = safeNumber(value);
  if (number === null) return "Not available";
  const sign = number > 0 ? "+" : number < 0 ? "−" : "";
  return `${sign}${new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits }).format(Math.abs(number))} pp`;
}

function cityEmpty(container, message, className = "city-empty-state") {
  container.replaceChildren();
  const empty = document.createElement("div");
  empty.className = className;
  empty.textContent = message;
  container.append(empty);
}

function populateCityControls(cities) {
  const countries = [...new Map(cities.map((city) => [city.countryId, countryById(city.countryId)]).filter(([, country]) => country).map(([id, country]) => [id, country])).values()]
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  replaceOptions(ui.cityCountryFilter, [{ value: "all", label: "All countries" }, ...countries.map((country) => ({ value: country.id, label: country.name }))]);
  const requestedCountry = new URLSearchParams(window.location.search).get("country");
  const preferredCountry = [state.cityCountryFilter, state.selectedCountry, requestedCountry].find((id) => id && (id === "all" || countries.some((country) => country.id === String(id))));
  ui.cityCountryFilter.value = preferredCountry ?? "all";
  state.cityCountryFilter = ui.cityCountryFilter.value;
  const search = normalizeName(ui.citySearchInput.value);
  const countryFilter = ui.cityCountryFilter.value;
  const visibleCities = cities.filter((city) => {
    const countryName = countryById(city.countryId)?.name ?? "";
    const matchesCountry = countryFilter === "all" || city.countryId === countryFilter;
    const matchesSearch = !search || normalizeName(city.name).includes(search) || normalizeName(countryName).includes(search);
    return matchesCountry && matchesSearch;
  });
  const requestedCity = new URLSearchParams(window.location.search).get("city");
  const selected = visibleCities.find((city) => city.id === state.selectedCity && city.countryId === state.selectedCountry)
    ?? visibleCities.find((city) => city.id === requestedCity && (!requestedCountry || city.countryId === requestedCountry))
    ?? visibleCities[0]
    ?? null;
  replaceOptions(ui.citySelect, visibleCities.map((city) => ({ value: city.key, label: `${city.name} · ${countryById(city.countryId)?.name ?? city.countryId}` })));
  ui.citySelect.disabled = visibleCities.length === 0;
  if (selected) {
    ui.citySelect.value = selected.key;
    state.selectedCity = selected.id;
    state.selectedCountry = selected.countryId;
  }
  return { visibleCities, selected };
}

function renderCityIntelligence() {
  if (!state.initialized) return;
  const { cities, hasParentField, totalRows } = cityRecordsAcrossCountries();
  ui.cityScopeSummary.textContent = `${cities.length} verified production ${cities.length === 1 ? "city" : "cities"}`;
  if (!totalRows) {
    ui.cityScopeSummary.textContent = "No City records in published views";
    cityEmpty(ui.cityTrendChart, "No city observations or forecasts are available in the current production views. No urban values are generated or inferred.");
    setMessage(ui.citySelectionNote, "City-level observations and forecasts have not been published to the dashboard yet.");
    clearCityIntelligenceDetails();
    return;
  }
  if (!hasParentField || !cities.length) {
    ui.cityScopeSummary.textContent = "Country linkage unavailable";
    cityEmpty(ui.cityTrendChart, "City records exist, but they cannot be linked to a verified country from the published fields. The page will not guess city-country assignments.");
    setMessage(ui.citySelectionNote, "The published City view needs a verifiable country field before city comparison can be enabled.");
    clearCityIntelligenceDetails();
    return;
  }
  const { visibleCities, selected } = populateCityControls(cities);
  if (!visibleCities.length || !selected) {
    setMessage(ui.citySelectionNote, "No production city matches the current country and search filters.");
    clearCityIntelligenceDetails();
    return;
  }
  setMessage(ui.citySelectionNote, `${visibleCities.length} city${visibleCities.length === 1 ? "" : "ies"} match the current filters. Historical values are foreign-resident share (%), not annual immigration flows.`);
  const selectionChanged = selected.id !== state.selectedCity || selected.countryId !== state.selectedCountry;
  state.selectedCountry = selected.countryId;
  state.selectedCity = selected.id;
  if (selectionChanged) {
    updateCountryQuery();
    updateCityQuery(selected.id);
  }
  renderSelectedCity(selected);
  renderCityRanking();
}

function clearCityIntelligenceDetails() {
  [ui.cityKpiName, ui.cityKpiCountry, ui.cityKpiYear, ui.cityKpiShare, ui.cityKpiForecast1, ui.cityKpiForecast1Year, ui.cityKpiForecast3, ui.cityKpiForecast3Year, ui.cityKpiScope, ui.cityKpiScopeNote].forEach((element) => { element.textContent = "—"; });
  ui.cityTrendTitle.textContent = "Foreign Population Share";
  cityEmpty(ui.cityRankingList, "No verified city observations are available for ranking.", "city-ranking-empty");
  cityEmpty(ui.cityYoyChart, "Year-over-year change is unavailable without observed city values.");
  cityEmpty(ui.cityForecastCompare, "No matching City forecast and observed baseline are available.");
  cityEmpty(ui.cityProfileContent, "No verified city profile metadata is available.", "city-profile-empty");
  cityEmpty(ui.cityInsights, "Insights will appear when verified City observations or forecasts are available.", "city-insights-empty");
  [ui.cityTrendNote, ui.cityRankingSubtitle, ui.cityRankingNote, ui.cityYoyNote, ui.cityForecastCompareNote, ui.cityProfileSubtitle].forEach((element) => { element.textContent = ""; });
  ui.cityReliabilityInterval.textContent = "Not published";
  ui.cityReliabilityIntervalNote.textContent = "No verified City forecast interval is available for this selection";
  renderCityReliability(null);
}

function renderCityReliability(city) {
  const metricsAvailable = state.backtestViewsAvailable;
  const rows = city && metricsAvailable
    ? state.backtestEntityMetrics
      .filter((row) => row.level === "city"
        && String(row.country_iso2 ?? "") === String(city.countryId)
        && String(row.entity_id ?? "") === String(city.id))
      .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon))
    : [];
  const emptyValue = metricsAvailable ? "Not published" : "Unavailable";
  const emptyNote = metricsAvailable
    ? "No verified selection-backtest metric for this city"
    : "Protected backtest views are not accessible";

  ui.cityReliabilityMae.textContent = rows.length
    ? `${rows.map((row) => `${safeNumber(row.horizon)}y ${formatMetricValue(row.mae)}`).join(" · ")} pp`
    : emptyValue;
  ui.cityReliabilityMaeNote.textContent = rows.length ? "Selection-backtest mean absolute error by horizon" : emptyNote;
  ui.cityReliabilityWape.textContent = rows.length
    ? rows.map((row) => `${safeNumber(row.horizon)}y ${formatMetricValue(row.wape_pct, 1)}%`).join(" · ")
    : emptyValue;
  ui.cityReliabilityWapeNote.textContent = rows.length ? "Weighted absolute percentage error by horizon" : emptyNote;
  ui.cityReliabilityR2.textContent = "Not published";
  ui.cityReliabilityR2Note.textContent = "R² is not part of the published metric contract";
  ui.cityReliabilitySample.textContent = rows.length
    ? rows.map((row) => `${safeNumber(row.horizon)}y ${formatNumber(row.n_observations)}/${formatNumber(row.n_folds)}`).join(" · ")
    : emptyValue;
  ui.cityReliabilitySampleNote.textContent = rows.length ? "Evaluation pairs / folds by horizon" : emptyNote;
}

function renderSelectedCity(city) {
  const country = countryById(city.countryId);
  const observations = cityObservationSeries(city);
  const latest = observations.at(-1) ?? null;
  const forecasts = cityForecastSeries(city);
  const availableForecasts = forecasts.filter(Boolean);
  renderCityReliability(city);
  ui.cityKpiName.textContent = city.name;
  ui.cityKpiCountry.textContent = country?.name ?? "Verified country";
  ui.cityKpiYear.textContent = latest ? String(latest.year) : "Not available";
  ui.cityKpiShare.textContent = latest ? cityPercent(latest.value) : "Not available";
  const forecast1 = forecasts[0];
  const forecast3 = forecasts[1];
  ui.cityKpiForecast1.textContent = forecast1 ? cityPercent(forecast1.prediction) : "Not available";
  ui.cityKpiForecast1Year.textContent = forecast1 ? cityForecastTargetLabel(forecast1) : "No valid +1 City forecast";
  ui.cityKpiForecast3.textContent = forecast3 ? cityPercent(forecast3.prediction) : "Out of model scope";
  ui.cityKpiForecast3Year.textContent = forecast3 ? cityForecastTargetLabel(forecast3) : "No +3 forecast published for this city";
  ui.cityKpiScope.textContent = `${observations.length} years`;
  ui.cityKpiScopeNote.textContent = `${availableForecasts.length} of 2 supported horizons available`;
  const intervalForecasts = availableForecasts.filter((row) => intervalBounds(row, 80) || intervalBounds(row, 95));
  ui.cityReliabilityInterval.textContent = intervalForecasts.length ? `${intervalForecasts.length} horizon${intervalForecasts.length === 1 ? "" : "s"}` : "Not published";
  ui.cityReliabilityIntervalNote.textContent = intervalForecasts.length ? "Valid 80% / 95% interval(s) shown in the main chart; coverage score not published" : "No valid 80% / 95% range for these forecasts";
  ui.cityTrendTitle.textContent = `Foreign Population Share in ${city.name}: Historical Trend and Forecast`;
  renderCityTrendChart(city);
  renderCityYearChange(city);
  renderCityForecastComparison(city, latest, forecasts);
  const cityContextKey = contextEntityCacheKey("city", city.id, city.countryId);
  const cachedCityContext = state.contextCache.get(cityContextKey);
  renderCityProfile(city, observations, forecasts, cachedCityContext ?? []);
  if (!cachedCityContext) {
    loadContextRows("city", city.id, city.countryId).then((contextRows) => {
      if (state.selectedCity === city.id && state.selectedCountry === city.countryId) {
        renderCityProfile(city, observations, forecasts, contextRows);
      }
    });
  }
  renderCityInsights(city, observations, forecasts);
}

function cityForecastTargetLabel(row) {
  const year = safeNumber(row.target_year);
  const currentYear = new Date().getFullYear();
  const label = year !== null && year < currentYear ? "Historical model projection" : year === currentYear ? "Current-year model projection" : "Forecast target";
  return `${label} · ${year ?? "year unavailable"}`;
}

function renderCityTrendChart(city = null) {
  ui.cityTrendChart.replaceChildren();
  city ??= cityRecordsAcrossCountries().cities.find((item) => item.id === state.selectedCity && item.countryId === state.selectedCountry);
  if (!city) return;
  const observations = cityObservationSeries(city);
  const forecasts = cityForecastSeries(city).filter(Boolean).map((row) => ({
    row,
    year: safeNumber(row.target_year),
    value: safeNumber(row.prediction),
    horizon: safeNumber(row.horizon),
    band80: intervalBounds(row, 80),
    band95: intervalBounds(row, 95),
  }));
  const points = [...observations.map((item) => ({ year: item.year, value: item.value })), ...forecasts];
  if (!points.length) {
    cityEmpty(ui.cityTrendChart, `No valid observed share or available +1/+3 forecast is published for ${city.name}.`);
    ui.cityTrendNote.textContent = "Only available forecast horizons are shown; +5 is outside this view.";
    return;
  }
  const width = Math.max(ui.cityTrendChart.clientWidth || 740, 480);
  const height = 345;
  const margin = { top: 22, right: 30, bottom: 55, left: 72 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const years = points.map((point) => point.year);
  const values = points.map((point) => point.value);
  forecasts.forEach((point) => [point.band80, point.band95].filter(Boolean).forEach((band) => values.push(band.lower, band.upper)));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const xDomain = maxYear === minYear ? [minYear - 1, maxYear + 1] : [minYear, maxYear];
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(...values);
  const padding = Math.max((maxValue - minValue) * 0.12, 0.5);
  const yDomain = [minValue - padding * 0.15, maxValue + padding];
  const x = (value) => margin.left + (value - xDomain[0]) / (xDomain[1] - xDomain[0]) * plotWidth;
  const y = (value) => margin.top + (yDomain[1] - value) / (yDomain[1] - yDomain[0]) * plotHeight;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `Observed foreign population share and city forecasts for ${city.name}` });
  for (let index = 0; index <= 4; index += 1) {
    const value = yDomain[0] + (yDomain[1] - yDomain[0]) * index / 4;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: y(value), y2: y(value), class: "city-chart-gridline" }));
    const label = createSvg("text", { x: margin.left - 10, y: y(value) + 4, "text-anchor": "end", class: "city-chart-axis-label" });
    label.textContent = `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 }).format(value)}%`;
    svg.append(label);
  }
  forecasts.forEach((point) => {
    [{ bounds: point.band95, kind: "95" }, { bounds: point.band80, kind: "80" }].filter((item) => item.bounds).forEach(({ bounds, kind }) => {
      const band = createSvg("rect", { x: x(point.year) - 13, y: y(bounds.upper), width: 26, height: Math.max(1, y(bounds.lower) - y(bounds.upper)), rx: 5, class: `city-chart-band city-chart-band--${kind}` });
      const title = createSvg("title");
      title.textContent = `${point.year} · ${kind}% interval · ${cityPercent(bounds.lower)}–${cityPercent(bounds.upper)}`;
      band.append(title);
      svg.append(band);
    });
  });
  if (observations.length > 1) {
    const path = observations.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "city-chart-line city-chart-line--observed" }));
  }
  const latest = observations.at(-1);
  const lineForecasts = forecasts.filter((point) => !latest || point.year > latest.year);
  const forecastPath = [...(latest && lineForecasts.length ? [{ year: latest.year, value: latest.value, observed: true }] : []), ...lineForecasts].sort((a, b) => a.year - b.year);
  if (forecastPath.length > 1) {
    const path = forecastPath.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "city-chart-line city-chart-line--forecast" }));
  }
  if (forecasts.length && latest) svg.append(createSvg("line", { x1: x(latest.year), x2: x(latest.year), y1: margin.top, y2: height - margin.bottom, class: "city-chart-divider" }));
  observations.forEach((point) => {
    const circle = createSvg("circle", { cx: x(point.year), cy: y(point.value), r: 3.5, class: "city-chart-point city-chart-point--observed" });
    const title = createSvg("title");
    title.textContent = `${city.name} · ${point.year} · Observed · ${cityPercent(point.value)}`;
    circle.append(title);
    svg.append(circle);
  });
  forecasts.forEach((point) => {
    const circle = createSvg("circle", { cx: x(point.year), cy: y(point.value), r: 5.5, class: "city-chart-point city-chart-point--forecast" });
    const title = createSvg("title");
    const interval = [point.band80 && `80% ${cityPercent(point.band80.lower)}–${cityPercent(point.band80.upper)}`, point.band95 && `95% ${cityPercent(point.band95.lower)}–${cityPercent(point.band95.upper)}`].filter(Boolean).join(" · ");
    title.textContent = `${city.name} · target ${point.year} · ${cityForecastTargetLabel(point.row)} · ${cityPercent(point.value)}${interval ? ` · ${interval}` : ""}`;
    circle.append(title);
    svg.append(circle);
  });
  const visibleYears = unique(points.map((point) => point.year)).sort((a, b) => a - b);
  const step = Math.max(1, Math.ceil(visibleYears.length / 9));
  visibleYears.filter((year, index) => index % step === 0 || year === visibleYears.at(-1)).forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 27, "text-anchor": "middle", class: "city-chart-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  const xTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 5, "text-anchor": "middle", class: "city-chart-axis-title" });
  xTitle.textContent = "Year";
  const yTitle = createSvg("text", { x: 20, y: margin.top + plotHeight / 2, transform: `rotate(-90 20 ${margin.top + plotHeight / 2})`, "text-anchor": "middle", class: "city-chart-axis-title" });
  yTitle.textContent = "Foreign residents (% of residents)";
  svg.append(xTitle, yTitle);
  ui.cityTrendChart.append(svg);
  const historicalTargets = forecasts.filter((point) => point.year < new Date().getFullYear()).map((point) => point.year);
  ui.cityTrendNote.textContent = `${observations.length} unambiguous observed year${observations.length === 1 ? "" : "s"} shown. Forecast markers are plotted at published target years; targets already elapsed (${historicalTargets.join(", ") || "none"}) are model-snapshot projections, not predictions of the future from today. ${forecasts.some((point) => point.band80 || point.band95) ? "Shaded ranges use only valid published City intervals." : "No valid uncertainty interval is published for this selection."}`;
}

function renderCityRanking() {
  const { cities } = cityRecordsAcrossCountries();
  ui.cityRankingList.replaceChildren();
  const records = cities.map((city) => ({ city, observations: cityObservationSeries(city) })).filter((item) => item.observations.length);
  const yearSets = records.map((item) => new Set(item.observations.map((row) => row.year)));
  const commonYears = yearSets.length ? [...yearSets[0]].filter((year) => yearSets.every((years) => years.has(year))) : [];
  let ranking;
  if (ui.cityRankingCriterion.value === "common") {
    const year = commonYears.sort((a, b) => b - a)[0];
    ranking = year === undefined ? [] : records.map(({ city, observations }) => ({ city, row: observations.find((item) => item.year === year) })).filter((item) => item.row);
    ui.cityRankingSubtitle.textContent = year === undefined ? "No year is observed for every listed city" : `Strict comparison using the latest year shared by all listed cities · ${year}`;
    ui.cityRankingNote.textContent = year === undefined ? "A common-year comparison requires at least one shared observed year across every verified city with data." : `All ${ranking.length} ranked cities use the same observed year (${year}); cities without that year's valid value are omitted.`;
  } else {
    ranking = records.map(({ city, observations }) => ({ city, row: observations.at(-1) }));
    const years = unique(ranking.map((item) => item.row.year));
    ui.cityRankingSubtitle.textContent = "Rank by each city's latest available observed value";
    ui.cityRankingNote.textContent = years.length > 1 ? `Warning: dates differ across cities (${Math.min(...years)}–${Math.max(...years)}). Each row shows its own latest year.` : years.length === 1 ? `All displayed values are from ${years[0]}.` : "No valid observed city shares are published.";
  }
  ranking.sort((a, b) => b.row.value - a.row.value || a.city.name.localeCompare(b.city.name, "en"));
  const top = ranking.slice(0, 12);
  if (!top.length) {
    cityEmpty(ui.cityRankingList, "No comparable observed City values are available for the selected criterion.", "city-ranking-empty");
    return;
  }
  const maxValue = Math.max(...top.map((item) => item.row.value), 0.000001);
  top.forEach(({ city, row }, index) => {
    const item = document.createElement("div");
    item.className = `city-ranking-row${city.id === state.selectedCity && city.countryId === state.selectedCountry ? " is-selected" : ""}`;
    const rank = document.createElement("span");
    rank.className = "city-ranking-rank";
    rank.textContent = String(index + 1).padStart(2, "0");
    const label = document.createElement("span");
    label.className = "city-ranking-name";
    const name = document.createElement("strong");
    name.textContent = city.name;
    const country = document.createElement("small");
    country.textContent = `${countryById(city.countryId)?.name ?? city.countryId} · ${row.year}`;
    label.append(name, country);
    const track = document.createElement("span");
    track.className = "city-ranking-track";
    const bar = document.createElement("i");
    bar.style.width = `${Math.max(0, Math.min(100, row.value / maxValue * 100))}%`;
    track.append(bar);
    const value = document.createElement("strong");
    value.textContent = cityPercent(row.value);
    item.append(rank, label, track, value);
    ui.cityRankingList.append(item);
  });
}

function renderCityYearChange(city = null) {
  ui.cityYoyChart.replaceChildren();
  city ??= cityRecordsAcrossCountries().cities.find((item) => item.id === state.selectedCity && item.countryId === state.selectedCountry);
  if (!city) return;
  const observations = cityObservationSeries(city);
  const measure = ui.cityYoyMeasure.value;
  const changes = [];
  for (let index = 1; index < observations.length; index += 1) {
    const previous = observations[index - 1];
    const current = observations[index];
    if (current.year !== previous.year + 1) continue;
    const delta = current.value - previous.value;
    const value = measure === "relative" ? (previous.value === 0 ? null : delta / Math.abs(previous.value) * 100) : delta;
    if (value !== null) changes.push({ year: current.year, value });
  }
  if (!changes.length) {
    cityEmpty(ui.cityYoyChart, "No consecutive observed years are available to calculate a city change.");
    ui.cityYoyNote.textContent = "Percentage-point change is current share minus prior-year share. Relative change is a separate percentage and is omitted when the prior value is zero.";
    return;
  }
  const visible = changes.slice(-8);
  const width = Math.max(ui.cityYoyChart.clientWidth || 480, 340);
  const rowHeight = 27;
  const height = Math.max(190, 40 + visible.length * rowHeight);
  const margin = { left: 74, right: 48, top: 12, bottom: 12 };
  const plotWidth = width - margin.left - margin.right;
  const maxAbs = Math.max(...visible.map((item) => Math.abs(item.value)), 0.01);
  const zeroX = margin.left + plotWidth / 2;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `${measure === "pp" ? "Percentage-point" : "Relative percentage"} annual change for ${city.name}` });
  svg.append(createSvg("line", { x1: zeroX, x2: zeroX, y1: 5, y2: height - 5, class: "city-yoy-zero" }));
  visible.forEach((item, index) => {
    const centerY = 23 + index * rowHeight;
    const label = createSvg("text", { x: margin.left - 9, y: centerY + 4, "text-anchor": "end", class: "city-chart-axis-label" });
    label.textContent = String(item.year);
    const barWidth = Math.abs(item.value) / maxAbs * (plotWidth / 2 - 4);
    const rect = createSvg("rect", { x: item.value >= 0 ? zeroX : zeroX - barWidth, y: centerY - 6, width: Math.max(1, barWidth), height: 12, rx: 4, class: `city-yoy-bar${item.value < 0 ? " is-negative" : ""}` });
    const value = createSvg("text", { x: item.value >= 0 ? zeroX + barWidth + 6 : zeroX - barWidth - 6, y: centerY + 4, "text-anchor": item.value >= 0 ? "start" : "end", class: "city-yoy-value" });
    value.textContent = `${item.value > 0 ? "+" : ""}${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(item.value)}${measure === "pp" ? " pp" : "%"}`;
    svg.append(label, rect, value);
  });
  ui.cityYoyChart.append(svg);
  ui.cityYoyNote.textContent = measure === "pp"
    ? "Percentage points are the difference between two annual foreign-resident shares (for example, 8% to 9% = +1 pp)."
    : "Relative change is the percentage change from the previous year's share; it is not percentage points.";
}

function renderCityForecastComparison(city, latest, forecasts) {
  ui.cityForecastCompare.replaceChildren();
  const entries = forecasts.map((row) => {
    if (!row || !latest) return null;
    const recordedBaseline = safeNumber(row.last_observed_value);
    if (recordedBaseline === null || Math.abs(recordedBaseline - latest.value) > 0.000001) return null;
    return { row, baseline: latest.value, change: safeNumber(row.prediction) - latest.value };
  }).filter(Boolean);
  if (!entries.length) {
    cityEmpty(ui.cityForecastCompare, "No available +1/+3 forecast has a published baseline that matches the selected city's latest observed value.");
    ui.cityForecastCompareNote.textContent = latest ? `Latest observed baseline: ${cityPercent(latest.value)} in ${latest.year}. Forecast comparisons stay blank until the production baseline can be verified.` : "A valid observed city baseline is required.";
    return;
  }
  const maxAbs = Math.max(...entries.map((item) => Math.abs(item.change)), 0.01);
  entries.forEach(({ row, baseline, change }) => {
    const item = document.createElement("article");
    item.className = "forecast-compare-item city-forecast-compare-item";
    const heading = document.createElement("div");
    heading.className = "forecast-compare-item__heading";
    const title = document.createElement("strong");
    title.textContent = `${safeNumber(row.horizon)}-year · target ${safeNumber(row.target_year)}`;
    const value = document.createElement("span");
    value.textContent = cityPercentagePoints(change);
    heading.append(title, value);
    const track = document.createElement("div");
    track.className = "forecast-change-track city-change-track";
    const zero = document.createElement("i");
    zero.className = "forecast-change-track__zero";
    const bar = document.createElement("i");
    bar.className = `forecast-change-track__bar city-change-track__bar${change < 0 ? " is-negative" : ""}`;
    const width = Math.max(1, Math.abs(change) / maxAbs * 46);
    bar.style.width = `${width}%`;
    bar.style.left = change >= 0 ? "50%" : `calc(50% - ${width}%)`;
    track.append(zero, bar);
    const note = document.createElement("p");
    note.textContent = `Baseline ${cityPercent(baseline)} · ${cityForecastTargetLabel(row)} · change in percentage points`;
    item.append(heading, track, note);
    ui.cityForecastCompare.append(item);
  });
  ui.cityForecastCompareNote.textContent = "Only horizons +1 and +3 are included. No +5 result is displayed.";
}

function renderCityProfile(city, observations, forecasts, contextRows = []) {
  ui.cityProfileContent.replaceChildren();
  const country = countryById(city.countryId);
  const coordinates = readCityCoordinates([...city.observed, ...city.forecasts]);
  const tiles = [
    { label: "Country linkage", value: country?.name ?? "Verified", meta: "Published parent-country field" },
    { label: "Observed coverage", value: observations.length ? `${observations[0].year}–${observations.at(-1).year}` : "Not available", meta: `${observations.length} valid city-year records` },
    { label: "Model horizons", value: forecasts.filter(Boolean).map((row) => `+${safeNumber(row.horizon)}y`).join(" · ") || "None published", meta: "Available City production outputs only" },
    { label: "Coordinates", value: coordinates ? `${coordinates.latitude.toFixed(3)}, ${coordinates.longitude.toFixed(3)}` : "Not published", meta: coordinates ? "Latitude / longitude · degrees" : "No verified location fields" },
  ];
  tiles.forEach((tile) => {
    const article = document.createElement("article");
    const label = document.createElement("span");
    label.textContent = tile.label;
    const value = document.createElement("strong");
    value.textContent = tile.value;
    const meta = document.createElement("small");
    meta.textContent = tile.meta;
    article.append(label, value, meta);
    ui.cityProfileContent.append(article);
  });
  const latestByIndicator = new Map();
  contextRows.forEach((row) => {
    const prior = latestByIndicator.get(row.indicator_id);
    if (!prior || safeNumber(row.year) > safeNumber(prior.year)) latestByIndicator.set(row.indicator_id, row);
  });
  [...latestByIndicator.values()]
    .sort((a, b) => a.family.localeCompare(b.family) || a.indicator_label.localeCompare(b.indicator_label))
    .forEach((row) => {
      const article = document.createElement("article");
      const label = document.createElement("span");
      label.textContent = row.indicator_label;
      const value = document.createElement("strong");
      value.textContent = formatContextValue(row.value, row.unit);
      const meta = document.createElement("small");
      meta.textContent = `${row.year} · ${row.source_name} · ${row.geography_level}${row.caveat ? ` · ${row.caveat}` : ""}`;
      article.append(label, value, meta);
      ui.cityProfileContent.append(article);
    });
  ui.cityProfileSubtitle.textContent = `${city.name}${country ? ` · ${country.name}` : ""} · source fields currently published by the City views`;
}

function renderCityInsights(city, observations, forecasts) {
  ui.cityInsights.replaceChildren();
  const latest = observations.at(-1);
  const allCities = cityRecordsAcrossCountries().cities;
  const observedSets = allCities.map((item) => cityObservationSeries(item).map((row) => row.year)).filter((years) => years.length);
  const commonYears = observedSets.length ? observedSets[0].filter((year) => observedSets.every((years) => years.includes(year))) : [];
  const comparisonYear = commonYears.sort((a, b) => b - a)[0];
  const commonRows = comparisonYear === undefined ? [] : allCities.map((item) => ({ city: item, row: cityObservationSeries(item).find((point) => point.year === comparisonYear) })).filter((item) => item.row).sort((a, b) => b.row.value - a.row.value);
  const selectedRank = commonRows.findIndex((item) => item.city.key === city.key) + 1;
  const first = forecasts.find(Boolean);
  const outlookDescription = first
    ? `${first.horizon}-year target ${safeNumber(first.target_year)} is ${safeNumber(first.target_year) < new Date().getFullYear() ? "a historical model-snapshot projection" : safeNumber(first.target_year) === new Date().getFullYear() ? "a current-year model projection" : "a future target relative to today"}; the published value is ${cityPercent(first.prediction)}.`
    : "No valid +1 or +3 City forecast is published for this city; the page does not extend the observed line.";
  const items = [
    { title: "Urban concentration", value: latest ? cityPercent(latest.value) : "Not available", detail: latest ? `Foreign-resident share in ${latest.year}.${selectedRank ? ` Within the strict common-year city ranking, this city is ${selectedRank} of ${commonRows.length} for ${comparisonYear}.` : " No common-year rank is available across the verified city set."}` : "A city share requires at least one valid observed city-year record." },
    { title: "City outlook", value: first ? `Target ${safeNumber(first.target_year)}` : "Not in model scope", detail: outlookDescription },
    { title: "Planning use", value: "Context, not allocation", detail: "Observed shares can support comparisons of urban composition over time. They do not by themselves estimate future service demand or identify housing, school or healthcare needs." },
  ];
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "city-insight-item";
    const number = document.createElement("span");
    number.className = "city-insight-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title;
    const value = document.createElement("strong");
    value.textContent = item.value;
    const detail = document.createElement("p");
    detail.textContent = item.detail;
    content.append(title, value, detail);
    article.append(number, content);
    ui.cityInsights.append(article);
  });
}

function renderCityExplorer(country) {
  ui.cityExplorerContent.replaceChildren();
  const { cities, hasParentField, totalRows } = cityRecordsForCurrentCountry();
  if (!totalRows) {
    ui.cityExplorerCoverage.textContent = "No city data in published views";
    const empty = document.createElement("div");
    empty.className = "city-empty-state";
    empty.textContent = "City-level records are not available in the currently published Supabase views. No city values have been generated or inferred.";
    ui.cityExplorerContent.append(empty);
    return;
  }
  if (!hasParentField) {
    ui.cityExplorerCoverage.textContent = "Country linkage unavailable";
    const empty = document.createElement("div");
    empty.className = "city-empty-state";
    empty.textContent = "City rows are present, but the published view does not expose a verified country field. To avoid assigning a city to the wrong country, the explorer cannot list cities yet.";
    ui.cityExplorerContent.append(empty);
    return;
  }
  if (!cities.length) {
    ui.cityExplorerCoverage.textContent = "No city coverage for this country";
    const empty = document.createElement("div");
    empty.className = "city-empty-state";
    empty.textContent = `No city observations or forecasts are linked to ${country.name} in the latest production views.`;
    ui.cityExplorerContent.append(empty);
    return;
  }
  ui.cityExplorerCoverage.textContent = `${cities.length} production ${cities.length === 1 ? "city" : "cities"}`;
  const requestedCity = new URLSearchParams(window.location.search).get("city");
  if (!cities.some((city) => city.id === state.selectedCity)) {
    state.selectedCity = cities.find((city) => city.id === requestedCity)?.id ?? cities[0].id;
  }
  const layout = document.createElement("div");
  layout.className = "city-explorer-layout";
  const list = document.createElement("div");
  list.className = "city-selector-list";
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", `${country.name} cities`);
  cities.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `city-selector-chip${city.id === state.selectedCity ? " is-selected" : ""}`;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(city.id === state.selectedCity));
    button.textContent = city.name;
    button.addEventListener("click", () => {
      state.selectedCity = city.id;
      updateCityQuery(city.id);
      renderCityExplorer(country);
    });
    list.append(button);
  });
  const detail = document.createElement("article");
  detail.className = "city-snapshot";
  const selected = cities.find((city) => city.id === state.selectedCity);
  renderCitySnapshot(detail, selected);
  layout.append(list, detail);
  ui.cityExplorerContent.append(layout);
}

function renderCitySnapshot(container, city) {
  if (!city) return;
  const observations = city.observed
    .filter((row) => safeNumber(row.year) !== null && safeNumber(row.value) !== null)
    .sort((a, b) => safeNumber(a.year) - safeNumber(b.year));
  const latest = observations.at(-1);
  const forecasts = city.forecasts
    .filter((row) => forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null)
    .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon));
  const title = document.createElement("h3");
  title.textContent = city.name;
  const description = document.createElement("p");
  description.className = "city-snapshot__measure";
  description.textContent = "Foreign resident population share · % of total residents";
  const stat = document.createElement("div");
  stat.className = "city-snapshot__latest";
  const statLabel = document.createElement("span");
  statLabel.textContent = "Latest observed";
  const statValue = document.createElement("strong");
  statValue.textContent = latest ? `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(safeNumber(latest.value))}%` : "Not available";
  const statYear = document.createElement("small");
  statYear.textContent = latest ? String(safeNumber(latest.year)) : "Latest observed year not available";
  stat.append(statLabel, statValue, statYear);
  const forecastList = document.createElement("div");
  forecastList.className = "city-snapshot__forecasts";
  forecasts.forEach((row) => {
    const forecast = document.createElement("div");
    forecast.className = "city-snapshot__forecast";
    const label = document.createElement("span");
    label.textContent = `${safeNumber(row.horizon)}-year · ${safeNumber(row.target_year)}`;
    const value = document.createElement("strong");
    value.textContent = `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(safeNumber(row.prediction))}%`;
    forecast.append(label, value);
    forecastList.append(forecast);
  });
  if (!forecasts.length) {
    const empty = document.createElement("p");
    empty.className = "analysis-note";
    empty.textContent = "No valid City forecast is available in the latest production view.";
    forecastList.append(empty);
  }
  container.append(title, description, stat, forecastList);
  const coordinates = readCityCoordinates([...observations, ...city.forecasts]);
  if (coordinates) {
    const location = document.createElement("p");
    location.className = "city-snapshot__location";
    location.textContent = `Verified coordinates · ${coordinates.latitude.toFixed(3)}, ${coordinates.longitude.toFixed(3)}`;
    container.append(location);
  }
  const planned = document.createElement("p");
  planned.className = "city-page-next-note";
  planned.append(document.createTextNode("For the full city-level historical trend, ranking, forecast horizons and scope notes, open "));
  const cityPageLink = document.createElement("a");
  cityPageLink.href = "#city-intelligence";
  cityPageLink.textContent = "City Intelligence";
  planned.append(cityPageLink, document.createTextNode(". This view uses only city records currently published in Supabase."));
  container.append(planned);
}

function readCityCoordinates(rows) {
  const row = rows.find((item) => safeNumber(item.latitude) !== null && safeNumber(item.longitude) !== null);
  return row ? { latitude: safeNumber(row.latitude), longitude: safeNumber(row.longitude) } : null;
}

function renderCountryInsights(country, observations, forecasts) {
  ui.countryInsightsList.replaceChildren();
  const items = [];
  if (observations.length >= 2) {
    const latest = observations.at(-1);
    const prior = observations.at(-2);
    if (safeNumber(latest.year) === safeNumber(prior.year) + 1) {
      const change = safeNumber(latest.value) - safeNumber(prior.value);
      const percent = safeNumber(prior.value) === 0 ? null : change / Math.abs(safeNumber(prior.value)) * 100;
      items.push({ title: "Recent trajectory", value: formatSigned(change, { suffix: " persons" }), detail: percent === null ? `Observed change from ${safeNumber(prior.year)} to ${safeNumber(latest.year)}.` : `${formatSignedPercent(percent)} from ${safeNumber(prior.year)} to ${safeNumber(latest.year)}.` });
    } else {
      items.push({ title: "Recent trajectory", value: "Insufficient data", detail: "The two latest observations are not consecutive years, so no year-over-year change is calculated." });
    }
  } else {
    items.push({ title: "Past trajectory", value: "Not available", detail: `Fewer than two valid observed years are available for ${country.name}.` });
  }
  const available = forecasts.filter((row) => forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null);
  items.push(available.length
    ? { title: "Future outlook", value: `${available.length} horizon${available.length === 1 ? "" : "s"} available`, detail: `Forecast target years: ${available.map((row) => safeNumber(row.target_year)).sort((a, b) => a - b).join(", ")}.` }
    : { title: "Future outlook", value: "Not available", detail: "No valid forecast records are currently available for this country." });
  items.push({ title: "Interpretation", value: "Flow, not population share", detail: "Country results measure annual immigration flows. They do not represent the foreign-born share of residents." });
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "insight-item";
    const number = document.createElement("span");
    number.className = "insight-number";
    number.textContent = String(index + 1);
    const content = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const value = document.createElement("strong");
    value.textContent = item.value;
    const detail = document.createElement("p");
    detail.textContent = item.detail;
    content.append(heading, value, detail);
    article.append(number, content);
    ui.countryInsightsList.append(article);
  });
}

function exportCountryChart() {
  const svg = ui.countryHistoryChart.querySelector("svg");
  if (!svg) {
    setMessage(ui.dashboardMessage, "There is no chart to export for the current selection.", "error");
    return;
  }
  const copy = svg.cloneNode(true);
  const style = createSvg("style");
  style.textContent = "text{font-family:Arial,sans-serif}.chart-gridline{stroke:#54708b;stroke-opacity:.35}.chart-axis-label,.chart-axis-title{fill:#b5c6d5;font-size:12px}.chart-line--observed{fill:none;stroke:#ffd2b6;stroke-width:3}.chart-line--forecast{fill:none;stroke:#f28a42;stroke-width:2.5;stroke-dasharray:7 6}.chart-forecast-divider{stroke:#ef8e45;stroke-width:1.5;stroke-dasharray:5 5}.chart-point--observed{fill:#ffd2b6;stroke:#ffe6d7;stroke-width:1.5}.chart-point--forecast{fill:#0b1d30;stroke:#ff974b;stroke-width:2.5}.country-uncertainty-band--80{fill:#f28a42;fill-opacity:.24}.country-uncertainty-band--95{fill:#f28a42;fill-opacity:.12}";
  copy.insertBefore(style, copy.firstChild);
  copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const blob = new Blob([new XMLSerializer().serializeToString(copy)], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const country = currentCountry();
  anchor.href = url;
  anchor.download = `migrai-country-${(country?.name ?? "chart").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setMessage(ui.dashboardMessage, "Country chart exported as SVG.");
}

const MAP_DATA_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_countries.geojson";

async function loadEuropeMap() {
  if (state.mapFeatures.length || !window.d3) {
    if (!window.d3) showMapUnavailable("Map rendering is unavailable in this browser.");
    return;
  }
  try {
    const response = await fetch(MAP_DATA_URL);
    if (!response.ok) throw new Error("Map boundaries could not be loaded.");
    const data = await response.json();
    state.mapFeatures = (data.features ?? []).filter((feature) => {
      const [longitude, latitude] = d3.geoCentroid(feature);
      const inEuropeanBounds = longitude >= -32 && longitude <= 45 && latitude >= 32 && latitude <= 74;
      return inEuropeanBounds && (feature.properties?.CONTINENT === "Europe" || entityForFeature(feature) !== null);
    });
    renderMap();
  } catch {
    showMapUnavailable("Map boundaries could not be loaded. Country values remain available in the ranking.");
  }
}

function showMapUnavailable(message) {
  ui.mapRoot.replaceChildren();
  const empty = document.createElement("div");
  empty.className = "map-empty";
  empty.textContent = message;
  ui.mapRoot.append(empty);
  ui.mapLegend.textContent = "Not available";
  ui.mapCoverage.textContent = "Map unavailable";
}

function featureCountryKeys(feature) {
  const properties = feature.properties ?? {};
  return [properties.ADMIN, properties.NAME, properties.NAME_EN, properties.ISO_A3, properties.ISO_A3_EH, properties.ADM0_A3, properties.ISO_A2, properties.ISO_A2_EH]
    .filter(Boolean)
    .map(normalizeName);
}

function entityForFeature(feature) {
  const keys = featureCountryKeys(feature);
  return listCountries().find((country) => keys.includes(normalizeName(country.name)) || keys.includes(normalizeName(country.id))) ?? null;
}

function mapMetricLabel() {
  if (ui.mapMeasure.value === "change") return "change vs. reference (persons)";
  if (ui.mapMeasure.value === "percent") return "% change vs. reference";
  return "immigrants per year";
}

function blendHex(start, end, ratio) {
  const amount = Math.min(Math.max(ratio, 0), 1);
  const from = start.match(/[a-f\d]{2}/gi).map((part) => Number.parseInt(part, 16));
  const to = end.match(/[a-f\d]{2}/gi).map((part) => Number.parseInt(part, 16));
  const channels = from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
  return `rgb(${channels.join(", ")})`;
}

function colourForValue(value, domain) {
  if (value === null || value === undefined) return "#11243a";
  const [min, max] = domain;
  if (ui.mapMeasure.value !== "value") {
    const extent = Math.max(Math.abs(min), Math.abs(max), 1);
    const magnitude = Math.min(Math.abs(value) / extent, 1);
    if (value < 0) return blendHex("#14283d", "#47718d", magnitude);
    if (value > 0) return blendHex("#3d2b24", "#ff9a4d", magnitude);
    return "#20354a";
  }
  const ratio = max === min ? 0.5 : Math.min(Math.max((value - min) / (max - min), 0), 1);
  const stops = ["#754322", "#c65f23", "#ff9448", "#ffd0a8"];
  const scaled = ratio * (stops.length - 1);
  const lower = Math.floor(scaled);
  return blendHex(stops[lower], stops[Math.min(lower + 1, stops.length - 1)], scaled - lower);
}

function renderMap() {
  ui.mapTooltip.hidden = true;
  if (!window.d3) {
    showMapUnavailable("Map rendering is unavailable in this browser.");
    return;
  }
  if (!state.mapFeatures.length) return;
  if (state.selectedYear === null) {
    ui.mapRoot.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "map-empty";
    empty.textContent = "No Country observations or forecasts are available in the latest views.";
    ui.mapRoot.append(empty);
    ui.mapLegend.textContent = "Not available";
    ui.mapCoverage.textContent = "Not available";
    return;
  }
  const width = 690;
  const height = 370;
  const values = listCountries()
    .map((country) => metricForPoint(pointForCountryYear(country, state.selectedYear), country.id, state.selectedYear))
    .filter((value) => value !== null);
  const domain = values.length ? [Math.min(...values), Math.max(...values)] : [0, 1];
  const selectedData = listCountries().map((country) => ({
    country,
    point: pointForCountryYear(country, state.selectedYear),
  }));
  const availableCount = selectedData.filter(({ country, point }) => metricForPoint(point, country.id, state.selectedYear) !== null).length;
  ui.mapCoverage.textContent = `${availableCount} of ${selectedData.length} countries with values`;
  ui.mapLegend.replaceChildren();
  const legendStart = document.createElement("span");
  legendStart.textContent = values.length ? numberFormatter.format(domain[0]) : "Not available";
  const legendBar = document.createElement("i");
  legendBar.className = `map-legend__bar${ui.mapMeasure.value !== "value" ? " is-diverging" : ""}`;
  const legendEnd = document.createElement("span");
  legendEnd.textContent = values.length ? numberFormatter.format(domain[1]) : "Not available";
  const noData = document.createElement("span");
  noData.className = "map-legend__nodata";
  noData.innerHTML = '<i aria-hidden="true"></i>No data';
  ui.mapLegend.append(legendStart, legendBar, legendEnd, noData);
  ui.mapLegend.setAttribute("aria-label", `Legend in ${mapMetricLabel()}`);

  ui.mapRoot.replaceChildren();
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "group", "aria-label": `European immigration map for ${state.selectedYear}` });
  svg.classList.add("map-svg");
  const projection = d3.geoMercator().fitExtent([[12, 14], [width - 12, height - 14]], { type: "FeatureCollection", features: state.mapFeatures });
  const path = d3.geoPath(projection);
  const layer = createSvg("g", { class: "map-layer" });
  layer.setAttribute("transform", mapZoomTransform(width, height));

  state.mapFeatures.forEach((feature) => {
    const country = entityForFeature(feature);
    const point = country ? pointForCountryYear(country, state.selectedYear) : null;
    const value = country ? metricForPoint(point, country.id, state.selectedYear) : null;
    const name = feature.properties?.ADMIN || feature.properties?.NAME || "European country";
    const countryPath = createSvg("path", {
      d: path(feature) ?? "",
      fill: colourForValue(value, domain),
      stroke: country?.id === state.selectedCountry ? "#ffd2b6" : country ? "#e4a073" : "#425366",
      "stroke-width": country?.id === state.selectedCountry ? "1.8" : "0.7",
      "vector-effect": "non-scaling-stroke",
      "aria-label": country ? `${name}: ${value === null ? "no data" : numberFormatter.format(value)} ${mapMetricLabel()}` : `${name}: not in current data scope`,
    });
    countryPath.classList.add("map-country");
    if (country) {
      countryPath.classList.add("is-data-country");
      countryPath.setAttribute("role", "button");
      countryPath.setAttribute("tabindex", "0");
      countryPath.dataset.countryId = country.id;
      countryPath.addEventListener("click", () => selectCountry(country.id));
      countryPath.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectCountry(country.id);
        }
      });
      countryPath.addEventListener("pointerenter", (event) => showMapTooltip(event, name, point, value));
      countryPath.addEventListener("pointermove", (event) => positionMapTooltip(event));
      countryPath.addEventListener("pointerleave", () => { ui.mapTooltip.hidden = true; });
    }
    const title = createSvg("title");
    title.textContent = `${name} · ${value === null ? "No data" : numberFormatter.format(value)} ${mapMetricLabel()}`;
    countryPath.append(title);
    layer.append(countryPath);
  });
  svg.append(layer);
  ui.mapRoot.append(svg);
}

function mapZoomTransform(width, height) {
  const offsetX = width * (1 - state.mapZoom) / 2;
  const offsetY = height * (1 - state.mapZoom) / 2;
  return `translate(${offsetX} ${offsetY}) scale(${state.mapZoom})`;
}

function setMapZoom(value) {
  state.mapZoom = Math.min(Math.max(value, 1), 2.6);
  renderMap();
}

function selectCountry(countryId) {
  if (state.selectedCountry !== countryId) {
    state.selectedCity = null;
    updateCityQuery(null);
  }
  state.selectedCountry = countryId;
  ui.mapCountrySelect.value = countryId;
  ui.intelligenceCountrySelect.value = countryId;
  ui.migrationCountrySelect.value = countryId;
  const country = countryById(countryId);
  ui.countrySearch.value = country?.name ?? "";
  updateCountryQuery();
  renderOutlook();
  renderCountryIntelligence();
  if (state.activePage === "migration-context") renderMigrationHistoryChart();
}

function showMapTooltip(event, name, point, value) {
  ui.mapTooltip.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = name;
  const detail = document.createElement("span");
  detail.textContent = value === null ? "No data for this year" : `${numberFormatter.format(value)} ${mapMetricLabel()}`;
  const stateLabel = document.createElement("small");
  stateLabel.textContent = point?.type === "forecast" ? "Forecast" : point?.type === "observed" ? "Observed" : "Not available";
  ui.mapTooltip.append(title, detail, stateLabel);
  ui.mapTooltip.hidden = false;
  positionMapTooltip(event);
}

function positionMapTooltip(event) {
  const bounds = ui.mapRoot.parentElement.getBoundingClientRect();
  ui.mapTooltip.style.left = `${Math.min(Math.max(event.clientX - bounds.left + 12, 8), bounds.width - 205)}px`;
  ui.mapTooltip.style.top = `${Math.max(event.clientY - bounds.top - 18, 8)}px`;
}

function forecastRowsForHorizon(horizon) {
  return state.forecasts.filter((row) => safeNumber(row.horizon) === horizon)
    .filter((row) => state.selectedCountry === "all" || String(row.entity_id) === state.selectedCountry);
}

function comparableForecastChange(rows) {
  const byYear = new Map();
  rows.forEach((row) => {
    if (!row.forecast_available || safeNumber(row.prediction) === null) return;
    const latest = latestObservationForEntity(row.entity_id);
    const storedBaseline = safeNumber(row.last_observed_value);
    const observedBaseline = safeNumber(latest?.value);
    if (!latest || storedBaseline === null || observedBaseline === null || Math.abs(storedBaseline - observedBaseline) > 0.000001) return;
    const year = safeNumber(latest.year);
    if (year === null) return;
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push({ prediction: safeNumber(row.prediction), baseline: observedBaseline });
  });
  const groups = [...byYear.entries()].sort((a, b) => b[1].length - a[1].length || b[0] - a[0]);
  if (!groups.length) return null;
  const [year, group] = groups[0];
  const forecast = group.reduce((sum, item) => sum + item.prediction, 0);
  const baseline = group.reduce((sum, item) => sum + item.baseline, 0);
  return { year, count: group.length, change: forecast - baseline, percent: baseline === 0 ? null : (forecast - baseline) / Math.abs(baseline) };
}

function renderHorizonCards() {
  ui.horizonCards.replaceChildren();
  [1, 3, 5].forEach((horizon) => {
    const rows = forecastRowsForHorizon(horizon);
    const available = rows.filter((row) => row.forecast_available && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null);
    const targetYears = unique(available.map((row) => safeNumber(row.target_year)));
    const card = document.createElement("article");
    card.className = "horizon-card";
    const icon = document.createElement("span");
    icon.className = "horizon-card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = horizon === 1 ? "▣" : horizon === 3 ? "▦" : "▥";
    const title = document.createElement("h3");
    title.textContent = `${horizon}-year outlook`;
    const target = document.createElement("span");
    target.className = "horizon-card__target";
    const value = document.createElement("strong");
    const note = document.createElement("small");

    if (!available.length) {
      target.textContent = "Target year not available";
      value.textContent = "Not available";
      note.textContent = rows.length ? "No valid forecast for this selection" : "No forecast in the latest run";
    } else if (targetYears.length !== 1) {
      target.textContent = "Country target years vary";
      value.textContent = "Not aggregated";
      note.textContent = `${available.length} countries with forecasts`;
    } else {
      const prediction = available.reduce((sum, row) => sum + safeNumber(row.prediction), 0);
      const change = comparableForecastChange(available);
      target.textContent = String(targetYears[0]);
      value.textContent = state.selectedCountry === "all" ? formatNumber(prediction) : formatNumber(safeNumber(available[0].prediction));
      const scopeLabel = state.selectedCountry === "all" ? `${available.length} countries` : selectedCountryName();
      const changeText = change
        ? `${change.percent === null ? formatSigned(change.change) : percentFormatter.format(change.percent)} vs ${change.year} · ${change.count} comparable`
        : "Change vs. a common observed baseline not available";
      note.textContent = `${scopeLabel} · ${changeText}`;
    }
    card.append(icon, title, target, value, note);
    ui.horizonCards.append(card);
  });
}

function seriesForScope() {
  const entityId = state.selectedCountry === "all" ? null : state.selectedCountry;
  const observedGroups = new Map();
  state.observed.forEach((row) => {
    if (entityId !== null && String(row.entity_id) !== entityId) return;
    const year = safeNumber(row.year);
    const value = safeNumber(row.value);
    if (year === null || value === null) return;
    if (!observedGroups.has(year)) observedGroups.set(year, []);
    observedGroups.get(year).push(value);
  });
  const observed = [...observedGroups.entries()].map(([year, values]) => ({ year, value: values.reduce((sum, value) => sum + value, 0), count: values.length, type: "observed" })).sort((a, b) => a.year - b.year);

  const forecasts = entityId === null
    ? state.forecasts
    : state.forecasts.filter((row) => String(row.entity_id) === entityId);
  const forecastGroups = new Map();
  forecasts.filter((row) => row.forecast_available).forEach((row) => {
    const year = safeNumber(row.target_year);
    const value = safeNumber(row.prediction);
    if (year === null || value === null) return;
    if (!forecastGroups.has(year)) forecastGroups.set(year, new Map());
    const byEntity = forecastGroups.get(year);
    const id = String(row.entity_id);
    if (!byEntity.has(id) || safeNumber(row.horizon) < safeNumber(byEntity.get(id).horizon)) byEntity.set(id, row);
  });
  const forecastSeries = [...forecastGroups.entries()].map(([year, byEntity]) => ({
    year,
    value: [...byEntity.values()].reduce((sum, row) => sum + safeNumber(row.prediction), 0),
    count: byEntity.size,
    type: "forecast",
  })).sort((a, b) => a.year - b.year);
  return { observed, forecasts: forecastSeries };
}

function renderTrendChart() {
  ui.trendChart.replaceChildren();
  const { observed, forecasts } = seriesForScope();
  const points = [...observed, ...forecasts];
  ui.trendDescription.textContent = state.selectedCountry === "all"
    ? "Annual immigration totals include only countries with values at each year"
    : `Annual immigration to ${selectedCountryName()} · persons per year`;
  if (!points.length) {
    const empty = document.createElement("div");
    empty.className = "quiet-empty chart-empty";
    empty.textContent = "No observed or forecast values are available for this scope.";
    ui.trendChart.append(empty);
    return;
  }

  const width = 790;
  const height = 290;
  const margin = { top: 18, right: 22, bottom: 42, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const years = points.map((point) => point.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const x = (year) => margin.left + ((year - minYear) / Math.max(maxYear - minYear, 1)) * plotWidth;
  const y = (value) => margin.top + plotHeight - (value / maxValue) * plotHeight;
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": `Immigration trend for ${selectedCountryName()}` });

  for (let i = 0; i <= 4; i += 1) {
    const value = maxValue * (1 - i / 4);
    const gridY = margin.top + (plotHeight / 4) * i;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: gridY, y2: gridY, class: "chart-gridline" }));
    const tick = createSvg("text", { x: margin.left - 10, y: gridY + 4, "text-anchor": "end", class: "chart-axis-label" });
    tick.textContent = formatAxisNumber(value);
    svg.append(tick);
  }

  const lastObservedYear = observed.length ? Math.max(...observed.map((point) => point.year)) : null;
  const firstForecastYear = forecasts.length ? Math.min(...forecasts.map((point) => point.year)) : null;
  if (firstForecastYear !== null) {
    const separatorX = x(firstForecastYear);
    svg.append(createSvg("line", { x1: separatorX, x2: separatorX, y1: margin.top, y2: margin.top + plotHeight, class: "chart-forecast-divider" }));
  }

  const observedSegments = splitObservedSegments(observed);
  observedSegments.forEach((segment) => {
    if (segment.length < 2) return;
    const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "chart-line chart-line--observed" }));
  });
  const forecastPathPoints = [...(lastObservedYear === null ? [] : observed.filter((point) => point.year === lastObservedYear)), ...forecasts];
  if (forecastPathPoints.length > 1) {
    const path = forecastPathPoints.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "chart-line chart-line--forecast" }));
  }

  [...observed, ...forecasts].forEach((point) => {
    const circle = createSvg("circle", {
      cx: x(point.year), cy: y(point.value), r: point.type === "forecast" ? 5.5 : 4,
      class: point.type === "forecast" ? "chart-point chart-point--forecast" : "chart-point chart-point--observed",
    });
    const title = createSvg("title");
    title.textContent = `${point.year} · ${point.type === "forecast" ? "Forecast" : "Observed"} · ${formatNumber(point.value)} persons · ${point.count} ${point.count === 1 ? "country" : "countries"}`;
    circle.append(title);
    svg.append(circle);
  });

  const labelYears = unique(years).sort((a, b) => a - b);
  const step = Math.max(1, Math.ceil(labelYears.length / 8));
  labelYears.filter((year, index) => index % step === 0 || year === maxYear).forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 13, "text-anchor": "middle", class: "chart-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  const axisTitle = createSvg("text", { x: 18, y: height / 2, transform: `rotate(-90 18 ${height / 2})`, "text-anchor": "middle", class: "chart-axis-title" });
  axisTitle.textContent = "Persons per year";
  svg.append(axisTitle);
  ui.trendChart.append(svg);
}

function splitObservedSegments(points) {
  const segments = [];
  let segment = [];
  points.forEach((point) => {
    if (segment.length && point.year !== segment[segment.length - 1].year + 1) {
      segments.push(segment);
      segment = [];
    }
    segment.push(point);
  });
  if (segment.length) segments.push(segment);
  return segments;
}

function formatAxisNumber(value) {
  if (value >= 1_000_000) return `${numberFormatter.format(value / 1_000_000)}m`;
  if (value >= 10_000) return `${numberFormatter.format(value / 1_000)}k`;
  return numberFormatter.format(value);
}

function dataRowsForYear(year) {
  const countries = listCountries();
  return countries.map((country) => {
    const point = pointForCountryYear(country, year);
    const value = metricForPoint(point, country.id, year);
    return value === null ? null : { ...country, point, value };
  }).filter(Boolean);
}

function renderRanking() {
  ui.rankingList.replaceChildren();
  if (state.selectedYear === null) {
    ui.rankingEmpty.hidden = false;
    ui.rankingSubtitle.textContent = "Country values are not available";
    return;
  }
  const direction = ui.rankingOrder.value === "asc" ? 1 : -1;
  const rows = dataRowsForYear(state.selectedYear).sort((a, b) => (a.value - b.value) * direction);
  const shown = ui.rankingLimit.value === "all" ? rows : rows.slice(0, Number(ui.rankingLimit.value));
  ui.rankingEmpty.hidden = rows.length > 0;
  ui.rankingSubtitle.textContent = `${rows.length} countries · ${mapMetricLabel()}`;
  const max = Math.max(...rows.map((row) => Math.abs(row.value)), 1);
  shown.forEach((row, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = `ranking-row${row.id === state.selectedCountry ? " is-selected" : ""}`;
    button.title = `Select ${row.name}`;
    const rank = document.createElement("span");
    rank.className = "ranking-row__rank";
    rank.textContent = String(index + 1).padStart(2, "0");
    const code = document.createElement("span");
    code.className = "ranking-row__code";
    code.textContent = row.id.length <= 3 ? row.id.toUpperCase() : row.name.slice(0, 2).toUpperCase();
    const name = document.createElement("span");
    name.className = "ranking-row__name";
    name.textContent = row.name;
    const bar = document.createElement("span");
    bar.className = `ranking-row__bar${row.value < 0 ? " is-negative" : ""}`;
    const fill = document.createElement("i");
    fill.style.width = `${Math.max(Math.abs(row.value) / max * 100, 1)}%`;
    bar.append(fill);
    const value = document.createElement("strong");
    value.textContent = ui.mapMeasure.value === "percent" ? percentFormatter.format(row.value) : formatNumber(row.value);
    button.append(rank, code, name, bar, value);
    button.addEventListener("click", () => selectCountry(row.id));
    item.append(button);
    ui.rankingList.append(item);
  });
}

function renderInsights() {
  ui.insightsList.replaceChildren();
  const items = [];
  const observedYears = unique(state.observed.map((row) => safeNumber(row.year)).filter((year) => year !== null)).sort((a, b) => a - b);
  const latestObservedYear = observedYears.length ? observedYears[observedYears.length - 1] : undefined;
  if (latestObservedYear !== undefined) {
    const current = state.observed.filter((row) => safeNumber(row.year) === latestObservedYear && safeNumber(row.value) !== null);
    const previous = state.observed.filter((row) => safeNumber(row.year) === latestObservedYear - 1 && safeNumber(row.value) !== null);
    const previousById = new Map(previous.map((row) => [String(row.entity_id), safeNumber(row.value)]));
    const comparable = current.filter((row) => previousById.has(String(row.entity_id)));
    if (comparable.length) {
      const delta = comparable.reduce((sum, row) => sum + safeNumber(row.value) - previousById.get(String(row.entity_id)), 0);
      items.push({ title: "Past trajectory", value: `${formatSigned(delta)} persons`, detail: `Observed change from ${latestObservedYear - 1} to ${latestObservedYear} · ${comparable.length} comparable countries` });
    } else {
      items.push({ title: "Past trajectory", value: `${current.length} countries observed`, detail: `Latest observed year available: ${latestObservedYear}. No comparable prior year is available.` });
    }
  } else {
    items.push({ title: "Past trajectory", value: "Not available", detail: "No historical Country observations are available." });
  }

  const forecasts = state.forecasts.filter((row) => row.forecast_available && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null);
  if (forecasts.length) {
    const firstTargetYear = Math.min(...forecasts.map((row) => safeNumber(row.target_year)));
    const earliest = availableForecastsForYear(firstTargetYear);
    const top = [...earliest].sort((a, b) => safeNumber(b.prediction) - safeNumber(a.prediction))[0];
    const topCountry = top ? countryById(top.entity_id)?.name || top.entity_name || top.entity_id : "Not available";
    items.push({ title: "Future outlook", value: `${earliest.length} forecasts available`, detail: `Earliest target year ${firstTargetYear}. Highest available value: ${topCountry}.` });
  } else {
    items.push({ title: "Future outlook", value: "Not available", detail: "No valid Country forecasts are available in the latest view." });
  }

  const selectedRows = state.selectedYear === null ? [] : dataRowsForYear(state.selectedYear);
  const topSelected = [...selectedRows].sort((a, b) => b.value - a.value)[0];
  items.push(topSelected
    ? { title: "Cross-country view", value: topSelected.name, detail: `Highest available value in ${state.selectedYear}: ${ui.mapMeasure.value === "percent" ? percentFormatter.format(topSelected.value) : formatNumber(topSelected.value)} ${mapMetricLabel()}.` }
    : { title: "Cross-country view", value: "Not available", detail: `No country values are available for ${state.selectedYear ?? "the selected year"}.` });

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "insight-item";
    const number = document.createElement("span");
    number.className = "insight-number";
    number.textContent = String(index + 1);
    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title;
    const value = document.createElement("strong");
    value.textContent = item.value;
    const detail = document.createElement("p");
    detail.textContent = item.detail;
    content.append(title, value, detail);
    article.append(number, content);
    ui.insightsList.append(article);
  });
}

function createSvg(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function formatNumber(value) {
  const number = safeNumber(value);
  return number === null ? "—" : numberFormatter.format(number);
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
