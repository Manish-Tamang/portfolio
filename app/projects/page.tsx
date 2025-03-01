
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface Project {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
}

async function getProjects(): Promise<Project[]> {
    const query = `*[_type == "project"] | order(date desc) {
        title,
        "slug": slug.current,
        excerpt,
        thumbnail,
        date
    }`;

    try {
        const projects = await client.fetch(query);
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6 font-peachi">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-[8px] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        {project.thumbnail && (
                            <Image
                                src={urlFor(project.thumbnail).url()}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4 bg-white dark:bg-gray-800">
                            <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">{project.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{project.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}