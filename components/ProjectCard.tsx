import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { BlurFadeImage } from './BlurFade';

interface ProjectCardProps {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: any;
    date: string;
}

export default function ProjectCard({ title, slug, excerpt, thumbnail, date }: ProjectCardProps) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    });

    return (
        <Link href={`/projects/${slug}`} className="group block">
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                    <BlurFadeImage
                        src={urlFor(thumbnail).url()}
                        alt={title}
                        width={1200}
                        height={800}
                        delay={0.1}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</span>
                        <span className="bg-neutral-800/10 text-[#38A662] text-xs px-2 py-1 rounded-full">Project</span>
                    </div>

                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-[#38A662] dark:group-hover:text-[#7AC594] transition-colors duration-300">{title}</h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{excerpt}</p>

                    <div className="mt-auto">
                        <span className="inline-flex items-center text-[#38A662] dark:text-[#7AC594] text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                            View Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}