export type Program = {
  slug: string;
  name: string;
  area: "Ingeniería" | "Negocios" | "Tecnología" | "Ciencias" | "Industrial";
  level: "Magíster" | "Postgrado" | "Especialización" | "Continuidad";
  modality: "Presencial" | "Online" | "Híbrido";
  duration: string;
  schedule: string;
  campus: "Casa Central" | "San Joaquín" | "Vitacura" | "Online";
  tuition: number; // CLP total
  accreditation: string;
  employability: number; // %
  shortDesc: string;
  description: string;
  career: string[];
  profile: string;
  curriculum: { semester: string; courses: string[] }[];
  requirements: string[];
  dates: { label: string; date: string }[];
  faq: { q: string; a: string }[];
  testimonial: { name: string; role: string; quote: string };
};

export const programs: Program[] = [
  {
    slug: "magister-ciencia-datos",
    name: "Magíster en Ciencia de Datos",
    area: "Tecnología",
    level: "Magíster",
    modality: "Híbrido",
    duration: "4 semestres",
    schedule: "Vespertino",
    campus: "Vitacura",
    tuition: 9800000,
    accreditation: "Acreditado CNA 6 años",
    employability: 96,
    shortDesc: "Domina machine learning, IA aplicada y analítica avanzada con foco industrial.",
    description:
      "Programa interdisciplinario que combina estadística, computación e inteligencia artificial para resolver problemas reales de la industria con datos masivos.",
    career: ["Data Scientist", "ML Engineer", "Head of Analytics", "AI Product Lead"],
    profile:
      "Profesionales con formación en ingeniería, matemáticas, computación o áreas afines, con base en programación y estadística.",
    curriculum: [
      { semester: "Semestre 1", courses: ["Estadística avanzada", "Programación en Python", "Bases de datos"] },
      { semester: "Semestre 2", courses: ["Machine Learning", "Visualización de datos", "Cloud computing"] },
      { semester: "Semestre 3", courses: ["Deep Learning", "NLP", "MLOps"] },
      { semester: "Semestre 4", courses: ["Proyecto de graduación", "Ética y datos", "Electivo"] },
    ],
    requirements: [
      "Título profesional o licenciatura (mín. 8 semestres)",
      "Concentración de notas",
      "Carta de motivación",
      "Entrevista personal",
    ],
    dates: [
      { label: "Apertura postulaciones", date: "01 Sep 2025" },
      { label: "Cierre postulaciones", date: "30 Nov 2025" },
      { label: "Entrevistas", date: "01 - 12 Dic 2025" },
      { label: "Resultados", date: "20 Dic 2025" },
      { label: "Matrícula", date: "06 - 17 Ene 2026" },
    ],
    faq: [
      { q: "¿Requiere experiencia previa programando?", a: "Es recomendable manejar Python o R a nivel básico." },
      { q: "¿Hay beca de excelencia?", a: "Sí, hasta 40% del arancel para los mejores puntajes de admisión." },
    ],
    testimonial: {
      name: "Camila Rojas",
      role: "Lead Data Scientist, Falabella",
      quote: "El magíster cambió mi carrera. La combinación de teoría y casos reales es difícil de igualar.",
    },
  },
  {
    slug: "mba-usm",
    name: "MBA Santa María",
    area: "Negocios",
    level: "Magíster",
    modality: "Presencial",
    duration: "5 semestres",
    schedule: "Vespertino y sábados",
    campus: "Vitacura",
    tuition: 18500000,
    accreditation: "Acreditado AMBA · CNA 7 años",
    employability: 98,
    shortDesc: "Forma líderes con visión estratégica, tecnológica y global.",
    description:
      "El MBA insignia de la USM forma gerentes y emprendedores con una mirada técnica y estratégica única en Chile.",
    career: ["CEO", "Gerente General", "Director de Estrategia", "Founder"],
    profile: "Profesionales con 3+ años de experiencia laboral y vocación de liderazgo.",
    curriculum: [
      { semester: "Año 1", courses: ["Finanzas corporativas", "Estrategia", "Marketing", "Operaciones"] },
      { semester: "Año 2", courses: ["Liderazgo", "Innovación", "Capstone", "Electivos internacionales"] },
    ],
    requirements: ["Título profesional", "3+ años de experiencia", "Entrevista", "Ensayo personal"],
    dates: [
      { label: "Apertura postulaciones", date: "15 Ago 2025" },
      { label: "Cierre postulaciones", date: "15 Dic 2025" },
      { label: "Entrevistas", date: "Dic 2025" },
      { label: "Resultados", date: "10 Ene 2026" },
      { label: "Matrícula", date: "20 Ene - 05 Feb 2026" },
    ],
    faq: [
      { q: "¿Tiene viaje internacional?", a: "Sí, incluye una semana en una escuela partner en Europa o EE.UU." },
    ],
    testimonial: {
      name: "Andrés Pérez",
      role: "Gerente Comercial, BHP",
      quote: "Una experiencia transformadora. La red de contactos vale tanto como el contenido.",
    },
  },
  {
    slug: "magister-ingenieria-industrial",
    name: "Magíster en Ingeniería Industrial",
    area: "Industrial",
    level: "Magíster",
    modality: "Presencial",
    duration: "4 semestres",
    schedule: "Vespertino",
    campus: "Casa Central",
    tuition: 11200000,
    accreditation: "Acreditado CNA 5 años",
    employability: 94,
    shortDesc: "Optimización, gestión y analítica para industrias de clase mundial.",
    description:
      "Forma especialistas capaces de liderar proyectos de mejora continua, supply chain y transformación operacional.",
    career: ["Gerente de Operaciones", "Consultor", "Supply Chain Lead"],
    profile: "Ingenieros y profesionales con orientación cuantitativa.",
    curriculum: [
      { semester: "Semestre 1", courses: ["Investigación de operaciones", "Estadística", "Economía"] },
      { semester: "Semestre 2", courses: ["Supply chain", "Simulación", "Gestión de proyectos"] },
      { semester: "Semestre 3", courses: ["Lean & Six Sigma", "Analytics", "Electivo"] },
      { semester: "Semestre 4", courses: ["Tesis", "Seminario"] },
    ],
    requirements: ["Título de ingeniería o equivalente", "Entrevista", "Concentración de notas"],
    dates: [
      { label: "Apertura postulaciones", date: "01 Sep 2025" },
      { label: "Cierre postulaciones", date: "15 Dic 2025" },
      { label: "Resultados", date: "05 Ene 2026" },
      { label: "Matrícula", date: "10 - 24 Ene 2026" },
    ],
    faq: [{ q: "¿Hay modalidad online?", a: "No, este programa es 100% presencial en Valparaíso." }],
    testimonial: {
      name: "María Soto",
      role: "Gerente de Operaciones, CCU",
      quote: "Las herramientas que aprendí las apliqué desde el primer mes.",
    },
  },
  {
    slug: "diplomado-ciberseguridad",
    name: "Diplomado en Ciberseguridad",
    area: "Tecnología",
    level: "Especialización",
    modality: "Online",
    duration: "6 meses",
    schedule: "Asincrónico + clases en vivo",
    campus: "Online",
    tuition: 2900000,
    accreditation: "Certificación USM",
    employability: 92,
    shortDesc: "Protege infraestructura crítica con estándares internacionales.",
    description:
      "Programa intensivo enfocado en seguridad ofensiva y defensiva, gobernanza y respuesta a incidentes.",
    career: ["Security Engineer", "SOC Analyst", "CISO"],
    profile: "Profesionales de TI con experiencia en redes o desarrollo.",
    curriculum: [
      { semester: "Módulo 1", courses: ["Fundamentos", "Criptografía", "Redes seguras"] },
      { semester: "Módulo 2", courses: ["Ethical hacking", "Cloud security", "Respuesta a incidentes"] },
    ],
    requirements: ["Título técnico o profesional", "Experiencia mínima 2 años en TI"],
    dates: [
      { label: "Apertura", date: "01 Oct 2025" },
      { label: "Cierre", date: "20 Feb 2026" },
      { label: "Inicio clases", date: "10 Mar 2026" },
    ],
    faq: [{ q: "¿Requiere conocimientos previos?", a: "Sí, manejo básico de Linux y redes." }],
    testimonial: {
      name: "Diego Maldonado",
      role: "Security Engineer, MercadoLibre",
      quote: "El mejor diplomado costo/beneficio que encontré en LATAM.",
    },
  },
  {
    slug: "magister-energias-renovables",
    name: "Magíster en Energías Renovables",
    area: "Ingeniería",
    level: "Magíster",
    modality: "Híbrido",
    duration: "4 semestres",
    schedule: "Vespertino",
    campus: "Casa Central",
    tuition: 10500000,
    accreditation: "Acreditado CNA 5 años",
    employability: 95,
    shortDesc: "Diseña la transición energética con foco en solar, eólica e hidrógeno verde.",
    description:
      "Forma profesionales para liderar proyectos energéticos sostenibles en Chile y la región.",
    career: ["Project Manager Energía", "Consultor Sustentabilidad", "Ingeniero de Proyectos"],
    profile: "Ingenieros eléctricos, mecánicos, civiles o afines.",
    curriculum: [
      { semester: "Semestre 1", courses: ["Sistemas eléctricos", "Recursos renovables", "Economía energética"] },
      { semester: "Semestre 2", courses: ["Solar", "Eólica", "Almacenamiento"] },
      { semester: "Semestre 3", courses: ["Hidrógeno verde", "Regulación", "Proyectos"] },
      { semester: "Semestre 4", courses: ["Tesis"] },
    ],
    requirements: ["Título de ingeniería", "Entrevista"],
    dates: [
      { label: "Apertura", date: "15 Sep 2025" },
      { label: "Cierre", date: "15 Dic 2025" },
      { label: "Resultados", date: "08 Ene 2026" },
      { label: "Matrícula", date: "15 - 30 Ene 2026" },
    ],
    faq: [{ q: "¿Hay convenios con empresas del sector?", a: "Sí, con Engie, Colbún, AES y Enel." }],
    testimonial: {
      name: "Javiera Núñez",
      role: "Project Manager, Engie",
      quote: "Un programa que está a la vanguardia de la transición energética.",
    },
  },
  {
    slug: "diplomado-gestion-proyectos",
    name: "Diplomado en Gestión de Proyectos",
    area: "Negocios",
    level: "Continuidad",
    modality: "Online",
    duration: "5 meses",
    schedule: "Asincrónico",
    campus: "Online",
    tuition: 2200000,
    accreditation: "PMI Aligned",
    employability: 90,
    shortDesc: "Metodologías tradicionales y ágiles aplicadas a proyectos reales.",
    description: "Programa alineado con PMBOK 7 y prácticas ágiles modernas.",
    career: ["Project Manager", "Scrum Master", "PMO Lead"],
    profile: "Profesionales que lideran o desean liderar proyectos.",
    curriculum: [
      { semester: "Módulo 1", courses: ["Fundamentos PM", "Stakeholders", "Riesgos"] },
      { semester: "Módulo 2", courses: ["Agile", "Scrum", "Kanban", "Capstone"] },
    ],
    requirements: ["Título técnico o profesional"],
    dates: [
      { label: "Apertura", date: "01 Nov 2025" },
      { label: "Cierre", date: "28 Feb 2026" },
      { label: "Inicio", date: "15 Mar 2026" },
    ],
    faq: [{ q: "¿Prepara para la certificación PMP?", a: "Sí, cubre todas las áreas del examen." }],
    testimonial: {
      name: "Felipe Castro",
      role: "PMO Lead, Banco de Chile",
      quote: "Práctico, flexible y muy bien estructurado.",
    },
  },
];

export const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);