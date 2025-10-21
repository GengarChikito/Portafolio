import { Switch, Tooltip } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

/**
 * Defino las 'props' para mi interruptor de tema.
 * - 'dark': Un booleano que me dice si el modo oscuro está activo o no.
 * - 'onChange': La función que se va a ejecutar cuando haga clic en el switch.
 * Me devuelve el nuevo valor (true si se activa, false si se desactiva).
 */
export interface ThemeSwitchProps {
    dark: boolean;
    onChange: (value: boolean) => void;
}

/**
 * Este es mi componente 'ThemeSwitch'. Es un átomo simple
 * que uso en el Header para permitir al usuario cambiar
 * entre el modo claro y el modo oscuro.
 */
export function ThemeSwitch({ dark, onChange }: ThemeSwitchProps) {
    return (
        // Envolví el Switch en un Tooltip de Ant Design...
        // ...así, cuando el usuario pasa el mouse por encima,
        // le digo qué es lo que hará el botón (ej. "Modo claro").
        <Tooltip title={dark ? "Modo claro" : "Modo oscuro"}>

            {/* Este es el interruptor (Switch) principal de Ant Design.
              - 'checked={dark}': Le digo que esté "encendido" si la prop 'dark' es true.
              - 'onChange={onChange}': Le paso la función que recibí en las props
                                       para que la llame cuando se haga clic.
              - 'checkedChildren': Es el ícono que muestro CUANDO está encendido (Luna).
              - 'unCheckedChildren': Es el ícono CUANDO está apagado (Sol).
            */}
            <Switch
                checked={dark}
                onChange={onChange}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
            />
        </Tooltip>
    );
}