import React, { forwardRef, InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, success, className, ...props }, ref) => {
    const base = "block w-full px-4 py-2 border rounded-md transition-all duration-200 placeholder-[--color-text-taupe] focus:outline-none";

    const borderColor = error
      ? "border-[--color-accent-blush]"
      : success
      ? "border-[--color-accent-sage]"
      : "border-[--color-text-taupe]/40";

    const focusStyle = error
      ? "focus:ring-[--color-accent-blush]/50 focus:ring-2"
      : "focus:ring-[--color-primary]/50 focus:ring-2";

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="font-serif text-[--color-text-charcoal]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={clsx(base, borderColor, focusStyle, className)}
            {...props}
          />
          {success && !error && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--color-accent-sage]" />
          )}
        </div>
        {error ? (
          <p className="text-[--color-accent-blush] text-sm">{error}</p>
        ) : helperText ? (
          <p className="text-[--color-text-taupe] text-sm">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;