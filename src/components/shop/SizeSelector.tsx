"use client";

import clsx from "clsx";

interface Size {
  size: string;
  volume: string;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900 block mb-3">
        Size
      </label>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size.size}
            onClick={() => onSizeChange(size.size)}
            className={clsx(
              "px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium",
              selectedSize === size.size
                ? "bg-black text-white"
                : "border-2 border-neutral-300 text-neutral-900 hover:border-neutral-600"
            )}
          >
            {size.volume}
          </button>
        ))}
      </div>
    </div>
  );
}
