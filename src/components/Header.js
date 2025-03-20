"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBell, FaRegMoon, FaSun } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";
import MobileMenu from "./MobileMenu";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky left-0 top-0 z-50 w-full rounded-b-2xl bg-white shadow-md shadow-e-brown-500 dark:bg-e-background-800 lg:rounded-b-full">
      {/* Oberer Teil - Header */}
      <div className="w-full">
        <div className="container mx-auto px-4">
          <div className="relative flex h-20 items-center justify-between">
            {/* Linke Seite - Logo und Hauptmenü */}
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="relative lg:size-20">
                <Image
                  src="/logo.png"
                  alt="E-Findo Logo"
                  width={100}
                  height={100}
                  className="h-12 w-auto object-contain lg:absolute lg:left-0 lg:top-0 lg:h-20 xl:h-28"
                />
              </Link>

              {/* Hauptmenü - Desktop */}
              <nav className="hidden lg:flex">
                <Link
                  href="/"
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === "/"
                      ? "font-semibold text-e-brown-500 dark:text-e-brown-300"
                      : "text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                  }`}
                >
                  Start
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 transform bg-e-brown-500 transition-transform duration-300 ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
                <Link
                  href="/news"
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === "/news"
                      ? "font-semibold text-e-brown-500 dark:text-e-brown-300"
                      : "text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                  }`}
                >
                  News
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 transform bg-e-brown-500 transition-transform duration-300 ${pathname === "/news" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
                <Link
                  href="/stammdaten"
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === "/stammdaten"
                      ? "font-semibold text-e-brown-500 dark:text-e-brown-300"
                      : "text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                  }`}
                >
                  Stammdaten
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 transform bg-e-brown-500 transition-transform duration-300 ${pathname === "/stammdaten" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
                <div className="relative">
                  <button className="text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 group relative flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 dark:hover:text-white">
                    Mehr
                    <IoIosArrowDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 transform bg-e-brown-500 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Rechte Seite - Aktionen */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Benachrichtigungssymbol */}
              <div className="relative">
                <span className="bg-e-orange-500 absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[11px] font-medium text-e-white text-white">
                  1
                </span>
                <button className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 p-1 dark:hover:text-white">
                  <BiSolidError className="size-6 text-yellow-500" />
                </button>
              </div>

              <div className="relative">
                <span className="bg-e-orange-500 absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[11px] font-medium text-e-white text-white">
                  2
                </span>
                <button className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 p-1 dark:hover:text-white">
                  <FaBell className="size-6 text-e-brown-500" />
                </button>
              </div>

              {/* Unternehmensauswahl */}
              <div className="relative hidden min-w-[150] md:block">
                <select className="text-e-gray-700 dark:text-e-gray-200 w-full appearance-none rounded-md border border-e-gray-200 bg-e-white py-1.5 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:bg-e-background-700">
                  <option>Allsafe GmbH - Engen</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <svg
                    className="text-e-gray-400 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Suche */}
              <div className="relative hidden md:block">
                <input
                  type="search"
                  placeholder="Suchen..."
                  className="bg-e-gray-50 text-e-gray-700 dark:text-e-gray-200 w-full min-w-[150px] rounded-md border border-e-gray-200 py-1.5 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:bg-e-background-700"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <FiSearch className="h-4 w-4 text-e-brown-500 dark:text-white" />
                </div>
              </div>

              {/* DarkMode-Umschalter */}
              <button
                onClick={toggleTheme}
                className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 hidden p-1 dark:hover:text-white lg:block"
              >
                {theme === "dark" ? (
                  <FaSun className="h-5 w-5 text-e-brown-300" />
                ) : (
                  <FaRegMoon className="h-5 w-5 text-e-brown-500" />
                )}
              </button>

              {/* Profil */}
              <div className="relative z-50 flex items-center space-x-2">
                <span className="text-e-gray-700 dark:text-e-gray-200 hidden text-sm lg:block">
                  e-findo admin
                </span>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="bg-e-gray-200 dark:bg-e-gray-700 relative flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <FaCircleUser className="size-10 text-e-brown-500" />
                </button>

                {/* Profil Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 divide-y-2 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:border dark:border-e-gray-200 dark:bg-e-background-800">
                    <div className="text-e-gray-700 dark:text-e-gray-200 px-4 py-2 text-sm dark:border-e-gray-700">
                      e-findo admin
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                      }}
                      className="text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 flex w-full items-center px-4 py-2 text-sm dark:hover:bg-e-background-700"
                    >
                      <FiLogOut className="mr-2 h-4 w-4" />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>

              {/* BETA-Abzeichen */}
              <span className="hidden rounded bg-e-blue-50 px-2 py-0.5 text-xs font-medium text-e-blue-800 dark:bg-e-blue-800 dark:text-e-blue-100 md:block">
                BETA
              </span>

              {/* Mobiles Menü-Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:text-e-gray-800 p-1 text-e-brown-600 dark:text-e-brown-400 dark:hover:text-white lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <RxCross2 className="h-6 w-6" />
                ) : (
                  <HiOutlineMenuAlt3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobiles Menü */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </header>
  );
};

export default Header;
