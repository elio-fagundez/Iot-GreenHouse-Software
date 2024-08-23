import React from 'react'
import { GraphicLine } from '../GraphicLine';

interface BrightnessGraphicsProps {
    data: any[];
    title: string;
}

export default function BrightnessGraphics({ data, title }: BrightnessGraphicsProps) {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <GraphicLine data={data} title={title} fill="url(#colorEv)" label='Luminosity' />
        </div>
    )
}