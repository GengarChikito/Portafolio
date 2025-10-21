import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ThemeSwitch } from "./themeSwitch";


// 🧩 Mock de íconos y antd
const switchSpy = vi.fn();

vi.mock("@ant-design/icons", () => ({
    MoonOutlined: () => <span data-testid="moon-icon" />,
    SunOutlined: () => <span data-testid="sun-icon" />,
}));

vi.mock("antd", () => ({
    Tooltip: ({ children, title }: any) => (
        <div data-testid="tooltip" data-title={title}>
            {children}
        </div>
    ),
    Switch: (props: any) => {
        switchSpy(props);
        const { checked, onChange, checkedChildren, unCheckedChildren } = props;
        return (
            <button
                data-testid="switch"
                data-checked={checked}
                onClick={() => onChange(!checked)}
            >
                {checked ? checkedChildren : unCheckedChildren}
            </button>
        );
    },
}));


describe("themeSwitch", () => {
    it("muestra el tooltip con el texto correcto según el modo", () => {
        const { rerender } = render(<ThemeSwitch dark={false} onChange={() => {}} />);
        const tooltip = screen.getByTestId("tooltip");
        expect(tooltip).toHaveAttribute("data-title", "Modo oscuro");

        rerender(<ThemeSwitch dark={true} onChange={() => {}} />);
        expect(screen.getByTestId("tooltip")).toHaveAttribute("data-title", "Modo claro");
    });

    it("renderiza el ícono correcto según el estado", () => {
        const { rerender } = render(<ThemeSwitch dark={false} onChange={() => {}} />);
        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("moon-icon")).toBeNull();

        rerender(<ThemeSwitch dark={true} onChange={() => {}} />);
        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("sun-icon")).toBeNull();
    });

    it("llama a onChange al hacer clic y alterna el valor", () => {
        const handleChange = vi.fn();
        render(<ThemeSwitch dark={false} onChange={handleChange} />);

        const switchBtn = screen.getByTestId("switch");
        fireEvent.click(switchBtn);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("snapshot", () => {
        const { container } = render(<ThemeSwitch dark={false} onChange={() => {}} />);
        expect(container).toMatchSnapshot();
    });
});
