import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import Photo from "../../components/Photo";
import { photos } from "../../lib/images";

export const metadata: Metadata = {
  title: "Klok — Case",
  description:
    "Klok — een volwaardig Nederlands staffing-platform met drie user-rollen, custom CRM en billing. Eigen Kaelo-build.",
};

const features = [
  {
    label: "Werkgevers",
    body: "Shifts en vacatures plaatsen, kandidaten beheren, factureren met staffel-pricing.",
  },
  {
    label: "Werknemers",
    body: "Profielen, CV's, ratings, referrals, sollicitaties, mijn shifts en uitbetalingen.",
  },
  {
    label: "Admin",
    body: "Klanten, medewerkers, shifts, vacatures, payroll, fraud-detectie, support, KPI-dashboard met forecast.",
  },
  {
    label: "CRM-laag",
    body: "Notes, activity-timeline, prospects, funnel-stadium, next-action, UTM-attributie.",
  },
  {
    label: "Juridisch",
    body: "Samenwerkingsovereenkomst sign-flow, advocaat-goedgekeurde voorwaarden en privacy.",
  },
  {
    label: "Payments",
    body: "Mollie-integratie, billing confirm modal, staffel-pricing per vacature.",
  },
];

const stack = ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Mollie", "Tailwind", "Vercel"];

export default function KlokCasePage() {
  return (
    <>
      <Nav />
      <main>
        <CaseHero />
        <CaseHeroImage />
        <CaseDetails />
        <NextCaseCTA />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
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
            01 · Case · Custom SaaS
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-[clamp(4rem,15vw,15rem)] font-medium leading-[0.88] tracking-[-0.04em]">
            Klok<span className="text-accent">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-muted-foreground md:text-3xl">
            Nederlands staffing-platform van scratch. Drie user-rollen,
            custom CRM, billing en KPI-dashboard.{" "}
            <span className="text-foreground">In productie.</span>
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="https://klokworks.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest transition hover:border-accent hover:text-accent"
            >
              Bekijk live ↗
            </a>
            <span className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Eigen Kaelo-build
            </span>
            <span className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Production
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO IMAGE                                                                 */
/* -------------------------------------------------------------------------- */

function CaseHeroImage() {
  return (
    <section className="px-6 pb-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Photo
            photo={photos.klok}
            className="aspect-[21/9] w-full rounded-xl"
            sizes="(max-width: 768px) 100vw, 768px"
          />
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
              Een volwaardig Nederlands staffing-platform met drie verschillende
              user-rollen — werkgever, werknemer, admin — die elk een compleet
              eigen flow doorlopen.
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
              Wat we voor onszelf bouwen, bouwen we ook voor jou<span className="text-accent">.</span>
              <br />
              <span className="text-muted-foreground">
                Hetzelfde tempo, dezelfde diepte, dezelfde stack.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
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
