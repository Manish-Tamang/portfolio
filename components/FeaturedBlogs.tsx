'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { FaArrowRight } from 'react-icons/fa';

interface Post {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
}

async function fetchPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(_createdAt desc)[0..2] {
        title,
        "slug": slug.current,
        date,
        excerpt
    }`;

    try {
        const posts = await client.fetch(query);
        return posts;
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        return [];
    }
}

const PostSkeleton = () => (
    <div className="mb-4">
        <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-6 mb-1" />
            <Skeleton className="w-6 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-32 h-4" />
        <hr className="mt-2 border-gray-200 dark:border-gray-700" />
    </div>
);

export default function FeaturedBlogs() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };

        loadPosts();
    }, []);

    const truncateExcerpt = (text: string, limit: number = 20) => {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "...";
        }
        return text;
    };

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
                <div className="">
                    {posts.map((post) => {
                        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        });
                        return (
                            <div key={post.slug} className="mb-4 last:mb-0">
                                <div className="flex items-center justify-between">
                                    <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-[#38A662] dark:hover:text-[#7AC594] transition-colors duration-200">
                                        {post.title}
                                    </Link>
                                    <Link href={`/blog/${post.slug}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500 dark:text-gray-400">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">{formattedDate}</p>
                                {post.excerpt && (
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        {truncateExcerpt(post.excerpt, 20)}
                                    </p>
                                )}
                                <hr className="mt-2 border-gray-200 dark:border-gray-700" />
                            </div>
                        );
                    })}
                </div>
                <Link href="/blog">
                    <Button
                        className={`cursor-pointer transition-all bg-[#38A662] text-white px-4 py-2 rounded-[4px] 
                                     border-[#2D8A4D] border-b-[4px] hover:bg-[#3EBF70] hover:-translate-y-[1px] 
                                   hover:border-b-[6px] active:border-b-[2px] active:bg-[#2D8A4D] active:translate-y-[2px]
                                         flex items-center justify-center dark:bg-[#38A662] dark:border-[#2D8A4D] dark:text-white
                                        dark:hover:bg-[#3EBF70] dark:active:bg-[#2D8A4D]
                                         w-full h-10 mt-6 
                                      sm:w-auto`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        See All
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ml-1 transition-transform duration-200 ${isHovered ? 'transform translate-x-1' : ''}`}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </section>
    );
}