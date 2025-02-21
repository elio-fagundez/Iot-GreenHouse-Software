'use client'
import React, { useState } from 'react';
import {
    Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

interface GraphicSuscribersProps {
    data: any[];
    title: string;
    fill?: string;
}

export function GraphicSuscribers({ data, title, fill }: GraphicSuscribersProps) {
    const [days, setDays] = useState(30);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDays(Number(event.target.value));
        setSelectedDate(null); // Reset selected date when days are changed
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setDays(0); // Reset days when a specific date is selected
    };

    const normalizeDate = (date: Date) => {
        const normalized = new Date(date);
        normalized.setUTCHours(0, 0, 0, 0);
        return normalized;
    };

    const filteredData = (data || []).filter(item => {
        const currentDate = new Date();
        const itemDate = normalizeDate(new Date(item.createdAt));
        if (selectedDate) {
            const selected = normalizeDate(new Date(selectedDate));
            return itemDate.getTime() === selected.getTime();
        } else {
            const diffTime = Math.abs(currentDate.getTime() - itemDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= days;
        }
    });
    console.log("filteredData:", filteredData);

    const transformedData = filteredData.map(item => {
        const date = new Date(item.createdAt);
        console.log("Date:", date);
        return {
            date: date.toLocaleDateString('en-US'),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            Temperature: item.value,
        };
    }).reverse(); // Invertir el orden de los datos

    return (
        <div className="mt-2 h-[500px] lg:h-auto">
            <p className="text-3xl mb-3">{title}</p>
            <div className="mb-4">
                <label htmlFor="days" className="mr-2">Select days:</label>
                <select id="days" value={days} onChange={handleDaysChange} className='bg-white'>
                    <option value={7}>7 days</option>
                    <option value={15}>15 days</option>
                    <option value={30}>30 days</option>
                </select>
                <label htmlFor="date" className="ml-4 mr-2">Or select a date:</label>
                <input type="date" className='bg-white'  id="date" value={selectedDate || ''} onChange={handleDateChange} />
            </div>
            {transformedData && transformedData.length > 0 ? (
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
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            
                            <Area type="monotone" dataKey="Temperature" stroke="#98bb12" fillOpacity={1} fill={fill ? fill : "url(#colorUv)"} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>No data available for the selected range.</p>
            )}
        </div>
    )
}