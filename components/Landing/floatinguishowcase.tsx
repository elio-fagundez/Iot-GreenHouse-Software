"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


import {
  Thermometer,
  Droplets,
  Wind,
  Lightbulb,
  Power,
  Gauge,
  BarChart3,
} from "lucide-react";
import FloatingDashboard from "./floatingDashboard";

export default function FloatingUIShowcase() {
  return (
    <div
      className="relative min-h-[800px] w-full overflow-hidden bg-transparent p-4"
    >
      {/* Speed Gauge */}
      <Card className="absolute left-[10%] top-[5%] w-[200px] transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl">
        <div className="p-6">
          <p className="text-sm text-gray-600">Speed</p>
          <div className="relative mt-2">
            <div className="relative h-[100px] w-[100px] mx-auto">
              <div className="absolute inset-0 rounded-full border-[8px] border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-[8px] border-[#00A651]"
                style={{
                  clipPath:
                    "polygon(50% 50%, -50% -50%, 100% -50%, 100% 100%, -50% 100%)",
                  transform: "rotate(-45deg)",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold">67</span>
                  <p className="text-xs text-gray-800">mph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Living Room AC Control */}
      <Card className="absolute left-[1%] z-[99] top-[30%] w-[280px] transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl">
        <div className="p-6">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            Living Room AC{" "}
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </h3>
          <div className="relative my-8 flex items-center justify-center">
            <div className="relative h-[200px] w-[200px]">
              <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-light text-blue-500">
                    22.2
                  </span>
                  <span className="text-2xl">°C</span>
                  <p className="mt-1 text-xs text-gray-400">Past 24h</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant="default"
                className="bg-blue-500 hover:bg-blue-600"
              >
                Auto
              </Button>
              <Button variant="outline">Low</Button>
              <Button variant="outline">Med</Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-20">
                <Power className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-20">
                <Thermometer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {/* Greenhouse Metrics */}
      <Card className="absolute right-[1%] top-[10%] w-[600px] transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium">Greenhouse Lettuces</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <MetricCard
              title="Temperature"
              value="24.00°C"
              subValue="75.20°F"
              icon={<Thermometer />}
              color="bg-green-500"
            />
            <MetricCard
              title="Humidity"
              value="73.60 %"
              icon={<Droplets />}
              color="bg-blue-500"
            />
            <MetricCard
              title="Fan 1"
              value="80.00 RPM"
              icon={<Wind />}
              color="bg-gray-700"
            />
            <MetricCard
              title="Lamp 1"
              value="ON / OFF"
              icon={<Lightbulb />}
              color="bg-gray-700"
            />
          </div>
        </div>
      </Card>
      {/* Temperature and Humidity Cards */}
      <div className="absolute bottom-[20%] left-[30%] flex gap-4">
        <Card className="transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl bg-white z-[99]">
          <div className="p-6">
            <h3 className="text-xl font-medium">Temperature</h3>
            <div className="mt-2 text-4xl font-bold">29.4 °F</div>
          </div>
        </Card>
        <Card className="transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl bg-white z-[99]">
          <div className="p-6">
            <h3 className="text-xl font-medium">Humidity</h3>
            <div className="mt-2 text-4xl font-bold">45 %</div>
          </div>
        </Card>
      </div>
      {/* Charts */}
      <Card className="absolute right-[5%] bottom-[30%] z-[999] w-[300px] transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Growth Metrics</h3>
            <BarChart3 className="h-5 w-5 text-gray-800" />
          </div>
          <div className="mt-4 h-[100px] w-full">
            <div className="flex h-full items-end gap-1">
              {[30, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((height, i) => (
                <div
                  key={i}
                  className="w-full bg-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      {/* Dashboard Floating */}
      <FloatingDashboard /> 
    </div>
  );
}

function MetricCard({
  title,
  value,
  subValue,
  icon,
  color,
}: {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-gray-800 p-4 text-white ">
      <div className="flex items-center justify-between">
        <span className="text-sm">{title}</span>
        <div className={`rounded-full ${color} p-2`}>{icon}</div>
      </div>
      <div className="mt-2">
        <div className="text-lg font-medium">{value}</div>
        {subValue && <div className="text-sm text-gray-400">{subValue}</div>}
      </div>
    </div>
  );
}