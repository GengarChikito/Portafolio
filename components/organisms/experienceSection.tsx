import { Card } from "antd";
// Importo mis estilos globales (para .section y .container)
import { styles } from "app/styles";
// Importo mi "base de datos" de perfil
import { profile } from "components/atoms/profile/profile";
// Importo mi átomo reutilizable para el título
import { SectionTitle } from "components/atoms/sectionTitle";

/**
 * Defino las props para esta sección.
 * En este caso, no necesita ninguna, porque todos los datos
 * los toma directamente del 'profile' que importo arriba.
 */
export interface ExperienceSectionProps {}

/**
 * Este es mi componente 'ExperienceSection', un "organismo".
 * Su trabajo es renderizar el título de la sección y luego
 * mapear (hacer un bucle) sobre mi lista de 'profile.experience'
 * para crear una 'Card' por cada trabajo.
 */
export function ExperienceSection(_: ExperienceSectionProps) {
    return (
        // Uso la <section> de HTML5 con el 'id' para que el ancla
        // del 'HeaderBar' funcione.
        <section id="experiencia" style={styles.section}>
            {/* Mi 'div' contenedor estándar para centrar el contenido */}
            <div className="container" style={styles.container}>

                {/* 1. Renderizo mi átomo de título */}
                <SectionTitle text="Experiencia" />

                {/* 2. Un div que usé para apilar las tarjetas (podría ser una clase CSS) */}
                <div style={{ display: "grid", gap: 12 }}>

                    {/* 3. Aquí hago el .map() sobre mi array de experiencia */}
                    {profile.experience.map((e) => (
                        // Por cada 'e' (experiencia) en el array, creo una Card
                        <Card
                            // React me pide una 'key' única para cada ítem de la lista
                            key={`${e.role}-${e.company}`}

                            // Le pongo mis estilos personalizados.
                            // Notar que uso mi variable CSS '--border-color'
                            // para que el borde cambie con el tema.
                            style={{
                                borderRadius: 16,
                                border: "1px solid var(--border-color, #E5E7EB)",
                            }}
                        >
                            {/* Este div es para la fila superior (título y fecha) */}
                            <div className="stack-sm" style={{ justifyContent: "space-between" }}>
                                <div>
                                    {/* El puesto (ej. "Supervisor") */}
                                    <h3 style={{ margin: 0 }}>{e.role}</h3>
                                    {/* La compañía */}
                                    <span style={{ color: "#888" }}>{e.company}</span>
                                </div>
                                {/* El período (ej. "2024 - Actualidad") */}
                                <span>{e.period}</span>
                            </div>

                            {/* El párrafo con los detalles del trabajo */}
                            <p style={{ marginTop: 8 }}>{e.details}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}