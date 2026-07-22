import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Panvia — Case",
  description:
    "Panvia — een vastgoedplatform waar eigenaren rechtstreeks aan kopers verkopen, zonder makelaar. Positionering, eigen huisstijl én build in één hand. Eigen Kaelo-build.",
};

const features = [
  {
    label: "Aanbod",
    body: "Woning, commercieel en vakantie in één overzicht — client-side filters op type, plaats, prijs, oppervlakte en BAR, met resultaatteller en lege-staat.",
  },
  {
    label: "Plaatsen",
    body: "Meerstaps plaatsingsflow met verkopersaccount, eigenaarsverklaring, per-stap validatie in gewone taal en live courtagevergelijking vóór het betalen.",
  },
  {
    label: "Detailpagina",
    body: "Elk pand met galerij, kenmerkentabel, kadastrale info en een contactblok dat rechtstreeks naar de eigenaar leidt.",
  },
  {
    label: "Chat & bieden",
    body: "Marktplaats-achtig gesprek met de eigenaar en een gestructureerd, niet-bindend bod — Panvia bemiddelt bewust niet.",
  },
  {
    label: "Mijn Panvia",
    body: "Eigenaarskant met een inbox van alle gesprekken en biedingen; antwoorden verschijnen live aan de koperszijde.",
  },
  {
    label: "Zakelijk & Projecten",
    body: "Commercieel aanbod met BAR-filter en pakketten voor parken, complexen en ontwikkelaars vanaf tien eenheden.",
  },
];

const stack = ["HTML", "CSS", "JavaScript", "Geen framework", "Eigen huisstijl", "Vercel"];

export default function PanviaCasePage() {
  return (
    <>
      <Nav />
      <main>
        <CaseHero />
        <BlueprintPanel />
        <CaseDetails />
        <NextCaseCTA />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

function CaseHero() {
  return (
    <section className="px-6 pb-16 pt-40 md:px-12 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <Link
            href="/werk"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
          >
            ← Werk
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            02 · Case · Web platform
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-[clamp(4rem,15vw,15rem)] font-medium leading-[0.88] tracking-[-0.04em]">
            Panvia<span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-muted-foreground md:text-3xl">
            Vastgoedplatform, direct van eigenaar naar koper.{" "}
            <span className="text-foreground">
              Geen makelaar, geen bemiddeling.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Eigen Kaelo-build
            </span>
            <span className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Merk + build
            </span>
            <span className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Livegang in voorbereiding
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BLUEPRINT PANEL — op-brand voor Panvia (Ultramarijn, blauwdruk i.p.v. foto) */
/* -------------------------------------------------------------------------- */

function BlueprintPanel() {
  return (
    <section className="px-6 pb-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div
            className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-xl border border-border"
            style={{
              backgroundColor: "#2438D8",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <span className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">
              Panvia
            </span>
            <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
              Huisstijl · Blauwdruk
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DETAILS                                                                    */
/* -------------------------------------------------------------------------- */

function CaseDetails() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px] space-y-24 md:space-y-32">
        {/* Wat het is */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Wat het is
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">
              Een vastgoedplatform waar eigenaren hun woning of bedrijfspand
              rechtstreeks aan kopers aanbieden — zonder makelaar, zonder
              courtage, zonder bemiddeling.
            </p>
          </Reveal>
        </div>

        {/* Wat we bouwden */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Wat we bouwden
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {features.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.05}>
                  <li className="grid grid-cols-12 items-start gap-4 py-6 md:py-8">
                    <span className="col-span-12 font-mono text-xs uppercase tracking-widest text-accent md:col-span-3">
                      {f.label}
                    </span>
                    <p className="col-span-12 text-base leading-relaxed text-foreground md:col-span-9 md:text-lg">
                      {f.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Huisstijl */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Huisstijl
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="font-display text-2xl leading-tight tracking-tight md:text-4xl">
              Eigen huisstijl &ldquo;Blauwdruk&rdquo;<span className="text-accent">.</span>
              <br />
              <span className="text-muted-foreground">
                Ultramarijn als merk én actie, Fraunces en IBM Plex Mono,
                blauwdruk-beelden in plaats van stockfoto&apos;s — een strak
                token-systeem afgedwongen in de code.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Stack */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Stack
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="flex flex-wrap gap-3">
              {stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Pitch */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Wat het bewijst
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="font-display text-2xl leading-tight tracking-tight md:text-4xl">
              Positionering, merk én werkende site — in één hand<span className="text-accent">.</span>
              <br />
              <span className="text-muted-foreground">
                Van strategie tot brandbook tot build. Alles klopt met elkaar,
                omdat het van dezelfde tekentafel komt.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                         */
/* -------------------------------------------------------------------------- */

function NextCaseCTA() {
  return (
    <section className="border-t border-border bg-accent px-6 py-32 text-accent-foreground md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.92] tracking-[-0.03em]">
            Klaar voor jouw<br />build<span aria-hidden>?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href="/start"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-background px-10 py-5 font-mono text-sm uppercase tracking-widest text-foreground transition hover:opacity-90"
          >
            Start je project
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
