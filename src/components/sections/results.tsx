"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { onceInView, prefersReducedMotion } from "@/lib/in-view";
import { SQUARE, fiscalYear } from "@/lib/content";

/**
 * Four figures, and one thing you can actually compare between them.
 *
 * The values are not comparable to each other — annual revenue, a quarter of
 * cloud revenue and a contracted backlog are different quantities — so putting
 * them on one proportional scale would be a lie told with a chart. Growth over
 * the previous year is comparable, so that is what the track lengths encode,
 * and the caption says so. The figures themselves stay type.
 */

const SCALE = Math.max(...fiscalYear.metrics.map((m) => m.growth));

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function Results() {
  const root = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let cancelled = false;
    const cleanups: (() => void)[] = [];

    import("gsap")
      .then(({ default: gsap }) => {
        if (cancelled) return;

        el.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
          // If the row is already on screen there is nothing to arrive from:
          // resetting it to zero now would only show the visitor a number
          // being taken away and given back.
          const r = row.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.92) return;

          const count = row.querySelector<HTMLElement>("[data-count]");
          const fill = row.querySelector<HTMLElement>("[data-fill]");
          const amount = Number(row.dataset.amount);
          const decimals = Number(row.dataset.decimals);

          if (count) count.textContent = fmt(0, decimals);
          if (fill) gsap.set(fill, { scaleX: 0 });

          cleanups.push(
            onceInView(row, () => {
              if (count) {
                const n = { v: 0 };
                gsap.to(n, {
                  v: amount,
                  duration: 1.5,
                  ease: "power2.out",
                  onUpdate: () => {
                    count.textContent = fmt(n.v, decimals);
                  },
                  onComplete: () => {
                    count.textContent = fmt(amount, decimals);
                  },
                });
              }
              if (fill) {
                gsap.to(fill, { scaleX: 1, duration: 1.3, ease: "expo.out" });
              }
            }),
          );
        });
      })
      .catch(() => {
        // No GSAP, no reset: the server-rendered figures are already correct.
      });

    return () => {
      cancelled = true;
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <section
      id="resultados"
      aria-labelledby="resultados-heading"
      className="on-void relative isolate overflow-hidden bg-void-2 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 44% at 8% 12%, rgb(0 106 189 / 0.22) 0%, transparent 74%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter py-24 md:px-8 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="resultados-heading"
              size="lg"
              title="O ano fiscal de 2026 em quatro números"
            />
          </div>
          <p
            data-reveal
            className="self-end text-[0.9375rem] leading-relaxed text-fog lg:col-span-4 lg:col-start-9"
          >
            {fiscalYear.label}. Resultados divulgados em 29 de julho de 2026.
          </p>
        </div>

        <dl ref={root} className="mt-16 lg:mt-24">
          {fiscalYear.metrics.map((m) => (
            <div
              key={m.label}
              data-row
              data-reveal
              data-amount={m.amount}
              data-decimals={m.decimals}
              className="grid items-end gap-x-12 gap-y-5 border-t border-[var(--edge)] py-11 lg:grid-cols-12 lg:py-16"
            >
              {/* The term carries the note as well as the name: <dt> has to be
                  a direct child of the row wrapper, and the note belongs to the
                  same column as the label it qualifies. */}
              <dt className="lg:col-span-4">
                <span className="t-label block text-[0.9375rem] text-white">
                  {m.label}
                </span>
                <span className="mt-2.5 block max-w-[36ch] text-[0.875rem] leading-relaxed text-fog">
                  {m.note}
                </span>
              </dt>

              <dd className="lg:col-span-8">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <p
                    aria-hidden="true"
                    className="t-num text-[clamp(2.75rem,6.4vw,5rem)] text-white"
                  >
                    <span className="text-[0.42em] text-fog">US$ </span>
                    <span data-count>{fmt(m.amount, m.decimals)}</span>
                    <span className="text-[0.42em] text-fog"> bi</span>
                  </p>
                  <p
                    aria-hidden="true"
                    className="t-label shrink-0 text-[1.0625rem]"
                    style={{ color: SQUARE[m.color] }}
                  >
                    {m.delta} ano a ano
                  </p>
                  <span className="sr-only">
                    {m.spoken}, alta de {m.growth}% em relação ao ano anterior.
                  </span>
                </div>

                <div aria-hidden="true" className="track mt-7">
                  <span
                    data-fill
                    className="track-fill"
                    style={
                      {
                        "--c": SQUARE[m.color],
                        "--w": `${(m.growth / SCALE) * 100}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--edge)] pt-8 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-[46ch] text-[0.875rem] leading-relaxed text-fog">
            O comprimento de cada barra representa o crescimento sobre o ano
            anterior, na mesma escala para os quatro indicadores. Os valores não
            são comparáveis entre si.
          </p>
          <a
            href={fiscalYear.source}
            target="_blank"
            rel="noopener noreferrer"
            className="t-label inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[0.9375rem] text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            Comunicado de resultados do 4º trimestre
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
