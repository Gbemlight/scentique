"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
            style={{ color: "var(--color-text-charcoal)" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-4 py-2.5 rounded-md border text-sm outline-none transition-all duration-200",
            "focus:ring-2",
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-stone-300 focus:border-[--color-primary] focus:ring-[--color-primary]/20",
            className
          )}
          style={{ backgroundColor: "var(--color-background-ivory)" }}
          {...rest}
        />
        {hint && !error && (
          <p className="text-xs" style={{ color: "var(--color-text-taupe)" }}>
            {hint}
          </p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
