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
  socialImpactPage: document.querySelector("#socialImpactPage"),
  navEuropean: document.querySelector("#navEuropeanOutlook"),
  navCountry: document.querySelector("#navCountryIntelligence"),
  navBenchmark: document.querySelector("#navCountryBenchmark"),
  navContext: document.querySelector("#navMigrationContext"),
  navReliability: document.querySelector("#navForecastReliability"),
  navCity: document.querySelector("#navCityIntelligence"),
  navMethodology: document.querySelector("#navMethodology"),
  navSocialImpact: document.querySelector("#navSocialImpact"),
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
  mapPanUp: document.querySelector("#mapPanUp"),
  mapPanRight: document.querySelector("#mapPanRight"),
  mapPanDown: document.querySelector("#mapPanDown"),
  mapPanLeft: document.querySelector("#mapPanLeft"),
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
  countryReliabilityMae: document.querySelector("#countryReliabilityMae"),
  countryReliabilityWape: document.querySelector("#countryReliabilityWape"),
  countryReliabilityN: document.querySelector("#countryReliabilityN"),
  countryReliabilityNaive: document.querySelector("#countryReliabilityNaive"),
  countryReliabilityNaiveNote: document.querySelector("#countryReliabilityNaiveNote"),
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
  benchmarkPerThousandButton: document.querySelector("#benchmarkPerThousandButton"),
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
  contextCountryToggle: document.querySelector("#contextCountryToggle"),
  contextCountrySummary: document.querySelector("#contextCountrySummary"),
  contextCountryMenu: document.querySelector("#contextCountryMenu"),
  contextIndicatorToggle: document.querySelector("#contextIndicatorToggle"),
  contextIndicatorSummary: document.querySelector("#contextIndicatorSummary"),
  contextIndicatorMenu: document.querySelector("#contextIndicatorMenu"),
  contextSelectionNote: document.querySelector("#contextSelectionNote"),
  migrationPeriod: document.querySelector("#migrationPeriod"),
  migrationContextSubtitle: document.querySelector("#migrationContextSubtitle"),
  migrationHistoryChart: document.querySelector("#migrationHistoryChart"),
  migrationHistoryNote: document.querySelector("#migrationHistoryNote"),
  contextChartLegend: document.querySelector("#contextChartLegend"),
  contextMetadataCountryTabs: document.querySelector("#contextMetadataCountryTabs"),
  contextMetadataIndicatorTabs: document.querySelector("#contextMetadataIndicatorTabs"),
  contextScatterSubtitle: document.querySelector("#contextScatterSubtitle"),
  contextScatterControls: document.querySelector("#contextScatterControls"),
  contextScatterZoomXOut: document.querySelector("#contextScatterZoomXOut"),
  contextScatterZoomXIn: document.querySelector("#contextScatterZoomXIn"),
  contextScatterZoomYOut: document.querySelector("#contextScatterZoomYOut"),
  contextScatterZoomYIn: document.querySelector("#contextScatterZoomYIn"),
  contextScatterZoomReset: document.querySelector("#contextScatterZoomReset"),
  contextScatterStatus: document.querySelector("#contextScatterStatus"),
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
  reliabilityShapSummary: document.querySelector("#reliabilityShapSummary"),
  reliabilityShapStatus: document.querySelector("#reliabilityShapStatus"),
  reliabilityShapChart: document.querySelector("#reliabilityShapChart"),
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
  cityReliabilityNaive: document.querySelector("#cityReliabilityNaive"),
  cityReliabilityNaiveNote: document.querySelector("#cityReliabilityNaiveNote"),
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
  methodologyContextSummary: document.querySelector("#methodologyContextSummary"),
  methodologyContextSourceRows: document.querySelector("#methodologyContextSourceRows"),
  methodologyContextNote: document.querySelector("#methodologyContextNote"),
  reliabilityEvaluationSummary: document.querySelector("#reliabilityEvaluationSummary"),
  methodologyRunMetadata: document.querySelector("#methodologyRunMetadata"),
  methodologyRunNote: document.querySelector("#methodologyRunNote"),
  methodologyEntityFilter: document.querySelector("#methodologyEntityFilter"),
  methodologyStatusLevel: document.querySelector("#methodologyStatusLevel"),
  methodologyHorizonFilter: document.querySelector("#methodologyHorizonFilter"),
  methodologyStatusFilter: document.querySelector("#methodologyStatusFilter"),
  methodologyRunFilter: document.querySelector("#methodologyRunFilter"),
  methodologyStatusRows: document.querySelector("#methodologyStatusRows"),
  methodologyStatusNote: document.querySelector("#methodologyStatusNote"),
  socialImpactCountry: document.querySelector("#socialImpactCountry"),
  socialImpactTabs: document.querySelector("#socialImpactTabs"),
  socialImpactSectionIntro: document.querySelector("#socialImpactSectionIntro"),
  socialImpactIndicator: document.querySelector("#socialImpactIndicator"),
  socialImpactRegionField: document.querySelector("#socialImpactRegionField"),
  socialImpactRegion: document.querySelector("#socialImpactRegion"),
  socialImpactBreakdownField: document.querySelector("#socialImpactBreakdownField"),
  socialImpactBreakdown: document.querySelector("#socialImpactBreakdown"),
  socialImpactDimensionFilters: document.querySelector("#socialImpactDimensionFilters"),
  socialImpactIndicatorTitle: document.querySelector("#socialImpactIndicatorTitle"),
  socialImpactIndicatorDefinition: document.querySelector("#socialImpactIndicatorDefinition"),
  socialImpactLatestYear: document.querySelector("#socialImpactLatestYear"),
  socialImpactLatestValueLabel: document.querySelector("#socialImpactLatestValueLabel"),
  socialImpactLatestValue: document.querySelector("#socialImpactLatestValue"),
  socialImpactCoverage: document.querySelector("#socialImpactCoverage"),
  socialImpactObservationCount: document.querySelector("#socialImpactObservationCount"),
  socialImpactLoading: document.querySelector("#socialImpactLoading"),
  socialImpactEmpty: document.querySelector("#socialImpactEmpty"),
  socialImpactChart: document.querySelector("#socialImpactChart"),
  socialImpactLatestTableNote: document.querySelector("#socialImpactLatestTableNote"),
  socialImpactLatestRows: document.querySelector("#socialImpactLatestRows"),
  socialImpactCaveat: document.querySelector("#socialImpactCaveat"),
  socialImpactProvenance: document.querySelector("#socialImpactProvenance"),
  socialImpactComparisonBanner: document.querySelector("#socialImpactComparisonBanner"),
  socialImpactComparisonText: document.querySelector("#socialImpactComparisonText"),
};

const state = {
  runs: [],
  forecasts: [],
  observed: [],
  cityForecasts: [],
  cityObserved: [],
  backtestPredictions: [],
  backtestEvaluations: [],
  backtestEvaluationsAvailable: true,
  backtestMetrics: [],
  backtestEntityMetrics: [],
  backtestViewsAvailable: true,
  shapAttributions: [],
  shapAttributionsAvailable: true,
  contextRows: [],
  contextInventoryRows: [],
  contextInventoryStatus: "idle",
  contextCache: new Map(),
  contextCacheEpoch: 0,
  contextLoadFailures: new Set(),
  contextViewsAvailable: true,
  contextRequestId: 0,
  selectedContextCountries: [],
  selectedContextIndicators: [],
  activeContextCountry: null,
  activeContextIndicator: null,
  contextScatterZoomX: 1,
  contextScatterZoomY: 1,
  initialized: false,
  years: [],
  selectedYear: null,
  selectedCountry: "all",
  mapFeatures: [],
  mapZoom: 1,
  mapZoomStep: 0,
  mapPanX: 0,
  mapPanY: 0,
  mapDrag: null,
  mapSuppressClick: false,
  playbackTimer: null,
  activePage: "european-outlook",
  countryChartZoom: 1,
  selectedCity: null,
  cityCountryFilter: null,
  selectedBenchmarkCountries: [],
  benchmarkMeasure: "absolute",
  reliabilityScope: "country",
  methodologySource: "all",
  socialImpactSection: "arrivals",
  socialImpactIndicator: null,
  socialImpactRegion: "all",
  socialImpactBreakdown: null,
  socialImpactDimensionValues: {},
  socialImpactCache: new Map(),
  socialImpactDatasetRows: [],
  socialImpactControlKey: null,
  socialImpactRequestId: 0,
};

const EUROSTAT_SOCIAL_SECTIONS = {
  arrivals: {
    title: "Who arrives",
    intro: "Explore annual arrivals with six grouped age bands, citizenship, previous residence, first permits, resident household composition and income context.",
    datasets: ["migr_imm8", "migr_imm2ctz", "migr_imm1ctz", "migr_imm5prv", "migr_resfirst", "lfst_hhmgscomp", "ilc_di15"],
  },
  housing: {
    title: "Housing",
    intro: "Compare migration and housing indicators, including overcrowding, housing-cost pressure and tenure by citizenship group.",
    datasets: ["ilc_lvho15", "ilc_lvho25", "ilc_lvps15"],
  },
  health: {
    title: "Health",
    intro: "Explore hospital bed capacity by NUTS 2 region and survey estimates of unmet medical needs by citizenship and reason.",
    datasets: ["hlth_rs_bdsrg2", "hlth_silc_30"],
  },
  education: {
    title: "Education",
    intro: "Compare enrolments by education level and NUTS 2 region, and pupil-to-teacher ratios by education level.",
    datasets: ["educ_uoe_enra11", "educ_uoe_perp04"],
  },
};

const EUROSTAT_SOCIAL_COUNTRY_CODES = {
  austria: "AT", belgium: "BE", bulgaria: "BG", cyprus: "CY", czechia: "CZ",
  germany: "DE", denmark: "DK", estonia: "EE", greece: "GR", spain: "ES",
  finland: "FI", france: "FR", croatia: "HR", hungary: "HU", ireland: "IE",
  iceland: "IS", italy: "IT", lithuania: "LT", luxembourg: "LU", latvia: "LV",
  malta: "MT", netherlands: "NL", norway: "NO", poland: "PL", portugal: "PT",
  romania: "RO", sweden: "SE", slovenia: "SI", slovakia: "SK",
  switzerland: "CH", turkey: "TR", unitedkingdom: "UK", serbia: "RS",
  ukraine: "UA", albania: "AL", bosniaandherzegovina: "BA", montenegro: "ME",
  northmacedonia: "MK",
};

const EUROSTAT_SOCIAL_CODE_ALIASES = {
  aut: "AT", bel: "BE", bgr: "BG", cyp: "CY", cze: "CZ", deu: "DE",
  dnk: "DK", est: "EE", grc: "GR", esp: "ES", fin: "FI", fra: "FR",
  hrv: "HR", hun: "HU", irl: "IE", isl: "IS", ita: "IT", ltu: "LT",
  lux: "LU", lva: "LV", mlt: "MT", nld: "NL", nor: "NO", pol: "PL",
  prt: "PT", rou: "RO", swe: "SE", svn: "SI", svk: "SK", che: "CH",
  tur: "TR", gbr: "UK", srb: "RS", ukr: "UA", alb: "AL", bih: "BA",
  mne: "ME", mkd: "MK",
};

const EUROSTAT_SOCIAL_DEFAULT_BREAKDOWNS = {
  migr_imm8: "age",
  migr_imm2ctz: "citizen",
  migr_imm1ctz: "citizen",
  migr_imm5prv: "partner",
  migr_resfirst: "reason",
  lfst_hhmgscomp: "phhcomp",
  ilc_di15: "citizen",
  ilc_lvho15: "citizen",
  ilc_lvho25: "citizen",
  ilc_lvps15: "tenure",
  hlth_silc_30: "citizen",
  educ_uoe_perp04: "isced11",
};

const EUROSTAT_SOCIAL_AGE_BANDS = [
  { code: "AGE_0_14", label: "0–14", from: 0, to: 15 },
  { code: "AGE_15_29", label: "15–29", from: 15, to: 30 },
  { code: "AGE_30_44", label: "30–44", from: 30, to: 45 },
  { code: "AGE_45_64", label: "45–64", from: 45, to: 65 },
  { code: "AGE_65_79", label: "65–79", from: 65, to: 80 },
  { code: "AGE_80_PLUS", label: "80+", from: 80, to: Number.POSITIVE_INFINITY },
];

const EUROSTAT_SOCIAL_FILTER_DEFAULTS = {
  "migr_imm8.sex": "T",
  "migr_imm8.agedef": "COMPLET",
  "migr_imm2ctz.sex": "T",
  "migr_imm2ctz.agedef": "COMPLET",
  "migr_imm2ctz.age": "TOTAL",
  "migr_imm1ctz.sex": "T",
  "migr_imm1ctz.agedef": "COMPLET",
  "migr_imm1ctz.age": "TOTAL",
  "migr_imm5prv.sex": "T",
  "migr_imm5prv.agedef": "COMPLET",
  "migr_imm5prv.age": "TOTAL",
  "migr_resfirst.citizen": "TOTAL",
  "lfst_hhmgscomp.hhwkstat": "TOTAL",
  "lfst_hhmgscomp.mgstatus": "FBO_A",
  "ilc_di15.sex": "T",
  "ilc_di15.age": "Y_GE18",
  "ilc_di15.statinfo": "MEAN_EI",
  "ilc_lvho15.sex": "T",
  "ilc_lvho15.age": "Y_GE18",
  "ilc_lvho25.sex": "T",
  "ilc_lvho25.age": "Y_GE18",
  "ilc_lvps15.sex": "T",
  "ilc_lvps15.age": "Y_GE18",
  "hlth_rs_bdsrg2.unit": "HAB_P",
  "hlth_silc_30.sex": "T",
  "hlth_silc_30.age": "Y_GE16",
  "hlth_silc_30.unit": "PC",
  "hlth_silc_30.reason": "TOTAL",
  "educ_uoe_enra11.sex": "T",
  "educ_uoe_perp04.unit": "RT",
};

const EUROSTAT_SOCIAL_CAVEATS = {
  immigration_by_age_sex: "Age and sex describe reported immigration flows; these counts do not identify family membership or household size.",
  immigration_by_citizenship_group: "Citizenship groups describe recorded citizenship, not country of birth.",
  immigration_by_citizenship: "Citizenship is not the same as country of birth or previous residence.",
  immigration_by_previous_residence: "Previous residence is a location measure; it does not establish nationality or birthplace.",
  first_residence_permits_by_reason_duration: "Residence permits are administrative authorisations, not a count of all arrivals or household members.",
  households_by_migration_background: "Household composition describes resident private households, not the family composition of new arrivals.",
  income_by_citizenship_group: "Income describes residents aged 18+ by current citizenship; it does not measure the economic capacity of newly arriving people.",
  housing_overcrowding_by_citizenship: "This is a resident-population measure by citizenship, not an estimate specific to recent arrivals.",
  housing_cost_overburden_by_citizenship: "This is a resident-population measure by citizenship, not an estimate specific to recent arrivals.",
  housing_tenure_by_citizenship: "This is a resident-population measure by citizenship, not an estimate specific to recent arrivals.",
  hospital_beds_nuts2: "Regional reporting and availability vary. The selected unit distinguishes bed counts from beds per 100,000 inhabitants.",
  unmet_medical_needs_by_citizenship: "Survey estimates describe resident populations, not counts of patients or recent arrivals.",
  students_enrolled_nuts2: "Enrolments are not identified as migrant pupils and are not normalised by population size.",
  pupil_teacher_ratio: "Published at national level; methodological differences can affect comparisons between countries.",
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
    setMessage(ui.authMessage, "Sign-in failed. Check your email and password.", "error");
  }
  setBusy(button, false);
});

ui.resetButton.addEventListener("click", async () => {
  const email = ui.emailInput.value.trim();
  if (!email) {
    setMessage(ui.authMessage, "Enter your email address first.", "error");
    ui.emailInput.focus();
    return;
  }

  setBusy(ui.resetButton, true);
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: PASSWORD_RECOVERY_URL });
  setBusy(ui.resetButton, false);

  if (error) {
    setMessage(ui.authMessage, "The link could not be sent. Please try again in a few minutes.", "error");
    return;
  }
  setMessage(ui.authMessage, "Check your email: we have sent you a link to set your password.");
});

