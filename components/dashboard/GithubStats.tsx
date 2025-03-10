"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ContributionGraph from "@/components/contribution-chart/ContributionGraph";
import { Users, Star, User } from "lucide-react"; 

interface GithubStatsProps {
    username: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ username }) => {
    const [followers, setFollowers] = useState<number | null>(null);
    const [totalStars, setTotalStars] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchGithubStats = async () => {
            setIsLoading(true);
            try {
                // Fetch user data (followers and avatar)
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch GitHub user data for ${username}`);
                }
                const userData = await userResponse.json();
                setFollowers(userData.followers);
                setAvatarUrl(userData.avatar_url);

                // Fetch repository data to calculate total stars
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!reposResponse.ok) {
                    throw new Error(`Failed to fetch GitHub repositories for ${username}`);
                }
                const reposData = await reposResponse.json();
                const totalStarsCount = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
                setTotalStars(totalStarsCount);
            } catch (error: any) {
                console.error("Error fetching GitHub stats:", error.message);
                setFollowers(null);
                setTotalStars(null);
                setAvatarUrl(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGithubStats();
    }, [username]);

    return (
        <Card className="border dark:border-gray-700 bg-white dark:bg-[#09090B] rounded-[4px] p-2">
            <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">
                    GitHub Stats
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                    Followers, stars, and contributions of mine (<a href="https://github.com/Manish-Tamang" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{username}</a>)
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-row items-center gap-6">
                        {isLoading ? (
                            <>
                                <Skeleton className="h-6 w-20 mb-2" />
                                <Skeleton className="h-6 w-20" />
                            </>
                        ) : followers !== null && totalStars !== null ? (
                            <div className="flex flex-row items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Users className="text-gray-800 dark:text-white h-5 w-5" />
                                    <span className="text-xl dark:text-white text-gray-800">
                                        {followers} Followers
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="text-gray-800 dark:text-white h-5 w-5" />
                                    <span className="text-xl dark:text-white text-gray-800">
                                        {totalStars} Stars
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <span>Failed to load stats.</span>
                            </div>
                        )}
                    </div>
                    <Avatar className="w-12 h-12">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={username} />
                        ) : (
                            <AvatarFallback className="flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <User className="h-6 w-6 text-gray-800 dark:text-white" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </div>
                <div className="mt-4">
                    <ContributionGraph />
                </div>
            </CardContent>
        </Card>
    );
};

export default GithubStats;