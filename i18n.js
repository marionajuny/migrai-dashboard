/* Language selector for the public website (landing, plans, team, checkout).
   The dashboard (acceso.html) is intentionally English-only and does not load this file.
   The HTML source is Spanish; each Spanish string maps to [English, French]. English is the default. */
(function () {
  const LANGS = ["en", "es", "fr"];
  const LABELS = { en: "EN", es: "ES", fr: "FR" };
  const DICT = {
    "migrAI — Inteligencia migratoria": ["migrAI — Migration intelligence", "migrAI — Intelligence migratoire"],
    "Producto": ["Product", "Produit"],
    "Planes": ["Plans", "Offres"],
    "Equipo": ["Team", "Équipe"],
    "Acceso privado": ["Private access", "Accès privé"],
    "Inteligencia migratoria · Europa": ["Migration intelligence · Europe", "Intelligence migratoire · Europe"],
    "Leer el presente.": ["Read the present.", "Lire le présent."],
    "Anticipar el movimiento.": ["Anticipate the movement.", "Anticiper le mouvement."],
    "migrAI convierte datos de migración y señales contextuales en previsiones territoriales que ayudan a planificar servicios, ciudades y oportunidades con más perspectiva.": [
      "migrAI turns migration data and contextual signals into territorial forecasts that help plan services, cities and opportunities with more perspective.",
      "migrAI transforme les données migratoires et les signaux contextuels en prévisions territoriales qui aident à planifier services, villes et opportunités avec plus de recul."],
    "Explorar planes": ["Explore plans", "Découvrir les offres"],
    "Conoce cómo funciona": ["See how it works", "Découvrir le fonctionnement"],
    "Datos observados y previstos": ["Observed and forecast data", "Données observées et prévues"],
    "Lectura por país y ciudad": ["Country and city view", "Lecture par pays et par ville"],
    "Intervalos de incertidumbre": ["Uncertainty intervals", "Intervalles d'incertitude"],
    "Del dato a la decisión": ["From data to decision", "De la donnée à la décision"],
    "Señales conectadas, lectura territorial": ["Connected signals, territorial reading", "Signaux connectés, lecture territoriale"],
    "Una cadena de valor transparente": ["A transparent value chain", "Une chaîne de valeur transparente"],
    "Del dato disperso a": ["From scattered data to", "Des données dispersées à"],
    "una visión conectada.": ["a connected view.", "une vision connectée."],
    "Combinamos fuentes demográficas y señales contextuales para ofrecer una lectura clara, comparable y preparada para explorar.": [
      "We combine demographic sources and contextual signals to offer a clear, comparable view that is ready to explore.",
      "Nous combinons sources démographiques et signaux contextuels pour offrir une lecture claire, comparable et prête à explorer."],
    "01 — FUENTES": ["01 — SOURCES", "01 — SOURCES"],
    "Contexto con fundamento": ["Well-founded context", "Un contexte solide"],
    "Datos de migración y asilo de Eurostat, indicadores contextuales de GDELT y referencias estadísticas del INE.": [
      "Migration and asylum data from Eurostat, contextual indicators from GDELT and statistical references from INE.",
      "Données de migration et d'asile d'Eurostat, indicateurs contextuels de GDELT et références statistiques de l'INE."],
    "02 — PREPARACIÓN": ["02 — PREPARATION", "02 — PRÉPARATION"],
    "Datos listos para analizar": ["Data ready to analyse", "Des données prêtes à analyser"],
    "El pipeline organiza, limpia y valida la información; trata duplicados y valores ausentes antes de generar resultados.": [
      "The pipeline organises, cleans and validates the information; it handles duplicates and missing values before producing results.",
      "Le pipeline organise, nettoie et valide l'information ; il traite les doublons et les valeurs manquantes avant de produire des résultats."],
    "VALIDACIÓN": ["VALIDATION", "VALIDATION"],
    "CALIDAD": ["QUALITY", "QUALITÉ"],
    "TRAZABILIDAD": ["TRACEABILITY", "TRAÇABILITÉ"],
    "03 — EXPLORACIÓN": ["03 — EXPLORATION", "03 — EXPLORATION"],
    "Una lectura accionable": ["An actionable reading", "Une lecture exploitable"],
    "Explora observaciones, previsiones, horizontes e intervalos de incertidumbre desde un dashboard privado.": [
      "Explore observations, forecasts, horizons and uncertainty intervals from a private dashboard.",
      "Explorez observations, prévisions, horizons et intervalles d'incertitude depuis un tableau de bord privé."],
    "PAÍSES": ["COUNTRIES", "PAYS"],
    "CIUDADES": ["CITIES", "VILLES"],
    "HORIZONTES": ["HORIZONS", "HORIZONS"],
    "Pensado para anticipar necesidades": ["Designed to anticipate needs", "Conçu pour anticiper les besoins"],
    "Planificar mejor empieza": ["Better planning starts", "Mieux planifier commence"],
    "por hacer mejores preguntas.": ["by asking better questions.", "par de meilleures questions."],
    "Una herramienta de análisis para explorar proyecciones y poner los cambios territoriales en contexto. No sustituye el criterio experto: lo acompaña.": [
      "An analysis tool to explore projections and put territorial change in context. It does not replace expert judgement: it supports it.",
      "Un outil d'analyse pour explorer des projections et replacer les changements territoriaux dans leur contexte. Il ne remplace pas l'expertise : il l'accompagne."],
    "Planificación urbana": ["Urban planning", "Planification urbaine"],
    "Explora cómo pueden evolucionar las necesidades de vivienda, movilidad y servicios en distintos territorios.": [
      "Explore how housing, mobility and service needs may evolve across territories.",
      "Explorez comment les besoins en logement, mobilité et services peuvent évoluer selon les territoires."],
    "Capacidad de servicios": ["Service capacity", "Capacité des services"],
    "Contrasta señales y previsiones para apoyar conversaciones sobre educación, salud e integración.": [
      "Compare signals and forecasts to support conversations about education, health and integration.",
      "Confrontez signaux et prévisions pour nourrir les échanges sur l'éducation, la santé et l'intégration."],
    "Análisis territorial": ["Territorial analysis", "Analyse territoriale"],
    "Compara niveles geográficos y horizontes para entender tendencias y plantear escenarios de trabajo.": [
      "Compare geographic levels and horizons to understand trends and frame working scenarios.",
      "Comparez niveaux géographiques et horizons pour comprendre les tendances et construire des scénarios de travail."],
    "Contexto para inversión": ["Context for investment", "Contexte pour l'investissement"],
    "Añade una perspectiva demográfica de largo plazo a la evaluación de mercados y activos urbanos.": [
      "Add a long-term demographic perspective to the assessment of urban markets and assets.",
      "Ajoutez une perspective démographique de long terme à l'évaluation des marchés et des actifs urbains."],
    "Los resultados son estimaciones analíticas y deben interpretarse junto con otras fuentes y conocimiento local.": [
      "Results are analytical estimates and should be interpreted alongside other sources and local knowledge.",
      "Les résultats sont des estimations analytiques et doivent être interprétés avec d'autres sources et la connaissance du terrain."],
    "Siguiente paso": ["Next step", "Étape suivante"],
    "Encuentra la cobertura": ["Find the coverage", "Trouvez la couverture"],
    "que encaja con tu análisis.": ["that fits your analysis.", "qui correspond à votre analyse."],
    "Ver opciones de acceso": ["See access options", "Voir les options d'accès"],
    "Inteligencia migratoria para entender el cambio y planificar con perspectiva.": [
      "Migration intelligence to understand change and plan with perspective.",
      "Intelligence migratoire pour comprendre le changement et planifier avec recul."],
    "Datos para una planificación con perspectiva.": ["Data for planning with perspective.", "Des données pour planifier avec recul."],
    "Planes de acceso · migrAI": ["Access plans · migrAI", "Offres d'accès · migrAI"],
    "Acceso a migrAI": ["Access to migrAI", "Accès à migrAI"],
    "La cobertura adecuada": ["The right coverage", "La bonne couverture"],
    "para cada análisis.": ["for every analysis.", "pour chaque analyse."],
    "Elige una cobertura por territorio. Nuestro equipo puede orientarte sobre el alcance disponible y la mejor forma de incorporar migrAI a tu trabajo.": [
      "Choose coverage by territory. Our team can guide you on the scope available and the best way to bring migrAI into your work.",
      "Choisissez une couverture par territoire. Notre équipe peut vous orienter sur le périmètre disponible et la meilleure façon d'intégrer migrAI à votre travail."],
    "Acceso privado · Alta de usuarios por invitación": ["Private access · Users are added by invitation", "Accès privé · Création des utilisateurs sur invitation"],
    "COBERTURA FOCALIZADA": ["FOCUSED COVERAGE", "COUVERTURE CIBLÉE"],
    "Esencial": ["Essential", "Essentiel"],
    "Una mirada profunda a un país seleccionado.": ["A deep look at one selected country.", "Un regard approfondi sur un pays choisi."],
    "A consultar": ["On request", "Sur demande"],
    "según cobertura y necesidades": ["depending on coverage and needs", "selon la couverture et les besoins"],
    "Un país de la cobertura disponible": ["One country from the available coverage", "Un pays parmi la couverture disponible"],
    "Histórico observado y previsiones": ["Observed history and forecasts", "Historique observé et prévisions"],
    "Acceso privado al dashboard": ["Private dashboard access", "Accès privé au tableau de bord"],
    "Solicitar plan Esencial": ["Request the Essential plan", "Demander l'offre Essentiel"],
    "Checkout de demostración · sin cobro": ["Demo checkout · no charge", "Paiement de démonstration · sans facturation"],
    "MÁXIMA COBERTURA": ["MAXIMUM COVERAGE", "COUVERTURE MAXIMALE"],
    "ANÁLISIS MULTITERRITORIO": ["MULTI-TERRITORY ANALYSIS", "ANALYSE MULTI-TERRITOIRES"],
    "Completo": ["Complete", "Complet"],
    "Todos los países incluidos en el estudio.": ["All the countries included in the study.", "Tous les pays inclus dans l'étude."],
    "propuesta según alcance": ["proposal depending on scope", "proposition selon le périmètre"],
    "Todos los países analizados": ["All analysed countries", "Tous les pays analysés"],
    "Comparación entre territorios": ["Comparison across territories", "Comparaison entre territoires"],
    "Histórico y previsiones disponibles": ["Available history and forecasts", "Historique et prévisions disponibles"],
    "Acceso privado para usuarios invitados": ["Private access for invited users", "Accès privé pour les utilisateurs invités"],
    "Solicitar plan Completo": ["Request the Complete plan", "Demander l'offre Complet"],
    "¿No sabes cuál elegir?": ["Not sure which to choose?", "Vous ne savez pas laquelle choisir ?"],
    "Hablemos de tu cobertura.": ["Let's talk about your coverage.", "Parlons de votre couverture."],
    "Contacta con el equipo para valorar qué plan se adapta mejor a tu análisis y a los territorios que necesitas explorar.": [
      "Contact the team to work out which plan best fits your analysis and the territories you need to explore.",
      "Contactez l'équipe pour déterminer quelle offre convient le mieux à votre analyse et aux territoires que vous souhaitez explorer."],
    "Conocer al equipo": ["Meet the team", "Rencontrer l'équipe"],
    "Nota: esta web es una demostración. Los botones abren una pantalla informativa; no hay pasarela de pago conectada, no se procesan cargos y la selección de un plan no crea una cuenta ni concede acceso. Las credenciales del dashboard se emiten por invitación.": [
      "Note: this website is a demonstration. The buttons open an information screen; no payment gateway is connected, no charges are processed and choosing a plan does not create an account or grant access. Dashboard credentials are issued by invitation.",
      "Remarque : ce site est une démonstration. Les boutons ouvrent un écran d'information ; aucune passerelle de paiement n'est connectée, aucun débit n'est effectué et le choix d'une offre ne crée pas de compte ni n'accorde d'accès. Les identifiants du tableau de bord sont délivrés sur invitation."],
    "Equipo · migrAI": ["Team · migrAI", "Équipe · migrAI"],
    "El equipo fundador": ["The founding team", "L'équipe fondatrice"],
    "Datos con contexto.": ["Data with context.", "Des données avec du contexte."],
    "Perspectivas que conectan.": ["Perspectives that connect.", "Des perspectives qui relient."],
    "En migrAI combinamos ciencia de datos, tecnología y estrategia de producto para convertir información compleja en perspectivas útiles para quienes planifican ciudades y territorios.": [
      "At migrAI we combine data science, technology and product strategy to turn complex information into useful perspectives for those who plan cities and territories.",
      "Chez migrAI, nous associons science des données, technologie et stratégie produit pour transformer une information complexe en perspectives utiles à celles et ceux qui planifient villes et territoires."],
    "Cofundadora y Directora de Datos (CDO)": ["Co-founder and Chief Data Officer (CDO)", "Cofondatrice et directrice des données (CDO)"],
    "Graduada en Matemáticas y Administración y Dirección de Empresas por la Universidad de Barcelona, y con un máster en Data Science and Engineering por la UPC. Cuenta con experiencia profesional en análisis y gobierno del dato en empresas como Allianz, Grupo Planeta y KPMG. En migrAI lidera la estrategia de datos, el desarrollo de modelos predictivos y la calidad analítica, garantizando que la información se transforme en predicciones rigurosas y conocimiento útil para la toma de decisiones.": [
      "Graduate in Mathematics and Business Administration from the University of Barcelona, with a master's degree in Data Science and Engineering from UPC. She has professional experience in data analysis and governance at companies such as Allianz, Grupo Planeta and KPMG. At migrAI she leads data strategy, predictive model development and analytical quality, ensuring information becomes rigorous predictions and knowledge that is useful for decision-making.",
      "Diplômée en mathématiques et en administration des entreprises de l'Université de Barcelone, avec un master en Data Science and Engineering de l'UPC. Elle a une expérience en analyse et gouvernance des données chez Allianz, Grupo Planeta et KPMG. Chez migrAI, elle dirige la stratégie des données, le développement des modèles prédictifs et la qualité analytique, afin que l'information devienne des prévisions rigoureuses et une connaissance utile à la décision."],
    "Cofundadora y Directora de Tecnología (CTO)": ["Co-founder and Chief Technology Officer (CTO)", "Cofondatrice et directrice technologique (CTO)"],
    "Especialista en inteligencia artificial e ingeniería de datos, con experiencia profesional en el área de AI & Data de EY y formación de máster en Data Science and Engineering por la UPC. En migrAI dirige la arquitectura tecnológica, la infraestructura de datos y el desarrollo de soluciones escalables. Es responsable de diseñar y mantener los procesos automatizados que permiten integrar múltiples fuentes de información y generar predicciones actualizadas de manera eficiente y fiable.": [
      "Specialist in artificial intelligence and data engineering, with professional experience in EY's AI & Data practice and a master's degree in Data Science and Engineering from UPC. At migrAI she leads the technology architecture, the data infrastructure and the development of scalable solutions. She is responsible for designing and maintaining the automated processes that integrate multiple information sources and produce up-to-date predictions efficiently and reliably.",
      "Spécialiste de l'intelligence artificielle et de l'ingénierie des données, avec une expérience dans l'activité AI & Data d'EY et un master en Data Science and Engineering de l'UPC. Chez migrAI, elle dirige l'architecture technologique, l'infrastructure de données et le développement de solutions évolutives. Elle conçoit et maintient les processus automatisés qui intègrent plusieurs sources d'information et produisent des prévisions à jour de manière efficace et fiable."],
    "Cofundadora y Directora de Producto (CPO)": ["Co-founder and Chief Product Officer (CPO)", "Cofondatrice et directrice produit (CPO)"],
    "Consultora sénior de innovación especializada en inteligencia artificial, automatización y análisis de datos, con experiencia profesional en EY. Combina conocimientos tecnológicos con una visión estratégica orientada al desarrollo de soluciones empresariales. En migrAI lidera la estrategia de producto, la innovación y la experiencia de usuario, transformando modelos predictivos complejos en herramientas intuitivas y accesibles que aportan valor a instituciones, organizaciones y responsables de planificación.": [
      "Senior innovation consultant specialising in artificial intelligence, automation and data analysis, with professional experience at EY. She combines technological knowledge with a strategic vision geared to building business solutions. At migrAI she leads product strategy, innovation and user experience, turning complex predictive models into intuitive, accessible tools that add value for institutions, organisations and planners.",
      "Consultante senior en innovation spécialisée en intelligence artificielle, automatisation et analyse de données, avec une expérience chez EY. Elle associe connaissances technologiques et vision stratégique tournée vers les solutions d'entreprise. Chez migrAI, elle dirige la stratégie produit, l'innovation et l'expérience utilisateur, en transformant des modèles prédictifs complexes en outils intuitifs et accessibles qui apportent de la valeur aux institutions, organisations et responsables de la planification."],
    "¿Hablamos?": ["Shall we talk?", "On en parle ?"],
    "Cuéntanos qué quieres explorar.": ["Tell us what you want to explore.", "Dites-nous ce que vous souhaitez explorer."],
    "Consulta las opciones de acceso y cobertura para encontrar la que mejor se adapte a tus necesidades de análisis.": [
      "Review the access and coverage options to find the one that best fits your analysis needs.",
      "Consultez les options d'accès et de couverture pour trouver celle qui répond le mieux à vos besoins d'analyse."],
    "Explorar opciones": ["Explore options", "Découvrir les options"],
    "Los retratos son ilustraciones provisionales, no fotografías de las integrantes del equipo.": [
      "The portraits are provisional illustrations, not photographs of the team members.",
      "Les portraits sont des illustrations provisoires, et non des photographies des membres de l'équipe."],
    "Selección de plan · migrAI": ["Plan selection · migrAI", "Choix de l'offre · migrAI"],
    "← Volver a planes": ["← Back to plans", "← Retour aux offres"],
    "ENTORNO DE DEMOSTRACIÓN": ["DEMO ENVIRONMENT", "ENVIRONNEMENT DE DÉMONSTRATION"],
    "La pasarela de pago": ["The payment gateway", "La passerelle de paiement"],
    "aún no está conectada.": ["is not connected yet.", "n'est pas encore connectée."],
    "Has seleccionado una opción de acceso.": ["You have selected an access option.", "Vous avez sélectionné une option d'accès."],
    "No introduzcas datos de pago.": ["Do not enter payment details.", "Ne saisissez aucune donnée de paiement."],
    "Esta pantalla no procesa pagos, no crea pedidos y no genera credenciales. La compra está desactivada en esta demo.": [
      "This screen does not process payments, create orders or generate credentials. Purchasing is disabled in this demo.",
      "Cet écran ne traite aucun paiement, ne crée aucune commande et ne génère aucun identifiant. L'achat est désactivé dans cette démo."],
    "Pago no disponible": ["Payment unavailable", "Paiement indisponible"],
    "Volver a comparar planes": ["Back to comparing plans", "Retour à la comparaison des offres"],
    "Demostración · sin procesamiento de pagos": ["Demo · no payment processing", "Démonstration · sans traitement de paiements"],
    "migrAI transforma datos de migración en previsiones territoriales para ayudar a planificar con perspectiva.": [
      "migrAI turns migration data into territorial forecasts to help plan with perspective.",
      "migrAI transforme les données migratoires en prévisions territoriales pour aider à planifier avec recul."],
    "migrAI, inicio": ["migrAI, home", "migrAI, accueil"],
    "Navegación principal": ["Main navigation", "Navigation principale"],
    "Características del producto": ["Product features", "Caractéristiques du produit"],
    "Mapa de Europa con flujos migratorios": ["Map of Europe with migration flows", "Carte de l'Europe avec flux migratoires"],
    "Capacidades": ["Capabilities", "Fonctionnalités"],
    "Navegación del pie": ["Footer navigation", "Navigation du pied de page"],
    "Explora las opciones de cobertura y acceso a migrAI.": ["Explore the coverage and access options for migrAI.", "Découvrez les options de couverture et d'accès à migrAI."],
    "Planes disponibles": ["Available plans", "Offres disponibles"],
    "Conoce al equipo fundador de migrAI y su enfoque interdisciplinar en datos, tecnología e inteligencia migratoria.": [
      "Meet the founding team of migrAI and their interdisciplinary approach to data, technology and migration intelligence.",
      "Découvrez l'équipe fondatrice de migrAI et son approche interdisciplinaire des données, de la technologie et de l'intelligence migratoire."],
    "Equipo fundador de migrAI": ["migrAI founding team", "Équipe fondatrice de migrAI"],
    "Ilustración provisional de mujer, retrato de Maria Alpuente": ["Provisional illustration of a woman, portrait of Maria Alpuente", "Illustration provisoire d'une femme, portrait de Maria Alpuente"],
    "Ilustración provisional de mujer, retrato de Queralt Navarro": ["Provisional illustration of a woman, portrait of Queralt Navarro", "Illustration provisoire d'une femme, portrait de Queralt Navarro"],
    "Ilustración provisional de mujer, retrato de Mariona Juny": ["Provisional illustration of a woman, portrait of Mariona Juny", "Illustration provisoire d'une femme, portrait de Mariona Juny"],
    "Pantalla de demostración de selección de plan migrAI.": ["Demo screen for migrAI plan selection.", "Écran de démonstration du choix d'offre migrAI."],
    /* checkout.html script strings */
    "Plan Esencial · cobertura de un país": ["Essential plan · coverage of one country", "Offre Essentiel · couverture d'un pays"],
    "Plan Completo · todos los países del estudio": ["Complete plan · all countries in the study", "Offre Complet · tous les pays de l'étude"],
    "Opción seleccionada:": ["Selected option:", "Option sélectionnée :"],
    "Selecciona un plan para consultar esta demostración.": ["Select a plan to view this demo.", "Sélectionnez une offre pour consulter cette démo."],
  };

  const norm = (text) => text.replace(/\s+/g, " ").trim();
  const read = () => { try { return window.localStorage.getItem("migrai-lang"); } catch { return null; } };
  const write = (value) => { try { window.localStorage.setItem("migrai-lang", value); } catch { /* storage unavailable */ } };
  let current = LANGS.includes(read()) ? read() : "en";

  const textItems = [];
  const attrItems = [];
  const ATTRS = ["aria-label", "alt", "title"];

  function translate(source, lang) {
    if (lang === "es") return source;
    const entry = DICT[source];
    return entry ? entry[lang === "en" ? 0 : 1] : source;
  }

  function collect() {
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, .lang-select, noscript")) return NodeFilter.FILTER_REJECT;
        return norm(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) textItems.push({ node: walker.currentNode, original: walker.currentNode.nodeValue });
    document.querySelectorAll(ATTRS.map((name) => `[${name}]`).join(",")).forEach((element) => {
      if (element.closest(".lang-select")) return;
      ATTRS.forEach((name) => { if (element.hasAttribute(name)) attrItems.push({ element, name, original: element.getAttribute(name) }); });
    });
    const description = document.querySelector('meta[name="description"]');
    if (description) attrItems.push({ element: description, name: "content", original: description.getAttribute("content") });
  }

  function apply(lang) {
    textItems.forEach((item) => {
      const source = norm(item.original);
      const lead = item.original.match(/^\s*/)[0];
      const trail = item.original.match(/\s*$/)[0];
      item.node.nodeValue = lang === "es" ? item.original : `${lead}${translate(source, lang)}${trail}`;
    });
    attrItems.forEach((item) => item.element.setAttribute(item.name, lang === "es" ? item.original : translate(norm(item.original), lang)));
    document.documentElement.lang = lang;
    current = lang;
    write(lang);
    document.dispatchEvent(new CustomEvent("migrai:lang", { detail: { lang } }));
  }

  function buildSelector() {
    const select = document.createElement("select");
    select.className = "lang-select";
    select.setAttribute("aria-label", "Language");
    LANGS.forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang;
      option.textContent = LABELS[lang];
      select.append(option);
    });
    select.value = current;
    select.addEventListener("change", () => apply(select.value));
    const inner = document.querySelector(".header-inner");
    if (!inner) return;
    const accessButton = inner.querySelector(".button--nav");
    if (accessButton) inner.insertBefore(select, accessButton);
    else inner.append(select);
  }

  window.migraiT = (source) => translate(source, current);

  collect();
  buildSelector();
  apply(current);
  document.documentElement.classList.add("i18n-ready");
})();
