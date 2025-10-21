import { Layout, Typography, ConfigProvider, theme as antdTheme } from "antd";
import { HeaderBar } from "components/molecules/headerBar";
import { corporateLightTheme, corporateDarkTheme } from "app/theme";
import { stylesLight, stylesDark } from "app/styles";
import { useState } from "react";

const { Content, Footer } = Layout;

/**
 * Defino las props para mi HomeLayout.
 * Solo necesito 'children', que será cualquier página o
 * contenido que quiera renderizar dentro de esta plantilla.
 */
export interface HomeLayoutProps { children: React.ReactNode; }

/**
 * Este es un componente interno que tuve que crear.
 * El 'ConfigProvider' de Ant Design me da el tema (token), pero
 * no aplica esos colores a mis variables CSS personalizadas (--border-color, etc.).
 *
 * Así que creé este 'ThemedWrapper' que se renderiza *dentro* del ConfigProvider.
 * Su único trabajo es usar el hook 'antdTheme.useToken()' para LEER el tema
 * activo y luego INYECTAR esos colores en mi 'div' principal
 * usando variables CSS.
 */
function ThemedWrapper({
                           children, styles, dark, setDark,
                       }: {
    children: React.ReactNode;
    styles: any; // El objeto de estilos (stylesLight o stylesDark)
    dark: boolean; // El estado actual del tema
    setDark: (v: boolean) => void; // La función para cambiar el estado
}) {
    // Aquí obtengo el 'token' del tema activo (sea claro u oscuro)
    const { token } = antdTheme.useToken();

    return (
        // Este 'div' envuelve toda la aplicación.
        // Aquí es donde defino mis variables CSS personalizadas
        // usando los valores del 'token' de Ant Design.
        <div
            style={
                {
                    // Ahora mis componentes (ej. Card, SectionTitle) pueden usar
                    // 'var(--border-color)' y tomará el color correcto del tema.
                    "--border-color": token.colorBorder,
                    "--border-strong": token.colorPrimary,
                    "--surface-bg": token.colorBgBase,
                    "--text-color": token.colorTextBase,
                    "--header-bg": token.colorBgBase,
                    // 'clamp' es para un padding fluido (responsive)
                    "--section-pad": "clamp(48px, 6vw, 72px)",
                } as React.CSSProperties
            }
        >
            {/* Finalmente, renderizo el Layout principal de Ant Design.
              Le paso el objeto de 'styles' (light o dark) que decidí
              en el componente HomeLayout.
            */}
            <Layout style={{ ...styles.shell, margin: 0, padding: 0 }}>
                {/* Mi HeaderBar personalizado. Le paso el estado 'dark' y la función
                    para cambiarlo (onToggleDark). */}
                <HeaderBar dark={dark} onToggleDark={setDark} />

                {/* Aquí es donde se renderiza el contenido de la página (Hero, Projects, etc.) */}
                <Content>{children}</Content>

                {/* Mi Footer personalizado con el copyright. */}
                <Footer style={styles.footer}>
                    <Typography.Text>
                        © {new Date().getFullYear()} Tengo tea. inc.
                    </Typography.Text>
                </Footer>
            </Layout>
        </div>
    );
}

/**
 * Este es mi componente principal de Layout para la página de inicio.
 * Es el responsable de "envolver" todo el contenido de la página (home.tsx)
 * y proporcionarle el 'ConfigProvider' de Ant Design y el 'HeaderBar' / 'Footer'.
 *
 * Aquí es donde manejo el estado del tema (claro/oscuro).
 */
export default function HomeLayout({ children }: HomeLayoutProps) {
    // Este es el estado clave: 'dark' (booleano).
    // Inicia en 'false' (modo claro) por defecto.
    const [dark, setDark] = useState<boolean>(false);

    // Decido qué TEMA de Ant Design usar basado en el estado 'dark'.
    // Estos 'corporate...' son mis temas personalizados de 'app/theme.tsx'.
    const theme = dark ? corporateDarkTheme : corporateLightTheme;

    // También decido qué objeto de ESTILOS personalizados usar (de 'app/styles.tsx').
    const s = dark ? stylesDark : stylesLight;

    return (
        // 1. Envuelvo todo en el 'ConfigProvider' de Ant Design.
        //    Le paso el objeto 'theme' que elegí.
        <ConfigProvider theme={theme}>
            {/* 2. Renderizo mi 'ThemedWrapper'. Este componente
                 leerá el 'theme' del ConfigProvider y aplicará
                 los colores a mis variables CSS.
            */}
            <ThemedWrapper styles={s} dark={dark} setDark={setDark}>
                {children} {/* <-- Aquí se renderiza home.tsx */}
            </ThemedWrapper>
        </ConfigProvider>
    );
}