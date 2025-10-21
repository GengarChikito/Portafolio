import { Card } from "antd";
// Importo mis estilos globales
import { styles } from "app/styles";
// Importo mi objeto de perfil para sacar mi email
import { profile } from "components/atoms/profile/profile";
// Importo mi átomo de título de sección
import { SectionTitle } from "components/atoms/sectionTitle";
// Importo mi molécula de formulario
import { ContactForm } from "components/molecules/contactForm";

/**
 * Defino las 'props'. Esta sección no necesita ninguna,
 * ya que obtiene todos sus datos de los componentes
 * hijos y del objeto 'profile' importado.
 */
export interface ContactSectionProps {}

/**
 * Este es mi componente 'ContactSection', que defino como un "organismo".
 * Su trabajo es juntar la molécula 'ContactForm' y una 'Card' de información
 * para crear la sección de contacto completa de la página.
 */
export function ContactSection(_: ContactSectionProps) {
    return (
        // Uso una <section> HTML con el ID 'contacto' para que
        // la barra de navegación pueda saltar aquí.
        <section id="contacto" style={styles.section}>
            {/* Uso mi 'div' contenedor estándar para centrar el contenido */}
            <div className="container" style={styles.container}>

                {/* 1. Reutilizo mi átomo 'SectionTitle' */}
                <SectionTitle text="Contacto" />

                {/* Hago un 'grid' simple para apilar el formulario y la tarjeta de info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>

                    {/* 2. Renderizo la molécula del formulario que hice antes */}
                    <ContactForm />

                    {/* 3. Renderizo una 'Card' de Ant Design justo debajo del formulario */}
                    <Card
                        style={{
                            borderRadius: 16,
                            // Uso mi variable CSS '--border-color' para que el borde
                            // cambie automáticamente con el tema claro/oscuro.
                            border: "1px solid var(--border-color, #E5E7EB)",
                        }}
                    >
                        {/* Información estática */}
                        <div><b>Ubicación:</b> Santiago de Chile</div>

                        {/* Información dinámica */}
                        <div>
                            <b>Email:</b>{" "}
                            {/* Aquí jalo el email desde mi objeto 'profile'
                                y lo uso para crear un enlace 'mailto:'
                            */}
                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}