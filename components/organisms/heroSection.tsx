import { Row, Col, Typography, Space, Button, Card } from "antd";
// Importo mis estilos y datos de perfil
import { styles } from "app/styles";
import { profile } from "components/atoms/profile/profile";
// Importo mi átomo 'SkillPill'
import { SkillPill } from "components/atoms/skillPill";

/**
 * Defino las 'props' para esta sección.
 * No le paso ninguna prop porque, al ser un "organismo" de alto nivel,
 * importa directamente todo lo que necesita, como el 'profile'.
 */
export interface HeroSectionProps {}

/**
 * Este es mi componente 'HeroSection', el "organismo" principal.
 * Es la primera sección que ve el usuario, con mi nombre, titular, foto
 * y llamadas a la acción.
 */
export function HeroSection(_: HeroSectionProps) {
    return (
        // Uso una <section> con el 'id' para la navegación
        // Le quito el 'borderTop' que 'styles.section' suele tener.
        <section id="inicio" style={{ ...styles.section, borderTop: "none" }}>
            <div className="container" style={styles.container}>

                {/* Uso el sistema de Grids (Row/Col) de Ant Design para
                    dividir la sección en dos columnas (texto e imagen)
                    que se reordenan solas en móvil (xs={24}).
                */}
                <Row gutter={[24, 24]} align="middle">

                    {/* --- COLUMNA IZQUIERDA (Texto) --- */}
                    <Col xs={24} md={14}>

                        {/* Mi nombre, sacado de profile.tsx */}
                        <Typography.Title style={{ marginBottom: 8 }}>
                            {profile.name}
                        </Typography.Title>

                        {/* Mi titular, sacado de profile.tsx */}
                        <Typography.Paragraph style={{ fontSize: 18, marginBottom: 16 }}>
                            {profile.headline}
                        </Typography.Paragraph>

                        {/* Este párrafo descriptivo lo escribí (hardcodeé) aquí mismo
                            porque es específico de esta sección.
                        */}
                        <Typography.Paragraph style={{ fontSize: 16 }}>
                            Profesional con experiencia en supervisión de operaciones e-commerce y coordinación de equipos.
                            En formación como Ingeniero en Informática, con dominio en React, TypeScript y Python.
                            Mi enfoque combina la gestión operativa con la analítica de datos y la mejora continua,
                            impulsando eficiencia y resultados medibles.
                        </Typography.Paragraph>

                        {/* Botones de llamada a la acción (CTA) */}
                        <Space wrap size={[8, 8]} style={{ marginInline: 25 }}>
                            <Button type="primary" size="large" href="#proyectos">Ver proyectos</Button>
                            <Button size="large" href="#experiencia">Experiencia laboral</Button>
                        </Space>

                        {/* Aquí hago el .map() de mis habilidades */}
                        <Space wrap size={[8, 8]} style={{ marginTop: 24 }}>
                            {/* Por cada 's' (skill) en mi array 'profile.skills'... */}
                            {profile.skills.map((s) => (
                                // ...renderizo mi átomo 'SkillPill'.
                                <SkillPill key={s} text={s} />
                            ))}
                        </Space>
                    </Col>

                    {/* --- COLUMNA DERECHA (Imagen) --- */}
                    <Col xs={24} md={10}>
                        {/* Usé una 'Card' de Ant Design para darle un borde
                            y sombra a la imagen, haciéndola resaltar.
                        */}
                        <Card
                            style={{
                                borderRadius: 16,
                                border: "1px solid var(--border-color, #E5E7EB)", // Borde adaptable al tema
                                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                color: "#000000",
                            }}
                        >
                            {/* Un 'div' extra solo para redondear las esquinas de la imagen */}
                            <div style={{ borderRadius: 14, overflow: "hidden" }}>
                                <img
                                    // Saco la URL de mi foto desde profile.tsx
                                    src={profile.photoUrl}
                                    alt="../assets/Foto.jpg"
                                    style={{ width: "100%", height: 360, objectFit: "cover" }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
}