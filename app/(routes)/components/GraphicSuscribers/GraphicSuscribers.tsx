'use client'
import { TrendingUp, X } from "lucide-react";
import {
    Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

interface GraphicSuscribersProps {
    data: any[];
    title: string;
}

export function GraphicSuscribers({ data, title }: GraphicSuscribersProps) {
    const transformedData = data.map(item => ({
        year: new Date(item.createdAt).getFullYear(),
        newCustomers: item.value,
        oldCustomers: item.value 
    }));


    return (
        <div className="mt-2">
            <p className="text-3xl mb-3">{title}</p>
        
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={transformedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#887CFD" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#887CFD" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="newCustomers" stroke="#887CFD" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="oldCustomers" stroke="#82CA9D" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}