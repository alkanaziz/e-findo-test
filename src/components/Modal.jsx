import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-e-background-800 dark:text-white">
        <div className="mb-4 flex items-center justify-between border-b border-e-brown-200 pb-3 dark:border-e-background-700">
          <h3 className="text-xl font-medium text-e-brown-800 dark:text-e-brown-200">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-e-background-500 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-background-300 dark:hover:bg-e-background-700 dark:hover:text-white"
            aria-label="Schließen"
          >
            <IoMdClose className="size-6" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
