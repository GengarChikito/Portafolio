// Importo mis estilos, mi "base de datos" de perfil, y mis átomos/moléculas
import { styles } from "app/styles";
import { profile } from "components/atoms/profile/profile";
import { SectionTitle } from "components/atoms/sectionTitle";
// Importo la molécula 'ProjectCard' que definí antes
import { ProjectCard } from "../molecules/projectCard"; // (Asegúrate que la ruta '../molecules' sea correcta)

/**
 * Defino las 'props' para esta sección.
 * No necesito ninguna, ya que esta sección (siendo un "organismo")
 * sabe de dónde sacar sus datos: directamente del 'profile' importado.
 */
export interface ProjectsSectionProps {}

/**
 * Este es mi componente 'ProjectsSection' (un "organismo").
 * Su trabajo es simple:
 * 1. Renderizar el título de la sección.
 * 2. Mapear (hacer un bucle) sobre la lista de proyectos en mi 'profile'.
 * 3. Renderizar un componente 'ProjectCard' (molécula) por cada proyecto.
 */
export function ProjectsSection(_: ProjectsSectionProps) {
    return (
        // La <section> principal con el 'id' para la navegación
        <section id="proyectos" style={styles.section}>
            <div className="container" style={styles.container}>

                {/* 1. Renderizo mi átomo de título */}
                <SectionTitle text="Proyectos" />

                {/* 2. Este 'div' usa una clase CSS ('project-grid')
                       que definí en 'app.css' para crear la cuadrícula responsive.
                 */}
                <div className="project-grid">

                    {/* 3. Aquí hago el .map() sobre mi array 'profile.projects' */}
                    {profile.projects.map((p) => (
                        // Por cada 'p' (proyecto) en el array, renderizo mi molécula 'ProjectCard'
                        <ProjectCard
                            key={p.title} // React necesita una 'key' única para cada ítem
                            // Le paso todas las propiedades del objeto 'p'
                            // como 'props' al componente 'ProjectCard'.
                            title={p.title}
                            summary={p.summary}
                            tags={p.tags}
                            image={p.image}
                            link={p.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}