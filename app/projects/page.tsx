import { client } from '@/sanity/lib/client';
import ProjectCard from '@/components/ProjectCard';

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
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="text-left mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-peachi">My Projects</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 ">
                        Explore my portfolio of projects showcasing my skills and experience in web development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            slug={project.slug}
                            excerpt={project.excerpt}
                            thumbnail={project.thumbnail}
                            date={project.date}
                        />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}