ui.passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = ui.newPasswordInput.value;
  const repeated = ui.repeatPasswordInput.value;
  const button = ui.passwordForm.querySelector('button[type="submit"]');

  if (password !== repeated) {
    setMessage(ui.passwordMessage, "The passwords do not match.", "error");
    return;
  }

  setBusy(button, true);
  const { error } = await supabaseClient.auth.updateUser({ password });
  setBusy(button, false);

  if (error) {
    setMessage(ui.passwordMessage, "The password could not be saved. Request a new link.", "error");
    return;
  }

  passwordSetupFlow = false;
  setMessage(ui.passwordMessage, "Password updated. Opening the dashboard…");
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
  state.backtestEvaluations = [];
  state.backtestEvaluationsAvailable = true;
  state.backtestMetrics = [];
  state.backtestEntityMetrics = [];
  state.backtestViewsAvailable = true;
  state.shapAttributions = [];
  state.shapAttributionsAvailable = true;
  state.contextRows = [];
  state.selectedContextCountries = [];
  state.selectedContextIndicators = [];
  state.activeContextCountry = null;
  state.activeContextIndicator = null;
  state.contextInventoryRows = [];
  state.contextInventoryStatus = "idle";
  state.contextCache.clear();
  state.contextLoadFailures.clear();
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
ui.navSocialImpact.addEventListener("click", (event) => {
  event.preventDefault();
  navigateToDashboardPage("social-impact");
});
ui.socialImpactTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-social-section]");
  if (!tab) return;
  state.socialImpactSection = tab.dataset.socialSection;
  state.socialImpactIndicator = null;
  state.socialImpactRegion = "all";
  state.socialImpactBreakdown = null;
  state.socialImpactDimensionValues = {};
  ui.socialImpactTabs.querySelectorAll("[data-social-section]").forEach((button) => {
    button.setAttribute("aria-selected", String(button === tab));
  });
  renderEurostatSocialImpact();
});
ui.socialImpactCountry.addEventListener("change", () => {
  if (!ui.socialImpactCountry.value) return;
  selectCountry(ui.socialImpactCountry.value);
});
ui.socialImpactIndicator.addEventListener("change", () => {
  state.socialImpactIndicator = ui.socialImpactIndicator.value || null;
  state.socialImpactRegion = "all";
  state.socialImpactBreakdown = null;
  state.socialImpactDimensionValues = {};
  renderEurostatSocialObservations();
});
ui.socialImpactRegion.addEventListener("change", () => {
  state.socialImpactRegion = ui.socialImpactRegion.value || "all";
  renderEurostatSocialObservations();
});
ui.socialImpactBreakdown.addEventListener("change", () => {
  state.socialImpactBreakdown = ui.socialImpactBreakdown.value || "none";
  renderEurostatSocialObservations();
});
ui.socialImpactDimensionFilters.addEventListener("change", (event) => {
  const control = event.target.closest("[data-social-dimension]");
  if (!control) return;
  state.socialImpactDimensionValues[control.dataset.socialDimension] = control.value;
  renderEurostatSocialObservations();
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
ui.benchmarkPerThousandButton.addEventListener("click", () => {
  state.benchmarkMeasure = "perThousand";
  renderCountryBenchmark();
});
ui.benchmarkRankingYear.addEventListener("change", renderCountryBenchmark);
ui.benchmarkHeatmapMeasure.addEventListener("change", renderCountryBenchmark);
ui.benchmarkHorizon.addEventListener("change", renderCountryBenchmark);
ui.contextCountryToggle.addEventListener("click", () => toggleContextSelector(ui.contextCountryMenu, ui.contextCountryToggle));
ui.contextIndicatorToggle.addEventListener("click", () => toggleContextSelector(ui.contextIndicatorMenu, ui.contextIndicatorToggle));
ui.contextCountryMenu.addEventListener("change", handleContextCountrySelection);
ui.contextIndicatorMenu.addEventListener("change", handleContextIndicatorSelection);
document.addEventListener("click", (event) => {
  if (event.target.closest(".context-selector")) return;
  closeContextSelector(ui.contextCountryMenu, ui.contextCountryToggle);
  closeContextSelector(ui.contextIndicatorMenu, ui.contextIndicatorToggle);
});
ui.contextScatterZoomXOut.addEventListener("click", () => adjustContextScatterZoom("x", 1 / 1.35));
ui.contextScatterZoomXIn.addEventListener("click", () => adjustContextScatterZoom("x", 1.35));
ui.contextScatterZoomYOut.addEventListener("click", () => adjustContextScatterZoom("y", 1 / 1.35));
ui.contextScatterZoomYIn.addEventListener("click", () => adjustContextScatterZoom("y", 1.35));
ui.contextScatterZoomReset.addEventListener("click", () => {
  resetContextScatterZoom();
  renderContextScatter();
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
  if (state.activePage === "migration-context") {
    renderMigrationHistoryChart();
    renderContextScatter();
  }
  if (state.activePage === "city-intelligence") renderCityTrendChart();
  if (state.activePage === "social-impact") renderEurostatSocialObservations();
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
ui.mapZoomIn.addEventListener("click", () => setMapZoomStep(state.mapZoomStep + 1));
ui.mapZoomOut.addEventListener("click", () => setMapZoomStep(state.mapZoomStep - 1));
ui.mapReset.addEventListener("click", resetMapView);
ui.mapPanUp.addEventListener("click", () => panMapBy(0, -34));
ui.mapPanRight.addEventListener("click", () => panMapBy(34, 0));
ui.mapPanDown.addEventListener("click", () => panMapBy(0, 34));
ui.mapPanLeft.addEventListener("click", () => panMapBy(-34, 0));
ui.mapTooltip.addEventListener("pointerleave", () => { ui.mapTooltip.hidden = true; });
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
    backtestEvaluationsResponse, backtestMetricsResponse, backtestEntityMetricsResponse,
    shapAttributionsResponse] = await Promise.all([
    supabaseClient.from("runs").select("run_id,started_at_madrid,run_label,trigger,status,levels,n_forecasts,is_latest,git_branch,git_commit,n_failed_steps").order("run_id", { ascending: false }).limit(25),
    supabaseClient.from("forecasts_latest").select("*").in("level", ["country", "city"]).order("entity_name").order("horizon"),
    supabaseClient.from("observed_latest").select("*").in("level", ["country", "city"]).order("year"),
    supabaseClient.from("backtest_predictions_latest").select("*").order("target_year").limit(1000),
    supabaseClient.from("backtest_evaluations_latest").select("*"),
    supabaseClient.from("backtest_metrics_latest").select("*"),
    supabaseClient.from("backtest_entity_metrics_latest").select("*"),
    supabaseClient.from("forecast_feature_attributions_latest").select("*").order("horizon").order("entity_name").limit(10000),
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
  state.backtestEvaluationsAvailable = !backtestEvaluationsResponse.error;
  state.backtestEvaluations = backtestEvaluationsResponse.data ?? [];
  state.backtestMetrics = backtestMetricsResponse.data ?? [];
  state.backtestEntityMetrics = backtestEntityMetricsResponse.data ?? [];
  state.shapAttributionsAvailable = !shapAttributionsResponse.error;
  state.shapAttributions = shapAttributionsResponse.data ?? [];
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
  renderOutlookAlerts();
  renderDataMethodology();
  applyDashboardRoute();
  renderCountryIntelligence();
  loadEuropeMap();
  loadInsightPopulation().then(() => { if (insightPopulation.loaded) { renderOutlook(); applyDashboardRoute(); } });
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
  if (measure === "perThousand") return insightPerThousand(point.value, countryId, year);

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

function toggleContextSelector(menu, toggle) {
  const shouldOpen = menu.hidden;
  closeContextSelector(ui.contextCountryMenu, ui.contextCountryToggle);
  closeContextSelector(ui.contextIndicatorMenu, ui.contextIndicatorToggle);
  if (!shouldOpen) return;
  menu.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
}

function closeContextSelector(menu, toggle) {
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

function renderContextCountryMenu() {
  ui.contextCountryMenu.replaceChildren();
  const countries = listCountries();
  const selected = new Set(state.selectedContextCountries);
  countries.forEach((country) => {
    const label = document.createElement("label");
    label.className = "context-selector-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = country.id;
    checkbox.dataset.contextCountry = country.id;
    checkbox.checked = selected.has(country.id);
    checkbox.disabled = !checkbox.checked && selected.size >= 3;
    const name = document.createElement("span");
    name.textContent = country.name;
    label.append(checkbox, name);
    ui.contextCountryMenu.append(label);
  });
}

function renderContextIndicatorMenu() {
  ui.contextIndicatorMenu.replaceChildren();
  const indicators = contextIndicatorRows(state.contextRows);
  if (!indicators.length) {
    const empty = document.createElement("p");
    empty.className = "context-selector-empty";
    empty.textContent = state.contextViewsAvailable
      ? "No source-reported indicators are available for these countries."
      : "The protected contextual-data view is not accessible.";
    ui.contextIndicatorMenu.append(empty);
    return;
  }
  const selected = new Set(state.selectedContextIndicators);
  indicators.forEach((indicator) => {
    const label = document.createElement("label");
    label.className = "context-selector-option context-selector-option--indicator";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = indicator.indicator_id;
    checkbox.dataset.contextIndicator = indicator.indicator_id;
    checkbox.checked = selected.has(indicator.indicator_id);
    const name = document.createElement("span");
    name.className = "context-selector-option-copy";
    const title = document.createElement("strong");
    title.textContent = indicator.indicator_label;
    const family = document.createElement("small");
    family.textContent = `${indicator.family} · ${indicator.unit}`;
    name.append(title, family);
    label.append(checkbox, name);
    ui.contextIndicatorMenu.append(label);
  });
}

function renderContextSelectionControls() {
  renderContextSelectionSummaries();
  renderContextCountryMenu();
  renderContextIndicatorMenu();
}

function renderContextSelectionSummaries() {
  const countries = state.selectedContextCountries.map(countryById).filter(Boolean);
  const indicators = contextIndicatorRows(state.contextRows);
  const selectedIndicators = state.selectedContextIndicators
    .map((id) => indicators.find((indicator) => indicator.indicator_id === id))
    .filter(Boolean);
  ui.contextCountrySummary.textContent = countries.map((country) => country.name).join(", ") || "Select countries";
  ui.contextCountryToggle.setAttribute("aria-label", `Countries selected: ${countries.map((country) => country.name).join(", ") || "none"}`);
  ui.contextIndicatorSummary.textContent = selectedIndicators.length === 1
    ? selectedIndicators[0].indicator_label
    : `${selectedIndicators.length} indicators selected`;
  ui.contextIndicatorToggle.setAttribute("aria-label", `Indicators selected: ${selectedIndicators.map((indicator) => indicator.indicator_label).join(", ") || "none"}`);
  ui.contextIndicatorToggle.disabled = indicators.length === 0;
  const selected = new Set(state.selectedContextCountries);
  ui.contextCountryMenu.querySelectorAll("input[data-context-country]").forEach((checkbox) => {
    checkbox.checked = selected.has(checkbox.dataset.contextCountry);
    checkbox.disabled = !checkbox.checked && selected.size >= 3;
  });
}

function setContextSelectionNote(message = "", kind = "") {
  ui.contextSelectionNote.textContent = message;
  ui.contextSelectionNote.classList.toggle("is-error", kind === "error");
}

function populateMigrationCountryControl() {
  const countries = listCountries();
  if (!state.selectedContextCountries.length) {
    const preferred = countries.find((item) => item.id === state.selectedCountry)
      ?? countries.find((item) => normalizeName(item.name) === "spain")
      ?? countries[0];
    if (preferred) state.selectedContextCountries = [preferred.id];
  }
  state.selectedContextCountries = unique(state.selectedContextCountries)
    .filter((id) => countries.some((country) => country.id === id)).slice(0, 3);
  if (!state.activeContextCountry || !state.selectedContextCountries.includes(state.activeContextCountry)) {
    state.activeContextCountry = state.selectedContextCountries[0] ?? null;
  }
  renderContextSelectionControls();
}

function handleContextCountrySelection(event) {
  const checkbox = event.target.closest("input[data-context-country]");
  if (!checkbox) return;
  const next = new Set(state.selectedContextCountries);
  if (checkbox.checked) {
    if (next.size >= 3) {
      checkbox.checked = false;
      setContextSelectionNote("You can select a maximum of three countries.", "error");
      return;
    }
    next.add(checkbox.dataset.contextCountry);
  } else {
    if (next.size <= 1) {
      checkbox.checked = true;
      setContextSelectionNote("Keep at least one country selected.", "error");
      return;
    }
    next.delete(checkbox.dataset.contextCountry);
  }
  state.selectedContextCountries = [...next];
  if (!next.has(state.activeContextCountry)) state.activeContextCountry = state.selectedContextCountries[0];
  setContextSelectionNote("Loading verified contextual indicators for the selected countries…");
  resetContextScatterZoom();
  renderContextSelectionSummaries();
  renderMigrationContext();
}

function handleContextIndicatorSelection(event) {
  const checkbox = event.target.closest("input[data-context-indicator]");
  if (!checkbox) return;
  const next = new Set(state.selectedContextIndicators);
  if (checkbox.checked) {
    next.add(checkbox.dataset.contextIndicator);
  } else {
    if (next.size <= 1) {
      checkbox.checked = true;
      setContextSelectionNote("Keep at least one indicator selected.", "error");
      return;
    }
    next.delete(checkbox.dataset.contextIndicator);
  }
  state.selectedContextIndicators = [...next];
  if (!next.has(state.activeContextIndicator)) state.activeContextIndicator = state.selectedContextIndicators[0] ?? null;
  setContextSelectionNote();
  resetContextScatterZoom();
  renderContextSelectionSummaries();
  renderContextMetadataTabs();
  renderMigrationHistoryChart();
  renderContextScatter();
  renderOtherContextIndicators();
}

function navigateToDashboardPage(page) {
  const hash = page === "country-intelligence" ? "#country-intelligence"
    : page === "country-benchmark" ? "#country-benchmark"
      : page === "migration-context" ? "#migration-context"
        : page === "social-impact" ? "#social-impact"
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
  const isSocialImpactPage = window.location.hash === "#social-impact";
  const isBenchmarkPage = window.location.hash === "#country-benchmark";
  const isCountryPage = window.location.hash === "#country-intelligence";
  state.activePage = isMethodologyPage ? "data-methodology" : isCityPage ? "city-intelligence" : isReliabilityPage ? "forecast-reliability" : isSocialImpactPage ? "social-impact" : isContextPage ? "migration-context" : isBenchmarkPage ? "country-benchmark" : isCountryPage ? "country-intelligence" : "european-outlook";
  if ((isCountryPage || isContextPage || isCityPage || isSocialImpactPage) && state.selectedCountry === "all") {
    const countries = listCountries();
    const preferred = countries.find((item) => normalizeName(item.name) === "spain") ?? countries[0];
    if (preferred) state.selectedCountry = preferred.id;
  }
  ui.europeanPage.hidden = isCountryPage || isBenchmarkPage || isContextPage || isReliabilityPage || isCityPage || isMethodologyPage || isSocialImpactPage;
  ui.countryPage.hidden = !isCountryPage;
  ui.benchmarkPage.hidden = !isBenchmarkPage;
  ui.contextPage.hidden = !isContextPage;
  ui.reliabilityPage.hidden = !isReliabilityPage;
  ui.cityPage.hidden = !isCityPage;
  ui.methodologyPage.hidden = !isMethodologyPage;
  ui.socialImpactPage.hidden = !isSocialImpactPage;
  ui.navEuropean.classList.toggle("is-active", !isCountryPage && !isBenchmarkPage && !isContextPage && !isReliabilityPage && !isCityPage && !isMethodologyPage && !isSocialImpactPage);
  ui.navCountry.classList.toggle("is-active", isCountryPage);
  ui.navBenchmark.classList.toggle("is-active", isBenchmarkPage);
  ui.navContext.classList.toggle("is-active", isContextPage);
  ui.navReliability.classList.toggle("is-active", isReliabilityPage);
  ui.navCity.classList.toggle("is-active", isCityPage);
  ui.navMethodology.classList.toggle("is-active", isMethodologyPage);
  ui.navMethodology.removeAttribute("aria-current");
  ui.navSocialImpact.classList.toggle("is-active", isSocialImpactPage);
  ui.navSocialImpact.removeAttribute("aria-current");
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
  } else if (isSocialImpactPage) {
    ui.navSocialImpact.setAttribute("aria-current", "page");
    ui.navEuropean.removeAttribute("aria-current");
    ui.navCountry.removeAttribute("aria-current");
    ui.navBenchmark.removeAttribute("aria-current");
    ui.navContext.removeAttribute("aria-current");
    ui.navReliability.removeAttribute("aria-current");
    ui.navCity.removeAttribute("aria-current");
    ui.navMethodology.removeAttribute("aria-current");
    ui.dashboardTitle.textContent = "Social Impact";
    ui.dashboardEyebrow.textContent = "EUROSTAT · TERRITORIAL CONTEXT";
    ui.dashboardSubtitle.textContent = "Explore observed population, housing, health and education indicators";
    document.title = "Social Impact · migrAI";
    populateSocialImpactCountryControl();
    renderEurostatSocialImpact();
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

function eurostatSocialCountryIso2(country = currentCountry()) {
  if (!country) return null;
  const byName = EUROSTAT_SOCIAL_COUNTRY_CODES[normalizeName(country.name)];
  if (byName) return byName;
  const normalizedId = normalizeName(country.id);
  if (EUROSTAT_SOCIAL_CODE_ALIASES[normalizedId]) return EUROSTAT_SOCIAL_CODE_ALIASES[normalizedId];
  return /^[a-z]{2}$/i.test(String(country.id)) ? String(country.id).toUpperCase() : null;
}

function populateSocialImpactCountryControl() {
  const countries = listCountries()
    .filter((country) => eurostatSocialCountryIso2(country))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  replaceOptions(ui.socialImpactCountry, countries.map((country) => ({ value: country.id, label: country.name })));
  if (!countries.length) {
    ui.socialImpactCountry.disabled = true;
    return null;
  }
  ui.socialImpactCountry.disabled = false;
  let country = countries.find((item) => item.id === state.selectedCountry);
  if (!country) {
    country = countries.find((item) => normalizeName(item.name) === "spain") ?? countries[0];
    state.selectedCountry = country.id;
  }
  ui.socialImpactCountry.value = country.id;
  return country;
}

async function loadEurostatSocialRows(countryIso2, sectionId) {
  const cacheKey = countryIso2 + "|" + sectionId;
  if (state.socialImpactCache.has(cacheKey)) return state.socialImpactCache.get(cacheKey);
  const pageSize = 1000;
  const rows = [];
  const columns = "dataset_code,section_id,indicator_id,indicator_label,definition,geo_code,geo_name,geo_level,country_iso2,year,dimensions,series_key,value,unit_code,unit_label,source_name,source_url,quality_flag,source_updated_at,retrieved_at_utc";
  for (let offset = 0; ; offset += pageSize) {
    const response = await supabaseClient.from("eurostat_dashboard_latest")
      .select(columns)
      .eq("section_id", sectionId)
      .eq("country_iso2", countryIso2)
      .order("dataset_code")
      .order("geo_code")
      .order("year")
      .order("series_key")
      .range(offset, offset + pageSize - 1);
    if (response.error) throw response.error;
    const page = response.data ?? [];
    rows.push(...page);
    if (page.length < pageSize) break;
  }
  state.socialImpactCache.set(cacheKey, rows);
  return rows;
}

async function renderEurostatSocialImpact() {
  if (!state.initialized || state.activePage !== "social-impact") return;
  const country = populateSocialImpactCountryControl();
  const sectionKey = state.socialImpactSection;
  const section = EUROSTAT_SOCIAL_SECTIONS[sectionKey] ?? EUROSTAT_SOCIAL_SECTIONS.arrivals;
  ui.socialImpactSectionIntro.textContent = section.intro;
  ui.socialImpactTabs.querySelectorAll("[data-social-section]").forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.socialSection === state.socialImpactSection));
  });
  if (!country) {
    showEurostatSocialMessage("No country is available", "The production country list could not be matched to the Eurostat coverage.");
    return;
  }

  const requestId = ++state.socialImpactRequestId;
  const iso2 = eurostatSocialCountryIso2(country);
  const cacheKey = iso2 + "|" + state.socialImpactSection;
  ui.socialImpactLoading.hidden = false;
  ui.socialImpactEmpty.hidden = true;
  ui.socialImpactChart.replaceChildren();
  ui.socialImpactLatestRows.replaceChildren();
  ui.socialImpactLatestYear.textContent = "—";
  ui.socialImpactLatestValue.textContent = "—";
  ui.socialImpactCoverage.textContent = "—";
  ui.socialImpactObservationCount.textContent = "—";
  ui.socialImpactCaveat.textContent = "";
  ui.socialImpactProvenance.textContent = "";
  ui.socialImpactComparisonBanner.hidden = true;
  ui.socialImpactIndicator.disabled = true;
  ui.socialImpactIndicator.replaceChildren(new Option("Loading Eurostat data…", ""));

  try {
    const rows = await loadEurostatSocialRows(iso2, sectionKey);
    if (requestId !== state.socialImpactRequestId
        || state.activePage !== "social-impact"
        || state.selectedCountry !== country.id
        || state.socialImpactSection !== sectionKey) return;
    state.socialImpactDatasetRows = rows;
    ui.socialImpactLoading.hidden = true;
    const datasetOrder = section.datasets;
    const datasets = new Map();
    rows.forEach((row) => {
      if (!datasets.has(row.dataset_code)) datasets.set(row.dataset_code, row);
    });
    const available = datasetOrder.map((code) => datasets.get(code)).filter(Boolean);
    replaceOptions(ui.socialImpactIndicator, available.map((row) => ({ value: row.dataset_code, label: row.indicator_label })));
    ui.socialImpactIndicator.disabled = available.length === 0;
    const selected = available.find((row) => row.dataset_code === state.socialImpactIndicator) ?? available[0];
    state.socialImpactIndicator = selected?.dataset_code ?? null;
    ui.socialImpactIndicator.value = state.socialImpactIndicator ?? "";
    state.socialImpactRegion = "all";
    state.socialImpactBreakdown = null;
    state.socialImpactDimensionValues = {};
    state.socialImpactControlKey = null;
    renderEurostatSocialObservations();
  } catch (error) {
    if (requestId !== state.socialImpactRequestId) return;
    ui.socialImpactLoading.hidden = true;
    ui.socialImpactIndicator.disabled = true;
    showEurostatSocialMessage(
      "Eurostat data could not be loaded",
      "The authenticated Eurostat view may be unavailable or its read access may not be configured. Check the connection and reload this page.",
    );
    console.warn("Eurostat social view query failed", error?.message ?? "unknown error");
  }
}

function showEurostatSocialMessage(title, detail) {
  ui.socialImpactLoading.hidden = true;
  ui.socialImpactEmpty.hidden = false;
  ui.socialImpactEmpty.querySelector("strong").textContent = title;
  ui.socialImpactEmpty.querySelector("p").textContent = detail;
  ui.socialImpactChart.replaceChildren();
  ui.socialImpactLatestRows.replaceChildren();
  ui.socialImpactLatestYear.textContent = "—";
  ui.socialImpactLatestValue.textContent = "—";
  ui.socialImpactCoverage.textContent = "—";
  ui.socialImpactObservationCount.textContent = "—";
  ui.socialImpactIndicatorTitle.textContent = ui.socialImpactIndicator.selectedOptions[0]?.textContent || "Eurostat observations";
  ui.socialImpactIndicatorDefinition.textContent = detail;
  ui.socialImpactLatestValueLabel.textContent = "Latest value";
  ui.socialImpactLatestTableNote.textContent = "";
  ui.socialImpactCaveat.textContent = "";
  ui.socialImpactProvenance.textContent = "";
  ui.socialImpactLatestRows.replaceChildren();
  ui.socialImpactComparisonBanner.hidden = true;
}

function eurostatSocialDimensionCatalog(rows) {
  const dimensions = new Map();
  rows.forEach((row) => {
    Object.entries(row.dimensions ?? {}).forEach(([name, raw]) => {
      const code = typeof raw === "object" && raw !== null ? String(raw.code ?? "") : String(raw ?? "");
      if (!code) return;
      const label = typeof raw === "object" && raw !== null ? String(raw.label ?? code) : code;
      if (!dimensions.has(name)) dimensions.set(name, new Map());
      dimensions.get(name).set(code, label);
    });
  });
  return [...dimensions.entries()].map(([name, values]) => ({
    name,
    label: name.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
    options: [...values.entries()]
      .map(([code, label]) => ({ code, label }))
      .sort((a, b) => a.label.localeCompare(b.label, "en") || a.code.localeCompare(b.code, "en")),
  }));
}

function eurostatSocialPreferredDimensionCode(datasetCode, dimension, options) {
  const configured = EUROSTAT_SOCIAL_FILTER_DEFAULTS[datasetCode + "." + dimension];
  if (configured && options.some((option) => option.code === configured)) return configured;
  const total = options.find((option) => option.code.toUpperCase() === "TOTAL" || /^total$/i.test(option.label));
  return total?.code ?? options[0]?.code ?? "";
}

function renderEurostatSocialControls(rows) {
  const datasetCode = rows[0]?.dataset_code;
  const isArrivalDataset = EUROSTAT_SOCIAL_SECTIONS.arrivals.datasets.includes(datasetCode);
  const catalog = eurostatSocialDimensionCatalog(rows);
  const geoLevel = rows[0]?.geo_level;
  const iso2 = rows[0]?.country_iso2;
  let breakdownOptions = catalog.filter((dimension) => dimension.name !== "unit" && dimension.options.length > 1);
  const requestedBreakdown = state.socialImpactBreakdown
    ?? (geoLevel === "nuts2" && state.socialImpactRegion === "all"
      ? "none"
      : EUROSTAT_SOCIAL_DEFAULT_BREAKDOWNS[datasetCode] ?? "none");
  const defaultBreakdown = requestedBreakdown;
  const chosenBreakdown = defaultBreakdown !== "none" && breakdownOptions.some((dimension) => dimension.name === defaultBreakdown)
    ? defaultBreakdown
    : "none";
  state.socialImpactBreakdown = chosenBreakdown;
  replaceOptions(ui.socialImpactBreakdown, [
    { value: "none", label: geoLevel === "nuts2" && state.socialImpactRegion === "all" ? "Compare regions" : "One selected series" },
    ...breakdownOptions.map((dimension) => ({
      value: dimension.name,
      label: dimension.name === "age" && isArrivalDataset ? "Age bands" : dimension.label,
    })),
  ]);
  ui.socialImpactBreakdown.value = chosenBreakdown;
  ui.socialImpactBreakdownField.hidden = breakdownOptions.length === 0;

  const key = [iso2, datasetCode, geoLevel, chosenBreakdown].join("|");
  if (state.socialImpactControlKey !== key) {
    ui.socialImpactDimensionFilters.replaceChildren();
    catalog
      .filter((dimension) => dimension.name !== chosenBreakdown && dimension.options.length > 1)
      .forEach((dimension) => {
        const label = document.createElement("label");
        const caption = document.createElement("span");
        caption.textContent = dimension.label;
        const select = document.createElement("select");
        select.className = "compact-select";
        select.dataset.socialDimension = dimension.name;
        const previous = state.socialImpactDimensionValues[dimension.name];
        const selected = dimension.options.some((option) => option.code === previous)
          ? previous
          : eurostatSocialPreferredDimensionCode(datasetCode, dimension.name, dimension.options);
        replaceOptions(select, dimension.options.map((option) => ({ value: option.code, label: option.label })));
        select.value = selected;
        state.socialImpactDimensionValues[dimension.name] = selected;
        label.append(caption, select);
        ui.socialImpactDimensionFilters.append(label);
      });
    state.socialImpactControlKey = key;
  }

  if (geoLevel === "nuts2") {
    const geographies = new Map();
    rows.forEach((row) => geographies.set(row.geo_code, row.geo_name || row.geo_code));
    const options = [...geographies.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], "en"))
      .map(([code, label]) => ({ value: code, label }));
    const currentRegion = state.socialImpactRegion;
    replaceOptions(ui.socialImpactRegion, [{ value: "all", label: "Compare all regions" }, ...options]);
    state.socialImpactRegion = currentRegion !== "all" && geographies.has(currentRegion) ? currentRegion : "all";
    ui.socialImpactRegion.value = state.socialImpactRegion;
    ui.socialImpactRegionField.hidden = false;
  } else {
    state.socialImpactRegion = "all";
    ui.socialImpactRegionField.hidden = true;
    ui.socialImpactRegion.replaceChildren();
  }
}

function eurostatSocialFilteredRows(rows) {
  const datasetCode = rows[0]?.dataset_code;
  const breakdown = state.socialImpactBreakdown ?? "none";
  const dimensions = ui.socialImpactDimensionFilters.querySelectorAll("[data-social-dimension]");
  const selected = new Map([...dimensions].map((control) => [control.dataset.socialDimension, control.value]));
  return rows.filter((row) => {
    if (safeNumber(row.value) === null) return false;
    if (row.geo_level === "nuts2" && state.socialImpactRegion !== "all" && row.geo_code !== state.socialImpactRegion) return false;
    return [...selected.entries()].every(([name, code]) => {
      const dimension = row.dimensions?.[name];
      const value = typeof dimension === "object" && dimension !== null ? dimension.code : dimension;
      return String(value ?? "") === String(code);
    });
  });
}

function eurostatSocialAgeInterval(rawCode) {
  const code = String(rawCode ?? "").trim().toUpperCase();
  if (code === "Y_LT1") return { from: 0, to: 1 };
  let match = code.match(/^Y_LT(\d+)$/);
  if (match) return { from: 0, to: Number(match[1]) };
  match = code.match(/^Y_GE(\d+)$/);
  if (match) return { from: Number(match[1]), to: Number.POSITIVE_INFINITY };
  match = code.match(/^Y(\d+)-(\d+)$/);
  if (match) return { from: Number(match[1]), to: Number(match[2]) + 1 };
  match = code.match(/^Y(\d+)$/);
  if (match) return { from: Number(match[1]), to: Number(match[1]) + 1 };
  return null;
}

function eurostatSocialAgeBandComponents(ageCodes, band) {
  const intervals = [...ageCodes].map((code) => ({ code, ...eurostatSocialAgeInterval(code) }))
    .filter((entry) => entry.from !== undefined && entry.from >= band.from && entry.from < band.to && entry.to > entry.from)
    .sort((a, b) => a.from - b.from || b.to - a.to || a.code.localeCompare(b.code, "en"));
  const selected = [];
  let cursor = band.from;
  while (cursor < band.to) {
    const candidates = intervals.filter((entry) => entry.from === cursor && entry.to <= band.to);
    if (!candidates.length) return null;
    const next = candidates[0];
    selected.push(next.code);
    cursor = next.to;
  }
  return selected;
}

function eurostatSocialAgeBandRows(rows, breakdown) {
  if (breakdown !== "age" || !EUROSTAT_SOCIAL_SECTIONS.arrivals.datasets.includes(rows[0]?.dataset_code)) return rows;
  const groups = new Map();
  rows.forEach((row) => {
    const rawAge = row.dimensions?.age;
    const ageCode = String(typeof rawAge === "object" && rawAge !== null ? rawAge.code : rawAge ?? "").toUpperCase();
    if (!ageCode || ["TOTAL", "UNK", "UNKNOWN"].includes(ageCode)) return;
    const otherDimensions = Object.entries(row.dimensions ?? {})
      .filter(([name]) => name !== "age")
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([name, value]) => [name, typeof value === "object" && value !== null ? value.code : value]);
    const key = JSON.stringify([row.dataset_code, row.geo_code, row.year, row.unit_code, otherDimensions]);
    if (!groups.has(key)) groups.set(key, { first: row, dimensions: Object.fromEntries(otherDimensions), values: new Map() });
    groups.get(key).values.set(ageCode, row);
  });

  const result = [];
  groups.forEach(({ first, dimensions, values }) => {
    EUROSTAT_SOCIAL_AGE_BANDS.forEach((band) => {
      const codes = eurostatSocialAgeBandComponents(values.keys(), band);
      if (!codes) return;
      const members = codes.map((code) => values.get(code));
      const flags = [...new Set(members.map((row) => row.quality_flag).filter(Boolean))];
      result.push({
        ...first,
        dimensions: { ...dimensions, age: { code: band.code, label: band.label } },
        series_key: [first.series_key || "", "age-band", band.code].join("|"),
        value: members.reduce((sum, row) => sum + safeNumber(row.value), 0),
        quality_flag: flags.join("; ") || null,
      });
    });
  });
  return result;
}

