"use client";
import { Zap, Fuel, Droplet, SunDim, Sprout, Heater, Lightbulb, Fan } from "lucide-react";
import Link from "next/link";
import { CardSummary } from "./components/CardSummary";
import { GreenHouseImage } from "./components/GreenHouseImage";
import HumidityGraphics from "./components/HumidityGraphics/HumidityGraphics";
import { useGreenhouse } from '@/app/GreenhouseContext';
import { useEffect, useState } from "react";
import axios from 'axios';

interface InitialData {
    temperature: any;
    humidity: any;
    brightness: any;
    soilHumidities: any;
    co2: any;
    fan1: any;
    lamp1: any;
    pump1: any;
    heater1: any;
    dataAllTemperatures: any;
    dataAllHumidities: any;
    dataAllBrightness: any;
    dataAllSoilHumidities: any;
}

export default function DashboardPage({ initialData }: { initialData: InitialData }) {

    console.log("initialData 2", initialData);
    const { selectedGreenhouse } = useGreenhouse();


    const dataTemperature = initialData.temperature;
    const dataHumidity = initialData.humidity;
    const dataBrightness = initialData.brightness;
    const dataSoilHumidities = initialData.soilHumidities;
    const dataCo2 = initialData.co2;
    const dataFan1 = initialData.fan1;
    const dataLamp1 = initialData.lamp1;
    const dataPump1 = initialData.pump1;
    const dataHeater1 = initialData.heater1;

    const dataAllTemperatures = initialData.dataAllTemperatures;
    const dataAllHumidities = initialData.dataAllHumidities;
    const dataAllBrightness = initialData.dataAllBrightness;
    const dataAllSoilHumidities = initialData.dataAllSoilHumidities;

 

    return (
        <div>
            <div>
                <div className="flex">
                    <h2 className="text-[24px] border-green-400 border-b-2">{selectedGreenhouse && (selectedGreenhouse as any)?.label}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-4  min-h-[400px] ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 h-full">

                        <div className="col-span-2 flex justify-center text-2xl">Sensors</div>
                        {dataTemperature && (
                            <Link href="/temperatures">

                                <CardSummary
                                    icon={Fan}
                                    total={(dataTemperature as any).value}
                                    title="Temperature"
                                    tooltipText="Show Temperature"
                                />

                            </Link>
                        )}

                        {dataHumidity && (
                            <Link href="/humidities">

                                <CardSummary
                                    icon={Droplet}
                                    total={(dataHumidity as any).value}
                                    title="Humidity"
                                    tooltipText="Show Humidity"
                                />
                            </Link>
                        )}

                        {dataBrightness && (
                            <Link href="/brightnesses">

                                <CardSummary
                                    icon={SunDim}
                                    total={(dataBrightness as any).value}
                                    title="Luminosity"
                                    tooltipText="Show Luminosity"
                                />
                            </Link>
                        )}

                        {dataSoilHumidities && (
                            <Link href="/soilhumidities">
                                <CardSummary
                                    icon={Sprout}
                                    total={(dataSoilHumidities as any).value}
                                    title="Soil Humidity"
                                    tooltipText="Show Soil Humidity"
                                />
                            </Link>
                        )}

                        {dataCo2 && (
                            <Link href="/co2">

                                <CardSummary
                                    icon={Fuel}
                                    total={(dataCo2 as any).value}
                                    title="CO2"
                                    tooltipText="Show CO2"
                                />
                            </Link>
                        )}

                       
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-full lg:h-[50px]">
                        <div className="col-span-2 flex justify-center text-2xl">Actuators</div>
                        {dataFan1 && (
                            <Link href="/fan1">
                                <CardSummary
                                    icon={Fan}
                                    total={(dataFan1 as any).value}
                                    title="Fan 1"
                                    tooltipText="Show Fan 1"
                                />
                            </Link>
                        )}

                        {dataLamp1 && (
                            <Link href="/lamp1">

                                <CardSummary
                                    icon={Lightbulb}
                                    total={(dataLamp1 as any).value}
                                    title="Lamp 1"
                                    tooltipText="Show Lamp 1"
                                />
                            </Link>
                        )}

                        {dataPump1 && (
                            <Link href="/pump1">

                                <CardSummary
                                    icon={Zap}
                                    total={(dataPump1 as any).value}
                                    title="Pump 1"
                                    tooltipText="Show Pump 1"
                                />
                            </Link>
                        )}

                        {dataHeater1 && (
                            <Link href="/heater1">

                                <CardSummary
                                    icon={Heater}
                                    total={(dataHeater1 as any).value}
                                    title="Heater 1"
                                    tooltipText="Show Heater 1"
                                />
                            </Link>

                        )}
                    </div>

                    <div className="col-span-1  max-h-80 lg:flex lg:flex-col items-center hidden">
                        <div className="col-span-2 flex justify-center text-2xl">GPS Information</div>
                       <GreenHouseImage /> 

                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 md:gap-x-2 mt-12">
                    <div className="col-span-4 flex justify-center text-2xl">Flow Charts</div>
                    <div className="col-span-2 flex flex-col ">
                        <HumidityGraphics data={dataAllTemperatures} title="Temperature" />
                    </div>
                     <div className="col-span-2 flex  flex-col">
                        <HumidityGraphics data={dataAllHumidities} title="Humidity" />
                    </div>
                    <div className="col-span-2 flex  flex-col ">
                        <HumidityGraphics data={dataAllBrightness} title="Luminosity" />

                    </div>
                   <div className="col-span-2 flex  flex-col ">
                        <HumidityGraphics data={dataAllSoilHumidities} title="Soil Humidities" />
                    </div>
                </div> 
            </div>
        </div>
    );
}