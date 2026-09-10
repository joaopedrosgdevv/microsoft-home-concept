import { cn } from "@/lib/utils";

/**
 * The one type treatment every section shares.
 *
 * No eyebrow above it. The headings already say what each section is, and a
 * label repeating that in smaller type is the tell of a template rather than
 * information. What carries section identity instead is the composition
 * underneath and the colour the section is lit with.
 */
export function SectionHeading({
  id,
  title,
  tone = "dark",
  size = "md",
  className,
}: {
  id: string;
  title: React.ReactNode;
  tone?: "dark" | "day";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <h2
      id={id}
      data-reveal
      className={cn(
        "t-display",
        size === "lg"
          ? "text-[clamp(2.25rem,6vw,4.25rem)]"
          : "text-[clamp(2rem,4.6vw,3.25rem)]",
        tone === "day" ? "text-ink" : "text-white",
        className,
      )}
    >
      {title}
    </h2>
  );
}
