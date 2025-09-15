'use client'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface GraphicLineProps {
    data: any[];
    title: string;
    fill?: string;
    label: string;
}

export function GraphicLine({ data, title, fill, label }: GraphicLineProps) {
    const transformedData = data.map(item => {
        const currentDate = new Date(item.createdAt);
        const previousDayDate = new Date(currentDate);
        previousDayDate.setDate(currentDate.getDate() - 1);

        const previousDayData = data.find(d => {
            const dDate = new Date(d.createdAt);
            return dDate.getFullYear() === previousDayDate.getFullYear() &&
                   dDate.getMonth() === previousDayDate.getMonth() &&
                   dDate.getDate() === previousDayDate.getDate() &&
                   dDate.getHours() === previousDayDate.getHours();
        });

        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1, 
            day: currentDate.getDate(),
            hour: currentDate.getHours(),
            "This Hour": item.value,
            "Previous Hour": previousDayData ? previousDayData.value : 0,
        };
    });

    const chartData = {
        labels: transformedData.map(d => `${d.hour}:00`),
        datasets: [
            {
                label: label,
                data: transformedData.map(d => d["This Hour"]),
                borderColor: '#98bb12',
                backgroundColor: fill ? fill : 'rgba(152, 187, 18, 0.5)',
                fill: true,
            },
            {
                label: 'Previous ' + label,
                data: transformedData.map(d => d["Previous Hour"]),
                borderColor: '#82CA9D',
                backgroundColor: 'rgba(130, 202, 157, 0.5)',
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour'
                }
            }
        }
    };

    return (
        <div className="mt-2">
            <p className="text-3xl mb-3">{title}</p>
            <div className="h-[350px] w-full">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}