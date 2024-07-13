import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CardSummary } from "./components/CardSummary";
import { BookOpenCheck, LeafyGreen, Waypoints } from "lucide-react";
import { CustomTooltip } from "@/components/CustomTooltip";


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
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
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
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <p>Last Customers</p>
        <p>Sales Distributors</p>
      </div>
    </div>
  );
}
