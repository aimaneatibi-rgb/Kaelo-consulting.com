"use client";

import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Console — de hero-visual: een Kaelo-build die zichzelf uitvoert.            */
/* Typt een commando, toont de stappen één voor één, en wisselt dan van run.   */
/* Gelabeld als voorbeeld-run: dit zijn illustraties, geen klant-claims.       */
/* -------------------------------------------------------------------------- */

type Run = {
  cmd: string;
  steps: string[];
  result: string;
};

const RUNS: Run[] = [
  {
    cmd: "kaelo build crm --voor installatiebedrijf",
    steps: [
      "offerteflow geautomatiseerd",
      "planning gekoppeld aan de buitendienst",
      "facturatie loopt zonder handwerk",
    ],
    result: "live op de afgesproken datum",
  },
  {
    cmd: "kaelo build agent --voor groothandel",
    steps: [
      "orders uitgelezen uit de mailbox",
      "voorraad realtime bijgewerkt",
      "inkoopvoorstel klaargezet door AI",
    ],
    result: "het saaie werk is uit de week",
  },
  {
    cmd: "kaelo build dashboard --voor productie",
    steps: [
      "machinedata in één scherm",
      "afkeur zichtbaar per shift",
      "rapportage schrijft zichzelf",
    ],
    result: "beslissen op cijfers, niet op gevoel",
  },
];

const TYPE_MS = 34;
const STEP_MS = 650;
const HOLD_MS = 2600;

export default function Console() {
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = RUNS[run];
  const cmdDone = typed >= current.cmd.length;
  const stepsDone = steps >= current.steps.length;

  useEffect(() => {
    const next = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };

    if (!cmdDone) {
      next(() => setTyped((t) => t + 1), TYPE_MS);
    } else if (!stepsDone) {
      next(() => setSteps((s) => s + 1), STEP_MS);
    } else if (!done) {
      next(() => setDone(true), STEP_MS);
    } else {
      next(() => {
        setRun((r) => (r + 1) % RUNS.length);
        setTyped(0);
        setSteps(0);
        setDone(false);
      }, HOLD_MS);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [run, cmdDone, stepsDone, done, typed, steps]);

  return (
    <div className="kaelo-glass overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          voorbeeld-run
        </p>
      </div>

      {/* body — vaste hoogte zodat de hero niet verspringt */}
      <div className="h-[280px] px-5 py-5 font-mono text-[13px] leading-7 md:text-sm">
        <p className="text-foreground">
          <span className="text-muted-foreground">$ </span>
          {current.cmd.slice(0, typed)}
          {!cmdDone && <span className="kaelo-caret text-accent">▌</span>}
        </p>
        <div className="mt-2 space-y-1">
          {current.steps.slice(0, steps).map((s) => (
            <p key={s} className="text-muted-foreground">
              <span className="text-accent-2">▸</span> {s}
            </p>
          ))}
        </div>
        {done && (
          <p className="mt-4 text-foreground">
            <span className="text-accent">✓</span> {current.result}
          </p>
        )}
      </div>

      {/* status */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          systeem draait
        </span>
        <span>
          run {run + 1}/{RUNS.length}
        </span>
      </div>
    </div>
  );
}
