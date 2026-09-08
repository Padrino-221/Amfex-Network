"use client";

import { motion } from "framer-motion";

export function HeroOrbs() {
  return (
    <>
      <motion.div
        className="hero-orb absolute pointer-events-none"
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb-red absolute pointer-events-none"
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </>
  );
}

export function FloatingFigure({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedGoldName({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="text-gold font-light italic inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.span>
  );
}
