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
                Welcome to my blog page, I've been writing online since 2023, mostly about web development, blogging & tech. 
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
                    {filteredAndSortedPosts.map((post: any) => (
                        <article key={post.slug.current} className="rounded-[4px] border-2 overflow-hidden  transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white dark:bg-neutral-800 h-full flex flex-col">
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
                                    <h3 className="text-xl font-bold font-peachi group-hover:text-[#38A662] dark:group-hover:text-blue-400 transition-colors duration-300 text-black dark:text-white mb-3">
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
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-[4px]">
                    <p className="text-gray-500 dark:text-gray-400">No posts found matching "{searchQuery}"</p>
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