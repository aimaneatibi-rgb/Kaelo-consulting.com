import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StartForm from "./StartForm";

export const metadata: Metadata = {
  title: "Start de audit — gratis, ± 5 minuten",
  description:
    "Zes korte vragen in je eigen woorden. Je krijgt direct een eerste analyse van waar tijd verloren gaat — daarna nemen wij binnen één werkdag contact op.",
  alternates: { canonical: "/start" },
  openGraph: {
    url: "/start",
    title: "Start de audit — gratis, ± 5 minuten",
    description:
      "Zes korte vragen. Direct een eerste analyse van waar tijd verloren gaat in jullie proces.",
  },
};

export default function StartPage() {
  return (
    <>
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
