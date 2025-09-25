"use client";
"use client";
import Navbar from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { GreenhouseProvider } from "@/app/GreenhouseContext"; 
import Footer from "@/components/Landing/footer";
import { useRouter } from "next/navigation";
import { useUserId } from "../../../src/hooks/useUserId";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allGreenhouse, setDataAllGreenhouse] = useState([]);
  const { userId, loading } = useUserId();

  // useEffect(() => {
  //   if (loading) return;
  //   if (!userId) router.replace("/login");
  // }, [loading, userId, router]);

  useEffect(() => {
    const fetchDataGreenhouses = async () => {
      try {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) throw new Error('NEXT_PUBLIC_API_URL no configurada');
  const response = await fetch(`${base}/greenhouses`);
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

  if (loading) return null;

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