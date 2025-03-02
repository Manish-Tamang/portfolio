"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const generateCommitData = () => {
  const data: Record<string, number> = {}
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data[date.toISOString().split("T")[0]] = Math.floor(Math.random() * 5)
  }
  return data
}

const CommitCell = ({ date, count }: { date: string; count: number }) => {
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100"
    if (count < 2) return "bg-green-200"
    if (count < 4) return "bg-green-400"
    return "bg-green-600"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`w-3 h-3 ${getColor(count)}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {count} commits on {date}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function CommitGraph() {
  const [commitData, setCommitData] = useState<Record<string, number>>({})

  useEffect(() => {
    setCommitData(generateCommitData())
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit History (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(30,1fr)] gap-1">
          {Object.entries(commitData).map(([date, count]) => (
            <CommitCell key={date} date={date} count={count} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

