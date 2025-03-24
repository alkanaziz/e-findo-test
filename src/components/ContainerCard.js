import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import ContainerEdit from "./ContainerEdit";

const ContainerCard = ({ container, onEditClick, onDateClick }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditSave = (updatedContainer) => {
    onEditClick(updatedContainer);
  };

  return (
    <div className="h-full w-full rounded-lg border border-e-brown-400 bg-white p-4 shadow-md transition-all hover:shadow-lg dark:border-e-background-700 dark:bg-e-background-800">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Canlı durum göstergesi */}
          <div className="relative h-4 w-4">
            {container.liveStatus ? (
              <>
                <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
                <div className="relative h-4 w-4 rounded-full bg-green-500"></div>
              </>
            ) : (
              <div className="relative h-4 w-4 rounded-full bg-red-500"></div>
            )}
          </div>

          {/* Konteyner ID */}
          <h3 className="text-base font-semibold text-e-brown-700 dark:text-gray-200">
            {container.id}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Düzenleme butonu */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-full p-1 text-e-brown-600 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:bg-e-background-700 dark:hover:text-white"
            aria-label="Container bearbeiten"
          >
            <FaEdit className="size-4" />
          </button>

          {/* ContainerEdit modal */}
          <ContainerEdit
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            item={container}
            onSave={handleEditSave}
          />

          {/* Tarih düzenleme butonu */}
          <button
            onClick={() => onDateClick(container.id)}
            className="rounded-full p-1 text-e-brown-600 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:bg-e-background-700 dark:hover:text-white"
            aria-label="Abholdatum bearbeiten"
          >
            <FaCalendarAlt className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Material:</span>
          <p className="dark:text-gray-300">{container.material}</p>
        </div>

        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Entsorger:</span>
          <p className="dark:text-gray-300">{container.company}</p>
        </div>

        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Max Gewicht:</span>
          <p className="dark:text-gray-300">{container.maxWeight}</p>
        </div>

        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Netto Gewicht:</span>
          <p className="dark:text-gray-300">{container.nettoWeight}</p>
        </div>

        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Monatspreis:</span>
          <p className="dark:text-gray-300">{container.monthlyPrice}</p>
        </div>

        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Abholdatum:</span>
          <p className="dark:text-gray-300">
            {container.pickupDate ? (
              container.pickupDate
            ) : (
              <span className="text-red-500">Nicht festgelegt</span>
            )}
          </p>
        </div>
      </div>

      {/* Doluluk göstergesi */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between">
          <span className="text-xs font-medium dark:text-gray-400">Füllstand</span>
          <span className="text-xs font-medium dark:text-gray-300">{container.fillLevel}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-green-600"
            style={{ width: `${container.fillLevel}%` }}
          ></div>
        </div>
      </div>

      {/* Sistem tarihi */}
      <div className="mt-3 text-right text-xs text-gray-500 dark:text-gray-400">
        Systemdatum: {container.systemDate}
      </div>
    </div>
  );
};

export default ContainerCard; 