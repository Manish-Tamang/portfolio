"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useState, useEffect } from "react"

const generateChartData = () => {
  const data = []
  const today = new Date()
  for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      data.push({ day: formattedDate, hours: Math.floor(Math.random() * 8) });
  }
  return data
}

export default function CodingHoursChart() {
   const [chartData, setChartData] = useState<{ day: string, hours: number }[]>([]);
   useEffect(() => {
     setChartData(generateChartData());
   }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Hours (Last 90 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#254E77" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}