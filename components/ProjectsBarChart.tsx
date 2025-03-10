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
        return <div className="text-gray-600 dark:text-gray-300">No project data available</div>;
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
                <div className="bg-black text-white rounded-[4px] p-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ backgroundColor: data.fill }} />
                        <span>{data.hoursDisplay} hrs {data.minsDisplay} mins</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full border dark:border-gray-700 bg-white dark:bg-[#09090B] rounded-[4px] p-4">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">Top 6 Active Projects</CardTitle>
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-400">Hours spent per project</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 16, right: 16, top: 8, bottom: 8 }} barSize={14}>
                        <YAxis
                            dataKey="project"
                            type="category"
                            tickLine={false}
                            tickMargin={6}
                            axisLine={false}
                            width={100}
                            style={{
                                fontSize: "10px",
                                fill: document.documentElement.classList.contains("dark") ? "#F9FAFB" : "#111827",
                            }}
                        />
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
            <CardFooter className="flex flex-col items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex gap-2 font-medium">
                    <TrendingUp className="h-4 w-4" /> Total coding time: {getTotalHours(data.projects)} hrs
                </div>
                <div className="text-gray-500 dark:text-gray-400">Displaying top 6 projects</div>
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