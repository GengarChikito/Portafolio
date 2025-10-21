import { Card } from "antd";
// Importo mis estilos y datos de perfil
import { styles } from "app/styles";
import { profile } from "components/atoms/profile/profile";
// Importo mis átomos reutilizables
import { SectionTitle } from "components/atoms/sectionTitle";

/**
 * Defino las 'props' para esta sección.
 * No necesito ninguna porque todos los datos los jalo
 * directamente desde el objeto 'profile' importado.
 */
export interface EducationSectionProps {}

/**
 * Este es mi componente 'EducationSection', un "organismo".
 * Solo renderiza la Educación Formal del perfil.
 */
export function EducationSection(_: EducationSectionProps) {
    return (
        // La <section> principal, con el 'id' para la navegación
        <section id="educacion" style={styles.section}>
            <div className="container" style={styles.container}>

                {/* --- 1. SECCIÓN DE EDUCACIÓN FORMAL --- */}

                {/* Reutilizo mi átomo de título */}
                <SectionTitle text="Educación" />

                {/* Un 'grid' simple para apilar las tarjetas de educación */}
                <div style={{ display: "grid", gap: 12 }}>

                    {/* Hago .map() sobre mi array 'profile.education' */}
                    {profile.education.map((e) => (
                        <Card
                            // Uso una key única combinando el grado y el lugar
                            key={`${e.grade}-${e.place}`}

                            // Estilos para los bordes, usando mi variable CSS
                            style={{
                                borderRadius: 16,
                                border: "1px solid var(--border-color, #E5E7EB)",
                            }}
                        >
                            {/* Un div simple para alinear el título y el período */}
                            <div className="stack-sm" style={{ justifyContent: "space-between" }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{e.grade}</h3>
                                    <span style={{ color: "#888" }}>{e.place}</span>
                                </div>
                                <span>{e.period}</span>
                            </div>

                            {/* Renderizado condicional:
                                Solo muestro el párrafo <p> si 'e.details' existe.
                            */}
                            {e.details && <p style={{ marginTop: 8 }}>{e.details}</p>}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}