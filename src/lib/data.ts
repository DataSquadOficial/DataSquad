/** Carpeta del sitio en GitHub Pages (nombre del repositorio). Debe coincidir con next.config.mjs. */
export const BASE = "/DataSquad";

export const CONTACT = {
  email: "datasquadoficial@gmail.com",
  github: "https://github.com/DataSquadOficial",
  tiktok: "https://www.tiktok.com/@datasquad_ds",
  youtube: "https://www.youtube.com/@DatasquadOficial",
  lema: "¡El futuro se predice, con DataSquad se aprende!",
};

export type ColorKey = "cian" | "azul" | "violeta" | "verde" | "amarillo";

export const COLOR: Record<ColorKey, string> = {
  cian: "#111111",
  azul: "#3A3A37",
  violeta: "#55554F",
  verde: "#111111",
  amarillo: "#77776F",
};

export type AppId = "decide" | "quantix" | "bi" | "lab" | "procurement" | "explorer";

export type SuiteApp = {
  id: AppId;
  name: string; // sin el prefijo "DataSquad"
  tagline: string;
  headline: string;
  about: string;
  color: string; // color del icono
  ink: string; // color del nombre sobre fondo claro
  ready: boolean;
  version?: string;
  points: string[];
  href: string;
};

/** Las apps de la suite, igual que en el lanzador de escritorio. */
export const SUITE: SuiteApp[] = [
  {
    id: "decide",
    name: "Decide",
    tagline: "Motor de decisiones",
    headline: "Reglas, modelos y decisiones auditables. Local y reproducible.",
    about:
      "Arma un flujo visual: entran datos, se calculan variables, un modelo pronostica y las reglas deciden. Cada resultado sale con su motivo.",
    color: "#C53976",
    ink: "#B02864",
    ready: true,
    version: "1.0.0",
    points: ["Cada decisión con su porqué", "Tus datos no salen de tu equipo", "Conecta tu modelo ONNX como un nodo"],
    href: "/decide",
  },
  {
    id: "quantix",
    name: "Quantix",
    tagline: "Estadística y econometría",
    headline: "Matemáticas, estadística, regresiones y econometría.",
    about: "Un espacio de trabajo para analizar series y datos: estadística, regresiones y modelos econométricos.",
    color: "#2563EB",
    ink: "#1D4ED8",
    ready: false,
    points: ["Estadística descriptiva", "Regresiones", "Econometría"],
    href: "/suite#quantix",
  },
  {
    id: "bi",
    name: "BI",
    tagline: "Dashboards y reportes",
    headline: "Dashboards, reportes, imágenes y presentaciones profesionales.",
    about: "Convierte tus tablas en tableros y reportes listos para presentar a dirección.",
    color: "#E89B0C",
    ink: "#B46E00",
    ready: false,
    points: ["Dashboards", "Reportes", "Presentaciones"],
    href: "/suite#bi",
  },
  {
    id: "lab",
    name: "Lab",
    tagline: "Laboratorio de IA y Machine Learning",
    headline: "Carga datasets e imágenes; entrena y prueba modelos de IA.",
    about: "Un laboratorio para experimentar: carga tus datos, entrena modelos y compáralos antes de usarlos.",
    color: "#7C3AED",
    ink: "#6A28D9",
    ready: false,
    points: ["Datasets e imágenes", "Entrenamiento", "Pruebas de modelos"],
    href: "/suite#lab",
  },
  {
    id: "procurement",
    name: "Smart Procurement",
    tagline: "Compras inteligentes",
    headline: "Compara proveedores, precios, materiales y logística.",
    about: "Reúne cotizaciones y arma la mejor compra comparando proveedores, precios, materiales y entrega.",
    color: "#15803D",
    ink: "#116E34",
    ready: false,
    points: ["Proveedores", "Precios y materiales", "Logística"],
    href: "/suite#procurement",
  },
  {
    id: "explorer",
    name: "Associative Data Explorer",
    tagline: "Exploración asociativa de datos",
    headline: "Visualiza tablas, selecciona campos, filtra datos relacionados y límpialos.",
    about: "Explora tus tablas haciendo clic: selecciona un valor y mira qué datos se relacionan con él.",
    color: "#0E7490",
    ink: "#0C627A",
    ready: false,
    points: ["Selección de campos", "Filtros relacionados", "Limpieza de datos"],
    href: "/suite#explorer",
  },
];

