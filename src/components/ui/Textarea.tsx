import React, { forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className, ...props }, ref) => {
    const base = "block w-full px-4 py-2 border rounded-md transition-all duration-200 placeholder-[--color-text-taupe] focus:outline-none";
    const borderColor = error ? "border-[--color-accent-blush]" : "border-[--color-text-taupe]/40";
    const focusStyle = error ? "focus:ring-[--color-accent-blush]/50 focus:ring-2" : "focus:ring-[--color-primary]/50 focus:ring-2";

    return (
      <div className="flex flex-col gap-1">
        {label && <label className="font-serif text-[--color-text-charcoal]">{label}</label>}
        <textarea ref={ref} className={clsx(base, borderColor, focusStyle, className)} {...props} />
        {error ? <p className="text-[--color-accent-blush] text-sm">{error}</p> : helperText ? <p className="text-[--color-text-taupe] text-sm">{helperText}</p> : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;