"use client";
import React, { useState, useEffect } from 'react';
import { ContributionGrid } from './ContributionGrid';
import { Info } from './Info';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const [totalContributions, setTotalContributions] = useState<number>(0);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);
    const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/github${year ? `?year=${year}` : ''}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data = await response.json();
                setContributionData(data);
                // Update available years from API if present
                const yearsFromApi: number[] | undefined = data?.data?.contributionYears;
                if (yearsFromApi && Array.isArray(yearsFromApi) && yearsFromApi.length > 0) {
                    // Sort desc
                    const sorted = [...yearsFromApi].sort((a, b) => b - a);
                    setAvailableYears(sorted);
                    // If current selected year isn't in list, switch to latest
                    if (!sorted.includes(year)) {
                        setYear(sorted[0]);
                    }
                }

                if (data.data?.contributions?.weeks) {
                    const total = data.data.contributions.weeks.reduce((acc: any, week: { contributionDays: any[]; }) => {
                        return acc + week.contributionDays.reduce((dayAcc: any, day: { contributionCount: any; }) => dayAcc + day.contributionCount, 0);
                    }, 0);
                    setTotalContributions(total);
                }
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setContributionData({ error: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    if (loading) {
        return (
            <div className="w-full p-4">
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
            <div className="w-full p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2 text-red-500">Error: {contributionData.error}</div>
            </div>
        );
    }

    const { contributions } = contributionData.data || {};

    if (!contributions) {
        return (
            <div className="w-full p-4">
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
        <div className="w-full p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-gray-900 dark:text-gray-100">My Github Contribution Graph</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Year</span>
                        <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableYears.map((y) => (
                                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Contributions: {totalContributions}</div>
            </div>
            <div className="w-full flex flex-col items-center mt-2 overflow-x-auto md:overflow-x-visible">
                <div className="flex justify-center items-start p-1 w-full">
                    <div className="w-full max-w-none">
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