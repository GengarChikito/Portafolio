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
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        // Uso una <section> con el 'id' para la navegación
        // Uso un 'minHeight' (altura mínima) para que la sección se extienda
        // y el centrado vertical de Ant Design funcione mejor.
        <section id="inicio" style={{ ...styles.section, borderTop: "none", minHeight: 'calc(100vh - 64px)' }}>
            <div className="container" style={styles.container}>

                {/* Uso el sistema de Grids (Row/Col) de Ant Design para
                    dividir la sección en dos columnas (texto e imagen)
                    que se reordenan solas en móvil (xs={24}).
                */}
                <Row gutter={[32, 32]} align="middle"> {/* 'align="middle"' centra verticalmente las columnas entre sí */}

                    {/* --- COLUMNA IZQUIERDA (Texto) --- */}
                    <Col xs={24} md={14}>
                        <div style={{ paddingBlock: 40 }}> {/* AÑADIDO: Padding extra para darle respiro superior/inferior a este bloque y centrarlo mejor */}

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
                                {profile.description} {/* Usando la descripción del perfil para ser dinámico */}
                            </Typography.Paragraph>

                            {/* Botones de llamada a la acción (CTA) */}
                            {/* Envuelvo el Space de botones para controlar el centrado en móvil y alineación en desktop */}
                            <div style={{ display: 'flex', justifyContent: 'center', '@media (min-width: 768px)': { justifyContent: 'flex-start' } as any }}>
                                <Space wrap size={[16, 16]} style={{ marginTop: 24, width: '100%' }}>
                                    <Button type="primary" size="large" href="#proyectos">Ver proyectos</Button>
                                    <Button size="large" href="#experiencia">Experiencia laboral</Button>
                                </Space>
                            </div>


                            {/* Aquí hago el .map() de mis habilidades */}
                            {/* Envuelvo el Space de Skills para controlar el centrado */}
                            <div style={{ display: 'flex', justifyContent: 'center', '@media (min-width: 768px)': { justifyContent: 'flex-start' } as any }}>
                                <Space wrap size={[8, 8]} style={{ marginTop: 32 }}>
                                    {/* Por cada 's' (skill) en mi array 'profile.skills'... */}
                                    {profile.skills.map((s) => (
                                        // ...renderizo mi átomo 'SkillPill'.
                                        <SkillPill key={s} text={s} />
                                    ))}
                                </Space>
                            </div>
                        </div>
                    </Col>

                    {/* --- COLUMNA DERECHA (Imagen) --- */}
                    <Col xs={24} md={10}>
                        <Card
                            // AJUSTADO: Se usará un estilo más robusto para centrar y dimensionar en la columna.
                            style={{
                                borderRadius: 16,
                                border: "1px solid var(--border-color, #E5E7EB)", // Borde adaptable al tema
                                boxShadow: "0 4px 12px rgba(167, 0, 255, 0.4)", // Usé el color del tema violeta
                                padding: 8,
                                // Para forzar el centrado de la tarjeta dentro de la columna:
                                margin: '0 auto',
                                maxWidth: '400px', // Limita el tamaño de la tarjeta para que no ocupe todo el md:10
                            }}
                        >
                            {/* Un 'div' contenedor para controlar las dimensiones y el recorte */}
                            <div style={{
                                borderRadius: 8,
                                overflow: "hidden",
                                // AÑADIDO: El padding-top simula un aspect-ratio de 1:1.3 (vertical)
                                paddingTop: "130%",
                                position: 'relative',
                            }}>
                                <img
                                    src={profile.photoUrl}
                                    alt="Foto profesional" // Etiqueta ALT mejorada
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover", // Esto asegura que la foto cubra todo el espacio sin dejar huecos
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
}
