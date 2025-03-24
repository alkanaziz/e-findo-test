import StorageSystem from "@/components/StorageSystem";

export default function StorageSystemWrapper({
  fullscreenWidget,
  onToggleFullscreen,
}) {
  return (
    <div
      className={`StorageSystem overflow-auto rounded-lg bg-e-background-50 shadow-sm shadow-e-brown-500/20 dark:bg-e-background-700 dark:text-gray-200 dark:shadow-none ${
        fullscreenWidget === "storage" ? "h-[calc(100vh-6rem)]" : "min-h-[33vh] lg:h-2/5"
      }`}
    >
      <StorageSystem onToggleFullscreen={onToggleFullscreen} />
    </div>
  );
}
