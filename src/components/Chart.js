import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from "react-icons/md";

const materialWeightRanges = {
  Altholz: { min: 500, max: 2000 },
  "Altes KSS": { min: 100, max: 800 },
  "Aluminium Profile AISi1": { min: 1000, max: 3000 },
  "Gewerbeabfall (Restmüll)": { min: 800, max: 2500 },
  "Aluminium Späne normal": { min: 300, max: 1500 },
  "Aluminium Späne nass": { min: 200, max: 1200 },
  Elektrowertstoff: { min: 50, max: 500 },
  "Alu-Profile": { min: 1200, max: 3500 },
};

const generateData = (year, month, type) => {
  const seed = parseInt(`${year}${month}`, 10);
  const data = [];

  let daysInMonth = 31;
  if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  } else if (month === 2) {
    daysInMonth =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  const generateWeightValue = (day, materialName) => {
    const { min, max } = materialWeightRanges[materialName];
    const range = max - min;
    const baseValue = Math.sin(seed + day * 100) * 0.5 + 0.5;
    return (min + baseValue * range).toFixed(2);
  };

  const generateErloesValue = (day, materialIndex) => {
    const value = Math.sin(seed + day * 100 + materialIndex * 50) * 0.5 + 0.5;
    return value.toFixed(2);
  };

  for (let day = 1; day <= daysInMonth; day++) {
    const dayData = { day };

    Object.keys(materialWeightRanges).forEach((material, index) => {
      dayData[material] =
        type === "revenueChart"
          ? generateErloesValue(day, index)
          : generateWeightValue(day, material);
    });

    data.push(dayData);
  }

  return data;
};