/** Descarga del lanzador de la suite. El archivo vive en public/descargas/. */
export const DOWNLOAD = {
  href: `${BASE}/descargas/DataSquad-Suite-Launcher.exe`,
  file: "DataSquad-Suite-Launcher.exe",
  version: "0.1.0",
  size: "15 MB",
  os: "Windows 10/11 · 64 bits",
  /** Huella del archivo. Recalcúlala cada vez que cambies el .exe (PowerShell: Get-FileHash archivo.exe). */
  sha256: "182f61415b833b898b12638ee0944df9f2a9a2c3edac6a94edbe25a2209b76ff",
};

export const PRINCIPLES = [
  {
    icon: "shield",
    title: "Tus datos no salen de casa",
    text: "Todo se ejecuta en tu infraestructura o en tu nube. Nada viaja a servidores ajenos para regresar a ti.",
  },
  {
    icon: "eye",
    title: "Cada decisión, explicada",
    text: "Una traza completa: qué entró, qué se derivó y qué salió. Si algo falla, ves exactamente dónde.",
  },
  {
    icon: "cpu",
    title: "Modelos en el formato que ya usas",
    text: "Carga ONNX, PMML o escribe el nodo en Python. Sin reescribir lo que tu equipo ya construyó.",
  },
  {
    icon: "cloud",
    title: "Despliega donde quieras",
    text: "Cada versión publicada es un paquete que tu ingeniero de datos implementa en cualquier nube.",
  },
  {
    icon: "files",
    title: "Entra cualquier archivo",
    text: "Excel, CSV, Parquet, JSON o una base de datos. Y los resultados salen al formato que necesites.",
  },
  {
    icon: "factory",
    title: "Pensado para la industria",
    text: "Hecho por gente que operó motores de decisión en banca y pronósticos en retail. No es una demo.",
  },
] as const;

export const INDUSTRIES = [
  {
    key: "Banca",
    color: "cian" as ColorKey,
    title: "Originación y riesgo",
    text: "Estrategias de crédito con cientos de variables, scorecards y reglas de parametría que puedes versionar y auditar.",
    stat: "1,000+",
    statLabel: "variables por estrategia",
  },
  {
    key: "Retail",
    color: "verde" as ColorKey,
    title: "Demanda y reabastecimiento",
    text: "Pedidos a proveedores calculados a partir de tus archivos de ventas, inventario y tránsito, listos para enviar.",
    stat: "5 → 1",
    statLabel: "archivos a un pedido",
  },
  {
    key: "Logística",
    color: "amarillo" as ColorKey,
    title: "Rutas y prioridades",
    text: "Reglas que asignan prioridad, ruta o almacén en tiempo real, con modelos que aprenden del historial.",
    stat: "24/7",
    statLabel: "decisiones en tiempo real",
  },
];

export const STEPS = [
  { n: "01", title: "Conecta", text: "Sube Excel, CSV o Parquet, o conecta tu base de datos. Decide detecta el tipo de cada columna." },
  { n: "02", title: "Diseña", text: "Arma el grafo: variables de entrada, derivadas con fórmula, reglas, modelos y salidas." },
  { n: "03", title: "Prueba", text: "Corre casos de prueba y revisa la traza de cada variable antes de publicar." },
  { n: "04", title: "Publica", text: "Libera una versión para tiempo real, batch, horario programado o disparador." },
];

export type Plan = {
  name: string;
  for: string;
  price: string;
  note: string;
  color: ColorKey;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Inicial",
    for: "Equipos pequeños",
    price: "Gratis",
    note: "Para empresas pequeñas",
    color: "verde",
    cta: "Solicitar acceso",
    features: ["1 proyecto en Decide", "Ejecución manual y batch", "Importa Excel y CSV", "Traza de cada decisión", "Soporte por correo"],
  },
  {
    name: "Equipo",
    for: "Áreas de riesgo, demanda u operaciones",
    price: "Por definir",
    note: "Precio por usuario · próximamente",
    color: "cian",
    cta: "Unirme a la lista",
    featured: true,
    features: [
      "Proyectos ilimitados",
      "Tiempo real, programado y por disparador",
      "Modelos ONNX, PMML y nodos en Python",
      "Versiones y despliegues",
      "Todas las apps de la suite",
    ],
  },
  {
    name: "Empresa",
    for: "Organizaciones grandes",
    price: "A la medida",
    note: "Volumen, contratos y SLA",
    color: "violeta",
    cta: "Hablar con nosotros",
    features: [
      "Todo lo de Equipo",
      "Instalación en tu infraestructura",
      "Soluciones por industria",
      "Acompañamiento del equipo DataSquad",
      "Soporte prioritario",
    ],
  },
];

