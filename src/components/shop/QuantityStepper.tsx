"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onQuantityChange(newValue);
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900 block mb-3">
        Quantity
      </label>
      <div className="flex items-center border-2 border-neutral-300 rounded-lg w-fit">
        <button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="p-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={18} />
        </button>

        <input
          type="number"
          min={min}
          max={max}
          value={quantity}
          onChange={handleChange}
          className="w-12 text-center font-semibold border-0 focus:outline-none"
        />

        <button
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="p-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
