"use client";

import * as React from "react";
import useSWR from "swr";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SessionData {
    id: string;
    browser: string;
    os: string;
    device: string;
    country: string;
    city: string;
    visits: number;
    views: number;
    firstAt: string;
    lastAt: string;
}

interface APIResponse {
    data: SessionData[];
    count: number;
    page: number;
    pageSize: number;
}

interface Props {
    className?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SessionStats: React.FC<Props> = ({ className }) => {
    const { data, error, isLoading } = useSWR<APIResponse>("/api/analytics?type=sessions", fetcher);

    if (error) {
        return <div className="text-red-500">Failed to load session analytics.</div>;
    }

    if (isLoading) {
        return (
            <Card className={cn("w-full border dark:border-gray-700 bg-white dark:bg-[#09090B] rounded-[4px] p-4", className)}>
                <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">User Sessions</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">Session data overview</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                </CardContent>
            </Card>
        );
    }

    const countryData = data?.data.reduce((acc: { [key: string]: SessionData }, session) => {
        if (Object.keys(acc).length < 4) {
            if (!acc[session.country]) {
                acc[session.country] = session;
            }
        }
        return acc;
    }, {});

    const formatISODate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return format(date, 'MMM dd, yyyy hh:mm:ss a');
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    return (
        <Card className={cn("w-full border dark:border-gray-700 bg-white dark:bg-[#09090B] rounded-[4px] p-4", className)}>
            <CardHeader>
                <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">User Sessions (Analytics)</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">Recent 4 session made into my website</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {countryData && Object.values(countryData).map((session) => (
                        <Card key={session.country} className="border dark:border-gray-700 bg-white dark:bg-[#09090B] rounded-[4px] p-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={`https://flagcdn.com/h240/${session.country.toLowerCase()}.png`}
                                    alt={`${session.country} flag`}
                                    className="w-10 h-6 object-contain rounded"
                                />
                                <div className="text-sm">
                                    <p className="text-gray-500 dark:text-gray-400">Browser: {session.browser}</p>
                                    <p className="text-gray-500 dark:text-gray-400">OS: {session.os}</p>
                                    <p className="text-gray-500 dark:text-gray-400">Device: {session.device}</p>
                                    <p className="text-gray-500 dark:text-gray-400">City: {session.city}</p>
                                    <p className="text-gray-500 dark:text-gray-400">First At: {formatISODate(session.firstAt)}</p>
                                    <p className="text-gray-500 dark:text-gray-400">Last At: {formatISODate(session.lastAt)}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default SessionStats;