export const FAQ = [
  {
    q: "¿Qué es DataSquad?",
    a: "Un equipo de ciencia de datos que construye una suite de software para trabajar y decidir con datos, entrega proyectos a la medida y enseña cómo funciona la IA en TikTok y YouTube.",
  },
  {
    q: "¿Decide ya está disponible?",
    a: "Sí. Decide es la primera app de la suite: descarga el lanzador de DataSquad para Windows y ábrelo desde ahí. Las demás apps aparecen como Próximamente.",
  },
  {
    q: "¿Mis datos se suben a sus servidores?",
    a: "No. Decide corre en tu computadora: tus datos no salen de tu equipo.",
  },
  {
    q: "¿Qué modelos puedo usar?",
    a: "Modelos ONNX, PMML y nodos escritos en Python. Si tu modelo está en otro formato, platiquemos.",
  },
  {
    q: "¿Hacen proyectos a la medida?",
    a: "Sí. Entregamos el modelo, el tablero o el proceso funcionando, no solo horas de personal.",
  },
];

/* ---------- Carrusel del inicio: lo mismo para cada app ---------- */
export type Showcase = {
  demo: { a: string; b: string; lead: string };
  how: { a: string; b: string; lead: string; steps: { title: string; text: string }[] };
  uses: { a: string; b: string; items: { sector: string; title: string; text: string; stat?: string; statLabel?: string }[] };
};

