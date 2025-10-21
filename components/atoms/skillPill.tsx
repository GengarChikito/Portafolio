import { Tag, theme } from "antd";

/**
 * Defino las 'props' para este componente. Súper simple:
 * - 'text': La habilidad que quiero mostrar (ej. "React", "Python").
 */
export interface SkillPillProps {
    text: string;
}

/**
 * Este es mi átomo 'SkillPill'. Lo uso en la sección Hero
 * para mostrar la lista de mis habilidades.
 */
export function SkillPill({ text }: SkillPillProps) {
    // Aquí está la magia: uso el hook 'useToken' de Ant Design.
    // Esto me da acceso a las variables de color del tema que esté activo (claro u oscuro).
    const { token } = theme.useToken();

    // Saco los colores específicos que quiero del 'token'.
    // Usamos colorBgContainer o colorFillQuaternary para el fondo de la burbuja.
    const bg = token.colorBgContainer || token.colorFillQuaternary;
    // 'colorTextSecondary' es el color de texto secundario (un gris suave).
    const fg = token.colorTextSecondary;
    // 'colorBorderSecondary' es el borde sutil. Si no existe, usa el borde normal.
    const border = token.colorBorderSecondary || token.colorBorder;

    return (
        // Uso el componente <Tag> de Ant Design.
        // Le paso los colores que saqué del 'token' a la prop 'style'.
        // Así, cuando el tema cambie de claro a oscuro, 'bg', 'fg', y 'border'
        // tendrán valores diferentes, y la Tag se repintará sola.
        <Tag
            style={{
                backgroundColor: bg,
                color: fg,
                border: `1px solid ${border}`,
                fontWeight: 500,
                fontSize: 13,
                padding: "4px 10px",
                borderRadius: 9999, // La forma clásica de hacer un "pill"
                marginBottom: 8, // Un pequeño margen para que respiren
            }}
        >
            {text}
        </Tag>
    );
}
