import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  // absolute titel: anders plakt de template er nog een "— Kaelo" achter
  title: { absolute: "Start de audit — gratis, ± 5 minuten | Kaelo" },
  description:
    "Zes korte vragen in je eigen woorden. Je ziet direct waar bij jullie de omzet ligt — daarna nemen wij binnen één werkdag contact op. Gratis, zonder verplichtingen.",
  alternates: { canonical: "/start" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Kaelo",
    url: "/start",
    title: "Start de audit — gratis, ± 5 minuten",
    description:
      "Zes korte vragen. Direct een eerste analyse van waar bij jullie de omzet ligt.",
    // expliciet meegeven: een eigen openGraph-blok erft de share-image niet
    images: ["/brand/pink/kaelo-pink-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/pink/kaelo-pink-og-1200x630.png"],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.kaelo-consulting.com/" },
    { "@type": "ListItem", position: 2, name: "Start de audit", item: "https://www.kaelo-consulting.com/start" },
  ],
};

export default function StartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />

      {/* roze kop, zelfde ritme als de statische pagina's */}
      <section className="bg-accent px-5 pb-16 pt-14 md:px-8 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <span className="k-pill">Audit · ± 5 minuten</span>
          <h1 className="k-h mt-6 text-[clamp(38px,7vw,88px)]">
            Vertel ons over
            <br />
            <span className="text-white">je bedrijf.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed md:text-lg">
            Zes korte vragen, in je eigen woorden. Je krijgt direct een eerste
            analyse van waar de kansen liggen — en wij nemen binnen één werkdag
            contact op. Geen verplichtingen, geen kosten.
          </p>
        </div>
      </section>
      <div className="k-scallop" />

      <main className="min-h-[60svh] px-5 pb-24 pt-14 md:px-8">
        <StartForm />
      </main>

      <Footer />
    </>
  );
}
