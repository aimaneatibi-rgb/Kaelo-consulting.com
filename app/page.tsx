import Link from "next/link";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Probleem />
        <Oplossing />
        <Hoe />
        <Wat />
        <Belofte />
        <VoorWie />
        <Pijlers />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-12 pt-32 md:px-12 md:pt-40">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Kaelo · AI build studio
        </p>
      </Reveal>
      <div className="my-auto flex flex-col gap-12 py-12">
        <Reveal delay={0.1}>
          <h1 className="font-display text-[clamp(3.5rem,12vw,12rem)] font-medium leading-[0.92] tracking-[-0.03em]">
            Wij bouwen<br />
            het systeem<span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="max-w-2xl text-lg leading-snug text-muted-foreground md:text-2xl">
            AI-systemen die werk weghalen. Gebouwd op jullie werkvloer.
            In vier weken.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90"
            >
              Start de audit
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
            <Link
              href="#wat"
              className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Of: kijk eerst wat we bouwen ↓
            </Link>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.55}>
        <div className="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>10x is makkelijker dan 2x.</span>
          <span>NL · BE — bezoek aan huis</span>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROBLEEM                                                                   */
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
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Meer mensen aannemen. Meer marketing. Meer uren maken.
              Meer vergaderingen om de extra uren te coördineren.
              Meer rapporten om de vergaderingen te rechtvaardigen.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg leading-relaxed md:text-xl">
              Dat is hoe de meeste bedrijven 2x proberen te halen.
              <br /><br />
              Het is ook precies de reden waarom ze 10x niet halen.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.4}>
          <p className="mt-24 font-display text-[clamp(1.5rem,4vw,3rem)] leading-tight tracking-tight">
            10x vraagt geen extra werk.
            <br />
            <span className="text-accent">10x vraagt minder werk.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OPLOSSING                                                                  */
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
        <div className="mt-16 max-w-3xl space-y-8 text-lg leading-relaxed md:text-xl">
          <Reveal delay={0.2}>
            <p>
              Wij bouwen software die het saaie werk doet. Het werk dat tijd kost,
              fouten maakt, mensen uitput, en niemand mist als het weg is.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              Wat overblijft is het werk waar jullie voor in dit vak zitten.
              Klanten helpen. Producten maken. Beslissingen nemen. Vooruit denken.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-foreground">
              Personeel komt in zijn kracht. Marge stijgt. Hoofd wordt rustig.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* HOE                                                                        */
/* -------------------------------------------------------------------------- */

const stappen = [
  {
    nr: "01",
    titel: "Je vertelt ons je bedrijf",
    body: "Niet via een contactformulier. Via een korte AI-conversatie op deze site. Wij weten al waar het schuurt voordat de telefoon gaat.",
    duur: "± 5 minuten",
  },
  {
    nr: "02",
    titel: "We komen langs",
    body: "Een dag op jullie werkvloer. We zien hoe het écht werkt, niet hoe het in de procesplaat staat. We praten met de mensen die het werk doen.",
    duur: "1 dag",
  },
  {
    nr: "03",
    titel: "Roadmap + offerte op maat",
    body: "Binnen vijf werkdagen na het bezoek. Concreet wat we bouwen, in welke volgorde, in vier weken. Vaste prijs.",
    duur: "Binnen 5 werkdagen",
  },
  {
    nr: "04",
    titel: "Wij bouwen, jij draait",
    body: "Vier weken. Wekelijkse demo. Vrijdag van week vier staat het systeem live. Daarna iteratie als jullie willen.",
    duur: "4 weken",
  },
];

