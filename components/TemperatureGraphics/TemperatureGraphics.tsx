import React from 'react'
import { GraphicSuscribers } from '../GraphicSuscribers';

interface TemperatureGraphicsProps {
    data: any[];
    title: string;
}

export default function TemperatureGraphics({ data, title }: TemperatureGraphicsProps) {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <GraphicSuscribers data={data} title={title} />
        </div>
    )
}