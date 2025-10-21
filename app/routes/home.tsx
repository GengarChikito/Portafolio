import type { ReactNode } from "react";
import HomeLayout from "../../components/layout/homeLayout";
import { HeroSection } from "../../components/organisms/heroSection";
import { ProjectsSection } from "../../components/organisms/projectSection";
import { ExperienceSection } from "../../components/organisms/experienceSection";
import { EducationSection } from "../../components/organisms/educationSection";
import { ContactSection } from "../../components/organisms/contactSection";

export default function Index(): ReactNode {
    return (
        <HomeLayout>
            <HeroSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <ContactSection />
        </HomeLayout>
    );
}