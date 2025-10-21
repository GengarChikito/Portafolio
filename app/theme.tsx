import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

/* =========================================================
   ⚫ TEMA CLARO (Ahora es Oscuro/Morado)
   ========================================================= */
export const corporateLightTheme: ThemeConfig = {
    algorithm: antdTheme.darkAlgorithm, // Usamos el algoritmo oscuro para el fondo
    token: {
        // 🎨 Colores principales
        colorPrimary: "#A700FF",        // Morado Vivo
        colorPrimaryHover: "#C400FF",   // Morado más brillante
        colorLink: "#00E6FF",           // Celeste brillante (acento)
        colorLinkHover: "#22d3ee",

        // 🖋️ Texto y contraste
        colorTextBase: "#FAFAFA",       // Texto principal (blanco)
        colorTextSecondary: "#A78BFA",  // Texto suave (morado claro)

        // 🧱 Fondos
        colorBgBase: "#00000A",         // Fondo principal (Negro Intenso)
        colorBgContainer: "#1A1A2E",    // Tarjetas, secciones internas (Negro Azulado)
        colorBgLayout: "#050510",       // Fondo de layout general (casi negro)

        // 🪶 Bordes
        colorBorder: "#3B007F",         // Bordes morado oscuro
        colorBorderSecondary: "#A700FF",

        // 🧩 Sombra y profundidad
        boxShadowSecondary: "0 4px 15px rgba(167, 0, 255, 0.6)", // Sombra morada

        // 🔠 Tipografía
        fontFamily: "Inter, system-ui, sans-serif",

        // 🧭 Bordes redondeados
        borderRadius: 12,
    },
};


