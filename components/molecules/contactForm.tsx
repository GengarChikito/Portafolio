import { Form, Input, Button, message } from "antd";

/**
 * Defino las 'props' para este componente.
 * En este caso, no necesito ninguna prop, pero mantengo la interfaz
 * por si decido añadirle algo en el futuro (como un título).
 */
export interface ContactFormProps {}

/**
 * Este es mi componente 'ContactForm', una "molécula".
 * Es un formulario simple de Ant Design para que los visitantes
 * me puedan enviar un mensaje.
 */
export function ContactForm(_: ContactFormProps) {
    // Uso el hook 'useForm' de Ant Design.
    // Esto me da una instancia de 'form' que puedo usar para
    // controlar el formulario, como por ejemplo, para limpiarlo.
    const [form] = Form.useForm();

    /**
     * Esta es la función que se ejecuta cuando el formulario se envía
     * y *pasa* todas las validaciones (es decir, todos los campos
     * requeridos están llenos).
     */
    async function onFinish(): Promise<void> {
        // Por ahora, no estoy enviando el formulario a un backend (es un TODO).
        // Simplemente muestro un mensaje de éxito con 'message.success'.
        message.success("Gracias por tu mensaje. Te responderé pronto.");

        // Uso la instancia 'form' para limpiar (resetear) los campos
        // después de que se envía exitosamente.
        form.resetFields();
    }

    return (
       /* // Aquí empieza el formulario.
        // layout="vertical" pone las etiquetas (label) encima de los campos.
        // Le paso mi instancia 'form' y mi función 'onFinish'.*/
        <Form layout="vertical" form={form} onFinish={onFinish}>

            {/* Campo 1: Nombre */}
            <Form.Item
                label="Nombre"
                name="name"
               /* // 'rules' define las reglas de validación.
                // Aquí, es un campo obligatorio.*/
                rules={[{ required: true, message: "Ingresa tu nombre" }]}
            >
                <Input placeholder="Tu nombre" />
            </Form.Item>

            {/* Campo 2: Correo */}
            <Form.Item
                label="Correo"
                name="email"
                // Añado dos reglas: es obligatorio y debe ser de tipo 'email'.
                rules={[{ required: true, type: "email", message: "Correo válido" }]}
            >
                <Input placeholder="tu@correo.com" />
            </Form.Item>

            {/* Campo 3: Mensaje */}
            <Form.Item
                label="Mensaje"
                name="msg"
                rules={[{ required: true, message: "Escribe tu mensaje" }]}
            >
                {/* Uso 'Input. TextArea' para un campo de texto más grande. */}
                <Input.TextArea rows={5} placeholder="¿En qué puedo ayudarte?" />
            </Form.Item>

            {/* Botón de envío */}
            <Button type="primary" htmlType="submit">
                Enviar
            </Button>
        </Form>
    );
}