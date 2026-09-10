import { ArrowUpRight } from "lucide-react";

import { AccessibilityField } from "@/components/accessibility-field";
import { Action } from "@/components/ui/action";
import { SectionHeading } from "@/components/ui/section-heading";
import { accessibility, elevate } from "@/lib/content";

/**
 * The second climax.
 *
 * The hero takes the mark apart to say the company is a system. This section
 * takes the interface apart to say the same thing about the people using it —
 * and it is the only place on the page where the visitor's own movement
 * changes what is on screen, which is the argument acted out rather than
 * described.
 *
 * The composition is weighted the other way round from the hero on purpose:
 * there the type holds the left and the object the right at equal size, here
 * the field is much the larger half and the type sits beside it as a caption.
 * Same room, different shot.
 *
 * The band at the foot is editorial, not a card grid: two rows, each a name
 * against a line of prose, divided by hairlines. One is about who can get help
 * with the products, the other about who can learn to build with them.
 */
export function Accessibility() {
  return (
    <section
      id="acessibilidade"
      aria-labelledby="acessibilidade-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      {/* No seam at the top. The section before this one already closes into
          the dark, and the field supplies its own light. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(64% 46% at 76% 42%, rgb(0 106 189 / 0.16) 0%, transparent 74%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter pt-24 pb-24 md:px-8 lg:pt-36 lg:pb-32">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-5 lg:pr-4">
            <SectionHeading
              id="acessibilidade-heading"
              title={accessibility.headline}
              size="lg"
            />

            <p
              data-reveal
              className="measure-tight mt-7 text-[1.0625rem] leading-[1.7] text-mist sm:text-[1.125rem]"
            >
              {accessibility.lead}
            </p>

            <p data-reveal className="mt-8">
              <a
                href={accessibility.source}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-white underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-white"
              >
                Acessibilidade na Microsoft
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>

          <div data-reveal className="lg:col-span-7">
            <AccessibilityField />
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--edge-strong)] lg:mt-24">
          <div
            data-reveal
            className="grid gap-y-5 border-b border-[var(--edge)] py-8 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:py-10"
          >
            <h3 className="t-title text-[1.375rem] text-white lg:col-span-3">
              {accessibility.desk.title}
            </h3>
            <p className="text-[1.0625rem] leading-[1.7] text-fog lg:col-span-6">
              {accessibility.desk.body}
            </p>
            <div className="lg:col-span-3 lg:justify-self-end">
              <Action
                href={accessibility.desk.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
              >
                {accessibility.desk.cta}
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </Action>
            </div>
          </div>

          {/* Elevate belongs to the same argument about who gets to take part,
              so it keeps its place here — as one line, not as a panel. */}
          <div
            data-reveal
            className="grid gap-y-5 py-8 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:py-10"
          >
            <h3 className="t-title flex items-baseline gap-3 text-[1.375rem] text-white lg:col-span-3">
              <span className="t-num text-[1.75rem] text-white">
                {elevate.stat}
              </span>
              Microsoft Elevate
            </h3>
            <p className="text-[1.0625rem] leading-[1.7] text-fog lg:col-span-6">
              {elevate.body}
            </p>
            <div className="lg:col-span-3 lg:justify-self-end">
              <a
                href={elevate.source}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-white underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-white"
              >
                Ler o anúncio
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
