"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";

export function SortableRow({
  item,
  index,
  storageData,
  openDatePickerModal,
  openEditItemModal,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      key={item.id}
      className={`border-b ${!item.liveStatus ? "bg-red-100 dark:bg-red-900" : ""} border-e-brown-400 text-sm hover:bg-e-brown-100 dark:hover:bg-e-background-700`}
    >
      <td>
        <button
          {...attributes}
          {...listeners}
          className="flex cursor-move items-center justify-center pl-3 dark:text-gray-300"
          aria-label="Reihenfolge ändern"
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ touchAction: "none" }}
        >
          <MdOutlineDragIndicator />
        </button>
      </td>
      <td className="mx-auto w-5 p-3 dark:text-gray-300">
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
            <span className="text-xs font-medium">{item.fillLevel}%</span>
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
        className={`flex items-center p-3 dark:text-gray-300 ${
          index === storageData.length - 1 ? "rounded-br-md" : ""
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
            <span className="flex items-center text-xs">{item.pickupDate}</span>
          ) : (
            <span className="text-xs text-red-500">kein Abholdatum</span>
          )}
          {item.systemDate ? (
            <span className="text-xs">{item.systemDate}</span>
          ) : (
            <span className="text-xs text-red-500">kein Systemdatum</span>
          )}
        </div>
      </td>
    </tr>
  );
}
