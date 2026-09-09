import { HeroLattice } from "@/components/hero-lattice";
import { Action } from "@/components/ui/action";
import { SQUARE } from "@/lib/content";

/**
 * The mission sentence is the hero. It is broken into three typeset lines so
 * the opening can read as one rising movement; on narrow screens each line
 * wraps inside its own mask, which keeps the effect intact without hardcoding
 * a break for every viewport.
 *
 * The opening sequence is pure CSS so it begins at first paint rather than
 * after hydration — no flash of the final state, and no JavaScript standing
 * between the visitor and the largest text on the page.
 */
export function Hero() {
  const lines = [
    "Capacitar todas as pessoas",
    "e organizações do planeta",
    "a conquistar mais.",
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[62%] sm:block"
      >
        <HeroLattice />
      </div>

      <div className="mx-auto max-w-[100rem] px-gutter md:px-8">
        <div className="grid grid-cols-12 pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
          <div className="col-span-12 lg:col-span-10">
            <p className="intro-fade t-label mb-7 flex items-center gap-3 text-label text-ink-muted sm:mb-9">
              <span className="flex gap-[3px]" aria-hidden="true">
                {(Object.keys(SQUARE) as (keyof typeof SQUARE)[]).map((k) => (
                  <span
                    key={k}
                    className="intro-square block size-2"
                    style={{ backgroundColor: SQUARE[k] }}
                  />
                ))}
              </span>
              Nossa missão
            </p>

            <h1
              id="hero-heading"
              className="t-display text-[clamp(2rem,5.6vw,5.25rem)] text-ink"
            >
              {lines.map((line) => (
                <span
                  key={line}
                  className="intro-line block overflow-hidden pb-[0.06em]"
                >
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="col-span-12 mt-9 sm:mt-11 lg:col-span-6">
            <p className="intro-fade measure text-[1.0625rem] leading-relaxed text-ink-muted sm:text-[1.1875rem]">
              Desde 1975, a Microsoft constrói as plataformas sobre as quais
              outras pessoas constroem: nuvem, inteligência artificial,
              produtividade e segurança, entregues como infraestrutura de uso
              geral e não como produto de nicho.
            </p>

            <div className="intro-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Action href="#plataforma">Conhecer a plataforma</Action>
              <Action href="#resultados" variant="outline">
                Ver resultados do ano fiscal
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
