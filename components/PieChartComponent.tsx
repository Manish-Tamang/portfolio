// components/PieChartComponent.tsx
"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface PieChartProps {
    data: { name: string; value: number; fill: string }[];
    isLoading: boolean;
    title: string;
    description: string;
    chartConfig: ChartConfig;
    languageColors: string[];
}

const PieChartComponent: React.FC<PieChartProps> = ({
    data,
    isLoading,
    title,
    description,
    chartConfig,
    languageColors,
}) => {
    return (
        <Card className="flex flex-col border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-gray-800 dark:text-gray-100 text-lg" >{title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-200 text-sm" >{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {isLoading ? (
                    <Skeleton className="w-full h-[250px]" />
                ) : data && data.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={data} dataKey="value" nameKey="name" innerRadius={40}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={languageColors[index % languageColors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <p>No data available.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default PieChartComponent;