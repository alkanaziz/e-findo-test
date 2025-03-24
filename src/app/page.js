"use client";

import { useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import StorageSystemWrapper from "@/components/wrappers/StorageSystemWrapper";
import ChartWrapper from "@/components/wrappers/ChartWrapper";

export default function Home() {
  const [fullscreenWidget, setFullscreenWidget] = useState(null);

  const handleToggleFullscreen = (widgetName) => {
    setFullscreenWidget(fullscreenWidget === widgetName ? null : widgetName);
  };

  return (
    <main className="flex h-[calc(100vh-8rem)] flex-col gap-2 md:w-full">
      {/* Dashboard Stats */}
      {fullscreenWidget === null && <DashboardStats />}

      {/* Storage System */}
      {fullscreenWidget !== "revenueChart" && fullscreenWidget !== "weightChart" && (
        <StorageSystemWrapper
          fullscreenWidget={fullscreenWidget}
          onToggleFullscreen={() => handleToggleFullscreen("storage")}
        />
      )}

      {/* Charts */}
      {fullscreenWidget !== "storage" && (
        <div
          className={`flex flex-col gap-2 rounded-lg shadow-sm shadow-e-brown-500/20 dark:shadow-none lg:flex-row ${fullscreenWidget === "revenueChart" || fullscreenWidget === "weightChart"
            ? "h-full"
            : "h-2/5"
            }`}
        >
          {/* Revenue Chart */}
          {fullscreenWidget !== "weightChart" && (
            <ChartWrapper
              fullscreenWidget={fullscreenWidget}
              onToggleFullscreen={() => handleToggleFullscreen("revenueChart")}
              type="revenueChart"
            />
          )}

          {/* Weight Chart */}
          {fullscreenWidget !== "revenueChart" && (
            <ChartWrapper
              fullscreenWidget={fullscreenWidget}
              onToggleFullscreen={() => handleToggleFullscreen("weightChart")}
              type="weightChart"
            />
          )}
        </div>
      )}
    </main>
  );
}