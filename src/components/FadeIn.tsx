"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
