"use client";

import React, { useState } from "react";
import { BiLineChart } from "react-icons/bi";

export default function StatistikPage() {
  const [activeTab, setActiveTab] = useState("leistung");

  // Örnek veri setleri
  const leistungData = [30, 50, 70, 40, 60];
  const effizienzData = [45, 65, 80, 75, 85];
  const umsatzData = [120, 150, 140, 180, 200];

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200">
        Statistik
      </h1>

      <div className="space-y-4">
        <p className="text-e-background-800 dark:text-white">
          Im Bereich Statistik können detaillierte Grafiken und Analysedaten
          angezeigt werden.
        </p>

        {/* Tabs */}
        <div className="mb-4 flex overflow-x-auto border-b border-e-brown-200 dark:border-e-background-600">
          <div className="flex min-w-max">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "leistung"
                ? "border-b-2 border-e-brown-500 text-e-brown-800 dark:text-e-brown-200"
                : "text-e-background-600 hover:text-e-brown-800 dark:text-e-background-400 dark:hover:text-e-brown-200"
                }`}
              onClick={() => setActiveTab("leistung")}
            >
              Leistungsanalyse
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "effizienz"
                ? "border-b-2 border-e-brown-500 text-e-brown-800 dark:text-e-brown-200"
                : "text-e-background-600 hover:text-e-brown-800 dark:text-e-background-400 dark:hover:text-e-brown-200"
                }`}
              onClick={() => setActiveTab("effizienz")}
            >
              Effizienztrends
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "umsatz"
                ? "border-b-2 border-e-brown-500 text-e-brown-800 dark:text-e-brown-200"
                : "text-e-background-600 hover:text-e-brown-800 dark:text-e-background-400 dark:hover:text-e-brown-200"
                }`}
              onClick={() => setActiveTab("umsatz")}
            >
              Umsatzstatistik
            </button>
          </div>
        </div>

        {/* Leistungsanalyse */}
        {activeTab === "leistung" && (
          <div className="space-y-6">
            <div className="rounded-lg border border-e-brown-200 bg-white p-3 dark:border-e-background-600 dark:bg-e-background-700">
              <h4 className="mb-3 font-medium text-e-brown-800 dark:text-e-brown-200">
                Leistungsanalyse
              </h4>
              <div className="h-64 w-full bg-e-brown-50 dark:bg-e-background-800">
                <div className="flex h-full items-end justify-around p-2">
                  {leistungData.map((value, index) => (
                    <div
                      key={index}
                      className="relative w-16 bg-e-brown-400 dark:bg-e-brown-500"
                      style={{ height: `${value}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 transform text-xs font-medium text-e-background-700 dark:text-e-background-300">
                        {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-around">
                <span className="text-xs text-e-background-600 dark:text-e-background-300">Q1</span>
                <span className="text-xs text-e-background-600 dark:text-e-background-300">Q2</span>
                <span className="text-xs text-e-background-600 dark:text-e-background-300">Q3</span>
                <span className="text-xs text-e-background-600 dark:text-e-background-300">Q4</span>
                <span className="text-xs text-e-background-600 dark:text-e-background-300">Q5</span>
              </div>
            </div>

            <div className="rounded-lg border border-e-brown-200 bg-white p-4 dark:border-e-background-600 dark:bg-e-background-700">
              <h4 className="mb-2 font-medium text-e-brown-800 dark:text-e-brown-200">
                Leistungsdetails
              </h4>
              <table className="min-w-full divide-y divide-e-brown-200 dark:divide-e-background-600">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-xs font-medium text-e-background-500 dark:text-e-background-400">Quartal</th>
                    <th className="py-2 text-left text-xs font-medium text-e-background-500 dark:text-e-background-400">Leistungswert</th>
                    <th className="py-2 text-left text-xs font-medium text-e-background-500 dark:text-e-background-400">Veränderung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-e-brown-100 dark:divide-e-background-700">
                  {leistungData.map((value, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm text-e-background-800 dark:text-e-background-200">Q{index + 1}</td>
                      <td className="py-2 text-sm text-e-background-800 dark:text-e-background-200">{value}%</td>
                      <td className="py-2 text-sm">
                        {index > 0 ? (
                          <span className={value > leistungData[index - 1] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                            {value > leistungData[index - 1] ? "+" : ""}{value - leistungData[index - 1]}%
                          </span>
                        ) : (
                          <span className="text-e-background-500 dark:text-e-background-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Effizienztrends */}
        {activeTab === "effizienz" && (
          <div className="rounded-lg border border-e-brown-200 bg-white p-4 dark:border-e-background-600 dark:bg-e-background-700">
            <h4 className="mb-4 font-medium text-e-brown-800 dark:text-e-brown-200">
              Effizienztrends
            </h4>
            <div className="h-64 w-full bg-e-brown-50 p-4 dark:bg-e-background-800">
              <div className="relative h-full w-full">
                {/* Effizienzlinie zeichnen */}
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={`
                      ${0},${100 - effizienzData[0] * 100 / 100}
                      ${25},${100 - effizienzData[1] * 100 / 100}
                      ${50},${100 - effizienzData[2] * 100 / 100}
                      ${75},${100 - effizienzData[3] * 100 / 100}
                      ${100},${100 - effizienzData[4] * 100 / 100}
                    `}
                    fill="none"
                    stroke="#9F8170"
                    strokeWidth="2"
                  />
                  {effizienzData.map((value, index) => (
                    <circle
                      key={index}
                      cx={index * 25}
                      cy={100 - value * 100 / 100}
                      r="2"
                      fill="#9F8170"
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-e-background-600 dark:text-e-background-300">
                Durchschnittliche Effizienz: <span className="font-semibold">{Math.round(effizienzData.reduce((a, b) => a + b, 0) / effizienzData.length)}%</span>
              </p>
              <p className="text-sm text-e-background-600 dark:text-e-background-300">
                Effizienztrend: <span className="font-semibold text-green-600 dark:text-green-400">↑ Steigend</span>
              </p>
            </div>
          </div>
        )}

        {/* Umsatzstatistik */}
        {activeTab === "umsatz" && (
          <div className="rounded-lg border border-e-brown-200 bg-white p-4 dark:border-e-background-600 dark:bg-e-background-700">
            <h4 className="mb-4 font-medium text-e-brown-800 dark:text-e-brown-200">
              Umsatzstatistik
            </h4>
            <div className="h-64 w-full bg-e-brown-50 p-4 dark:bg-e-background-800">
              <div className="flex h-full items-end justify-around">
                {umsatzData.map((value, index) => {
                  const height = (value / Math.max(...umsatzData)) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-12 rounded-t bg-e-brown-400 transition-all hover:bg-e-brown-500 dark:bg-e-brown-500 dark:hover:bg-e-brown-600"
                        style={{ height: `${height}%` }}
                      >
                        <div className="h-full w-full overflow-hidden">
                          <span className="flex h-full items-end justify-center pb-1 text-xs font-bold text-white">
                            {value}
                          </span>
                        </div>
                      </div>
                      <span className="mt-2 text-xs text-e-background-600 dark:text-e-background-300">
                        {`Monat ${index + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-e-brown-100 bg-e-brown-50 p-3 dark:border-e-background-700 dark:bg-e-background-800">
                <p className="text-sm text-e-background-600 dark:text-e-background-300">Gesamtumsatz</p>
                <p className="text-lg font-semibold text-e-brown-800 dark:text-e-brown-200">
                  {umsatzData.reduce((a, b) => a + b, 0).toLocaleString()}€
                </p>
              </div>
              <div className="rounded-lg border border-e-brown-100 bg-e-brown-50 p-3 dark:border-e-background-700 dark:bg-e-background-800">
                <p className="text-sm text-e-background-600 dark:text-e-background-300">Durchschnitt</p>
                <p className="text-lg font-semibold text-e-brown-800 dark:text-e-brown-200">
                  {Math.round(umsatzData.reduce((a, b) => a + b, 0) / umsatzData.length).toLocaleString()}€
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
