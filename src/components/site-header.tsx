"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { MicrosoftLockup } from "@/components/brand/microsoft-mark";
import { Action } from "@/components/ui/action";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

/*
 * One colour per destination, in the mark's order, with the fifth left white
 * because there is no fifth quadrant to borrow from. It only ever shows as a
 * two-pixel underline, which is as much colour as this bar can carry without
 * competing with the stage below it.
 */
const ACCENT = ["#f25022", "#7fba00", "#00a4ef", "#ffb900", "#ffffff"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Out of flow: the hero starts at the top of the viewport and the bar
        // floats over it, which is the only way the stage reads full-bleed.
        "on-void fixed inset-x-0 top-0 z-50 h-(--header-h) text-white",
        "transition-[background-color,border-color,backdrop-filter] duration-500",
        // Dark glass rather than a colour that follows the section underneath:
        // the bar keeps one contrast relationship for the whole page, so the
        // links never have to change colour mid-scroll.
        scrolled
          ? "border-b border-[var(--edge)] bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[100rem] items-center gap-8 px-gutter md:px-8">
        {/* The only link on the page that points at a route rather than a
            hash or an external URL, so it is the only one that stays a
            next/link. Prefetching is off: the route it would fetch is the
            one the visitor is already reading. */}
        <Link
          href="/"
          prefetch={false}
          className="-mx-2 flex h-11 items-center px-2 text-white"
          aria-label="Microsoft — página inicial"
        >
          <MicrosoftLockup />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "group/nav t-label relative flex h-11 items-center px-3.5 text-[0.9375rem]",
                    "text-white/70 transition-colors duration-200 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left scale-x-0",
                      "transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100",
                    )}
                    style={{ backgroundColor: ACCENT[i] }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Action
            href="https://www.microsoft.com/en-us/investor"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
          >
            Investidores
            <span className="sr-only"> (abre em nova aba)</span>
          </Action>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "-mr-2 flex size-11 items-center justify-center text-white lg:hidden",
                "transition-colors duration-200 hover:text-sq-blue",
              )}
              aria-label="Abrir menu de navegação"
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>

            <SheetContent
              aria-describedby={undefined}
              className="on-void border-[var(--edge)] bg-void text-white"
            >
              <SheetTitle className="sr-only">Navegação</SheetTitle>
              <SheetDescription className="sr-only">
                Seções da página inicial da Microsoft
              </SheetDescription>

              <div className="flex h-(--header-h) shrink-0 items-center px-gutter">
                <MicrosoftLockup />
                <SheetClose
                  className={cn(
                    "-mr-2 ml-auto flex size-11 items-center justify-center text-white",
                    "transition-colors duration-200 hover:text-sq-blue",
                  )}
                  aria-label="Fechar menu de navegação"
                >
                  <X aria-hidden="true" className="size-5" />
                </SheetClose>
              </div>

              <nav aria-label="Principal (mobile)" className="px-gutter pb-8">
                <ul>
                  {nav.map((item, i) => (
                    <li
                      key={item.href}
                      className="border-t border-[var(--edge)]"
                    >
                      <SheetClose asChild>
                        <a
                          href={item.href}
                          className="t-display flex min-h-16 items-center gap-4 py-3 text-[1.5rem] text-white"
                        >
                          <span
                            aria-hidden="true"
                            className="size-2.5 shrink-0"
                            style={{ backgroundColor: ACCENT[i] }}
                          />
                          {item.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <Action
                  href="https://www.microsoft.com/en-us/investor"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="mt-7 w-full"
                >
                  Relações com investidores
                  <span className="sr-only"> (abre em nova aba)</span>
                </Action>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
