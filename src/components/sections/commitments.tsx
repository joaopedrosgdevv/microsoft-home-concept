import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/action";
import { SQUARE, commitments, values } from "@/lib/content";

/**
 * Four commitments, four quadrants, four colours. The 2x2 is the argument, so
 * the blocks share rules instead of floating as separate cards.
 */
export function Commitments() {
  return (
    <section
      id="missao"
      aria-labelledby="missao-heading"
      className="border-b border-line bg-surface"
    >
      {/* Extra air at the top: the section is where the stage hands over to
          daylight, and the handover needs room to land. */}
      <div className="mx-auto max-w-[100rem] px-gutter pt-24 pb-20 md:px-8 lg:pt-36 lg:pb-28">
        <div className="grid grid-cols-12 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeading
              id="missao-heading"
              eyebrow="Posicionamento"
              title="Quatro compromissos sustentam a missão"
            />
          </div>
          <div className="col-span-12 flex items-end lg:col-span-5 lg:col-start-8">
            <p data-reveal className="measure text-ink-muted">
              A empresa organiza sua atuação institucional em quatro
              compromissos permanentes, alinhados aos valores de{" "}
              {values.slice(0, -1).join(", ").toLowerCase()} e{" "}
              {values.at(-1)?.toLowerCase()}.{" "}
              <TextLink
                href="https://www.microsoft.com/en-us/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver na página institucional
              </TextLink>
            </p>
          </div>
        </div>

        <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:mt-20">
          {commitments.map((c, i) => (
            <li
              key={c.id}
              data-reveal
              className={[
                "group relative py-9 sm:py-12",
                "sm:[&:nth-child(odd)]:pr-10 sm:[&:nth-child(even)]:pl-10",
                // Interior rules only, so the quadrant reads as one figure.
                // Stacked, every item after the first gets a rule; in the 2x2
                // only the second row does, so the two columns stay joined.
                i > 0 ? "border-t border-line" : "",
                i === 1 ? "sm:border-t-0" : "",
                "sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-line",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="mb-6 block size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 sm:size-5"
                style={{ backgroundColor: SQUARE[c.color] }}
              />
              <h3 className="t-title text-[1.5rem] text-ink sm:text-[1.75rem]">
                {c.title}
              </h3>
              <p className="measure mt-3 text-ink-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
