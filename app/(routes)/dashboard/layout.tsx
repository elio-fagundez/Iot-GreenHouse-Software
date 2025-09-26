"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { GreenhouseProvider } from "@/app/GreenhouseContext";
import { useRouter } from "next/navigation";
import { useUserId } from "../../../src/hooks/useUserId";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userId, loading } = useUserId();

  if (loading) return null;

  return (
    <GreenhouseProvider>
      <div className="flex w-full h-full">
        <div className="hidden xl:block w-80 h-full xl:fixed">
          <Sidebar />
        </div>
        <div className="w-full xl:ml-80">
          <Navbar />
          <div className="p-6 bg-[#fdfdfd] dark:bg-secondary/10">
            {children}
          </div>
        </div>
      </div>
    </GreenhouseProvider>
  );
}