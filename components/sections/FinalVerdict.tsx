"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { finalVerdict } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import { useDoorChoice } from "@/components/ui/DoorChoice";
import { VelocityMarquee } from "@/components/ui/Cinematic";

export default function FinalVerdict() {
  const { choice } = useDoorChoice();
  const headlineWords = finalVerdict.headline.split(" ");

  const callback =
    choice === "deeper"
      ? "You picked Go Deeper at the start. The analysis lands there too — Priority 1."
      : choice === "global"
        ? "You picked Go Global at the start. The analysis lands on Go Deeper — Priority 1."
        : null;

  const goTop = () =>
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="verdict"
      className="pattern-iso-faint relative flex min-h-screen flex-col justify-center overflow-hidden py-32 md:py-40"
    >
      <div
        aria-hidden
        className="absolute -top-2 left-0 right-0 z-10 border-y border-navy/10 bg-cream/60 py-4 font-serif text-3xl italic text-navy backdrop-blur md:text-5xl"
      >
        <VelocityMarquee baseVelocity={2}>
          <span className="mx-6">Trust Infrastructure</span>
          <span className="mx-6 text-deepGreen">·</span>
          <span className="mx-6">Trust Infrastructure</span>
          <span className="mx-6 text-deepGreen">·</span>
        </VelocityMarquee>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionLabel index={14}>The Final Verdict</SectionLabel>

        <h2 className="mt-12 font-serif text-4xl font-semibold leading-[1.05] text-navy md:text-7xl lg:text-8xl">
          {headlineWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mr-3 inline-block"
              style={{ transformOrigin: "0% 100%" }}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {finalVerdict.pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
              whileHover={{ y: -6, rotateY: 4, rotateX: -2 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-xl border border-navy/10 bg-offwhite/80 p-7 backdrop-blur-sm"
            >
              <div className="font-serif text-5xl text-deepGreen">{p.n}.</div>
              <div className="mt-2 font-serif text-2xl text-navy">{p.title}</div>
              <div className="text-lg text-navy/65">{p.body}</div>
            </motion.div>
          ))}
        </div>

        {callback && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 max-w-3xl rounded-lg bg-deepGreen/10 px-6 py-4 font-serif italic text-deepGreen"
          >
            {callback}
          </motion.p>
        )}

        <motion.button
          onClick={goTop}
          whileHover={{ y: -4 }}
          className="mt-16 inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2 text-xs uppercase tracking-[0.25em] text-navy hover:border-navy hover:bg-navy hover:text-cream"
        >
          <ArrowUp className="h-4 w-4" /> Re-read the analysis
        </motion.button>
      </div>
    </section>
  );
}
