import React from 'react'
import { CardSummaryProps } from './CardSummary.types'
import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { CustomTooltip } from '@/components/CustomTooltip'

export function CardSummary(props: CardSummaryProps) {
    const {icon: Icon, title, total, tooltipText } = props
    return (
        <div className='shadow-sm bg-[#3a414a] rounded-lg h-32 p-5 py-3 hover:shadow-lg transition text-white'>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {title}
                </div>
                <CustomTooltip content={tooltipText} />
                <CustomIcon icon={Icon} />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className='text-2xl'>{total}</p>
             
            </div>

        </div>
    )
}

