"use client";

import React, { useState, useEffect } from "react";

const CurrentDate = () => {
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
    <div className="currentDate mx-auto w-fit rounded-md bg-e-background-50 px-3 text-center shadow-sm shadow-e-brown-500 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none">
      {formattedDate}
    </div>
  );
};

export default CurrentDate;