function eurostatSocialSeries(rows, breakdown, compareRegions) {
  const groups = new Map();
  rows.forEach((row) => {
    const dimension = breakdown !== "none" ? row.dimensions?.[breakdown] : null;
    const dimensionCode = typeof dimension === "object" && dimension !== null ? dimension.code : dimension;
    const dimensionLabel = typeof dimension === "object" && dimension !== null ? dimension.label : dimensionCode;
    const geoLabel = compareRegions ? (row.geo_name || row.geo_code) : "";
    const label = [geoLabel, breakdown !== "none" ? (dimensionLabel || dimensionCode) : ""].filter(Boolean).join(" · ") || "Selected series";
    const key = [compareRegions ? row.geo_code : "", breakdown !== "none" ? dimensionCode : ""].join("|");
    if (!groups.has(key)) groups.set(key, { key, label, rows: [] });
    groups.get(key).rows.push(row);
  });
  const series = [...groups.values()].map((group) => {
    const byYear = new Map();
    group.rows.forEach((row) => {
      const year = safeNumber(row.year);
      const value = safeNumber(row.value);
      if (year !== null && value !== null) byYear.set(year, { ...row, year, value });
    });
    return { ...group, points: [...byYear.values()].sort((a, b) => a.year - b.year) };
  }).filter((group) => group.points.length);
  const latestYear = Math.max(...series.flatMap((group) => group.points.map((point) => point.year)));
  return {
    latestYear,
    all: series,
    shown: series
      .filter((group) => group.points.some((point) => point.year === latestYear))
      .sort((a, b) => {
        const aValue = a.points.find((point) => point.year === latestYear)?.value ?? -Infinity;
        const bValue = b.points.find((point) => point.year === latestYear)?.value ?? -Infinity;
        return bValue - aValue || a.label.localeCompare(b.label, "en");
      })
      .slice(0, 8),
  };
}

function socialImpactNumber(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return "—";
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
}

function renderEurostatSocialObservations() {
  if (!state.initialized || state.activePage !== "social-impact") return;
  const datasetRows = state.socialImpactDatasetRows.filter((row) => row.dataset_code === state.socialImpactIndicator);
  if (!datasetRows.length) {
    showEurostatSocialMessage("No Eurostat observations in this section", "The selected country has no published values for the current section.");
    return;
  }
  renderEurostatSocialControls(datasetRows);
  const filtered = eurostatSocialFilteredRows(datasetRows);
  const breakdown = state.socialImpactBreakdown ?? "none";
  const displayRows = eurostatSocialAgeBandRows(filtered, breakdown);
  const series = eurostatSocialSeries(displayRows, breakdown, datasetRows[0].geo_level === "nuts2" && state.socialImpactRegion === "all");
  const migrationSeries = eurostatSocialMigrationSeries();
  if (!displayRows.length || !series.shown.length || !Number.isFinite(series.latestYear)) {
    showEurostatSocialMessage("No complete values for this selection", "Choose another breakdown or category. Age bands are shown only when the source provides the complete component groups; missing observations are not estimated.");
    return;
  }

  const meta = datasetRows[0];
  const latestRows = displayRows.filter((row) => safeNumber(row.year) === series.latestYear)
    .sort((a, b) => safeNumber(b.value) - safeNumber(a.value))
    .slice(0, 12);
  const mostRecent = latestRows[0];
  const years = displayRows.map((row) => safeNumber(row.year)).filter((year) => year !== null);
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);
  ui.socialImpactIndicatorTitle.textContent = meta.indicator_label || meta.dataset_code;
  ui.socialImpactIndicatorDefinition.textContent = meta.definition || "Eurostat historical observations.";
  ui.socialImpactLatestYear.textContent = String(series.latestYear);
  const comparisonMode = (state.socialImpactBreakdown ?? "none") !== "none"
    || (datasetRows[0].geo_level === "nuts2" && state.socialImpactRegion === "all");
  ui.socialImpactLatestValueLabel.textContent = comparisonMode ? "Highest latest value" : "Latest value";
  ui.socialImpactLatestValue.textContent = mostRecent
    ? socialImpactNumber(safeNumber(mostRecent.value)) + " " + (mostRecent.unit_label || mostRecent.unit_code)
    : "Not available";
  ui.socialImpactCoverage.textContent = firstYear === lastYear ? String(firstYear) : firstYear + "–" + lastYear;
  ui.socialImpactObservationCount.textContent = numberFormatter.format(displayRows.length);
  const breakdownLabel = breakdown !== "none"
    ? breakdown === "age" && EUROSTAT_SOCIAL_SECTIONS.arrivals.datasets.includes(meta.dataset_code)
      ? "age band"
      : (eurostatSocialDimensionCatalog(datasetRows).find((dimension) => dimension.name === breakdown)?.label || breakdown)
    : datasetRows[0].geo_level === "nuts2" && state.socialImpactRegion === "all" ? "region" : "series";
  const topLabel = mostRecent
    ? [mostRecent.geo_level === "nuts2" ? (mostRecent.geo_name || mostRecent.geo_code) : null,
      breakdown !== "none"
        ? (mostRecent.dimensions?.[breakdown]?.label || mostRecent.dimensions?.[breakdown]?.code)
        : null].filter(Boolean).join(" · ")
    : "";
  ui.socialImpactLatestTableNote.textContent = (comparisonMode && topLabel ? "Highest value: " + topLabel + " · " : "")
    + "Showing up to 12 " + breakdownLabel + " values for " + series.latestYear + ".";
  const ageBandNote = breakdown === "age" && EUROSTAT_SOCIAL_SECTIONS.arrivals.datasets.includes(meta.dataset_code)
    ? " Age bands sum disjoint Eurostat age classes. This dataset publishes single years of age; the six bands are not identical to the city-profile groups (<16, 16–64, 65+). Overlapping aggregates and unknown ages are not assigned to a band."
    : "";
  ui.socialImpactCaveat.textContent = (EUROSTAT_SOCIAL_CAVEATS[meta.indicator_id] || "Eurostat aggregate indicator; interpret with its published population, geography and unit.") + ageBandNote;
  renderEurostatSocialComparisonBanner(meta, migrationSeries);
  ui.socialImpactProvenance.replaceChildren();
  const provenance = document.createTextNode("Source: Eurostat · dataset " + meta.dataset_code
    + " · source update " + (meta.source_updated_at || "not published")
    + " · retrieved " + (meta.retrieved_at_utc || "not published") + " · ");
  const link = document.createElement("a");
  link.href = safeEurostatSourceUrl(meta.source_url);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open source table";
  ui.socialImpactProvenance.append(provenance, link);
  ui.socialImpactEmpty.hidden = true;
  ui.socialImpactLoading.hidden = true;
  ui.socialImpactChart.replaceChildren();
  ui.socialImpactLatestRows.replaceChildren();
  renderEurostatSocialLatestTable(latestRows, breakdown);
  renderEurostatSocialLineChart(series.shown, meta.unit_label || meta.unit_code, migrationSeries);
}

