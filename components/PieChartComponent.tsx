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
import { FaFileCode } from "react-icons/fa";

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
    const processedData = data.map(item => ({
        ...item,
        value: Math.round(item.value * 100) / 100
    }));
    const top5Data = [...processedData].sort((a, b) => b.value - a.value).slice(0, 5);

    return (
        <Card className="flex flex-col border dark:border-gray-700 bg-white dark:bg-[#09090B] w-full">
            <CardHeader className="items-left pb-0">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-gray-800 dark:text-gray-100 text-lg flex items-center">
                        <FaFileCode className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-1" />
                        {title}
                    </CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-200 text-sm">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center justify-between w-full">
                {isLoading ? (
                    <Skeleton className="w-full h-[250px]" />
                ) : processedData && processedData.length > 0 ? (
                    <div className="flex items-center w-full">
                        <ChartContainer
                            config={chartConfig}
                            className="w-1/2 aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie data={processedData} dataKey="value" nameKey="name" innerRadius={50}>
                                    {processedData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={languageColors[index % languageColors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="w-1/2 p-4 flex flex-col justify-center">
                            {top5Data.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <div className="w-4 h-4" style={{ backgroundColor: item.fill }}></div>
                                    <span className="text-sm text-gray-800 dark:text-gray-200">{item.name}: {item.value.toFixed(2)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No data available.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default PieChartComponent;