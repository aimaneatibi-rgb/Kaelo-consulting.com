import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import RotatingText from "./components/RotatingText";
import Calculator from "./components/Calculator";
import Magnetic from "./components/Magnetic";
import Console from "./components/Console";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Probleem />
        <FullBleedDivider />
        <Oplossing />
        <Rekensom />
        <Hoe />
        <Wat />
        <NietDoen />
        <Belofte />
        <VoorWie />
        <Betekenis />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO — blueprint-grid, gradient-headline, live console                      */
/* -------------------------------------------------------------------------- */

const heroWords = [
  "het systeem",
  "de CRM",
  "het dashboard",
  "de webapp",
  "de iOS-app",
  "de AI-agent",
  "de website",
  "de automatisering",
];

const heroTicker = [
  "CRM",
  "DASHBOARDS",
  "WEB APPS",
  "iOS APPS",
  "BRANDING",
  "CUSTOM SAAS",
  "AI-AGENTS",
  "AUTOMATION",
];

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-0 pt-36 md:px-12 md:pt-44">
      {/* achtergrond: grid + glows */}
      <div aria-hidden className="kaelo-grid absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[640px] w-[1000px] -translate-x-1/2 rounded-full bg-accent/15 blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-200px] top-1/3 h-[420px] w-[560px] rounded-full bg-accent-2/10 blur-[160px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                AI build studio — beschikbaar voor nieuwe builds
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-10 font-display text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                Wij bouwen<br />
                <RotatingText words={heroWords} className="kaelo-gradient-text" />
                <span className="text-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Software die werk weghaalt bij MKB en startups. Eigen code,
                vaste prijs, vaste datum. Geen advertenties, geen rapporten —
                alleen systemen die draaien.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <Link
                    href="/start"
                    className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground shadow-[0_0_40px_rgba(124,108,255,0.4)] transition hover:opacity-90"
                  >
                    Start je project
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                </Magnetic>
                <Link
                  href="#wat"
                  className="font-mono text-sm uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
                >
                  Of: kijk wat we bouwen ↓
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.3} y={48}>
              <Console />
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={0.55}>
        <div className="relative mt-20 border-t border-border pt-6">
          <div className="relative -mx-6 overflow-hidden md:-mx-12">
            <div className="kaelo-marquee flex w-max gap-10 whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground md:px-12">
              {[...heroTicker, ...heroTicker].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-10">
                  <span>{item}</span>
                  <span aria-hidden className="text-accent">/</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-2 pb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
            <span>10x is makkelijker dan 2x.</span>
            <span>NL · BE — remote first</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROBLEEM — typografisch statement                                           */
/* -------------------------------------------------------------------------- */

function Probleem() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            01 · Het probleem
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            2x is moeilijker<br />
            dan 10x<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-14 max-w-3xl text-xl leading-snug text-muted-foreground md:text-2xl">
            Meer mensen, meer uren, meer rapporten — zo proberen de meeste bedrijven
            hun 2x te halen. En precies zó halen ze hun 10x nooit.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-14 font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-tight tracking-tight">
            10x vraagt <span className="kaelo-gradient-text">minder</span> werk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DIVIDER — typografisch statement tussen probleem en oplossing               */
/* -------------------------------------------------------------------------- */

function FullBleedDivider() {
  return (
    <section className="relative flex min-h-[55svh] items-center justify-center overflow-hidden border-t border-border px-6 md:min-h-[65svh] md:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-[1400px] text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Werk weghalen
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(3rem,9vw,9.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            Niet stapelen.<br />
            <span className="kaelo-gradient-text">Weghalen</span><span className="text-accent">.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OPLOSSING                                                                   */
/* -------------------------------------------------------------------------- */

function Oplossing() {
  return (
    <section className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            02 · De oplossing
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Bouw het systeem.<br />
            Schaf het werk af<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-14 max-w-4xl space-y-10">
          <Reveal delay={0.2}>
            <p className="text-xl leading-relaxed md:text-2xl">
              Wij bouwen software die het saaie werk doet. Het werk dat tijd kost,
              fouten maakt, mensen uitput, en niemand mist als het weg is.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Wat overblijft is het werk waar jullie voor in dit vak zitten.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="font-display text-2xl leading-tight tracking-tight md:text-4xl">
              Personeel in zijn kracht.<br />
              Marge omhoog.<br />
              Hoofd rustig<span className="text-accent">.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* REKENSOM — interactieve calculator: wat kost het saaie werk per jaar        */
/* -------------------------------------------------------------------------- */

function Rekensom() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-32 md:px-12 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-160px] top-0 h-[420px] w-[560px] rounded-full bg-accent/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            03 · De rekensom
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Reken het lek<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-3xl text-xl leading-snug text-muted-foreground md:text-2xl">
            Geen marketingcijfers. Jullie eigen getallen. Schuif en kijk wat
            repetitief werk nu per jaar kost.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Calculator />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* HOE — vier stappen als timeline                                             */
/* -------------------------------------------------------------------------- */

const stappen = [
  {
    nr: "01",
    titel: "Vertel ons over je bedrijf",
    body: "Een paar korte vragen op de site. Jij in je eigen woorden: wat speelt er, waar wil je naartoe. Wij lezen mee — geen vragenlijst van 40 vragen.",
    duur: "± 5 min",
  },
  {
    nr: "02",
    titel: "Kennismaking + offerte",
    body: "Een gesprek mens-tot-mens. Remote of bij jullie aan tafel. Daarna een concrete roadmap met vaste prijs en vaste opleverdatum.",
    duur: "Binnen 5 werkdagen",
  },
  {
    nr: "03",
    titel: "We staan dicht op je werkdag",
    body: "Korte demo's, snelle reactie, geen verstop-acts. Mocht het systeem complex zijn, komen we een halve dag meedraaien om het écht te begrijpen.",
    duur: "Doorlopend",
  },
  {
    nr: "04",
    titel: "Wij bouwen, jij draait",
    body: "Wekelijkse demo. Snel als het kan, langer als het project dat vraagt — maar altijd op de vooraf afgesproken datum.",
    duur: "Vaste datum",
  },
];

function Hoe() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            04 · Hoe wij werken
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Vier stappen.<br />
            Geen omwegen<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {stappen.map((s, i) => (
            <Reveal key={s.nr} delay={i * 0.08}>
              <article className="kaelo-glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition hover:border-accent/50">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent-2/0 opacity-0 transition group-hover:opacity-100"
                />
                <p className="font-mono text-sm text-accent">{s.nr}</p>
                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-[1.7rem]">
                  {s.titel}<span className="text-accent">.</span>
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {s.duur}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WAT — vier product-cards, glass met gradient-hairline                       */
/* -------------------------------------------------------------------------- */

const producten = [
  {
    label: "Foundation",
    titel: "Het fundament",
    body: "CRM, dashboards, workflows, klant-portalen. De systemen die elk bedrijf nodig heeft maar niemand goed bouwt.",
    duur: "Modulair",
  },
  {
    label: "Web",
    titel: "Websites die werken",
    body: "Marketing-sites, landing pages, klant-portalen. Snel, conversie-gericht, met motion waar het hoort.",
    duur: "Modulair",
  },
  {
    label: "Brand",
    titel: "Brand op orde",
    body: "Positionering, brandbook, brand-workflows. Marketing-ervaring zit in de strategie — niet in advertenties of photoshoots.",
    duur: "Strategie",
  },
  {
    label: "Build",
    titel: "Custom software",
    body: "Webapps en iOS-apps voor B2B en B2C. SaaS-platformen, AI-agents die je werk doen, integratie-laag tussen jullie bestaande tools.",
    duur: "Custom",
  },
];

function Wat() {
  return (
    <section id="wat" className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            05 · Wat wij bouwen
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Vier soorten<br />
            systemen<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {producten.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <article className="kaelo-glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition hover:border-accent/50">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent-2/0 opacity-0 transition group-hover:opacity-100"
                />
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {p.label}
                </p>
                <h3 className="mt-5 font-display text-2xl tracking-tight md:text-3xl">
                  {p.titel}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.duur}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Operate band — doorlopende dienst, AI mee groeien */}
        <Reveal delay={0.5}>
          <div className="kaelo-glass mt-10 grid grid-cols-1 gap-8 rounded-2xl p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-accent-2">
                Optioneel · Doorlopend
              </p>
              <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight md:text-5xl">
                Mee blijven<br />groeien<span className="text-accent">.</span>
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl lg:col-span-7 lg:pt-2">
              Wij volgen AI-ontwikkelingen op de voet. Wat bij jullie inzetbaar is
              om meer omzet te genereren, brengen we direct in beeld. Doorlopende
              iteratie op het systeem dat we bouwden, plus advies waar het er echt
              toe doet.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-14 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Pricing volgt op maat in de offerte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* NIET DOEN — doorgestreepte marquee: alles wat wij bewust niet doen          */
/* -------------------------------------------------------------------------- */

const nietDoen = [
  "Advertenties",
  "Photoshoots",
  "Rapporten",
  "Powerpoints",
  "Uurtje-factuurtje",
  "Scope-creep",
  "No-code plakwerk",
];

function NietDoen() {
  return (
    <section className="overflow-hidden border-t border-border py-24 md:py-32">
      <div className="px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Wat wij niet doen
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <div className="relative mt-12 w-full overflow-hidden">
          <div className="kaelo-marquee flex w-max gap-12 whitespace-nowrap px-6 md:px-12">
            {[...nietDoen, ...nietDoen].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-12 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-none tracking-tight text-muted-foreground/60"
              >
                <span className="line-through decoration-accent decoration-4">
                  {item}
                </span>
                <span aria-hidden className="text-accent no-underline">/</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="px-6 md:px-12">
        <Reveal delay={0.3}>
          <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Alles wat hierboven staat, leidt af van het enige dat telt:
            werkende software die werk weghaalt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BELOFTE                                                                     */
/* -------------------------------------------------------------------------- */

function Belofte() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            06 · De belofte
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Wat we afspreken,<br />
            leveren we<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-14 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Geen vage timelines, geen scope-creep. Een vaste afspraak per project —
            datum, prijs, deliverable — en daar houden we ons aan.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed md:text-2xl">
            Iets werkt niet? <span className="kaelo-gradient-text">Dat gaan we regelen.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* VOOR WIE — wel/niet in twee glass panelen                                   */
/* -------------------------------------------------------------------------- */

function VoorWie() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-muted px-6 py-32 md:px-12 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-200px] bottom-0 h-[420px] w-[560px] rounded-full bg-accent/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            07 · Voor wie
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            MKB Nederland.<br />
            Startups met visie<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.2}>
            <div className="kaelo-glass h-full rounded-2xl p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-accent-2">
                Wel
              </p>
              <p className="mt-4 text-lg leading-relaxed md:text-xl">
                Heel MKB Nederland — installatie, productie, logistiek,
                groothandel, dienstverlening, zorg, retail. Plus: grote
                startups met grote doelen die we mee helpen waarmaken.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="h-full rounded-2xl border border-border p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Niet
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Pre-revenue startups zonder concreet probleem. Wie een rapport
                wil — wij leveren werkende software, geen powerpoints.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BETEKENIS — wat er verandert als het systeem er staat                       */
/* -------------------------------------------------------------------------- */

const betekenis = [
  {
    nr: "01",
    titel: "Tijd terug",
    body: "Het saaie werk doet zichzelf. De uren die vrijkomen gaan naar klanten, product en groei — het werk waarvoor jullie ooit begonnen zijn.",
  },
  {
    nr: "02",
    titel: "Eigendom",
    body: "Eigen code, eigen platform. Geen licenties per stoel, geen abonnement dat jullie gijzelt. Wat we bouwen is van jullie en groeit met jullie mee.",
  },
  {
    nr: "03",
    titel: "Rust",
    body: "Eén afspraak per project: datum, prijs, deliverable. En daarna een bouwer die blijft — wij volgen AI voor jullie en melden wat omzet kan opleveren.",
  },
];

function Betekenis() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-32 md:px-12 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-180px] top-1/4 h-[420px] w-[560px] rounded-full bg-accent/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            08 · Wat wij betekenen
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            Niet wat we doen.<br />
            Wat het oplevert<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {betekenis.map((b, i) => (
            <Reveal key={b.nr} delay={i * 0.1}>
              <article className="kaelo-glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition hover:border-accent/50 md:p-10">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent-2/0 opacity-0 transition group-hover:opacity-100"
                />
                <p className="font-mono text-sm text-accent">{b.nr}</p>
                <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                  {b.titel}<span className="text-accent">.</span>
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-20 max-w-4xl font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-tight tracking-tight">
            Een zaak die draait — <span className="kaelo-gradient-text">ook zonder dat jij er staat</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CLOSING — gradient-paneel, één zin, één CTA                                 */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="kaelo-glass relative overflow-hidden rounded-3xl px-8 py-24 text-center md:px-16 md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-0 h-[320px] w-[480px] rounded-full bg-accent-2/15 blur-[140px]"
          />
          <div className="relative">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                09 · Klaar?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.8rem,8vw,8rem)] font-medium leading-[0.92] tracking-[-0.045em]">
                Begin met<br />
                <span className="kaelo-gradient-text">de audit</span>
                <span className="text-accent">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-10 max-w-2xl text-xl leading-snug text-muted-foreground md:text-2xl">
                Vijf minuten op deze site. Wij nemen binnen één werkdag contact op.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12">
                <Magnetic>
                  <Link
                    href="/start"
                    className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 font-mono text-sm uppercase tracking-widest text-accent-foreground shadow-[0_0_50px_rgba(124,108,255,0.45)] transition hover:opacity-90"
                  >
                    Start de audit
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                </Magnetic>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Geen verplichtingen. Geen kosten.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
