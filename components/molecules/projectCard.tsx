import { Card, Space, Tag } from "antd";

/**
 * Defino las 'props' que mi ProjectCard necesita.
 * Esto me obliga a pasarle toda la información
 * correcta desde el objeto 'profile'.
 */
export interface ProjectCardProps {
    /** El título que se mostrará en la tarjeta. */
    title: string;
    /** La descripción corta (summary) del proyecto. */
    summary: string;
    /** Un array de strings (ej. ["React", "TypeScript"]) para las 'Tags'. */
    tags: string[];
    /** La URL (http o data-uri) de la imagen de portada. */
    image: string;
    /** El enlace externo (ej. a GitHub o Vercel) al que irá la tarjeta. */
    link: string;
}

/**
 * Este es mi componente 'ProjectCard' (molécula).
 * Lo diseño para que sea una tarjeta clickeable que muestra
 * la vista previa de uno de mis proyectos.
 */
export function ProjectCard({ title, summary, tags, image, link }: ProjectCardProps) {
    return (
        // Envuelvo toda la 'Card' en un enlace '<a>' para que sea
        // completamente clickeable y lleve al 'link' del proyecto.
        <a href={link} target="_blank" rel="noreferrer">
            <Card
                hoverable // Activo el efecto de sombra de Ant Design al pasar el mouse.
                className="project-card" // Una clase CSS para estilos personalizados (como el tamaño de la img)

                // 'cover' es una prop de Ant Design para poner una imagen en la cabecera.
                cover={
                    <img
                        src={image}
                        alt={title} // El 'alt' text es crucial para accesibilidad.
                        /* El tamaño de esta imagen (200px) lo defino en app.css
                           usando la clase .project-card img {} */
                    />
                }
                // Aplico estilos para bordes redondeados y un borde que usa
                // mi variable CSS (--border-color) para que cambie con el tema.
                style={{
                    borderRadius: 16,
                    border: "1px solid var(--border-color, #E5E7EB)",
                }}
            >
                {/* 'Card. Meta' es un sub-componente de Ant Design
                    perfecto para mostrar un título y una descripción. */}
                <Card.Meta title={title} description={summary} />

                {/* Uso un componente 'Space' de Ant Design para apilar
                    mis 'Tags' y que se ajusten ('wrap') si no caben. */}
                <Space wrap size={[6, 6]} style={{ marginTop: 12 }}>
                    {/* Hago un .map() sobre el array 'tags' que recibí en las props
                        y renderizo un componente <Tag> por cada uno. */}
                    {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </Space>
            </Card>
        </a>
    );
}