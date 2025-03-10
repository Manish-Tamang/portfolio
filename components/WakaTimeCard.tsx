"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface WakaTimeCardProps {
    title: string;
    description: string;
    isLoading: boolean;
    value?: string | JSX.Element;
    icon: React.ReactNode;
    motionDelay?: number;
}

const WakaTimeCard: React.FC<WakaTimeCardProps> = ({
    title,
    description,
    isLoading,
    value,
    icon,
    motionDelay = 0,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: motionDelay }}
        >
            <Card className="border border-gray-200 rounded-[4px] dark:border-gray-700 bg-white dark:bg-[#09090B] h-48 flex flex-col">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        {icon}
                        <CardTitle className="dark:text-white text-gray-800 font-medium text-base">{title}</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400 text-gray-600 text-xs">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    {isLoading ? (
                        <Skeleton className="h-6 w-24" />
                    ) : (
                        <div className="text-2xl font-semibold dark:text-white text-gray-800">
                            {value}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WakaTimeCard;