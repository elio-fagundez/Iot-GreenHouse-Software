"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DashboardPage from "../dashboard";
import { useGreenhouse } from '../../GreenhouseContext';

async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data[0]);
}

async function fetchAllData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.reduce((max: { id: number; }, item: { id: number; }) => (item.id > max.id ? item : max), data);
}

const Dashboard = () => {
  const [error, setError] = useState<Error | null>(null);
  const { selectedGreenhouse } = useGreenhouse();

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

  const [filteredData, setFilteredData] = useState<InitialData>({} as InitialData);




  useEffect(() => {

    const fetchDataAsync = async () => {
      try {
        const greenhouseId = (selectedGreenhouse as any)?.value || 1;
        const temperature = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures/${greenhouseId}`);
        const humidity = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities/${greenhouseId}`);
        const brightness = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/luminosity/${greenhouseId}`);
        const soilHumidities = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities/${greenhouseId}`);
        const co2 = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/co2/${greenhouseId}`);
        const fan1 = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/fan1/${greenhouseId}`);
        const lamp1 = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/lamp1/${greenhouseId}`);
        const pump1 = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/pump1/${greenhouseId}`);
        const heater1 = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/heater1/${greenhouseId}`);
        const dataAllTemperatures = await fetchAllData(`${process.env.NEXT_PUBLIC_API_URL}/api/temperatures/${greenhouseId}`);
        const dataAllHumidities = await fetchAllData(`${process.env.NEXT_PUBLIC_API_URL}/api/humidities/${greenhouseId}`);
        const dataAllBrightness = await fetchAllData(`${process.env.NEXT_PUBLIC_API_URL}/api/luminosity/${greenhouseId}`);
        const dataAllSoilHumidities = await fetchAllData(`${process.env.NEXT_PUBLIC_API_URL}/api/soilhumidities/${greenhouseId}`);


        const newData = {
          temperature,
          humidity,
          brightness,
          soilHumidities,
          co2,
          fan1,
          lamp1,
          pump1,
          heater1,
          dataAllTemperatures,
          dataAllHumidities,
          dataAllBrightness,
          dataAllSoilHumidities
        };


        setFilteredData(newData);

      } catch (error) {
        console.log('Error:', error);
        toast.error("Error fetching data");
        setError(error as Error);
      }
    };


    fetchDataAsync();
  }, [selectedGreenhouse]);



  if (!filteredData) {
    return <div>Loading...</div>;
  } else {
    return <DashboardPage initialData={filteredData} />;
  }



};

export default Dashboard;