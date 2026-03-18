"use client";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, label, error }) => {
  const borderColor = error ? "border-[--color-accent-blush]" : "border-[--color-text-taupe]/40";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Root
          className={clsx("w-5 h-5 border rounded transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[--color-primary]/50", borderColor)}
          checked={checked}
          onCheckedChange={onCheckedChange}
        >
          <Indicator>
            <Check className="w-4 h-4 text-[--color-accent-sage]" />
          </Indicator>
        </Root>
        {label && <span className="font-sans text-[--color-text-charcoal]">{label}</span>}
      </div>
      {error && <p className="text-[--color-accent-blush] text-sm">{error}</p>}
    </div>
  );
};

export default Checkbox;