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
      <div className={`h-[calc(100vh-180px)] ${isFullscreen ? 'h-screen w-screen fixed left-0 top-0 z-50 m-0 rounded-none' : 'relative'}`}>
        <StorageSystem isInModal={false} isHomePage={false} onToggleFullscreen={handleToggleFullscreen} />
      </div>
    </div>
  );
}
