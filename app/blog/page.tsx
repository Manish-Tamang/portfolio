'use client';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BlurFadeImage } from '@/components/BlurFade';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import BlogCardSkeleton from '@/components/BlogCardSkeleton';
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Eye } from "lucide-react";

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

const fetchViewsFromFirebase = async (slug: string): Promise<number> => {
    try {
        const docRef = doc(db, "views", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().count || 0;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching views from Firebase:", error);
        return 0;
    }
};

export default function Blogs() {
    const [posts, setPosts] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [views, setViews] = useState<{ [slug: string]: number }>({});

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await client.fetch(query);
                setPosts(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchAllViews = async () => {
            const initialViews: { [slug: string]: number } = {};
            if (posts && posts.length > 0) {
                await Promise.all(
                    posts.map(async (post) => {
                        try {
                            const viewCount = await fetchViewsFromFirebase(post.slug.current);
                            initialViews[post.slug.current] = viewCount;
                        } catch (error) {
                            console.error(`Failed to fetch views for ${post.title}:`, error);
                            initialViews[post.slug.current] = 0;
                        }
                    })
                );
                setViews(initialViews);
            }
        };

        fetchAllViews();
    }, [posts]);


    const filteredAndSortedPosts = React.useMemo(() => {
        let filtered = searchQuery
            ? posts.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : posts;

        let sorted = [...filtered];

        if (sortOrder === "newest") {
            sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOrder === "oldest") {
            sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (sortOrder === "highest") {
            sorted.sort((a, b) => (views[b.slug.current] || 0) - (views[a.slug.current] || 0));
        } else if (sortOrder === "lowest") {
            sorted.sort((a, b) => (views[a.slug.current] || 0) - (views[b.slug.current] || 0));
        }

        return sorted;
    }, [posts, searchQuery, sortOrder, views]);

    return (
        <section className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-semibold mb-4 font-peachi">Blogs</h2>
            <p className="text-black dark:text-gray-100 mb-8 max-w-2xl">
                Welcome to my blog page, I&apos;ve been writing online since 2023, mostly about web development, blogging & tech. 
                Use the search below to filter by title.
            </p>

            <div className="mb-8 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            className="pl-10 pr-4 py-2 border dark:bg-neutral-800 bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38A662] transition-all rounded-[4px]"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <Select onValueChange={(value) => setSortOrder(value as "newest" | "oldest" | "highest" | "lowest")} defaultValue="newest">
                            <SelectTrigger className="w-full md:w-[120px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="highest">Highest views</SelectItem>
                                <SelectItem value="lowest">Lowest views</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <p className="text-sm text-gray-500 ml-2">
                    {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'blog' : 'blogs'} found
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </div>
            ) : error ? (
                <div className="text-center py-12 border border-dashed border-red-300 rounded-[4px]">
                    <p className="text-red-500 dark:text-red-400">Error: {error}</p>
                </div>
            ) : filteredAndSortedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredAndSortedPosts.map((post: any, idx: number) => (
                        <React.Fragment key={post.slug.current}>
                            <article className="rounded-[4px] border-2 overflow-hidden  transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white dark:bg-neutral-800 h-full flex flex-col">
                                <Link key={post.slug.current} href={`/blog/${post.slug.current}`} className="group">
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
                                        <h3 className="text-xl font-bold font-peachi group-hover:text-[#38A662] dark:group-hover:text-[#38A662] transition-colors duration-300 text-black dark:text-white mb-3">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm space-x-2 mb-4">
                                            <span className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {format(new Date(post.date), 'MMM d, yyyy')}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center">
                                                <Eye className="h-4 w-4 mr-1" />
                                                {typeof views[post.slug.current] === 'number' ? `${views[post.slug.current]} views` : "* views"}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                            {idx === 1 && (
                                <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-4 p-6 bg-[#ECF1FD] dark:bg-neutral-900 border border-[#3EB76C] rounded-[4px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="48" width="48" className="flex-shrink-0 mb-2 md:mb-0">
                                        <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
                                        <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
                                        <path strokeWidth="2.5" stroke="#3EB76C" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
                                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#3EB76C" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-[#2B2B2F] dark:text-white mb-1">Don&apos;t miss out!</p>
                                        <p className="text-sm text-[#5F5D6B] dark:text-neutral-300 mb-2">Subscribe to my newsletter for the latest tech topics, coding tips, and project updates delivered weekly.</p>
                                        <Link href="/newsletter" className="inline-block px-4 py-1 bg-[#3EB76C] text-white rounded-[4px] font-medium hover:bg-[#38A662] transition-colors">Subscribe Now</Link>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-[4px]">
                    <p className="text-gray-500 dark:text-gray-400">No posts found matching &quot;{searchQuery}&quot;</p>
                    <button
                        className="mt-4 text-blue-600 dark:text-blue-400 underline"
                        onClick={() => setSearchQuery("")}
                    >
                        Clear search
                    </button>
                </div>
            )}
        </section>
    );
}