import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import Photo from "./components/Photo";
import RotatingText from "./components/RotatingText";
import Calculator from "./components/Calculator";
import Vergelijk from "./components/Vergelijk";
import Magnetic from "./components/Magnetic";
import { photos } from "./lib/images";

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
        <Vergelijk />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO — full-width typografie met roterende build-objecten                  */
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
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-0 pt-32 md:px-12 md:pt-40">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Kaelo · AI build studio
        </p>
      </Reveal>

      <div className="my-12 flex flex-col gap-10 lg:my-auto lg:py-16">
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(3.5rem,12vw,13rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            Wij bouwen<br />
            <RotatingText words={heroWords} className="text-accent" />
            <span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="max-w-2xl text-lg leading-snug text-muted-foreground md:text-2xl">
            Code, web, CRM, brand, AI. Wij bouwen wat jullie nodig hebben —
            in een tempo dat past bij het project. Geen advertenties, geen rapporten.
            Alleen werkende software.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <Link
                href="/start"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90"
              >
                Start je project
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Link
              href="#wat"
              className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Of: kijk wat we bouwen ↓
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.55}>
        <div className="border-t border-border pt-6">
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
/* PROBLEEM — compacter, één tekstkolom, krachtige outro                       */
/* -------------------------------------------------------------------------- */

function Probleem() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            01 · Het probleem
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            2x is moeilijker<br />
            dan 10x<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-16 max-w-3xl text-xl leading-snug text-muted-foreground md:text-3xl">
            Meer mensen, meer uren, meer rapporten — zo proberen de meeste bedrijven
            hun 2x te halen. En precies zó halen ze hun 10x nooit.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-16 font-display text-[clamp(2rem,6vw,5rem)] leading-tight tracking-tight">
            10x vraagt <span className="text-accent">minder</span> werk.
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
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden border-t border-border px-6 md:min-h-[70svh] md:px-12">
      <div className="mx-auto max-w-[1600px] text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Werk weghalen
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(3rem,12vw,13rem)] font-medium leading-[0.88] tracking-[-0.04em]">
            Niet stapelen.<br />
            <span className="text-muted-foreground">Weghalen</span><span className="text-accent">.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OPLOSSING — twee kolommen: beeld + compactere tekst                         */
/* -------------------------------------------------------------------------- */

function Oplossing() {
  return (
    <section className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            02 · De oplossing
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Bouw het systeem.<br />
            Schaf het werk af<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-16 max-w-4xl space-y-10">
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
            <p className="font-display text-2xl leading-tight tracking-tight md:text-5xl">
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
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            03 · De rekensom
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
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
/* HOE — vier stappen, compact, met kleine accent-thumbnails                   */
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
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            04 · Hoe wij werken
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Vier stappen.<br />
            Geen omwegen<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 divide-y divide-border border-y border-border">
          {stappen.map((s, i) => (
            <Reveal key={s.nr} delay={i * 0.06}>
              <div className="group grid grid-cols-12 items-start gap-6 py-10 transition hover:bg-muted/30 md:py-14">
                <p className="col-span-2 font-mono text-sm text-muted-foreground md:col-span-1">
                  {s.nr}
                </p>
                <h3 className="col-span-10 font-display text-2xl leading-tight tracking-tight md:col-span-5 md:text-4xl">
                  {s.titel}<span className="text-accent">.</span>
                </h3>
                <p className="col-span-12 text-base leading-relaxed text-muted-foreground md:col-span-4 md:text-lg">
                  {s.body}
                </p>
                <p className="col-span-12 font-mono text-xs uppercase tracking-widest text-muted-foreground md:col-span-2 md:text-right">
                  {s.duur}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WAT — drie product-cards met grayscale beeld-thumbnails                     */
/* -------------------------------------------------------------------------- */

const producten = [
  {
    label: "Foundation",
    titel: "Het fundament",
    body: "CRM, dashboards, workflows, klant-portalen. De systemen die elk bedrijf nodig heeft maar niemand goed bouwt.",
    duur: "Modulair",
    photo: photos.foundation,
  },
  {
    label: "Web",
    titel: "Websites die werken",
    body: "Marketing-sites, landing pages, klant-portalen. Snel, conversie-gericht, met motion waar het hoort.",
    duur: "Modulair",
    photo: photos.oplossing,
  },
  {
    label: "Brand",
    titel: "Brand op orde",
    body: "Positionering, brandbook, brand-workflows. Marketing-ervaring zit in de strategie — niet in advertenties of photoshoots.",
    duur: "Strategie",
    photo: photos.brand,
  },
  {
    label: "Build",
    titel: "Custom software",
    body: "Webapps en iOS-apps voor B2B en B2C. SaaS-platformen, AI-agents die je werk doen, integratie-laag tussen jullie bestaande tools.",
    duur: "Custom",
    photo: photos.build,
  },
];

function Wat() {
  return (
    <section id="wat" className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            05 · Wat wij bouwen
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Drie soorten<br />
            systemen<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {producten.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition hover:border-accent">
                <Photo
                  photo={p.photo}
                  className="aspect-[4/3] w-full grayscale transition duration-700 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {p.label}
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                    {p.titel}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                  <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {p.duur}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {/* Operate band — doorlopende dienst, AI mee groeien */}
        <Reveal delay={0.5}>
          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
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
          <p className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
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
                className="inline-flex items-center gap-12 font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-muted-foreground"
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
/* BELOFTE — compact, twee zinnen, krachtige headline                          */
/* -------------------------------------------------------------------------- */

function Belofte() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            06 · De belofte
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Wat we afspreken,<br />
            leveren we<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-16 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Geen vage timelines, geen scope-creep. Een vaste afspraak per project —
            datum, prijs, deliverable — en daar houden we ons aan.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed md:text-2xl">
            Iets werkt niet? <span className="text-foreground">Dat gaan we regelen.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* VOOR WIE — full-bleed werkvloer-foto met overlay + korte tekst              */
/* -------------------------------------------------------------------------- */

function VoorWie() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <Photo
        photo={photos.voorwie}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative z-10 px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              07 · Voor wie
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              MKB Nederland.<br />
              Startups met visie<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal delay={0.2}>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
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
              <div>
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
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CLOSING — accent-vlak, één zin, één CTA                                     */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section className="relative border-t border-border bg-accent px-6 py-32 text-accent-foreground md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-60">
            09 · Klaar?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.9] tracking-[-0.03em]">
            Begin met<br />
            de audit.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl text-xl leading-snug md:text-2xl">
            Vijf minuten op deze site. Wij komen binnen een week langs.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12">
            <Magnetic>
              <Link
                href="/start"
                className="group inline-flex items-center gap-3 rounded-full bg-background px-10 py-5 font-mono text-sm uppercase tracking-widest text-foreground transition hover:opacity-90"
              >
                Start de audit
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </Magnetic>
            <p className="mt-6 max-w-lg font-mono text-xs uppercase tracking-widest opacity-60">
              Geen verplichtingen. Geen kosten.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
