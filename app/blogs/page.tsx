import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';

const query = `*[_type == "post"] {
    title,
    slug,
    excerpt,
    date,
    coverImage,
    estimatedReadingTime,
    tags
  } | order(date desc)`
    ;

export default async function Blogs() {

    const posts = await client.fetch(query)

    return (
        <section className="container mx-auto py-8">
            <h2 className="text-3xl font-semibold mb-4">Notes</h2>
            <p className="text-black dark:text-gray-100 mb-8">Welcome to my digital garden, where I share my thoughts, explore new things I learn, and nurture
                ideas that spark my curiosity.</p>

            <div className="space-y-8">
                {posts.map((post: any) => (
                    <Link key={post.slug.current} href={`/blogs/${post.slug.current}`}>
                        <div className="hover:underline mt-2 mb-2">
                            <h3 className="text-xl font-semibold text-black dark:text-white">{post.title}</h3>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-2 mb-2">
                                <span>{post.estimatedReadingTime} mins read</span>
                                <span>•</span>
                                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                {post.tags && post.tags.length > 0 && (
                                    <>
                                        <span>•</span>
                                        <span>{post.tags.map((tag: string) => `#${tag}`).join(' ')}</span>
                                    </>
                                )}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}