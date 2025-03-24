import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SearchBar = ({ onSearch, hideFilters = false, initialFilters = {} }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    material: initialFilters.material || "",
    company: initialFilters.company || "",
    status: initialFilters.status || "",
    dateFrom: initialFilters.dateFrom || "",
    dateTo: initialFilters.dateTo || "",
    dateType: initialFilters.dateType || "pickupDate"
  });

  // Automatische Suche wenn sich Filter ändern
  useEffect(() => {
    if (onSearch) {
      const debounceTimeout = setTimeout(() => {
        onSearch({
          searchTerm,
          ...filters
        });
      }, 300); // 300ms debounce

      return () => clearTimeout(debounceTimeout);
    }
  }, [filters, onSearch, searchTerm]);

  // Prüft ob aktive Filter vorhanden sind
  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value !== "");
  };

  // Einen bestimmten Filter löschen
  const clearFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: ""
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!onSearch) {
      // Weiterleitung zur Suchseite wenn auf der Hauptseite gesucht wird
      const searchParams = new URLSearchParams();
      if (searchTerm) searchParams.append("term", searchTerm);

      // Alle nicht-leeren Filter zur URL hinzufügen
      Object.entries(filters).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });

      setSearchTerm("");
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Alle Filter zurücksetzen
  const clearAllFilters = () => {
    setFilters({
      material: "",
      company: "", 
      status: "",
      dateFrom: "",
      dateTo: "",
      dateType: "pickupDate"
    });
    setSearchTerm("");
    
    // URL-Parameter löschen
    const url = new URL(window.location.href);
    url.search = ""; // Alle Query-Parameter löschen
    router.replace(url.toString(), undefined, { shallow: true });
  };

  // Aktive Filter anzeigen
  const renderActiveFilters = () => {
    if (!hasActiveFilters()) return null;

    return (
      <div className="mt-3 mb-2 flex items-center flex-wrap gap-2">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          Aktive Filter:
        </span>

        {filters.material && (
          <div className="flex items-center rounded-full bg-e-brown-100 px-2 py-1 text-xs text-e-brown-800 dark:bg-e-background-700 dark:text-e-brown-300">
            <span>Material: {filters.material}</span>
            <button
              onClick={() => clearFilter("material")}
              className="ml-1 rounded-full p-0.5 hover:bg-e-brown-200 dark:hover:bg-e-background-600"
              aria-label="Material Filter löschen"
            >
              <FaTimes className="size-3" />
            </button>
          </div>
        )}

        {filters.company && (
          <div className="flex items-center rounded-full bg-e-brown-100 px-2 py-1 text-xs text-e-brown-800 dark:bg-e-background-700 dark:text-e-brown-300">
            <span>Entsorger: {filters.company}</span>
            <button
              onClick={() => clearFilter("company")}
              className="ml-1 rounded-full p-0.5 hover:bg-e-brown-200 dark:hover:bg-e-background-600"
              aria-label="Entsorger Filter löschen"
            >
              <FaTimes className="size-3" />
            </button>
          </div>
        )}

        {filters.status && (
          <div className="flex items-center rounded-full bg-e-brown-100 px-2 py-1 text-xs text-e-brown-800 dark:bg-e-background-700 dark:text-e-brown-300">
            <span>Status: {filters.status === "true" ? "Aktiv" : "Inaktiv"}</span>
            <button
              onClick={() => clearFilter("status")}
              className="ml-1 rounded-full p-0.5 hover:bg-e-brown-200 dark:hover:bg-e-background-600"
              aria-label="Status Filter löschen"
            >
              <FaTimes className="size-3" />
            </button>
          </div>
        )}

        {(filters.dateFrom || filters.dateTo) && (
          <div className="flex items-center rounded-full bg-e-brown-100 px-2 py-1 text-xs text-e-brown-800 dark:bg-e-background-700 dark:text-e-brown-300">
            <span>
              {filters.dateType === "pickupDate" ? "Abholdatum" : "Systemdatum"}:
              {filters.dateFrom && ` von ${filters.dateFrom}`}
              {filters.dateTo && ` bis ${filters.dateTo}`}
            </span>
            <button
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  dateFrom: "",
                  dateTo: ""
                }));
              }}
              className="ml-1 rounded-full p-0.5 hover:bg-e-brown-200 dark:hover:bg-e-background-600"
              aria-label="Datum Filter löschen"
            >
              <FaTimes className="size-3" />
            </button>
          </div>
        )}

        <button
          onClick={clearAllFilters}
          className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-e-background-700 dark:text-gray-300 dark:hover:bg-e-background-600"
        >
          Alle Filter löschen
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex w-full items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Container, Material oder Entsorger suchen..."
            className="w-full rounded-lg border border-e-brown-300 bg-white px-4 py-2 pr-10 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
          />

          <button
            type="submit"
            className="absolute right-2 text-e-brown-600 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:text-white"
            aria-label="Suchen"
          >
            <FaSearch className="size-4" />
          </button>

          {!hideFilters && (
            <button
              type="button"
              onClick={toggleFilters}
              className={`absolute right-10 text-e-brown-600 hover:text-e-brown-800 dark:text-e-brown-400 dark:hover:text-white ${showFilters ? "text-e-brown-800 dark:text-white" : ""
                }`}
              aria-label="Filter"
            >
              <FaFilter className="size-4" />
            </button>
          )}
        </div>

        {/* Aktive Filter anzeigen */}
        {!hideFilters && renderActiveFilters()}

        {!hideFilters && showFilters && (
          <div className="mt-3 rounded-lg border border-e-brown-300 bg-white p-3 shadow-md dark:border-e-background-600 dark:bg-e-background-700">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Material
                </label>
                <select
                  name="material"
                  value={filters.material}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                >
                  <option value="">Alle</option>
                  <option value="Aluminium">Aluminium</option>
                  <option value="Mischschrott">Mischschrott</option>
                  <option value="Eisenspäne">Eisenspäne</option>
                  <option value="Kupferkabel">Kupferkabel</option>
                  <option value="Edelstahl">Edelstahl</option>
                  <option value="Stahlschrott">Stahlschrott</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Entsorger
                </label>
                <select
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                >
                  <option value="">Alle</option>
                  <option value="e-findo GmbH">e-findo GmbH</option>
                  <option value="Metall GmbH">Metall GmbH</option>
                  <option value="Recycling AG">Recycling AG</option>
                  <option value="Wertstoff KG">Wertstoff KG</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                >
                  <option value="">Alle</option>
                  <option value="true">Aktiv</option>
                  <option value="false">Inaktiv</option>
                </select>
              </div>

              {/* Datumstyp Auswahl */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Datumstyp
                </label>
                <select
                  name="dateType"
                  value={filters.dateType}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                >
                  <option value="systemDate">Systemdatum</option>
                  <option value="pickupDate">Abholdatum</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Von Datum
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-e-brown-600 dark:text-e-brown-400">
                  Bis Datum
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="rounded-md border border-e-brown-300 bg-white p-1.5 text-sm focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white dark:focus:border-e-brown-400"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;