import { cn } from "@/lib/utils";

/**
 * The Microsoft symbol, reproduced unaltered: four equal quadrants on the
 * official 23x23 grid, in the official colours. Proportions and colours must
 * not be changed — see microsoft.com/en-us/legal/intellectualproperty/trademarks.
 *
 * The company name sits beside it as ordinary page type rather than as an
 * imitation of the Segoe wordmark, which is not licensed for use here.
 */
export function MicrosoftMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 23 23"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

/** Symbol plus company name, used in the header and footer. */
export function MicrosoftLockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MicrosoftMark className="size-[1.375em] w-auto" />
      <span
        className="text-[1.0625rem] leading-none tracking-[-0.01em]"
        style={{ fontVariationSettings: '"wdth" 100, "wght" 500' }}
      >
        Microsoft
      </span>
    </span>
  );
}
