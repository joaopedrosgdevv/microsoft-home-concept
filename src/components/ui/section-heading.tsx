import { cn } from "@/lib/utils";

/**
 * Section opener. The eyebrow is a condensed sentence-case label rather than
 * tracked-out caps, and it carries a rule that ties it to the heading below.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  className,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div data-reveal className={className}>
      <p
        className={cn(
          "t-label mb-5 flex items-center gap-3 text-label",
          tone === "dark" ? "text-deep-muted" : "text-ink-muted",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            tone === "dark" ? "bg-deep-line" : "bg-line",
          )}
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "t-title max-w-[18ch] text-[clamp(1.875rem,5.2vw,3.25rem)]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
