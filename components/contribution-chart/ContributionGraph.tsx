"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributionGrid } from './ContributionGrid';
import { Info } from './Info';
import { Months } from './Months';
import { Weekdays } from './Weekdays';
import styles from '@/styles/ContributionGraph.module.css';
import { fetchGithubContributions } from '@/lib/github'; // Import your fetch function
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


const ContributionGraph = () => {
    const [data, setData] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true); // Add loading state
    const [username, setUsername] = useState("Manish-Tamang") // Set a default username
    const [days, setDays] = useState<string[]>([])

    const loadData = () => {
        setLoading(true);
        fetchGithubContributions(username)
            .then(contributions => {
                setData(contributions)
                const today = new Date();
                const ninetyDaysAgo = new Date(today);
                ninetyDaysAgo.setDate(today.getDate() - 89);
                //Filter the data for the last 90 days
                const days = Object.keys(contributions).filter(date => {
                    const parsedDate = new Date(date);
                    return parsedDate >= ninetyDaysAgo && parsedDate <= today;
                });
                setDays(days);

            })
            .catch(error => console.error("Failed to fetch github data", error))
            .finally(() => setLoading(false));
    }


    useEffect(() => {
        loadData();
    }, [])


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleFetchData = () => {
        loadData();
    }

    if (loading) {
        return <Card>
            <CardHeader>
                <CardTitle>Contribution Graph</CardTitle>
            </CardHeader>
            <CardContent> Loading graph...</CardContent>
        </Card>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contribution Graph</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex mb-4">
                    <Input
                        type="text"
                        placeholder="Enter Github Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Button className="ml-2" onClick={handleFetchData}>Fetch Data</Button>
                </div>

                <div className="w-full  flex flex-col items-center">
                    <div className="flex justify-center items-start overflow-visible p-5">
                        <div style={{ marginTop: "15px" }}>
                            <Weekdays />
                        </div>

                        <div style={{ overflow: "visible" }}>
                            <Months days={days} />
                            <ContributionGrid data={data} />
                        </div>
                    </div>
                    <Info />
                </div>
            </CardContent>
        </Card>
    );
};

export default ContributionGraph;