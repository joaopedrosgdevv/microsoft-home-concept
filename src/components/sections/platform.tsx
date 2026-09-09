import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SQUARE, platform } from "@/lib/content";

/**
 * Four strategic areas as editorial rows rather than a card grid: the colour
 * square is the marker, the products sit in a real list, and the whole block
 * is held together by shared hairlines.
 */
export function Platform() {
  return (
    <section
      id="plataforma"
      aria-labelledby="plataforma-heading"
      className="border-b border-line"
    >
      <div className="mx-auto max-w-[100rem] px-gutter py-20 md:px-8 lg:py-28">
        <div className="grid grid-cols-12 gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <SectionHeading
              id="plataforma-heading"
              eyebrow="Plataforma"
              title="Quatro camadas, uma mesma base técnica"
            />
          </div>
          <div className="col-span-12 flex items-end lg:col-span-4 lg:col-start-9">
            <p data-reveal className="measure text-ink-muted">
              As áreas abaixo compartilham identidade, governança de dados e
              modelo de segurança, o que permite adotá-las de forma isolada ou
              combinada.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-line lg:mt-20">
          {platform.map((p) => (
            <article
              key={p.title}
              data-reveal
              className="group grid grid-cols-12 gap-x-6 gap-y-5 border-b border-line py-10 lg:py-14"
            >
              <div className="col-span-12 lg:col-span-4">
                <h3 className="t-title flex items-start gap-4 text-[1.625rem] text-ink sm:text-[2rem]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] block size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 sm:size-4"
                    style={{ backgroundColor: SQUARE[p.color] }}
                  />
                  {p.title}
                </h3>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <p className="measure text-ink-muted">{p.body}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-label mt-5 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-action underline decoration-action/30 underline-offset-4 transition-colors duration-200 hover:text-action-hover hover:decoration-action"
                >
                  {p.title} na Microsoft
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <h4 className="sr-only">Produtos de {p.title}</h4>
                <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-[0.9375rem] text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 bg-line"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
