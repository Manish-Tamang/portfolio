'use client';

import React, { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import { format, parseISO } from 'date-fns';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


interface WakaTimeData {
    data: {
        human_readable_total: string;
        human_readable_daily_average: string;
        human_readable_range: string;
        best_day: {
            date: string;
            text: string;
            total_seconds: number;
        };
        languages: {
            name: string;
            percent: number;
        }[];
        dependencies?: {
            name: string;
            total_seconds: number;
        }[];
        projects: {
            name: string;
            text: string;
            percent: number;
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
        name2?: string;
    }[];
    dependencies?: {
        name: string;
        total_seconds: number;
    }[];
    projects: {
        name: string;
        text: string;
        percent: number;
    }[];
    categories?: {
        name: string;
        total_seconds: number;
        percent: number;
        text: string;
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

    useEffect(() => {
        if (wakaTimeData?.data) {
            const totalSeconds =
                wakaTimeData.data.categories?.reduce(
                    (acc, category) => acc + category.total_seconds,
                    0
                ) || 0;
            const totalHours = Math.floor(totalSeconds / 3600);
            const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
            const formattedTotal = `${totalHours} hrs ${totalMinutes} mins`;

            const bestDayDate = new Date(wakaTimeData.data.best_day.date);
            const formattedBestDayDate = bestDayDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });

            const otherLanguage = wakaTimeData.data.languages.find(
                (lang) => lang.name === 'Other'
            );

            setWakaSummary({
                total: formattedTotal,
                dailyAverage: wakaTimeData.data.human_readable_daily_average_including_other_language,
                range: wakaTimeData.data.human_readable_range,
                bestDay: {
                    date: wakaTimeData.data.best_day.date,
                    timeSpent: wakaTimeData.data.best_day.text,
                    formattedDate: formattedBestDayDate,
                },
                languages: wakaTimeData.data.languages.slice(0, 12).map((language) => ({ name: language.name, value: language.percent })),
                dependencies: wakaTimeData.data.dependencies,
                projects: wakaTimeData.data.projects,
                categories: wakaTimeData.data.categories
            });
            setIsLoading(false);
        }
    }, [wakaTimeData]);

    const [wakaSummary, setWakaSummary] = useState<WakaTimeSummary | null>(null);
    const [isLoading2, setIsLoading] = useState(true);

    const projectChartData = useMemo(() => {
        return wakaSummary?.projects?.slice(0, 6).map(project => ({
            name: project.name,
            hours: Number(project.text.split(" ")[0]) //Extracting the numerical Value (Hours)
        })) || [];
    }, [wakaSummary?.projects]);

    const languageData = useMemo(() => {
        return wakaTimeSummary?.languages?.map(lang => ({
            name: lang.name,
            value: lang.value,
        })) || [];
    }, [wakaTimeSummary?.languages]);
    //const languageData = []

    // Define color palette and theme for the Chart
    const chartConfig = {
        language1: { color: '#0088FE' },
        language2: { color: '#00C49F' },
        language3: { color: '#FFBB28' },
        language4: { color: '#FF8042' },
        language5: { color: '#8884d8' }, // Add more colors if needed
    };
    const totalTimeLoading = isLoading ? <Skeleton className="h-8 w-32" /> : (
      <div className="text-2xl font-bold">{wakaTimeSummary?.total || 'N/A'}</div>
    )
    // Find Max to draw Bar Line Chart
    const maxYValue = Math.max(
        Math.ceil(Math.max(...projectChartData.map((item) => item.hours), 60) / 10) * 10,
        100
    );

    const projectChartConfig = {
        project1: { color: "#2563eb", label: "Project 1" },
        project2: { color: "#60a5fa", label: "Project 2" },
        project3: { color: "#93c5fd", label: "Project 3" },
        project4: { color: "#bfdbfe", label: "Project 4" },
        project5: { color: "#dbeafe", label: "Project 5" },
        project6: { color: "#eff6ff", label: "Project 6" },
    }

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
                            {totalTimeLoading}
                    </CardContent>
                </Card>

                {/* Daily Average */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Average</CardTitle>
                        <CardDescription>Average coding time per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-8 w-32" /> : (
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
                        {isLoading ? <Skeleton className="h-8 w-48" /> : (
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
                    <CardContent>
                        {isLoading ? <Skeleton className="h-64" /> : (
                            wakaTimeSummary?.languages && wakaTimeSummary.languages.length > 0 ? (
                                <ChartContainer id="languages" config={chartConfig} >
                                    <PieChart width={400} height={300}>
                                        <Pie
                                            data={languageData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {languageData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={chartConfig[`language${index + 1}`]?.color || "#8884d8"} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip />
                                        <Legend/>
                                    </PieChart>
                                </ChartContainer>
                            ) : (
                                <div>No language data available.</div>
                            )
                        )}
                    </CardContent>
                </Card>

                {/* Project Chart */}
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Top 6 Projects Coded On Recently</CardTitle>
                        <CardDescription>Hours spent per project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-32" /> : (
                            <ChartContainer id="projects" config={projectChartConfig} className="min-h-[200px] w-full">
                                <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={projectChartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="hours" fill="var(--color-project1)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                                </ResponsiveContainer>
                             </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;