'use client'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface GraphicLineProps {
    data: any[];
    title: string;
    fill?: string;
    label: string;
}

export function GraphicLine({ data, title, fill, label }: GraphicLineProps) {
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
            "This Month": item.value,
            "Previous Month": previousMonthData ? previousMonthData.value : 0,
            date: currentDate.getDate(),
        };
    });

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const chartData = {
        labels: transformedData.map(d => `${d.day} ${monthNames[d.month - 1]}`),
        datasets: [
            {
                label: label,
                data: transformedData.map(d => d["This Month"]),
                borderColor: '#98bb12',
                backgroundColor: fill ? fill : 'rgba(152, 187, 18, 0.5)',
                fill: true,
            },
            {
                label: 'Previous ' + label,
                data: transformedData.map(d => d["Previous Month"]),
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