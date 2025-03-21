"use client";

import React, { useState } from "react";
import { BiTable } from "react-icons/bi";

export default function IndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Örnek indeks verileri
  const indexItems = [
    { id: 1, name: "Hauptindex", value: 12.45, category: "main" },
    { id: 2, name: "Unterindex", value: 8.92, category: "sub" },
    { id: 3, name: "Durchschnitt", value: 10.68, category: "avg" },
    { id: 4, name: "Metall-Index", value: 14.32, category: "metal" },
    { id: 5, name: "Edelmetall-Index", value: 21.87, category: "precious" },
    { id: 6, name: "Plastik-Index", value: 5.63, category: "plastic" },
    { id: 7, name: "Seltene Erden-Index", value: 31.24, category: "rare" },
    { id: 8, name: "Rohstoff-Index", value: 17.56, category: "raw" },
    { id: 9, name: "Elektronik-Index", value: 9.75, category: "electronic" },
  ];

  // Kategorien für Filter
  const categories = [
    { id: "all", name: "Alle anzeigen" },
    { id: "main", name: "Hauptindizes" },
    { id: "sub", name: "Unterindizes" },
    { id: "metal", name: "Metallindizes" },
    { id: "other", name: "Sonstige" }
  ];

  // Filtern der Indexitems basierend auf der ausgewählten Kategorie
  const filteredItems = selectedCategory === "all"
    ? indexItems
    : selectedCategory === "other"
      ? indexItems.filter(item => !["main", "sub", "metal"].includes(item.category))
      : indexItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200">
        Index
      </h1>

      <div className="space-y-4">
        <p className="text-e-background-800 dark:text-white">
          Im Bereich Index können alle Systemindizes und Verzeichnisse angezeigt
          werden.
        </p>

        {/* Kategoriefilter */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-e-background-700 dark:text-e-background-300">
            Filtern nach:
          </span>
          {categories.map(category => (
            <button
              key={category.id}
              className={`rounded-full px-3 py-1 text-xs font-medium ${selectedCategory === category.id
                ? "bg-e-brown-400 text-white dark:bg-e-brown-600"
                : "bg-e-brown-100 text-e-background-700 hover:bg-e-brown-200 dark:bg-e-background-700 dark:text-e-background-300 dark:hover:bg-e-background-600"
                }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Indextabelle */}
        <div className="overflow-hidden rounded-lg border border-e-brown-200 bg-white dark:border-e-background-600 dark:bg-e-background-700">
          <div className="divide-y divide-e-brown-100 dark:divide-e-background-700">
            <div className="grid grid-cols-12 bg-e-brown-50 px-4 py-3 dark:bg-e-background-800">
              <div className="col-span-6 font-medium text-e-background-700 dark:text-e-background-300">Name</div>
              <div className="col-span-3 font-medium text-e-background-700 dark:text-e-background-300">Wert</div>
              <div className="col-span-3 font-medium text-e-background-700 dark:text-e-background-300">Trend</div>
            </div>

            {filteredItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-e-brown-50 dark:hover:bg-e-background-800">
                <div className="col-span-6">
                  <p className="font-medium text-e-background-800 dark:text-white">{item.name}</p>
                  <p className="text-xs text-e-background-500 dark:text-e-background-400">ID: {item.id}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-e-background-800 dark:text-white">{item.value.toFixed(2)}</p>
                </div>
                <div className="col-span-3">
                  {Math.random() > 0.5 ? (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {(Math.random() * 5).toFixed(2)}%
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600 dark:text-red-400">
                      <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      {(Math.random() * 5).toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zusammenfassung */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-e-brown-100 bg-e-brown-50 p-4 shadow-sm dark:border-e-background-700 dark:bg-e-background-800">
            <p className="text-sm text-e-background-600 dark:text-e-background-300">Durchschnittswert</p>
            <p className="text-xl font-semibold text-e-brown-800 dark:text-e-brown-200">
              {(indexItems.reduce((acc, item) => acc + item.value, 0) / indexItems.length).toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border border-e-brown-100 bg-e-brown-50 p-4 shadow-sm dark:border-e-background-700 dark:bg-e-background-800">
            <p className="text-sm text-e-background-600 dark:text-e-background-300">Höchster Wert</p>
            <p className="text-xl font-semibold text-e-brown-800 dark:text-e-brown-200">
              {Math.max(...indexItems.map(item => item.value)).toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border border-e-brown-100 bg-e-brown-50 p-4 shadow-sm dark:border-e-background-700 dark:bg-e-background-800">
            <p className="text-sm text-e-background-600 dark:text-e-background-300">Niedrigster Wert</p>
            <p className="text-xl font-semibold text-e-brown-800 dark:text-e-brown-200">
              {Math.min(...indexItems.map(item => item.value)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
