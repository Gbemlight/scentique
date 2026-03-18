"use client";

import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import React from "react";
import clsx from "clsx";

interface TabsProps {
  styleType?: "underline" | "pill";
  children: React.ReactNode;
  defaultValue: string;
}

export const Tabs = ({
  styleType = "underline",
  children,
  defaultValue,
}: TabsProps) => {
  return (
    <Root defaultValue={defaultValue}>
      {children}
    </Root>
  );
};

export const TabsList = ({
  styleType = "underline",
  className,
  ...props
}: any) => {
  return (
    <List
      className={clsx(
        "flex",
        styleType === "underline"
          ? "border-b border-[--color-text-taupe]/30"
          : "bg-[--color-bg-cream] rounded-full p-1",
        className
      )}
      {...props}
    />
  );
};

export const TabsTrigger = ({
  styleType = "underline",
  className,
  ...props
}: any) => {
  return (
    <Trigger
        className={clsx(
        "w-full px-4 py-2 text-left text-sm transition-all duration-200",
        styleType === "underline"
          ? "data-[state=active]:border-b-2 data-[state=active]:border-[--color-primary]"
          : "rounded-full data-[state=active]:bg-[--color-primary] data-[state=active]:text-white",
        className,
        "cursor-pointer"
      )}
      {...props}
    />
  );
};

export const TabsContent = (props: any) => {
  return (
    <Content
      className="pt-4 transition-opacity duration-200"
      {...props}
    />
  );
};