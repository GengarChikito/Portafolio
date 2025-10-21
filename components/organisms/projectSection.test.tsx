import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";


// Mock de estilos
vi.mock("app/styles", () => ({
    styles: {
        section: { border: "1px solid purple" },
        container: { maxWidth: 1200 },
    },
}));

// Mock del perfil con datos de proyectos
vi.mock("components/atoms/profile/profile", () => {
    const mockProjects = [
        {
            title: "Proyecto Alpha",
            summary: "Descripción Alpha",
            tags: ["React", "Node"],
            image: "/alpha.jpg",
            link: "https://alpha.com",
        },
        {
            title: "Proyecto Beta",
            summary: "Descripción Beta",
            tags: ["Vue", "Firebase"],
            image: "/beta.jpg",
            link: "https://beta.com",
        },
    ];
    return {
        profile: {
            projects: mockProjects,
        },
    };
});

// Mock de SectionTitle
vi.mock("components/atoms/sectionTitle", () => ({
    SectionTitle: ({ text }: { text: string }) => (
        <h2 data-testid="section-title">{text}</h2>
    ),
}));

// Mock *general* de ProjectCard
const projectCardSpy = vi.fn();
// Importamos ProjectCard aquí para poder usar vi.mocked después
import { ProjectCard as OriginalProjectCard } from "../molecules/projectCard"; // Renombramos para evitar conflicto
vi.mock("../molecules/projectCard", () => ({
    ProjectCard: vi.fn((props: any) => { // Usamos vi.fn() para poder espiar y reimplementar
        projectCardSpy(props);
        return <div data-testid="project-card">{props.title}</div>;
    }),
}));

// ====== SUT ======
import { ProjectsSection } from "./projectSection";


// Obtenemos una referencia al mock de ProjectCard
const MockedProjectCard = vi.mocked(OriginalProjectCard); // Usamos el nombre original importado

// Limpiar mocks antes de cada prueba
beforeEach(() => {
    vi.clearAllMocks();
    projectCardSpy.mockClear();
    // Aseguramos que el mock use la implementación por defecto antes de cada test
    MockedProjectCard.mockImplementation((props: any) => {
        projectCardSpy(props);
        return <div data-testid="project-card">{props.title}</div>;
    });
});

// ====== Tests ======
describe("projectsSection", () => {
    it("renderiza el título de la sección", () => {
        render(<ProjectsSection />);
        const title = screen.getByTestId("section-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Proyectos");
    });

    it("renderiza una ProjectCard para cada proyecto del perfil", async () => {
        const { profile } = vi.mocked(await import("components/atoms/profile/profile"));
        render(<ProjectsSection />);
        const cards = screen.getAllByTestId("project-card");
        expect(cards).toHaveLength(profile.projects.length);
        expect(screen.getByText("Proyecto Alpha")).toBeInTheDocument();
        expect(screen.getByText("Proyecto Beta")).toBeInTheDocument();
    });

    it("pasa las props correctas a cada ProjectCard", async () => {
        const { profile } = vi.mocked(await import("components/atoms/profile/profile"));
        render(<ProjectsSection />);

        expect(projectCardSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                title: profile.projects[0].title,
                summary: profile.projects[0].summary,
                tags: profile.projects[0].tags,
                image: profile.projects[0].image,
                link: profile.projects[0].link,
            })
        );

        expect(projectCardSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                title: profile.projects[1].title,
                summary: profile.projects[1].summary,
                tags: profile.projects[1].tags,
                image: profile.projects[1].image,
                link: profile.projects[1].link,
            })
        );
    });

    // ==== INICIO DE LA CORRECCIÓN ====
    // Ya no usamos vi.mock aquí dentro
    it("snapshot del componente", () => {
        // Cambiamos la implementación *solo para esta prueba*
        MockedProjectCard.mockImplementationOnce((props: any) => {
            projectCardSpy(props); // Mantenemos el espía si es necesario
            // Renderizamos con data-key para el snapshot
            return <div data-testid="project-card" data-key={props.key}>{props.title}</div>;
        });
        // La segunda card también necesita esta implementación especial
        MockedProjectCard.mockImplementationOnce((props: any) => {
            projectCardSpy(props);
            return <div data-testid="project-card" data-key={props.key}>{props.title}</div>;
        });


        const { container } = render(<ProjectsSection />);
        expect(container).toMatchSnapshot();

    });
});