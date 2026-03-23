"use client";
import { Root, Trigger, Value, Icon, Content, Viewport, Item, ItemText, ItemIndicator } from "@radix-ui/react-select";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";

interface SelectProps {
  value?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
  label?: string;
  children: ReactNode;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, placeholder, label, children, error }) => {
  const borderColor = error ? "border-[--color-accent-blush]" : "border-[--color-text-taupe]/40";
  const focusStyle = error ? "focus:ring-[--color-accent-blush]/50 focus:ring-2" : "focus:ring-[--color-primary]/50 focus:ring-2";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-serif text-[--color-text-charcoal]">{label}</label>}
      <Root value={value} onValueChange={onValueChange}>
        <Trigger
          className={clsx("flex items-center justify-between w-full px-4 py-2 border rounded-md transition-all duration-200 focus:outline-none", borderColor, focusStyle)}
        >
          <Value placeholder={placeholder} />
          <Icon>
            <ChevronDown className="w-5 h-5 text-[--color-text-taupe]" />
          </Icon>
        </Trigger>
        <Content className="mt-1 rounded-md border border-[--color-text-taupe]/30 bg-white shadow-soft">
          <Viewport>{children}</Viewport>
        </Content>
      </Root>
      {error && <p className="text-[--color-accent-blush] text-sm">{error}</p>}
    </div>
  );
};

export const SelectItem = React.forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(({ children, className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={clsx(
        "relative flex items-center px-8 py-2 text-sm text-[--color-text-charcoal] font-medium select-none group focus:bg-[--color-bg-cream] focus:text-[--color-primary] outline-none cursor-pointer rounded-sm mx-1 my-0.5",
        className
      )}
      {...props}
    >
      <ItemText>{children}</ItemText>
      <ItemIndicator className="absolute left-2 inline-flex items-center">
        <Check className="w-4 h-4 text-[--color-primary]" />
      </ItemIndicator>
    </Item>
  );
});
SelectItem.displayName = "SelectItem";

export default Select;