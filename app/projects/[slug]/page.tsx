
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export interface FullProject {
    currentSlug: string;
    title: string;
    content: string;
    thumbnail?: any;
    date: string;
    projectUrl?: string;
    githubUrl?: string;
    techStack?: string[];
}

const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
}

async function getProjectContent(slug: string): Promise<FullProject | null> {
    const query = `*[_type == "project" && slug.current == $slug][0] {
        "currentSlug": slug.current,
        title,
        date,
        thumbnail,
        content,
        projectUrl,   
        githubUrl,    
        techStack     
    }`;

    try {
        const project = await client.fetch(query, { slug });
        return project || null;
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const project = await getProjectContent(slug);

    if (!project) {
        notFound();
    }

    const formattedDate = formatDate(project.date);
    const readingTime = estimateReadingTime(project.content);

    return (
        <article className="container mx-auto py-12 px-6 max-w-3xl">
            <h1 className="text-4xl font-bold mb-2 font-peachi">{project.title}</h1>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Image
                        src='/profile.png'
                        alt="Manish Tamang"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <span className="text-gray-500 text-sm">Manish Tamang</span>
                </div>
                <span className="text-gray-500 text-sm">
                    {formattedDate} - {readingTime} min read
                </span>
            </div>
            <hr className="mb-8 border-gray-200 dark:border-gray-700" />

            {project.thumbnail && (
                <Image
                    width={1200}
                    height={600}
                    src={urlFor(project.thumbnail).url()}
                    alt={project.title}
                    className="w-full h-auto mb-6 rounded-[8px] object-cover"
                />
            )}

            <div className="mb-4">
                {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mr-4 text-blue-500 hover:underline">
                        Live Project
                    </a>
                )}
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        GitHub Repository
                    </a>
                )}
            </div>

            {project.techStack && project.techStack.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Tech Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                            <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-sm">{tech}</span>
                        ))}
                    </div>
                </div>
            )}
            <div className="prose dark:prose-invert max-w-none leading-relaxed font-geist">
                <MDXComponents content={project.content} />
            </div>
        </article>
    );
}