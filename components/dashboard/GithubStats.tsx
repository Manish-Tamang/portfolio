// components/dashboard/GithubStats.tsx
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

interface GithubStatsProps {
    username: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ username }) => {
    const [followers, setFollowers] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchGithubStats = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch GitHub stats for ${username}`);
                }
                const data = await response.json();
                setFollowers(data.followers);
                setAvatarUrl(data.avatar_url);
            } catch (error: any) {
                console.error("Error fetching GitHub stats:", error.message);
                setFollowers(null);
                setAvatarUrl(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGithubStats();
    }, [username]);

    return (
        <Card className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-[4px] p-4">
            <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">
                    GitHub Stats
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                    Followers and contributions of {username}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        {isLoading ? (
                            <Skeleton className="h-6 w-20" />
                        ) : followers !== null ? (
                            <div className="text-2xl font-semibold dark:text-white text-gray-800">
                                {followers}
                            </div>
                        ) : (
                            <div className="text-gray-600 dark:text-gray-300">
                                Failed to load followers.
                            </div>
                        )}
                    </div>
                    <Avatar>
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={username} />
                        ) : (
                            <AvatarFallback>
                                {username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        )}
                    </Avatar>
                </div>

                {/* GitHub Contributions Chart */}
                <div className="mt-4">
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contribution Chart
                    </h3>
                    <ContributionGraph />
                </div>
            </CardContent>
        </Card>
    );
};

export default GithubStats;