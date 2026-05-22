import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Werk",
  description:
    "Onze eerste opdrachten zijn in uitvoering. Cases verschijnen hier zodra ze in productie staan.",
};

export default function WerkPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="min-h-[70svh] px-6 pb-24 pt-40 md:px-12 md:pt-48">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Werk
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 font-display text-[clamp(3rem,10vw,10rem)] font-medium leading-[0.92] tracking-[-0.03em]">
                Werk dat<br />
                draait<span className="text-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Onze eerste opdrachten zijn in uitvoering. Cases verschijnen hier
                zodra ze in productie staan en onze klanten ze willen delen.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
                Wil je tot die tijd weten wat we bouwen? Begin met de audit — we
                laten je tijdens de kennismaking live zien wat er bij vergelijkbare
                bedrijven werkt.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                href="/start"
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90"
              >
                Start de audit <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
