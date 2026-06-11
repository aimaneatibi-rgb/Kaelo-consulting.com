"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3";
  y?: number;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 32,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  // Initial state is identical op server en client (anders hydration-mismatch);
  // reduced motion krijgt een instant transitie in plaats van een andere initial.
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}
