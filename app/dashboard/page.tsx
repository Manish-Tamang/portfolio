"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { useTheme } from 'next-themes';

// Chart configurations
const CHART_COLORS = {
    language1: '#0088FE',
    language2: '#00C49F',
    language3: '#FFBB28',
    language4: '#FF8042',
    language5: '#8884d8',
    project: '#2563eb',
};

interface WakaTimeData {
    data: {
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
        }[];
        projects: {
            name: string;
            text: string;
            percent: number;
            total_seconds: number;
        }[];
        categories?: {
            name: string;
            total_seconds: number;
            percent: number;
            text: string;
        }[];
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
        value: number;
        color: string;
    }[];
    projects: {
        name: string;
        hours: number;
    }[];
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const DashboardPage = () => {
    const { data: wakaTimeData, error, isLoading } = useSWR<WakaTimeData>('/api/wakatime', fetcher);
    const [wakaTimeSummary, setWakaTimeSummary] = useState<WakaTimeSummary | null>(null);
    const { theme } = useTheme();

    // Process WakaTime data
    useEffect(() => {
        if (!wakaTimeData?.data) return;

        const processData = () => {
            // Calculate total time
            const totalSeconds = wakaTimeData.data.categories?.reduce(
                (acc, category) => acc + category.total_seconds,
                0
            ) || 0;
            const totalHours = Math.floor(totalSeconds / 3600);
            const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
            const formattedTotal = `${totalHours} hrs ${totalMinutes} mins`;

            // Format best day
            const bestDayDate = new Date(wakaTimeData.data.best_day.date);
            const formattedBestDayDate = bestDayDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            // Process languages
            const filteredLanguages = wakaTimeData.data.languages
                ? wakaTimeData.data.languages.filter(lang => lang.name !== "Other")
                : [];

            const totalPercentage = filteredLanguages.reduce((acc, lang) => acc + lang.percent, 0);

            const languageData = filteredLanguages
                .slice(0, 5)
                .map((language, index) => ({
                    name: language.name,
                    value: Number(((language.percent / totalPercentage) * 100).toFixed(1)),
                    color: CHART_COLORS[`language${index + 1}` as keyof typeof CHART_COLORS] || CHART_COLORS.language5
                }));

            // Process projects
            const projectsData = wakaTimeData.data.projects
                ? wakaTimeData.data.projects.slice(0, 6).map(project => ({
                    name: project.name.split('-').pop() || project.name,
                    hours: Number((project.total_seconds / 3600).toFixed(1))
                }))
                : [];

            return {
                total: formattedTotal,
                dailyAverage: wakaTimeData.data.human_readable_daily_average_including_other_language,
                range: wakaTimeData.data.human_readable_range,
                bestDay: {
                    date: wakaTimeData.data.best_day.date,
                    timeSpent: wakaTimeData.data.best_day.text,
                    formattedDate: formattedBestDayDate,
                },
                languages: languageData,
                projects: projectsData
            };
        };

        if (wakaTimeData?.data) {
            setWakaTimeSummary(processData());
        }
    }, [wakaTimeData]);

    const chartData =
    wakaTimeSummary?.projects?.slice(0, 6)?.map((project) => ({
          name: project.name,
          hours: Number((project.hours).toFixed(1))
        })) || [];

  const maxYValue = Math.max(
    Math.ceil(Math.max(...chartData.map((item) => item.hours), 60) / 10) * 10,
    100
  );

  const Color = theme === 'dark' ? 'white' : 'black';

    if (error) return <div>Failed to load dashboard data</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Coding Time */}
                <Card>
                    <CardHeader>
                        <CardTitle>Total Coding Time</CardTitle>
                        <CardDescription>All time coding duration</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="text-2xl font-bold">{wakaTimeSummary?.total || 'N/A'}</div>
                        )}
                    </CardContent>
                </Card>

                {/* Daily Average */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Average</CardTitle>
                        <CardDescription>Average coding time per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="text-2xl font-bold">{wakaTimeSummary?.dailyAverage || 'N/A'}</div>
                        )}
                    </CardContent>
                </Card>

                {/* Best Day */}
                <Card>
                    <CardHeader>
                        <CardTitle>Best Day</CardTitle>
                        <CardDescription>Most productive day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-16 w-48" />
                        ) : (
                            <>
                                <div className="font-bold">{wakaTimeSummary?.bestDay.formattedDate || 'N/A'}</div>
                                <div>{wakaTimeSummary?.bestDay.timeSpent || 'N/A'}</div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Languages Chart */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Languages</CardTitle>
                        <CardDescription>Percentage of time spent in each language</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] w-full">
                        {isLoading ? (
                            <Skeleton className="h-full w-full" />
                        ) : wakaTimeSummary?.languages && wakaTimeSummary.languages.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={wakaTimeSummary.languages}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        label={(entry) => `${entry.name} (${entry.value}%)`}
                                        labelLine={false}
                                    >
                                        {wakaTimeSummary.languages.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[`language${index + 1}` as keyof typeof CHART_COLORS] || CHART_COLORS.language5} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div>No language data available.</div>
                        )}
                    </CardContent>
                </Card>

                {/* Project Chart */}
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Top 6 Projects Coded On Recently</CardTitle>
                        <CardDescription>Hours spent per project</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] w-full">
                    {isLoading ? (
                        <Skeleton className="h-full w-full" />
                    ) : wakaTimeSummary?.projects && wakaTimeSummary.projects.length > 0 ? (
                        <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="hsl(var(--border))"
                            />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={80}
                                tick={{ fontSize: 12 }}
                                stroke={Color}
                            />
                            <YAxis
                                stroke={Color}
                                domain={[0, maxYValue]}
                                tickCount={Math.min(maxYValue + 1, 7)}
                            />
                            <Tooltip
                                formatter={(value: number) => [`${value} hours`, 'Time']}
                                contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                color: 'hsl(var(--text-color))'
                                }}
                            />
                            <Bar dataKey="hours" fill={CHART_COLORS.project} radius={[4, 4, 0, 0]}>
                                <LabelList dataKey="hours" position="top" />
                            </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <div>No project data available.</div>
                    )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;