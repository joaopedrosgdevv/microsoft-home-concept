"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/action";
import { SQUARE, commitments, mission, values } from "@/lib/content";

/**
 * The mission, and the four things that hold it up.
 *
 * The argument is that the mission is the constant and the commitments are
 * what serve it, so the layout says exactly that: the statement is pinned and
 * stays while the four pass it. They hang off a single lit spine rather than
 * sitting in four boxes — a 2x2 of cards would make them look interchangeable,
 * which is the opposite of the point.
 *
 * Whichever commitment is being read lights the room in its own colour, and the
 * light moves further down the wall as you go. That is the only way the section
 * changes; nothing slides or fades in on its own.
 */

/** Where each commitment's lamp hangs. It descends as the section is read. */
const LAMP = {
  oportunidade: "78% 26%",
  confianca: "84% 44%",
  direitos: "72% 62%",
  "sustentabilidade-compromisso": "80% 80%",
} as const;

export function Commitments() {
  const [active, setActive] = useState<string>(commitments[0].id);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;

    // A narrow band across the middle of the viewport: whichever commitment is
    // crossing it is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.id;
          if (id) setActive(id);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );

    el.querySelectorAll("[data-id]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="missao"
      aria-labelledby="missao-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        {commitments.map((c) => (
          <div
            key={c.id}
            data-live={active === c.id || undefined}
            className="lamp"
            style={{
              background: `radial-gradient(52% 46% at ${
                LAMP[c.id as keyof typeof LAMP]
              }, ${SQUARE[c.color]}2b 0%, transparent 72%)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter pt-24 pb-24 md:px-8 lg:pt-36 lg:pb-40">
        <div className="grid items-start gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3.5rem)] lg:col-span-5 lg:self-start">
            <SectionHeading
              id="missao-heading"
              size="lg"
              title="Quatro compromissos sustentam a missão"
            />

            <blockquote data-reveal className="mt-9 border-l border-[var(--edge-strong)] pl-6">
              <p className="text-[clamp(1.25rem,2.4vw,1.625rem)] leading-[1.35] text-mist">
                {mission.statement}
              </p>
              <footer className="t-label mt-4 text-label text-fog">
                Valores: {values.join(", ").toLowerCase()}.
              </footer>
            </blockquote>

            <p data-reveal className="mt-8 text-[0.9375rem] text-fog">
              <TextLink
                href="https://www.microsoft.com/en-us/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white decoration-white/30 hover:text-white hover:decoration-white"
              >
                Ver na página institucional
                <span className="sr-only"> (abre em nova aba)</span>
              </TextLink>
            </p>
          </div>

          <ul
            ref={list}
            className="relative lg:col-span-6 lg:col-start-7"
          >
            <span aria-hidden="true" className="spine" />

            {commitments.map((c) => (
              <li
                key={c.id}
                data-id={c.id}
                data-reveal
                className="relative pl-9 py-12 first:pt-4 lg:py-16 lg:pl-14 lg:first:pt-0"
              >
                <span
                  aria-hidden="true"
                  data-live={active === c.id || undefined}
                  className="knot mt-2 size-4 lg:size-5"
                  style={
                    {
                      "--c": SQUARE[c.color],
                      backgroundColor: SQUARE[c.color],
                    } as React.CSSProperties
                  }
                />
                <h3 className="t-display text-[clamp(1.5rem,3.4vw,2.375rem)] text-white">
                  {c.title}
                </h3>
                <p className="measure mt-4 text-[1.0625rem] leading-[1.65] text-fog">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
