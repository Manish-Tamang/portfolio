import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import StackingProjectCards from '@/components/StackingCards';

interface Project {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
    projectUrl?: string;
}

async function getProjects(): Promise<Project[]> {
    const query = `*[_type == "project"] | order(date desc) {
        title,
        "slug": slug.current,
        excerpt,
        thumbnail,
        date,
        projectUrl
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

    const stackingProjects = projects.map((project, index) => ({
        bgColor: index % 2 === 0 ? "bg-[#f97316]" : "bg-[#0015ff]",
        title: project.title,
        description: project.excerpt,
        image: urlFor(project.thumbnail).url(),
        slug: project.slug,
        projectUrl: project.projectUrl
    }));

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
                <StackingProjectCards
                    projects={stackingProjects}
                    showHeader={true}
                    showFooter={true}
                    headerText="Scroll Down ↓"
                    footerText="Projects"
                />
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-8">
                    The StackingCard UI is from{" "}
                    <a href="https://www.fancycomponents.dev/docs/components/blocks/stacking-cards" className="underline">
                        Fancy components
                    </a>.
                </p>
            </div>
        </section>
    );
}