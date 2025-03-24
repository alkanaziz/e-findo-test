import React, { useState } from "react";
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";
import Modal from "./Modal";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import ContainerEdit from "./ContainerEdit";

const StorageSystem = ({ isInModal = false, onToggleFullscreen = null }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [datePickerModal, setDatePickerModal] = useState({
    isOpen: false,
    itemId: null,
  });

  const [editItemModal, setEditItemModal] = useState({
    isOpen: false,
    item: null,
  });

  const [selectedDate, setSelectedDate] = useState("");

  // Beispieldaten - mit useState verwalten
  const [storageData, setStorageData] = useState([
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (onToggleFullscreen) {
      onToggleFullscreen(!isFullscreen);
    }
  };

  const openDatePickerModal = (itemId) => {
    setDatePickerModal({
      isOpen: true,
      itemId,
    });

    // Aktuelles Datum finden (falls vorhanden)
    const item = storageData.find((item) => item.id === itemId);
    if (item && item.pickupDate) {
      setSelectedDate(formatDateForInput(item.pickupDate));
    } else {
      // falls nicht vorhanden, standardmäßig das heutige Datum setzen
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

  const openEditItemModal = (item) => {
    setEditItemModal({
      isOpen: true,
      item,
    });
  };

  const closeEditItemModal = () => {
    setEditItemModal({
      isOpen: false,
      item: null,
    });
  };

  // Deutsches Datumsformat in ein für Input geeignetes Format umwandeln (DD.MM.YYYY -> YYYY-MM-DD)
  const formatDateForInput = (germanDate) => {
    if (!germanDate) return "";
    const [day, month, year] = germanDate.split(".");
    return `${year}-${month}-${day}`;
  };

  // Input format in das Deutsche Datumsformat umwandeln (YYYY-MM-DD -> DD.MM.YYYY)
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

      setStorageData((prevData) =>
        prevData.map((item) =>
          item.id === datePickerModal.itemId
            ? { ...item, pickupDate: formattedDate }
            : item,
        ),
      );

      closeDatePickerModal();
    }
  };

  const handleSaveEditedItem = (editedItem) => {
    setStorageData((prevData) =>
      prevData.map((item) => (item.id === editedItem.id ? editedItem : item)),
    );
  };

  return (
    <div className="w-full rounded-lg border border-e-brown-400 bg-e-background-50 p-2 shadow-lg dark:border-e-background-700 dark:bg-e-background-800">
      <div className="mb-2 flex w-full items-center justify-between">
        {!isInModal && (
          <button
            onClick={toggleFullscreen}
            className="rounded-full p-1 text-e-background-500 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-background-300 dark:hover:bg-e-background-700 dark:hover:text-white"
            aria-label={isFullscreen ? "Vollbild beenden" : "Vollbild"}
          >
            {isFullscreen ? (
              <MdOutlineCloseFullscreen className="size-5" />
            ) : (
              <MdOutlineOpenInFull className="size-5" />
            )}
          </button>
        )}
        <h2
          className={`text-center text-lg font-semibold dark:text-gray-200 ${isInModal ? "w-full" : ""}`}
        >
          Lagersystem
        </h2>
        {!isInModal && <div className="w-5"></div>}{" "}
        {/* Leeres div für die Ausrichtung */}
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs lg:text-sm">
              <tr className="bg-gradient-to-r from-e-brown-200 to-e-brown-300 text-left dark:from-e-background-700 dark:to-e-background-600">
                <th className="rounded-tl-md p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  Live Status
                </th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  <div className="flex flex-col">
                    <span>Masch-ID</span>
                    <span className="text-xs font-normal opacity-75">
                      Max Netto
                    </span>
                  </div>
                </th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  <div className="flex flex-col">
                    <span>Material</span>
                    <span className="text-xs font-normal opacity-75">
                      Entsorger
                    </span>
                  </div>
                </th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  Netto (kg)
                </th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  Monatlicher Preis
                </th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  Füllgrad
                </th>
                <th className="rounded-tr-md p-3 font-semibold text-e-brown-800 dark:text-gray-200">
                  <div className="flex flex-col">
                    <span>Abholdatum</span>
                    <span className="text-xs font-normal opacity-75">
                      Systemdatum
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {storageData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b ${!item.liveStatus ? "bg-red-100 dark:bg-red-900" : ""} border-e-brown-400 text-sm hover:bg-e-brown-100 dark:hover:bg-e-background-700`}
                >
                  <td className="mx-auto w-10 p-3 dark:text-gray-300">
                    {item.liveStatus ? (
                      <div className="flex items-center">
                        <div className="relative h-5 w-5">
                          <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
                          <div className="relative h-5 w-5 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="relative h-5 w-5">
                          <div className="absolute inset-0 rounded-full bg-red-400 opacity-75"></div>
                          <div className="relative h-5 w-5 rounded-full bg-red-500"></div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditItemModal(item)}
                        className="mr-1 rounded-full text-e-brown-600 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:bg-e-background-700 dark:hover:text-white"
                        aria-label="Item bearbeiten"
                      >
                        <FaEdit className="size-4" />
                      </button>

                      <div className="flex flex-col">
                        <span className="font-medium">{item.id}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.maxWeight}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 dark:text-gray-300">
                    <div className="flex flex-col">
                      <span>{item.material}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.company}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 dark:text-gray-300">{item.nettoWeight}</td>
                  <td className="p-3 dark:text-gray-300">
                    <div className="flex items-center">{item.monthlyPrice}</div>
                  </td>
                  <td className="p-3 dark:text-gray-300">
                    <div className="w-full">
                      <div className="mb-1 flex justify-between">
                        <span className="text-xs font-medium">
                          {item.fillLevel}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2.5 rounded-full bg-green-600"
                          style={{ width: `${item.fillLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`flex items-center p-3 dark:text-gray-300 ${index === storageData.length - 1 ? "rounded-br-md" : ""
                      }`}
                  >
                    <button
                      onClick={() => openDatePickerModal(item.id)}
                      className="rounded-full text-e-brown-600 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:bg-e-background-700 dark:hover:text-white"
                      aria-label="Abholdatum bearbeiten"
                    >
                      <FaCalendarAlt className="mr-1 size-4" />
                    </button>
                    <div className="flex flex-col">
                      {item.pickupDate ? (
                        <span className="flex items-center text-xs">
                          {item.pickupDate}
                        </span>
                      ) : (
                        <span className="text-xs text-red-500">
                          kein Abholdatum
                        </span>
                      )}
                      {item.systemDate ? (
                        <span className="text-xs">{item.systemDate}</span>
                      ) : (
                        <span className="text-xs text-red-500">
                          kein Systemdatum
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Picker Modal */}
      <Modal
        isOpen={datePickerModal.isOpen}
        onClose={closeDatePickerModal}
        title={`Abholdatum für ${storageData.find((item) => item.id === datePickerModal.itemId)?.id || ""} bearbeiten`}
      >
        <div className="flex flex-col gap-4">
          {datePickerModal.itemId && (
            <div className="mb-2 rounded-lg bg-e-background-100 p-3 dark:bg-e-background-700">
              <div className="grid grid-cols-1 gap-2 text-sm">
                {(() => {
                  const item = storageData.find(
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

      {/* Container Edit Component */}
      <ContainerEdit
        isOpen={editItemModal.isOpen}
        onClose={closeEditItemModal}
        item={editItemModal.item}
        onSave={handleSaveEditedItem}
      />
    </div>
  );
};

export default StorageSystem;
