import React from 'react'
import { CardSummaryProps } from './CardSummary.types'
import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { CustomTooltip } from '@/components/CustomTooltip'

export function CardSummary(props: CardSummaryProps) {
    const { icon: Icon, title, total, tooltipText } = props


    const convertToFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32

    const displayValue = title === 'Temperature'
    ? `${parseFloat(total)?.toFixed(2)}°C / ${convertToFahrenheit(parseFloat(total))?.toFixed(2)}°F`
    : parseFloat(total)?.toFixed(2);

    return (
        <div
        className={`shadow-sm rounded-lg h-32 p-5 py-3 hover:shadow-lg transition text-white cursor-pointer ${
            title === 'Temperature' 
              ? (parseFloat(total) > 25 ? 'bg-red-500' : 'bg-green-500') 
              : title === 'Luminosity' 
              ? (parseFloat(total) > 1000 ? 'bg-yellow-600' : parseFloat(total) <= 25 ? 'bg-black' : 'bg-blue-900') 
              : 'bg-[#3a414a]'
          }`}
        >
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
                            {parseFloat(total) === 1 ? <strong>ON</strong> : 'ON'} / {parseFloat(total) === 0 ? <strong>OFF</strong> : 'OFF'}
                        </span>
                    ) : displayValue}
                    {title === 'Humidity' && <span className="text-2xl pl-2">%</span>}
                    {title === 'Luminosity' && <span className="text-2xl pl-2">Lux</span>}
                    {title === 'Soil Humidity' && <span className="text-2xl pl-2">%</span>}
                    {title === 'CO2' && <span className="text-2xl pl-2">PPM</span>}
                    {title === 'Fan 1' && <span className="text-2xl pl-2">RPM</span>}


                </p>


            </div>

        </div>
    )
}

