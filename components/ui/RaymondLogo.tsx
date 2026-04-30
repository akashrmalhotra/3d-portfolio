"use client";

import { motion } from "framer-motion";

/**
 * Fixed Raymond wordmark in the top-left corner.
 * Serif logotype with a small gold accent square + "EST. 1925" line.
 */
export default function RaymondLogo() {
  return (
    <motion.a
      href="#hero"
      aria-label="Raymond"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="glass-cream pointer-events-auto fixed left-5 top-5 z-40 flex items-center gap-2.5 rounded-lg border border-navy/15 px-3 py-2 shadow-[0_10px_30px_-15px_rgba(10,31,61,0.4)] md:left-7 md:top-6 md:gap-3 md:px-4 md:py-2.5"
    >
      <span aria-hidden className="block h-5 w-5 rotate-45 bg-gold shadow-[0_0_12px_rgba(201,169,97,0.55)] md:h-6 md:w-6" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-[0.12em] text-navy md:text-2xl">
          RAYMOND
        </span>
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.32em] text-gold-warm md:text-[10px]">
          Est. 1925 · The Complete Man
        </span>
      </span>
    </motion.a>
  );
}
