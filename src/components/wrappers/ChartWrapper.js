import Chart from "@/components/Chart";

export default function ChartWrapper({
  fullscreenWidget,
  onToggleFullscreen,
  type,
}) {
  return (
    <div
      className={`Chart relative rounded-lg border border-e-brown-300 bg-e-background-50 p-1 pt-5 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-800 dark:text-gray-200 dark:shadow-none sm:pt-0 xl:pt-0 ${
        fullscreenWidget === type ? "h-full w-full" : "h-full lg:w-1/2"
      }`}
    >
      <Chart onToggleFullscreen={onToggleFullscreen} type={type} />
    </div>
  );
}
