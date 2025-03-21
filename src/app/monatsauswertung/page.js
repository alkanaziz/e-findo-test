"use client";

import React, { useState } from "react";
import { BiBarChart } from "react-icons/bi";

export default function MonatsauswertungPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  // Beispieldaten für die Monatsauswertung
  const monthlyData = {
    "2024": [2845, 3120, 2780, 3450, 3670, 3890, 3560, 3210, 2950, 3340, 3780, 4020],
    "2025": [3456, 4128, 3950, 4250, 4580, 4730, 4380, 4150, 3980, 4280, 4650, 4890]
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200">
        Monatsauswertung
      </h1>

      <div className="space-y-4">
        <p className="text-e-background-800 dark:text-white">
          Im Bereich Monatsauswertung können monatliche Statistiken und Berichte
          angezeigt werden.
        </p>

        <div className="mb-4 flex items-center space-x-4">
          <label className="text-e-background-700 dark:text-e-background-300">Jahr auswählen:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-md border border-e-brown-200 bg-white p-2 dark:border-e-background-600 dark:bg-e-background-700 dark:text-white"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {monthNames.map((month, index) => (
            <div
              key={month}
              className="rounded-lg border border-e-brown-200 bg-white p-4 shadow-sm dark:border-e-background-600 dark:bg-e-background-700"
            >
              <div className="text-center">
                <p className="text-sm text-e-background-600 dark:text-e-background-300">
                  {month}
                </p>
                <p className="text-lg font-semibold text-e-brown-600 dark:text-e-brown-300">
                  {monthlyData[selectedYear][index].toLocaleString()}€
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-e-brown-200 bg-white p-4 shadow-md dark:border-e-background-600 dark:bg-e-background-700">
          <h3 className="mb-4 text-xl font-semibold text-e-brown-800 dark:text-e-brown-200">
            Jahresübersicht {selectedYear}
          </h3>

          <div className="h-64 w-full overflow-x-auto bg-e-brown-50 p-4 dark:bg-e-background-800">
            <div className="flex h-full items-end" style={{ minWidth: "800px" }}>
              {monthlyData[selectedYear].map((value, index) => {
                const height = (value / 5000) * 100; // Normalisierung für 5000 als Maximum
                return (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div
                      className="w-16 rounded-t bg-e-brown-400 transition-all hover:bg-e-brown-500 dark:bg-e-brown-500 dark:hover:bg-e-brown-600"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="mt-2 text-xs text-e-background-600 dark:text-e-background-300">
                      {monthNames[index].substring(0, 3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <p className="text-sm text-e-background-600 dark:text-e-background-300">
              Gesamtumsatz: <span className="font-semibold">{monthlyData[selectedYear].reduce((a, b) => a + b, 0).toLocaleString()}€</span>
            </p>
            <p className="text-sm text-e-background-600 dark:text-e-background-300">
              Durchschnitt: <span className="font-semibold">{Math.round(monthlyData[selectedYear].reduce((a, b) => a + b, 0) / 12).toLocaleString()}€</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
