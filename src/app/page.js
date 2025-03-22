"use client";

import { useState, useEffect } from "react";
import DashboardStats from "@/components/DashboardStats";
import StorageSystem from "@/components/StorageSystem";

export default function Home() {
  const [isStorageFullscreen, setIsStorageFullscreen] = useState(false);

  const handleStorageToggleFullscreen = (isFullscreen) => {
    setIsStorageFullscreen(isFullscreen);
  };

  return (
    <main className="dashboardStats flex flex-col overflow-auto gap-2 md:w-full">
      {!isStorageFullscreen && <DashboardStats />}
      <div className={`StorageSystem ${isStorageFullscreen ? 'h-[calc(100vh-6rem)]' : 'max-h-[33vh]'} overflow-y-auto rounded-lg bg-e-background-50 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none`}>
        <StorageSystem onToggleFullscreen={handleStorageToggleFullscreen} />
      </div>
      {!isStorageFullscreen && (
        <div className="flex h-[32vh] flex-col gap-2 rounded-lg bg-e-background-50 p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:shadow-none md:flex-row">
          <div className="RevenueChart rounded-lg bg-e-white p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none md:w-1/2">
            Erlöse
          </div>
          <div className="WeightTrend rounded-lg bg-e-white p-4 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none md:w-1/2">
            Gewichtstrend
          </div>
        </div>
      )}
    </main>
  );
}
