import type { Metadata } from "next";
import { Archivo, Unbounded, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kaelo-consulting.com"),
  title: {
    default: "Kaelo — Wij bouwen het systeem",
    template: "%s — Kaelo",
  },
  description:
    "Wij bouwen AI-systemen die werk weghalen. Eigen code, vaste prijs, vaste datum. Voor MKB-bedrijven die richting 10x willen.",
  openGraph: {
    title: "Kaelo — Wij bouwen het systeem",
    description:
      "AI-systemen die werk weghalen. Eigen code, vaste prijs, vaste datum.",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaelo — Wij bouwen het systeem",
    description:
      "AI-systemen die werk weghalen. Eigen code, vaste prijs, vaste datum.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${archivo.variable} ${unbounded.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
