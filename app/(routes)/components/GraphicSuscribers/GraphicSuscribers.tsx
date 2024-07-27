'use client'
import { TrendingUp, X } from "lucide-react";
import {
    Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

interface GraphicSuscribersProps {
    data: any[];
    title: string;
    fill?: string;
}

export function GraphicSuscribers({ data, title, fill }: GraphicSuscribersProps) {
    const transformedData = data.map(item => {
        const currentDate = new Date(item.createdAt);
        const previousMonthDate = new Date(currentDate);
        previousMonthDate.setMonth(currentDate.getMonth() - 1);

        const previousMonthData = data.find(d => {
            const dDate = new Date(d.createdAt);
            return dDate.getFullYear() === previousMonthDate.getFullYear() &&
                   dDate.getMonth() === previousMonthDate.getMonth() &&
                   dDate.getDate() === previousMonthDate.getDate();
        });

        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1, 
            day: currentDate.getDate(),
            Temperature: item.value,
            "Previous Temperature": previousMonthData ? previousMonthData.value : 0,
            date: currentDate.getDate(),
        };
    });

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

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
                                <stop offset="5%" stopColor="#98bb12" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#215700" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorEv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ccecea" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month"     tickFormatter={(month) => monthNames[month - 1]} 
 />
                        <YAxis />
                        <Tooltip />
                        
                        <Area type="monotone" dataKey="Temperature" stroke="#98bb12" fillOpacity={1} fill={fill ? fill : "url(#colorUv)"} />
                        <Area type="monotone" dataKey="Previous Temperature" stroke="#82CA9D" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}