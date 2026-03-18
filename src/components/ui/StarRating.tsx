"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = displayValue >= starNumber;
        const isHalf =
          !interactive &&
          displayValue > index &&
          displayValue < starNumber;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starNumber)}
            onMouseEnter={() => interactive && setHoverValue(starNumber)}
            onMouseLeave={() => interactive && setHoverValue(null)}
            className={clsx(
              "relative transition-transform duration-150 hover:scale-110",
              interactive && "cursor-pointer"
            )}
          >
            <Star
              className={clsx(
                sizeMap[size],
                "transition-colors duration-200",
                isFilled
                  ? "fill-[--color-primary] text-[--color-primary]"
                  : "text-[--color-text-taupe]"
              )}
            />

            {isHalf && (
              <Star
                className={clsx(
                  sizeMap[size],
                  "absolute top-0 left-0 fill-[--color-primary] text-[--color-primary] overflow-hidden"
                )}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;