function renderEurostatSocialLatestTable(rows, breakdown) {
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const territory = document.createElement("td");
    const dimension = breakdown !== "none" ? row.dimensions?.[breakdown] : null;
    const dimensionLabel = typeof dimension === "object" && dimension !== null ? dimension.label : dimension;
    territory.textContent = [
      row.geo_level === "nuts2" ? (row.geo_name || row.geo_code) : (countryById(state.selectedCountry)?.name || row.geo_name),
      dimensionLabel,
    ].filter(Boolean).join(" · ");
    const year = document.createElement("td");
    year.textContent = String(row.year);
    const value = document.createElement("td");
    value.textContent = socialImpactNumber(safeNumber(row.value));
    const unit = document.createElement("td");
    unit.textContent = row.unit_label || row.unit_code;
    const quality = document.createElement("td");
    quality.textContent = row.quality_flag || "No flag supplied";
    quality.title = row.quality_flag ? "Eurostat quality status: " + row.quality_flag : "Eurostat supplied no quality status for this observation.";
    tr.append(territory, year, value, unit, quality);
    ui.socialImpactLatestRows.append(tr);
  });
}

function safeEurostatSourceUrl(value) {
  try {
    const url = new URL(String(value ?? ""));
    if (url.protocol === "https:" && url.hostname === "ec.europa.eu") return url.href;
  } catch {}
  return "https://ec.europa.eu/eurostat/";
}

const EUROSTAT_SOCIAL_CHART_COLORS = ["#ff9b54", "#58b6d6", "#a58be0", "#6fc8a1", "#e6c66a", "#e486a4", "#83a9ed", "#d39a68"];

function eurostatSocialMigrationSeries() {
  const observed = currentCountryObservations()
    .map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((point) => point.year !== null && point.value !== null);
  const forecasts = currentCountryForecasts()
    .filter((row) => forecastIsAvailable(row) && safeNumber(row.prediction) !== null && safeNumber(row.target_year) !== null)
    .map((row) => ({
      year: safeNumber(row.target_year),
      value: safeNumber(row.prediction),
      horizon: safeNumber(row.horizon),
    }))
    .sort((a, b) => a.year - b.year);
  return { observed, forecasts };
}

function renderEurostatSocialComparisonBanner(meta, migrationSeries) {
  if (!migrationSeries.observed.length && !migrationSeries.forecasts.length) {
    ui.socialImpactComparisonBanner.hidden = true;
    return;
  }
  const dimensionValues = new Map([...ui.socialImpactDimensionFilters.querySelectorAll("[data-social-dimension]")]
    .map((control) => [control.dataset.socialDimension, control.value]));
  const sameTarget = meta.dataset_code === "migr_imm8"
    && meta.geo_level === "country"
    && meta.unit_code === "NR"
    && state.socialImpactBreakdown === "none"
    && (dimensionValues.get("age") ?? state.socialImpactDimensionValues.age) === "TOTAL"
    && (dimensionValues.get("sex") ?? state.socialImpactDimensionValues.sex) === "T"
    && (dimensionValues.get("agedef") ?? state.socialImpactDimensionValues.agedef) === "COMPLET";
  const title = ui.socialImpactComparisonBanner.querySelector("strong");
  if (sameTarget) {
    title.textContent = "Same migration measure · model forecasts remain estimates";
    ui.socialImpactComparisonText.textContent = "The selected Eurostat series matches the national annual immigration target and unit. Historical observations and MigrAI forecast outputs are still shown as separate observed and estimated values.";
  } else {
    title.textContent = "Context only · no direct comparison or causal inference";
    const geography = meta.geo_level === "nuts2"
      ? "Eurostat shows " + (meta.indicator_label || "the selected indicator") + " (" + (meta.unit_label || meta.unit_code || "its published unit") + ") at NUTS 2 regional level, while MigrAI shows national total immigration in persons per year."
      : "Eurostat measures " + (meta.indicator_label || "a contextual indicator") + " in " + (meta.unit_label || meta.unit_code || "its published unit") + ", while MigrAI shows total immigration in persons per year.";
    const grouping = state.socialImpactBreakdown === "age"
      ? " The Eurostat lines are age groups; the MigrAI series is total immigration."
      : "";
    ui.socialImpactComparisonText.textContent = geography + grouping
      + " The lines share a time axis, not a common measurement scale. They may co-move or be correlated; the overlay does not establish causality.";
  }
  ui.socialImpactComparisonBanner.hidden = false;
}

function renderEurostatSocialLineChart(series, unitLabel, migrationSeries) {
  const width = Math.max(380, Math.round(ui.socialImpactChart.getBoundingClientRect().width || 900));
  const height = 340;
  const margin = { top: 18, right: 86, bottom: 44, left: 67 };
  const eurostatPoints = series.flatMap((group) => group.points);
  const migrationPoints = [...migrationSeries.observed, ...migrationSeries.forecasts];
  if (!eurostatPoints.length) return;
  const allPoints = [...eurostatPoints, ...migrationPoints];
  let minYear = Math.min(...allPoints.map((point) => point.year));
  let maxYear = Math.max(...allPoints.map((point) => point.year));
  if (minYear === maxYear) { minYear -= 1; maxYear += 1; }
  let minEurostat = Math.min(...eurostatPoints.map((point) => point.value));
  let maxEurostat = Math.max(...eurostatPoints.map((point) => point.value));
  const eurostatPadding = Math.max((maxEurostat - minEurostat) * .1, Math.max(Math.abs(maxEurostat), Math.abs(minEurostat)) * .035, .1);
  minEurostat -= eurostatPadding;
  maxEurostat += eurostatPadding;
  const hasMigration = migrationPoints.length > 0;
  let minMigration = hasMigration ? Math.min(...migrationPoints.map((point) => point.value)) : 0;
  let maxMigration = hasMigration ? Math.max(...migrationPoints.map((point) => point.value)) : 1;
  const migrationPadding = Math.max((maxMigration - minMigration) * .1, Math.max(Math.abs(maxMigration), Math.abs(minMigration)) * .035, 1);
  minMigration -= migrationPadding;
  maxMigration += migrationPadding;
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (year) => margin.left + ((year - minYear) / (maxYear - minYear)) * plotWidth;
  const yEurostat = (value) => margin.top + ((maxEurostat - value) / (maxEurostat - minEurostat)) * plotHeight;
  const yMigration = (value) => margin.top + ((maxMigration - value) / (maxMigration - minMigration)) * plotHeight;
  const svg = createSvg("svg", {
    viewBox: "0 0 " + width + " " + height,
    role: "img",
    "aria-label": "Eurostat historical " + unitLabel + " values with country-level MigrAI immigration observations and forecasts on a secondary persons-per-year axis",
  });
  for (let index = 0; index <= 4; index += 1) {
    const fraction = index / 4;
    const yPosition = margin.top + fraction * plotHeight;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: yPosition, y2: yPosition, class: "social-impact-gridline" }));
    const leftTick = createSvg("text", { x: margin.left - 8, y: yPosition + 4, "text-anchor": "end", class: "social-impact-axis-label" });
    leftTick.textContent = formatAxisNumber(maxEurostat - fraction * (maxEurostat - minEurostat));
    svg.append(leftTick);
    if (hasMigration) {
      const rightTick = createSvg("text", { x: width - margin.right + 8, y: yPosition + 4, "text-anchor": "start", class: "social-impact-axis-label social-impact-axis-label--secondary" });
      rightTick.textContent = formatAxisNumber(maxMigration - fraction * (maxMigration - minMigration));
      svg.append(rightTick);
    }
  }
  const tickCount = Math.min(7, Math.max(2, Math.ceil((maxYear - minYear) / 5) + 1));
  const years = [...new Set(Array.from({ length: tickCount }, (_, index) =>
    Math.round(minYear + index * (maxYear - minYear) / (tickCount - 1))))];
  years.forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 16, "text-anchor": "middle", class: "social-impact-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  const legend = document.createElement("div");
  legend.className = "social-impact-chart-legend";
  const appendLegend = (label, color, dashed = false) => {
    const key = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.backgroundColor = color;
    if (dashed) swatch.dataset.dashed = "true";
    key.append(swatch, document.createTextNode(label));
    legend.append(key);
  };
  series.forEach((group, index) => {
    const color = EUROSTAT_SOCIAL_CHART_COLORS[index % EUROSTAT_SOCIAL_CHART_COLORS.length];
    const pathParts = [];
    let previousYear = null;
    group.points.forEach((point) => {
      const command = previousYear !== null && point.year <= previousYear + 1 ? "L" : "M";
      pathParts.push(command + x(point.year).toFixed(1) + " " + yEurostat(point.value).toFixed(1));
      previousYear = point.year;
    });
    svg.append(createSvg("path", { d: pathParts.join(" "), class: "social-impact-line", stroke: color }));
    group.points.forEach((point) => {
      const circle = createSvg("circle", { cx: x(point.year), cy: yEurostat(point.value), r: 2.6, class: "social-impact-point", fill: color });
      const title = createSvg("title");
      title.textContent = group.label + " · " + point.year + ": " + socialImpactNumber(point.value) + " " + (point.unit_label || unitLabel)
        + (point.quality_flag ? " · status " + point.quality_flag : "");
      circle.append(title);
      svg.append(circle);
    });
    appendLegend(group.label, color);
  });
  if (migrationSeries.observed.length) {
    const observedPath = migrationSeries.observed.map((point, index) =>
      (index ? "L" : "M") + x(point.year).toFixed(1) + " " + yMigration(point.value).toFixed(1)).join(" ");
    svg.append(createSvg("path", { d: observedPath, class: "social-impact-line social-impact-line--migration-observed" }));
    migrationSeries.observed.forEach((point) => {
      const circle = createSvg("circle", { cx: x(point.year), cy: yMigration(point.value), r: 2.6, class: "social-impact-migration-point" });
      const title = createSvg("title");
      title.textContent = point.year + " · MigrAI observed immigration · " + formatNumber(point.value) + " persons/year";
      circle.append(title);
      svg.append(circle);
    });
    appendLegend("MigrAI observed immigration", "#dceeff");
  }
  if (migrationSeries.forecasts.length) {
    const forecastPathPoints = migrationSeries.observed.length
      ? [migrationSeries.observed.at(-1), ...migrationSeries.forecasts]
      : migrationSeries.forecasts;
    const forecastPath = forecastPathPoints.map((point, index) =>
      (index ? "L" : "M") + x(point.year).toFixed(1) + " " + yMigration(point.value).toFixed(1)).join(" ");
    svg.append(createSvg("path", { d: forecastPath, class: "social-impact-line social-impact-line--migration-forecast" }));
    migrationSeries.forecasts.forEach((point) => {
      const circle = createSvg("circle", { cx: x(point.year), cy: yMigration(point.value), r: 3.4, class: "social-impact-migration-point social-impact-migration-point--forecast" });
      const title = createSvg("title");
      title.textContent = point.year + " · MigrAI " + point.horizon + "-year forecast · " + formatNumber(point.value) + " persons/year";
      circle.append(title);
      svg.append(circle);
    });
    appendLegend("MigrAI forecast", "#54dec5", true);
  }
  const leftAxis = createSvg("text", { x: 13, y: height / 2, transform: "rotate(-90 13 " + (height / 2) + ")", "text-anchor": "middle", class: "social-impact-axis-title" });
  leftAxis.textContent = "Eurostat · " + unitLabel;
  svg.append(leftAxis);
  if (hasMigration) {
    const rightAxis = createSvg("text", { x: width - 10, y: height / 2, transform: "rotate(90 " + (width - 10) + " " + (height / 2) + ")", "text-anchor": "middle", class: "social-impact-axis-title social-impact-axis-title--secondary" });
    rightAxis.textContent = "MigrAI · persons/year";
    svg.append(rightAxis);
  }
  ui.socialImpactChart.append(svg, legend);
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
  if (state.activePage === "data-methodology") renderMethodologyContextInventory();
}

function renderMethodologyContextInventory() {
  ui.methodologyContextSummary.replaceChildren();
  ui.methodologyContextSourceRows.replaceChildren();
  if (state.contextInventoryStatus === "idle") {
    state.contextInventoryStatus = "loading";
    const loading = document.createElement("p");
    loading.className = "methodology-empty";
    loading.textContent = "Loading contextual observations from the authenticated view…";
    ui.methodologyContextSummary.append(loading);
    loadMethodologyContextInventory();
    return;
  }
  if (state.contextInventoryStatus === "loading") {
    const loading = document.createElement("p");
    loading.className = "methodology-empty";
    loading.textContent = "Loading contextual observations from the authenticated view…";
    ui.methodologyContextSummary.append(loading);
    return;
  }
  if (state.contextInventoryStatus === "error") {
    const unavailable = document.createElement("p");
    unavailable.className = "methodology-empty";
    unavailable.textContent = "The contextual source inventory could not be loaded. Country and City production observations remain available.";
    ui.methodologyContextSummary.append(unavailable);
    ui.methodologyContextNote.textContent = "No source inventory is inferred when the protected contextual view cannot be read.";
    return;
  }

  const rows = state.contextInventoryRows;
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "methodology-empty";
    empty.textContent = "The contextual view is accessible, but it currently returns no published observations.";
    ui.methodologyContextSummary.append(empty);
    ui.methodologyContextNote.textContent = "This is separate from observed immigration-flow records in observed_latest.";
    return;
  }

  const appendSummary = (labelText, valueText, detailText) => {
    const card = document.createElement("article");
    card.className = "outlook-panel methodology-summary-card";
    const label = document.createElement("span");
    label.textContent = labelText;
    const value = document.createElement("strong");
    value.textContent = valueText;
    const detail = document.createElement("small");
    detail.textContent = detailText;
    card.append(label, value, detail);
    ui.methodologyContextSummary.append(card);
  };
  const recordsWithSource = rows.filter((row) => String(row.source_name ?? "").trim() || String(row.source_dataset ?? "").trim()).length;
  appendSummary("Context values", numberFormatter.format(rows.length), "Published country and city indicator observations");
  ["country", "city"].forEach((level) => {
    const scoped = rows.filter((row) => row.level === level);
    const entities = unique(scoped.map((row) => String(row.entity_id ?? "")).filter(Boolean));
    const indicators = unique(scoped.map((row) => String(row.indicator_id ?? "")).filter(Boolean));
    const years = scoped.map((row) => safeNumber(row.year)).filter((year) => year !== null);
    const coverage = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "No years";
    appendSummary(`${level === "country" ? "Country" : "City"} context`, numberFormatter.format(scoped.length), `${entities.length} entities · ${indicators.length} indicators · ${coverage}`);
  });
  appendSummary("Source documented", `${numberFormatter.format(recordsWithSource)} / ${numberFormatter.format(rows.length)}`, "Context rows with a source name or dataset");

  const grouped = new Map();
  rows.forEach((row) => {
    const key = [row.level ?? "unknown", row.family ?? "Unclassified", row.source_name ?? "Source not published"].join("\u001f");
    const group = grouped.get(key) ?? { level: row.level ?? "unknown", family: row.family ?? "Unclassified", source: row.source_name ?? "Source not published", datasets: new Set(), entities: new Set(), indicators: new Set(), years: [], count: 0 };
    if (row.source_dataset) group.datasets.add(String(row.source_dataset));
    if (row.entity_id) group.entities.add(String(row.entity_id));
    if (row.indicator_id) group.indicators.add(String(row.indicator_id));
    const year = safeNumber(row.year);
    if (year !== null) group.years.push(year);
    group.count += 1;
    grouped.set(key, group);
  });

  const fragment = document.createDocumentFragment();
  [...grouped.values()].sort((a, b) => a.level.localeCompare(b.level) || a.family.localeCompare(b.family) || a.source.localeCompare(b.source)).forEach((group) => {
    const tr = document.createElement("tr");
    const values = [
      group.level === "country" ? "Country" : group.level === "city" ? "City" : group.level,
      group.family,
      group.source,
      [...group.datasets].sort().join(", ") || "Not published",
      String(group.entities.size),
      String(group.indicators.size),
      numberFormatter.format(group.count),
      group.years.length ? `${Math.min(...group.years)}–${Math.max(...group.years)}` : "Not available",
    ];
    values.forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      tr.append(cell);
    });
    fragment.append(tr);
  });
  ui.methodologyContextSourceRows.append(fragment);
  ui.methodologyContextNote.textContent = "These source names and datasets describe contextual indicators only. They do not provide row-level provenance for the separate immigration-flow records in observed_latest. Year ranges describe published rows, not an expected-coverage guarantee; no expected entity-year manifest is exposed in the current views.";
}

