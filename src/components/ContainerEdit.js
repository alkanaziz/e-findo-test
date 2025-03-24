import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const ContainerEdit = ({
  isOpen,
  onClose,
  item,
  onSave
}) => {
  const [editedItem, setEditedItem] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleEditItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setEditedItem((prev) => ({
      ...prev,
      [name]: newValue,
    }));
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

  // Helper function to extract price value from string like "2025/März : 125,50 €"
  const extractPriceValue = (priceString) => {
    const matches = priceString.match(/:\s*(\d+,\d+)\s*€/);
    return matches ? matches[1] : "0,00";
  };

  // Helper function to create price string (2025/März : 125,50 €)
  const createPriceString = (value) => {
    // Extract month and year from the original string if available
    if (editedItem && editedItem.monthlyPrice) {
      const matches = editedItem.monthlyPrice.match(/(\d+\/\w+)/);
      const datePrefix = matches ? matches[1] : "2025/März"; // Default if can't extract
      return `${datePrefix} : ${value} €`;
    }
    return `2025/März : ${value} €`; // Default fallback
  };

  const validateItem = (item) => {
    const errors = {};

    // ID validation: Format CMS-XXXX where X is a number
    if (!item.id.match(/^CMS-\d{4}$/)) {
      errors.id = "ID muss im Format CMS-XXXX sein (X = Zahl)";
    }

    // Weight validations
    const nettoWeight = parseFloat(item.nettoWeight);
    const maxWeight = parseFloat(item.maxWeight);

    if (isNaN(nettoWeight) || nettoWeight <= 0) {
      errors.nettoWeight = "Nettogewicht muss eine positive Zahl sein";
    }

    if (isNaN(maxWeight) || maxWeight <= 0) {
      errors.maxWeight = "Maximalgewicht muss eine positive Zahl sein";
    }

    if (nettoWeight > maxWeight) {
      errors.nettoWeight =
        "Nettogewicht kann nicht größer als Maximalgewicht sein";
    }

    // Fill level validation (between 0 and 100)
    if (item.fillLevel < 0 || item.fillLevel > 100) {
      errors.fillLevel = "Füllgrad muss zwischen 0 und 100 liegen";
    }

    // Price validation (positive number)
    const price = parseFloat(
      extractPriceValue(item.monthlyPrice).replace(",", "."),
    );
    if (isNaN(price) || price < 0) {
      errors.monthlyPrice = "Preis muss eine positive Zahl sein";
    }

    // System date validation
    const systemDate = new Date(
      item.systemDate.split(" ")[0].split(".").reverse().join("-"),
    );
    if (isNaN(systemDate.getTime())) {
      errors.systemDate = "Ungültiges Systemdatum";
    }

    // Pickup date validation (if exists)
    if (item.pickupDate) {
      const pickupDate = new Date(
        item.pickupDate.split(".").reverse().join("-"),
      );
      const today = new Date();

      if (isNaN(pickupDate.getTime())) {
        errors.pickupDate = "Ungültiges Abholdatum";
      } else if (pickupDate < today) {
        errors.pickupDate = "Abholdatum kann nicht in der Vergangenheit liegen";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (editedItem && validateItem(editedItem)) {
      onSave(editedItem);
      onClose();
    }
  };

  if (!editedItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${editedItem?.material || ""} (${editedItem?.id || ""}) bearbeiten`}
    >
      <div className="flex flex-col gap-4">
        {/* Özet bilgiler */}
        <div className="mb-2 rounded-lg bg-e-background-100 p-3 dark:bg-e-background-700">
          <h3 className="mb-2 font-medium text-e-brown-700 dark:text-e-brown-300">
            Aktuelle Daten für {editedItem.id}:
          </h3>
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Material:</span>
              <span>{editedItem.material}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Netto Gewicht:</span>
              <span>{editedItem.nettoWeight}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Füllgrad:</span>
              <span>{editedItem.fillLevel}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <span
                className={`flex items-center ${editedItem.liveStatus ? "text-green-600" : "text-red-600"}`}
              >
                {editedItem.liveStatus ? (
                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                ) : (
                  <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
                )}
                {editedItem.liveStatus ? "Aktiv" : "Inaktiv"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Live Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Live Status:
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="liveStatus"
                name="liveStatus"
                checked={editedItem.liveStatus}
                onChange={handleEditItemChange}
                className="h-4 w-4 rounded border-e-brown-300 bg-e-background-50 text-e-brown-500 focus:ring-e-brown-400 dark:border-e-background-600 dark:bg-e-background-700"
              />
              <label htmlFor="liveStatus" className="ml-2 text-sm">
                Aktiv
              </label>
            </div>
          </div>

          {/* Masch-ID */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="id"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Masch-ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={editedItem.id}
              onChange={handleEditItemChange}
              className={`rounded-md border ${validationErrors.id
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.id && (
              <span className="text-xs text-red-500">
                {validationErrors.id}
              </span>
            )}
          </div>

          {/* Max Weight */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="maxWeight"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Max Netto:
            </label>
            <input
              type="text"
              id="maxWeight"
              name="maxWeight"
              value={editedItem.maxWeight}
              onChange={handleEditItemChange}
              className={`rounded-md border ${validationErrors.maxWeight
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.maxWeight && (
              <span className="text-xs text-red-500">
                {validationErrors.maxWeight}
              </span>
            )}
          </div>

          {/* Material */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="material"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Material:
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={editedItem.material}
              onChange={handleEditItemChange}
              className="rounded-md border border-e-brown-300 p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="company"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Entsorger:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={editedItem.company}
              onChange={handleEditItemChange}
              className="rounded-md border border-e-brown-300 p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
            />
          </div>

          {/* Netto Weight */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nettoWeight"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Netto Weight:
            </label>
            <input
              type="text"
              id="nettoWeight"
              name="nettoWeight"
              value={editedItem.nettoWeight}
              onChange={handleEditItemChange}
              className={`rounded-md border ${validationErrors.nettoWeight
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.nettoWeight && (
              <span className="text-xs text-red-500">
                {validationErrors.nettoWeight}
              </span>
            )}
          </div>

          {/* Monthly Price */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Monatlicher Preis (€):
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={extractPriceValue(editedItem.monthlyPrice)}
              onChange={(e) => {
                // Update the full price string when price changes
                const newPrice = createPriceString(e.target.value);
                setEditedItem({
                  ...editedItem,
                  monthlyPrice: newPrice,
                });
              }}
              className={`rounded-md border ${validationErrors.monthlyPrice
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.monthlyPrice && (
              <span className="text-xs text-red-500">
                {validationErrors.monthlyPrice}
              </span>
            )}
          </div>

          {/* Fill Level */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fillLevel"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Füllgrad (%):
            </label>
            <input
              type="number"
              id="fillLevel"
              name="fillLevel"
              min="0"
              max="100"
              step="0.01"
              value={editedItem.fillLevel}
              onChange={handleEditItemChange}
              className={`rounded-md border ${validationErrors.fillLevel
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.fillLevel && (
              <span className="text-xs text-red-500">
                {validationErrors.fillLevel}
              </span>
            )}
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-pickup-date"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Abholdatum:
            </label>
            <input
              type="date"
              id="edit-pickup-date"
              value={
                editedItem.pickupDate
                  ? formatDateForInput(editedItem.pickupDate)
                  : ""
              }
              onChange={(e) => {
                const formattedDate = e.target.value
                  ? formatDateForDisplay(e.target.value)
                  : null;
                setEditedItem({
                  ...editedItem,
                  pickupDate: formattedDate,
                });
              }}
              className={`rounded-md border ${validationErrors.pickupDate
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.pickupDate && (
              <span className="text-xs text-red-500">
                {validationErrors.pickupDate}
              </span>
            )}
          </div>

          {/* System Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="systemDate"
              className="text-sm font-medium text-e-brown-600 dark:text-e-brown-400"
            >
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-e-brown-400"></span>
              Systemdatum:
            </label>
            <input
              type="text"
              id="systemDate"
              name="systemDate"
              value={editedItem.systemDate}
              onChange={handleEditItemChange}
              className={`rounded-md border ${validationErrors.systemDate
                ? "border-red-500"
                : "border-e-brown-300"
                } p-2 focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400`}
            />
            {validationErrors.systemDate && (
              <span className="text-xs text-red-500">
                {validationErrors.systemDate}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              setValidationErrors({});
              onClose();
            }}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-e-background-700 dark:text-gray-200 dark:hover:bg-e-background-600"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-e-brown-500 px-4 py-2 text-white hover:bg-e-brown-600 dark:bg-e-brown-700 dark:hover:bg-e-brown-600"
          >
            Speichern
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContainerEdit; 