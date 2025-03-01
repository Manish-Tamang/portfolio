"use client";

import { TrendingUp, FolderGit2 } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

interface Project {
    name: string;
    text: string;
}

interface WakaTimeData {
    projects: Project[];
}

const ProjectsBarChart = ({ data }: { data: WakaTimeData }) => {
    if (!data || !data.projects || data.projects.length === 0) {
        return <div>No project data available</div>;
    }

    const chartData = data.projects.slice(0, 6).map(project => {
        const hoursMatch = project.text.match(/(\d+) hrs/);
        const minsMatch = project.text.match(/(\d+) mins/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const mins = minsMatch ? parseInt(minsMatch[1]) : 0;

        return {
            project: project.name,
            hours: hours + mins / 60,
            hoursDisplay: hours,
            minsDisplay: mins,
            fill: getProjectColor(project.name),
        };
    });

    chartData.sort((a, b) => b.hours - a.hours);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-black rounded-[4px] flex items-center gap-2 p-1 text-xs">
                    <div className="w-2 h-2" style={{ backgroundColor: data.fill }} />
                    <span>{data.hoursDisplay} hrs {data.minsDisplay} mins</span>
                </div>
            );
        }
        return null;
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
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 16, right: 16, top: 8, bottom: 8 }} barSize={20}>
                        <YAxis dataKey="project" type="category" tickLine={false} tickMargin={8} axisLine={false} width={110} style={{ fontSize: '12px' }} />
                        <XAxis dataKey="hours" type="number" hide />
                        <Tooltip cursor={false} content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000 }} />
                        <Bar dataKey="hours" layout="vertical" radius={[0, 4, 4, 0]} fillOpacity={0.8}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
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

const getTotalHours = (projects: any[]) => {
    if (!projects || projects.length === 0) return 0;
    let totalHours = 0;
    let totalMinutes = 0;
    projects.forEach(project => {
        const hoursMatch = project.text.match(/(\d+) hrs/);
        const minsMatch = project.text.match(/(\d+) mins/);
        if (hoursMatch) totalHours += parseInt(hoursMatch[1]);
        if (minsMatch) totalMinutes += parseInt(minsMatch[1]);
    });
    return (totalHours + totalMinutes / 60).toFixed(2);
};

const getProjectColor = (projectName: string) => {
    const colors = [
        "hsl(215, 100%, 50%)",
        "hsl(340, 82%, 52%)",
        "hsl(30, 100%, 50%)",
        "hsl(276, 91%, 58%)",
        "hsl(168, 76%, 42%)",
        "hsl(4, 90%, 58%)",
    ];
    const hash = projectName.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    return colors[Math.abs(hash) % colors.length];
};

export default ProjectsBarChart;
