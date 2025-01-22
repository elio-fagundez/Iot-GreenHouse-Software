"use client";
import Navbar from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { GreenhouseProvider } from "@/app/GreenhouseContext"; 

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const [allGreenhouse, setDataAllGreenhouse] = useState([]);

  useEffect(() => {
    const fetchDataGreenhouses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/greenhouses`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setDataAllGreenhouse(data);
        console.log("allGreenhouse", data);
      } catch (error) {
        console.error("Error fetching card data sensors:", error);
      }
    };

    fetchDataGreenhouses();
  }, []);

  console.log("allGreenhouse", allGreenhouse);

  return (
    <GreenhouseProvider>
      <div className="flex w-full h-full">
        <div className="hidden xl:block w-80 h-full xl:fixed">
          <Sidebar />
        </div>
        <div className="w-full xl:ml-80">
          <Navbar greenhouses={allGreenhouse} />
          <div className="p-6 bg-[#fdfdfd] dark:bg-secondary/10">
            {children}
          </div>
        </div>
      </div>
    </GreenhouseProvider>
  );
}