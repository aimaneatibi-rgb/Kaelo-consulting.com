"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Analyse, Discovery } from "@/app/lib/schema";

type FieldKey = keyof Discovery;

type Step =
  | {
      kind: "text" | "textarea";
      key: FieldKey;
      label: string;
      placeholder?: string;
    }
  | {
      kind: "select";
      key: FieldKey;
      label: string;
      options: string[];
    }
  | {
      kind: "contact";
    };

const steps: Step[] = [
  {
    kind: "text",
    key: "bedrijf",
    label: "In één zin: wat doet jullie bedrijf?",
    placeholder: "Bijv. installatiebedrijf voor warmtepompen in Noord-Holland",
  },
  {
    kind: "select",
    key: "sector",
    label: "In welke sector zitten jullie?",
    options: [
      "Installatie",
      "Productie",
      "Logistiek",
      "Groothandel",
      "Bouw",
      "Zorg",
      "Dienstverlening",
      "Anders",
    ],
  },
  {
    kind: "select",
    key: "omvang",
    label: "Hoeveel mensen werken er nu?",
    options: ["1–5", "5–20", "20–50", "50–200", "200+"],
  },
  {
    kind: "textarea",
    key: "tijdvreter",
    label: "Wat kost jullie nu het meeste tijd dat je het liefst kwijt zou willen?",
    placeholder:
      "Bijv. het inplannen van monteurs, het maken van offertes, het bijhouden van voorraad…",
  },
  {
    kind: "textarea",
    key: "doel",
    label: "Waar willen jullie over 12 maanden staan?",
    placeholder:
      "Bijv. dubbele omzet zonder dubbele bezetting, of: dezelfde omzet met halve administratie…",
  },
  {
    kind: "textarea",
    key: "geprobeerd",
    label: "Wat hebben jullie al geprobeerd om dat op te lossen?",
    placeholder:
      "Bijv. software gekocht maar niemand gebruikt het, extra mensen aangenomen, nog niets…",
  },
  { kind: "contact" },
];

const empty: Discovery = {
  bedrijf: "",
  sector: "",
  omvang: "",
  tijdvreter: "",
  doel: "",
  geprobeerd: "",
  voornaam: "",
  achternaam: "",
  bedrijfsnaam: "",
  email: "",
  telefoon: "",
};

export default function StartForm() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<Discovery>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Analyse | null>(null);

  const total = steps.length;
  const step = steps[index];
  const progress = ((index + 1) / total) * 100;

  function update<K extends FieldKey>(key: K, value: Discovery[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function canAdvance(): boolean {
    if (step.kind === "contact") {
      return (
        data.voornaam.length > 0 &&
        data.achternaam.length > 0 &&
        data.bedrijfsnaam.length > 0 &&
        /.+@.+\..+/.test(data.email) &&
        data.telefoon.length >= 6
      );
    }
    return data[step.key].length >= (step.kind === "textarea" ? 10 : 2);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`status_${res.status}`);
      const json = (await res.json()) as { analyse: Analyse };
      setResult(json.analyse);
    } catch (e) {
      console.error(e);
      setError("Iets ging mis. Probeer opnieuw of mail ons direct op hello@kaelo-consulting.com.");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (index === total - 1) {
      submit();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  if (result) return <Result analyse={result} naam={data.voornaam} />;

  if (submitting) return <Loader />;

  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      {/* progress */}
      <div className="mb-16 flex items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <div className="h-px flex-1 bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.kind === "contact" ? (
            <ContactStep data={data} update={update} />
          ) : (
            <>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
                {step.label}
              </h2>
              <div className="mt-12">
                {step.kind === "text" && (
                  <input
                    autoFocus
                    type="text"
                    value={data[step.key]}
                    onChange={(e) => update(step.key, e.target.value)}
                    placeholder={step.placeholder}
                    className="w-full border-b-2 border-border bg-transparent pb-3 font-display text-2xl outline-none transition focus:border-accent md:text-3xl"
                    onKeyDown={(e) => e.key === "Enter" && canAdvance() && next()}
                  />
                )}
                {step.kind === "textarea" && (
                  <textarea
                    autoFocus
                    value={data[step.key]}
                    onChange={(e) => update(step.key, e.target.value)}
                    placeholder={step.placeholder}
                    rows={4}
                    className="w-full resize-none border-b-2 border-border bg-transparent pb-3 text-xl leading-relaxed outline-none transition focus:border-accent md:text-2xl"
                  />
                )}
                {step.kind === "select" && (
                  <div className="flex flex-wrap gap-3">
                    {step.options.map((opt) => {
                      const active = data[step.key] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            update(step.key, opt);
                            setTimeout(next, 200);
                          }}
                          className={`rounded-full border px-5 py-3 font-mono text-sm uppercase tracking-widest transition ${
                            active
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border hover:border-accent hover:text-accent"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-red-400">
          {error}
        </p>
      )}

      <div className="mt-16 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground disabled:opacity-30"
        >
          ← Terug
        </button>
        {step.kind !== "select" && (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {index === total - 1 ? "Versturen" : "Volgende"}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function ContactStep({
  data,
  update,
}: {
  data: Discovery;
  update: <K extends FieldKey>(k: K, v: Discovery[K]) => void;
}) {
  return (
    <>
      <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
        Wie zijn jullie?
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Voornaam" value={data.voornaam} onChange={(v) => update("voornaam", v)} />
        <Field label="Achternaam" value={data.achternaam} onChange={(v) => update("achternaam", v)} />
        <Field label="Bedrijfsnaam" value={data.bedrijfsnaam} onChange={(v) => update("bedrijfsnaam", v)} className="md:col-span-2" />
        <Field label="Zakelijk e-mail" type="email" value={data.email} onChange={(v) => update("email", v)} />
        <Field label="Telefoon" type="tel" value={data.telefoon} onChange={(v) => update("telefoon", v)} />
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b-2 border-border bg-transparent pb-2 text-lg outline-none transition focus:border-accent"
      />
    </label>
  );
}

function Loader() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Verwerken
      </p>
      <h2 className="mt-8 font-display text-4xl leading-tight tracking-tight md:text-6xl">
        We lezen jullie verhaal<span className="text-accent">.</span>
      </h2>
      <p className="mt-6 text-lg text-muted-foreground">
        Eén ogenblik. Wij maken een eerste analyse van waar de kansen liggen.
      </p>
      <div className="mt-16 h-px w-full overflow-hidden bg-border">
        <motion.div
          className="h-full w-1/3 bg-accent"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function Result({ analyse, naam }: { analyse: Analyse; naam: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Resultaat
      </p>
      <h2 className="mt-8 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
        {naam ? `Bedankt ${naam}.` : "Bedankt."}<br />
        Drie richtingen waar wij beginnen<span className="text-accent">.</span>
      </h2>
      <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
        {analyse.samenvatting}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6">
        {analyse.kansen.map((k, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border bg-muted p-8"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {k.complexiteit}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {k.tijdsbesparing}
              </p>
            </div>
            <h3 className="mt-6 font-display text-3xl tracking-tight">
              {k.titel}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {k.wat}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-accent bg-accent/10 p-8">
        <p className="font-display text-2xl tracking-tight md:text-3xl">
          We nemen binnen één werkdag contact op om de kennismaking in te plannen.
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Of mail ons direct: hello@kaelo-consulting.com
        </p>
      </div>
    </div>
  );
}