async function loadMethodologyContextInventory() {
  const cacheEpoch = state.contextCacheEpoch;
  const pageSize = 1000;
  const rows = [];
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabaseClient.from("context_observations_latest")
      .select("level,entity_id,entity_name,country_iso2,year,indicator_id,indicator_label,family,value,unit,source_name,source_dataset,geography_level,quality_flag")
      .order("level").order("entity_id").order("indicator_id").order("year").order("source_dataset")
      .range(offset, offset + pageSize - 1);
    if (cacheEpoch !== state.contextCacheEpoch) return;
    if (error) {
      state.contextInventoryStatus = "error";
      state.contextViewsAvailable = false;
      renderMethodologyContextInventory();
      return;
    }
    const page = data ?? [];
    rows.push(...page);
    if (page.length < pageSize) break;
  }
  if (cacheEpoch !== state.contextCacheEpoch) return;
  state.contextInventoryRows = rows;
  state.contextInventoryStatus = "ready";
  state.contextViewsAvailable = true;
  renderMethodologyContextInventory();
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
    ? `${sourceFamilies.length} source ${sourceFamilies.length === 1 ? "family" : "families"} represented in published immigration-flow rows`
    : "No source family is exposed for immigration flows; contextual sources are listed separately below";
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
    : "The immigration-flow views do not expose a source-family field, so this filter is disabled. Contextual indicator sources are inventoried separately below.";
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
    .map((country) => ({ ...country, coverage: benchmarkCountryCoverage(country.id), latest: safeNumber(benchmarkLatestObservation(country.id)?.value) ?? 0 }))
    .filter((country) => country.coverage.observed > 0)
    .sort((a, b) => b.latest - a.latest || a.name.localeCompare(b.name, "en"))
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
  ui.benchmarkPerThousandButton.setAttribute("aria-pressed", String(state.benchmarkMeasure === "perThousand"));
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
  const perCapita = state.benchmarkMeasure === "perThousand";
  const baseValues = new Map(countries.map((country) => [country.id, indexBaseYear === undefined
    ? null : safeNumber(benchmarkObservationMap(country.id).get(indexBaseYear)?.value)]));
  const chartRows = countries.map((country) => {
    const observed = benchmarkObservations(country.id)
      .filter((row) => safeNumber(row.year) >= startYear && safeNumber(row.year) <= endYear)
      .map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value), row, type: "observed" }))
      .map((point) => ({ ...point, value: indexed ? (baseValues.get(country.id) ? point.value / baseValues.get(country.id) * 100 : null) : perCapita ? insightPerThousand(point.value, country.id, point.year) : point.value }))
      .filter((point) => point.value !== null);
    const forecasts = benchmarkForecastRows(country.id)
      .map((row) => ({ year: safeNumber(row.target_year), value: safeNumber(row.prediction), row, type: "forecast", horizon: safeNumber(row.horizon) }))
      .map((point) => ({ ...point, value: indexed ? (baseValues.get(country.id) ? point.value / baseValues.get(country.id) * 100 : null) : perCapita ? insightPerThousand(point.value, country.id, point.year) : point.value }))
      .filter((point) => point.year !== null && point.value !== null);
    const latest = benchmarkLatestObservation(country.id);
    const forecastsComparable = latest && forecasts.some((point) => {
      const baseline = safeNumber(point.row.last_observed_value);
      return baseline !== null && Math.abs(baseline - safeNumber(latest.value)) <= 0.000001;
    });
    const anchor = forecastsComparable && safeNumber(latest.year) >= startYear && safeNumber(latest.year) <= endYear
      ? [{ year: safeNumber(latest.year), value: indexed ? (baseValues.get(country.id) ? safeNumber(latest.value) / baseValues.get(country.id) * 100 : null) : perCapita ? insightPerThousand(safeNumber(latest.value), country.id, safeNumber(latest.year)) : safeNumber(latest.value), row: latest, type: "observed" }]
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
    label.textContent = indexed ? value.toFixed(0) : perCapita ? value.toFixed(2) : benchmarkCompactNumber(value);
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
  yTitle.textContent = indexed ? `Index (base ${indexBaseYear} = 100)` : perCapita ? "Immigrants per 1,000 residents" : "Persons per year";
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
    : perCapita
      ? `Annual immigration per 1,000 residents · ${startYear}–${endYear} common observed window; forecasts use the latest published population`
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
  const perCapita = state.benchmarkMeasure === "perThousand";
  const ranked = selectedBenchmarkCountries()
    .map((country) => {
      const point = benchmarkPointForYear(country.id, year);
      return { country, point: point && perCapita ? { ...point, value: insightPerThousand(point.value, country.id, year) } : point };
    })
    .filter((item) => item.point && item.point.value !== null)
    .sort((a, b) => b.point.value - a.point.value);
  ui.benchmarkRankingSubtitle.textContent = perCapita ? `${year} · annual immigration per 1,000 residents` : `${year} · annual immigration flow (persons/year)`;
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
    value.textContent = perCapita ? item.point.value.toFixed(2) : formatNumber(item.point.value);
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
    state.contextLoadFailures.add(key);
    state.contextViewsAvailable = false;
    state.contextCache.set(key, []);
    return [];
  }
  state.contextLoadFailures.delete(key);
  state.contextViewsAvailable = state.contextLoadFailures.size === 0;
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
  if (!state.selectedContextCountries.length) populateMigrationCountryControl();
  const countries = state.selectedContextCountries.map(countryById).filter(Boolean);
  if (!countries.length) {
    state.contextRows = [];
    populateMigrationIndicatorOptions();
    renderContextMetadataTabs();
    renderMigrationHistoryChart();
    renderContextScatter();
    renderOtherContextIndicators();
    return;
  }
  const requestId = ++state.contextRequestId;
  const countrySelection = countries.map((country) => country.id).join("|");
  ui.contextIndicatorToggle.disabled = true;
  const results = await Promise.all(countries.map((country) => loadContextRows("country", country.id)));
  if (requestId !== state.contextRequestId || countrySelection !== state.selectedContextCountries.join("|")) return;
  state.contextRows = results.flat();
  state.contextViewsAvailable = countries.every((country) => !state.contextLoadFailures.has(contextEntityCacheKey("country", country.id)));
  populateMigrationIndicatorOptions();
  renderContextSelectionSummaries();
  renderContextIndicatorMenu();
  renderContextMetadataTabs();
  setContextSelectionNote();
  renderMigrationHistoryChart();
  renderContextScatter();
  renderOtherContextIndicators();
  renderCorrelationPanel();
}

function populateMigrationIndicatorOptions() {
  const indicators = contextIndicatorRows();
  const available = new Set(indicators.map((row) => row.indicator_id));
  const retained = state.selectedContextIndicators.filter((id) => available.has(id));
  if (!retained.length && indicators.length) {
    retained.push(indicators.find((row) => row.indicator_id === "country_gdp_per_capita_pps")?.indicator_id
      ?? indicators[0].indicator_id);
  }
  state.selectedContextIndicators = retained;
  if (!retained.includes(state.activeContextIndicator)) state.activeContextIndicator = retained[0] ?? null;
}

function selectedCountryContextIndicator() {
  return state.contextRows.find((row) => String(row.entity_id) === state.activeContextCountry
    && row.indicator_id === state.activeContextIndicator)
    ?? state.contextRows.find((row) => row.indicator_id === state.activeContextIndicator)
    ?? null;
}

function contextRowsForCountry(countryId) {
  return state.contextRows.filter((row) => String(row.entity_id) === String(countryId));
}

function renderContextMetadataTabs() {
  const countries = state.selectedContextCountries.map(countryById).filter(Boolean);
  const indicators = state.selectedContextIndicators.map((id) => contextIndicatorRows().find((row) => row.indicator_id === id)).filter(Boolean);
  if (!countries.some((country) => country.id === state.activeContextCountry)) state.activeContextCountry = countries[0]?.id ?? null;
  if (!indicators.some((indicator) => indicator.indicator_id === state.activeContextIndicator)) state.activeContextIndicator = indicators[0]?.indicator_id ?? null;

  ui.contextMetadataCountryTabs.replaceChildren();
  ui.contextMetadataCountryTabs.hidden = countries.length < 2;
  countries.forEach((country) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "context-metadata-tab";
    const countryIndex = state.selectedContextCountries.indexOf(country.id);
    tab.style.setProperty("--context-country-color", CONTEXT_COUNTRY_COLORS[countryIndex % CONTEXT_COUNTRY_COLORS.length]);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(country.id === state.activeContextCountry));
    tab.textContent = country.name;
    tab.addEventListener("click", () => {
      state.activeContextCountry = country.id;
      resetContextScatterZoom();
      renderContextMetadataTabs();
      renderContextScatter();
    });
    ui.contextMetadataCountryTabs.append(tab);
  });

  ui.contextMetadataIndicatorTabs.replaceChildren();
  indicators.forEach((indicator) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "context-metadata-tab context-metadata-tab--indicator";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(indicator.indicator_id === state.activeContextIndicator));
    tab.title = `${indicator.family} · ${indicator.unit}`;
    tab.textContent = indicator.indicator_label;
    tab.addEventListener("click", () => {
      state.activeContextIndicator = indicator.indicator_id;
      resetContextScatterZoom();
      renderContextMetadataTabs();
      renderContextScatter();
    });
    ui.contextMetadataIndicatorTabs.append(tab);
  });
  const activeCountry = countryById(state.activeContextCountry);
  const activeIndicator = contextIndicatorRows().find((row) => row.indicator_id === state.activeContextIndicator) ?? null;
  const activeRows = activeCountry && activeIndicator
    ? contextRowsForCountry(activeCountry.id).filter((row) => row.indicator_id === activeIndicator.indicator_id)
    : [];
  renderContextIndicatorMetadata(activeIndicator, activeRows, activeCountry);
}

const CONTEXT_COUNTRY_COLORS = ["#f5a16b", "#5fb5d4", "#ad91dc"];
const CONTEXT_SINGLE_INDICATOR_COLORS = ["#5fb5d4", "#ad91dc", "#71c9a8", "#e8c86e", "#df8eaa", "#82a9f7", "#c2a47b", "#d98868", "#6dbbc0", "#c1a0e8"];

function renderContextChartLegend(countries) {
  ui.contextChartLegend.replaceChildren();
  countries.forEach((country, index) => {
    const item = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.background = CONTEXT_COUNTRY_COLORS[index % CONTEXT_COUNTRY_COLORS.length];
    item.append(swatch, document.createTextNode(country.name));
    ui.contextChartLegend.append(item);
  });
  const immigration = document.createElement("span");
  const immigrationLine = document.createElement("i");
  immigrationLine.className = "context-chart-legend__line";
  immigration.append(immigrationLine, document.createTextNode("Immigration · solid"));
  const indicator = document.createElement("span");
  const indicatorLine = document.createElement("i");
  indicatorLine.className = "context-chart-legend__line context-chart-legend__line--muted";
  indicator.append(indicatorLine, document.createTextNode("Indicator · muted/dashed"));
  ui.contextChartLegend.append(immigration, indicator);
}

function contextSeriesForCountry(country, indicatorId, startYear = null) {
  const immigration = state.observed
    .filter((row) => String(row.entity_id) === country.id)
    .map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value) }))
    .filter((point) => point.year !== null && point.value !== null)
    .sort((a, b) => a.year - b.year);
  const context = contextRowsForCountry(country.id)
    .filter((row) => row.indicator_id === indicatorId)
    .map((row) => ({ year: safeNumber(row.year), value: safeNumber(row.value), row }))
    .filter((point) => point.year !== null && point.value !== null)
    .sort((a, b) => a.year - b.year);
  if (startYear !== null) {
    return {
      immigration: immigration.filter((point) => point.year >= startYear),
      context: context.filter((point) => point.year >= startYear),
    };
  }
  return { immigration, context };
}

function renderSingleContextChartLegend(indicators) {
  ui.contextChartLegend.replaceChildren();
  const immigration = document.createElement("span");
  const immigrationLine = document.createElement("i");
  immigrationLine.className = "context-chart-legend__line";
  immigrationLine.style.borderTopColor = CONTEXT_COUNTRY_COLORS[0];
  immigration.append(immigrationLine, document.createTextNode("Immigration · persons/year"));
  ui.contextChartLegend.append(immigration);
  indicators.forEach((indicator, index) => {
    const item = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.className = "context-chart-legend__line";
    swatch.style.borderTopColor = CONTEXT_SINGLE_INDICATOR_COLORS[index % CONTEXT_SINGLE_INDICATOR_COLORS.length];
    swatch.style.borderTopStyle = "dashed";
    item.append(swatch, document.createTextNode(`${indicator.indicator_label} · ${indicator.unit}`));
    ui.contextChartLegend.append(item);
  });
}

function renderSingleCountryContextOverlay(country, indicators, period) {
  const allSeries = indicators.map((indicator) => ({
    indicator,
    ...contextSeriesForCountry(country, indicator.indicator_id),
  }));
  const immigration = allSeries[0]?.immigration ?? contextSeriesForCountry(country, null).immigration;
  const allYears = [...immigration, ...allSeries.flatMap((series) => series.context)].map((point) => point.year);
  const maxYear = allYears.length ? Math.max(...allYears) : null;
  const startYear = period === "all" || maxYear === null ? null : maxYear - Number(period) + 1;
  const visibleImmigration = startYear === null ? immigration : immigration.filter((point) => point.year >= startYear);
  const visibleSeries = allSeries.map((series, index) => {
    const context = startYear === null ? series.context : series.context.filter((point) => point.year >= startYear);
    const base = context[0]?.value ?? null;
    const magnitudes = context.map((point) => Math.abs(point.value)).filter((value) => value > 1e-9).sort((a, b) => a - b);
    const fallbackScale = magnitudes.length
      ? magnitudes[Math.floor((magnitudes.length - 1) / 2)]
      : 1;
    const scale = base !== null && Math.abs(base) > 1e-9 ? Math.abs(base) : fallbackScale;
    return {
      ...series,
      color: CONTEXT_SINGLE_INDICATOR_COLORS[index % CONTEXT_SINGLE_INDICATOR_COLORS.length],
      indexed: context.map((point) => ({ ...point, indexedValue: 100 + ((point.value - (base ?? 0)) / scale) * 100 })),
    };
  });
  const contextValues = visibleSeries.flatMap((series) => series.indexed.map((point) => point.indexedValue));
  const years = unique([...visibleImmigration, ...visibleSeries.flatMap((series) => series.indexed)].map((point) => point.year)).sort((a, b) => a - b);
  if (!years.length) {
    benchmarkEmpty(ui.migrationHistoryChart, "No immigration or contextual observations are available for this selection.");
    ui.migrationHistoryNote.textContent = "No values are inferred or filled in when a selected series is unavailable.";
    return;
  }

  const panel = document.createElement("section");
  panel.className = "context-series-panel";
  const heading = document.createElement("div");
  heading.className = "context-series-panel__heading";
  const title = document.createElement("h3");
  title.textContent = `Migration and selected indicators · ${country.name}`;
  const detail = document.createElement("span");
  const indicatorsWithValues = visibleSeries.filter((series) => series.indexed.length).length;
  detail.textContent = `${indicatorsWithValues}/${indicators.length} indicators with values · index reset within selected window`;
  heading.append(title, detail);
  panel.append(heading);

  const width = Math.max(320, Math.round(ui.migrationHistoryChart.getBoundingClientRect().width || 860));
  const height = 340;
  const margin = { top: 26, right: 88, bottom: 52, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const bounds = (values) => {
    if (!values.length) return [0, 1];
    const low = Math.min(...values);
    const high = Math.max(...values);
    const padding = Math.max((high - low) * .1, Math.max(Math.abs(high), Math.abs(low)) * .02, 1);
    return [low - padding, high + padding];
  };
  const [minImmigration, maxImmigration] = bounds(visibleImmigration.map((point) => point.value));
  const [minContext, maxContext] = bounds(contextValues);
  const minYear = years[0];
  const maxChartYear = years.at(-1);
  const x = (year) => margin.left + (maxChartYear === minYear ? plotWidth / 2 : (year - minYear) / (maxChartYear - minYear) * plotWidth);
  const yImmigration = (value) => margin.top + (maxImmigration - value) / (maxImmigration - minImmigration) * plotHeight;
  const yContext = (value) => margin.top + (maxContext - value) / (maxContext - minContext) * plotHeight;
  const svg = createSvg("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": `Observed immigration and ${indicators.length} indexed contextual indicators for ${country.name}`,
  });

  for (let tick = 0; tick <= 4; tick += 1) {
    const fraction = tick / 4;
    const yPosition = margin.top + plotHeight * fraction;
    svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: yPosition, y2: yPosition, class: "benchmark-gridline" }));
    const immigrationTick = createSvg("text", { x: margin.left - 8, y: yPosition + 4, "text-anchor": "end", class: "benchmark-axis-label" });
    immigrationTick.textContent = formatAxisNumber(maxImmigration - fraction * (maxImmigration - minImmigration));
    svg.append(immigrationTick);
    if (contextValues.length) {
      const contextTick = createSvg("text", { x: width - margin.right + 9, y: yPosition + 4, "text-anchor": "start", class: "benchmark-axis-label" });
      contextTick.textContent = formatAxisNumber(maxContext - fraction * (maxContext - minContext));
      svg.append(contextTick);
    }
  }
  const tickCount = Math.min(7, years.length);
  const visibleTicks = tickCount === years.length || tickCount <= 1
    ? years
    : Array.from({ length: tickCount }, (_, index) => years[Math.round(index * (years.length - 1) / (tickCount - 1))]);
  visibleTicks.forEach((year) => {
    const label = createSvg("text", { x: x(year), y: height - 23, "text-anchor": "middle", class: "benchmark-axis-label" });
    label.textContent = String(year);
    svg.append(label);
  });
  svg.append(createSvg("line", { x1: margin.left, x2: width - margin.right, y1: height - margin.bottom, y2: height - margin.bottom, class: "benchmark-axis-line" }));
  const immigrationTitle = createSvg("text", { x: 16, y: height / 2, transform: `rotate(-90 16 ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
  immigrationTitle.textContent = "Immigration · persons/year";
  svg.append(immigrationTitle);
  if (contextValues.length) {
    const contextTitle = createSvg("text", { x: width - 13, y: height / 2, transform: `rotate(-90 ${width - 13} ${height / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
    contextTitle.textContent = "Context index · first visible value = 100";
    svg.append(contextTitle);
  }
  const yearTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 3, "text-anchor": "middle", class: "benchmark-axis-title" });
  yearTitle.textContent = "Observed year";
  svg.append(yearTitle);

  splitObservedSegments(visibleImmigration).forEach((segment) => {
    if (segment.length < 2) return;
    const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yImmigration(point.value)}`).join(" ");
    svg.append(createSvg("path", { d: path, class: "context-history-line" }));
  });
  visibleImmigration.forEach(({ year, value }) => {
    const point = createSvg("circle", { cx: x(year), cy: yImmigration(value), r: 4, class: "context-history-point" });
    const tooltip = createSvg("title");
    tooltip.textContent = `${country.name} · ${year} · ${formatNumber(value)} persons/year · observed`;
    point.append(tooltip);
    svg.append(point);
  });
  visibleSeries.forEach(({ indicator, indexed, color }) => {
    const plotValues = indexed.map((point) => ({ year: point.year, value: point.indexedValue }));
    splitObservedSegments(plotValues).forEach((segment) => {
      if (segment.length < 2) return;
      const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yContext(point.value)}`).join(" ");
      const line = createSvg("path", { d: path, class: "context-indicator-line" });
      line.style.stroke = color;
      line.style.opacity = ".9";
      svg.append(line);
    });
    indexed.forEach(({ year, value, indexedValue }) => {
      const point = createSvg("circle", { cx: x(year), cy: yContext(indexedValue), r: 3.7, class: "context-indicator-point" });
      point.style.fill = color;
      const tooltip = createSvg("title");
      tooltip.textContent = `${country.name} · ${indicator.indicator_label} · ${year} · ${formatContextValue(value, indicator.unit)} · index ${indexedValue.toFixed(1)} · source-reported`;
      point.append(tooltip);
      svg.append(point);
    });
  });
  panel.append(svg);
  ui.migrationHistoryChart.append(panel);
  ui.migrationHistoryNote.textContent = "All selected indicators share one chart. Each contextual series is rebased to 100 at its first available year in the selected window. Changes use the starting-value magnitude as their scale (or the median non-zero magnitude when the starting value is zero); immigration keeps its own persons/year axis. This supports trend comparison, not comparison of absolute indicator levels or causal inference.";
}

