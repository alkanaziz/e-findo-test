"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ContainerCard from "@/components/ContainerCard";
import Modal from "@/components/Modal";
import { storageData as initialStorageData } from "../../data/storageData";

function SearchPageContent() {
  const searchParams = useSearchParams();

  // Suchbegriffe aus den URL-Parametern abrufen
  const initialTerm = searchParams.get("term") || "";
  const initialMaterial = searchParams.get("material") || "";
  const initialCompany = searchParams.get("company") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialDateFrom = searchParams.get("dateFrom") || "";
  const initialDateTo = searchParams.get("dateTo") || "";
  const initialDateType = searchParams.get("dateType") || "systemDate";

  // Beispieldaten aus der StorageSystem.js-Datei verwenden
  const [containers, setContainers] = useState(initialStorageData);

  const [filteredContainers, setFilteredContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State für Modals
  const [datePickerModal, setDatePickerModal] = useState({
    isOpen: false,
    itemId: null,
  });

  const [selectedDate, setSelectedDate] = useState("");

  // Beim ersten Laden und bei Änderung der URL-Parameter filtern
  useEffect(() => {
    filterContainers({
      searchTerm: initialTerm,
      material: initialMaterial,
      company: initialCompany,
      status: initialStatus,
      dateFrom: initialDateFrom,
      dateTo: initialDateTo,
      dateType: initialDateType,
    });
    setLoading(false);
  }, [
    initialTerm,
    initialMaterial,
    initialCompany,
    initialStatus,
    initialDateFrom,
    initialDateTo,
    initialDateType,
  ]);

  // Container-Daten filtern
  const filterContainers = (filters) => {
    let filtered = [...containers];

    // Allgemeiner Suchbegriff angewandt
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((container) => {
        return (
          container.id.toLowerCase().includes(term) ||
          container.containerName.toLowerCase().includes(term) ||
          container.material.toLowerCase().includes(term) ||
          container.company.toLowerCase().includes(term)
        );
      });
    }

    // Material-Filter
    if (filters.material) {
      filtered = filtered.filter((container) =>
        container.material
          .toLowerCase()
          .includes(filters.material.toLowerCase()),
      );
    }

    // Firmen-Filter
    if (filters.company) {
      filtered = filtered.filter((container) =>
        container.company.toLowerCase().includes(filters.company.toLowerCase()),
      );
    }

    // Status-Filter
    if (filters.status) {
      const statusValue = filters.status === "true";
      filtered = filtered.filter(
        (container) => container.liveStatus === statusValue,
      );
    }

    // Datums-Filter
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter((container) => {
        // Bestimme, welches Datumsfeld gefiltert werden soll
        const dateField =
          filters.dateType === "pickupDate" ? "pickupDate" : "systemDate";

        // Datum abrufen und prüfen
        if (dateField === "pickupDate" && !container.pickupDate) {
          // Wenn pickupDate ausgewählt wurde, aber der Container kein pickupDate hat
          // und ein Datumsbereich festgelegt wurde, entferne diesen Container aus der Filterliste
          return false;
        }

        // Datum in ein Datumsobjekt umwandeln
        const dateParts = container[dateField]?.split(" ")[0].split(".");
        if (!dateParts || dateParts.length !== 3) {
          return false; // Ungültiges Datumsformat
        }

        const date = new Date(
          `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
        );
        if (isNaN(date.getTime())) {
          return false; // Ungültiges Datum
        }

        let matchesDateFrom = true;
        let matchesDateTo = true;

        if (filters.dateFrom) {
          const dateFrom = new Date(filters.dateFrom);
          matchesDateFrom = date >= dateFrom;
        }

        if (filters.dateTo) {
          const dateTo = new Date(filters.dateTo);
          matchesDateTo = date <= dateTo;
        }

        return matchesDateFrom && matchesDateTo;
      });
    }

    setFilteredContainers(filtered);
  };

  // Verwaltung der Suche aus der SearchBar-Komponente
  const handleSearch = (filters) => {
    filterContainers(filters);
  };

  // Datumsauswahlmodal öffnen
  const openDatePickerModal = (itemId) => {
    setDatePickerModal({
      isOpen: true,
      itemId,
    });

    // Aktuelles Datum finden (falls vorhanden)
    const item = containers.find((item) => item.id === itemId);
    if (item && item.pickupDate) {
      setSelectedDate(formatDateForInput(item.pickupDate));
    } else {
      // Sonst heutiges Datum setzen
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  };

  const closeDatePickerModal = () => {
    setDatePickerModal({
      isOpen: false,
      itemId: null,
    });
    setSelectedDate("");
  };

  // Container-Bearbeitungsvorgang
  const handleEditContainer = (updatedContainer) => {
    // Originale Container-Liste aktualisieren
    setContainers((prevData) =>
      prevData.map((item) =>
        item.id === updatedContainer.id ? updatedContainer : item,
      ),
    );

    // Gefilterte Liste ebenfalls aktualisieren (um Suchergebnisse aktuell zu halten)
    setFilteredContainers((prevData) =>
      prevData.map((item) =>
        item.id === updatedContainer.id ? updatedContainer : item,
      ),
    );
  };

  // Deutsches Datumsformat (DD.MM.YYYY) in Eingabeformat (YYYY-MM-DD) umwandeln
  const formatDateForInput = (germanDate) => {
    if (!germanDate) return "";
    const [day, month, year] = germanDate.split(".");
    return `${year}-${month}-${day}`;
  };

  // Eingabeformat (YYYY-MM-DD) in deutsches Datumsformat (DD.MM.YYYY) umwandeln
  const formatDateForDisplay = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const savePickupDate = () => {
    if (datePickerModal.itemId && selectedDate) {
      const formattedDate = formatDateForDisplay(selectedDate);

      // Originale Container-Liste aktualisieren
      setContainers((prevData) =>
        prevData.map((item) =>
          item.id === datePickerModal.itemId
            ? { ...item, pickupDate: formattedDate }
            : item,
        ),
      );

      // Gefilterte Liste ebenfalls aktualisieren (um Suchergebnisse aktuell zu halten)
      setFilteredContainers((prevData) =>
        prevData.map((item) =>
          item.id === datePickerModal.itemId
            ? { ...item, pickupDate: formattedDate }
            : item,
        ),
      );

      closeDatePickerModal();
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-white">
        Container Suche
      </h1>

      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          initialFilters={{
            searchTerm: initialTerm,
            material: initialMaterial,
            company: initialCompany,
            status: initialStatus,
            dateFrom: initialDateFrom,
            dateTo: initialDateTo,
            dateType: initialDateType,
          }}
        />
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-e-brown-600"></div>
        </div>
      ) : filteredContainers.length === 0 ? (
        <div className="mx-auto max-w-2xl rounded-lg border border-e-brown-300 bg-white p-8 text-center dark:border-e-background-700 dark:bg-e-background-800">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Keine Container mit den ausgewählten Filterkriterien gefunden.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-6">
          {filteredContainers.map((container) => (
            <div
              key={container.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <ContainerCard
                container={container}
                onEditClick={handleEditContainer}
                onDateClick={openDatePickerModal}
              />
            </div>
          ))}
        </div>
      )}

      {/* Datumsauswahl-Modal */}
      <Modal
        isOpen={datePickerModal.isOpen}
        onClose={closeDatePickerModal}
        title={`Abholdatum für ${containers.find((item) => item.id === datePickerModal.itemId)?.id || ""} festlegen`}
      >
        <div className="flex flex-col gap-4">
          {datePickerModal.itemId && (
            <div className="mb-2 rounded-lg bg-e-background-100 p-3 dark:bg-e-background-700">
              <div className="grid grid-cols-1 gap-2 text-sm">
                {(() => {
                  const item = containers.find(
                    (item) => item.id === datePickerModal.itemId,
                  );
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Material:</span>
                        <span>{item?.material}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          Aktuelles Abholdatum:
                        </span>
                        <span>
                          {item?.pickupDate ? (
                            item.pickupDate
                          ) : (
                            <span className="text-red-500">
                              Nicht festgelegt
                            </span>
                          )}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date" className="text-sm font-medium">
              Neues Abholdatum wählen:
            </label>
            <input
              type="date"
              id="pickup-date"
              value={selectedDate}
              onChange={handleDateChange}
              className="rounded-md border border-e-brown-300 p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={closeDatePickerModal}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-e-background-700 dark:text-gray-200 dark:hover:bg-e-background-600"
            >
              Abbrechen
            </button>
            <button
              onClick={savePickupDate}
              className="rounded-md bg-e-brown-500 px-4 py-2 text-white hover:bg-e-brown-600 dark:bg-e-brown-700 dark:hover:bg-e-brown-600"
            >
              Speichern
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-white">
            Container Suche
          </h1>
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-e-brown-600"></div>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
