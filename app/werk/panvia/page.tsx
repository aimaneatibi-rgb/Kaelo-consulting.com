import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Panvia — Case",
  description:
    "Panvia — een vastgoedplatform waar eigenaren rechtstreeks aan kopers verkopen, zonder makelaar. Positionering, huisstijl “Open Huis” én live platform met echte betalingen. Eigen Kaelo-build.",
};

const features = [
  {
    label: "Aanbod",
    body: "Woning, commercieel en vakantie in één overzicht — met kaart-splitview en prijs-markers, zoeken, filters, sorteren en favorieten.",
  },
  {
    label: "Plaatsen & betalen",
    body: "Plaatsingsflow in drie stappen met eigenaarsverklaring en live courtagevergelijking — afgerekend via een echte Mollie-checkout.",
  },
  {
    label: "Chat & bieden",
    body: "Gesprek met de eigenaar en een gestructureerd, niet-bindend bod — plus een berichten-paneel dat op elke pagina meereist.",
  },
  {
    label: "Accounts",
    body: "Eén account met koper- en verkopersrollen: e-mail en wachtwoord, veilige sessies en wachtwoord-herstel per mail. Het account ontstaat pas ná betaling.",
  },
  {
    label: "Mijn Panvia",
    body: "Eigenaarskant met een inbox-splitview van alle gesprekken en biedingen; antwoorden verschijnen live aan de koperszijde.",
  },
  {
    label: "Gidsen & vindbaarheid",
    body: "Vier uitgewerkte gidsen als statische pagina's, structured data, clean URLs en zelf-gehoste fonts — gebouwd om organisch gevonden te worden.",
  },
  {
    label: "Zakelijk & Projecten",
    body: "Commercieel aanbod met BAR-filter en kwartaalpakketten met automatische incasso voor parken, complexen en ontwikkelaars.",
  },
];

const stack = ["HTML", "CSS", "JavaScript", "Vercel Serverless", "Supabase", "Mollie", "Resend"];

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
              Livegang 10 augustus
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BRAND PANEL — op-brand voor Panvia (v3 "Open Huis": blauwverloop, rond)     */
/* -------------------------------------------------------------------------- */

function BlueprintPanel() {
  return (
    <section className="px-6 pb-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div
            className="relative flex aspect-[21/9] w-full items-center justify-center overflow-hidden rounded-3xl border border-border"
            style={{
              backgroundImage: "linear-gradient(135deg, #2438D8 0%, #101854 100%)",
            }}
          >
            <div className="flex items-center gap-4">
              <svg
                viewBox="0 0 48 48"
                aria-hidden
                className="h-10 w-10 md:h-14 md:w-14"
                fill="none"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 40V21L24 10l12 11v19h-7V29h-4" />
              </svg>
              <span className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">
                Panvia
              </span>
            </div>
            <span
              className="absolute bottom-4 right-5 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest"
              style={{ backgroundColor: "#E8C24B", color: "#0B1030" }}
            >
              Huisstijl · Open Huis
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
              Eigen huisstijl &ldquo;Open Huis&rdquo;<span className="text-accent">.</span>
              <br />
              <span className="text-muted-foreground">
                Panvia-blauw met een nachtblauw verloop, Poppins en Inter,
                ronde vormen en foto&apos;s voorop — warm en toegankelijk, als
                token-systeem consequent doorgevoerd tot in de checkout.
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
              Positionering, merk én live platform — in één hand<span className="text-accent">.</span>
              <br />
              <span className="text-muted-foreground">
                Van strategie tot brandbook tot een platform dat echte
                betalingen int — inclusief accounts, mail en vindbaarheid.
                Alles klopt met elkaar, omdat het van dezelfde tekentafel komt.
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
