"use client";

import { useState, useEffect } from "react";
import DashboardStats from "@/components/DashboardStats";
import StorageSystem from "@/components/StorageSystem";
import Chart from "@/components/Chart";
export default function Home() {
  const [isStorageFullscreen, setIsStorageFullscreen] = useState(false);
  const [isErloesChartFullscreen, setIsErloesChartFullscreen] = useState(false);
  const [isGewichtChartFullscreen, setIsGewichtChartFullscreen] =
    useState(false);

  const handleStorageToggleFullscreen = (isFullscreen) => {
    setIsStorageFullscreen(isFullscreen);
  };

  const handleChartToggleFullscreen = (isFullscreen, type) => {
    if (type === "erloese") {
      setIsErloesChartFullscreen(isFullscreen);
    } else {
      setIsGewichtChartFullscreen(isFullscreen);
    }
  };

  return (
    <main className="dashboardStats flex flex-col gap-2 overflow-auto md:w-full">
      {!isStorageFullscreen &&
        !isErloesChartFullscreen &&
        !isGewichtChartFullscreen && <DashboardStats />}
      {!isErloesChartFullscreen && !isGewichtChartFullscreen && (
        <div
          className={`StorageSystem ${isStorageFullscreen ? "h-[calc(100vh-6rem)]" : "max-h-[33vh]"} overflow-y-auto rounded-lg bg-e-background-50 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none`}
        >
          <StorageSystem onToggleFullscreen={handleStorageToggleFullscreen} />
        </div>
      )}
      {!isStorageFullscreen && (
        <div
          className={`${isErloesChartFullscreen || isGewichtChartFullscreen ? "h-[calc(100vh-6rem)]" : "h-full"} flex flex-col gap-2 rounded-lg shadow-sm shadow-e-brown-500/20 dark:shadow-none lg:flex-row`}
        >
          {!isGewichtChartFullscreen && (
            <div
              className={`Chart bg-e-white relative h-full rounded-lg border border-e-brown-300 bg-e-background-50 p-1 pt-5 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none xl:pt-0 ${isErloesChartFullscreen ? "w-full" : "lg:w-1/2"}`}
            >
              <Chart
                onToggleFullscreen={(isFullscreen) =>
                  handleChartToggleFullscreen(isFullscreen, "erloese")
                }
                type="erloese"
              />
            </div>
          )}
          {!isErloesChartFullscreen && (
            <div
              className={`Chart bg-e-white relative h-full rounded-lg border border-e-brown-300 bg-e-background-50 p-1 pt-5 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none xl:pt-0 ${isGewichtChartFullscreen ? "w-full" : "lg:w-1/2"}`}
            >
              <Chart
                onToggleFullscreen={(isFullscreen) =>
                  handleChartToggleFullscreen(
                    isFullscreen,
                    "gewichtsentciklung",
                  )
                }
                type="gewichtsentciklung"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