function Hoe() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            03 · Hoe wij werken
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Vier stappen.<br />
            Vier weken<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 divide-y divide-border border-y border-border">
          {stappen.map((s, i) => (
            <Reveal key={s.nr} delay={i * 0.08}>
              <div className="group grid grid-cols-12 items-start gap-6 py-10 transition hover:bg-muted/30 md:py-14">
                <p className="col-span-2 font-mono text-sm text-muted-foreground md:col-span-1">
                  {s.nr}
                </p>
                <h3 className="col-span-10 font-display text-2xl leading-tight tracking-tight md:col-span-5 md:text-4xl">
                  {s.titel}
                  <span className="text-accent">.</span>
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
/* WAT WIJ BOUWEN                                                             */
/* -------------------------------------------------------------------------- */

const producten = [
  {
    label: "Foundation",
    titel: "Het fundament",
    body: "CRM, dashboards, mailing workflows, document-automation, klant-portalen. De systemen die elk bedrijf nodig heeft maar niemand ooit goed bouwt.",
    duur: "2–3 weken",
  },
  {
    label: "Build",
    titel: "Custom software",
    body: "SaaS, AI-agents die je werk doen, integratie-laag tussen jullie bestaande tools. Op maat, schaalbaar, jullie eigendom.",
    duur: "4–8 weken",
  },
  {
    label: "Operate",
    titel: "Mee blijven groeien",
    body: "Doorlopende iteratie en uitbreiding nadat we hebben opgeleverd. Optioneel. Voor bedrijven die het systeem willen laten meegroeien.",
    duur: "Doorlopend",
  },
];

function Wat() {
  return (
    <section id="wat" className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            04 · Wat wij bouwen
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Drie soorten<br />
            systemen<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {producten.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-8 transition hover:border-accent">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {p.label}
                  </p>
                  <h3 className="mt-6 font-display text-3xl tracking-tight md:text-4xl">
                    {p.titel}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
                <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.duur}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p className="mt-12 max-w-2xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Geen prijzen op de site. Pricing volgt na het bezoek, in de offerte op maat.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BELOFTE                                                                    */
/* -------------------------------------------------------------------------- */

function Belofte() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            05 · De belofte
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Vier weken,<br />
            of we werken door<br />
            op onze kosten<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid max-w-4xl grid-cols-1 gap-8 text-lg leading-relaxed md:text-xl">
          <Reveal delay={0.2}>
            <p className="text-muted-foreground">
              Vaste levertijd is de hardste belofte die een builder kan doen. Wij doen hem.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              Vier weken na de opdracht staat jullie systeem. Werkt iets niet zoals
              afgesproken? Dan werken wij door zonder factuur tot het werkt.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-muted-foreground">
              Geen geld-terug-garantie — dat is een belofte dat het misschien niet werkt.
              Onze belofte is dat het werkt.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* VOOR WIE                                                                   */
/* -------------------------------------------------------------------------- */

function VoorWie() {
  return (
    <section className="border-t border-border bg-muted px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              06 · Voor wie
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em]">
              Voor wie we<br />
              bouwen<span className="text-accent">.</span>
            </h2>
          </Reveal>
        </div>
        <div className="space-y-12 text-lg leading-relaxed md:text-xl">
          <Reveal delay={0.2}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Wel
              </p>
              <p className="mt-4">
                Bedrijven met een werkvloer. Installatie, productie, logistiek,
                groothandel, dienstverleners met buitendienst. Bedrijven waar veel
                handen draaien en veel administratie draait.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Niet
              </p>
              <p className="mt-4 text-muted-foreground">
                Pre-revenue startups. Bedrijven die &ldquo;iets met AI&rdquo; willen zonder
                concreet probleem. Wie een rapport wil — wij leveren werkende software,
                geen powerpoints.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p>
              Wel voor wie wil dat de zaak draait, ook zonder dat de eigenaar er staat.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PIJLERS                                                                    */
/* -------------------------------------------------------------------------- */

const pijlers = [
  {
    nr: "I",
    titel: "We komen langs",
    body: "Niet één keer. We draaien een dag mee. Een systeem dat op papier werkt maar op de vloer faalt, is een rapport met een UI eromheen.",
  },
  {
    nr: "II",
    titel: "We bouwen écht",
    body: "Geen Make/Zapier-plakwerk dat omvalt als één API verandert. Custom software, eigen platform, schaalbaar, jullie eigendom.",
  },
  {
    nr: "III",
    titel: "Vier weken. Altijd",
    body: "Vaste levertijd. Vaste prijs. Geen scope-creep, geen verrassingen achteraf.",
  },
];

function Pijlers() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            07 · Waarom Kaelo
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {pijlers.map((p, i) => (
            <Reveal key={p.nr} delay={i * 0.1}>
              <article>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {p.nr}
                </p>
                <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight md:text-4xl">
                  {p.titel}<span className="text-accent">.</span>
                </h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {p.body}
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
/* CLOSING                                                                    */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section className="relative border-t border-border bg-accent px-6 py-32 text-accent-foreground md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-60">
            08 · Klaar?
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
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 rounded-full bg-background px-10 py-5 font-mono text-sm uppercase tracking-widest text-foreground transition hover:opacity-90"
            >
              Start de audit
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
            <p className="mt-6 max-w-lg font-mono text-xs uppercase tracking-widest opacity-60">
              Geen verplichtingen. Geen kosten. Wel direct een eerste analyse van waar tijd verloren gaat.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
