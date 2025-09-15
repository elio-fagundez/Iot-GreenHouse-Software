"use client"


import { Thermometer, Droplets, Wind, Lightbulb, Gauge } from "lucide-react"
import Image from "next/image"
import { Sidebar } from "./sidebardashboard"
import { SensorCard } from "./sensor-card"
import { MetricChart } from "./area-chart"

export default function FloatingDashboard() {
  return (
    <div className="flex min-h-screen bg-background  rounded-lg overflow-hidden px-4  "> 
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Greenhouse Lettuces</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <SensorCard
            title="Temperature"
            value="24.00°C"
            subValue="75.20°F"
            icon={Thermometer}
            color="#10B981"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
          <SensorCard
            title="Humidity"
            value="73.60 %"
            icon={Droplets}
            color="#3B82F6"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
          <SensorCard
            title="Fan 1"
            value="80.00 RPM"
            icon={Wind}
            color="#6B7280"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
          <SensorCard
            title="Luminosity"
            value="30.83 Lux"
            icon={Lightbulb}
            color="#1D4ED8"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
          <SensorCard
            title="Soil Humidity"
            value="0.00 %"
            icon={Droplets}
            color="#6B7280"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
          <SensorCard
            title="CO2"
            value="66.40 PPM"
            icon={Gauge}
            color="#6B7280"
            onRefresh={() => {}}
            onSettings={() => {}}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <MetricChart title="Temperature" metric="°C" color="#10B981" />
          <MetricChart title="Humidity" metric="%" color="#3B82F6" />
        </div>

        <div className="flex justify-center">
       
        </div>
      </main>
    </div>
  )
}

