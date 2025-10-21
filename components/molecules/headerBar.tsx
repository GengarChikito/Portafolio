import { useState } from "react";
import { Button, Space, Switch, Drawer, Grid, Typography } from "antd";
import {
    MenuOutlined,
    GithubOutlined,
    LinkedinFilled,
    FileTextOutlined,
} from "@ant-design/icons";
import { styles } from "app/styles";

/**
 * Defino las 'props' que este Header va a recibir desde el 'HomeLayout' (el padre).
 * - 'dark': El estado booleano actual (¿está oscuro?).
 * - 'onToggleDark': La función que el 'HomeLayout' me pasa para *cambiar* ese estado.
 */
export interface HeaderBarProps {
    dark: boolean;
    onToggleDark: (val: boolean) => void;
}

/**
 * Este es mi componente 'HeaderBar', una "molécula" clave.
 * Es la barra de navegación superior que se mantiene fija ('sticky').
 * Maneja su propio estado para el menú móvil (el 'Drawer')
 * y renderiza condicionalmente la navegación o un botón de menú
 * dependiendo del tamaño de la pantalla.
 */
export function HeaderBar({ dark, onToggleDark }: HeaderBarProps) {
    // ---- ESTADO ----

    // Este es el estado para el menú 'Drawer' (el panel lateral) en móvil.
    // 'open' será 'true' si el menú está abierto.
    const [open, setOpen] = useState(false);

    // ---- LÓGICA RESPONSIVE ----

    // Uso el hook 'useBreakpoint' de Ant Design.
    // 'screens' es un objeto (ej. { md: true, sm: false }) que me dice
    // qué "breakpoints" (puntos de quiebre) están activos.
    const screens = Grid.useBreakpoint();

    // Defino 'isMobile' como "true" si la pantalla es más pequeña que 'md' (medium).
    // Si 'screens.md' es 'true', significa que estamos en escritorio.
    // Por lo tanto, 'isMobile' es 'false'.
    const isMobile = !screens.md;

    // ---- BLOQUES DE JSX ----

    // Defino mis enlaces de navegación en una variable.
    // Así puedo reutilizar este bloque de JSX tanto en el header
    // de escritorio como dentro del Drawer móvil.
    const navLinks = (
        <Space size={[16, 12]} wrap>
            <a className="site-nav-link" href="#inicio">Inicio</a>
            <a className="site-nav-link" href="#proyectos">Proyectos</a>
            <a className="site-nav-link" href="#experiencia">Experiencia</a>
            <a className="site-nav-link" href="#educacion">Educación</a>
            <a className="site-nav-link" href="#contacto">Contacto</a>
        </Space>
    );

    // Defino mis botones de acción (Switch, CV, GitHub, LinkedIn)
    // en otra variable para poder reutilizarlos en ambos modos.
    const actionButtons = (
        <Space size={[8, 8]} wrap>
            {/* Este es el átomo 'ThemeSwitch', pero hecho con Ant Design directo.
                Le paso las props 'dark' y 'onToggleDark' que recibí del 'HomeLayout'.
             */}
            <Switch
                checked={dark}
                onChange={onToggleDark}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
                className="theme-switch"
                aria-label="Cambiar tema"
            />



            {/* Botón para GitHub */}
            <Button
                size="middle"
                icon={<GithubOutlined className="brand-icon brand-icon--github" />}
                href="https://github.com/Excintium"
                target="_blank"
                className="site-action site-action--github"
                aria-label="GitHub"
            >
                GitHub
            </Button>

            {/* Botón para LinkedIn */}
            <Button
                size="middle"
                icon={<LinkedinFilled className="brand-icon brand-icon--linkedin" />}
                href="https://www.linkedin.com/in/nicol%C3%A1s-fonseca"
                target="_blank"
                className="site-action site-action--linkedin"
                aria-label="LinkedIn"
            >
                LinkedIn
            </Button>
        </Space>
    );

    // ---- RENDERIZADO ----
    return (
        // Uso la etiqueta 'header' de HTML5.
        // Le aplico los estilos base que vienen de 'app/styles.tsx'.
        <header className="site-header" style={{ ...styles.headerBar, margin: 0, padding: 0 }}>
            {/* Este 'div' es el contenedor centrado (max-width) */}
            <div
                className="container"
                style={{
                    ...styles.container,
                    height: 64, // Altura fija para el header
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // Separa logo de acciones
                    gap: 12,
                }}
            >
                {/* IZQUIERDA: Mi logo "Excintium" */}
                <a
                    href="#inicio"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        color: "inherit",
                        position: "relative",
                    }}
                    aria-label="Ir al inicio"
                >
                    <span className="brand-logo" aria-label="GengarChikito">GengarChikito</span>
                </a>

                {/* CENTRO: Navegación (Solo en escritorio) */}
                {/* Renderizado condicional: Si NO es móvil,
                  muestro la variable 'navLinks' en el centro.
                */}
                {!isMobile && (
                    <nav style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        {navLinks}
                    </nav>
                )}

                {/* DERECHA: Botones de Acción (Escritorio) o Botón de Menú (Móvil) */}
                {!isMobile ? (
                    // Si NO es móvil (escritorio), muestro los botones de acción.
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {actionButtons}
                    </div>
                ) : (
                    // Si SÍ es móvil, muestro el botón de hamburguesa.
                    <Button
                        aria-label="Abrir menú"
                        icon={<MenuOutlined />}
                        onClick={() => setOpen(true)} // Al hacer clic, abro el Drawer
                        className="site-action"
                    />
                )}
            </div>

            {/* Panel/Menú lateral que se abre en móvil */}
            <Drawer
                open={open} // Abierto o cerrado según mi estado 'open'
                onClose={() => setOpen(false)} // Función para cerrarlo (ej. al hacer clic fuera)
                placement="right"
                width={320}
                styles={{
                    // Aquí uso las variables CSS que definí en ThemedWrapper
                    // para que el Drawer también cambie con el tema.
                    body: { padding: 16, background: "var(--surface-bg)" },
                    header: { borderBottom: "1px solid var(--border-color)" },
                }}
            >
                {/* Contenido del Drawer */}
                <Space direction="vertical" size={16} style={{ width: "100%" }}>

                    {/* El Switch de Tema, pero dentro del menú móvil */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography.Text style={{ fontWeight: 600 }}>Tema</Typography.Text>
                        <Switch
                            checked={dark}
                            onChange={onToggleDark}
                            checkedChildren="🌙"
                            unCheckedChildren="☀️"
                            className="theme-switch"
                            aria-label="Cambiar tema"
                        />
                    </div>

                    {/* La lista de navegación, pero vertical */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {/* Les añado un 'onClick' a los enlaces del Drawer.
                          Cuando hago clic en uno, navega a la sección Y
                          también llama a 'setOpen(false)' para cerrar el menú.
                        */}
                        <a className="site-nav-link" href="#inicio" onClick={() => setOpen(false)}>Inicio</a>
                        <a className="site-nav-link" href="#proyectos" onClick={() => setOpen(false)}>Proyectos</a>
                        <a className="site-nav-link" href="#experiencia" onClick={() => setOpen(false)}>Experiencia</a>
                        <a className="site-nav-link" href="#educacion" onClick={() => setOpen(false)}>Educación</a>
                        <a className="site-nav-link" href="#contacto" onClick={() => setOpen(false)}>Contacto</a>
                    </div>

                    <div style={{ height: 8 }} />

                    {/* Aquí reutilizo la variable 'actionButtons'
                       para mostrar los botones de CV, GitHub y LinkedIn
                       también dentro del menú móvil.
                    */}
                    {actionButtons}
                </Space>
            </Drawer>
        </header>
    );
}