import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BiFile,
  BiBarChart,
  BiLineChart,
  BiTable,
  BiErrorCircle,
  BiCube,
} from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    contentType: "",
  });

  useEffect(() => {
    let timeout;
    if (isOpen) {
      setIsVisible(true);
    } else {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const openModal = (title, contentType) => {
    setModalInfo({
      isOpen: true,
      title,
      contentType,
    });
  };

  const closeModal = () => {
    setModalInfo({
      ...modalInfo,
      isOpen: false,
    });
  };

  const menuItems = [
    {
      title: "Kontrollbelege",
      icon: BiFile,
      href: "/kontrollbelege",
      contentType: "Kontrollbelege",
    },
    {
      title: "Monatsauswertung",
      icon: BiBarChart,
      href: "/monatsauswertung",
      contentType: "Monatsauswertung",
    },
    {
      title: "Statistik",
      icon: BiLineChart,
      href: "/statistik",
      contentType: "Statistik",
    },
    {
      title: "Index",
      icon: BiTable,
      href: "/index",
      contentType: "Index",
    },
    {
      title: "Fehler",
      icon: BiErrorCircle,
      href: "/fehler",
      contentType: "Fehler",
    },
    {
      title: "Lagersysteme",
      icon: BiCube,
      href: "/lagersysteme",
      contentType: "Lagersysteme",
    },
  ];

  return (
    <div className="relative">
      {/* Öffnen-Schaltfläche */}
      <div
        className={`fixed left-0 top-1/2 z-10 flex h-16 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-r-full border border-e-brown-400 bg-e-brown-400 shadow-lg transition-all duration-300 ease-in-out hover:bg-e-brown-500 dark:border-e-background-700 ${
          isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <IoIosArrowForward className="text-e-brown-900 h-6 w-6 rounded-r-full transition-transform duration-300 hover:translate-x-1" />
      </div>

      {/* Seitenleiste */}
      {isVisible && (
        <aside
          className={`transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-x-0 opacity-100 md:max-w-full"
              : "pointer-events-none min-w-0 max-w-0 -translate-x-full opacity-0"
          } relative rounded-lg border border-e-brown-400 bg-e-background-50 shadow-lg dark:bg-e-background-800`}
        >
          {/* Schließen-Schaltfläche */}
          <div
            className="hidden w-full cursor-pointer rounded-t-lg bg-e-brown-400 transition-colors duration-300 hover:bg-e-brown-500 md:block"
            onClick={() => setIsOpen(false)}
          >
            <IoIosArrowBack className="text-e-brown-900 h-6 w-full rounded-t-lg shadow-sm transition-transform duration-300 hover:-translate-x-1" />
          </div>
          {/* Menüinhalt */}
          <nav className="flex h-full flex-wrap justify-evenly gap-3 p-3 *:max-w-28 *:rounded-lg *:border *:border-e-brown-400 md:h-[calc(100vh-12rem)] md:flex-col md:flex-nowrap md:justify-between">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors hover:bg-[#9F8170]"
                onClick={() => openModal(item.title, item.contentType)}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <item.icon className="size-7 md:size-10" />
                </div>
                <span className="mt-1 px-1 text-center text-[11px] font-medium">
                  {item.title}
                </span>
              </div>
            ))}
          </nav>
        </aside>
      )}

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

export default Sidebar;
