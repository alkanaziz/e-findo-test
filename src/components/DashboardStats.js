import Image from "next/image";
import { FaCircleInfo } from "react-icons/fa6";

export default function DashboardStats() {
  return (
    <div className="flex w-full flex-col gap-2 *:h-[150px] *:rounded-lg *:bg-e-background-50 *:shadow-sm *:shadow-e-brown-500/20 dark:*:bg-e-background-700 dark:*:shadow-none sm:grid sm:grid-cols-2 lg:flex lg:flex-row *:lg:w-1/4">
      <div className="ContainerImage">
        <Image
          className="h-full w-full rounded-lg object-contain dark:bg-e-background-700"
          src="/container-img.png"
          alt="Container"
          width={100}
          height={100}
        />
      </div>
      <div className="CurrentStatus flex flex-col justify-between gap-2 p-5">
        <div className="relative flex w-full items-center justify-center border-b-2 border-e-brown-400 pb-2">
          <FaCircleInfo className="absolute left-0 text-e-background-500 dark:text-gray-400" />
          <p>
            <span className="text-sm dark:text-gray-200 xl:text-base">
              Aktuell: 10.03.2025
            </span>
          </p>
        </div>
        <p className="flex justify-between">
          <span className="text-sm dark:text-gray-300">
            Aktuelle Lagermenge Container:
          </span>
          <span className="text-sm font-semibold dark:text-gray-200">
            3395 kg
          </span>
        </p>
        <p className="flex justify-between">
          <span className="text-sm dark:text-gray-300">Erlös:</span>
          <span className="text-sm font-semibold dark:text-gray-200">0 €</span>
        </p>
      </div>
      <div className="MonthlyOverview flex flex-col justify-between gap-2 p-5">
        <div className="relative flex w-full items-center justify-center border-b-2 border-e-brown-400 pb-2">
          <FaCircleInfo className="absolute left-0 text-e-background-500 dark:text-gray-400" />
          <p className="">
            <span className="text-sm dark:text-gray-200 xl:text-base">
              Laufender Monat: März
            </span>
          </p>
        </div>
        <p className="flex justify-between">
          <span className="text-sm dark:text-gray-300">Abgeholte Menge:</span>
          <span className="text-sm font-semibold dark:text-gray-200">
            3395 kg
          </span>
        </p>
        <p className="flex justify-between">
          <span className="text-sm dark:text-gray-300">Erlös:</span>
          <span className="text-sm font-semibold dark:text-gray-200">0 €</span>
        </p>
      </div>
      <div className="valueAddedSuccess flex flex-col justify-between gap-2 p-5">
        <div className="relative flex w-full items-center justify-center border-b-2 border-e-brown-400 pb-2">
          <FaCircleInfo className="absolute left-0 text-e-background-500 dark:text-gray-400" />
          <p className="">
            <span className="text-sm dark:text-gray-200 xl:text-base">
              MehrWert Erfolg
            </span>
          </p>
        </div>
        <p className="flex justify-between">
          <span className="text-sm dark:text-gray-300">Gesamterlöse:</span>
          <span className="text-sm font-semibold dark:text-gray-200">0 €</span>
        </p>
        <p className="dark:text-gray-300">
          <span> </span>
        </p>
        <p className="dark:text-gray-300">
          <span> </span>
        </p>
      </div>
    </div>
  );
}
