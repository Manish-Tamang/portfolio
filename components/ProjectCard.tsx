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
        <article className="group relative rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-xl">
            <Link href={`/projects/${slug}`} className="block relative">
                {/* Image layer */}
                <div className="relative w-full h-80 overflow-hidden">
                    {thumbnail && (
                        <BlurFadeImage
                            src={urlFor(thumbnail).url()}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-95"
                        />
                    )}
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 p-5 bg-white/95 dark:bg-neutral-900/95 [transform-origin:bottom] [transform:rotateX(-90deg)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:[transform:rotateX(0deg)]">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(new Date(date), "MMM yyyy")}
                        </span>
                    </p>
                    <p className="m-0 text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-5">{excerpt}</p>

                    <div className="mt-4 flex items-center gap-2">
                        <span className="inline-flex items-center text-[#38A662] dark:text-[#7AC594] text-sm font-medium">
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
                                className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1 border border-[#38A662] text-[#38A662] dark:text-[#38A662] transition-colors duration-300 hover:bg-[#38A662] hover:text-white"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="h-3 w-3" />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    );
}
