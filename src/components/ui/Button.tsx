"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leadingIcon,
      trailingIcon,
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<Variant, string> = {
      primary: "bg-gradient-to-r from-[#C9A84C] to-[#E8C4B8] text-white hover:shadow-warm active:translate-y-[1px]",
      secondary: "border border-[--color-text-charcoal] text-[--color-text-charcoal] hover:bg-[--color-text-charcoal]/5 active:bg-[--color-text-charcoal]/10",
      ghost: "bg-transparent text-[--color-text-charcoal] hover:bg-[--color-text-charcoal]/5 active:bg-[--color-text-charcoal]/10",
      destructive: "bg-[--color-accent-blush] text-white hover:bg-[#e8b8b0] active:bg-[#e8a8a0]",
    };

    const sizes: Record<Size, string> = {
      sm: "px-3 py-1.5 text-sm min-h-[44px]",
      md: "px-4 py-2 text-base min-h-[44px]",
      lg: "px-5 py-3 text-lg min-h-[44px]",
      xl: "px-6 py-4 text-xl min-h-[44px]",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <Loader2 className="animate-spin w-5 h-5 mr-2" />
        ) : leadingIcon ? (
          <span className="mr-2">{leadingIcon}</span>
        ) : null}

        {loading ? "Loading…" : children}

        {!loading && trailingIcon ? <span className="ml-2">{trailingIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;