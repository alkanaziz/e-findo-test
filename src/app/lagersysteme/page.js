"use client";

import React, { useState } from "react";
import { BiCube } from "react-icons/bi";
import StorageSystem from "../../components/StorageSystem";

export default function LagersystemePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = (fullscreen) => {
    setIsFullscreen(fullscreen);
  };

  return (
    <div className="container mx-auto h-full">
      <h1 className={`mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200 ${isFullscreen ? 'sr-only' : ''}`}>
        Lagersysteme
      </h1>

      <div className={`space-y-4 ${isFullscreen ? 'sr-only' : ''}`}>
        <p className="text-e-background-800 dark:text-white">
          Im Bereich Lagersysteme können alle Lagersysteme und Containerstatus angezeigt werden.
        </p>
      </div>

      <div className={`mt-4 h-[calc(100vh-180px)] ${isFullscreen ? 'h-screen w-screen fixed left-0 top-0 z-50 m-0 rounded-none' : 'relative'}`}>
        <StorageSystem isInModal={false} onToggleFullscreen={handleToggleFullscreen} />
      </div>
    </div>
  );
}
