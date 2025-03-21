"use client";

import React from "react";
import { BiFile } from "react-icons/bi";
import { Suspense } from "react";

export default function KontrollbelegePage() {
  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-e-brown-200">
        Kontrollbelege
      </h1>

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

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-e-brown-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-e-background-600 dark:bg-e-background-700"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-e-brown-800 dark:text-e-brown-200">
                Kontrollbeleg #{i}
              </h3>
              <span className="text-xs font-medium text-e-background-500 dark:text-e-background-400">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <p className="mb-3 text-sm text-e-background-600 dark:text-e-background-300">
              Dokumenttyp: {i % 2 === 0 ? "Prüfbericht" : "Wartungsprotokoll"}
            </p>
            <button className="w-full rounded bg-e-brown-400 py-1.5 text-sm font-medium text-white transition-colors hover:bg-e-brown-500 dark:bg-e-brown-600 dark:hover:bg-e-brown-700">
              Anzeigen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
