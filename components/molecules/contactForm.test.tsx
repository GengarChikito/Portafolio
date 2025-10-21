import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./contactForm";


// 🧩 Mock de antd
const formSpy = vi.fn();
const messageSpy = vi.fn();

const mockFormInstance = {
    resetFields: vi.fn(),
};

vi.mock("antd", () => {
    const Input = (props: any) => (
        <input data-testid={props["data-testid"] || "input"} {...props} />
    );
    Input.TextArea = (props: any) => (
        <textarea data-testid="textarea" {...props}></textarea>
    );

    return {
        Form: Object.assign(
            ({ children, onFinish, layout, form }: any) => {
                formSpy({ layout, form });
                // simulamos el submit manualmente con un botón
                return (
                    <form
                        data-testid="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onFinish?.();
                        }}
                    >
                        {children}
                    </form>
                );
            },
            {
                useForm: () => [mockFormInstance],
                Item: ({ children, label }: any) => (
                    <label data-testid={`label-${label}`}>
                        {label}
                        {children}
                    </label>
                ),
            }
        ),
        Input,
        Button: ({ children, htmlType }: any) => (
            <button data-testid="button" type={htmlType}>
                {children}
            </button>
        ),
        message: {
            success: (msg: string) => messageSpy(msg),
        },
    };
});


describe("contactForm", () => {
    it("renderiza los campos y etiquetas correctamente", () => {
        render(<ContactForm />);
        expect(screen.getByTestId("label-Nombre")).toBeInTheDocument();
        expect(screen.getByTestId("label-Correo")).toBeInTheDocument();
        expect(screen.getByTestId("label-Mensaje")).toBeInTheDocument();

        // Inputs visibles
        expect(screen.getAllByRole("textbox").length).toBeGreaterThan(0);
        expect(screen.getByTestId("textarea")).toBeInTheDocument();
    });

    it("al enviar el formulario muestra mensaje de éxito y resetea campos", async () => {
        render(<ContactForm />);

        const form = screen.getByTestId("form");
        fireEvent.submit(form);

        await waitFor(() => {
            expect(messageSpy).toHaveBeenCalledWith(
                "Gracias por tu mensaje. Te responderé pronto."
            );
        });

        expect(mockFormInstance.resetFields).toHaveBeenCalledTimes(1);
    });

    it("snapshot del formulario", () => {
        const { container } = render(<ContactForm />);
        expect(container).toMatchSnapshot();
    });
});
