import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';
import { BlurFadeImage } from '@/components/BlurFade';

const query = `*[_type == "post"] {
    title,
    slug,
    excerpt,
    date,
    coverImage,
    content
} | order(date desc)`;

const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

export default async function Blogs() {
    const posts = await client.fetch(query);

    return (
        <section className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-semibold mb-4 font-peachi">Blogs</h2>
            <p className="text-black dark:text-gray-100 mb-12 max-w-2xl">
                Welcome to my digital garden, where I share my thoughts, explore new things I learn, and nurture
                ideas that spark my curiosity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {posts.map((post: any) => (
                    <Link key={post.slug.current} href={`/blogs/${post.slug.current}`} className="group">
                        <article className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white dark:bg-gray-800 h-full flex flex-col">
                            {post.coverImage && (
                                <div className="relative w-full pt-[56.25%] overflow-hidden">
                                    <BlurFadeImage
                                        src={urlFor(post.coverImage).url()}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            )}

                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold font-peachi group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-black dark:text-white mb-3">
                                    {post.title}
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm space-x-2 mb-4">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        {estimateReadingTime(post.content)} min read
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {format(new Date(post.date), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <span className="inline-block text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                                        Read more
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}