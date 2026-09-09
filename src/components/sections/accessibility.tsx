import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { accessibility, elevate } from "@/lib/content";

/**
 * Accessibility and the Elevate commitment share a band: both are the
 * "expand opportunity" argument, one about who can use the products and one
 * about who can learn to build with them.
 */
export function Accessibility() {
  return (
    <section
      id="acessibilidade"
      aria-labelledby="acessibilidade-heading"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-[100rem] px-gutter py-20 md:px-8 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeading
              id="acessibilidade-heading"
              eyebrow="Acessibilidade"
              title="Projetado para ser usável por mais pessoas"
            />
            <p data-reveal className="measure mt-6 text-ink-muted">
              {accessibility.lead}
            </p>
            <p data-reveal className="mt-6">
              <a
                href={accessibility.source}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-action underline decoration-action/30 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
              >
                Acessibilidade na Microsoft
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </div>

          <ul className="col-span-12 lg:col-span-6 lg:col-start-7">
            {accessibility.points.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                className={[
                  "grid grid-cols-[auto_1fr] gap-x-5 py-7",
                  i > 0 ? "border-t border-line" : "border-t border-ink",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-3 bg-sq-blue"
                />
                <div>
                  <h3 className="t-title text-[1.25rem] text-ink sm:text-[1.375rem]">
                    {p.title}
                  </h3>
                  <p className="measure mt-2.5 text-ink-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Elevate: the skilling commitment, set as a single quoted figure. */}
        <div
          data-reveal
          className="mt-16 grid grid-cols-12 gap-x-6 gap-y-6 border-t-2 border-ink pt-10 lg:mt-24"
        >
          <p className="col-span-12 lg:col-span-4">
            <span className="t-num block text-[clamp(3rem,9vw,5rem)] text-ink">
              {elevate.stat}
            </span>
            <span className="t-label mt-3 block text-label text-ink-muted">
              Microsoft Elevate, cinco anos
            </span>
          </p>
          <p className="measure col-span-12 self-end text-[1.0625rem] leading-relaxed text-ink-muted lg:col-span-7 lg:col-start-6">
            {elevate.body}{" "}
            <a
              href={elevate.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-action underline decoration-action/30 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
            >
              Ler o anúncio
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
