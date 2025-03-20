import React, { useState } from "react";
import { MdOutlineOpenInFull } from "react-icons/md";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";

const StorageSystem = ({ isInModal = false }) => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "Lagersysteme",
    contentType: "Lagersysteme",
  });

  const openModal = () => {
    setModalInfo({
      ...modalInfo,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalInfo({
      ...modalInfo,
      isOpen: false,
    });
  };

  // Beispieldaten
  const storageData = [
    {
      id: "CMS-3001",
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
      liveStatus: true,
      maxWeight: "6000kg",
      material: "Mischschrott",
      company: "e-findo GmbH",
      nettoWeight: "1760 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 29.33,
      pickupDate: null,
      systemDate: "01.04.2025 12:12",
    },
    {
      id: "CMS-7001",
      liveStatus: false,
      maxWeight: "2500kg",
      material: "Eisenspäne",
      company: "e-findo GmbH",
      nettoWeight: "405 kg",
      monthlyPrice: "2025/März : 0,00 €",
      fillLevel: 16.2,
      pickupDate: null,
      systemDate: "09.04.2025 07:00",
    },
    {
      id: "CMS-7002",
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
      liveStatus: true,
      maxWeight: "3500kg",
      material: "Kupferkabel",
      company: "Metall GmbH",
      nettoWeight: "1240 kg",
      monthlyPrice: "2025/März : 125,50 €",
      fillLevel: 35.43,
      pickupDate: "15.04.2025",
      systemDate: "12.04.2025 14:30",
    },
    {
      id: "CMS-4023",
      liveStatus: false,
      maxWeight: "4200kg",
      material: "Edelstahl",
      company: "Recycling AG",
      nettoWeight: "980 kg",
      monthlyPrice: "2025/März : 87,20 €",
      fillLevel: 23.33,
      pickupDate: null,
      systemDate: "05.04.2025 09:45",
    },
    {
      id: "CMS-8034",
      liveStatus: true,
      maxWeight: "5000kg",
      material: "Leichtmetall",
      company: "Wertstoff KG",
      nettoWeight: "1680 kg",
      monthlyPrice: "2025/März : 143,75 €",
      fillLevel: 33.6,
      pickupDate: null,
      systemDate: "18.04.2025 11:15",
    },
    {
      id: "CMS-6045",
      liveStatus: true,
      maxWeight: "3800kg",
      material: "Stahlschrott",
      company: "e-findo GmbH",
      nettoWeight: "1125 kg",
      monthlyPrice: "2025/März : 92,30 €",
      fillLevel: 29.61,
      pickupDate: null,
      systemDate: "07.04.2025 16:20",
    },
  ];

  return (
    <div className="w-full rounded-lg border border-e-brown-400 bg-e-background-50 p-2 shadow-lg dark:border-e-background-700 dark:bg-e-background-800">
      <div className="mb-2 flex w-full items-center justify-between">
        {!isInModal && (
          <button
            onClick={openModal}
            className="rounded-full p-1 text-e-background-500 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-background-300 dark:hover:bg-e-background-700 dark:hover:text-white"
            aria-label="Büyüt"
          >
            <MdOutlineOpenInFull className="size-5" />
          </button>
        )}
        <h2
          className={`text-center text-lg font-semibold dark:text-gray-200 ${isInModal ? "w-full" : ""}`}
        >
          Lagersystem
        </h2>
        {!isInModal && <div className="w-5"></div>}{" "}
        {/* Dengelemek için boş div */}
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
                  className="border-b border-e-brown-400 text-sm hover:bg-e-brown-100 dark:hover:bg-e-background-700"
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
                          <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></div>
                          <div className="relative h-5 w-5 rounded-full bg-red-500"></div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-3 dark:text-gray-300">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.id}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.maxWeight}
                      </span>
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
                    <div className="flex items-center">
                      <FaEdit className="mr-1 size-4" />
                      {item.monthlyPrice}
                    </div>
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
                    className={`flex items-center gap-2 p-3 dark:text-gray-300 ${
                      index === storageData.length - 1 ? "rounded-br-md" : ""
                    }`}
                  >
                    <FaCalendarAlt className="mr-1 size-4 text-e-brown-600 dark:text-e-brown-400" />
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

      {/* Modal */}
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        title={modalInfo.title}
      >
        <ModalContent contentType={modalInfo.contentType} />
      </Modal>
    </div>
  );
};

export default StorageSystem;
