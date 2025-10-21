/**
 * Defino las 'props' para este componente. Es súper simple:
 * - 'id': El ID de la sección a la que quiero navegar (ej. "proyectos").
 * - 'label': El texto que se va a mostrar en el enlace (ej. "Proyectos").
 */
export interface NavLinkItemProps { id: string; label: string; }

/**
 * Este es mi componente 'NavLinkItem', es solo un átomo.
 * Su única responsabilidad es renderizar un enlace '<a>' que navega
 * a una sección (un "ancla" o "hash link") dentro de la misma página.
 */
export function NavLinkItem({ id, label }: NavLinkItemProps) {
    return (
        // Renderizo un '<a>' normal.
        // Uso el 'id' para crear el 'href' (ej. "#proyectos").
        // Le pongo un poco de padding para que no esté pegado a otros enlaces.
        <a href={`#${id}`} style={{ paddingInline: 12 }}>
            {label}
        </a>
    );
}