"use client";
import {
  Zap,
  Fuel,
  Droplet,
  SunMedium,
  Sprout,
  Heater,
  Lightbulb,
  Fan,
  Thermometer,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import { CardSummary } from "../../components/CardSummary";
import HumidityGraphics from "../../components/HumidityGraphics/HumidityGraphics";
import { useGreenhouse } from "@/app/GreenhouseContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { CardSummaryAct } from "@/components/CardSummary/CardSummaryAct";

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

export default function DashboardPage({
  initialData,
}: {
  initialData: InitialData;
}) {
  const { selectedGreenhouse } = useGreenhouse();
  const { user, loading } = useAuth();

  const dataTemperature = initialData.temperature;
  const dataHumidity = initialData.humidity;
  const dataBrightness = initialData.brightness;
  const dataSoilHumidities = initialData.soilHumidities;
  const dataCo2 = initialData.co2;

  const dataAllTemperatures = initialData.dataAllTemperatures;
  const dataAllHumidities = initialData.dataAllHumidities;
  const dataAllBrightness = initialData.dataAllBrightness;
  const dataAllSoilHumidities = initialData.dataAllSoilHumidities;

  const objActuators = {
    Fan1: initialData.fan1?.value ?? "0",
    Lamp1: initialData.lamp1?.value ?? "0",
    Pump1: initialData.pump1?.value ?? "0",
    Heater1: initialData.heater1?.value ?? "0",
    Relay1: initialData.relay1?.value ?? "0",
    Relay2: initialData.relay2?.value ?? "0",
  };

  const [temperatureData, setTemperatureData] = useState(dataTemperature);

  // 1. Estado centralizado para todos los actuadores
  const [actuatorStates, setActuatorStates] = useState(objActuators);

  // 2. Función para manejar el cambio de estado y la llamada a la API
  const handleActuatorChange = async (id: string, value: "0" | "1") => {
    const previousStates = { ...actuatorStates };
    // Actualización optimista: la UI cambia inmediatamente
    const newStates = { ...actuatorStates, [id]: value };
    setActuatorStates(newStates);

    // Llamada a la API con el objeto de actuadores completo
    try {
      const response = await fetch("http://localhost:5000/api/commands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceId: "Greenhouse-01", // Esto debería ser dinámico, ej: selectedGreenhouse.id
          actuators: newStates,
          crop: "",
        }),
      });

      if (!response.ok) {
        // Si la API falla, revertimos el cambio en la UI
        console.error("Failed to update actuator state on the server.");
        setActuatorStates(previousStates);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setActuatorStates(previousStates); // Revertir también en caso de error de red
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperatureData(dataTemperature);
    }, 1000);

    return () => clearInterval(interval);
  }, [dataTemperature]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActuatorStates(objActuators);
    }, 1000);
    return () => clearInterval(interval);
  }, [objActuators]);

  if (loading) return <div>Cargando...</div>;

  // Mostrar mensaje si no hay usuario autenticado
  if (!user) return <div className="text-center text-red-500 mt-10">No autenticado. Inicia sesión para ver el dashboard.</div>;

  return (
    <div>
      <div>
        <div className="flex">
          <h2 className="text-[24px] border-green-400 border-b-2">
            {selectedGreenhouse && (selectedGreenhouse as any)?.label}
          </h2>
          <div className="ml-auto text-right">
            <p className="text-sm text-muted-foreground">Bienvenido, {user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="grid">
          <div className="py-4 ">
            <div
              id="ww_7089627146cab"
            >
              More forecasts:{" "}
              <a
                href="https://oneweather.org/orlando/30_days/"
                id="ww_7089627146cab_u"
                target="_blank"
              >
                30 day forecast Orlando
              </a>
            </div>
            <script
              async
              src="https://app3.weatherwidget.org/js/?id=ww_7089627146cab"
            ></script>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-x-3  min-h-[400px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 h-full">
            <div className="col-span-2 flex justify-center text-2xl">
              Sensors
            </div>

            <Link href="dashboard/temperatures">
              <CardSummary
                icon={Thermometer}
                total={temperatureData?.value ?? 0}
                title="Temperature"
                tooltipText="Show Temperature"
              />
            </Link>

            <Link href="dashboard/humidities">
              <CardSummary
                icon={Droplet}
                total={(dataHumidity as any)?.value ?? 0}
                title="Humidity"
                tooltipText="Show Humidity"
              />
            </Link>

            <Link href="dashboard/brightnesses">
              <CardSummary
                icon={SunMedium}
                total={(dataBrightness as any)?.value ?? 0}
                title="Luminosity"
                tooltipText="Show Luminosity"
              />
            </Link>

            <Link href="dashboard/soilhumidities">
              <CardSummary
                icon={Sprout}
                total={(dataSoilHumidities as any)?.value ?? 0}
                title="Soil Humidity"
                tooltipText="Show Soil Humidity"
              />
            </Link>

            <Link href="dashboard/co2">
              <CardSummary
                icon={Fuel}
                total={(dataCo2 as any)?.value ?? 0}
                title="CO2"
                tooltipText="Show CO2"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-full lg:h-[50px]">
            <div className="col-span-2 flex justify-center text-2xl">
              Actuators
            </div>
            <CardSummaryAct
              icon={Fan}
              total={actuatorStates.Fan1}
              title="Fan 1"
              tooltipText="Show Fan 1"
              onStateChange={handleActuatorChange}
            />

            <CardSummaryAct
              icon={Lightbulb}
              total={actuatorStates.Lamp1}
              title="Lamp 1"
              tooltipText="Show Lamp 1"
              onStateChange={handleActuatorChange}
            />

            <CardSummaryAct
              icon={Droplets}
              total={actuatorStates.Pump1}
              title="Pump 1"
              tooltipText="Show Pump 1"
              onStateChange={handleActuatorChange}
            />

            <CardSummaryAct
              icon={Heater}
              total={actuatorStates.Heater1}
              title="Heater 1"
              tooltipText="Show Heater 1"
              onStateChange={handleActuatorChange}
            />

            <CardSummaryAct
              icon={Zap}
              total={actuatorStates.Relay1}
              title="Relay 1"
              tooltipText="Show Relay 1"
              onStateChange={handleActuatorChange}
            />

            <CardSummaryAct
              icon={Zap}
              total={actuatorStates.Relay2}
              title="Relay 2"
              tooltipText="Show Relay 2"
              onStateChange={handleActuatorChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 md:gap-x-2 mt-12">
          <div className="col-span-4 flex justify-center text-2xl">
            Flow Charts
          </div>
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
            <HumidityGraphics
              data={dataAllSoilHumidities}
              title="Soil Humidities"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
