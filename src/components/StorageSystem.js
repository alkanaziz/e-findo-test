import React, { useState } from "react";
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";
import Modal from "./Modal";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import ContainerEdit from "./ContainerEdit";
import { storageData as initialStorageData } from "../data/storageData";
import { SortableRow } from "./SortableRow";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

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

  const [storageData, setStorageData] = useState(
    initialStorageData.map((item, index) => ({ ...item, index })),
  );

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

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setStorageData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        // Indizes aktualisieren
        return newItems.map((item, i) => ({ ...item, index: i }));
      });
    }
  }

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
                <th className="rounded-tl-md pl-3 font-semibold text-e-brown-800 dark:text-gray-200"></th>
                <th className="p-3 font-semibold text-e-brown-800 dark:text-gray-200">
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <tbody>
                <SortableContext
                  items={storageData}
                  strategy={verticalListSortingStrategy}
                >
                  {storageData.map((item, index) => (
                    <SortableRow
                      key={item.id}
                      index={index}
                      item={item}
                      openDatePickerModal={openDatePickerModal}
                      openEditItemModal={openEditItemModal}
                      storageData={storageData}
                    />
                  ))}
                </SortableContext>
              </tbody>
            </DndContext>
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
