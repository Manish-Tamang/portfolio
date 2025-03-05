"use client";
import React, { useState, useEffect } from 'react';
import { ContributionGrid } from './ContributionGrid';
import { Info } from './Info';
import { Skeleton } from "@/components/ui/skeleton";

interface ContributionData {
    data?: {
        followers?: number;
        stars?: number;
        contributions?: {
            colors?: string[];
            totalContributions: number;
            months: {
                firstDay: string;
                name: string;
                totalWeeks: number;
            }[];
            weeks: {
                contributionDays: {
                    color: string;
                    contributionCount: number;
                    date: string;
                }[];
                firstDay: string;
            }[];
        };
    };
    error?: string;
}

const ContributionGraph = () => {
    const [contributionData, setContributionData] = useState<ContributionData>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/github');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data = await response.json();
                setContributionData(data);
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setContributionData({ error: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="mt-2 flex flex-col items-center">
                    <Skeleton className="w-[640px] h-[82px] rounded-md" />
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="w-6 h-6 rounded-sm" />
                        <Skeleton className="w-6 h-6 rounded-sm" />
                        <Skeleton className="w-6 h-6 rounded-sm" />
                        <Skeleton className="w-6 h-6 rounded-sm" />
                        <Skeleton className="w-6 h-6 rounded-sm" />
                    </div>
                </div>
            </div>
        );
    }

    if (contributionData.error) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2 text-red-500">Error: {contributionData.error}</div>
            </div>
        );
    }

    const { contributions } = contributionData.data || {};

    if (!contributions) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2">No contribution data available.</div>
            </div>
        );
    }

    const githubColors = [
        '#EDEDED',
        '#9BE9A8',
        '#40C463',
        '#30A14E',
        '#216E39'
    ];

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">My Github Contribution Graph (Real Time)</h2>
            <div className="w-full flex flex-col items-center mt-2">
                <div className="flex justify-center items-start overflow-visible p-1">
                    <div className="overflow-visible">
                        <ContributionGrid
                            weeks={contributions.weeks}
                            colors={contributions.colors || githubColors}
                        />
                    </div>
                </div>
                <Info colors={githubColors} />
            </div>
        </div>
    );
};

export default ContributionGraph;