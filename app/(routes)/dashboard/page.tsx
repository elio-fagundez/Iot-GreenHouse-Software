"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardPage from "../dashboard";
import { useGreenhouse } from "../../GreenhouseContext";

async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.reduce(
    (max: { id: number }, item: { id: number }) =>
      item.id > max.id ? item : max,
    data[0]
  );
}

async function fetchAllData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.reduce(
    (max: { id: number }, item: { id: number }) =>
      item.id > max.id ? item : max,
    data
  );
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
    relay1: any;
    relay2: any;
    dataAllTemperatures: any;
    dataAllHumidities: any;
    dataAllBrightness: any;
    dataAllSoilHumidities: any;
  }

  const [filteredData, setFilteredData] = useState<InitialData>(
    {} as InitialData
  );

  const fetchDataAsync = async () => {
    try {
      const greenhouseId = (selectedGreenhouse as any)?.value || 1;
      const temperature = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/temperatures/${greenhouseId}`
      );
      const humidity = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/humidities/${greenhouseId}`
      );
      const brightness = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/luminosity/${greenhouseId}`
      );
      const soilHumidities = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/soilhumidities/${greenhouseId}`
      );
      const co2 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/co2/${greenhouseId}`
      );
      const fan1 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/fan1/${greenhouseId}`
      );
      const lamp1 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/lamp1/${greenhouseId}`
      );
      const pump1 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/pump1/${greenhouseId}`
      );
      const heater1 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/heater1/${greenhouseId}`
      );
      const relay1 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/relay1/${greenhouseId}`
      );
      const relay2 = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/relay2/${greenhouseId}`
      );
      const dataAllTemperatures = await fetchAllData(
        `${process.env.NEXT_PUBLIC_API_URL}/temperatures/${greenhouseId}`
      );
      const dataAllHumidities = await fetchAllData(
        `${process.env.NEXT_PUBLIC_API_URL}/humidities/${greenhouseId}`
      );
      const dataAllBrightness = await fetchAllData(
        `${process.env.NEXT_PUBLIC_API_URL}/luminosity/${greenhouseId}`
      );
      const dataAllSoilHumidities = await fetchAllData(
        `${process.env.NEXT_PUBLIC_API_URL}/soilhumidities/${greenhouseId}`
      );

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
        relay1,
        relay2,
        dataAllTemperatures,
        dataAllHumidities,
        dataAllBrightness,
        dataAllSoilHumidities,
      };
      setFilteredData(newData);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error fetching data");
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [selectedGreenhouse]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetchDataAsync();
    }, 60000); // 60000 ms = 1 minuto

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  if (!filteredData) {
    return <div>Loading...</div>;
  } else {
    return <DashboardPage initialData={filteredData} />;
  }
};

export default Dashboard;
