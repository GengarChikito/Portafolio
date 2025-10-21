// @ts-ignore
import type { CSSProperties } from "react";

export interface Styles {
    shell: CSSProperties;
    headerBar: CSSProperties;
    container: CSSProperties;
    section: CSSProperties;
    grid: CSSProperties;
    cardImage: CSSProperties;
    footer: CSSProperties;
}

/* 🦄 VIOLET THEME V2 (Alto Contraste y Vibrante) */
// Esquema: Negro Intenso (#00000A), Morado Vivo (#A700FF), Celeste Brillante (#00E6FF)
export const stylesViolet: Styles = {
    // Fondo oscuro INTENSO (Negro)
    shell: {
        minHeight: "100vh",
        backgroundColor: "var(--surface-bg, #00000A)", // Fondo Negro Intenso
        color: "var(--text-color, #FAFAFA)" // Texto blanco
    },

    // Barra de Navegación
    headerBar: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        paddingInline: 16,
        paddingBlock: 12, // AÑADIDO: Padding vertical para el header
        background: "var(--header-bg, #00000A90)", // Fondo Negro semitransparente
        boxShadow: "0 4px 15px rgba(167, 0, 255, 0.6)",
        color: "var(--text-color, #FAFAFA)",
    },

    // Contenedor Central y Centrado
    container: {
        maxWidth: 600,
        margin: "0 auto", // CENTRADO: Asegura que el contenedor se centre
        paddingInline: 20, // Padding lateral (móviles)
        paddingBlock: 24, // AÑADIDO: Padding vertical para espacio
    },

    // Separador de Secciones
    section: {
        padding: "var(--section-pad, 72px 0)",
        borderTop: "1px solid var(--border-color, #3B007F)"
    },

    // Estilos de Grid (se mantienen estándar)
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        gap: 16,
    },

    // Estilos de Imagen (se mantienen estándar)
    cardImage: {
        height: 160,
        objectFit: "cover"
    },

    // Pie de página
    footer: {
        borderTop: "1px solid var(--border-strong, #00E6FF)",
        paddingBlock: 24,
        textAlign: "center",
        background: "#050510", // Fondo negro oscuro
        color: "var(--text-color, #FAFAFA)",
    },
};

/* 🎨 LIGHT THEME (Convertido a Negro) */
// @ts-ignore
export const stylesLight: Styles = {
    // CAMBIADO: Fondo a un Gris muy Oscuro
    shell: { minHeight: "100vh", backgroundColor: "var(--surface-bg, #111827)", color: "var(--text-color, #FAFAFA)" },

    // CAMBIADO: Header Oscuro
    headerBar: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        paddingInline: 16,
        paddingBlock: 12, // AÑADIDO: Padding vertical para el header
        background: "var(--header-bg, #111827)", // Negro/Azul oscuro
        boxShadow: "0 2px 10px rgba(255,255,255,0.05)", // Sombra clara en fondo oscuro
        color: "var(--text-color, #FAFAFA)",
    },

    // Contenedor Central y Centrado
    container: {
        maxWidth: 1200,
        margin: "0 auto", // CENTRADO
        paddingInline: 16,
        paddingBlock: 24, // AÑADIDO: Padding vertical para espacio
    },

    // CAMBIADO: Borde de Sección Oscuro
    section: { padding: "var(--section-pad, 72px 0)", borderTop: "1px solid var(--border-color, #374151)" },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        gap: 16,
    },
    cardImage: { height: 160, objectFit: "cover" },

    // CAMBIADO: Footer Oscuro
    footer: {
        borderTop: "1px solid var(--border-strong, #374151)",
        paddingBlock: 24,
        textAlign: "center",
        background: "#00000A",
    },
};

/* 🌙 DARK THEME (Se mantiene la versión oscura original) */
export const stylesDark: Styles = {
    shell: { minHeight: "100vh", backgroundColor: "var(--surface-bg, #0F172A)", color: "var(--text-color, #E5E7EB)" },
    headerBar: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        paddingInline: 16,
        paddingBlock: 12, // AÑADIDO: Padding vertical para el header
        background: "var(--header-bg, #0F172A)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        color: "var(--text-color, #E5E7EB)",
    },
    container: {
        maxWidth: 1200,
        margin: "0 auto", // CENTRADO
        paddingInline: 16,
        paddingBlock: 24, // AÑADIDO: Padding vertical para espacio
    },
    section: { padding: "var(--section-pad, 72px 0)", borderTop: "1px solid var(--border-color, #1F2937)" },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
        gap: 16,
    },
    cardImage: { height: 160, objectFit: "cover" },
    footer: {
        borderTop: "1px solid var(--border-strong, #7C3AED)",
        paddingBlock: 24,
        textAlign: "center",
        background: "#0B1220",
    },
};

// Exportamos el tema VIOLETA con fondo negro como el tema predeterminado
export const styles = stylesViolet;