export const SHOWCASE: Record<AppId, Showcase> = {
  decide: {
    demo: {
      a: "Mueve una variable.",
      b: "Mira la decisión cambiar.",
      lead: "Así trabaja un motor de decisiones: entran datos, se calculan variables, corre un modelo y sale una decisión con su traza completa.",
    },
    how: {
      a: "De la hoja de cálculo",
      b: "a la decisión en producción.",
      lead: "Lo que antes vivía en macros y correos ahora vive en un flujo que puedes probar, versionar y desplegar.",
      steps: STEPS.map(({ title, text }) => ({ title, text })),
    },
    uses: {
      a: "Soluciones listas para",
      b: "tu sector.",
      items: INDUSTRIES.map((i) => ({ sector: i.key, title: i.title, text: i.text, stat: i.stat, statLabel: i.statLabel })),
    },
  },
  quantix: {
    demo: { a: "Tus datos,", b: "con rigor estadístico.", lead: "Matemáticas, estadística, regresiones y econometría en un mismo espacio de trabajo." },
    how: {
      a: "De la tabla",
      b: "al modelo que la explica.",
      lead: "Un recorrido corto para pasar de los datos crudos a un resultado que puedes defender.",
      steps: [
        { title: "Carga", text: "Abre tus series y tablas desde Excel o CSV." },
        { title: "Explora", text: "Estadística descriptiva y gráficas para entender qué tienes." },
        { title: "Modela", text: "Regresiones y modelos econométricos sobre tus variables." },
        { title: "Reporta", text: "Tablas y resultados listos para tu documento." },
      ],
    },
    uses: {
      a: "Pensado para quien",
      b: "trabaja con números.",
      items: [
        { sector: "Finanzas", title: "Series y pronósticos", text: "Analiza series de tiempo y proyecta escenarios con modelos econométricos." },
        { sector: "Investigación", title: "Regresiones y pruebas", text: "Estima relaciones entre variables y revisa qué tan sólidas son." },
        { sector: "Planeación", title: "Demanda y estacionalidad", text: "Encuentra tendencias y temporadas en tus ventas históricas." },
      ],
    },
  },
  bi: {
    demo: { a: "De la tabla", b: "al tablero.", lead: "Dashboards, reportes, imágenes y presentaciones profesionales a partir de tus datos." },
    how: {
      a: "Del dato",
      b: "a la junta de dirección.",
      lead: "Arma un tablero y llévalo a una presentación sin cambiar de herramienta.",
      steps: [
        { title: "Conecta", text: "Trae tus tablas de Excel, CSV o tu base de datos." },
        { title: "Diseña", text: "Arma gráficas e indicadores en un lienzo." },
        { title: "Presenta", text: "Convierte el tablero en reporte, imagen o presentación." },
        { title: "Comparte", text: "Entrega el resultado a tu equipo y a dirección." },
      ],
    },
    uses: {
      a: "Indicadores claros para",
      b: "cada área.",
      items: [
        { sector: "Dirección", title: "Tableros ejecutivos", text: "Los indicadores clave del negocio en una sola vista." },
        { sector: "Ventas", title: "Reportes de desempeño", text: "Ventas por producto, zona y periodo, listas para presentar." },
        { sector: "Operaciones", title: "Indicadores del día", text: "Inventario, pedidos y niveles de servicio al corriente." },
      ],
    },
  },
  lab: {
    demo: { a: "Entrena y prueba", b: "antes de usar.", lead: "Carga datasets e imágenes; entrena y prueba modelos de IA en un laboratorio hecho para experimentar." },
    how: {
      a: "Del dataset",
      b: "al modelo probado.",
      lead: "Experimenta con orden: cada prueba queda registrada para compararla.",
      steps: [
        { title: "Carga", text: "Sube tus datasets e imágenes." },
        { title: "Entrena", text: "Entrena modelos de IA y Machine Learning con tus datos." },
        { title: "Prueba", text: "Evalúa cada modelo con datos que no ha visto." },
        { title: "Compara", text: "Quédate con el que mejor resultó." },
      ],
    },
    uses: {
      a: "Un laboratorio para",
      b: "tus modelos.",
      items: [
        { sector: "Visión", title: "Clasificación de imágenes", text: "Entrena modelos que reconocen lo que hay en tus imágenes." },
        { sector: "Riesgo", title: "Modelos de score", text: "Prueba modelos que estiman la probabilidad de un evento." },
        { sector: "Demanda", title: "Pronósticos", text: "Compara modelos para anticipar ventas e inventario." },
      ],
    },
  },
  procurement: {
    demo: { a: "La mejor compra,", b: "comparada.", lead: "Compara proveedores, precios, materiales y logística antes de comprar." },
    how: {
      a: "De la cotización",
      b: "a la orden de compra.",
      lead: "Reúne opciones y decide con todo a la vista.",
      steps: [
        { title: "Reúne", text: "Junta las cotizaciones y listas de precios de tus proveedores." },
        { title: "Compara", text: "Precios, materiales y condiciones, lado a lado." },
        { title: "Elige", text: "Arma la compra que mejor combina costo y calidad." },
        { title: "Planea", text: "Considera la logística y los tiempos de entrega." },
      ],
    },
    uses: {
      a: "Compras más inteligentes en",
      b: "cada giro.",
      items: [
        { sector: "Construcción", title: "Presupuestos de obra", text: "Compara materiales y proveedores para armar un presupuesto." },
        { sector: "Retail", title: "Reabastecimiento", text: "Elige a quién pedirle según precio y entrega." },
        { sector: "Manufactura", title: "Materiales e insumos", text: "Mantén a la vista costos y alternativas de cada insumo." },
      ],
    },
  },
  explorer: {
    demo: { a: "Haz clic", b: "y descubre qué se relaciona.", lead: "Visualiza tablas, selecciona campos, filtra datos relacionados y límpialos." },
    how: {
      a: "De muchas tablas",
      b: "a una sola respuesta.",
      lead: "Explora sin escribir consultas: selecciona y mira qué se enciende.",
      steps: [
        { title: "Carga", text: "Abre tus tablas y mira cómo se conectan." },
        { title: "Selecciona", text: "Elige un campo o un valor con un clic." },
        { title: "Filtra", text: "Todo lo relacionado se resalta; lo demás se atenúa." },
        { title: "Limpia", text: "Detecta y corrige datos incompletos o duplicados." },
      ],
    },
    uses: {
      a: "Para explorar datos",
      b: "sin perderte.",
      items: [
        { sector: "Ventas", title: "Clientes y productos", text: "Selecciona un cliente y mira qué compra, dónde y cuándo." },
        { sector: "Calidad de datos", title: "Limpieza", text: "Encuentra valores raros, vacíos y duplicados antes de analizarlos." },
        { sector: "Auditoría", title: "Seguimiento de un dato", text: "Sigue un registro a través de todas las tablas donde aparece." },
      ],
    },
  },
};
