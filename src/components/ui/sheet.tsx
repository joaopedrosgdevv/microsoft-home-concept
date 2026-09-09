"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Adapted from shadcn/ui `sheet`. Radix Dialog is kept for the focus trap,
 * escape handling, scroll lock and aria wiring; the presentation is rebuilt
 * for this design system — square corners, a hard rule instead of a shadow,
 * and a slide that comes from the top edge to match the header it opens from.
 */
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px]",
        "data-[state=open]:animate-[sheet-fade-in_220ms_ease-out]",
        "data-[state=closed]:animate-[sheet-fade-out_150ms_ease-in]",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex max-h-[100dvh] flex-col overflow-y-auto",
          "border-b border-line bg-paper",
          "data-[state=open]:animate-[sheet-in_320ms_cubic-bezier(0.22,1,0.36,1)]",
          "data-[state=closed]:animate-[sheet-out_200ms_cubic-bezier(0.4,0,1,1)]",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
};
