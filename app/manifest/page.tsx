import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Manifest",
  description: "Waarom Kaelo bestaat. Een korte uitleg van wat we doen en waarom.",
};

const paragrafen = [
  "De meeste bedrijven proberen te groeien door meer te doen. Meer mensen, meer marketing, meer uren, meer rapporten. Dat werkt soms voor 2x. Voor 10x werkt het nooit.",
  "10x is geen 2x met een tandje erbij. 10x is een ander soort beweging. Je moet werk wéghalen, niet erbij stapelen.",
  "Daarom bestaat Kaelo. Wij bouwen software — code, web, CRM, dashboards, AI-agents. Plus de branding eromheen: positionering, brandbook, brand-workflows. Geen advertenties, geen photoshoots, geen rapporten. Alleen de dingen die nodig zijn om het saaie werk uit jullie dagen te halen.",
  "We werken remote. Als jullie systeem complex is en het de build écht beter maakt, komen we een halve dag meedraaien. Niet voor de show. Een systeem dat op papier werkt maar in de praktijk faalt is een rapport met een UI eromheen.",
  "En we werken snel. Soms in een week. Soms in zes. Wat het project ook vraagt — we noemen vooraf een vaste datum, en die halen we. Dat is de enige eerlijke manier om met een MKB-ondernemer te werken — jullie hebben geen jaar om te wachten.",
];

export default function ManifestPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-accent px-5 pb-20 pt-14 md:px-8 md:pb-24">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <span className="k-pill k-pill-yellow">Manifest</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="k-h mt-7 text-[clamp(42px,9vw,132px)]">
                Waarom Kaelo
                <br />
                <span className="text-white">bestaat.</span>
              </h1>
            </Reveal>
          </div>
        </section>
        <div className="k-scallop" />

        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-3xl space-y-9">
            {paragrafen.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="k-card p-7 md:p-9">
                  <span className="font-display text-sm font-black text-accent">
                    §{i + 1}
                  </span>
                  <p className="mt-3 text-lg font-medium leading-relaxed md:text-xl">
                    {p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-foreground px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <p className="k-h text-[clamp(34px,6.5vw,88px)]">
                Wij zijn Kaelo.
                <br />
                <span className="text-accent">Wij bouwen het systeem.</span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/start" className="k-btn k-btn-pink mt-10">
                Start de audit
                <span aria-hidden>↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
