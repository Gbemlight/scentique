import React from "react";
import clsx from "clsx";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md" }) => {
  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden flex items-center justify-center bg-[--color-bg-cream] text-[--color-text-charcoal] font-medium",
        sizeMap[size]
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export default Avatar;