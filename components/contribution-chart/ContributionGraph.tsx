"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributionGrid } from './ContributionGrid';
import { Info } from './Info';
import { Months } from './Months';
import { Weekdays } from './Weekdays';
import styles from '@/styles/ContributionGraph.module.css';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

interface ContributionData {
  data?: {
    followers?: number;
    stars?: number;
    contributions?: {
      colors: string[];
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
    return <Card>
      <CardHeader>
        <CardTitle>Contribution Graph</CardTitle>
      </CardHeader>
      <CardContent> Loading graph...</CardContent>
    </Card>
  }

  if (contributionData.error) {
    return <Card>
      <CardHeader>
        <CardTitle>Contribution Graph</CardTitle>
      </CardHeader>
      <CardContent> Error: {contributionData.error}</CardContent>
    </Card>
  }

  const { followers, stars, contributions } = contributionData.data || {};

  if (!contributions) {
    return <Card>
      <CardHeader>
        <CardTitle>Contribution Graph</CardTitle>
      </CardHeader>
      <CardContent>No contribution data available.</CardContent>
    </Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full  flex flex-col items-center">
          <div className="flex justify-center items-start overflow-visible p-5">
            <div style={{ marginTop: "15px" }}>
              <Weekdays />
            </div>

            <div style={{ overflow: "visible" }}>
              <Months months={contributions.months} />
              <ContributionGrid weeks={contributions.weeks} />
            </div>
          </div>
          <Info colors={contributions.colors} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionGraph;