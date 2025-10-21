import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ====== Mocks ======

// 1. Mock de los datos del perfil
// CORRECCIÓN: El objeto mock DEBE estar DENTRO de la fábrica () => ({...})
// para evitar el error de hoisting (elevación).
vi.mock("components/atoms/profile/profile", () => ({
    profile: {
        name: "Nicolás de Prueba",
        headline: "Titular de Prueba de HeroSection",
        photoUrl: "/assets/test-foto.jpg",
        skills: ["React Test", "Vitest Test", "TypeScript Test"],
    },
}));

// 2. Mock de estilos (como fábrica)
vi.mock("app/styles", () => ({
    styles: {
        section: { border: "1px solid red" },
        container: { margin: "0 auto" },
    },
}));

// 3. Mock del componente SkillPill (como fábrica)
vi.mock("components/atoms/skillPill", () => ({
    SkillPill: ({ text }: { text: string }) => (
        <span data-testid="skill-pill">{text}</span>
    ),
}));

// 4. Mock de Ant Design (como fábrica asíncrona)
// (Usamos async/await porque necesitamos importar 'react' real adentro)
vi.mock("antd", async () => {
    const ActualReact = await vi.importActual<typeof React>('react');

    const Row = ({ children, ...rest }: any) => <div data-testid="row" {...rest}>{children}</div>;
    const Col = ({ children, ...rest }: any) => <div data-testid="col" {...rest}>{children}</div>;
    // Limpiamos 'wrap' para que no pase al div
    const Space = ({ children, wrap, ...rest }: any) => <div data-testid="space" {...rest}>{children}</div>;
    const Card = ({ children, ...rest }: any) => <div data-testid="card" {...rest}>{children}</div>;

    const Typography: any = ({ children }: any) => <span>{children}</span>;
    Typography.Title = ({ children, ...rest }: any) => <h1 {...rest}>{children}</h1>;
    Typography.Paragraph = ({ children, ...rest }: any) => <p {...rest}>{children}</p>;

    // Limpiamos 'icon' para que no pase al DOM y lo renderizamos adentro
    const Button = ({ children, href, icon, ...rest }: any) => {
        const iconElement = ActualReact.isValidElement(icon) ? icon : null;
        if (href) {
            return <a data-testid="button-link" href={href} {...rest}>{iconElement}{children}</a>;
        }
        return <button data-testid="button" {...rest}>{iconElement}{children}</button>;
    };

    return { Row, Col, Typography, Space, Button, Card };
});


// ====== SUT (Componente a Probar) ======
// Esta importación ahora usará los mocks definidos arriba
import { HeroSection } from "./heroSection";


// ====== Tests ======

describe("HeroSection", () => {

    it("renderiza el nombre y titular del perfil (datos del mock)", () => {
        render(<HeroSection />);

        // Verifica que el nombre del mock ("Nicolás de Prueba") esté en un heading
        expect(screen.getByRole('heading', { name: "Nicolás de Prueba" })).toBeInTheDocument();

        // Verifica que el titular del mock esté en la pantalla
        expect(screen.getByText("Titular de Prueba de HeroSection")).toBeInTheDocument();
    });

    it("renderiza la descripción estática", () => {
        render(<HeroSection />);
        // Verifica que el párrafo de texto fijo (el que está en tu componente) exista
        expect(screen.getByText(/Profesional con experiencia en supervisión de operaciones/)).toBeInTheDocument();
    });

    it("renderiza los botones de acción con los enlaces correctos", () => {
        render(<HeroSection />);

        const proyectosBtn = screen.getByRole('link', { name: "Ver proyectos" });
        expect(proyectosBtn).toBeInTheDocument();
        expect(proyectosBtn).toHaveAttribute('href', '#proyectos');

        const experienciaBtn = screen.getByRole('link', { name: "Experiencia laboral" });
        expect(experienciaBtn).toBeInTheDocument();
        expect(experienciaBtn).toHaveAttribute('href', '#experiencia');
    });

    it("renderiza la lista de skills usando SkillPill (datos del mock)", () => {
        render(<HeroSection />);

        const skillPills = screen.getAllByTestId("skill-pill");

        // Verifica que la cantidad sea la misma que definimos en el mock (3)
        expect(skillPills).toHaveLength(3);

        // Verifica que el texto de cada skill (del mock) esté presente
        expect(screen.getByText("React Test")).toBeInTheDocument();
        expect(screen.getByText("Vitest Test")).toBeInTheDocument();
        expect(screen.getByText("TypeScript Test")).toBeInTheDocument();
    });

    it("renderiza la imagen de perfil con el 'alt' text y 'src' correctos (datos del mock)", () => {
        render(<HeroSection />);

        const img = screen.getByRole('img', { name: "Foto profesional" });

        expect(img).toBeInTheDocument();
        // Verifica el src del mock
        expect(img).toHaveAttribute('src', "/assets/test-foto.jpg");
    });
});