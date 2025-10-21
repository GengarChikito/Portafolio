/**
 * Defino las 'props' de este componente. Solo necesito una:
 * - 'text': El título que quiero mostrar (ej. "Experiencia", "Educación").
 */
export interface SectionTitleProps { text: string; }

/**
 * Este es mi átomo 'SectionTitle'.
 * Lo creé para no tener que repetir los estilos del título (el <h2>)
 * en cada una de las secciones de mi portafolio.
 * Así, si quiero cambiar el estilo de todos los títulos, solo lo hago aquí.
 */
export function SectionTitle({ text }: SectionTitleProps) {
    return (
        // Es un <h2> simple con estilos en línea.
        // Uso una variable CSS (--border-strong) para el color del borde inferior,
        // así el color cambia automáticamente cuando cambio de tema (light/dark).
        // El #0048BA es solo un 'fallback' o valor por defecto si la variable no carga.
        <h2 style={{ marginBottom: 16, paddingBottom: 6, borderBottom: "2px solid var(--border-strong, #0048BA)" }}>
            {text}
        </h2>
    );
}