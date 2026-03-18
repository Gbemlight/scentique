import React, { ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "neutral";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leadingIcon?: ReactNode;
  rounded?: "pill" | "square"; // pill for products, square for admin tags
  className?: string;
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  leadingIcon,
  rounded = "pill",
  className,
  children,
}) => {
  const base = "inline-flex items-center font-medium transition-all select-none";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-gradient-to-r from-[#C9A84C] to-[#E8C4B8] text-white",
    success: "bg-[--color-accent-sage] text-white",
    warning: "bg-amber-400 text-black",
    error: "bg-[--color-accent-blush] text-white",
    info: "bg-blue-200 text-black",
    neutral: "bg-[--color-text-taupe]/20 text-[--color-text-taupe]",
  };

  const sizes: Record<BadgeSize, string> = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const radius = rounded === "pill" ? "rounded-full" : "rounded-md";

  return (
    <span className={clsx(base, variants[variant], sizes[size], radius, className)}>
      {leadingIcon && <span className="mr-1">{leadingIcon}</span>}
      {children}
    </span>
  );
};

export default Badge;