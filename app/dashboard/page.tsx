"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { Clock, Activity, Trophy, FolderGit2 } from 'lucide-react';
import WakaTimeCard from '@/components/WakaTimeCard';
import ProjectsBarChart from '@/components/ProjectsBarChart';
import PieChartComponent from '@/components/PieChartComponent';
import SessionStats from '@/components/dashboard/SessionStats';
import GithubStats from '@/components/dashboard/GithubStats';
import BlogStatsTable from '@/components/dashboard/BlogStatsTable';
import { getBlogPostStats } from "@/lib/BlogStats";
import TotalBlogStats from '@/components/dashboard/TotalBlogStats';


const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${url}: ${res.status} ${res.statusText}`);
    }
    return res.json();
};

interface WakaTimeData {
    data: {
        range: any;
        human_readable_total: string;
        human_readable_daily_average: string;
        human_readable_daily_average_including_other_language: string;
        human_readable_range: string;
        best_day: {
            date: string;
            text: string;
            total_seconds: number;
        };
        languages: {
            name: string;
            percent: number;
            text: string;
            total_seconds: number;
        }[];
        dependencies?: {
            name: string;
            total_seconds: number;
        }[];
        projects: {
            name: string;
            total_seconds: number;
            percent: number;
            digital: string;
            decimal: string;
            text: string;
            hours: number;
            minutes: number;
        }[];
        categories?: {
            name: string;
            total_seconds: number;
            percent: number;
            text: string;
        }[];
        is_coding_activity_visible: boolean;
        total_seconds_including_other_language: number;
    };
}

interface WakaTimeSummary {
    total: string;
    dailyAverage: string;
    range: string;
    bestDay: {
        date: string;
        timeSpent: string;
        formattedDate: string;
    };
    languages: {
        name: string;
        percent: number;
        total_seconds: number;
    }[];
    dependencies?: {
        name: string;
        value: number;
    }[];
    projects: {
        name: string;
        text: string;
    }[];
}

const formatDailyAverage = (dailyAverage: string): string => {
    const parts = dailyAverage.split(' ');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[2]);

    if (!isNaN(hours) && !isNaN(minutes)) {
        return `${hours} hrs ${minutes} mins`;
    } else if (!isNaN(hours)) {
        return `${hours} hrs 0 mins`;
    }

    return 'N/A';
};

const languageColors = [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"
];

export default function DashboardPage() {
    const { data: wakaTimeData, error, isLoading } = useSWR<WakaTimeData>('/api/wakatime', fetcher);
    const [wakaTimeSummary, setWakaTimeSummary] = useState<WakaTimeSummary | null>(null);
    const { theme } = useTheme();
    const [totalCodingTime, setTotalCodingTime] = useState<string>('N/A');
    const [formattedDailyAverage, setFormattedDailyAverage] = useState<string>('N/A');
    const [blogPostStats, setBlogPostStats] = useState<any[]>([]); // Add Blog Post Stats

    useEffect(() => {
        const loadBlogStats = async () => {
            const stats = await getBlogPostStats();
            setBlogPostStats(stats);
        };

        loadBlogStats();
    }, []);

    useEffect(() => {
        if (wakaTimeData?.data) {
            const totalSeconds = wakaTimeData.data.total_seconds_including_other_language;
            const totalHours = Math.floor(totalSeconds / 3600);
            const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
            const formattedTotal = `${totalHours} hrs ${totalMinutes} mins`;

            setTotalCodingTime(formattedTotal);
        }
    }, [wakaTimeData]);

    useEffect(() => {
        if (wakaTimeData?.data) {
            const dailyAverage = wakaTimeData.data.human_readable_daily_average_including_other_language;
            setFormattedDailyAverage(formatDailyAverage(dailyAverage));
        }
    }, [wakaTimeData]);

    useEffect(() => {
        if (!wakaTimeData?.data) return;

        const processData = () => {
            const { data } = wakaTimeData;

            const filteredLanguages = data.languages.filter(
                (lang) => lang.name !== 'Other'
            );
            const totalPercent = filteredLanguages.reduce((sum, lang) => sum + lang.percent, 0);
            const recalculatedLanguages = filteredLanguages.map((lang) => ({
                name: lang.name,
                percent: (lang.percent / totalPercent) * 100,
                total_seconds: lang.total_seconds,
            }));

            const projectsData = data.projects.slice(0, 6).map(project => ({
                name: project.name,
                text: project.text,
            }));

            const dependenciesData = data.dependencies?.slice(0, 10).map(dep => ({
                name: dep.name,
                value: Math.round(dep.total_seconds / 3600)
            })) || [];

            const bestDayDate = new Date(wakaTimeData.data.best_day.date);
            const formattedBestDayDate = bestDayDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).replace(/,/g, '');

            return {
                total: data.human_readable_total,
                dailyAverage: data.human_readable_daily_average_including_other_language,
                range: data.range,
                bestDay: {
                    date: data.best_day.date,
                    timeSpent: data.best_day.text,
                    formattedDate: formattedBestDayDate,
                },
                languages: recalculatedLanguages,
                dependencies: dependenciesData,
                projects: projectsData,
            };
        };

        if (wakaTimeData?.data) {
            setWakaTimeSummary(processData());
        }
    }, [wakaTimeData]);

    const pieChartData = wakaTimeSummary?.languages.map((lang, index) => ({
        name: lang.name,
        value: lang.percent,
        fill: languageColors[index % languageColors.length]
    })) || [];

    const chartConfig = {
        height: { label: 'Height', value: 250 },
        width: { label: 'Width', value: 250 },
    };

    if (error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto py-10 text-red-500"
        >
            Failed to load dashboard data
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto py-10 px-4"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold font-peachi mb-1 dark:text-white text-gray-800"
            >
                Dashboard
            </motion.h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
                A comprehensive overview of my coding activity, powered by WakaTime and GitHub, followed by Umami Analytics for session tracking. Additionally, blog statistics are included to give
                insights into engagement and user interaction with my technical posts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <WakaTimeCard
                    title="Total Time Coded"
                    description="All time coding duration since sep 2 2024"
                    isLoading={isLoading}
                    value={totalCodingTime}
                    icon={<Clock className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
                    motionDelay={0.1}
                />

                <WakaTimeCard
                    title="Daily Average"
                    description="Average coding time per day"
                    isLoading={isLoading}
                    value={formattedDailyAverage}
                    icon={<Activity className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
                    motionDelay={0.2}
                />

                <WakaTimeCard
                    title="Best Day"
                    description="Most productive day"
                    isLoading={isLoading}
                    value={
                        wakaTimeSummary ? (
                            <>
                                <div className="dark:text-gray-400 text-gray-600">{wakaTimeSummary.bestDay.formattedDate || 'N/A'}</div>
                                <div className="font-bold dark:text-white text-gray-800">{wakaTimeSummary.bestDay.timeSpent || 'N/A'}</div>
                            </>
                        ) : 'N/A'
                    }
                    icon={<Trophy className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
                    motionDelay={0.3}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-1 md:col-span-2 lg:col-span-3"
                >
                    {isLoading ? (
                        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#09090B]">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <FolderGit2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                    <CardTitle className="dark:text-white text-gray-800">Top 6 Projects Coded On Recently</CardTitle>
                                </div>
                                <CardDescription className="dark:text-gray-400 text-gray-600">Hours spent per project</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-64 w-full" />
                            </CardContent>
                        </Card>
                    ) : wakaTimeSummary ? (
                        <ProjectsBarChart data={wakaTimeSummary} />
                    ) : (
                        <div className="dark:text-gray-400 text-gray-600">No project data available.</div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="col-span-full"
                >
                    <PieChartComponent
                        data={pieChartData}
                        isLoading={isLoading}
                        title="Languages Used"
                        description="Percentage of time spent on each language"
                        chartConfig={chartConfig}
                        languageColors={languageColors}
                    />
                </motion.div>
            </div>
            <SessionStats className="mt-4 mb-4" />
            <GithubStats username="Manish-Tamang" />
            <TotalBlogStats />
            <Card className="col-span-full mt-6 bg-white dark:bg-[#09090B] border text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle>Blog Post Stats</CardTitle>
                    <CardDescription>Summary of blog post engagement.</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                    {blogPostStats.length > 0 ? (
                        <BlogStatsTable stats={blogPostStats} isLoading={false} />
                    ) : (
                        <p>No blog post stats available.</p>
                    )}
                </CardContent>
            </Card>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://theodorusclarence.com/statistics" className="underline">Theodorus Clarence (Blog stats)</a>and <a href="https://victoreke.com/" className="underline">Victor Eke (Contribution Graph)</a>.
            </p>
        </motion.div>
    );
}