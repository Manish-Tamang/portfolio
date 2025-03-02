"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ContributionGrid = ({ data }: { data: Record<string, number> }) => {
  const getCellColor = (count: number) => {
    switch (true) {
      case count === 0:
        return "#EDEDED"
      case count < 10:
        return "#ACD5F2"
      case count < 20:
        return "#7FA8C9"
      case count < 30:
        return "#527BA0"
      default:
        return "#254E77"
    }
  }

  return (
    <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
      {Object.entries(data).map(([date, count], index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: getCellColor(count) }}
          title={`${date}: ${count} contributions`}
        />
      ))}
    </div>
  )
}

export default function ContributionGraph() {
  const [data, setData] = useState<Record<string, number>>({})

  useEffect(() => {
    const generateMockData = () => {
      const mockData: Record<string, number> = {}
      const currentDate = new Date()
      const oneYearAgo = new Date(currentDate)
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1)
      for (let day = new Date(oneYearAgo); day <= currentDate; day.setDate(day.getDate() + 1)) {
        mockData[day.toISOString().slice(0, 10)] = Math.floor(Math.random() * 5)
      }
      return mockData
    }

    setData(generateMockData())
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <ContributionGrid data={data} />
      </CardContent>
    </Card>
  )
}

