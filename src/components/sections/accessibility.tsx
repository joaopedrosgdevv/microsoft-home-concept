import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { accessibility, elevate } from "@/lib/content";

/**
 * The one section in daylight.
 *
 * The page is a dark stage from the hero down, and it stays that way until
 * here. This section argues that things should be easy to read, so it is the
 * one you read in full light — at the largest body size on the page, on the
 * highest-contrast surface, with the widest leading. The break also gives the
 * scroll a breath before the close, which a page this dark needs.
 *
 * Accessibility and Elevate share the band: both are the same argument about
 * who gets to take part, one about who can use the products and one about who
 * can learn to build with them.
 */
export function Accessibility() {
  return (
    <section
      id="acessibilidade"
      aria-labelledby="acessibilidade-heading"
      className="on-day relative isolate overflow-hidden bg-day text-ink"
    >
      {/* Night gives way. The stage does not stop at a border: it thins out
          into the light the section is set in. */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(6rem,15vh,10.5rem)]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-void) 0%, rgb(5 6 10 / 0.94) 16%, rgb(5 6 10 / 0.74) 33%, rgb(5 6 10 / 0.44) 54%, rgb(5 6 10 / 0.16) 78%, transparent 100%)",
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid-day absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter pb-8 md:px-8">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-12">
          <SectionHeading
            id="acessibilidade-heading"
            title="Projetado para ser usável por mais pessoas"
            tone="day"
            size="lg"
            className="lg:col-span-7"
          />
          <p
            data-reveal
            className="measure-tight self-end text-[1.1875rem] leading-[1.75] text-ink lg:col-span-5"
          >
            {accessibility.lead}
          </p>
        </div>

        {/* Set large and open. This is the part of the page where line length,
            leading and contrast are the argument, so they are held to the
            comfortable end of the range rather than the compact one. */}
        <ul className="mt-12 border-t border-ink lg:mt-16">
          {accessibility.points.map((p) => (
            <li
              key={p.title}
              data-reveal
              className="grid gap-y-4 border-b border-day-line py-9 lg:grid-cols-12 lg:gap-x-12 lg:py-12"
            >
              <h3 className="t-display flex items-start gap-4 text-[clamp(1.5rem,3.2vw,2.25rem)] text-ink lg:col-span-6">
                <span
                  aria-hidden="true"
                  className="mt-[0.4em] block size-3 shrink-0 bg-sq-blue"
                />
                {p.title}
              </h3>
              <p className="text-[1.125rem] leading-[1.75] text-ink lg:col-span-5 lg:col-start-8">
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-10">
          <a
            href={accessibility.source}
            target="_blank"
            rel="noopener noreferrer"
            className="t-label inline-flex min-h-11 items-center gap-1.5 text-[1rem] text-action underline decoration-action/35 underline-offset-[6px] transition-colors duration-200 hover:text-action-hover hover:decoration-action"
          >
            Acessibilidade na Microsoft
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>

        {/* Elevate. One figure, given a surface of its own. */}
        <div
          data-reveal
          className="mt-16 bg-day-2 p-8 sm:p-12 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:p-16"
        >
          <p className="lg:col-span-4">
            <span className="t-num block text-[clamp(3.25rem,9vw,5.5rem)] text-ink">
              {elevate.stat}
            </span>
            <span className="t-label mt-4 block text-[0.9375rem] text-ink-muted">
              Microsoft Elevate, cinco anos
            </span>
          </p>
          <p className="measure mt-6 self-center text-[1.0625rem] leading-[1.75] text-ink lg:col-span-7 lg:col-start-6 lg:mt-0">
            {elevate.body}{" "}
            <a
              href={elevate.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-action underline decoration-action/35 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
            >
              Ler o anúncio
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>
      </div>

      {/* And the light goes again. */}
      <div
        aria-hidden="true"
        className="relative mt-16 h-[clamp(6rem,15vh,10.5rem)] lg:mt-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgb(5 6 10 / 0.16) 22%, rgb(5 6 10 / 0.44) 46%, rgb(5 6 10 / 0.74) 67%, rgb(5 6 10 / 0.94) 84%, var(--color-void) 100%)",
        }}
      />
    </section>
  );
}