function renderMigrationHistoryChart() {
  if (!state.initialized) return;
  ui.migrationHistoryChart.replaceChildren();
  const countries = state.selectedContextCountries.map(countryById).filter(Boolean);
  const indicators = state.selectedContextIndicators
    .map((id) => contextIndicatorRows().find((row) => row.indicator_id === id))
    .filter(Boolean);
  renderContextChartLegend(countries);

  const countryNames = countries.map((country) => country.name).join(", ");
  const indicatorCount = indicators.length;
  ui.migrationContextSubtitle.textContent = `${countryNames || "No countries selected"} · ${countries.length} of 3 countries · ${indicatorCount} indicator${indicatorCount === 1 ? "" : "s"} selected`;
  if (!countries.length) {
    benchmarkEmpty(ui.migrationHistoryChart, "Select at least one country to explore observed migration and contextual indicators.");
    ui.migrationHistoryNote.textContent = "No contextual or migration values are inferred when a selection is empty.";
    return;
  }
  if (!indicators.length) {
    benchmarkEmpty(ui.migrationHistoryChart, "No verified contextual indicators are available for the selected countries.");
    ui.migrationHistoryNote.textContent = "Observed immigration remains separate from contextual data; unavailable indicators are not inferred.";
    return;
  }

  if (countries.length === 1 && indicators.length > 1) {
    renderSingleContextChartLegend(indicators);
    renderSingleCountryContextOverlay(countries[0], indicators, ui.migrationPeriod.value);
    return;
  }

  const period = ui.migrationPeriod.value;
  const panelResults = [];
  indicators.forEach((indicator) => {
    const series = countries.map((country, index) => ({
      country,
      color: CONTEXT_COUNTRY_COLORS[index % CONTEXT_COUNTRY_COLORS.length],
      ...contextSeriesForCountry(country, indicator.indicator_id),
    }));
    const fullYears = series.flatMap((item) => [...item.immigration, ...item.context].map((point) => point.year));
    const maxYear = fullYears.length ? Math.max(...fullYears) : null;
    const startYear = period === "all" || maxYear === null ? null : maxYear - Number(period) + 1;
    const filteredSeries = series.map((item) => ({
      ...item,
      immigration: startYear === null ? item.immigration : item.immigration.filter((point) => point.year >= startYear),
      context: startYear === null ? item.context : item.context.filter((point) => point.year >= startYear),
    }));
    panelResults.push({ indicator, series: filteredSeries });
  });

  const anyImmigration = panelResults.some((panel) => panel.series.some((series) => series.immigration.length));
  if (!anyImmigration) {
    benchmarkEmpty(ui.migrationHistoryChart, "There are no valid observed immigration values for these countries and years.");
    ui.migrationHistoryNote.textContent = "The selected contextual series remain source-reported; no migration values are generated from them.";
    return;
  }

  const width = Math.max(320, Math.round(ui.migrationHistoryChart.getBoundingClientRect().width || 860));
  const height = 320;
  const margin = { top: 24, right: 88, bottom: 50, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const bounds = (values) => {
    const low = Math.min(...values);
    const high = Math.max(...values);
    const padding = Math.max((high - low) * .1, Math.max(Math.abs(high), Math.abs(low)) * .02, 0.000001);
    return [low - padding, high + padding];
  };

  panelResults.forEach(({ indicator, series }) => {
    const immigrationValues = series.flatMap((item) => item.immigration.map((point) => point.value));
    const contextValues = series.flatMap((item) => item.context.map((point) => point.value));
    const years = unique(series.flatMap((item) => [...item.immigration, ...item.context].map((point) => point.year))).sort((a, b) => a - b);
    const panel = document.createElement("section");
    panel.className = "context-series-panel";
    const heading = document.createElement("div");
    heading.className = "context-series-panel__heading";
    const title = document.createElement("h3");
    title.textContent = indicator.indicator_label;
    const detail = document.createElement("span");
    const availableCount = series.filter((item) => item.context.length).length;
    detail.textContent = `${indicator.family} · ${indicator.unit} · ${availableCount}/${countries.length} countries with values`;
    heading.append(title, detail);
    panel.append(heading);

    if (!years.length || !immigrationValues.length) {
      const empty = document.createElement("p");
      empty.className = "context-series-empty";
      empty.textContent = "No matched observed immigration and contextual years are available for this indicator.";
      panel.append(empty);
      ui.migrationHistoryChart.append(panel);
      return;
    }

    const minYear = years[0];
    const maxChartYear = years.at(-1);
    const [minImmigration, maxImmigration] = bounds(immigrationValues);
    const [minContext, maxContext] = contextValues.length ? bounds(contextValues) : [0, 1];
    const x = (year) => margin.left + (maxChartYear === minYear ? plotWidth / 2 : (year - minYear) / (maxChartYear - minYear) * plotWidth);
    const yImmigration = (value) => margin.top + (maxImmigration - value) / (maxImmigration - minImmigration) * plotHeight;
    const yContext = (value) => margin.top + (maxContext - value) / (maxContext - minContext) * plotHeight;
    const svg = createSvg("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": `${indicator.indicator_label} and observed immigration by selected country`,
    });

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
      rightTitle.textContent = `${indicator.indicator_label} · ${indicator.unit}`;
      svg.append(rightTitle);
    }
    const xTitle = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 3, "text-anchor": "middle", class: "benchmark-axis-title" });
    xTitle.textContent = "Observed year";
    svg.append(xTitle);

    series.forEach(({ country, color, immigration, context }) => {
      splitObservedSegments(immigration).forEach((segment) => {
        if (segment.length < 2) return;
        const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yImmigration(point.value)}`).join(" ");
        const line = createSvg("path", { d: path, class: "context-history-line" });
        line.style.stroke = color;
        svg.append(line);
      });
      immigration.forEach(({ year, value }) => {
        const point = createSvg("circle", { cx: x(year), cy: yImmigration(value), r: 4, class: "context-history-point" });
        point.style.fill = color;
        const tooltip = createSvg("title");
        tooltip.textContent = `${country.name} · ${year} · ${formatNumber(value)} persons/year · observed`;
        point.append(tooltip);
        svg.append(point);
      });
      splitObservedSegments(context).forEach((segment) => {
        if (segment.length < 2) return;
        const path = segment.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${yContext(point.value)}`).join(" ");
        const line = createSvg("path", { d: path, class: "context-indicator-line" });
        line.style.stroke = color;
        line.style.opacity = ".62";
        svg.append(line);
      });
      context.forEach(({ year, value }) => {
        const point = createSvg("circle", { cx: x(year), cy: yContext(value), r: 3.7, class: "context-indicator-point" });
        point.style.fill = color;
        point.style.opacity = ".62";
        const tooltip = createSvg("title");
        tooltip.textContent = `${country.name} · ${indicator.indicator_label} · ${year} · ${formatContextValue(value, indicator.unit)} · source-reported`;
        point.append(tooltip);
        svg.append(point);
      });
    });
    panel.append(svg);
    ui.migrationHistoryChart.append(panel);
  });
  ui.migrationHistoryNote.textContent = "Each selected indicator has its own value scale and chart. Country colors stay consistent; solid lines show observed immigration, while dashed muted lines show source-reported indicator values. These are descriptive comparisons, not causal explanations.";
}

function renderContextIndicatorMetadata(indicator, rows, country = null) {
  const validRows = rows.filter((row) => safeNumber(row.year) !== null && safeNumber(row.value) !== null);
  const count = validRows.length;
  const years = validRows.map((row) => safeNumber(row.year));
  const firstYear = count ? Math.min(...years) : null;
  const lastYear = count ? Math.max(...years) : null;
  ui.contextIndicatorHeading.textContent = indicator?.indicator_label ?? "No contextual series";
  ui.contextIndicatorDefinition.textContent = !state.contextViewsAvailable
    ? "The protected contextual-data view is not yet configured or accessible. The main dashboard data remains available."
    : indicator
    ? `${indicator.definition}${indicator.caveat ? ` ${indicator.caveat}` : ""}`
    : "No verified contextual values are published for this selection. Values are never inferred or filled in.";
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
  const flagged = validRows.filter((row) => row.quality_flag).length;
  const countryViewUnavailable = country && state.contextLoadFailures.has(contextEntityCacheKey("country", country.id));
  ui.contextIndicatorCoverage.textContent = indicator && count
    ? `${firstYear}–${lastYear} · ${count} values · ${flagged ? `${flagged} source flags reported` : "no source flags supplied"}`
    : indicator && countryViewUnavailable ? `Data view unavailable for ${country.name}.`
      : indicator ? `No published values for ${country?.name ?? "this country"}.` : "Not available";
}

function resetContextScatterZoom() {
  state.contextScatterZoomX = 1;
  state.contextScatterZoomY = 1;
}

function adjustContextScatterZoom(axis, multiplier) {
  const key = axis === "x" ? "contextScatterZoomX" : "contextScatterZoomY";
  state[key] = Math.min(8, Math.max(1, state[key] * multiplier));
  renderContextScatter();
}

function contextScatterDomain(values, zoom = 1) {
  const low = Math.min(...values);
  const high = Math.max(...values);
  const range = high - low;
  const padding = range > 0 ? range * 0.08 : Math.max(Math.abs(high) * 0.08, 0.01);
  const paddedLow = low - padding;
  const paddedHigh = high + padding;
  const center = (paddedLow + paddedHigh) / 2;
  const halfRange = (paddedHigh - paddedLow) / (2 * Math.max(zoom, 1));
  return [center - halfRange, center + halfRange];
}

function formatContextScatterAxisValue(value, span) {
  const absolute = Math.abs(value);
  if (absolute >= 1_000_000) {
    return `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value / 1_000_000)}m`;
  }
  if (absolute >= 10_000) {
    return `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 }).format(value / 1_000)}k`;
  }
  const digits = span < 1 ? 2 : span < 10 ? 2 : span < 100 ? 1 : 0;
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: digits }).format(value);
}

function renderContextScatter() {
  const indicator = selectedCountryContextIndicator();
  const country = countryById(state.activeContextCountry);
  ui.contextScatterChart.hidden = true;
  ui.contextScatterChart.replaceChildren();
  ui.contextScatterEmpty.hidden = false;
  ui.contextScatterControls.hidden = true;
  ui.contextScatterStatus.hidden = true;
  if (!indicator || !country) {
    ui.contextScatterSubtitle.textContent = "Select a country and indicator to inspect their paired observations.";
    return;
  }
  ui.contextScatterSubtitle.textContent = `${country.name} · ${indicator.indicator_label} · descriptive comparison only`;

  const observedByYear = new Map(state.observed
    .filter((row) => String(row.entity_id) === country.id)
    .map((row) => [safeNumber(row.year), safeNumber(row.value)])
    .filter(([year, value]) => Number.isFinite(year) && Number.isFinite(value)));
  const pairs = contextRowsForCountry(country.id).filter((row) => row.indicator_id === indicator.indicator_id)
    .map((row) => ({ year: safeNumber(row.year), x: safeNumber(row.value), y: observedByYear.get(safeNumber(row.year)) }))
    .filter((point) => Number.isFinite(point.year) && Number.isFinite(point.x) && Number.isFinite(point.y));
  if (pairs.length < 2) {
    const detail = ui.contextScatterEmpty.querySelector("p");
    if (detail) detail.textContent = `At least two matched years are needed for ${country.name} and ${indicator.indicator_label}. Unmatched years are omitted.`;
    return;
  }

  ui.contextScatterEmpty.hidden = true;
  ui.contextScatterChart.hidden = false;
  ui.contextScatterControls.hidden = false;
  ui.contextScatterStatus.hidden = false;
  const width = Math.max(340, Math.round(ui.contextScatterChart.getBoundingClientRect().width || 600));
  const height = 300;
  const margin = { top: 20, right: 18, bottom: 60, left: 74 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const xDomain = contextScatterDomain(pairs.map((point) => point.x), state.contextScatterZoomX);
  const yDomain = contextScatterDomain(pairs.map((point) => point.y), state.contextScatterZoomY);
  const xSpan = xDomain[1] - xDomain[0];
  const ySpan = yDomain[1] - yDomain[0];
  const x = (value) => margin.left + (value - xDomain[0]) / xSpan * plotWidth;
  const y = (value) => margin.top + (yDomain[1] - value) / ySpan * plotHeight;
  const svg = createSvg("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": `${pairs.length} paired country-year observations: ${indicator.indicator_label} compared with observed immigration in ${country.name}`,
  });
  const plotTop = margin.top;
  const plotBottom = height - margin.bottom;
  const plotRight = width - margin.right;
  const clipId = "context-scatter-plot-clip";
  const defs = createSvg("defs");
  const clip = createSvg("clipPath", { id: clipId });
  clip.append(createSvg("rect", { x: margin.left, y: plotTop, width: plotWidth, height: plotHeight }));
  defs.append(clip);
  svg.append(defs);

  for (let tick = 0; tick <= 4; tick += 1) {
    const fraction = tick / 4;
    const xValue = xDomain[0] + xSpan * fraction;
    const xPosition = margin.left + plotWidth * fraction;
    svg.append(createSvg("line", { x1: xPosition, x2: xPosition, y1: plotTop, y2: plotBottom, class: "context-scatter-grid" }));
    const xTick = createSvg("text", { x: xPosition, y: plotBottom + 17, "text-anchor": "middle", class: "context-scatter-axis-label" });
    xTick.textContent = formatContextScatterAxisValue(xValue, xSpan);
    svg.append(xTick);

    const yValue = yDomain[1] - ySpan * fraction;
    const yPosition = plotTop + plotHeight * fraction;
    svg.append(createSvg("line", { x1: margin.left, x2: plotRight, y1: yPosition, y2: yPosition, class: "context-scatter-grid" }));
    const yTick = createSvg("text", { x: margin.left - 9, y: yPosition + 4, "text-anchor": "end", class: "context-scatter-axis-label" });
    yTick.textContent = formatContextScatterAxisValue(yValue, ySpan);
    svg.append(yTick);
  }
  svg.append(createSvg("line", { x1: margin.left, x2: plotRight, y1: plotBottom, y2: plotBottom, class: "benchmark-axis-line" }));
  svg.append(createSvg("line", { x1: margin.left, x2: margin.left, y1: plotTop, y2: plotBottom, class: "benchmark-axis-line" }));

  const points = createSvg("g", { "clip-path": `url(#${clipId})` });
  pairs.forEach((pair) => {
    const point = createSvg("circle", { cx: x(pair.x), cy: y(pair.y), r: 4.3, class: "context-scatter-point" });
    const title = createSvg("title");
    title.textContent = `${pair.year} · ${formatContextValue(pair.x, indicator.unit)} · ${formatNumber(pair.y)} persons/year`;
    point.append(title);
    points.append(point);
  });
  const fit = insightRegressionLine(pairs);
  if (fit) {
    const lineStart = xDomain[0];
    const lineEnd = xDomain[1];
    points.prepend(createSvg("line", { x1: x(lineStart), y1: y(fit.intercept + fit.slope * lineStart), x2: x(lineEnd), y2: y(fit.intercept + fit.slope * lineEnd), class: "context-scatter-fit" }));
  }
  svg.append(points);

  const xLabel = createSvg("text", { x: margin.left + plotWidth / 2, y: height - 4, "text-anchor": "middle", class: "benchmark-axis-title" });
  xLabel.textContent = `${indicator.indicator_label} · ${indicator.unit}`;
  const yLabel = createSvg("text", { x: 16, y: margin.top + plotHeight / 2, transform: `rotate(-90 16 ${margin.top + plotHeight / 2})`, "text-anchor": "middle", class: "benchmark-axis-title" });
  yLabel.textContent = "Immigration · persons/year";
  svg.append(xLabel, yLabel);
  ui.contextScatterChart.append(svg);
  ui.contextScatterStatus.textContent = `${pairs.length} matched years · ${insightScatterSentence(insightPairStats(pairs))} Descriptive only; the dashed line is a simple linear fit.`;
  ui.contextScatterZoomXOut.disabled = state.contextScatterZoomX <= 1.001;
  ui.contextScatterZoomYOut.disabled = state.contextScatterZoomY <= 1.001;
  ui.contextScatterZoomXIn.disabled = state.contextScatterZoomX >= 7.999;
  ui.contextScatterZoomYIn.disabled = state.contextScatterZoomY >= 7.999;
}

