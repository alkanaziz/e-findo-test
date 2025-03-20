import React from "react";
import {
  BiFile,
  BiBarChart,
  BiLineChart,
  BiTable,
  BiErrorCircle,
  BiCube,
} from "react-icons/bi";
import StorageSystem from "./StorageSystem";

// Verschiedene Inhaltskomponenten für jedes Menüelement
const KontrollbelegeContent = () => (
  <div className="space-y-4">
    <p className="text-e-background-800 dark:text-white">
      Im Bereich Kontrollbelege können Dateien und Dokumente angezeigt und
      verwaltet werden.
    </p>
    <div className="grid gap-3 pt-2">
      <div className="rounded-lg border border-e-brown-200 bg-white p-3 shadow-sm dark:border-e-background-600 dark:bg-e-background-700">
        <div className="flex items-center gap-3">
          <BiFile className="size-8 text-e-brown-500" />
          <div>
            <h4 className="font-medium text-e-brown-800 dark:text-e-brown-200">
              Dokumentenverwaltung
            </h4>
            <p className="text-sm text-e-background-600 dark:text-e-background-300">
              Bearbeiten und verwalten Sie alle Ihre Dokumente
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MonatsauswertungContent = () => (
  <div className="space-y-4">
    <p className="text-e-background-800 dark:text-white">
      Im Bereich Monatsauswertung können monatliche Statistiken und Berichte
      angezeigt werden.
    </p>
    <div className="rounded-lg border border-e-brown-200 bg-white p-4 dark:border-e-background-600 dark:bg-e-background-700">
      <h4 className="mb-2 font-medium text-e-brown-800 dark:text-e-brown-200">
        Monatsstatistiken
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded border border-e-brown-100 bg-e-brown-50 p-2 dark:border-e-background-600 dark:bg-e-background-800">
          <div className="text-center">
            <p className="text-xs text-e-background-600 dark:text-e-background-300">
              Januar
            </p>
            <p className="text-lg font-semibold text-e-brown-600 dark:text-e-brown-300">
              3.456€
            </p>
          </div>
        </div>
        <div className="rounded border border-e-brown-100 bg-e-brown-50 p-2 dark:border-e-background-600 dark:bg-e-background-800">
          <div className="text-center">
            <p className="text-xs text-e-background-600 dark:text-e-background-300">
              Februar
            </p>
            <p className="text-lg font-semibold text-e-brown-600 dark:text-e-brown-300">
              4.128€
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatistikContent = () => (
  <div className="space-y-4">
    <p className="text-e-background-800 dark:text-white">
      Im Bereich Statistik können detaillierte Grafiken und Analysedaten
      angezeigt werden.
    </p>
    <div className="rounded-lg border border-e-brown-200 bg-white p-3 dark:border-e-background-600 dark:bg-e-background-700">
      <h4 className="mb-1 font-medium text-e-brown-800 dark:text-e-brown-200">
        Leistungsanalyse
      </h4>
      <div className="h-32 w-full bg-e-brown-50 dark:bg-e-background-800">
        <div className="flex h-full items-end justify-around p-2">
          <div
            className="w-8 bg-e-brown-400 dark:bg-e-brown-500"
            style={{ height: "30%" }}
          ></div>
          <div
            className="w-8 bg-e-brown-400 dark:bg-e-brown-500"
            style={{ height: "50%" }}
          ></div>
          <div
            className="w-8 bg-e-brown-400 dark:bg-e-brown-500"
            style={{ height: "70%" }}
          ></div>
          <div
            className="w-8 bg-e-brown-400 dark:bg-e-brown-500"
            style={{ height: "40%" }}
          ></div>
          <div
            className="w-8 bg-e-brown-400 dark:bg-e-brown-500"
            style={{ height: "60%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const IndexContent = () => (
  <div className="space-y-4">
    <p className="text-e-background-800 dark:text-white">
      Im Bereich Index können alle Systemindizes und Verzeichnisse angezeigt
      werden.
    </p>
    <div className="divide-y divide-e-brown-100 rounded-lg border border-e-brown-200 bg-white dark:divide-e-background-700 dark:border-e-background-600 dark:bg-e-background-700">
      <div className="flex items-center justify-between p-3">
        <p className="font-medium text-e-background-800 dark:text-white">
          Hauptindex
        </p>
        <p className="text-sm text-e-background-600 dark:text-e-background-300">
          12.45
        </p>
      </div>
      <div className="flex items-center justify-between p-3">
        <p className="font-medium text-e-background-800 dark:text-white">
          Unterindex
        </p>
        <p className="text-sm text-e-background-600 dark:text-e-background-300">
          8.92
        </p>
      </div>
      <div className="flex items-center justify-between p-3">
        <p className="font-medium text-e-background-800 dark:text-white">
          Durchschnitt
        </p>
        <p className="text-sm text-e-background-600 dark:text-e-background-300">
          10.68
        </p>
      </div>
    </div>
  </div>
);

const FehlerContent = () => (
  <div className="space-y-4">
    <p className="text-e-background-800 dark:text-white">
      Im Bereich Fehler können Systemfehler und Warnungen angezeigt werden.
    </p>
    <div className="space-y-2">
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
        <div className="flex items-start gap-2">
          <BiErrorCircle className="mt-0.5 size-5 text-red-600 dark:text-red-400" />
          <div>
            <p className="font-medium text-red-800 dark:text-red-300">
              Kritischer Fehler
            </p>
            <p className="text-sm text-red-700 dark:text-red-400">
              Datensynchronisation fehlgeschlagen
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
        <div className="flex items-start gap-2">
          <BiErrorCircle className="mt-0.5 size-5 text-yellow-600 dark:text-yellow-500" />
          <div>
            <p className="font-medium text-yellow-800 dark:text-yellow-300">
              Warnung
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Speicherplatz wird knapp
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LagersystemeContent = () => (
  <div className="StorageSystem h-full w-full overflow-y-auto rounded-lg bg-e-background-50 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none">
    <StorageSystem isInModal={true} />
  </div>
);

// Inhaltsübersicht für jedes Menüelement
const MODAL_CONTENT_MAP = {
  Kontrollbelege: <KontrollbelegeContent />,
  Monatsauswertung: <MonatsauswertungContent />,
  Statistik: <StatistikContent />,
  Index: <IndexContent />,
  Fehler: <FehlerContent />,
  Lagersysteme: <LagersystemeContent />,
};

// Hauptkomponente
const ModalContent = ({ contentType }) => {
  return MODAL_CONTENT_MAP[contentType] || <p>Inhalt nicht gefunden</p>;
};

export default ModalContent;
