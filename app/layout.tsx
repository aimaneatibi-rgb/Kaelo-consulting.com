import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kaelo-consulting.com"),
  title: {
    default: "Kaelo — Wij bouwen het systeem",
    template: "%s — Kaelo",
  },
  description:
    "Wij bouwen AI-systemen die werk weghalen. Op jullie werkvloer ontworpen, in vier weken geleverd. Voor MKB-bedrijven die richting 10x willen.",
  openGraph: {
    title: "Kaelo — Wij bouwen het systeem",
    description:
      "AI-systemen die werk weghalen. Op jullie werkvloer ontworpen, in vier weken geleverd.",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaelo — Wij bouwen het systeem",
    description:
      "AI-systemen die werk weghalen. Op jullie werkvloer ontworpen, in vier weken geleverd.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} kaelo-grain`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
