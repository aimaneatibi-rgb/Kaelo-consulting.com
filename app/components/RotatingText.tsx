"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
 */
export default function RotatingText({
  words,
  interval = 2400,
  className = "",
}: Props) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setI((x) => (x + 1) % words.length),
      interval
    );
    return () => clearInterval(t);
  }, [interval, words.length, reduce]);

  if (reduce) {
    return <span className={className}>{words[0]}</span>;
  }

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
