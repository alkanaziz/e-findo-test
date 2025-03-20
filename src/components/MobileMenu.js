import Link from "next/link";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const MobileMenu = ({ isOpen, onClose, theme, toggleTheme }) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden bg-e-white dark:bg-e-background-800`}
    >
      <div className="container mx-auto px-4 py-2">
        {/* Mobile Suche */}
        <div className="relative mb-4 md:hidden">
          <input
            type="search"
            placeholder="Suchen..."
            className="bg-e-gray-50 text-e-gray-700 dark:text-e-gray-200 w-full rounded-md border border-e-gray-200 py-2 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:border-e-gray-700 dark:bg-e-background-700"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <FiSearch className="h-4 w-4 text-e-brown-500" />
          </div>
        </div>

        {/* Mobile Unternehmensauswahl */}
        <div className="relative mb-4 md:hidden">
          <select className="text-e-gray-700 dark:text-e-gray-200 w-full appearance-none rounded-md border border-e-gray-200 bg-e-white py-2 pl-3 pr-8 text-sm focus:border-e-brown-500 focus:outline-none focus:ring-1 focus:ring-e-brown-500 dark:border-e-gray-700 dark:bg-e-background-700">
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

        {/* Mobile Navigation */}
        <nav className="flex flex-col space-y-1">
          <Link
            onClick={onClose}
            href="/"
            className="text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 hover:text-e-gray-900 rounded-md px-3 py-2 text-sm font-medium dark:hover:bg-e-background-700 dark:hover:text-white"
          >
            Start
          </Link>
          <Link
            onClick={onClose}
            href="/news"
            className="text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 hover:text-e-gray-900 rounded-md px-3 py-2 text-sm font-medium dark:hover:bg-e-background-700 dark:hover:text-white"
          >
            News
          </Link>
          <Link
            onClick={onClose}
            href="/stammdaten"
            className="text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 hover:text-e-gray-900 rounded-md px-3 py-2 text-sm font-medium dark:hover:bg-e-background-700 dark:hover:text-white"
          >
            Stammdaten
          </Link>
          <button className="text-e-gray-700 dark:text-e-gray-200 hover:bg-e-gray-100 hover:text-e-gray-900 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium dark:hover:bg-e-background-700 dark:hover:text-white">
            Mehr
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>

        {/* Mobiles Untermenü */}
        <div className="mt-4 flex items-center justify-between border-t border-e-gray-200 px-2 pt-4 dark:border-e-gray-700">
          <button
            onClick={toggleTheme}
            className="text-e-gray-700 dark:text-e-gray-200 flex items-center space-x-2 text-sm"
          >
            {theme === "dark" ? (
              <FaSun className="h-5 w-5 text-e-brown-500" />
            ) : (
              <FaRegMoon className="h-5 w-5 text-e-brown-500" />
            )}
          </button>
          <span className="rounded bg-e-blue-50 px-2 py-0.5 text-xs font-medium text-e-blue-800 dark:bg-e-blue-800 dark:text-e-blue-100">
            BETA
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
