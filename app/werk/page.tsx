import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Werk",
  description:
    "Wat we voor onszelf en voor klanten bouwen — Klok, een volwaardig staffing-platform, en Panvia, een vastgoedplatform direct van eigenaar. Eigen Kaelo-builds.",
};

type Case = {
  slug: string;
  index: string;
  naam: string;
  kicker: string;
  omschrijving: string;
  tags: string[];
};

const cases: Case[] = [
  {
    slug: "klok",
    index: "01",
    naam: "Klok",
    kicker: "Custom SaaS · In productie",
    omschrijving:
      "Nederlands staffing-platform van scratch. Drie user-rollen, custom CRM, billing en KPI-dashboard.",
    tags: ["Next.js", "Supabase", "Mollie"],
  },
  {
    slug: "panvia",
    index: "02",
    naam: "Panvia",
    kicker: "Web platform · Livegang in voorbereiding",
    omschrijving:
      "Vastgoedplatform, direct van eigenaar naar koper. Aanbod met filters, meerstaps plaatsingsflow, chat en bieden — zonder makelaar.",
    tags: ["Web platform", "Eigen huisstijl", "Vercel"],
  },
];

export default function WerkPage() {
  return (
    <>
      <Nav />
      <main>
        <WerkHero />
        <CaseList />
        <NextCaseCTA />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

function WerkHero() {
  return (
    <section className="px-6 pb-16 pt-40 md:px-12 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Werk · Selectie
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 font-display text-[clamp(3.5rem,13vw,13rem)] font-medium leading-[0.88] tracking-[-0.04em]">
            Wat we bouwen<span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-muted-foreground md:text-3xl">
            Volwaardige platformen, van scratch, in productie.{" "}
            <span className="text-foreground">
              Wat we voor onszelf bouwen, bouwen we ook voor jou.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CASE LIST                                                                   */
/* -------------------------------------------------------------------------- */

function CaseList() {
  return (
    <section className="border-t border-border px-6 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <ul className="divide-y divide-border">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <li>
                <Link
                  href={`/werk/${c.slug}`}
                  className="group grid grid-cols-12 items-start gap-4 py-12 transition-colors md:gap-8 md:py-20"
                >
                  <span className="col-span-12 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground md:col-span-1">
                    {c.index}
                  </span>
                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] transition-colors group-hover:text-accent md:text-8xl">
                      {c.naam}
                    </h2>
                    <p className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">
                      {c.kicker}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                      {c.omschrijving}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground transition group-hover:text-accent">
                      Bekijk case
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
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
