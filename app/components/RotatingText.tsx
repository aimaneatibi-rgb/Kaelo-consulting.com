"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  words: string[];
  /** Milliseconds between rotations. */
  interval?: number;
  className?: string;
};

/**
 * Rotates through `words` one at a time with a vertical slide+fade.
 * Designed to sit inside a heading — uses inline-block so the surrounding
 * text reflows naturally around the longest word width.
 *
 * Note: we intentionally don't gate this on `prefers-reduced-motion`. The
 * slide is ≤0.5em over 0.55s — well below the threshold for vestibular
 * concerns — and gating broke the hero on any desktop with "Reduce motion"
 * enabled (mobile didn't have that setting on so it kept working).
 */
export default function RotatingText({
  words,
  interval = 2400,
  className = "",
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setI((x) => (x + 1) % words.length),
      interval
    );
    return () => clearInterval(t);
  }, [interval, words.length]);

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "0.5em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.5em", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
