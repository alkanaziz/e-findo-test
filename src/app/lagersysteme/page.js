"use client";

import { useState } from "react";
import StorageSystem from "../../components/StorageSystem";

export default function LagersystemePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = (fullscreen) => {
    setIsFullscreen(fullscreen);
  };
  return (
    <div className="mb-2 flex w-full flex-col gap-2 overflow-auto">
      <div
        className={`StorageSystem ${isFullscreen ? "fixed bg-e-background-50 dark:bg-e-background-500 left-0 top-0 z-50 p-5 flex h-screen w-screen items-center justify-center rounded-none *:w-[90vw]" : ""} h-full overflow-y-auto rounded-lg shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none`}
      >
        <StorageSystem onToggleFullscreen={handleToggleFullscreen} />
      </div>
    </div>
  );
}
