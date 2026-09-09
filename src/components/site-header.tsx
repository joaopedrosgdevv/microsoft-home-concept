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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Solid rather than translucent: over the two dark bands a blurred
        // header sampled the brand squares as colour smears, and nav contrast
        // changed with whatever happened to be scrolling behind it.
        "sticky top-0 z-40 h-(--header-h) bg-paper",
        "transition-[border-color] duration-300",
        scrolled ? "border-b border-line" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[100rem] items-center gap-6 px-gutter md:px-8">
        <Link
          href="/"
          className="-mx-2 flex h-11 items-center px-2"
          aria-label="Microsoft — página inicial"
        >
          <MicrosoftLockup />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex h-11 items-center px-3 text-[0.9375rem] t-label text-ink-muted",
                    "transition-colors duration-200 hover:text-ink",
                    "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left",
                    "after:scale-x-0 after:bg-ink after:transition-transform after:duration-300",
                    "after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Action
            href="https://www.microsoft.com/en-us/investor"
            variant="outline"
            className="hidden h-11 px-4 text-sm md:inline-flex"
          >
            Investidores
          </Action>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "-mr-2 flex size-11 items-center justify-center text-ink lg:hidden",
                "transition-colors duration-200 hover:text-action",
              )}
              aria-label="Abrir menu de navegação"
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>

            <SheetContent aria-describedby={undefined}>
              <SheetTitle className="sr-only">Navegação</SheetTitle>
              <SheetDescription className="sr-only">
                Seções da página inicial da Microsoft
              </SheetDescription>

              <div className="flex h-(--header-h) shrink-0 items-center px-gutter">
                <MicrosoftLockup />
                <SheetClose
                  className={cn(
                    "-mr-2 ml-auto flex size-11 items-center justify-center text-ink",
                    "transition-colors duration-200 hover:text-action",
                  )}
                  aria-label="Fechar menu de navegação"
                >
                  <X aria-hidden="true" className="size-5" />
                </SheetClose>
              </div>

              <nav aria-label="Principal (mobile)" className="px-gutter pb-8">
                <ul>
                  {nav.map((item, i) => (
                    <li key={item.href} className="border-t border-line">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="flex min-h-14 items-center gap-4 py-3 text-[1.375rem] t-title text-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="size-2 shrink-0"
                            style={{
                              backgroundColor: [
                                "#f25022",
                                "#7fba00",
                                "#00a4ef",
                                "#ffb900",
                                "#5c5c66",
                              ][i],
                            }}
                          />
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <Action
                  href="https://www.microsoft.com/en-us/investor"
                  variant="outline"
                  className="mt-6 w-full"
                >
                  Relações com investidores
                </Action>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
