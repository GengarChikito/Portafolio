import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// ====== Mocks ======

// 1. Mock de los datos del perfil (Experiencia)
// Definimos los datos DENTRO de la fábrica del mock para evitar errores de hoisting
vi.mock("components/atoms/profile/profile", () => ({
    profile: {
        experience: [
            {
                role: "Rol de Prueba 1",
                company: "Compañía de Prueba 1",
                period: "2023 - 2024",
                details: "Detalles de la experiencia 1."
            },
            {
                role: "Rol de Prueba 2",
                company: "Compañía de Prueba 2",
                period: "2021 - 2022",
                details: "Detalles de la experiencia 2."
            }
        ]
    },
}));

// 2. Mock de estilos
vi.mock("app/styles", () => ({
    styles: {
        section: { backgroundColor: "#fff" }, // Estilos falsos
        container: { maxWidth: 1200 },
    },
}));

// 3. Mock del componente SectionTitle
vi.mock("components/atoms/sectionTitle", () => ({
    SectionTitle: ({ text }: { text: string }) => (
        // Lo simulamos como un <h2> para que getByRole('heading') funcione
        <h2 data-testid="section-title">{text}</h2>
    ),
}));

// 4. Mock de Ant Design (Card)
vi.mock("antd", () => ({
    // Simulamos Card como un div que simplemente muestra sus hijos
    Card: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="antd-card" {...rest}>
            {children}
        </div>
    ),
}));


// ====== SUT (Componente a Probar) ======
import { ExperienceSection } from "./experienceSection";

// ====== Tests ======

describe("ExperienceSection", () => {

    it("renderiza el título de la sección correctamente", () => {
        render(<ExperienceSection />);

        // Busca el mock de SectionTitle
        const title = screen.getByTestId("section-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Experiencia");
    });

    it("renderiza una Card por cada item de experiencia en el perfil", () => {
        render(<ExperienceSection />);

        // Busca todas las 'Cards' simuladas
        const cards = screen.getAllByTestId("antd-card");

        // Debería haber 2 cards, según nuestro mock de profile.experience
        expect(cards).toHaveLength(2);
    });

    it("renderiza el contenido correcto dentro de cada Card de experiencia", () => {
        render(<ExperienceSection />);

        const cards = screen.getAllByTestId("antd-card");

        // --- Verifica Card 1
        const card1 = cards[0];
        // 'within' nos permite buscar solo DENTRO de la Card 1
        expect(within(card1).getByRole('heading', { name: "Rol de Prueba 1" })).toBeInTheDocument();
        expect(within(card1).getByText("Compañía de Prueba 1")).toBeInTheDocument();
        expect(within(card1).getByText("2023 - 2024")).toBeInTheDocument();
        expect(within(card1).getByText("Detalles de la experiencia 1.")).toBeInTheDocument();

        // --- Verifica Card 2
        const card2 = cards[1];
        // 'within' nos permite buscar solo DENTRO de la Card 2
        expect(within(card2).getByRole('heading', { name: "Rol de Prueba 2" })).toBeInTheDocument();
        expect(within(card2).getByText("Compañía de Prueba 2")).toBeInTheDocument();
        expect(within(card2).getByText("2021 - 2022")).toBeInTheDocument();
        expect(within(card2).getByText("Detalles de la experiencia 2.")).toBeInTheDocument();
    });

});