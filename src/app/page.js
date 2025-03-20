"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import StorageSystem from "@/components/StorageSystem";
export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(currentDate);

  return (
    <div className="flex h-screen flex-col">
      <div className="m-2 flex flex-col gap-2">
        <div className="currentDate mx-auto w-fit rounded-md bg-e-background-50 px-3 text-center shadow-sm shadow-e-brown-500 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none">
          {formattedDate}
        </div>
        <main className="flex flex-col gap-2 md:flex-row">
          <Sidebar />
          <div className="dashboardStats flex flex-col gap-2 md:w-full">
            <DashboardStats />
            <div className="StorageSystem max-h-[33vh] overflow-y-auto rounded-lg bg-e-background-50 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none">
              <StorageSystem />
            </div>
            <div className="flex h-[32vh] flex-col gap-2 rounded-lg bg-e-background-50 p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:shadow-none md:flex-row">
              <div className="RevenueChart rounded-lg bg-e-white p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none md:w-1/2">
                Erlöse
              </div>
              <div className="WeightTrend rounded-lg bg-e-white p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none md:w-1/2">
                Gewichtstrend
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
