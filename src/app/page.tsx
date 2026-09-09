import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Commitments } from "@/components/sections/commitments";
import { Results } from "@/components/sections/results";
import { Platform } from "@/components/sections/platform";
import { Sustainability } from "@/components/sections/sustainability";
import { Accessibility } from "@/components/sections/accessibility";
import { Closing } from "@/components/sections/closing";
import { mission } from "@/lib/content";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Microsoft",
  url: "https://www.microsoft.com",
  foundingDate: "1975",
  slogan: mission.statement,
  sameAs: [
    "https://www.linkedin.com/company/microsoft",
    "https://github.com/microsoft",
    "https://news.microsoft.com",
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="t-label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-ink focus:px-5 focus:text-paper"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main id="conteudo">
        <Hero />
        <Commitments />
        <Results />
        <Platform />
        <Sustainability />
        <Accessibility />
        <Closing />
      </main>

      <SiteFooter />

      <MotionProvider />

      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}
