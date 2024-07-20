import { CardSummary } from "./components/CardSummary";
import { BookOpenCheck, Zap, Fuel, Thermometer,Droplet,SunDim,Sprout, Heater, Lightbulb, Fan } from "lucide-react";
import LastCustomers from "./components/LastCustomers/LastCustomers";
import SalesDistributors from "./components/SalesDistributors/SalesDistributors";
import { GreenHouseImage } from "./components/GreenHouseImage";

export default function Home() {

  const cardDataSensors = [
    {
      icon: Thermometer,
      total: "25 C / 77 F",
      title: "Temperature:",
      tooltipText: "Tooltip 1",
    },
    {
      icon: Droplet,
      total: "100%",
      title: "Humidity:",
      tooltipText: "ON / OFF",
    },
    {
      icon: SunDim,
      total: "50 Lux",
      title: "Brightness",
      tooltipText: "Tooltip 2",
    },
    {
      icon: Sprout,
      total: "80%",
      title: "Soil Hum",
      tooltipText: "ON / OFF",
    },
    {
      icon: Fuel,
      total: "20PPM",
      title: "CO2",
      tooltipText: "ON / OFF",
    },
  ];


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
          {cardDataSensors.map((card, index) => (
            <CardSummary
              key={index}
              icon={card.icon}
              total={card.total}
              title={card.title}
              tooltipText={card.tooltipText}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-24">
        <div className="col-span-2 flex justify-center text-2xl">Actuators</div>

          {cardDataActuators.map((card, index) => (
            <CardSummary
              key={index}
              icon={card.icon}
              total={card.total}
              title={card.title}
              tooltipText={card.tooltipText}
            />
          ))}
        </div>

        <div className="col-span-1  max-h-80">
        <div className="col-span-2 flex justify-center text-2xl">GPS Information</div>

          <GreenHouseImage />

        </div>

      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 md:gap-x-2 mt-12">
      <div className="col-span-4 flex justify-center text-2xl">Flow Charts</div>

        <div className="col-span-1 flexflex-col">
        <SalesDistributors />

        </div>
        <div className="col-span-1 flex  flex-col">
          <SalesDistributors />
        </div>
        <div className="col-span-1 flex  flex-col">
          <SalesDistributors />
        </div>
        <div className="col-span-1 flex  flex-col">
          <SalesDistributors />
        </div>
      </div>
    </div>
  );
}
