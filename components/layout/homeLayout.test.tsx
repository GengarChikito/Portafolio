import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeLayout from "./homeLayout";


/* =========================
   Mocks
   ========================= */

// Espías para validar integración
const headerBarSpy = vi.fn();
const configProviderSpy = vi.fn();

// Mock de HeaderBar: botón que alterna dark
vi.mock("components/molecules/headerBar", () => ({
    HeaderBar: (props: { dark: boolean; onToggleDark: (v: boolean) => void }) => {
        headerBarSpy(props);
        return (
            <button
                data-testid="header-toggle"
                data-dark={String(props.dark)}
                onClick={() => props.onToggleDark(!props.dark)}
            >
                toggle
            </button>
        );
    },
}));

// Mock de tema corporativo
vi.mock("app/theme", () => ({
    corporateLightTheme: { name: "light-theme" },
    corporateDarkTheme: { name: "dark-theme" },
}));

// Mock de estilos (usar valores CSS válidos)
vi.mock("app/styles", () => ({
    stylesLight: {
        shell: { outline: "1px solid blue" },
        footer: { backgroundColor: "#ffffff" }, // blanco
    },
    stylesDark: {
        shell: { outline: "1px solid red" },
        footer: { backgroundColor: "#000000" }, // negro
    },
}));

// Mock de antd (Layout, Typography.Text, ConfigProvider, theme.useToken)
vi.mock("antd", () => {
    const Layout: any = ({ children, style, ...rest }: any) => (
        <section data-testid="layout" style={style} {...rest}>
            {children}
        </section>
    );
    Layout.Content = ({ children, ...rest }: any) => (
        <main data-testid="content" {...rest}>
            {children}
        </main>
    );
    Layout.Footer = ({ children, style, ...rest }: any) => (
        <footer data-testid="footer" style={style} {...rest}>
            {children}
        </footer>
    );

    return {
        Layout,
        Typography: {
            Text: ({ children, ...rest }: any) => (
                <span data-testid="typography-text" {...rest}>
          {children}
        </span>
            ),
        },
        ConfigProvider: ({ children, theme, ...rest }: any) => {
            configProviderSpy(theme);
            return (
                <div data-testid="config-provider" data-theme={theme?.name} {...rest}>
                    {children}
                </div>
            );
        },
        theme: {
            // Tokens usados para poblar las CSS vars del wrapper
            useToken: () => ({
                token: {
                    colorBorder: "#111111",
                    colorPrimary: "#222222",
                    colorBgBase: "#ffffff",
                    colorTextBase: "#000000",
                },
            }),
        },
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

describe("homeLayout", () => {
    it("renderiza children dentro de Content y el footer con el año actual", () => {
        render(
            <HomeLayout>
                <div>Hola Portafolio</div>
            </HomeLayout>
        );

        // Children en <Content>
        expect(screen.getByTestId("content")).toHaveTextContent("Hola Portafolio");

        // Footer con copy y año actual
        const year = new Date().getFullYear();
        expect(screen.getByTestId("typography-text")).toHaveTextContent(
            `© ${year} TEAS INC .`
        );
    });

    it("aplica variables CSS del tema en el wrapper", () => {
        render(
            <HomeLayout>
                <div />
            </HomeLayout>
        );

        // El wrapper es el padre del Layout (ThemedWrapper -> div con CSS vars)
        const layout = screen.getByTestId("layout");
        const wrapper = layout.parentElement as HTMLElement;
        const cs = getComputedStyle(wrapper);

        expect(cs.getPropertyValue("--border-color").trim()).toBe("#111111");
        expect(cs.getPropertyValue("--border-strong").trim()).toBe("#222222");
        expect(cs.getPropertyValue("--surface-bg").trim()).toBe("#ffffff");
        expect(cs.getPropertyValue("--text-color").trim()).toBe("#000000");
        expect(cs.getPropertyValue("--header-bg").trim()).toBe("#ffffff");
        expect(cs.getPropertyValue("--section-pad").trim()).toBe("clamp(48px, 6vw, 72px)");
    });

    it("usa el tema claro por defecto y cambia a oscuro cuando HeaderBar alterna", () => {
        render(
            <HomeLayout>
                <div />
            </HomeLayout>
        );

        // Primera pasada: ConfigProvider recibe tema claro
        expect(configProviderSpy).toHaveBeenCalled();
        const firstTheme = configProviderSpy.mock.calls[0][0];
        expect(firstTheme).toEqual({ name: "light-theme" });

        // HeaderBar inició con dark=false
        expect(headerBarSpy).toHaveBeenCalled();
        const firstHeaderProps = headerBarSpy.mock.calls[0][0];
        expect(firstHeaderProps.dark).toBe(false);

        // Toggle -> dark=true
        fireEvent.click(screen.getByTestId("header-toggle"));

        // Última llamada tras re-render
        const lastHeaderProps =
            headerBarSpy.mock.calls[headerBarSpy.mock.calls.length - 1][0];
        expect(lastHeaderProps.dark).toBe(true);

        const lastTheme =
            configProviderSpy.mock.calls[configProviderSpy.mock.calls.length - 1][0];
        expect(lastTheme).toEqual({ name: "dark-theme" });
    });

    it("cambia los estilos del Footer al alternar entre stylesLight y stylesDark", () => {
        render(
            <HomeLayout>
                <div />
            </HomeLayout>
        );

        const footer = screen.getByTestId("footer") as HTMLElement;

        // Inicial: stylesLight.footer -> #ffffff
        expect(getComputedStyle(footer).backgroundColor).toBe("rgb(255, 255, 255)");

        // Toggle a dark
        fireEvent.click(screen.getByTestId("header-toggle"));

        // Después: stylesDark.footer -> #000000
        expect(getComputedStyle(footer).backgroundColor).toBe("rgb(0, 0, 0)");
    });
});
