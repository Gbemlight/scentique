"use client";

import { Root, Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import clsx from "clsx";

export const Accordion = Root;

export const AccordionItem = Item;

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  any
>(({ children, className, ...props }, ref) => (
  <Header>
    <Trigger
      ref={ref}
      className={clsx(
        "flex w-full items-center justify-between py-3 text-left font-medium transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 transition-transform duration-200 data-[state=open]:rotate-180" />
    </Trigger>
  </Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  any
>(({ children, className, ...props }, ref) => (
  <Content
    ref={ref}
    className={clsx(
      "overflow-hidden text-sm transition-all duration-300 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className
    )}
    {...props}
  >
    <div className="pb-4">{children}</div>
  </Content>
));

AccordionContent.displayName = "AccordionContent";