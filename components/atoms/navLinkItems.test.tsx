import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { NavLinkItem } from './navLinkItems';

describe("NavLinkItem", () => {
    const props = {
        id: "about",
        label: "Sobre mí",
    };

    it("renderiza un enlace con el texto correcto", () => {
        render(<NavLinkItem {...props} />);
        const link = screen.getByRole("link", { name: props.label });
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(props.label);
    });

    it("usa el id para generar el href con ancla", () => {
        render(<NavLinkItem {...props} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `#${props.id}`);
    });

    it("aplica el estilo de padding horizontal", () => {
        render(<NavLinkItem {...props} />);
        const link = screen.getByRole("link");
        const style = (link as HTMLAnchorElement).style;
        expect(style.paddingInline).toBe("12px");
    });

    it("snapshot del componente", () => {
        const { container } = render(<NavLinkItem {...props} />);
        expect(container).toMatchSnapshot();
    });
});
