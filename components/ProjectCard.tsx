import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { BlurFadeImage } from "./BlurFade";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
    projectUrl?: string;
}

export default function ProjectCard({
    title,
    slug,
    excerpt,
    thumbnail,
    date,
    projectUrl,
}: ProjectCardProps) {
    return (
        <article className="rounded-lg border border-gray-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-neutral-800 h-full flex flex-col">
            <Link href={`/projects/${slug}`} className="group">
                {thumbnail && (
                    <div className="relative w-full pt-[52%] overflow-hidden">
                        <BlurFadeImage
                            src={urlFor(thumbnail).url()}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                )}
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold group-hover:text-[#38A662] dark:group-hover:text-[#38A662] transition-colors duration-300 text-black dark:text-white mb-2 line-clamp-2">
                        {title}
                    </h3>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs space-x-2 mb-3">
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(new Date(date), "MMM yyyy")}
                        </span>
                        <span className="bg-neutral-800/10 text-[#38A662] text-xs px-2 py-0.5 rounded-full">Project</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-grow">
                        {excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="inline-flex items-center text-[#38A662] dark:text-[#7AC594] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>

                        {projectUrl && (
                            <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    );
}
