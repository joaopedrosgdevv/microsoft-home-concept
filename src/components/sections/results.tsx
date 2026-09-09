import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { fiscalYear } from "@/lib/content";

/**
 * The inverted band that breaks the page rhythm. Figures are the content here,
 * so they are set large in tabular figures and everything else stays quiet.
 */
export function Results() {
  return (
    <section
      id="resultados"
      aria-labelledby="resultados-heading"
      className="on-deep border-b border-deep-line bg-deep"
    >
      <div className="mx-auto max-w-[100rem] px-gutter py-20 md:px-8 lg:py-28">
        <div className="grid grid-cols-12 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeading
              id="resultados-heading"
              eyebrow="Desempenho"
              title="O ano fiscal de 2026 em quatro números"
              tone="dark"
            />
          </div>
          <div className="col-span-12 flex items-end lg:col-span-5 lg:col-start-8">
            <p data-reveal className="measure text-deep-muted">
              {fiscalYear.label}. Resultados divulgados em 29 de julho de 2026.
            </p>
          </div>
        </div>

        <dl className="mt-14 grid border-t border-deep-line sm:grid-cols-2 lg:mt-20">
          {fiscalYear.metrics.map((m, i) => (
            <div
              key={m.label}
              data-reveal
              className={[
                "py-9 sm:py-12",
                "sm:[&:nth-child(odd)]:pr-10 sm:[&:nth-child(even)]:pl-10",
                i > 0 ? "border-t border-deep-line" : "",
                i === 1 ? "sm:border-t-0" : "",
                "sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-deep-line",
              ].join(" ")}
            >
              <dt className="t-label text-label text-deep-muted">{m.label}</dt>
              <dd className="mt-4">
                <span className="t-num block text-[clamp(2.5rem,7vw,4.25rem)] text-white">
                  {m.value}
                </span>
                <span className="t-label mt-3 inline-flex items-center gap-1.5 text-label text-sq-green">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  {m.delta}
                  <span className="sr-only"> em relação ao ano anterior</span>
                </span>
                <span className="mt-4 block max-w-[42ch] text-[0.9375rem] leading-relaxed text-deep-muted">
                  {m.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-12 text-[0.9375rem] text-deep-muted">
          <a
            href={fiscalYear.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-white underline decoration-white/35 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            Comunicado de resultados do 4º trimestre do ano fiscal de 2026
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
