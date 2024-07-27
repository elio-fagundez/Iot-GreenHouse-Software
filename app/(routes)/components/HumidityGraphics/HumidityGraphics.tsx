import React from 'react'
import { GraphicSuscribers } from '../GraphicSuscribers'

interface HumidityGraphicsProps {
    data: any[];
    title: string;
}

export default function HumidityGraphics({ data, title }: HumidityGraphicsProps) {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <GraphicSuscribers data={data} title={title} fill="url(#colorEv)" />
        </div>
    )
}