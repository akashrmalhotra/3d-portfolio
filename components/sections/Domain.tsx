"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { domain } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCounter from "@/components/ui/StatCounter";
import { Parallax } from "@/components/ui/Scroll";

export default function Domain() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.05]);
  const bgRot = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section ref={ref} id="domain" className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={{ rotate: bgRot }}
        className="absolute -right-1/4 top-1/4 -z-10 h-[120%] w-[120%] rounded-full bg-gradient-to-br from-sage/15 via-cream to-skyblue/40 blur-3xl"
      />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — stats on topographic */}
        <div className="pattern-topo relative px-6 py-32 md:px-16 md:py-40">
          <SectionLabel index={4}>The Domain</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-3 max-w-md font-serif text-3xl leading-tight text-navy md:text-4xl"
          >
            {domain.title}
          </motion.h2>

          <div className="mt-14 space-y-12">
            {domain.stats.map((s, i) => (
              <Parallax key={s.big} speed={i === 0 ? 0.15 : -0.1}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div
                    className={`font-serif font-semibold tracking-tighter ${
                      i === 0 ? "text-olive" : "text-brown-dark"
                    } text-7xl md:text-8xl`}
                  >
                    <StatCounter value={s.big} />
                  </div>
                  <p className="mt-3 max-w-md text-base text-navy/75 md:text-lg">{s.body}</p>
                </motion.div>
              </Parallax>
            ))}
          </div>
        </div>

        {/* Right — pull quote on iso grid with strong scroll motion */}
        <div className="pattern-iso relative flex items-center px-6 py-32 md:px-16 md:py-40">
          <motion.blockquote
            style={{ y: quoteY, scale: quoteScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="absolute -left-3 -top-8 font-serif text-7xl text-navy/15 md:-left-6 md:text-9xl">
              &ldquo;
            </span>
            <p className="font-serif text-3xl leading-tight text-navy md:text-5xl lg:text-6xl">
              {domain.pullquote}
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
