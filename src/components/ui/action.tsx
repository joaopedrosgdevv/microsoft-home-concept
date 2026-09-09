import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "inverse" | "quiet";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[0.9375rem] " +
  "t-label transition-[background-color,color,border-color] duration-200 " +
  "focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  solid: "bg-action text-white hover:bg-action-hover",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-surface-2",
  quiet:
    "border border-deep-line text-white hover:border-white hover:bg-white/10",
};

/**
 * The single action element for the page. Square by default, matching the
 * mark; radius is reserved for nothing else, so "pressable" reads from colour
 * and weight instead.
 */
export function Action({
  variant = "solid",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props} />
  );
}

/** Inline text link that keeps a visible underline offset rather than a colour-only cue. */
export function TextLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-action underline decoration-action/35 underline-offset-4",
        "transition-colors duration-200 hover:text-action-hover hover:decoration-action",
        className,
      )}
      {...props}
    />
  );
}
