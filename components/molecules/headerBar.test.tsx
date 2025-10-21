import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
// Importa 'within'
import { render, screen, fireEvent, within } from "@testing-library/react";

// ====== Mocks compartidos ======
const useBreakpointMock = vi.fn().mockReturnValue({ md: true });
const switchSpy = vi.fn();

// Mock de estilos
vi.mock("app/styles", () => ({
    styles: {
        headerBar: { borderBottom: "1px solid #eee" },
        container: { maxWidth: 1200, margin: "0 auto" },
    },
}));

// Mock de íconos (pasando props)
vi.mock("@ant-design/icons", () => ({
    MenuOutlined: () => <span data-testid="icon-menu" />,
    GithubOutlined: (p: any) => <span data-testid="icon-github" {...p} />,
    LinkedinFilled: (p: any) => <span data-testid="icon-linkedin" {...p} />,
    FileTextOutlined: () => <span data-testid="icon-cv" />,
}));

// Mock de antd (REFINADO)
vi.mock("antd", async () => {
    // Importa React REAL para usar React.isValidElement
    const ActualReact = await vi.importActual<typeof React>('react');

    // Mock para Space limpio
    const Space = ({ children, wrap, ...rest }: any) => (
        <div data-testid="space" {...rest}>
            {children}
        </div>
    );

    // Mock para Button REFINADO para renderizar icono DENTRO del link/button
    const Button = ({ children, onClick, href, icon, ...rest }: any) => {
        const iconElement = ActualReact.isValidElement(icon) ? icon : null;
        if (href) {
            return (
                <a data-testid="button-link" href={href} {...rest}>
                    {iconElement} {/* Icono va DENTRO */}
                    {children}
                </a>
            );
        }
        return (
            <button data-testid="button" onClick={onClick} {...rest}>
                {iconElement} {/* Icono va DENTRO */}
                {children}
            </button>
        );
    };

    // Mock para Switch limpio
    const Switch = ({ checked, onChange, checkedChildren, unCheckedChildren, ...rest }: any) => {
        switchSpy({ checked });
        return (
            <button
                data-testid="switch"
                aria-pressed={String(checked)} // aria-pressed debe ser string
                onClick={() => onChange(!checked)}
                {...rest}
            />
        );
    };

    const Drawer = ({ open, onClose, children, ...rest }: any) => {
        if (!open) return null;
        return (
            <aside data-testid="drawer" {...rest}>
                <button data-testid="drawer-close" onClick={onClose} />
                {children}
            </aside>
        );
    };

    const Grid = {
        useBreakpoint: () => useBreakpointMock(),
    };

    const Typography = {
        Text: ({ children, ...rest }: any) => (
            <span data-testid="typography-text" {...rest}>
              {children}
            </span>
        ),
    };

    return { Button, Space, Switch, Drawer, Grid, Typography };
});

// ====== SUT ======
import { HeaderBar } from "./headerBar";

// ====== Helpers ======
beforeEach(() => {
    vi.clearAllMocks();
    useBreakpointMock.mockReturnValue({ md: true });
});

describe("headerBar (desktop)", () => {
    it("renderiza nav, acciones y links con hrefs correctos", () => {
        render(<HeaderBar dark={false} onToggleDark={() => {}} />);

        // Nav links
        expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "#inicio");
        expect(screen.getByRole("link", { name: "Proyectos" })).toHaveAttribute("href", "#proyectos");
        expect(screen.getByRole("link", { name: "Experiencia" })).toHaveAttribute("href", "#experiencia");
        expect(screen.getByRole("link", { name: "Educación" })).toHaveAttribute("href", "#educacion");
        expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "#contacto");

        // Acciones a la derecha
        const cv = screen.getAllByTestId("button-link").find((el) => el.textContent?.includes("Currículum"))!;
        expect(cv).toHaveAttribute("href", "https://docs.google.com/document/d/1KSLajagC4F3yaq-9w9qMB9GPWoCWdH4c/edit?usp=sharing&ouid=107969967437438795414&rtpof=true&sd=true");
        expect(cv).toHaveAttribute("target", "_blank");
        expect(within(cv).getByTestId("icon-cv")).toBeInTheDocument(); // Busca icono DENTRO del botón

        const gh = screen.getAllByTestId("button-link").find((el) => el.textContent?.includes("GitHub"))!;
        expect(gh).toHaveAttribute("href", "https://github.com/Excintium");
        expect(gh).toHaveAttribute("target", "_blank");
        expect(within(gh).getByTestId("icon-github")).toBeInTheDocument(); // Busca icono DENTRO del botón

        const li = screen.getAllByTestId("button-link").find((el) => el.textContent?.includes("LinkedIn"))!;
        expect(li).toHaveAttribute("href", "https://www.linkedin.com/in/nicol%C3%A1s-fonseca");
        expect(li).toHaveAttribute("target", "_blank");
        expect(within(li).getByTestId("icon-linkedin")).toBeInTheDocument(); // Busca icono DENTRO del botón
    });

    it("muestra el switch de tema y llama onToggleDark al click", () => {
        const onToggleDark = vi.fn();
        render(<HeaderBar dark={false} onToggleDark={onToggleDark} />);

        // En desktop, solo debe haber UN switch
        const sw = screen.getByTestId("switch");
        expect(sw).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(sw);
        expect(onToggleDark).toHaveBeenCalledWith(true);
    });

    it("muestra el logo con aria-label y link a #inicio", () => {
        render(<HeaderBar dark={false} onToggleDark={() => {}} />);
        const logoLink = screen.getByRole("link", { name: "Ir al inicio" });
        expect(logoLink).toHaveAttribute("href", "#inicio");
        expect(screen.getByLabelText("Excintium")).toBeInTheDocument();
    });
});

describe("headerBar (mobile)", () => {
    it("oculta nav central y muestra botón de menú; abre y cierra el Drawer", () => {
        useBreakpointMock.mockReturnValue({ md: false });
        render(<HeaderBar dark={false} onToggleDark={() => {}} />);

        const menuBtn = screen.getByRole("button", { name: "Abrir menú" });
        expect(menuBtn).toBeInTheDocument();

        fireEvent.click(menuBtn);
        const drawer = screen.getByTestId("drawer");
        expect(drawer).toBeInTheDocument();

        const linkEdu = within(drawer).getByRole("link", { name: "Educación" });
        expect(linkEdu).toBeInTheDocument();

        fireEvent.click(linkEdu);
        expect(screen.queryByTestId("drawer")).toBeNull();
    });

    // ¡¡¡AQUÍ ESTÁ LA CORRECCIÓN!!!
    it("tiene otro switch de tema dentro del drawer y también invoca onToggleDark", () => {
        useBreakpointMock.mockReturnValue({ md: false });
        const onToggleDark = vi.fn();
        render(<HeaderBar dark={false} onToggleDark={onToggleDark} />);

        // Abre el drawer
        fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
        const drawer = screen.getByTestId("drawer");

        // 1. Busca el texto "Tema" DENTRO del drawer
        const temaText = within(drawer).getByText("Tema");

        // 2. Encuentra el 'div' padre que contiene el texto Y el switch
        const parentDiv = temaText.parentElement;

        expect(parentDiv).toBeInTheDocument(); // Asegura que encontramos el div

        // 3. Busca el switch DENTRO de ese 'div' específico
        // Usamos parentDiv! para decirle a TypeScript que sabemos que no es null
        const swInDrawer = within(parentDiv!).getByTestId("switch");

        // 4. Haz clic solo en ESE switch
        fireEvent.click(swInDrawer);

        expect(onToggleDark).toHaveBeenCalledWith(true);
    });
});