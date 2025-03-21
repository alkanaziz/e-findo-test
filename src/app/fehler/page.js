"use client";

import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaFilter, FaCheck, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

export default function FehlerPage() {
  const [filter, setFilter] = useState("all");

  // Örnek hata verileri
  const errorData = [
    {
      id: 1,
      type: "critical",
      title: "Kritischer Fehler",
      description: "Datensynchronisation fehlgeschlagen",
      timestamp: "2025-03-10T08:23:15",
      system: "Datenbank",
      fixed: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Warnung",
      description: "Speicherplatz wird knapp",
      timestamp: "2025-03-12T10:45:33",
      system: "Dateisystem",
      fixed: false,
    },
    {
      id: 3,
      type: "info",
      title: "Information",
      description: "Automatisches Backup erstellt",
      timestamp: "2025-03-14T02:12:00",
      system: "Backup-System",
      fixed: true,
    },
    {
      id: 4,
      type: "critical",
      title: "Kritischer Fehler",
      description: "Verbindung zum Server unterbrochen",
      timestamp: "2025-03-14T15:31:22",
      system: "Netzwerk",
      fixed: true,
    },
    {
      id: 5,
      type: "warning",
      title: "Warnung",
      description: "Systemlast über 85%",
      timestamp: "2025-03-15T11:09:45",
      system: "System-Monitor",
      fixed: false,
    },
    {
      id: 6,
      type: "info",
      title: "Information",
      description: "Neue Systemversion verfügbar",
      timestamp: "2025-03-16T09:20:11",
      system: "Update-Manager",
      fixed: false,
    },
    {
      id: 7,
      type: "critical",
      title: "Kritischer Fehler",
      description: "Zugriffsverletzung im Speicher",
      timestamp: "2025-03-16T16:54:39",
      system: "Lagerverwaltung",
      fixed: false,
    },
    {
      id: 8,
      type: "warning",
      title: "Warnung",
      description: "Falsche Konfigurationsparameter",
      timestamp: "2025-03-17T14:12:50",
      system: "Konfigurationsdienst",
      fixed: true,
    }
  ];

  // Filtern der Fehler basierend auf dem ausgewählten Filter
  const filteredErrors = filter === "all"
    ? errorData
    : filter === "fixed"
      ? errorData.filter(error => error.fixed)
      : filter === "unfixed"
        ? errorData.filter(error => !error.fixed)
        : errorData.filter(error => error.type === filter);

  // Statistikzähler
  const criticalCount = errorData.filter(error => error.type === "critical").length;
  const warningCount = errorData.filter(error => error.type === "warning").length;
  const infoCount = errorData.filter(error => error.type === "info").length;
  const fixedCount = errorData.filter(error => error.fixed).length;

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200">
        Fehler
      </h1>

      <div className="space-y-4">
        <p className="text-e-background-800 dark:text-white">
          Im Bereich Fehler können Systemfehler und Warnungen angezeigt werden.
        </p>

        {/* Zusammenfassung */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400">Kritische Fehler</p>
            <p className="mt-1 text-3xl font-bold text-red-800 dark:text-red-300">{criticalCount}</p>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">Warnungen</p>
            <p className="mt-1 text-3xl font-bold text-yellow-800 dark:text-yellow-300">{warningCount}</p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-400">Informationen</p>
            <p className="mt-1 text-3xl font-bold text-blue-800 dark:text-blue-300">{infoCount}</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-400">Behoben</p>
            <p className="mt-1 text-3xl font-bold text-green-800 dark:text-green-300">{fixedCount}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center text-sm font-medium text-e-background-700 dark:text-e-background-300">
            <FaFilter className="mr-1" /> Filter:
          </span>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "all"
              ? "bg-e-brown-400 text-white dark:bg-e-brown-600"
              : "bg-e-brown-100 text-e-background-700 hover:bg-e-brown-200 dark:bg-e-background-700 dark:text-e-background-300 dark:hover:bg-e-background-600"
              }`}
            onClick={() => setFilter("all")}
          >
            Alle anzeigen
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "critical"
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
              }`}
            onClick={() => setFilter("critical")}
          >
            Kritisch
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "warning"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
              }`}
            onClick={() => setFilter("warning")}
          >
            Warnungen
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "info"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
              }`}
            onClick={() => setFilter("info")}
          >
            Informationen
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "fixed"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
              }`}
            onClick={() => setFilter("fixed")}
          >
            Behoben
          </button>
          <button
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "unfixed"
              ? "bg-gray-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            onClick={() => setFilter("unfixed")}
          >
            Unbehoben
          </button>
        </div>

        {/* Fehlerliste */}
        <div className="space-y-3">
          {filteredErrors.length === 0 ? (
            <div className="rounded-lg border border-e-brown-200 bg-white p-6 text-center dark:border-e-background-600 dark:bg-e-background-700">
              <p className="text-e-background-600 dark:text-e-background-300">Keine Fehler gefunden.</p>
            </div>
          ) : (
            filteredErrors.map((error) => {
              let borderColor, bgColor, darkBorderColor, darkBgColor, icon;

              switch (error.type) {
                case "critical":
                  borderColor = "border-red-200";
                  bgColor = "bg-red-50";
                  darkBorderColor = "dark:border-red-800";
                  darkBgColor = "dark:bg-red-900/20";
                  icon = <FaTimesCircle className="mt-0.5 size-5 text-red-600 dark:text-red-400" />;
                  break;
                case "warning":
                  borderColor = "border-yellow-200";
                  bgColor = "bg-yellow-50";
                  darkBorderColor = "dark:border-yellow-800";
                  darkBgColor = "dark:bg-yellow-900/20";
                  icon = <FaExclamationTriangle className="mt-0.5 size-5 text-yellow-600 dark:text-yellow-500" />;
                  break;
                case "info":
                  borderColor = "border-blue-200";
                  bgColor = "bg-blue-50";
                  darkBorderColor = "dark:border-blue-800";
                  darkBgColor = "dark:bg-blue-900/20";
                  icon = <BiErrorCircle className="mt-0.5 size-5 text-blue-600 dark:text-blue-400" />;
                  break;
                default:
                  borderColor = "border-e-brown-200";
                  bgColor = "bg-white";
                  darkBorderColor = "dark:border-e-background-600";
                  darkBgColor = "dark:bg-e-background-700";
                  icon = <BiErrorCircle className="mt-0.5 size-5 text-e-brown-600 dark:text-e-brown-400" />;
              }

              return (
                <div
                  key={error.id}
                  className={`rounded-lg border ${borderColor} ${bgColor} p-4 ${darkBorderColor} ${darkBgColor}`}
                >
                  <div className="flex items-start gap-2">
                    {icon}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-e-background-800 dark:text-white">
                          {error.title} - {error.system}
                        </p>
                        <div className="flex items-center">
                          {error.fixed && (
                            <span className="mr-2 flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                              <FaCheck className="mr-1" /> Behoben
                            </span>
                          )}
                          <span className="text-xs text-e-background-500 dark:text-e-background-400">
                            {new Date(error.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-e-background-700 dark:text-e-background-300">
                        {error.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
