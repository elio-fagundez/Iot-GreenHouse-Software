import React from 'react'
import { GraphicLinePoint } from '../GraphicLinePoint';

interface SoilHumiditiesGraphicsProps {
    data: any[];
    title: string;
}

export default function SoilHumiditiesGraphics({ data, title }: SoilHumiditiesGraphicsProps) {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <GraphicLinePoint data={data} title={title} fill="url(#colorEv)" label='Soil Humidities' />
        </div>
    )
}