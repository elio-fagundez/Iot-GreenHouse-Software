import React, { useState } from 'react'
import { CardSummaryProps } from './CardSummary.types'
import { CustomIcon } from '@/components/CustomIcon/CustomIcon'
import { CustomTooltip } from '@/components/CustomTooltip'
import Switch from 'react-switch'

export function CardSummary(props: CardSummaryProps) {
    const { icon: Icon, title, total, tooltipText } = props

    const [isSwitchOn, setIsSwitchOn] = useState(parseFloat(total) === 1);

    const convertToFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32

    const displayValue = title === 'Temperature'
        ? `${parseFloat(total)?.toFixed(2)}°C / ${convertToFahrenheit(parseFloat(total))?.toFixed(2)}°F`
        : parseFloat(total)?.toFixed(2);

    const handleSwitchChange = async (checked: boolean) => {
        const status = checked ? 'ON' : 'OFF';
        setIsSwitchOn(checked);
        try {
            await fetch('http://localhost:5000/api/commands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: status }),
            });
        } catch (error) {
            console.error('Error updating device status:', error);
        }
    };

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
                        <Switch
                            onChange={handleSwitchChange}
                            checked={isSwitchOn}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                        />
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