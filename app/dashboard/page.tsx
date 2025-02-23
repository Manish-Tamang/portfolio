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
        is_coding_activity_visible: boolean
        total_seconds_including_other_language: number
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
        total_seconds: number
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

export default function DashboardPage() {
    const { data: wakaTimeData, error, isLoading } = useSWR<WakaTimeData>('/api/wakatime', fetcher);
    const [wakaTimeSummary, setWakaTimeSummary] = useState<WakaTimeSummary | null>(null);
    const { theme } = useTheme();
    const [totalCodingTime, setTotalCodingTime] = useState<string>('N/A');
    const [formattedDailyAverage, setFormattedDailyAverage] = useState<string>('N/A');

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

            const languagesData = data.languages?.map(lang => ({
                name: lang.name,
                percent: lang.percent,
                total_seconds: lang.total_seconds,
            })) || [];

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
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            return {
                total: data.human_readable_total,
                dailyAverage: data.human_readable_daily_average_including_other_language,
                range: data.range,
                bestDay: {
                    date: data.best_day.date,
                    timeSpent: data.best_day.text,
                    formattedDate: formattedBestDayDate,
                },
                languages: languagesData,
                dependencies: dependenciesData,
                projects: projectsData,
            };
        };

        if (wakaTimeData?.data) {
            setWakaTimeSummary(processData());
        }
    }, [wakaTimeData]);

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
                className="text-4xl font-bold mb-8 dark:text-white text-gray-800"
            >
                Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Coding Time */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Clock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <CardTitle className="dark:text-white text-gray-800">Total Time Coded</CardTitle>
                            </div>
                            <CardDescription className="dark:text-gray-400 text-gray-600">All time coding duration</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-8 w-32" />
                            ) : (
                                <div className="text-2xl font-bold dark:text-white text-gray-800">
                                    {totalCodingTime}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Daily Average */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Activity className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <CardTitle className="dark:text-white text-gray-800 text-xl">Daily Average</CardTitle>
                            </div>
                            <CardDescription className="dark:text-gray-400 text-gray-600">Average coding time per day</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-8 w-32" />
                            ) : (
                                <div className="text-2xl font-bold dark:text-white text-gray-800">
                                    {formattedDailyAverage}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Best Day */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <CardTitle className="dark:text-white text-gray-800">Best Day</CardTitle>
                            </div>
                            <CardDescription className="dark:text-gray-400 text-gray-600">Most productive day</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <Skeleton className="h-16 w-48" />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="dark:text-gray-400 text-gray-600">{wakaTimeSummary?.bestDay.formattedDate || 'N/A'}</div>
                                    <div className="font-bold dark:text-white text-gray-800">{wakaTimeSummary?.bestDay.timeSpent || 'N/A'}</div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Projects Coded On Recently */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-1 md:col-span-2 lg:col-span-3"
                >
                    <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FolderGit2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <CardTitle className="dark:text-white text-gray-800">Top 6 Projects Coded On Recently</CardTitle>
                            </div>
                            <CardDescription className="dark:text-gray-400 text-gray-600">Hours spent per project</CardDescription>
                        </CardHeader>
                        <CardContent className="h-max w-full">
                            {isLoading ? (
                                <Skeleton className="h-full w-full" />
                            ) : wakaTimeSummary?.projects && wakaTimeSummary.projects.length > 0 ? (
                                <div className="space-y-4">
                                    {wakaTimeSummary.projects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex justify-between items-center p-4 rounded-[4px]-lg border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400" />
                                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                                    {project.name}
                                                </span>
                                            </div>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {project.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="dark:text-gray-400 text-gray-600">No project data available.</div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}