"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Full-screen splash on first site visit: zwart vlak met "Kaelo." wordmark,
 * korte entry + fade-out. Slechts één keer per session getoond zodat
 * elke navigatie daarna direct doorgaat.
 */
const SESSION_KEY = "kaelo-splash-shown";
const HOLD_MS = 1100;
const FADE_MS = 600;

export default function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Tweede pagina-bezoek binnen dezelfde session? Skip helemaal.
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false);
      return;
    }

    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // private mode etc — geen probleem, splash komt dan opnieuw bij refresh
      }
    }, HOLD_MS);

    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="kaelo-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(4rem,16vw,16rem)] font-medium leading-none tracking-[-0.04em]"
          >
            Kaelo<span className="text-accent">.</span>
          </motion.div>

          {/* subtle accent bar onderaan — komt op tijdens fade-out */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: HOLD_MS / 1000,
              ease: "linear",
            }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-x-0 bottom-0 h-1 bg-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
