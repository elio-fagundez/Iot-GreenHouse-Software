import React from 'react'
import { CardSummaryProps } from './CardSummary.types'
import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { CustomTooltip } from '@/components/CustomTooltip'
import { MoveDownRight, MoveUpRight, TrendingUp } from 'lucide-react'

export function CardSummary(props: CardSummaryProps) {
    const { average, icon: Icon, title, total, tooltipText } = props
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
                <div className={(`flex items-center gap-1 px-2 text-xs text-black rounded-lg h-[20px] bg-green-200 dark:bg-secondary`)}>
                    {average} %

                    {average < 20 && (
                        <MoveDownRight strokeWidth={2} className='w-3 h-3' />
                    )}

                    {average > 20 && average < 70 && (
                        <MoveUpRight strokeWidth={2} className='w-3 h-3' />
                    )}


                    {average > 70 && average < 100 && (
                        <TrendingUp strokeWidth={2} className='w-3 h-3' />
                    )}
                </div>
            </div>

        </div>
    )
}

