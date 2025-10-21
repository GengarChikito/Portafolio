import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// ====== Mocks ======

// Lo definimos dentro de la fábrica () => ({...}) para evitar errores de hoisting
vi.mock("components/atoms/profile/profile", () => ({
    profile: {
        email: "test@example.com",
    },
}));

// 2. Mock de estilos
vi.mock("app/styles", () => ({
    styles: {
        section: { paddingTop: "50px" }, // Estilo falso
        container: { maxWidth: 900 },
    },
}));

// 3. Mock del componente SectionTitle
vi.mock("components/atoms/sectionTitle", () => ({
    SectionTitle: ({ text }: { text: string }) => (
        <h2 data-testid="section-title">{text}</h2>
    ),
}));

// 4. Mock del componente ContactForm
vi.mock("components/molecules/contactForm", () => ({
    ContactForm: () => (
        <div data-testid="contact-form-mock">Formulario de Contacto</div>
    ),
}));

// 5. Mock de Ant Design (Card)
vi.mock("antd", () => ({
    Card: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="antd-card" {...rest}>
            {children}
        </div>
    ),
}));


// ====== SUT (Componente a Probar) ======
import { ContactSection } from "./contactSection";

// ====== Tests ======

describe("ContactSection", () => {

    it("renderiza el título de la sección", () => {
        render(<ContactSection />);

        const title = screen.getByTestId("section-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Contacto");
    });

    it("renderiza el componente ContactForm", () => {
        render(<ContactSection />);

        expect(screen.getByTestId("contact-form-mock")).toBeInTheDocument();
        expect(screen.getByText("Formulario de Contacto")).toBeInTheDocument();
    });

    it("renderiza la Card de información de contacto", () => {
        render(<ContactSection />);

        // Busca la Card (simulada como un div)
        const card = screen.getByTestId("antd-card");
        expect(card).toBeInTheDocument();

        // Verifica que el contenido esté DENTRO de la card
        expect(within(card).getByText(/Ubicación:/)).toBeInTheDocument();
        expect(within(card).getByText("Santiago de Chile")).toBeInTheDocument();
        expect(within(card).getByText(/Email:/)).toBeInTheDocument();
    });

    it("renderiza el email del perfil con el enlace 'mailto:' correcto", () => {
        render(<ContactSection />);

        // Busca el enlace por el email (que viene del mock)
        const emailLink = screen.getByRole('link', { name: "test@example.com" });

        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });

});