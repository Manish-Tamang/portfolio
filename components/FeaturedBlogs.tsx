'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Post {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
}

async function fetchPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(_createdAt desc)[0...3] { 
    title, 
    "slug": slug.current, 
    date, 
  }`;

    try {
        const posts = await client.fetch(query);
        return posts;
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return [];
    }
}

const getGradient = (index: number) => {
    const gradients = [
        'from-[#D8B4FE] to-[#818CF8]',
        'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
        'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]'
    ];
    return gradients[index % gradients.length];
};

const PostSkeleton = () => (
    <div className="mb-4">
        <Skeleton className="w-full h-40 rounded-xl" />
    </div>
);

export default function FeaturedBlogs() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };

        loadPosts();
    }, []);


    if (loading) {
        return (
            <section className="py-8">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-peachi">Featured Blogs</h2>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            </section>
        );
    }

    return (
        <section className="py-8">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-peachi">Featured Blogs</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {posts.map((post, index) => {
                        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        });
                        const gradient = getGradient(index);

                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className={cn(
                                    'transform hover:scale-[1.01] transition-all',
                                    'rounded-[4px] w-full bg-gradient-to-r p-1',
                                    gradient
                                )}
                            >
                                <div className="flex flex-col h-full bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{formattedDate}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button className="rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 transition-colors duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-external-link"
                                            >
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <Link href="/blog" className="block mt-6">
                    <Button
                        className={`w-full sm:w-auto cursor-pointer transition-all bg-[#38A662] text-white px-4 py-2 rounded-[4px] 
                        border-[#2D8A4D] border-b-[4px] hover:bg-[#3EBF70] hover:-translate-y-[1px] 
                        hover:border-b-[6px] active:border-b-[2px] active:bg-[#2D8A4D] active:translate-y-[2px]
                        flex items-center justify-center dark:bg-[#38A662] dark:border-[#2D8A4D] dark:text-white
                        dark:hover:bg-[#3EBF70] dark:active:bg-[#2D8A4D]`}
                    >
                        See All
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </section>
    );
}