// --- 1. DEFINICIÓN DE TIPOS (INTERFACES) ---

export interface Project {
    title: string;
    summary: string;
    tags: string[];
    link: string;
    image: string;
}

export interface Experience {
    role: string;
    title: string;
    company: string;
    period: string;
    details?: string;
    description?: string;
}

export interface Education {
    grade: string;
    degree: string;
    place: string;
    institution: string;
    period: string;
    details?: string;
    description?: string;
}




export interface Profile {
    name: string;
    headline: string;
    description: string;
    photoUrl?: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
    email: string;
    skills: string[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
}


// --- 2. EL OBJETO DE DATOS (MI INFORMACIÓN) ---

export const profile: Profile = {
    resumeUrl: "",

    // --- Sección Hero ---
    name: "Mathias Cortes",
    headline:
        "Quimica industrial | Tecnico En Laboratorio ",
    description:
        "Soy un Programador Iniciado con formación en las bases de la programación y un enfoque práctico en la creación de soluciones web con tecnologías como React y TypeScript. Mi experiencia se complementa con una pasión por los videojuegos, lo que me ha entrenado en el pensamiento lógico, la resolución de problemas bajo presión y la identificación rápida de patrones (habilidades transferibles directamente al debugging y la optimización de código). Busco aplicar mi lógica de juego y mi creciente habilidad en desarrollo para construir proyectos funcionales y escalables..",
    photoUrl: "../assets/Foto.jpg",

    // --- Links de Contacto y Redes ---

    linkedin: "https://www.linkedin.com/in/mathias-cortes-96885a379/",
    github: "https://github.com/GengarChikito",
    email: "Daeno.Cortes@gmail.com",

    // --- Lista de Habilidades (para las 'SkillPill') ---
    skills: [
        "TENER TEA",
        "JUGAR LOL LO CARREO PROFE ;)",
        "Framework/Tecnología",
        "Software Específico",
        "Competencia Blanda",
    ],

    // --- Lista de Proyectos (para las 'ProjectCard') ---
    projects: [
        {
            title: "este proyecto",
            summary:
                "un portafolio de lo que hago.",
            tags: ["React", "TypeScript", "Tailwind", "Otra Tecnología"],
            link: "https://github.com/GengarChikito/Portafolio",
            image: "https://i.pinimg.com/736x/cf/09/58/cf09580a8061d99ce27de5d154790938.jpg",
        },
        // Añade más proyectos aquí...
    ],

    // --- Lista de Experiencia ---
    experience: [
        {
            role: "Asistente de contador",
            title: "Sin titulo",
            company: "CyE Asesorias Contables",
            period: "06/01/2023 – Hasta la fecha",
            details:
                "Detalle 1: Logro/Responsabilidad .\n" +
                "Detalle 2: Uso de excel .\n" +
                "Detalle 3: Coordinación o gestión de contratos.",
            description:
                "trabajos contables para compañias de renombre nacional y pymes con asesorias desde contratos gestiones monetarias y cuentas bancarias inicio de actividades.",
        },

    ],

    // --- Lista de Educación ---
    education: [
        {
            grade: "Cuarto medio",
            degree: "Tecnico en quimica industrial",
            place: "Santiago- la pintana",
            institution: "CENTRO POLITECNICO PROFESIONAL PARTICULAR SAN RAMON",
            period: "enero-2019 – noviembre-2023",
            details:
                "Tecnico en analizis de muestras y foliaje.",
            description: "titulacion con renombre y mejor promedio.",
        }

    ]
};