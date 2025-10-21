import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SectionTitle } from "./sectionTitle";

describe("SectionTitle", () => {
    const props = { text: "Experiencia Profesional" };

    it("renderiza un encabezado h2 con el texto correcto", () => {
        render(<SectionTitle {...props} />);
        const heading = screen.getByRole("heading", { level: 2, name: props.text });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(props.text);
    });

    it("aplica estilos de margen, padding y borde inferior", () => {
        render(<SectionTitle {...props} />);
        const heading = screen.getByRole("heading", { level: 2 });
        const style = (heading as HTMLElement).style;

        expect(style.marginBottom).toBe("16px");
        expect(style.paddingBottom).toBe("6px");
        expect(style.borderBottom).toContain("2px solid");
        // Verifica que incluya la variable CSS o fallback
        expect(style.borderBottom).toContain("var(--border-strong, #0048BA)");
    });

    it("snapshot del componente", () => {
        const { container } = render(<SectionTitle {...props} />);
        expect(container).toMatchSnapshot();
    });
});