export default function Chart({
  isInModal = false,
  onToggleFullscreen = null,
  type,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(3); // 3 = März
  const [chartData, setChartData] = useState([]);
  const [visibleBars, setVisibleBars] = useState({
    Altholz: true,
    "Altes KSS": true,
    "Aluminium Profile AISi1": true,
    "Gewerbeabfall (Restmüll)": true,
    "Aluminium Späne normal": true,
    "Aluminium Späne nass": true,
    Elektrowertstoff: true,
    "Alu-Profile": true,
  });
  const [chartType, setChartType] = useState("balken"); // 'balken' oder 'linien'

  // Aktualisiere die Daten, wenn sich Jahr oder Monat ändern
  useEffect(() => {
    setChartData(generateData(year, month, type));
  }, [year, month, type]);

  const toggleFullscreen = () => {
    if (onToggleFullscreen) {
      onToggleFullscreen(!isFullscreen);
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleCheckboxChange = (barName) => {
    setVisibleBars((prev) => ({
      ...prev,
      [barName]: !prev[barName],
    }));
  };

  const toggleAllBars = () => {
    const areAllVisible = Object.values(visibleBars).every((value) => value);
    const newState = {};
    barConfigs.forEach(({ key }) => {
      newState[key] = !areAllVisible;
    });
    setVisibleBars(newState);
  };

  // Monatsnamen auf Deutsch definieren
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const barConfigs = [
    {
      key: "Altholz",
      fill: "#B3CDAD",
      activeFill: "pink",
      activeStroke: "blue",
    },
    {
      key: "Altes KSS",
      fill: "#FF5F5E",
      activeFill: "gold",
      activeStroke: "purple",
    },
    {
      key: "Aluminium Profile AISi1",
      fill: "#FFD700",
      activeFill: "lightgreen",
      activeStroke: "darkgreen",
    },
    {
      key: "Gewerbeabfall (Restmüll)",
      fill: "#8A2BE2",
      activeFill: "lightblue",
      activeStroke: "darkblue",
    },
    {
      key: "Aluminium Späne normal",
      fill: "#FF69B4",
      activeFill: "lightcoral",
      activeStroke: "darkred",
    },
    {
      key: "Aluminium Späne nass",
      fill: "#7FFF00",
      activeFill: "lightyellow",
      activeStroke: "darkorange",
    },
    {
      key: "Elektrowertstoff",
      fill: "#DC143C",
      activeFill: "lightgray",
      activeStroke: "darkgray",
    },
    {
      key: "Alu-Profile",
      fill: "#00CED1",
      activeFill: "lightpink",
      activeStroke: "darkpink",
    },
  ];

  const getYAxisConfig = () => {
    if (type === "revenueChart") {
      return {
        ticks: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        domain: [0, 1],
      };
    } else {
      return {
        ticks: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
        domain: [0, 3500],
      };
    }
  };

  return (
    <div className="flex h-full flex-col">
      <button
        onClick={toggleAllBars}
        className="absolute right-0 top-0 rounded-bl-lg rounded-br-none rounded-tl-none rounded-tr-lg border border-e-brown-300 bg-white px-1 text-xs font-medium text-e-background-500 hover:text-e-brown-800 dark:border-e-background-600 dark:bg-e-background-700 dark:text-e-background-200 dark:hover:text-white"
      >
        {Object.values(visibleBars).every((value) => value)
          ? "Alle abwählen"
          : "Alle auswählen"}
      </button>
      <div className="flex w-full flex-col flex-wrap items-start md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {!isInModal && (
            <button
              onClick={toggleFullscreen}
              className="rounded-full p-1 text-e-background-500 transition-colors hover:bg-e-brown-100 hover:text-e-brown-800 dark:text-e-background-300 dark:hover:bg-e-background-700 dark:hover:text-white"
              aria-label={isFullscreen ? "Vollbild beenden" : "Vollbild"}
            >
              {isFullscreen ? (
                <MdOutlineCloseFullscreen className="size-5" />
              ) : (
                <MdOutlineOpenInFull className="size-5" />
              )}
            </button>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <select
              id="year-select"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              className="rounded-md border border-e-brown-300 bg-white text-xs focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white sm:text-sm"
            >
              {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value, 10))}
              className="rounded-md border border-e-brown-300 bg-white text-xs focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white sm:text-sm"
            >
              {monthNames.map((monthName, index) => (
                <option key={index + 1} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              id="chart-type-select"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="rounded-md border border-e-brown-300 bg-white text-xs focus:border-e-brown-500 focus:outline-none dark:border-e-background-600 dark:bg-e-background-700 dark:text-white sm:text-sm"
            >
              <option value="balken">Balken</option>
              <option value="linien">Linien</option>
            </select>
          </div>
        </div>
        <h2 className="mx-auto w-auto text-center text-lg font-semibold dark:text-gray-200">
          {type === "revenueChart" ? "Erlöse" : "Gewichtsentciklung"}
        </h2>
      </div>

      <div className="h-full w-full flex-grow">
        <ResponsiveContainer width="100%" height="99%">
          {chartType === "balken" ? (
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: "0.75rem" }} />
              <YAxis
                ticks={getYAxisConfig().ticks}
                domain={getYAxisConfig().domain}
                tick={{ fontSize: "0.75rem" }}
                width={30}
              />
              <Tooltip wrapperStyle={{ fontSize: "0.75rem" }} />
              {barConfigs.map(
                ({ key, fill, activeFill, activeStroke }) =>
                  visibleBars[key] && (
                    <Bar key={key} dataKey={key} fill={fill} />
                  ),
              )}
            </BarChart>
          ) : (
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: "0.75rem" }} />
              <YAxis
                ticks={getYAxisConfig().ticks}
                domain={getYAxisConfig().domain}
                tick={{ fontSize: "0.75rem" }}
                width={30}
              />
              <Tooltip wrapperStyle={{ fontSize: "0.75rem" }} />
              {barConfigs.map(
                ({ key, fill }) =>
                  visibleBars[key] && (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={fill}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ),
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="mb-2 mt-4 grid max-h-28 grid-cols-2 gap-1 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
        {barConfigs.map(({ key, fill }) => (
          <label
            key={key}
            className="xs:text-xs flex items-center gap-1 truncate text-[10px]"
          >
            <input
              type="checkbox"
              checked={visibleBars[key]}
              onChange={() => handleCheckboxChange(key)}
              className="h-3 w-3 rounded text-e-brown-600 focus:ring-e-brown-500"
            />
            <span className="flex items-center gap-1 truncate">
              <span
                className="inline-block h-2 w-2 sm:h-3 sm:w-3"
                style={{ backgroundColor: fill }}
              ></span>
              <span className="truncate">{key}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
