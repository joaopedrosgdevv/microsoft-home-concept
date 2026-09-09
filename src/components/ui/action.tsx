import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "ghost"
  | "solid"
  | "outline"
  | "inverse"
  | "quiet";

type Size = "md" | "sm";

/**
 * Variant/size record and the `data-variant` hook follow shadcn/ui's `button`
 * (fetched through the shadcn MCP); the dependency is not — the project already
 * has `cn`, and one component does not justify class-variance-authority.
 *
 * Square, because the brand mark is square and a radius here would be the only
 * curve on the page. What makes these read as pressable is not a corner but
 * weight: a filled face against the stage, a rim that catches light, and — on
 * the primary — four colours of light escaping from underneath it.
 */
const base =
  "group/action relative inline-flex select-none items-center justify-center gap-2.5 " +
  "t-label whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] " +
  "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-2 " +
  "active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "min-h-13 px-7 text-[0.9375rem]",
  sm: "min-h-11 px-5 text-[0.875rem]",
};

const variants: Record<Variant, string> = {
  /*
   * The one loud element on the stage. Its white face is a child rather than a
   * background on the root, so the bloom behind it can be an ordinary sibling:
   * painted first, then covered everywhere the face reaches, and visible only
   * where it spills past the edges. No negative z-index, so nothing depends on
   * which ancestor happens to create a stacking context.
   */
  primary: "text-ink hover:-translate-y-0.5",

  /* Its partner on the stage: nothing but a hairline until you point at it. */
  ghost:
    "border border-[var(--edge-strong)] bg-white/[0.03] text-white backdrop-blur-sm " +
    "hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.09]",

  /* Kept for the light sections further down the page. */
  solid: "bg-action text-white hover:bg-action-hover",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-surface-2",
  quiet:
    "border border-deep-line text-white hover:border-white hover:bg-white/10",
};

export function Action({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  const isPrimary = variant === "primary";

  return (
    <Link
      data-variant={variant}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {isPrimary ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-5 bottom-0 h-5 translate-y-1 blur-[22px]",
              "opacity-70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover/action:inset-x-3 group-hover/action:translate-y-2 group-hover/action:opacity-95",
            )}
            style={{
              background:
                "linear-gradient(90deg,#f25022 0%,#7fba00 34%,#00a4ef 67%,#ffb900 100%)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_2px_10px_-2px_rgb(0_0_0/0.55)]"
          />
        </>
      ) : null}
      <span className={cn("relative inline-flex items-center gap-2.5")}>
        {children}
      </span>
    </Link>
  );
}

/** Inline text link keeps a visible underline offset rather than a colour-only cue. */
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
