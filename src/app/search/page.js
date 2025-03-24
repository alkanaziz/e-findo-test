"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ContainerCard from "@/components/ContainerCard";
import Modal from "@/components/Modal";

function SearchPageContent() {
  const searchParams = useSearchParams();

  // URL parametrelerinden arama terimlerini alın
  const initialTerm = searchParams.get("term") || "";
  const initialMaterial = searchParams.get("material") || "";
  const initialCompany = searchParams.get("company") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialDateFrom = searchParams.get("dateFrom") || "";
  const initialDateTo = searchParams.get("dateTo") || "";
  const initialDateType = searchParams.get("dateType") || "systemDate";

  // StorageSystem.js dosyasındaki örnek verileri kullanın
  const [containers, setContainers] = useState([
    {
      id: "CMS-3001",
      containerName: "CMS-3001",
      liveStatus: true,
      maxWeight: "2600kg",
      material: "Aluminium Profile AlSi1, Fe frei",
      company: "e-findo GmbH",
      nettoWeight: "890 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 34.23,
      pickupDate: null,
      systemDate: "20.03.2025 12:12",
    },
    {
      id: "CMS-7038",
      containerName: "CMS-7038",
      liveStatus: true,
      maxWeight: "6000kg",
      material: "Mischschrott",
      company: "e-findo GmbH",
      nettoWeight: "1760 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 29.33,
      pickupDate: null,
      systemDate: "15.03.2025 12:12",
    },
    {
      id: "CMS-7001",
      containerName: "CMS-7001",
      liveStatus: false,
      maxWeight: "2500kg",
      material: "Eisenspäne",
      company: "e-findo GmbH",
      nettoWeight: "405 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 16.2,
      pickupDate: null,
      systemDate: "10.03.2025 07:00",
    },
    {
      id: "CMS-7002",
      containerName: "CMS-7002",
      liveStatus: true,
      maxWeight: "2750kg",
      material: "Aluminium Profile AlSi1, Fe frei",
      company: "e-findo GmbH",
      nettoWeight: "575 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 20.9,
      pickupDate: null,
      systemDate: "15.03.2025 12:12",
    },
    {
      id: "CMS-5012",
      containerName: "CMS-5012",
      liveStatus: true,
      maxWeight: "3500kg",
      material: "Kupferkabel",
      company: "Metall GmbH",
      nettoWeight: "1240 kg",
      monthlyPrice: "2025/März : 125,50 €",
      fillLevel: 35.43,
      pickupDate: "15.04.2025",
      systemDate: "12.03.2025 14:30",
    },
    {
      id: "CMS-4023",
      containerName: "CMS-4023",
      liveStatus: false,
      maxWeight: "4200kg",
      material: "Edelstahl",
      company: "Recycling AG",
      nettoWeight: "980 kg",
      monthlyPrice: "2025/März : 87,20 €",
      fillLevel: 23.33,
      pickupDate: null,
      systemDate: "05.03.2025 09:45",
    },
    {
      id: "CMS-8034",
      containerName: "CMS-8034",
      liveStatus: true,
      maxWeight: "5000kg",
      material: "Leichtmetall",
      company: "Wertstoff KG",
      nettoWeight: "1680 kg",
      monthlyPrice: "2025/März : 143,75 €",
      fillLevel: 33.6,
      pickupDate: null,
      systemDate: "18.03.2025 11:15",
    },
    {
      id: "CMS-6045",
      containerName: "CMS-6045",
      liveStatus: true,
      maxWeight: "3800kg",
      material: "Stahlschrott",
      company: "e-findo GmbH",
      nettoWeight: "1125 kg",
      monthlyPrice: "2025/März : 92,30 €",
      fillLevel: 29.61,
      pickupDate: null,
      systemDate: "07.03.2025 16:20",
    },
    {
      id: "CMS-9056",
      containerName: "CMS-9056",
      liveStatus: true,
      maxWeight: "4500kg",
      material: "Messingspäne",
      company: "Metall GmbH",
      nettoWeight: "1850 kg",
      monthlyPrice: "2025/März : 165,90 €",
      fillLevel: 41.11,
      pickupDate: "20.04.2025",
      systemDate: "22.03.2025 08:45",
    },
    {
      id: "CMS-2067",
      containerName: "CMS-2067",
      liveStatus: false,
      maxWeight: "3200kg",
      material: "Kupferdrähte",
      company: "Recycling AG",
      nettoWeight: "960 kg",
      monthlyPrice: "2025/März : 112,40 €",
      fillLevel: 30.0,
      pickupDate: null,
      systemDate: "25.03.2025 13:20",
    },
    {
      id: "CMS-1078",
      containerName: "CMS-1078",
      liveStatus: true,
      maxWeight: "5500kg",
      material: "Aluminiumspäne",
      company: "Wertstoff KG",
      nettoWeight: "2100 kg",
      monthlyPrice: "2025/März : 178,25 €",
      fillLevel: 38.18,
      pickupDate: "10.04.2025",
      systemDate: "28.03.2025 15:50",
    },
    {
      id: "CMS-4089",
      containerName: "CMS-4089",
      liveStatus: true,
      maxWeight: "4800kg",
      material: "Zinkschrott",
      company: "e-findo GmbH",
      nettoWeight: "1560 kg",
      monthlyPrice: "2025/März : 134,60 €",
      fillLevel: 32.5,
      pickupDate: null,
      systemDate: "30.03.2025 10:15",
    },
  ]);

  const [filteredContainers, setFilteredContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modaller için state
  const [datePickerModal, setDatePickerModal] = useState({
    isOpen: false,
    itemId: null,
  });

  const [selectedDate, setSelectedDate] = useState("");

  // İlk yükleme sırasında ve URL parametreleri değiştiğinde filtreleme yapın
  useEffect(() => {
    filterContainers({
      searchTerm: initialTerm,
      material: initialMaterial,
      company: initialCompany,
      status: initialStatus,
      dateFrom: initialDateFrom,
      dateTo: initialDateTo,
      dateType: initialDateType
    });
    setLoading(false);
  }, [
    initialTerm,
    initialMaterial,
    initialCompany,
    initialStatus,
    initialDateFrom,
    initialDateTo,
    initialDateType
  ]);

  // Konteyner verilerini filtrele
  const filterContainers = (filters) => {
    let filtered = [...containers];

    // Genel arama terimi uygulandı
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

    // Malzeme filtresi
    if (filters.material) {
      filtered = filtered.filter((container) =>
        container.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }

    // Şirket filtresi
    if (filters.company) {
      filtered = filtered.filter((container) =>
        container.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Durum filtresi
    if (filters.status) {
      const statusValue = filters.status === "true";
      filtered = filtered.filter(
        (container) => container.liveStatus === statusValue
      );
    }

    // Tarih filtreleri
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter((container) => {
        // Hangi tarih alanı üzerinde filtreleme yapılacağını belirle
        const dateField = filters.dateType === "pickupDate" ? "pickupDate" : "systemDate";

        // Tarihi al ve kontrol et
        if (dateField === "pickupDate" && !container.pickupDate) {
          // Eğer pickupDate seçildi ama container'ın pickupDate'i yoksa
          // ve bir date aralığı belirlendiyse, bu container'ı filtreleme listesinden çıkar
          return false;
        }

        // Tarihi tarih nesnesine dönüştür
        const dateParts = container[dateField]?.split(" ")[0].split(".");
        if (!dateParts || dateParts.length !== 3) {
          return false; // Geçersiz tarih formatı
        }

        const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        if (isNaN(date.getTime())) {
          return false; // Geçersiz tarih
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

  // SearchBar bileşeninden gelen arama işlemini yönet
  const handleSearch = (filters) => {
    filterContainers(filters);
  };

  // Tarih düzenleme modalını açın
  const openDatePickerModal = (itemId) => {
    setDatePickerModal({
      isOpen: true,
      itemId,
    });

    // Mevcut tarihi bulun (varsa)
    const item = containers.find((item) => item.id === itemId);
    if (item && item.pickupDate) {
      setSelectedDate(formatDateForInput(item.pickupDate));
    } else {
      // Yoksa bugünün tarihini ayarlayın
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

  // Konteyner düzenleme işlemi
  const handleEditContainer = (updatedContainer) => {
    // Orijinal konteyner listesini güncelleyin
    setContainers((prevData) =>
      prevData.map((item) =>
        item.id === updatedContainer.id ? updatedContainer : item
      )
    );

    // Filtre uygulanan listeyi de güncelleyin (arama sonuçlarını güncel tutmak için)
    setFilteredContainers((prevData) =>
      prevData.map((item) =>
        item.id === updatedContainer.id ? updatedContainer : item
      )
    );
  };

  // Alman tarih formatını (DD.MM.YYYY) giriş için uygun formata dönüştürün (YYYY-MM-DD)
  const formatDateForInput = (germanDate) => {
    if (!germanDate) return "";
    const [day, month, year] = germanDate.split(".");
    return `${year}-${month}-${day}`;
  };

  // Giriş formatını (YYYY-MM-DD) Alman tarih formatına (DD.MM.YYYY) dönüştürün
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

      // Orijinal konteyner listesini güncelleyin
      setContainers((prevData) =>
        prevData.map((item) =>
          item.id === datePickerModal.itemId
            ? { ...item, pickupDate: formattedDate }
            : item
        )
      );

      // Filtre uygulanan listeyi de güncelleyin (arama sonuçlarını güncel tutmak için)
      setFilteredContainers((prevData) =>
        prevData.map((item) =>
          item.id === datePickerModal.itemId
            ? { ...item, pickupDate: formattedDate }
            : item
        )
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
            dateType: initialDateType
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
            <div key={container.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <ContainerCard
                container={container}
                onEditClick={handleEditContainer}
                onDateClick={openDatePickerModal}
              />
            </div>
          ))}
        </div>
      )}

      {/* Tarih Seçme Modalı */}
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
                    (item) => item.id === datePickerModal.itemId
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
    <Suspense fallback={
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-e-brown-800 dark:text-white">
          Container Suche
        </h1>
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-e-brown-600"></div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
} 