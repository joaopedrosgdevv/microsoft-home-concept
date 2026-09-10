"use client";

import { useState } from "react";

import { HeroSystem } from "@/components/hero-system";
import { Action } from "@/components/ui/action";
import { SQUARE, platform, type SquareColor } from "@/lib/content";

/**
 * The stage.
 *
 * Everything is dark so that the only saturated colour on screen is Microsoft's
 * own, and so the four quadrants can behave like light sources rather than
 * swatches. The composition is deliberately weighted: type holds the left third,
 * the mark holds the right, and the rail closes the frame along the bottom so
 * the stage reads as a composed shot instead of a page with a large heading on it.
 *
 * The rail is not decoration either — it is the accessible half of the graphic.
 * Pointing at a pillar pushes its quadrant forward and pulls the others back,
 * which is how the four names and the four squares are stated to be the same
 * four things.
 */

/*
 * Rail order follows the mark, not the content file: red and green above,
 * blue and yellow below. Pointing at the first item has to light the quadrant
 * in the corner the eye is already on.
 */
const RAIL_ORDER: SquareColor[] = ["red", "green", "blue", "yellow"];

const rail = RAIL_ORDER.map((color) => {
  const pillar = platform.find((p) => p.color === color);
  if (!pillar) throw new Error(`Sem pilar para a cor ${color}`);
  return { color, title: pillar.title, lead: pillar.items[0] };
});

const LINES = ["Inteligência", "em escala", "planetária."];

export function Hero() {
  const [active, setActive] = useState<SquareColor | null>(null);

  return (
    <section
      aria-labelledby="hero-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      {/* Atmosphere. Four layers, back to front: structure, key light, the
          cool fill that keeps the shadows from going flat, and grain. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 52% at 72% 30%, rgb(0 106 189 / 0.30) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 40% at 14% 8%, rgb(96 74 190 / 0.22) 0%, transparent 74%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-[100rem] flex-col px-gutter pt-(--header-h) md:px-8">
        <div className="grid flex-1 items-center gap-y-8 py-8 sm:py-14 lg:grid-cols-12 lg:gap-x-10 lg:py-14">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <h1
              id="hero-heading"
              className="t-display text-[clamp(2.75rem,7.2vw,5rem)] text-white"
            >
              {LINES.map((line) => (
                // Each line rides up out of its own mask. If it has to wrap on
                // a narrow screen it wraps inside the mask, so nothing clips.
                <span key={line} className="rise block overflow-hidden pb-[0.06em]">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>

            <p className="lift mt-7 max-w-[44ch] text-[1.0625rem] leading-[1.65] text-fog sm:text-[1.125rem]">
              Desde 1975 com a mesma missão: capacitar todas as pessoas e
              organizações do planeta a conquistar mais.
            </p>

            <div className="lift lift-late mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Action href="#plataforma" variant="primary">
                Conhecer a plataforma
              </Action>
              <Action href="#resultados" variant="ghost">
                Ver os resultados
              </Action>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
            <HeroSystem active={active} />
          </div>
        </div>

        {/* The rail. Full width, hairline above, and the last thing before the
            stage gives way to daylight. */}
        <nav
          aria-label="Ecossistema Microsoft"
          className="lift lift-later border-t border-[var(--edge)] pb-9 sm:pb-11"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {rail.map((item, i) => (
              <li
                key={item.color}
                className={[
                  "border-[var(--edge)]",
                  i % 2 === 1 ? "border-l" : "",
                  i > 1 ? "border-t lg:border-t-0" : "",
                  i > 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <a
                  href="#plataforma"
                  onPointerEnter={() => setActive(item.color)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(item.color)}
                  onBlur={() => setActive(null)}
                  className={[
                    "group flex min-h-20 flex-col justify-center gap-1.5 py-5",
                    "pr-4 transition-colors duration-300 hover:bg-white/[0.04] sm:pr-6 lg:min-h-24",
                    // Leading cell of each row starts flush with the headline.
                    i % 2 === 0 ? "pl-0" : "pl-4 sm:pl-6",
                    i === 2 ? "lg:pl-6" : "",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150 group-focus-visible:scale-150"
                      style={{ backgroundColor: SQUARE[item.color] }}
                    />
                    <span className="t-label text-[0.9375rem] text-white">
                      {item.title}
                    </span>
                  </span>
                  <span className="pl-[1.25rem] text-[0.8125rem] text-fog">
                    {item.lead}
                  </span>
                  <span className="sr-only"> — ver na seção Plataforma</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/*
       * The seam. The stage does not stop at a border: light from the section
       * below rises into it, so the scroll reads as one continuous room rather
       * than two bands meeting at an edge.
       *
       * This is the only part of the approved hero that changed after the rest
       * of the page was rebuilt — it used to fade into daylight, because the
       * section under it was light. It is dark now.
       */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(4.5rem,11vh,8rem)]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 120% at 50% 122%, rgb(0 106 189 / 0.28) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-void) 92%)",
          }}
        />
      </div>
    </section>
  );
}
