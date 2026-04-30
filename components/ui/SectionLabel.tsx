"use client";

import { motion } from "framer-motion";

export default function SectionLabel({
  index,
  children,
  tone = "navy",
}: {
  index: number;
  children: React.ReactNode;
  tone?: "navy" | "cream";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 text-base md:text-lg font-semibold uppercase tracking-[0.18em] ${
        tone === "navy" ? "text-navy/60" : "text-cream/70"
      }`}
    >
      <span>{String(index).padStart(2, "0")}</span>
      <span className={`h-[2px] w-12 ${tone === "navy" ? "bg-navy/30" : "bg-cream/30"}`} />
      <span>{children}</span>
    </motion.div>
  );
}
