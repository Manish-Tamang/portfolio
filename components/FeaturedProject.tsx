'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
interface Project {
    title: string;
    slug: string;
    excerpt: string;
    techStack: string[];
}

async function fetchProjects(): Promise<Project[]> {
    const query = `*[_type == "project"] | order(_createdAt desc)[0..2] {
        title,
        "slug": slug.current,
        excerpt,
        techStack
    }`;

    try {
        const projects = await client.fetch(query);
        return projects;
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return [];
    }
}

const ProjectSkeleton = () => (
    <div className="mb-6">
        <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-6 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-32 h-4 mb-2" />
        <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="w-16 h-5 rounded-[4px]" />
            <Skeleton className="w-16 h-5 rounded-[4px]" />
            <Skeleton className="w-16 h-5 rounded-[4px]" />
        </div>
        <hr className="mt-4 border-gray-200 dark:border-gray-700" />
    </div>
);

export default function FeaturedProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const fetchedProjects = await fetchProjects();
            setProjects(fetchedProjects);
            setLoading(false);
        };

        loadProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-8">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-peachi">Featured Projects</h2>
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />

                </div>
            </section>
        );
    }

    return (
        <section className="py-8">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white font-peachi">Featured Projects</h2>
                <div className="">
                    {projects.map((project) => (
                        <div key={project.slug} className="mb-6 last:mb-0">
                            <div className="flex items-center justify-between">
                                <Link href={`/projects/${project.slug}`} className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-[#38A662] dark:hover:text-[#7AC594] transition-colors duration-200">
                                    {project.title}
                                </Link>
                                <Link href={`/projects/${project.slug}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500 dark:text-gray-400">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{project.excerpt}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.techStack && project.techStack.map((tech, index) => (
                                    <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-[4px]">{tech}</span>
                                ))}
                            </div>
                            <hr className="mt-4 border-gray-200 dark:border-gray-700" />
                        </div>
                    ))}
                </div>
                <Link href="/projects">
                    <Button
                        className={`cursor-pointer transition-all bg-[#38A662] text-white px-4 py-2 rounded-[4px] 
                                     border-[#2D8A4D] border-b-[4px] hover:bg-[#3EBF70] hover:-translate-y-[1px] 
                                   hover:border-b-[6px] active:border-b-[2px] active:bg-[#2D8A4D] active:translate-y-[2px]
                                         flex items-center gap-2 dark:bg-[#38A662] dark:border-[#2D8A4D] dark:text-white
                                        dark:hover:bg-[#3EBF70] dark:active:bg-[#2D8A4D]
                                         w-full h-10 mt-6 
                                      sm:w-auto`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        See All
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform duration-200 ${isHovered ? 'transform translate-x-1' : ''}`}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </section>
    );
}