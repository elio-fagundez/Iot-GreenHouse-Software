"use client";

import { use, useEffect, useState } from "react";
import { CardSummary } from "./components/CardSummary";
import { Zap, Fuel, Thermometer, Droplet, SunDim, Sprout, Heater, Lightbulb, Fan, Droplets } from "lucide-react";
import SalesDistributors from "./components/TemperatureGraphics/TemperatureGraphics";
import { GreenHouseImage } from "./components/GreenHouseImage";
import HumidityGraphics from "./components/HumidityGraphics/HumidityGraphics";
import BrightnessGraphics from "./components/BrightnessGraphics/BrightnessGraphics";
import SoilHumiditiesGraphics from "./components/SoilHumiditiesGraphics/SoilHumiditiesGraphics";
import Link from "next/link";
import { toast} from 'react-toastify';


export default function Home() {
  const [dataTemperature, setDataTemperature] = useState([]);
  const [dataHumidity, setDataHumidity] = useState([]);
  const [dataBrightness, setDataBrightness] = useState([]);
  const [dataSoilHumidities, setDataSoilHumidities] = useState([]);
  const [dataCo2, setDataCo2] = useState([]);
  const [dataPh, setDataPh] = useState([]);
  const [dataFan1, setDataFan1] = useState([]);
  const [dataLamp1, setDataLamp1] = useState([]);
  const [dataPump1, setDataPump1] = useState([]);
  const [dataHeater1, setDataHeater1] = useState([]);
  const [allTemperatures, setDataAllTemperatures] = useState([]);
  const [allHumidities, setDataAllHumidities] = useState([]);
  const [allSoilHumidities, setDataAllSoilHumidities] = useState([]);
  const [allBrightness, setDataAllBrightness] = useState([]);

  useEffect(() => {
    const fetchDataTemperature = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataTemperature(mostRecentData);

      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching temperature data");
      }
    };

    const fetchDataHumidity = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataHumidity(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching humidity data");
      }
    };

    const fetchDataBrightness = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/luminosity`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataBrightness(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching luminosity data");

      }
    };

    const fetchDataSoilhumidities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataSoilHumidities(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching soil humidity data");
      }
    };

    const fetchDataCo2 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/co2`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataCo2(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching CO2 data");
      }
    };

    
    const fetchDataPh= async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ph`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataPh(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching PH data");
      }
    };

    const fetchDataFan1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fan1`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataFan1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching fan data");
      }
    };

    const fetchDataLamp1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lamp1`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataLamp1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching lamp data");
      }
    };

    const fetchDataPump1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pump1`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataPump1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching pump data");
      }
    };

    const fetchDataHeater1 = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/heater1`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const mostRecentData = data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
        setDataHeater1(mostRecentData);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
        toast.error("Error fetching heater data");
      }
    };

    const fetchDataAllTemperatures = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDataAllTemperatures(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
        toast.error("Error fetching all temperatures data");
      }
    };

    const fetchDataAllHumidities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDataAllHumidities(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
        toast.error("Error fetching all humidities data");
      }
    };

    const fetchDataAllBrightness = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/luminosity`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDataAllBrightness(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
        toast.error("Error fetching all brightness data");
      }
    };

    const fetchDataAllSoilHumidities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDataAllSoilHumidities(data);
      } catch (error) {
        console.error("Error fetching graphics data:", error);
        toast.error("Error fetching all soil humidities data");
      }
    };

    fetchDataTemperature();
    fetchDataHumidity();
    fetchDataBrightness();
    fetchDataSoilhumidities();
    fetchDataCo2();
    fetchDataPh();
    fetchDataFan1();
    fetchDataLamp1();
    fetchDataPump1();
    fetchDataHeater1();
    fetchDataAllTemperatures();
    fetchDataAllHumidities();
    fetchDataAllSoilHumidities();
    fetchDataAllBrightness();
  }, [[dataTemperature, dataHumidity, dataBrightness, dataSoilHumidities, dataCo2, dataFan1, dataLamp1, dataPump1, dataHeater1, allTemperatures, allHumidities, allSoilHumidities, allBrightness]]);

 


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-4  min-h-[400px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 h-24">
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

          {dataPh && (
            <Link href="/ph">
              <CardSummary
                icon={Droplets}
                total={(dataPh as any).value}
                title="PH"
                tooltipText="Show PH"
              />
            </Link>
          )}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-24">
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

        <div className="col-span-1  max-h-80 lg:flex">
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
          <HumidityGraphics data={allBrightness} title="Luminosity" />

        </div>
        <div className="col-span-2 flex  flex-col">          
          <HumidityGraphics data={allSoilHumidities} title="Soil Humidities" />
        </div>
      </div>
    </div>
  );
}