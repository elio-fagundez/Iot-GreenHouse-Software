"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import DashboardPage from "../dashboard";
import { useGreenhouse } from "../../GreenhouseContext";

type AnyRecord = Record<string, any>;

interface InitialData {
  temperature: any | null;
  humidity: any | null;
  brightness: any | null;
  soilHumidities: any | null;
  co2: any | null;
  fan1: any | null;
  lamp1: any | null;
  pump1: any | null;
  heater1: any | null;
  relay1: any | null;
  relay2: any | null;
  dataAllTemperatures: any[];
  dataAllHumidities: any[];
  dataAllBrightness: any[];
  dataAllSoilHumidities: any[];
}

function latestById<T extends { id: number }>(arr: T[]): T | null {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr.reduce((max, item) => (item.id > max.id ? item : max), arr[0]);
}

async function fetchJson(url: string, signal?: AbortSignal) {
  const res = await fetch(url, { cache: "no-store", signal });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} @ ${url}`);
  return res.json();
}

const Dashboard = () => {
  const { selectedGreenhouseId } = useGreenhouse();
  const [data, setData] = useState<InitialData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const abortRef = useRef<AbortController | null>(null);

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ""), []);
  const greenhouseId: number = selectedGreenhouseId ?? 1;

  async function load() {
    // Cancelar cualquier solicitud anterior en vuelo
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!apiBase) {
      setError("Falta configurar NEXT_PUBLIC_API_URL");
      toast.error("Falta configurar NEXT_PUBLIC_API_URL en .env.local");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const endpoints = {
      temperatures: `${apiBase}/temperatures/${greenhouseId}`,
      humidities: `${apiBase}/humidities/${greenhouseId}`,
      luminosity: `${apiBase}/luminosity/${greenhouseId}`,
      soilhumidities: `${apiBase}/soilhumidities/${greenhouseId}`,
      co2: `${apiBase}/co2/${greenhouseId}`,
      fan1: `${apiBase}/fan1/${greenhouseId}`,
      lamp1: `${apiBase}/lamp1/${greenhouseId}`,
      pump1: `${apiBase}/pump1/${greenhouseId}`,
      heater1: `${apiBase}/heater1/${greenhouseId}`,
      relay1: `${apiBase}/relay1/${greenhouseId}`,
      relay2: `${apiBase}/relay2/${greenhouseId}`,
    } as const;

    try {
      const results = await Promise.allSettled([
        fetchJson(endpoints.temperatures, controller.signal),
        fetchJson(endpoints.humidities, controller.signal),
        fetchJson(endpoints.luminosity, controller.signal),
        fetchJson(endpoints.soilhumidities, controller.signal),
        fetchJson(endpoints.co2, controller.signal),
        fetchJson(endpoints.fan1, controller.signal),
        fetchJson(endpoints.lamp1, controller.signal),
        fetchJson(endpoints.pump1, controller.signal),
        fetchJson(endpoints.heater1, controller.signal),
        fetchJson(endpoints.relay1, controller.signal),
        fetchJson(endpoints.relay2, controller.signal),
      ]);

      const [
        temperaturesRes,
        humiditiesRes,
        brightnessRes,
        soilRes,
        co2Res,
        fan1Res,
        lamp1Res,
        pump1Res,
        heater1Res,
        relay1Res,
        relay2Res,
      ] = results.map((r) => (r.status === "fulfilled" ? r.value : []));

      // Validar y construir estructura final
      const nextData: InitialData = {
        temperature: latestById(temperaturesRes),
        humidity: latestById(humiditiesRes),
        brightness: latestById(brightnessRes),
        soilHumidities: latestById(soilRes),
        co2: latestById(co2Res),
        fan1: latestById(fan1Res),
        lamp1: latestById(lamp1Res),
        pump1: latestById(pump1Res),
        heater1: latestById(heater1Res),
        relay1: latestById(relay1Res),
        relay2: latestById(relay2Res),
        dataAllTemperatures: Array.isArray(temperaturesRes) ? temperaturesRes : [],
        dataAllHumidities: Array.isArray(humiditiesRes) ? humiditiesRes : [],
        dataAllBrightness: Array.isArray(brightnessRes) ? brightnessRes : [],
        dataAllSoilHumidities: Array.isArray(soilRes) ? soilRes : [],
      };

      setData(nextData);

      // Mostrar avisos específicos si faltan colecciones clave
      const missing: string[] = [];
      if (!nextData.temperature) missing.push("temperatura");
      if (!nextData.humidity) missing.push("humedad");
      if (missing.length) {
        toast.warn(`Sin datos recientes de ${missing.join(", ")}`);
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return; // navegación/refresh
      console.error("[Dashboard] Error cargando datos:", e);
      setError(e?.message || "Error cargando datos");
      toast.error("Error al obtener datos del invernadero");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase, greenhouseId]);

  useEffect(() => {
    const id = setInterval(() => {
      load();
    }, 60_000);
    return () => {
      clearInterval(id);
      abortRef.current?.abort();
    };
  }, []);

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (error && !data) {
    return <div className="text-red-500">{error}</div>;
  }

  // El tipo de DashboardPage puede no declarar props; casteamos para evitar error de tipos aquí.
  const DashboardComp = (DashboardPage as unknown) as (props: { initialData: InitialData }) => JSX.Element;
  return <DashboardComp initialData={data as InitialData} />;
};

export default Dashboard;
