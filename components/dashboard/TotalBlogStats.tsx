"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface TotalBlogStatsProps { }

const TotalBlogStats: React.FC<TotalBlogStatsProps> = () => {
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [totalViews, setTotalViews] = useState<number>(0);
    const [totalReactions, setTotalReactions] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTotalStats = async () => {
            try {
                const sanityQuery = `count(*[_type == "post"])`;
                const postCount = await client.fetch<number>(sanityQuery);
                setTotalPosts(postCount);

                let allViews = 0;
                let allReactions = 0;


                const viewsCollection = collection(db, "views");
                const viewsSnapshot = await getDocs(viewsCollection);

                viewsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    allViews += data.count || 0;
                });

                const postsCollection = collection(db, "posts");
                const postsSnapshot = await getDocs(postsCollection);

                postsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    allReactions += (data.thumbsUp || 0) + (data.heart || 0) + (data.trophy || 0) + (data.bookmark || 0);
                });

                setTotalViews(allViews);
                setTotalReactions(allReactions);

            } catch (error) {
                console.error("Error fetching total blog stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTotalStats();
    }, []);

    return (
        <Card className="bg-white mt-4 dark:bg-[#09090B] text-gray-900 dark:text-gray-200">
            <CardHeader>
                <CardTitle>All Time Blog Stats</CardTitle>
                <CardDescription>Total posts, views, and reactions.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                    <span>Total Posts:</span>
                    {isLoading ? <Skeleton className="h-4 w-12" /> : <strong>{totalPosts}</strong>}
                </div>
                <div className="flex items-center justify-between">
                    <span>Total Views:</span>
                    {isLoading ? <Skeleton className="h-4 w-12" /> : <strong>{totalViews}</strong>}
                </div>
                <div className="flex items-center justify-between">
                    <span>Total Reactions:</span>
                    {isLoading ? <Skeleton className="h-4 w-12" /> : <strong>{totalReactions}</strong>}
                </div>
            </CardContent>
        </Card>
    );
};

export default TotalBlogStats;