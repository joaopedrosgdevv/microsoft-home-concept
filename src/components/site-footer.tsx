import { Plus } from "lucide-react";

import { MicrosoftLockup } from "@/components/brand/microsoft-mark";
import { SQUARE, footerGroups } from "@/lib/content";

/**
 * The plinth.
 *
 * The stage does not end and hand over to a white footer — the page stays in
 * the same room, and the footer is simply its lowest, quietest level. What
 * separates it from the close above is a two-pixel band of the four colours
 * running the full width: the same device as the header's underlines, laid
 * flat, so the page is bracketed by the mark at both ends.
 *
 * Each column carries one of the four colours, and its links underline in it.
 */
const ACCENT = [SQUARE.red, SQUARE.green, SQUARE.blue, SQUARE.yellow];

const legal = [
  { label: "Privacidade", href: "https://privacy.microsoft.com/pt-br" },
  {
    label: "Termos de uso",
    href: "https://www.microsoft.com/pt-br/legal/terms-of-use",
  },
  {
    label: "Marcas registradas",
    href: "https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks",
  },
];

const linkClass =
  "inline-flex min-h-9 items-center text-[0.9375rem] text-fog underline-offset-[6px] " +
  "transition-colors duration-200 hover:text-white hover:underline " +
  "hover:[text-decoration-color:var(--accent,currentColor)]";

export function SiteFooter() {
  return (
    <footer className="on-void relative bg-void text-white">
      {/* The mark, unrolled into a rule. */}
      <div aria-hidden="true" className="flex h-0.5 w-full">
        {ACCENT.map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      <div className="mx-auto max-w-[100rem] px-gutter py-14 md:px-8 lg:py-20">
        {/* Columns on desktop; the same links collapse into an accordion on
            small screens so the footer does not become a wall of text. */}
        <nav aria-label="Rodapé (mobile)" className="lg:hidden">
          {footerGroups.map((group, i) => (
            <details
              key={group.title}
              className="group border-t border-[var(--edge)]"
              style={{ "--accent": ACCENT[i] } as React.CSSProperties}
            >
              <summary className="t-label flex min-h-14 cursor-pointer list-none items-center gap-3 text-[0.9375rem] text-white [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0"
                  style={{ backgroundColor: ACCENT[i] }}
                />
                {group.title}
                {/* A plus that rotates into a cross to close, rather than a
                    chevron pointing at nothing. */}
                <Plus
                  aria-hidden="true"
                  className="ml-auto size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                />
              </summary>
              <ul className="grid gap-1 pb-5 pl-5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <nav
          aria-label="Rodapé"
          className="hidden lg:grid lg:grid-cols-4 lg:gap-x-8"
        >
          {footerGroups.map((group, i) => (
            <div
              key={group.title}
              className="border-t border-[var(--edge)] pt-6"
              style={{ "--accent": ACCENT[i] } as React.CSSProperties}
            >
              <h2 className="t-label flex items-center gap-3 text-[0.9375rem] text-white">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0"
                  style={{ backgroundColor: ACCENT[i] }}
                />
                {group.title}
              </h2>
              <ul className="mt-5 grid gap-1 pl-5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--edge)] pt-8 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <MicrosoftLockup className="text-white" />

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="text-[0.9375rem] text-fog">
              © {new Date().getFullYear()} Microsoft
            </li>
          </ul>
        </div>

        <p className="mt-8 max-w-[80ch] text-[0.8125rem] leading-relaxed text-fog">
          Microsoft, Azure, Microsoft 365, Copilot, Windows, Xbox, Dynamics 365
          e os logotipos da Microsoft são marcas do grupo de empresas Microsoft.
          Esta página é uma peça institucional de demonstração; os dados
          financeiros, metas e compromissos citados vêm de comunicações
          públicas da Microsoft, com as fontes indicadas em cada seção.
        </p>
      </div>
    </footer>
  );
}
