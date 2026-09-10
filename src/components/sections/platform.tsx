"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { PlatformEcosystem } from "@/components/platform-ecosystem";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SQUARE, platform, type SquareColor } from "@/lib/content";

/**
 * One tableau instead of a scroll.
 *
 * The four areas are not a list to be read top to bottom — they are one system
 * seen at once, so the section holds a single screen: the diagram on the left,
 * the four names on the right, and the products of whichever name you choose
 * underneath it. Nothing here reveals on scroll except the block itself; the
 * movement is the visitor's, which is the kind worth having.
 *
 * Radix drives it, so the four names are a real tablist: arrow keys move
 * between them, the panel is wired to its tab, and the diagram is decoration
 * that follows along.
 */
export function Platform() {
  const [active, setActive] = useState<SquareColor>(platform[0].color);

  return (
    <section
      id="plataforma"
      aria-labelledby="plataforma-heading"
      className="on-void relative isolate overflow-hidden bg-void text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="stage-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 46% at 26% 50%, rgb(0 106 189 / 0.20) 0%, transparent 72%)",
          }}
        />
        <div className="stage-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-gutter py-24 md:px-8 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-12">
          <SectionHeading
            id="plataforma-heading"
            title="Uma base técnica, quatro frentes"
            className="lg:col-span-6"
          />
          <p
            data-reveal
            className="measure self-end text-[1.0625rem] leading-[1.7] text-fog lg:col-span-5 lg:col-start-8"
          >
            Identidade, governança de dados e modelo de segurança são
            compartilhados entre as quatro frentes, o que permite adotá-las
            isoladamente ou em conjunto.
          </p>
        </div>

        <Tabs
          value={active}
          onValueChange={(v) => setActive(v as SquareColor)}
          orientation="vertical"
          className="mt-12 grid items-center gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-16"
        >
          <div
            data-reveal
            className="order-2 mx-auto w-full max-w-[26rem] lg:order-1 lg:col-span-5 lg:max-w-none"
          >
            <PlatformEcosystem active={active} />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <TabsList
              aria-label="Frentes da plataforma"
              className="flex-col items-stretch border-t border-[var(--edge)]"
            >
              {platform.map((p) => (
                <TabsTrigger
                  key={p.color}
                  value={p.color}
                  style={{ "--sq": SQUARE[p.color] } as React.CSSProperties}
                  className="group/tab flex min-h-16 items-center gap-4 border-b border-[var(--edge)] py-4 pr-4 pl-4 transition-colors duration-300 hover:bg-white/[0.035] data-[state=active]:bg-white/[0.05]"
                >
                  <span
                    aria-hidden="true"
                    className="size-3 shrink-0 bg-(--sq) transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=active]/tab:scale-150 group-data-[state=active]/tab:shadow-[0_0_1.75rem_var(--sq)]"
                  />
                  <span className="t-title text-[1.375rem] text-fog transition-colors duration-300 group-hover/tab:text-white group-data-[state=active]/tab:text-white sm:text-[1.75rem]">
                    {p.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {platform.map((p) => (
              <TabsContent
                key={p.color}
                value={p.color}
                className="pt-8 lg:min-h-[15rem]"
              >
                <p className="measure text-[1.0625rem] leading-[1.7] text-mist">
                  {p.body}
                </p>

                <h3 className="sr-only">Produtos de {p.title}</h3>
                <ul className="mt-7 flex flex-wrap gap-x-2.5 gap-y-2.5">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="border border-[var(--edge-strong)] px-3.5 py-2 text-[0.875rem] text-mist"
                      style={{
                        boxShadow: `inset 2px 0 0 0 ${SQUARE[p.color]}`,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label mt-8 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-white underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-white"
                >
                  {p.title} na Microsoft
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
