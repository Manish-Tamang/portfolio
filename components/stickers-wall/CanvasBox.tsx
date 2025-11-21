export default function CanvasBox() {
  return (
    <div className="relative w-full h-[calc(100vh-200px)] min-h-[600px]">
      <div className="absolute inset-0 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800 pointer-events-none" />
    </div>
  );
}

