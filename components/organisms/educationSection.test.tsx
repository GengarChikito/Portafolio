import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

// Importa el TIPO de componente, pero no el componente en sí
import type { EducationSectionProps } from "./educationSection";

// ====== Mocks Globales (los que no cambian) ======

vi.mock("app/styles", () => ({
    styles: {
        section: { backgroundColor: "#fafafa" },
        container: { maxWidth: 1000 },
    },
}));

vi.mock("components/atoms/sectionTitle", () => ({
    SectionTitle: ({ text }: { text: string }) => (
        <h2 data-testid="section-title">{text}</h2>
    ),
}));

// Mock de Ant Design (Card)
vi.mock("antd", () => ({
    // CORRECCIÓN: Destructuramos 'hoverable' para que no se pase al 'div'
    Card: ({ children, hoverable, ...rest }: { children: React.ReactNode; hoverable?: boolean; [key: string]: any }) => (
        <div data-testid="antd-card" {...rest}>
            {children}
        </div>
    ),
}));

// Variable para guardar el componente importado
let EducationSection: React.ComponentType<EducationSectionProps>;

// --- Suite 1: Pruebas con datos completos ---
describe("EducationSection (Con Datos)", () => {

    beforeEach(async () => {
        // 1. Define el mock para ESTA suite
        vi.doMock("components/atoms/profile/profile", () => ({
            profile: {
                education: [
                    {
                        grade: "Ingeniería de Prueba",
                        place: "Universidad Falsa",
                        period: "2020 - 2024",
                        details: "Detalles de educación aquí."
                    }
                ],
                certification: [
                    {
                        certificateName: "Certificado de React",
                        issuer: "Platzi",
                        issued: "Ene 2024",
                        credentialUrl: "https://example.com/react",
                        imageUrl: "https://example.com/img/react.png"
                    },
                    {
                        certificateName: "Certificado de Vitest",
                        issuer: "Vitest",
                        issued: "Feb 2024",
                        credentialUrl: "https://example.com/vitest",
                        imageUrl: "https://example.com/img/vitest.png"
                    }
                ]
            },
        }));

        // 2. Importa el componente *después* de definir el mock
        const module = await import("./educationSection");
        EducationSection = module.EducationSection;

        // 3. Renderiza el componente
        render(<EducationSection />);
    });

    afterEach(() => {
        // 4. Limpia los mocks y el caché de importación
        vi.resetModules();
    });

    it("renderiza los títulos de sección 'Educación' y 'Certificaciones'", () => {
        expect(screen.getByText("Educación")).toBeInTheDocument();
        expect(screen.getByText("Certificaciones")).toBeInTheDocument();
    });

    it("renderiza la tarjeta de educación con datos del perfil", () => {
        const cards = screen.getAllByTestId("antd-card");

        const eduCard = cards.find(card =>
            !card.classList.contains('certification-card') &&
            !card.textContent?.includes('mi perfil de Credly')
        );

        expect(eduCard).toBeInTheDocument();

        expect(within(eduCard!).getByRole('heading', { name: "Ingeniería de Prueba" })).toBeInTheDocument();
        expect(within(eduCard!).getByText("Universidad Falsa")).toBeInTheDocument();
        expect(within(eduCard!).getByText("2020 - 2024")).toBeInTheDocument();
        expect(within(eduCard!).getByText("Detalles de educación aquí.")).toBeInTheDocument();
    });

    it("renderiza las tarjetas de certificación como enlaces", () => {
        // @ts-ignore
        const certLinks = screen.getAllByRole('link').filter(a => a.href.startsWith('https://example.com'));

        expect(certLinks).toHaveLength(2);

        expect(certLinks[0]).toHaveAttribute('href', 'https://example.com/react');
        expect(within(certLinks[0]).getByRole('img', { name: "Certificado de React" })).toBeInTheDocument();

        expect(certLinks[1]).toHaveAttribute('href', 'https://example.com/vitest');
        expect(within(certLinks[1]).getByRole('img', { name: "Certificado de Vitest" })).toBeInTheDocument();
    });

    it("renderiza el enlace a Credly al final cuando hay certificaciones", () => {
        const credlyLink = screen.getByRole('link', { name: "mi perfil de Credly" });
        expect(credlyLink).toBeInTheDocument();
    });
});

// --- Suite 2: Pruebas con certificaciones vacías ---
describe("EducationSection (Estado Vacío)", () => {

    beforeEach(async () => {
        // 1. Define el mock VACÍO para ESTA suite
        vi.doMock("components/atoms/profile/profile", () => ({
            profile: {
                education: [],
                certification: [] // Lista vacía
            },
        }));

        // 2. Importa el componente
        const module = await import("./educationSection");
        EducationSection = module.EducationSection;

        // 3. Renderiza
        render(<EducationSection />);
    });

    afterEach(() => {
        // 4. Limpia
        vi.resetModules();
    });

    it("renderiza el enlace a Credly en el estado vacío si no hay certificaciones", () => {
        // No deberían aparecer imágenes de certificación
        expect(screen.queryByRole('img')).toBeNull();

        // El enlace a Credly SÍ debe aparecer
        const credlyLink = screen.getByRole('link', { name: "mi perfil de Credly" });
        expect(credlyLink).toBeInTheDocument();
        expect(credlyLink).toHaveAttribute('href', 'https://www.credly.com/users/nicolas-esteban-fonseca-olivares');
    });
});