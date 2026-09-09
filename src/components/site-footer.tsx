import { Plus } from "lucide-react";

import { MicrosoftLockup } from "@/components/brand/microsoft-mark";
import { footerGroups } from "@/lib/content";

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
  "inline-flex min-h-9 items-center text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink hover:underline underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-[100rem] px-gutter py-14 md:px-8 lg:py-20">
        {/* Columns on desktop; the same links collapse into an accordion on
            small screens so the footer does not become a wall of text. */}
        <nav aria-label="Rodapé" className="lg:hidden">
          {footerGroups.map((group) => (
            <details
              key={group.title}
              className="group border-t border-line"
            >
              <summary className="t-label flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-label text-ink [&::-webkit-details-marker]:hidden">
                {group.title}
                {/* Squares and crosses, not chevrons: the plus rotates into a
                    cross to close rather than pointing somewhere. */}
                <Plus
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                />
              </summary>
              <ul className="grid gap-1 pb-5">
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
          className="hidden border-t border-line pt-12 lg:grid lg:grid-cols-4 lg:gap-8"
        >
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="t-label text-label text-ink">{group.title}</h2>
              <ul className="mt-4 grid gap-1">
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

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <MicrosoftLockup className="text-ink" />

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
            <li className="text-[0.9375rem] text-ink-muted">
              © {new Date().getFullYear()} Microsoft
            </li>
          </ul>
        </div>

        <p className="mt-8 max-w-[80ch] text-[0.8125rem] leading-relaxed text-ink-muted">
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
