import React from "react";
import ProjectCard from "./ProjectCard";
import NewsletterPromo from "./NewsletterPromo";

interface Project {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
    projectUrl?: string;
}

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project: Project, idx: number) => (
                <ProjectCard
                    key={project.slug}
                    title={project.title}
                    slug={project.slug}
                    excerpt={project.excerpt}
                    thumbnail={project.thumbnail}
                    date={project.date}
                    projectUrl={project.projectUrl}
                />
            ))}

            {/* Newsletter promotion after the 2nd project */}
            {projects.length > 2 && (
                <div className="md:col-span-2">
                    <NewsletterPromo />
                </div>
            )}
        </div>
    );
}
