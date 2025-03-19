"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBell, FaRegMoon, FaSun } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../providers/ThemeProvider";
import MobileMenu from "./MobileMenu";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative w-full rounded-b-2xl bg-e-white shadow-md shadow-e-brown-500 dark:bg-e-background-800 lg:rounded-b-full">
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
                  className="text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 px-3 py-2 text-sm font-medium dark:hover:text-white"
                >
                  Start
                </Link>
                <Link
                  href="/news"
                  className="text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 px-3 py-2 text-sm font-medium dark:hover:text-white"
                >
                  News
                </Link>
                <Link
                  href="/stammdaten"
                  className="text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 px-3 py-2 text-sm font-medium dark:hover:text-white"
                >
                  Stammdaten
                </Link>
                <div className="relative">
                  <button className="text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 flex items-center px-3 py-2 text-sm font-medium dark:hover:text-white">
                    Mehr
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>

            {/* Rechte Seite - Aktionen */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Benachrichtigungssymbol */}
              <div className="relative">
                <span className="bg-e-orange-500 absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[11px] font-medium bg-red-500 text-e-white">
                  2
                </span>
                <button className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 p-1 dark:hover:text-white">
                  <FaBell className="h-5 w-5 text-e-brown-500" />
                </button>
              </div>

              {/* Unternehmensauswahl */}
              <div className="relative hidden min-w-[150] md:block">
                <select className="text-e-gray-700 dark:text-e-gray-200 w-full appearance-none rounded-md border border-e-gray-200 bg-e-white py-1.5 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:border-e-gray-700 dark:bg-e-background-700">
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
                  className="bg-e-gray-50 text-e-gray-700 dark:text-e-gray-200 w-full min-w-[150px] rounded-md border border-e-gray-200 py-1.5 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:border-e-gray-700 dark:bg-e-background-700"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <FiSearch className="h-4 w-4 text-e-brown-500" />
                </div>
              </div>

              {/* Design-Umschalter */}
              <button
                onClick={toggleTheme}
                className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 hidden p-1 dark:hover:text-white lg:block"
              >
                {theme === "dark" ? (
                  <FaSun className="h-5 w-5 text-e-brown-500" />
                ) : (
                  <FaRegMoon className="h-5 w-5 text-e-brown-500" />
                )}
              </button>

              {/* Profil */}
              <div className="relative flex items-center space-x-2 z-50">
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
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-e-background-800 lg:hidden">
                    <div className="text-e-gray-700 dark:text-e-gray-200 border-b border-e-gray-200 px-4 py-2 text-sm dark:border-e-gray-700">
                      e-findo admin
                    </div>
                    <button
                      onClick={() => {
                        // Logout işlemi burada yapılacak
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
