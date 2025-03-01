import React from 'react';
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { FolderGit2 } from "lucide-react";
import '@/app/globals.css';

interface Project {
    name: string;
    text: string;
}

interface WakaTimeData {
    projects: Project[];
}

const WakaTimeBarChart = ({ data }: { data: WakaTimeData }) => {
    if (!data || !data.projects || data.projects.length === 0) {
        return <div>No project data available</div>;
    }

    // Process the WakaTime data for the bar chart
    const chartData = data.projects.slice(0, 6).map(project => {
        // Extract hours and minutes for tooltip display
        const hoursMatch = project.text.match(/(\d+) hrs/);
        const minsMatch = project.text.match(/(\d+) mins/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const mins = minsMatch ? parseInt(minsMatch[1]) : 0;

        return {
            project: project.name,
            hours: hours + (mins / 60), // Convert to decimal hours for sorting
            hoursDisplay: hours,
            minsDisplay: mins,
            fill: getProjectColor(project.name), // Generate a unique color for each project
        };
    });

    // Sort projects by hours spent (descending)
    chartData.sort((a, b) => b.hours - a.hours);

    // Create color configuration
    const chartConfig = {
        hours: {
            label: "Hours",
        },
        ...chartData.reduce((acc: { [key: string]: { label: string; color: string } }, item) => {
            acc[item.project] = {
                label: item.project,
                color: item.fill,
            };
            return acc;
        }, {})
    };

    return (
        <Card className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FolderGit2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <CardTitle className="dark:text-white text-gray-800">Top 6 Projects Coded On Recently</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400 text-gray-600">Hours spent per project</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 16,
                            right: 16,
                            top: 8,
                            bottom: 8,
                        }}
                        barSize={24}
                    >
                        <YAxis
                            dataKey="project"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={120}
                            style={{
                                fontSize: '12px',
                            }}
                        />
                        <XAxis dataKey="hours" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <ChartTooltipContent>
                                            <div className="font-medium">{data.project}</div>
                                            <div>{data.hoursDisplay} hrs {data.minsDisplay} mins</div>
                                        </ChartTooltipContent>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar dataKey="hours" layout="vertical" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <TrendingUp className="h-4 w-4" /> Total coding time: {getTotalHours(data.projects)} hrs
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing your top 6 most active projects
                </div>
            </CardFooter>
        </Card>
    );
};

// Helper function to get total hours from all projects
const getTotalHours = (projects: any[]) => {
    if (!projects || projects.length === 0) return 0;

    let totalHours = 0;
    projects.forEach(project => {
        const hoursMatch = project.text.match(/(\d+) hrs/);
        if (hoursMatch) {
            totalHours += parseInt(hoursMatch[1]);
        }
    });

    return totalHours;
};

// Generate consistent colors for projects
const getProjectColor = (projectName: string) => {
    const colors = [
        "hsl(215, 100%, 50%)",   // Blue
        "hsl(340, 82%, 52%)",    // Pink
        "hsl(30, 100%, 50%)",    // Orange
        "hsl(276, 91%, 58%)",    // Purple
        "hsl(168, 76%, 42%)",    // Teal
        "hsl(4, 90%, 58%)",      // Red
    ];

    // Simple hash function to get consistent colors
    const hash = projectName.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
};

export default WakaTimeBarChart;