import { CardSummary } from "./components/CardSummary";
import { BookOpenCheck, LeafyGreen, Waypoints } from "lucide-react";
import LastCustomers from "./components/LastCustomers/LastCustomers";
import SalesDistributors from "./components/SalesDistributors/SalesDistributors";
import { GreenHouseImage } from "./components/GreenHouseImage";


export default function Home() {

  const cardData = [
    {
      icon: LeafyGreen,
      total: "14",
      average: 15,
      title: "Green Houses",
      tooltipText: "Tooltip 1",
    },
    {
      icon: LeafyGreen,
      total: "14",
      average: 15,
      title: "Green Houses",
      tooltipText: "Tooltip 1",
    },
    {
      icon: BookOpenCheck,
      total: "12.450",
      average: 55,
      title: "Title 2",
      tooltipText: "Tooltip 2",
    },
    {
      icon: Waypoints,
      total: "12.450",
      average: 75,
      title: "Title 3",
      tooltipText: "Tooltip 3",
    },
  ];


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-4 max-h-80 ">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 h-24 ">
          <div className="col-span-2 flex justify-center text-2xl">Sensors</div>
          {cardData.map((card, index) => (
            <CardSummary
              key={index}
              icon={card.icon}
              total={card.total}
              average={card.average}
              title={card.title}
              tooltipText={card.tooltipText}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  h-24">
        <div className="col-span-2 flex justify-center text-2xl">Actuators</div>

          {cardData.map((card, index) => (
            <CardSummary
              key={index}
              icon={card.icon}
              total={card.total}
              average={card.average}
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
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-2 mt-12">
      <div className="col-span-2 flex justify-center text-2xl">Flow Charts</div>

        <div className="col-span-1 flexflex-col">
        <SalesDistributors />

        </div>
        <div className="col-span-1 flex  flex-col">
          <SalesDistributors />
        </div>

      </div>
    </div>
  );
}
