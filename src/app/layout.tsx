import type { Metadata, Viewport } from "next";
import { Archivo, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

/**
 * Two voices, deliberately unalike at the sizes each one works at.
 *
 * Schibsted Grotesk speaks only above 2rem: large x-height, closed apertures
 * and short extenders let a headline sit tight without turning into a slab.
 * Archivo carries everything below that, where its width axis does the work
 * the second family would otherwise be needed for — condensed for labels,
 * normal for reading.
 */
const display = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const siteUrl = "https://www.microsoft.com";
const description =
  "Capacitar todas as pessoas e organizações do planeta a conquistar mais. Conheça a missão, os resultados, a plataforma de IA e nuvem e os compromissos da Microsoft com sustentabilidade e acessibilidade.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Microsoft — Capacitar todas as pessoas e organizações do planeta",
    template: "%s | Microsoft",
  },
  description,
  applicationName: "Microsoft",
  authors: [{ name: "Microsoft" }],
  keywords: [
    "Microsoft",
    "inteligência artificial",
    "Copilot",
    "Azure",
    "nuvem",
    "segurança",
    "Microsoft 365",
    "sustentabilidade",
    "acessibilidade",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Microsoft",
    title: "Microsoft — Capacitar todas as pessoas e organizações do planeta",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Microsoft — Capacitar todas as pessoas e organizações do planeta",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // The page is a dark stage from the hero to the footer, with one daylight
  // band in the middle, so browser chrome and form controls follow it.
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${display.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
