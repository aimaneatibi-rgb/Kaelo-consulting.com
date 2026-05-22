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
  "Daarom bestaat Kaelo. Wij bouwen software die het saaie, repetitieve werk doet. Het werk waar geen mens gelukkig van wordt en waar geen klant op zit te wachten.",
  "We doen dat niet vanaf een afstand. We komen langs. Een dag op jullie werkvloer. We zien wat er echt gebeurt — niet wat er op het organogram staat. Dat is het verschil tussen software die werkt en software die in een la verdwijnt.",
  "En we leveren in vier weken. Niet “in vier tot zes weken”. Niet “we doen ons best”. Vier weken. Vaste datum. Dat is de enige eerlijke manier om met een MKB-ondernemer te werken — jullie hebben geen jaar om te wachten.",
];

export default function ManifestPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-6 pb-24 pt-40 md:px-12 md:pt-48">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Manifest
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 font-display text-[clamp(3rem,10vw,10rem)] font-medium leading-[0.92] tracking-[-0.03em]">
                Waarom Kaelo<br />
                bestaat<span className="text-accent">.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-3xl space-y-12 text-xl leading-relaxed md:text-2xl">
            {paragrafen.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === paragrafen.length - 1 ? "" : ""}>
                  <span className="mr-4 font-mono text-xs uppercase tracking-widest text-muted-foreground align-top">
                    §{i + 1}
                  </span>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-accent px-6 py-32 text-accent-foreground md:px-12 md:py-48">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="font-display text-[clamp(2rem,6vw,5rem)] leading-tight tracking-tight">
                Wij zijn Kaelo.<br />
                Wij bouwen het systeem.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/start"
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-background px-10 py-5 font-mono text-sm uppercase tracking-widest text-foreground transition hover:opacity-90"
              >
                Start de audit
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
