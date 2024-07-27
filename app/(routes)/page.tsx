"use client";

import { useEffect, useState } from "react";
import { CardSummary } from "./components/CardSummary";
import { Zap, Fuel, Thermometer, Droplet, SunDim, Sprout, Heater, Lightbulb, Fan } from "lucide-react";
import SalesDistributors from "./components/TemperatureGraphics/TemperatureGraphics";
import { GreenHouseImage } from "./components/GreenHouseImage";
import HumidityGraphics from "./components/HumidityGraphics/HumidityGraphics";
import BrightnessGraphics from "./components/BrightnessGraphics/BrightnessGraphics";
import SoilHumiditiesGraphics from "./components/SoilHumiditiesGraphics/SoilHumiditiesGraphics";

export default function Home() {
  const [dataTemperature, setDataTemperature] = useState([]);
  const [dataHumidity, setDataHumidity] = useState([]);
  const [dataBrightness, setDataBrightness] = useState([]);
  const [dataSoilHumidities, setDataSoilHumidities] = useState([]);
  const [dataCo2, setDataCo2] = useState([]);
  const [dataFan1, setDataFan1] = useState([]);
  const [dataLamp1, setDataLamp1] = useState([]);
  const [dataPump1, setDataPump1] = useState([]);
  const [dataHeater1, setDataHeater1] = useState([]);
  const [allTemperatures, setDataAllTemperatures] = useState([]);
  const [allHumidities, setDataAllHumidities] = useState([]);
  const [allSoilHumidities, setDataAllSoilHumidities] = useState([]);
  const [allBrightness, setDataAllBrightness] = useState([]);


  useEffect(() => {
    const fetchDataTemperature= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataTemperature(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataHumidity= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataHumidity(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataBrightness= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brightnesses`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataBrightness(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataSoilhumidities= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataSoilHumidities(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataCo2= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/co2`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataCo2(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataFan1= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fan1`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataFan1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataLamp1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lamp1`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataLamp1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };
    
    const fetchDataPump1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pump1`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataPump1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };
    
    const fetchDataHeater1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/heater1`);
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataHeater1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    const fetchDataAllTemperatures = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures`);
        const data = await response.json();
        setDataAllTemperatures(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
      }
    };

    const fetchDataAllHumidities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities`);
        const data = await response.json();
        setDataAllHumidities(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
      }
    };

    const fetchDataAllBrightness = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brightnesses`);
        const data = await response.json();
        setDataAllBrightness(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
      }
    };

    const fetchDataAllSoilHumidities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities`);
        const data = await response.json();
        setDataAllSoilHumidities(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
      }
    };

    


    fetchDataTemperature();
    fetchDataHumidity();
    fetchDataBrightness();
    fetchDataSoilhumidities();
    fetchDataCo2();


    fetchDataFan1();
    fetchDataLamp1();
    fetchDataPump1();
    fetchDataHeater1();

    fetchDataAllTemperatures();
    fetchDataAllHumidities();
    fetchDataAllSoilHumidities();
    fetchDataAllBrightness();

  }, []);

  const cardDataActuators = [
    {
      icon: Fan,
      total: "80 RPM",
      title: "FAN 1",
      tooltipText: "Tooltip 1",
    },
    {
      icon: Lightbulb,
      total: "ON / OFF",
      title: "LAMP 1",
      tooltipText: "ON / OFF",
    },
    {
      icon: Zap,
      total: "ON / OFF",
      title: "PUMP 1",
      tooltipText: "Tooltip 2",
    },
    {
      icon: Heater,
      total: "ON / OFF",
      title: "HEATER 1",
      tooltipText: "ON / OFF",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-4  min-h-[400px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 h-24">
          <div className="col-span-2 flex justify-center text-2xl">Sensors</div>
          {dataTemperature && (
            <CardSummary
              icon={Fan}
              total={(dataTemperature as any).value}
              title="Temperature"
              tooltipText="Show Temperature"
            />
          )}

          {dataHumidity && (
            <CardSummary
              icon={Droplet}
              total={(dataHumidity as any).value}
              title="Humidity"
              tooltipText="Show Humidity"
            />
          )}

          {dataBrightness && (
            <CardSummary
              icon={SunDim}
              total={(dataBrightness as any).value}
              title="Brightness"
              tooltipText="Show Brightness"
            />
          )}

          {dataSoilHumidities && (
            <CardSummary
              icon={Sprout}
              total={(dataSoilHumidities as any).value}
              title="Soil Humidity"
              tooltipText="Show Soil Humidity"
            />
          )}

          {dataCo2 && (
            <CardSummary
              icon={Fuel}
              total={(dataCo2 as any).value}
              title="CO2"
              tooltipText="Show CO2"
            />
          )}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-24">
          <div className="col-span-2 flex justify-center text-2xl">Actuators</div>
          {dataFan1 && (
            <CardSummary
              icon={Fan}
              total={(dataFan1 as any).value}
              title="Fan 1"
              tooltipText="Show Fan 1"
            />
          )}

          {dataLamp1 && (
            <CardSummary
              icon={Lightbulb}
              total={(dataLamp1 as any).value}
              title="Lamp 1"
              tooltipText="Show Lamp 1"
            />
          )}

          {dataPump1 && (
            <CardSummary
              icon={Zap}
              total={(dataPump1 as any).value}
              title="Pump 1"
              tooltipText="Show Pump 1"
            />
          )}

          {dataHeater1 && (
            <CardSummary
              icon={Heater}
              total={(dataHeater1 as any).value}
              title="Heater 1"
              tooltipText="Show Heater 1"
            />
          )}
        </div>

        <div className="col-span-1  max-h-80">
          <div className="col-span-2 flex justify-center text-2xl">GPS Information</div>
          <GreenHouseImage />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 md:gap-x-2 mt-12">
        <div className="col-span-4 flex justify-center text-2xl">Flow Charts</div>
        <div className="col-span-2 flex flex-col">
        <SalesDistributors data={allTemperatures} title="Temperature" />
        </div>
        <div className="col-span-2 flex  flex-col">
        <HumidityGraphics data={allHumidities} title="Humidity" />
        </div>
        <div className="col-span-2 flex  flex-col">
        <BrightnessGraphics data={allBrightness} title="Brightness" />
        </div>
        <div className="col-span-2 flex  flex-col">
        <SoilHumiditiesGraphics data={allSoilHumidities} title="Soil Humidities" />
        </div>
      </div>
    </div>
  );
}