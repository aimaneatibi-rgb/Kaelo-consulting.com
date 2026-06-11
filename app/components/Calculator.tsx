"use client";

import Link from "next/link";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

/* -------------------------------------------------------------------------- */
/* De rekensom — interactieve calculator: wat kost repetitief werk per jaar    */
/* -------------------------------------------------------------------------- */

const WERKWEKEN = 46;

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 90, damping: 22 });
  const [display, setDisplay] = useState(() => format(value));

  useEffect(() => {
    mv.set(value);
  }, [mv, value]);

  useEffect(
    () => spring.on("change", (v) => setDisplay(format(v))),
    [spring, format]
  );

  return <span className="tabular-nums">{display}</span>;
}

const fmtInt = (n: number) => Math.round(n).toLocaleString("nl-NL");
const fmtEuro = (n: number) => `€ ${Math.round(n).toLocaleString("nl-NL")}`;
const fmtFte = (n: number) =>
  (Math.round(n * 10) / 10).toLocaleString("nl-NL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-display text-2xl tracking-tight md:text-3xl">
          {value.toLocaleString("nl-NL")}
          <span className="ml-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {suffix}
          </span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="kaelo-slider mt-4 w-full"
      />
    </label>
  );
}

export default function Calculator() {
  const [mensen, setMensen] = useState(8);
  const [uren, setUren] = useState(6);
  const [tarief, setTarief] = useState(45);

  const urenPerJaar = mensen * uren * WERKWEKEN;
  const kostenPerJaar = urenPerJaar * tarief;
  const fte = (mensen * uren) / 40;

  return (
    <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="space-y-12">
        <Slider
          label="Mensen met repetitief werk"
          value={mensen}
          min={1}
          max={100}
          suffix="pers."
          onChange={setMensen}
        />
        <Slider
          label="Uur repetitief werk, per persoon per week"
          value={uren}
          min={1}
          max={20}
          suffix="u/wk"
          onChange={setUren}
        />
        <Slider
          label="Loonkosten per uur"
          value={tarief}
          min={25}
          max={100}
          step={5}
          suffix="€/u"
          onChange={setTarief}
        />
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Rekensom: mensen × uren × {WERKWEKEN} werkweken. Indicatie, geen
          offerte.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-12 border-t border-border pt-12 lg:border-l lg:border-t-0 lg:pl-20 lg:pt-0">
        <div className="space-y-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Uur per jaar
            </p>
            <p className="mt-2 font-display text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-tight text-accent">
              <AnimatedNumber value={urenPerJaar} format={fmtInt} />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Loonkosten per jaar
              </p>
              <p className="mt-2 font-display text-3xl tracking-tight md:text-5xl">
                <AnimatedNumber value={kostenPerJaar} format={fmtEuro} />
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Fte aan saai werk
              </p>
              <p className="mt-2 font-display text-3xl tracking-tight md:text-5xl">
                <AnimatedNumber value={fte} format={fmtFte} />
              </p>
            </div>
          </div>
        </div>

        <div>
          <Magnetic>
            <Link
              href="/start"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent-foreground transition hover:opacity-90"
            >
              Kijk wat weg kan
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
