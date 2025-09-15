"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "01/01", value: 35 },
  { date: "01/02", value: 40 },
  { date: "01/03", value: 38 },
  { date: "01/04", value: 45 },
  { date: "01/05", value: 42 },
  { date: "01/06", value: 50 },
  { date: "01/07", value: 48 },
]

interface MetricChartProps {
  title: string
  metric: string
  color: string
}

export function MetricChart({ title, metric, color }: MetricChartProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="font-medium">{title}</h3>
        <Select defaultValue="30">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

