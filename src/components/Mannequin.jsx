export default function Mannequin({ outfit }) {
  console.log(outfit, "outfit");
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Base mannequin silhouette */}
      <div className="w-[120px] h-[300px] bg-gray-200 rounded-full relative shadow-md">
        {/* Outfit pieces */}
        {outfit?.top && (
          <div className="absolute top-10 w-full text-center text-sm font-semibold text-blue-700">
            👕 {outfit.top}
          </div>
        )}
        {outfit?.bottom && (
          <div className="absolute top-32 w-full text-center text-sm text-indigo-700">
            👖 {outfit.bottom}
          </div>
        )}
        {outfit?.dress && (
          <div className="absolute top-20 w-full text-center text-sm text-red-700">
            👗 {outfit.dress}
          </div>
        )}
        {outfit?.shoes && (
          <div className="absolute bottom-4 w-full text-center text-sm text-gray-700">
            👟 {outfit.shoes}
          </div>
        )}
        {outfit?.accessory && (
          <div className="absolute left-[-60px] top-20 w-[200px] text-center text-xs text-pink-600">
            👜 {outfit.accessory}
          </div>
        )}
      </div>
    </div>
  );
}
