'use client';
import { client } from '@/sanity/lib/client';
import React, { useState, useEffect } from 'react';
import ProjectSearchFilter from '@/components/ProjectSearchFilter';
import ProjectsGrid from '@/components/ProjectsGrid';
import ProjectLoadingSkeleton from '@/components/ProjectLoadingSkeleton';
import ProjectErrorState from '@/components/ProjectErrorState';
import EmptyProjectsState from '@/components/EmptyProjectsState';

interface Project {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
    projectUrl?: string;
}

const query = `*[_type == "project"] | order(date desc) {
    title,
    "slug": slug.current,
    excerpt,
    thumbnail,
    date,
    projectUrl
}`;

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await client.fetch(query);
                setProjects(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredAndSortedProjects = React.useMemo(() => {
        let filtered = searchQuery
            ? projects.filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : projects;

        let sorted = [...filtered];

        if (sortOrder === "newest") {
            sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === "oldest") {
            sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sortOrder === "a-z") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "z-a") {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }

        return sorted;
    }, [projects, searchQuery, sortOrder]);

    if (loading) {
        return <ProjectLoadingSkeleton />;
    }

    return (
        <section className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-semibold mb-4 font-peachi">Projects</h2>
            <p className="text-black dark:text-gray-100 mb-8 max-w-2xl">
                Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning experience. 
                Use the search below to filter by title or description.
            </p>

            <ProjectSearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                projectCount={filteredAndSortedProjects.length}
            />

            {error ? (
                <ProjectErrorState error={error} />
            ) : filteredAndSortedProjects.length > 0 ? (
                <ProjectsGrid projects={filteredAndSortedProjects} />
            ) : (
                <EmptyProjectsState 
                    searchQuery={searchQuery} 
                    onClearSearch={() => setSearchQuery("")} 
                />
            )}
        </section>
    );
}