function renderOtherContextIndicators() {
  const indicators = state.selectedContextIndicators.map((id) => contextIndicatorRows().find((row) => row.indicator_id === id)).filter(Boolean);
  const countries = state.selectedContextCountries.map(countryById).filter(Boolean);
  const items = countries.flatMap((country) => indicators.map((indicator) => {
    const rows = contextRowsForCountry(country.id).filter((row) => row.indicator_id === indicator.indicator_id
      && safeNumber(row.year) !== null && safeNumber(row.value) !== null)
      .sort((a, b) => safeNumber(b.year) - safeNumber(a.year));
    return { country, indicator, latest: rows[0] ?? null };
  }));
  ui.contextOtherIndicators.replaceChildren();
  const availableCount = items.filter((item) => item.latest).length;
  ui.contextIndicatorCount.textContent = state.contextViewsAvailable ? `${availableCount}/${items.length} available` : "Not connected";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "context-family-empty";
    empty.textContent = state.contextViewsAvailable
      ? "Select at least one country and one indicator to see their latest published values."
      : "The protected contextual-data view is not yet configured or accessible.";
    ui.contextOtherIndicators.append(empty);
    return;
  }
  items.forEach(({ country, indicator, latest }, index) => {
    const item = document.createElement("div");
    const number = document.createElement("span");
    number.className = "context-family-icon";
    number.textContent = String(index + 1).padStart(2, "0");
    const description = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = `${indicator.indicator_label} · ${country.name}`;
    const details = document.createElement("small");
    details.textContent = latest
      ? `${indicator.family} · ${indicator.source_name} · latest reported ${latest.year}`
      : `${indicator.family} · ${state.contextLoadFailures.has(contextEntityCacheKey("country", country.id)) ? "data view unavailable" : "no values published for this country"}`;
    const href = officialContextSourceUrl(indicator.source_url);
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = ` · ${indicator.source_dataset}`;
      details.append(link);
    }
    description.append(title, details);
    const value = document.createElement("b");
    value.textContent = latest ? formatContextValue(latest.value, indicator.unit) : "Not available";
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

function reliabilityNaiveScope(horizon) {
  const selected = ui.reliabilityEntity.value;
  if (selected === "all") return { horizon };
  if (state.reliabilityScope === "city") {
    const [countryIso2, ...rest] = selected.split("|");
    return { horizon, entityId: rest.join("|"), countryIso2 };
  }
  return { horizon, entityId: selected };
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
    model.textContent = models.length === 1 ? modelDisplayName(models[0]) : models.length > 1 ? `${models.length} model labels in selected records` : "Not published in output records";
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
    const naive = naiveBaselineComparison({ level: state.reliabilityScope, ...reliabilityNaiveScope(horizon) });
    const naiveLine = document.createElement("p");
    naiveLine.className = `reliability-naive-line reliability-naive-line--${naiveBaselineTone(naive)}`;
    naiveLine.textContent = `${naiveBaselineHeadline(naive)}. ${naiveBaselineDetail(naive)}`;
    const ranges = document.createElement("small");
    ranges.className = "reliability-horizon-card__ranges";
    ranges.textContent = rows.length
      ? `Published bounds on output rows · 80%: ${ranges80}/${rows.length} · 95%: ${ranges95}/${rows.length}`
      : "No output rows match the current filters.";
    card.append(head, modelLabel, model, countRow, evidence, naiveLine, ranges);
    ui.reliabilityHorizonCards.append(card);
  });
}

function renderReliabilityMetricStatus() {
  ui.reliabilityMetricStatus.replaceChildren();
  const result = reliabilitySelectedMetric();
  const errorUnit = state.reliabilityScope === "city" ? "pp" : "persons/year";
  const naive = naiveBaselineComparison({ level: state.reliabilityScope, ...reliabilityNaiveScope(Number(ui.reliabilityHorizon.value)) });
  [
    { label: "MAE", value: result ? `${formatMetricValue(result.mae)} ${errorUnit}` : "Not available", note: "Mean absolute error" },
    { label: "WAPE", value: result ? `${formatMetricValue(result.wape_pct, 1)}%` : "Not available", note: "Weighted absolute percentage error" },
    { label: "RMSE", value: result ? `${formatMetricValue(result.rmse)} ${errorUnit}` : "Not available", note: "Root mean squared error" },
    { label: "Evaluation sample", value: result ? `${result.n_observations} pairs · ${result.n_folds} folds` : "Not available", note: "Selected horizon and scope" },
    { label: "Vs. naive baseline", value: naiveBaselineHeadline(naive), note: naiveBaselineDetail(naive), tone: naiveBaselineTone(naive) },
  ].forEach((metric) => {
    const item = document.createElement("article");
    if (metric.tone) item.dataset.tone = metric.tone;
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

function renderReliabilityShap() {
  ui.reliabilityShapChart.replaceChildren();
  ui.reliabilityShapStatus.hidden = true;
  ui.reliabilityShapSummary.textContent = "";
  if (!state.shapAttributionsAvailable) {
    ui.reliabilityShapStatus.hidden = false;
    ui.reliabilityShapStatus.innerHTML = "<strong>SHAP view not connected</strong><p>The protected attribution view is not configured or accessible yet.</p>";
    return;
  }

  const horizon = Number(ui.reliabilityHorizon.value);
  const selectedModel = ui.reliabilityModel.value;
  const selectedEntity = ui.reliabilityEntity.value;
  const eligibleForecasts = reliabilityFilteredForecastRows(horizon)
    .filter((row) => selectedModel === "all" || String(row.model_id) === selectedModel);
  const eligibleModels = new Set([
    "M0_RIDGE_AR", "comb_persist+ridge_delta", "comb_persist+xgb_nivel",
  ]);
  const eligibleAttributionRows = state.shapAttributions.filter((row) => row.level === state.reliabilityScope
    && safeNumber(row.horizon) === horizon
    && (selectedModel === "all" || String(row.model_id) === selectedModel)
    && (selectedEntity === "all" || reliabilityEntityKey(row) === selectedEntity));

  if (!eligibleAttributionRows.length) {
    ui.reliabilityShapStatus.hidden = false;
    const title = document.createElement("strong");
    const note = document.createElement("p");
    if (selectedModel !== "all" && !eligibleModels.has(selectedModel)) {
      title.textContent = "This production model has no SHAP attribution";
      note.textContent = "SHAP is published only for the learned Ridge and XGBoost models. Persistence and Drift are deterministic rules, so their formula is the appropriate explanation.";
    } else if (!eligibleForecasts.length) {
      title.textContent = "No production forecast matches these filters";
      note.textContent = "Select another scope, horizon, model or entity.";
    } else {
      title.textContent = "No SHAP records for this forecast";
      note.textContent = "The latest production run does not contain an attribution for this selection.";
    }
    ui.reliabilityShapStatus.replaceChildren(title, note);
    return;
  }

  const byForecastAndFeature = new Map();
  eligibleAttributionRows.forEach((row) => {
    const cityIdentity = state.reliabilityScope === "city" && row.feature_group === "City identity";
    const featureKey = cityIdentity ? "__city_identity__" : String(row.feature_name);
    const key = `${row.run_id}|${row.level}|${row.entity_id}|${row.horizon}|${featureKey}`;
    const existing = byForecastAndFeature.get(key);
    if (existing) {
      existing.shap_value += safeNumber(row.shap_value) ?? 0;
      existing.feature_label = "City identity";
      existing.feature_group = "City identity";
      existing.feature_value = null;
      existing.city_identity_grouped = true;
    } else {
      byForecastAndFeature.set(key, {
        ...row,
        feature_label: cityIdentity ? "City identity" : (row.feature_label || row.feature_name),
        feature_key: featureKey,
        city_identity_grouped: false,
      });
    }
  });
  const points = [...byForecastAndFeature.values()];
  const features = new Map();
  points.forEach((point) => {
    const group = features.get(point.feature_key) ?? { key: point.feature_key, label: point.feature_label, points: [] };
    group.points.push(point);
    features.set(point.feature_key, group);
  });
  const rankedFeatures = [...features.values()]
    .map((feature) => ({
      ...feature,
      meanAbs: feature.points.reduce((sum, point) => sum + Math.abs(safeNumber(point.shap_value) ?? 0), 0)
        / Math.max(feature.points.length, 1),
    }))
    .sort((a, b) => b.meanAbs - a.meanAbs)
    .slice(0, 14);
  const displayedPoints = rankedFeatures.flatMap((feature) => feature.points);
  const forecastKeys = new Set(eligibleAttributionRows.map((row) => `${row.run_id}|${row.level}|${row.entity_id}|${row.horizon}`));
  const unit = state.reliabilityScope === "city" ? "pp" : "persons/year";

  if (selectedEntity !== "all" && eligibleAttributionRows.length) {
    const first = eligibleAttributionRows[0];
    const finalValue = safeNumber(first.forecast_prediction);
    const explained = safeNumber(first.explained_value);
    const base = safeNumber(first.base_value);
    const clipped = finalValue !== null && explained !== null && Math.abs(finalValue - explained) > 1e-6;
    ui.reliabilityShapSummary.textContent = `${reliabilityEntityLabel(first)} · baseline ${formatMetricValue(base)} + Σ SHAP = model output ${formatMetricValue(explained)} ${unit} · published forecast ${formatMetricValue(finalValue)}${clipped ? " (post-processed)" : ""}.`;
  } else {
    ui.reliabilityShapSummary.textContent = `${forecastKeys.size} production forecast${forecastKeys.size === 1 ? "" : "s"} · ${features.size} feature groups shown. Each point is one model contribution; the horizontal axis is in ${unit}.`;
  }

  const width = 1040;
  const rowHeight = 31;
  const height = Math.max(160, 94 + rankedFeatures.length * rowHeight);
  const margin = { top: 24, right: 32, bottom: 46, left: 275 };
  const maxAbs = Math.max(...displayedPoints.map((point) => Math.abs(safeNumber(point.shap_value) ?? 0)), 0);
  const domain = maxAbs > 0 ? maxAbs * 1.12 : 1;
  const plotWidth = width - margin.left - margin.right;
  const x = (value) => margin.left + ((value + domain) / (domain * 2)) * plotWidth;
  const zeroX = x(0);
  const svg = createSvg("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": `SHAP feature contributions for ${state.reliabilityScope} ${horizon}-year forecasts`,
  });
  svg.append(createSvg("line", {
    x1: zeroX, y1: margin.top - 4, x2: zeroX,
    y2: height - margin.bottom + 2, class: "reliability-shap-zero",
  }));
  svg.append(createSvg("line", {
    x1: margin.left, y1: height - margin.bottom,
    x2: width - margin.right, y2: height - margin.bottom, class: "reliability-axis",
  }));
  const axisLabel = createSvg("text", {
    x: width / 2, y: height - 10, "text-anchor": "middle", class: "reliability-chart-label",
  });
  axisLabel.textContent = `SHAP contribution (${unit}) · negative lowers forecast · positive raises forecast`;
  svg.append(axisLabel);

  rankedFeatures.forEach((feature, featureIndex) => {
    const centerY = margin.top + featureIndex * rowHeight + rowHeight / 2;
    const label = createSvg("text", {
      x: margin.left - 12, y: centerY + 4, "text-anchor": "end", class: "reliability-shap-feature",
    });
    label.textContent = feature.label.length > 38 ? `${feature.label.slice(0, 35)}…` : feature.label;
    const labelTitle = createSvg("title");
    labelTitle.textContent = feature.label;
    label.append(labelTitle);
    svg.append(label);
    feature.points.forEach((point, pointIndex) => {
      const value = safeNumber(point.shap_value) ?? 0;
      const jitter = selectedEntity === "all" ? ((pointIndex % 7) - 3) * 2.6 : 0;
      const marker = createSvg("circle", {
        cx: x(value), cy: centerY + jitter, r: selectedEntity === "all" ? 4.5 : 5.4,
        class: value < 0 ? "reliability-shap-point reliability-shap-point--negative" : "reliability-shap-point reliability-shap-point--positive",
      });
      const featureValue = point.city_identity_grouped
        ? "combined city indicator contribution"
        : `${formatMetricValue(point.feature_value, 3)}${point.feature_value_was_imputed ? " · median-imputed model input" : ""}`;
      const title = createSvg("title");
      title.textContent = `${reliabilityEntityLabel(point)} · ${feature.label} · input ${featureValue} · SHAP ${formatMetricValue(value, 4)} ${unit}`;
      marker.append(title);
      svg.append(marker);
    });
  });
  [-domain, 0, domain].forEach((value) => {
    const tick = createSvg("text", {
      x: x(value), y: height - margin.bottom + 17, "text-anchor": "middle", class: "reliability-chart-label",
    });
    tick.textContent = formatMetricValue(value, 2);
    svg.append(tick);
  });
  ui.reliabilityShapChart.append(svg);
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

function renderReliabilityEvaluationSummary() {
  ui.reliabilityEvaluationSummary.replaceChildren();
  if (!state.backtestEvaluationsAvailable) {
    const empty = document.createElement("p");
    empty.className = "methodology-empty";
    empty.textContent = "Evaluation provenance is not available from the protected view.";
    ui.reliabilityEvaluationSummary.append(empty);
    return;
  }
  const rows = state.backtestEvaluations.filter((row) => row.level === state.reliabilityScope);
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "methodology-empty";
    empty.textContent = `No evaluation provenance is published for the ${state.reliabilityScope} scope.`;
    ui.reliabilityEvaluationSummary.append(empty);
    return;
  }
  rows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "reliability-evaluation-card";
    const heading = document.createElement("div");
    heading.className = "reliability-evaluation-card__heading";
    const target = document.createElement("strong");
    target.textContent = row.target_variable || "Target variable not published";
    const level = document.createElement("span");
    level.textContent = row.level === "country" ? "Country" : "City";
    heading.append(target, level);

    const counts = document.createElement("p");
    counts.className = "reliability-evaluation-card__counts";
    counts.textContent = `${formatNumber(row.evaluated_rows)} evaluated / ${formatNumber(row.source_rows)} source rows · ${formatNumber(row.excluded_rows)} excluded`;

    const artifact = document.createElement("p");
    artifact.className = "reliability-evaluation-card__artifact";
    artifact.textContent = row.source_artifact || "Source artifact not published";

    const selection = document.createElement("p");
    selection.className = "analysis-note";
    selection.textContent = `Selection rule: ${row.selection_rule || "Not published"}`;

    const provenance = document.createElement("small");
    const scopeLabel = row.validation_scope === "same_model_selection_backtest_not_independent_holdout"
      ? "Model-selection backtest · not an independent holdout"
      : row.validation_scope || "Validation scope not published";
    const imported = row.imported_at && Number.isFinite(Date.parse(row.imported_at))
      ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(row.imported_at)) + " UTC"
      : "Import time not published";
    const hashPrefix = String(row.source_sha256 ?? "").slice(0, 12);
    provenance.textContent = `${scopeLabel} · imported ${imported}${hashPrefix ? ` · source SHA-256 ${hashPrefix}…` : ""}`;
    if (row.source_sha256) provenance.title = `Full source SHA-256: ${row.source_sha256}`;

    card.append(heading, counts, artifact, selection, provenance);
    ui.reliabilityEvaluationSummary.append(card);
  });
}

function renderForecastReliability() {
  if (!state.initialized) return;
  ui.reliabilityCountryScope.setAttribute("aria-pressed", String(state.reliabilityScope === "country"));
  ui.reliabilityCityScope.setAttribute("aria-pressed", String(state.reliabilityScope === "city"));
  populateReliabilityFilters();
  renderReliabilityHorizonCards();
  renderReliabilityMetricStatus();
  renderReliabilityEvaluationSummary();
  renderReliabilityScatter();
  renderReliabilityBacktestTimeline();
  renderReliabilityModelProcess();
  renderReliabilityShap();
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
  renderSummaryItems(document.querySelector("#countrySummary"), buildCountrySummary(country));
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
      ? `${country.name} · persons per year${forecastModelLabel(row) ? ` · ${modelDisplayName(forecastModelLabel(row))}` : ""}`
      : row ? "No valid forecast for this horizon" : "No forecast in the latest Country view";
    card.append(heading, target, value, note);
    ui.countryForecastCards.append(card);
  });
}

