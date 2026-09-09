import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { sustainability } from "@/lib/content";

export function Sustainability() {
  return (
    <section
      id="sustentabilidade"
      aria-labelledby="sustentabilidade-heading"
      className="border-b border-line bg-surface"
    >
      <div className="mx-auto max-w-[100rem] px-gutter py-20 md:px-8 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeading
              id="sustentabilidade-heading"
              eyebrow="Sustentabilidade"
              title="Quatro metas ambientais com prazo em 2030"
            />
            <p data-reveal className="measure mt-6 text-ink-muted">
              {sustainability.longTerm}
            </p>
            <p data-reveal className="mt-6">
              <a
                href={sustainability.source}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-action underline decoration-action/30 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
              >
                Compromissos de sustentabilidade
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>

          {/* The renewable-energy milestone: one figure, given room. */}
          <figure
            data-reveal
            className="col-span-12 border-t border-ink pt-8 lg:col-span-5 lg:col-start-8 lg:border-t-2"
          >
            <p className="t-num text-[clamp(3.5rem,11vw,6rem)] text-ink">
              {sustainability.milestone.stat}
            </p>
            <figcaption className="mt-4">
              <p className="t-label text-ink">
                {sustainability.milestone.label}
              </p>
              <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
                {sustainability.milestone.body}{" "}
                <a
                  href={sustainability.milestoneSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action underline decoration-action/30 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
                >
                  Ler o anúncio
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </p>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-16 grid gap-px border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {sustainability.goals.map((g) => (
            <li
              key={g.title}
              data-reveal
              className="border-b border-line py-8 pr-8 lg:border-b-0"
            >
              <h3 className="t-title text-[1.25rem] text-ink">{g.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                {g.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
