"use client";
import React, { useState, useEffect } from 'react';
import { ContributionGrid } from './ContributionGrid';
import { Info } from './Info';

interface ContributionData {
    data?: {
        followers?: number;
        stars?: number;
        contributions?: {
            colors?: string[];
            totalContributions: number;
            months: {
                firstDay: string;
                name: string;
                totalWeeks: number;
            }[];
            weeks: {
                contributionDays: {
                    color: string;
                    contributionCount: number;
                    date: string;
                }[];
                firstDay: string;
            }[];
        };
    };
    error?: string;
}

const ContributionGraph = () => {
    const [contributionData, setContributionData] = useState<ContributionData>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/github');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data = await response.json();
                setContributionData(data);
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setContributionData({ error: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2">Loading graph...</div>
            </div>
        );
    }

    if (contributionData.error) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2 text-red-500">Error: {contributionData.error}</div>
            </div>
        );
    }

    const { contributions } = contributionData.data || {};

    if (!contributions) {
        return (
            <div className="w-full max-w-md mx-auto p-4">
                <h2 className="text-xl font-semibold text-center">Contribution Graph</h2>
                <div className="text-center mt-2">No contribution data available.</div>
            </div>
        );
    }

    const githubColors = [
        '#EDEDED',  // No contributions
        '#9BE9A8',  // Low
        '#40C463',  // Moderate
        '#30A14E',  // High
        '#216E39'   // Very high
    ];

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">My Github Contribution Graph</h2>
            <div className="w-full flex flex-col items-center mt-2">
                <div className="flex justify-center items-start overflow-visible p-1">

                    <div className="overflow-visible">

                        <ContributionGrid
                            weeks={contributions.weeks}
                            colors={contributions.colors || githubColors}
                        />
                    </div>
                </div>
                <Info colors={githubColors} />
            </div>
        </div>
    );
};

export default ContributionGraph;