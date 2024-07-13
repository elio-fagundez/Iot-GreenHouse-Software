import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { BarChart } from 'lucide-react'
import React from 'react'
import { GraphicSuscribers } from '../GraphicSuscribers'

export default function SalesDistributors() {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 my-2'>
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={BarChart} />
                <p className='text-sm'>Sales Distributor</p>
            </div>
            <GraphicSuscribers />
        </div>
    )
}
