import Reveal from "./Reveal";

/* -------------------------------------------------------------------------- */
/* VERGELIJK — Kaelo naast de alternatieven, rij voor rij                      */
/* -------------------------------------------------------------------------- */

type Cel = {
  /** "ja" | "nee" | "soms" */
  status: "ja" | "nee" | "soms";
  noot?: string;
};

type Rij = {
  criterium: string;
  bureau: Cel;
  freelancer: Cel;
  nocode: Cel;
  kaelo: Cel;
};

const rijen: Rij[] = [
  {
    criterium: "Eigen code, jullie eigendom",
    bureau: { status: "soms", noot: "vaak hun framework" },
    freelancer: { status: "ja" },
    nocode: { status: "nee", noot: "je huurt het" },
    kaelo: { status: "ja", noot: "altijd" },
  },
  {
    criterium: "Vaste prijs, vaste datum",
    bureau: { status: "nee", noot: "uurtje-factuurtje" },
    freelancer: { status: "soms", noot: "wisselt" },
    nocode: { status: "ja" },
    kaelo: { status: "ja", noot: "in elke offerte" },
  },
  {
    criterium: "AI verweven in elke build",
    bureau: { status: "soms", noot: "los project, losse factuur" },
    freelancer: { status: "soms" },
    nocode: { status: "nee", noot: "plugin erbij" },
    kaelo: { status: "ja", noot: "standaard" },
  },
  {
    criterium: "Je praat met de bouwer zelf",
    bureau: { status: "nee", noot: "accountmanager ertussen" },
    freelancer: { status: "ja" },
    nocode: { status: "ja" },
    kaelo: { status: "ja", noot: "altijd direct" },
  },
  {
    criterium: "Schaalt zonder licenties per stoel",
    bureau: { status: "soms" },
    freelancer: { status: "soms" },
    nocode: { status: "nee", noot: "elke seat kost geld" },
    kaelo: { status: "ja", noot: "jullie platform" },
  },
  {
    criterium: "Blijft doorbouwen na oplevering",
    bureau: { status: "soms", noot: "strippenkaart" },
    freelancer: { status: "nee", noot: "weg na het project" },
    nocode: { status: "soms" },
    kaelo: { status: "ja", noot: "Operate" },
  },
  {
    criterium: "Werkt door tot het werkt, zonder factuur",
    bureau: { status: "nee", noot: "meerwerk" },
    freelancer: { status: "soms" },
    nocode: { status: "nee" },
    kaelo: { status: "ja", noot: "de belofte" },
  },
];

const kolommen = [
  { key: "bureau", label: "Traditioneel bureau" },
  { key: "freelancer", label: "Freelancer" },
  { key: "nocode", label: "No-code koppelaar" },
  { key: "kaelo", label: "Kaelo" },
] as const;

function StatusMark({ cel, accent = false }: { cel: Cel; accent?: boolean }) {
  const symbool = cel.status === "ja" ? "✓" : cel.status === "nee" ? "✕" : "~";
  const kleur =
    cel.status === "ja"
      ? accent
        ? "text-accent"
        : "text-foreground"
      : "text-muted-foreground";
  return (
    <span className="flex flex-col gap-1">
      <span className={`font-mono text-lg leading-none ${kleur}`}>
        {symbool}
      </span>
      {cel.noot ? (
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {cel.noot}
        </span>
      ) : null}
    </span>
  );
}

export default function Vergelijk() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            08 · Kaelo vs. de rest
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,9vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            Vergelijk ons<br />
            gerust<span className="text-accent">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-3xl text-xl leading-snug text-muted-foreground md:text-2xl">
            Niemand hoeft het op ons woord te geloven. Leg ons naast het
            bureau, de freelancer en het no-code plakwerk — rij voor rij.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[28%] py-6 pr-6 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                    Criterium
                  </th>
                  {kolommen.map((k) => (
                    <th
                      key={k.key}
                      className={`w-[18%] px-4 py-6 align-bottom font-mono text-xs font-normal uppercase tracking-widest ${
                        k.key === "kaelo"
                          ? "border-x border-t border-accent bg-accent/5 text-accent"
                          : "text-muted-foreground"
                      }`}
                    >
                      {k.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rijen.map((rij) => (
                  <tr key={rij.criterium} className="group transition hover:bg-muted/30">
                    <td className="py-6 pr-6 font-display text-lg tracking-tight md:text-xl">
                      {rij.criterium}
                    </td>
                    {kolommen.map((k) => (
                      <td
                        key={k.key}
                        className={`px-4 py-6 align-top ${
                          k.key === "kaelo"
                            ? "border-x border-accent bg-accent/5"
                            : ""
                        }`}
                      >
                        <StatusMark cel={rij[k.key]} accent={k.key === "kaelo"} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-6 pr-6" />
                  {kolommen.map((k) => (
                    <td
                      key={k.key}
                      className={`px-4 py-4 ${
                        k.key === "kaelo"
                          ? "border-x border-b border-accent bg-accent/5"
                          : ""
                      }`}
                    />
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Generalisatie? Zeker. Uitzonderingen bestaan — wij zijn er één.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
