import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { sustainability } from "@/lib/content";

/**
 * Seen from orbit.
 *
 * The four goals are about a planet, so the section is built as one: a limb
 * curving across the bottom, the thin bright line of atmosphere sitting on it,
 * and a low sun off to the right. The goals are set on the horizon rather than
 * in cards — they follow the curve, which is the only reason their vertical
 * offsets differ.
 *
 * Each goal carries a mark that states its shape instead of decorating it:
 * a bar below the line for carbon taken out, a bar above it for water put back,
 * a closed loop for materials kept in use, and a small square inside a larger
 * one for protecting more land than the company occupies.
 */

/** Goal marks, in the order the goals are declared in the content file. */
const MARKS = [
  {
    color: "#f25022",
    /* Below the line: carbon removed. */
    draw: (
      <>
        <line x1="2" y1="14" x2="26" y2="14" />
        <path d="M14 14 v9" />
        <path d="M9.5 18.5 L14 23 L18.5 18.5" />
      </>
    ),
  },
  {
    color: "#00a4ef",
    /* Above the line: water replenished. */
    draw: (
      <>
        <line x1="2" y1="14" x2="26" y2="14" />
        <path d="M14 14 v-9" />
        <path d="M9.5 9.5 L14 5 L18.5 9.5" />
      </>
    ),
  },
  {
    color: "#ffb900",
    /* A circuit with no exit: what goes in keeps going round. */
    draw: (
      <>
        <path d="M5 12 V5 H19" />
        <path d="M15.5 1.5 L19 5 L15.5 8.5" />
        <path d="M23 16 V23 H9" />
        <path d="M12.5 19.5 L9 23 L12.5 26.5" />
      </>
    ),
  },
  {
    color: "#7fba00",
    /* More ground held than taken. */
    draw: (
      <>
        <rect x="3" y="3" width="22" height="22" />
        <rect x="10" y="10" width="8" height="8" fill="currentColor" />
      </>
    ),
  },
];

export function Sustainability() {
  return (
    <section
      id="sustentabilidade"
      aria-labelledby="sustentabilidade-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        {/* A low sun, off frame to the right. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(34% 30% at 88% 22%, rgb(255 185 0 / 0.20) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 44% at 12% 16%, rgb(0 106 189 / 0.20) 0%, transparent 72%)",
          }}
        />
        {/* The air first, then the ground over it, so the rim only shows above
            the horizon — which is where an atmosphere is. */}
        <div className="airglow" style={{ top: "72%" }} />
        <div className="limb" style={{ top: "72%" }} />
        {/* The ground goes back into the dark before the section ends, so the
            next band starts from the same black and no edge shows. */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-void) 100%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter pt-24 pb-28 md:px-8 lg:pt-36 lg:pb-40">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="sustentabilidade-heading"
              title="Quatro metas ambientais com prazo em 2030"
              size="lg"
            />
            <p
              data-reveal
              className="measure mt-7 text-[1.0625rem] leading-[1.7] text-mist"
            >
              {sustainability.longTerm}
            </p>
            <p data-reveal className="mt-7">
              <a
                href={sustainability.source}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-white underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-white"
              >
                Compromissos de sustentabilidade
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>

          {/* The renewable-energy milestone, lit like a reading on an
              instrument rather than set in a box. */}
          <figure
            data-reveal
            className="lg:col-span-5 lg:col-start-8 lg:pt-4"
          >
            <p
              className="t-num text-[clamp(4rem,13vw,7.5rem)] text-white"
              style={{ textShadow: "0 0 4rem rgb(0 164 239 / 0.55)" }}
            >
              {sustainability.milestone.stat}
            </p>
            <figcaption className="mt-5 border-t border-[var(--edge-strong)] pt-5">
              <p className="t-label text-[0.9375rem] text-white">
                {sustainability.milestone.label}
              </p>
              <p className="measure mt-4 text-[0.9375rem] leading-[1.7] text-fog">
                {sustainability.milestone.body}{" "}
                <a
                  href={sustainability.milestoneSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-white"
                >
                  Ler o anúncio
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </p>
            </figcaption>
          </figure>
        </div>

        {/* The horizon. The goals stand on it, dipping at the edges with the
            curve of the limb behind them. */}
        <ul className="mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {sustainability.goals.map((g, i) => (
            <li
              key={g.title}
              data-reveal
              className={[
                "border-t border-[var(--edge-strong)] pt-6",
                i === 0 || i === 3 ? "lg:mt-10" : "",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 28 28"
                aria-hidden="true"
                focusable="false"
                className="size-9"
                fill="none"
                stroke={MARKS[i].color}
                strokeWidth="1.5"
                strokeLinecap="square"
                style={{ color: MARKS[i].color }}
              >
                {MARKS[i].draw}
              </svg>
              <h3 className="t-title mt-5 text-[1.25rem] text-white">
                {g.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-fog">
                {g.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
