// components/atoms/skillPill.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SkillPill } from "./skillPill";


const tagSpy = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    return {
        Tag: (props: any) => {
            tagSpy(props);
            const { children, ...rest } = props;
            return (
                <div data-testid="antd-tag" {...rest}>
                    {children}
                </div>
            );
        },
        theme: {
            useToken: () => ({
                token: {
                    colorFillQuaternary: "#f5f5f5",
                    colorTextSecondary: "#333333",
                    colorBorderSecondary: "#d9d9d9",
                },
            }),
        },
    };
});


describe("skillPill", () => {
    it("renderiza el texto", () => {
        render(<SkillPill text="React" />);
        expect(screen.getByTestId("antd-tag")).toHaveTextContent("React");
    });

    it("aplica estilos derivados del tema (bg, color, borde) vía props.style", () => {
        render(<SkillPill text="React" />);
        expect(tagSpy).toHaveBeenCalled();

        const firstCallProps = tagSpy.mock.calls[0][0] as { style: React.CSSProperties };
        const st = firstCallProps.style;

        expect(st.backgroundColor).toBe("#f5f5f5");
        expect(st.color).toBe("#333333");
        expect(st.border).toBe("1px solid #d9d9d9");
        expect(st.fontWeight).toBe(500);
        expect(st.fontSize).toBe(13);
        expect(st.borderRadius).toBe(9999);
        expect(st.padding).toBe("4px 10px");
    });

    it("snapshot", () => {
        const { container } = render(<SkillPill text="React" />);
        expect(container).toMatchSnapshot();
    });
});
