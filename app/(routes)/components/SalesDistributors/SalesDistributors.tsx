import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { BarChart } from 'lucide-react'
import React from 'react'
import { GraphicSuscribers } from '../GraphicSuscribers'

interface SalesDistributorsProps {
    data: any[];
    title: string;
}

export default function SalesDistributors({ data, title }: SalesDistributorsProps) {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <GraphicSuscribers data={data} title={title} />
        </div>
    )
}