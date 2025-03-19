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

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative w-full bg-e-white dark:bg-e-background-800 rounded-b-2xl lg:rounded-b-full shadow-e-brown-500 shadow-md">
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
                  className="h-12 lg:h-20 xl:h-28 w-auto object-contain lg:absolute lg:top-0 lg:left-0"
                />
              </Link>

              {/* Hauptmenü - Desktop */}
              <nav className="hidden lg:flex">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                >
                  Start
                </Link>
                <Link
                  href="/news"
                  className="px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                >
                  News
                </Link>
                <Link
                  href="/stammdaten"
                  className="px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white"
                >
                  Stammdaten
                </Link>
                <div className="relative">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:text-e-gray-900 dark:hover:text-white">
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
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-e-orange-500 text-[11px] font-medium text-e-white">
                  2
                </span>
                <button className="text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 dark:hover:text-white p-1">
                  <FaBell className="h-5 w-5 text-e-brown-500" />
                </button>
              </div>

              {/* Unternehmensauswahl */}
              <div className="hidden md:block relative min-w-[150]">
                <select className="w-full appearance-none rounded-md border border-e-gray-200 dark:border-e-gray-700 bg-e-white dark:bg-e-background-700 py-1.5 pl-3 pr-8 text-sm text-e-gray-700 dark:text-e-gray-200 focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500">
                  <option>Allsafe GmbH - Engen</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <svg className="h-4 w-4 text-e-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Suche */}
              <div className="hidden md:block relative">
                <input
                  type="search"
                  placeholder="Suchen..."
                  className="w-full min-w-[150px] rounded-md border border-e-gray-200 dark:border-e-gray-700 bg-e-gray-50 dark:bg-e-background-700 py-1.5 pl-3 pr-8 text-sm text-e-gray-700 dark:text-e-gray-200 focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <FiSearch className="h-4 w-4 text-e-brown-500" />
                </div>
              </div>

              {/* Design-Umschalter */}
              <button
                onClick={toggleTheme}
                className="hidden lg:block text-e-gray-600 dark:text-e-gray-300 hover:text-e-gray-800 dark:hover:text-white p-1"
              >
                {theme === 'dark' ? (
                  <FaSun className="h-5 w-5 text-e-brown-500" />
                ) : (
                  <FaRegMoon className="h-5 w-5 text-e-brown-500" />
                )}
              </button>

              {/* Profil */}
              <div className="relative flex items-center space-x-2">
                <span className="hidden lg:block text-sm text-e-gray-700 dark:text-e-gray-200">
                  e-findo admin
                </span>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-e-gray-200 dark:bg-e-gray-700 relative"
                >
                  <FaCircleUser className="size-10 text-e-brown-500" />
                </button>

                {/* Profil Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white dark:bg-e-background-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 lg:hidden">
                    <div className="px-4 py-2 text-sm text-e-gray-700 dark:text-e-gray-200 border-b border-e-gray-200 dark:border-e-gray-700">
                      e-findo admin
                    </div>
                    <button
                      onClick={() => {
                        // Logout işlemi burada yapılacak
                        setIsProfileOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 dark:hover:bg-e-background-700"
                    >
                      <FiLogOut className="mr-2 h-4 w-4" />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>

              {/* BETA-Abzeichen */}
              <span className="hidden md:block rounded bg-e-blue-50 dark:bg-e-blue-800 px-2 py-0.5 text-xs font-medium text-e-blue-800 dark:text-e-blue-100">
                BETA
              </span>

              {/* Mobiles Menü-Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1 text-e-brown-600 dark:text-e-brown-400 hover:text-e-gray-800 dark:hover:text-white"
              >
                <HiOutlineMenuAlt3 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobiles Menü */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-e-white dark:bg-e-background-800 border-b border-e-gray-200 dark:border-e-gray-700`}
      >
        <div className="container mx-auto px-4 py-2">
          {/* Mobile Suche */}
          <div className="relative mb-4 md:hidden">
            <input
              type="search"
              placeholder="Suchen..."
              className="w-full rounded-md border border-e-gray-200 dark:border-e-gray-700 bg-e-gray-50 dark:bg-e-background-700 py-2 pl-3 pr-8 text-sm text-e-gray-700 dark:text-e-gray-200 focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <FiSearch className="h-4 w-4 text-e-brown-500" />
            </div>
          </div>

          {/* Mobile Unternehmensauswahl */}
          <div className="relative mb-4 md:hidden">
            <select className="w-full appearance-none rounded-md border border-e-gray-200 dark:border-e-gray-700 bg-e-white dark:bg-e-background-700 py-2 pl-3 pr-8 text-sm text-e-gray-700 dark:text-e-gray-200 focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500">
              <option>Allsafe GmbH - Engen</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 text-e-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-1">
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 dark:hover:bg-e-background-700 hover:text-e-gray-900 dark:hover:text-white"
            >
              Start
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/news"
              className="rounded-md px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 dark:hover:bg-e-background-700 hover:text-e-gray-900 dark:hover:text-white"
            >
              News
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/stammdaten"
              className="rounded-md px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 dark:hover:bg-e-background-700 hover:text-e-gray-900 dark:hover:text-white"
            >
              Stammdaten
            </Link>
            <button className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 dark:hover:bg-e-background-700 hover:text-e-gray-900 dark:hover:text-white">
              Mehr
              <svg
                className="h-4 w-4"
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
          </nav>

          {/* Mobiles Untermenü */}
          <div className="mt-4 flex items-center justify-between border-t border-e-gray-200 dark:border-e-gray-700 pt-4 px-2">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-sm text-e-gray-700 dark:text-e-gray-200"
            >
              {theme === 'dark' ? (
                <FaSun className="h-5 w-5 text-e-brown-500" />
              ) : (
                <FaRegMoon className="h-5 w-5 text-e-brown-500" />
              )}
            </button>
            <span className="rounded bg-e-blue-50 dark:bg-e-blue-800 px-2 py-0.5 text-xs font-medium text-e-blue-800 dark:text-e-blue-100">
              BETA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
