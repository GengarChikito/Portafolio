import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import CredlyBadge from './credlyBadge';


vi.mock("antd", () => {
    return {
        Card: ({ children, hoverable, ...rest }: any) => (
            <div data-testid="antd-card" {...rest}>{children}</div>
        ),
        Tooltip: ({ children }: any) => <>{children}</>,
    };
});



const props = {
    name: "Data Visualization Expert",
    issuer: "CertiProf",
    issued: "Mar 2024",
    imageUrl: "https://images.credly.com/badge.png",
    credentialUrl: "https://www.credly.com/badges/xyz",
};

describe("CredlyBadge", () => {
    it("renderiza el enlace envolviendo todo con href, target y rel correctos", () => {
        render(<CredlyBadge {...props} />);

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", props.credentialUrl);
        expect(link).toHaveAttribute("target", "_blank");
        // sólo comprueba que incluya noreferrer (puede tener más valores)
        expect(link.getAttribute("rel")).toContain("noreferrer");

        // El contenido está dentro del link
        const card = within(link).getByTestId("antd-card");
        expect(card).toBeInTheDocument();
    });

    it("muestra la imagen con src y alt accesibles", () => {
        render(<CredlyBadge {...props} />);

        const img = screen.getByRole("img", { name: props.name });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", props.imageUrl);
        expect(img).toHaveAttribute("alt", props.name);
    });

    it("muestra el nombre como heading y los metadatos de issuer/issued", () => {
        render(<CredlyBadge {...props} />);

        // h4 => role=heading level=4
        const heading = screen.getByRole("heading", { level: 4, name: props.name });
        expect(heading).toBeInTheDocument();

        // Texto combinado: "issuer · issued"
        expect(
            screen.getByText(`${props.issuer} · ${props.issued}`)
        ).toBeInTheDocument();
    });

    it("snapshot básico (estructura estable del output)", () => {
        const { container } = render(<CredlyBadge {...props} />);
        expect(container).toMatchSnapshot();
    });
});