function modelDisplayName(modelId) {
  const names = { M0_PERSISTENCE: "Repeats the last value", M0_DRIFT: "Linear drift", M0_RIDGE_AR: "Autoregressive (ridge)" };
  return names[modelId] ? `${names[modelId]} · ${modelId}` : modelId;
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
  const rows = state.backtestViewsAvailable
    ? state.backtestEntityMetrics
      .filter((row) => row.level === "country" && String(row.entity_id) === String(state.selectedCountry))
      .filter((row) => safeNumber(row.mae) !== null && safeNumber(row.wape_pct) !== null)
      .sort((a, b) => safeNumber(a.horizon) - safeNumber(b.horizon))
    : [];
  const unavailable = state.backtestViewsAvailable ? "Not available" : "Unavailable";
  ui.countryReliabilityMae.textContent = rows.length
    ? rows.map((row) => `${safeNumber(row.horizon)}y ${formatMetricValue(row.mae)}`).join(" · ")
    : unavailable;
  ui.countryReliabilityWape.textContent = rows.length
    ? rows.map((row) => `${safeNumber(row.horizon)}y ${formatMetricValue(row.wape_pct, 1)}%`).join(" · ")
    : unavailable;
  ui.countryReliabilityN.textContent = rows.length
    ? rows.map((row) => `${safeNumber(row.horizon)}y ${formatNumber(row.n_observations)}/${formatNumber(row.n_folds)}`).join(" · ")
    : unavailable;
  const naiveParts = [1, 3, 5].map((horizon) => ({ horizon, result: naiveBaselineComparison({ level: "country", horizon, entityId: state.selectedCountry }) }))
    .filter((item) => item.result);
  ui.countryReliabilityNaive.textContent = naiveParts.length
    ? naiveParts.map(({ horizon, result }) => `${horizon}y ${result.verdict === "naive" ? "naive" : result.verdict === "similar" ? "≈" : `${result.improvement > 0 ? "−" : "+"}${Math.round(Math.abs(result.improvement) * 100)}%`}`).join(" · ")
    : unavailable;
  ui.countryReliabilityNaiveNote.textContent = naiveParts.length
    ? `Error change vs. repeating the last observed value (− is better). ${naiveParts.some((item) => item.result.smallSample) ? "Small samples: read with caution." : ""}`
    : "Compared with repeating the last observed value";
  ui.countryReliabilityNote.textContent = rows.length
    ? `Selection-backtest diagnostics for ${countryById(state.selectedCountry)?.name ?? state.selectedCountry}; pairs / folds by horizon. These are not independent holdout results. Production model${models.length === 1 ? "" : "s"}: ${models.join(", ") || "not published"}.`
    : state.backtestViewsAvailable
      ? `No verified country-level backtest metric is published for ${countryById(state.selectedCountry)?.name ?? "this selection"}. ${models.length ? `Production model${models.length === 1 ? "" : "s"}: ${models.join(", ")}.` : ""}`
      : "Protected backtest views could not be loaded; production forecasts remain available.";
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
  const cityNaive = city ? [1, 3].map((horizon) => ({ horizon, result: naiveBaselineComparison({ level: "city", horizon, entityId: city.id, countryIso2: city.countryId }) }))
    .filter((item) => item.result) : [];
  ui.cityReliabilityNaive.textContent = cityNaive.length
    ? cityNaive.map(({ horizon, result }) => `${horizon}y ${result.verdict === "naive" ? "naive" : result.verdict === "similar" ? "≈" : `${result.improvement > 0 ? "−" : "+"}${Math.round(Math.abs(result.improvement) * 100)}%`}`).join(" · ")
    : emptyValue;
  ui.cityReliabilityNaiveNote.textContent = cityNaive.length
    ? `Error change vs. repeating the last observed value (− is better). ${cityNaive.some((item) => item.result.smallSample) ? "Small samples: read with caution." : ""}`
    : "Compared with repeating the last observed value";
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
  renderSummaryItems(document.querySelector("#citySummary"), buildCitySummary(city, observations, forecasts, cachedCityContext ?? []));
  if (!cachedCityContext) {
    loadContextRows("city", city.id, city.countryId).then((contextRows) => {
      if (state.selectedCity === city.id && state.selectedCountry === city.countryId) {
        renderCityProfile(city, observations, forecasts, contextRows);
        renderSummaryItems(document.querySelector("#citySummary"), buildCitySummary(city, observations, forecasts, contextRows));
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

const MAP_DATA_URL = "assets/europe-countries.geojson";

// Natural Earth 5.1.2 populated-place points (Admin-0 capitals; WGS84 [longitude, latitude]).
const EUROPEAN_CAPITALS = [
  ["ALB", "Tirana", 19.818883, 41.327541], ["AND", "Andorra la Vella", 1.526594, 42.510753],
  ["ARM", "Yerevan", 44.511606, 40.183097], ["AUT", "Vienna", 16.364693, 48.201961],
  ["AZE", "Baku", 49.860271, 40.397218], ["BEL", "Brussels", 4.331371, 50.835263], ["BGR", "Sofia", 23.314708, 42.685295],
  ["BIH", "Sarajevo", 18.383002, 43.850022], ["BLR", "Minsk", 27.564681, 53.901923],
  ["CHE", "Bern", 7.466976, 46.916683], ["CYP", "Nicosia", 33.366635, 35.166677],
  ["CZE", "Prague", 14.422939, 50.086967], ["DEU", "Berlin", 13.399603, 52.523764],
  ["DNK", "Copenhagen", 12.56154, 55.68051], ["ESP", "Madrid", -3.685297, 40.401972],
  ["EST", "Tallinn", 24.728041, 59.433877], ["FIN", "Helsinki", 24.932457, 60.163804],
  ["FRA", "Paris", 2.352992, 48.858092], ["GBR", "London", -0.118668, 51.501941],
  ["GEO", "Tbilisi", 44.78885, 41.726956], ["GRC", "Athens", 23.731375, 37.985272],
  ["HRV", "Zagreb", 15.999995, 45.800007], ["HUN", "Budapest", 19.081375, 47.501952],
  ["IRL", "Dublin", -6.25698, 53.346731], ["ISL", "Reykjavik", -21.936546, 64.143459],
  ["ITA", "Rome", 12.481313, 41.897902], ["KOS", "Pristina", 21.165984, 42.66671],
  ["LIE", "Vaduz", 9.51667, 47.133724], ["LTU", "Vilnius", 25.316635, 54.683366],
  ["LUX", "Luxembourg", 6.130003, 49.61166], ["LVA", "Riga", 24.099965, 56.950024],
  ["MCO", "Monaco", 7.406913, 43.739646], ["MDA", "Chisinau", 28.857711, 47.005024],
  ["MKD", "Skopje", 21.433461, 42.000006], ["MLT", "Valletta", 14.514711, 35.899732],
  ["MNE", "Podgorica", 19.266307, 42.465972], ["NLD", "Amsterdam", 4.914694, 52.351914],
  ["NOR", "Oslo", 10.748033, 59.918636], ["POL", "Warsaw", 21.005347, 52.230872],
  ["PRT", "Lisbon", -9.146812, 38.724669], ["ROU", "Bucharest", 26.098001, 44.435318],
  ["RUS", "Moscow", 37.613577, 55.75411], ["SMR", "San Marino", 12.44177, 43.936096],
  ["SRB", "Belgrade", 20.466045, 44.820591], ["SVK", "Bratislava", 17.116981, 48.150018],
  ["SVN", "Ljubljana", 14.514969, 46.055288], ["SWE", "Stockholm", 18.0663, 59.324127],
  ["TUR", "Ankara", 32.862446, 39.929184], ["UKR", "Kyiv", 30.514682, 50.435313],
  ["VAT", "Vatican City", 12.453387, 41.903282],
];

// City Intelligence production rows have no coordinate fields. These map points use Natural Earth 10m
// populated-place references and are intentionally separate from the Supabase data payload.
const CITY_MAP_LOCATIONS = new Map([
  ["ES::Barcelona", [2.181424, 41.385245]], ["ES::Madrid", [-3.685297, 40.401972]],
  ["ES::Málaga", [-4.419999, 36.720406]], ["ES::Sevilla", [-5.980007, 37.405015]],
  ["ES::València", [-0.401958, 39.486963]], ["ES::Zaragoza", [-0.889982, 41.650002]],
  ["IT::Milano", [9.203063, 45.471921]], ["IT::Torino", [7.668015, 45.072333]],
  ["IT::Roma", [12.481313, 41.897902]], ["IT::Genova", [8.930039, 44.409988]],
  ["IT::Napoli", [14.243066, 40.841971]], ["IT::Palermo", [13.348081, 38.126969]],
]);

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

function mapMeasureIsSequential() {
  return ui.mapMeasure.value === "value" || ui.mapMeasure.value === "perThousand";
}

function mapNumber(value) {
  return ui.mapMeasure.value === "perThousand" ? value.toFixed(2) : numberFormatter.format(value);
}

function mapMetricLabel() {
  if (ui.mapMeasure.value === "perThousand") return "immigrants per 1,000 residents";
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
  if (!mapMeasureIsSequential()) {
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
  legendStart.textContent = values.length ? mapNumber(domain[0]) : "Not available";
  const legendBar = document.createElement("i");
  legendBar.className = `map-legend__bar${!mapMeasureIsSequential() ? " is-diverging" : ""}`;
  const legendEnd = document.createElement("span");
  legendEnd.textContent = values.length ? mapNumber(domain[1]) : "Not available";
  const noData = document.createElement("span");
  noData.className = "map-legend__nodata";
  noData.innerHTML = '<i aria-hidden="true"></i>No data';
  ui.mapLegend.append(legendStart, legendBar, legendEnd, noData);
  ui.mapLegend.setAttribute("aria-label", `Legend in ${mapMetricLabel()}`);

  ui.mapRoot.replaceChildren();
  const svg = createSvg("svg", { viewBox: `0 0 ${width} ${height}`, role: "group", "aria-label": `European immigration map for ${state.selectedYear}` });
  svg.classList.add("map-svg");
  if (state.mapZoomStep > 0) svg.classList.add("is-pannable");
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
      "aria-label": country ? `${name}: ${value === null ? "no data" : mapNumber(value)} ${mapMetricLabel()}` : `${name}: not in current data scope`,
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
      countryPath.addEventListener("pointermove", positionMapTooltip);
      countryPath.addEventListener("pointerleave", hideMapTooltipWhenLeavingTarget);
    }
    const title = createSvg("title");
    title.textContent = `${name} · ${value === null ? "No data" : numberFormatter.format(value)} ${mapMetricLabel()}`;
    countryPath.append(title);
    layer.append(countryPath);
  });
  if (state.mapZoomStep >= 3) appendMapPlaceMarkers(layer, projection);
  svg.append(layer);
  wireMapPanning(svg, layer, width, height);
  ui.mapRoot.append(svg);
}

function appendMapPlaceMarkers(layer, projection) {
  const featureForCode = new Map(state.mapFeatures.map((feature) => [mapFeatureCode(feature), feature]).filter(([code]) => code));
  const capitals = createSvg("g", { class: "map-marker-layer map-marker-layer--capitals", "aria-label": "European capital locations" });
  EUROPEAN_CAPITALS.forEach(([code, name, longitude, latitude]) => {
    if (!featureForCode.has(code)) return;
    const [x, y] = projection([longitude, latitude]);
    const marker = createSvg("g", { class: "map-marker map-marker--capital", transform: mapMarkerScreenSizeTransform(x, y), tabindex: "0", role: "img", "aria-label": `${name}, capital` });
    marker.append(createSvg("circle", { cx: x, cy: y, r: 6.2 / 3, class: "map-marker__capital-dot", "vector-effect": "non-scaling-stroke" }));
    marker.addEventListener("pointerenter", (event) => showMapPlaceTooltip(event, { name, kind: "capital" }));
    marker.addEventListener("pointermove", positionMapTooltip);
    marker.addEventListener("pointerleave", hideMapTooltipWhenLeavingTarget);
    marker.addEventListener("focus", () => showMapPlaceTooltipForElement(marker, { name, kind: "capital" }));
    marker.addEventListener("blur", hideMapTooltipWhenLeavingTarget);
    capitals.append(marker);
  });
  layer.append(capitals);

  const cities = cityRecordsAcrossCountries().cities;
  const cityMarkers = createSvg("g", { class: "map-marker-layer map-marker-layer--cities", "aria-label": "Production cities with City Intelligence details" });
  cities.forEach((city) => {
    const coordinates = CITY_MAP_LOCATIONS.get(city.key);
    if (!coordinates) return;
    const [x, y] = projection(coordinates);
    const marker = createSvg("g", { class: "map-marker map-marker--city", transform: mapMarkerScreenSizeTransform(x, y), tabindex: "0", role: "link", "aria-label": `${city.name} · click or press Enter to open City Intelligence` });
    marker.append(
      createSvg("circle", { cx: x, cy: y, r: 5, class: "map-marker__hit-area" }),
      createSvg("circle", { cx: x, cy: y, r: 11 / 3, class: "map-marker__city-halo", "vector-effect": "non-scaling-stroke" }),
      createSvg("circle", { cx: x, cy: y, r: 6 / 3, class: "map-marker__city-dot", "vector-effect": "non-scaling-stroke" }),
    );
    marker.addEventListener("pointerenter", (event) => showMapPlaceTooltip(event, { name: city.name, kind: "city", city }));
    marker.addEventListener("pointermove", positionMapTooltip);
    marker.addEventListener("pointerleave", hideMapTooltipWhenLeavingTarget);
    marker.addEventListener("focus", () => showMapPlaceTooltipForElement(marker, { name: city.name, kind: "city", city }));
    marker.addEventListener("blur", hideMapTooltipWhenLeavingTarget);
    marker.addEventListener("click", (event) => {
      event.stopPropagation();
      navigateToCity(city);
    });
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToCity(city);
      }
    });
    cityMarkers.append(marker);
  });
  layer.append(cityMarkers);
}

function mapFeatureCode(feature) {
  const properties = feature.properties ?? {};
  return [properties.ADM0_A3, properties.ISO_A3, properties.ISO_A3_EH]
    .find((code) => code && code !== "-99") ?? null;
}

function mapMarkerScreenSizeTransform(x, y) {
  const inverseZoom = 1 / Math.max(state.mapZoom, 1);
  return `translate(${x} ${y}) scale(${inverseZoom}) translate(${-x} ${-y})`;
}

function mapZoomTransform(width, height) {
  const offsetX = width * (1 - state.mapZoom) / 2;
  const offsetY = height * (1 - state.mapZoom) / 2;
  return `translate(${offsetX + state.mapPanX} ${offsetY + state.mapPanY}) scale(${state.mapZoom})`;
}

function setMapZoomStep(step) {
  const zoomLevels = [1, 1.35, 1.75, 2.25, 2.8];
  state.mapZoomStep = Math.min(Math.max(step, 0), zoomLevels.length - 1);
  state.mapZoom = zoomLevels[state.mapZoomStep];
  clampMapPan(690, 370);
  ui.mapZoomOut.disabled = state.mapZoomStep === 0;
  ui.mapZoomIn.disabled = state.mapZoomStep === zoomLevels.length - 1;
  [ui.mapPanUp, ui.mapPanRight, ui.mapPanDown, ui.mapPanLeft].forEach((button) => { button.disabled = state.mapZoomStep === 0; });
  renderMap();
}

function resetMapView() {
  state.mapZoomStep = 0;
  state.mapZoom = 1;
  state.mapPanX = 0;
  state.mapPanY = 0;
  ui.mapZoomOut.disabled = true;
  ui.mapZoomIn.disabled = false;
  [ui.mapPanUp, ui.mapPanRight, ui.mapPanDown, ui.mapPanLeft].forEach((button) => { button.disabled = true; });
  ui.mapTooltip.hidden = true;
  renderMap();
}

function clampMapPan(width, height) {
  const maxX = width * (state.mapZoom - 1) / 2;
  const maxY = height * (state.mapZoom - 1) / 2;
  state.mapPanX = Math.max(-maxX, Math.min(maxX, state.mapPanX));
  state.mapPanY = Math.max(-maxY, Math.min(maxY, state.mapPanY));
}

function panMapBy(deltaX, deltaY) {
  state.mapPanX += deltaX;
  state.mapPanY += deltaY;
  clampMapPan(690, 370);
  renderMap();
}

function wireMapPanning(svg, layer, width, height) {
  svg.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || state.mapZoomStep === 0) return;
    if (event.target.closest?.(".map-marker")) return;
    const point = mapPointerPosition(event, svg);
    state.mapDrag = { pointerId: event.pointerId, x: point.x, y: point.y, panX: state.mapPanX, panY: state.mapPanY, moved: false };
    svg.classList.add("is-panning");
    svg.setPointerCapture(event.pointerId);
  });
  svg.addEventListener("pointermove", (event) => {
    if (!state.mapDrag || state.mapDrag.pointerId !== event.pointerId) return;
    const point = mapPointerPosition(event, svg);
    const deltaX = point.x - state.mapDrag.x;
    const deltaY = point.y - state.mapDrag.y;
    if (Math.hypot(deltaX, deltaY) > 3) state.mapDrag.moved = true;
    if (!state.mapDrag.moved) return;
    state.mapPanX = state.mapDrag.panX + deltaX;
    state.mapPanY = state.mapDrag.panY + deltaY;
    clampMapPan(width, height);
    layer.setAttribute("transform", mapZoomTransform(width, height));
    ui.mapTooltip.hidden = true;
  });
  svg.addEventListener("pointerup", (event) => {
    if (!state.mapDrag || state.mapDrag.pointerId !== event.pointerId) return;
    state.mapSuppressClick = state.mapDrag.moved;
    state.mapDrag = null;
    svg.classList.remove("is-panning");
  });
  svg.addEventListener("pointercancel", () => {
    state.mapDrag = null;
    state.mapSuppressClick = false;
    svg.classList.remove("is-panning");
  });
  svg.addEventListener("click", (event) => {
    if (!state.mapSuppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    state.mapSuppressClick = false;
  }, true);
}

function mapPointerPosition(event, svg) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const local = point.matrixTransform(svg.getScreenCTM().inverse());
  return { x: local.x, y: local.y };
}

function showMapPlaceTooltip(event, place) {
  ui.mapTooltip.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = place.name;
  ui.mapTooltip.append(title);
  if (place.kind === "city") {
    const action = document.createElement("small");
    action.textContent = "Click the marker to open City Intelligence";
    ui.mapTooltip.append(action);
  }
  ui.mapTooltip.hidden = false;
  positionMapTooltip(event);
}

function showMapPlaceTooltipForElement(element, place) {
  const bounds = element.getBoundingClientRect();
  showMapPlaceTooltip({ clientX: bounds.left + bounds.width / 2, clientY: bounds.top + bounds.height / 2 }, place);
}

function hideMapTooltipWhenLeavingTarget(event) {
  if (event.relatedTarget && ui.mapTooltip.contains(event.relatedTarget)) return;
  ui.mapTooltip.hidden = true;
}

function cityIntelligenceHref(city) {
  const url = new URL(window.location.href);
  url.searchParams.set("country", city.countryId);
  url.searchParams.set("city", city.id);
  url.hash = "#city-intelligence";
  return `${url.pathname}${url.search}${url.hash}`;
}

function navigateToCity(city) {
  window.location.href = cityIntelligenceHref(city);
}

function selectCountry(countryId) {
  if (state.selectedCountry !== countryId) resetContextScatterZoom();
  if (state.selectedCountry !== countryId) {
    state.selectedCity = null;
    updateCityQuery(null);
  }
  state.selectedCountry = countryId;
  ui.mapCountrySelect.value = countryId;
  ui.intelligenceCountrySelect.value = countryId;
  const country = countryById(countryId);
  ui.countrySearch.value = country?.name ?? "";
  updateCountryQuery();
  renderOutlook();
  renderCountryIntelligence();
  if (state.activePage === "migration-context") {
    renderMigrationHistoryChart();
    renderContextScatter();
  }
  if (state.activePage === "social-impact") renderEurostatSocialImpact();
}

function showMapTooltip(event, name, point, value) {
  ui.mapTooltip.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = name;
  const detail = document.createElement("span");
  detail.textContent = value === null ? "No data for this year" : `${mapNumber(value)} ${mapMetricLabel()}`;
  const stateLabel = document.createElement("small");
  stateLabel.textContent = point?.type === "forecast" ? "Forecast" : point?.type === "observed" ? "Observed" : "Not available";
  ui.mapTooltip.append(title, detail, stateLabel);
  ui.mapTooltip.hidden = false;
  positionMapTooltip(event);
}

function positionMapTooltip(event) {
  const bounds = ui.mapRoot.parentElement.getBoundingClientRect();
  const tooltip = ui.mapTooltip.getBoundingClientRect();
  const maxLeft = Math.max(8, bounds.width - tooltip.width - 8);
  const maxTop = Math.max(8, bounds.height - tooltip.height - 8);
  ui.mapTooltip.style.left = `${Math.min(Math.max(event.clientX - bounds.left + 12, 8), maxLeft)}px`;
  ui.mapTooltip.style.top = `${Math.min(Math.max(event.clientY - bounds.top - tooltip.height - 9, 8), maxTop)}px`;
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
    value.textContent = ui.mapMeasure.value === "percent" ? percentFormatter.format(row.value) : ui.mapMeasure.value === "perThousand" ? row.value.toFixed(2) : formatNumber(row.value);
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
    ? { title: "Cross-country view", value: topSelected.name, detail: `Highest available value in ${state.selectedYear}: ${ui.mapMeasure.value === "percent" ? percentFormatter.format(topSelected.value) : ui.mapMeasure.value === "perThousand" ? topSelected.value.toFixed(2) : formatNumber(topSelected.value)} ${mapMetricLabel()}.` }
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
    setMessage(ui.authMessage, "The session could not be validated. Reload the page.", "error");
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
