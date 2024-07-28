import React from 'react'
import { CardSummaryProps } from './CardSummary.types'
import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { CustomTooltip } from '@/components/CustomTooltip'

export function CardSummary(props: CardSummaryProps) {
    const { icon: Icon, title, total, tooltipText } = props


    const convertToFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32

    const displayValue = title === 'Temperature' ? `${total}°C / ${convertToFahrenheit(total as any)}°F` : total;

    return (
        <div className='shadow-sm bg-[#3a414a] rounded-lg h-32 p-5 py-3 hover:shadow-lg transition text-white cursor-pointer'>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {title}
                </div>
                <CustomTooltip content={tooltipText} />
                <CustomIcon icon={Icon} />
            </div>
            <div className="flex gap-4 mt-2 md:mt-4">
                <p className='text-2xl'>
                    {(title === 'Lamp 1' || title === 'Pump 1' || title === 'Heater 1') ? (
                        <span className="text-2xl pl-2">
                            {total === 1 ? <strong>ON</strong> : 'ON'} / {total === 0 ? <strong>OFF</strong> : 'OFF'}
                        </span>
                    ) : displayValue}
                    {title === 'Humidity' && <span className="text-2xl pl-2">%</span>}
                    {title === 'Brightness' && <span className="text-2xl pl-2">Lux</span>}
                    {title === 'Soil Humidity' && <span className="text-2xl pl-2">%</span>}
                    {title === 'CO2' && <span className="text-2xl pl-2">PPM</span>}
                    {title === 'Fan 1' && <span className="text-2xl pl-2">RPM</span>}


                </p>


            </div>

        </div>
    )
}

