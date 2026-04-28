"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { Parallax, Reveal, TiltCard } from "@/components/ui/Scroll";

// Unsplash placeholders that mirror the requested visuals:
// 1) Lab plant in instrumented cylinder (futuristic agri-bio lab)
// 2) Drone over green farmland with overlay
// 3) Hexagonal AgriTech innovation lattice over a globe-like backdrop
const tiles = [
  {
    src: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1600&q=80",
    title: "Lab to Field",
    caption:
      "Sat2Farm models begin as instrumented experiments — leaf, root, spectra — and graduate into APIs that institutions trust.",
    badge: "01 · R&D",
    tone: "from-skyblue/60 via-sage/30 to-cream",
  },
  {
    src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80",
    title: "Drones, Soil, Satellites",
    caption:
      "From a 600 km orbit down to a 30 m hover, the same algorithm reads NPK, NDVI and moisture — then translates pixels into decisions.",
    badge: "02 · Field Layer",
    tone: "from-deepGreen/40 via-sage/20 to-cream",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    title: "An AgriTech Innovation Lattice",
    caption:
      "Credit, advisory, insurance, supply-chain — every node compounds into a single trust graph that institutions underwrite against.",
    badge: "03 · Trust Graph",
    tone: "from-navy/80 via-navy-light/60 to-deepGreen/40",
  },
];

export default function AgriTechVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);

  return (
    <section
      ref={ref}
      id="vision"
      className="relative overflow-hidden bg-cream py-32 md:py-40"
    >
      {/* Drifting topo backdrop */}
      <motion.div
        aria-hidden
        style={{ x: bgX, y: bgY }}
        className="pattern-topo absolute inset-0 -z-10 opacity-60"
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={8}>The AgriTech Vision</SectionLabel>

        <motion.h2
          style={{ y: headlineY }}
          className="mt-4 max-w-4xl font-serif text-3xl text-navy md:text-5xl lg:text-6xl"
        >
          Three layers, one trust stack — from{" "}
          <span className="italic text-deepGreen">leaf</span> to{" "}
          <span className="italic text-deepGreen">orbit</span> to{" "}
          <span className="italic text-deepGreen">balance sheet</span>.
        </motion.h2>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-navy/65">
            What you&apos;re looking at on this page is the same product, photographed at three
            altitudes. The lab, the field, the network — each one is a different surface
            of the same algorithmic promise.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.15}>
              <TiltCard
                intensity={10}
                className="group relative h-[460px] overflow-hidden rounded-3xl ring-1 ring-navy/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={t.src}
                  alt={t.title}
                  loading="lazy"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1.0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ willChange: "transform" }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${t.tone} mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-cream">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] backdrop-blur">
                      {t.badge}
                    </span>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 24,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      className="h-3 w-3 rounded-full border border-cream/60"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl leading-tight">{t.title}</h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }}
                      className="mt-3 h-px bg-cream/70"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-cream/85">
                      {t.caption}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* A wide hero image with strong parallax beneath the trio */}
        <div className="mt-24">
          <Parallax speed={0.4}>
            <div className="relative h-[60vh] overflow-hidden rounded-3xl ring-1 ring-navy/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80"
                alt="AgriTech innovation lattice"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/30 to-transparent" />
              <div className="absolute inset-0 flex items-end p-10 md:p-16">
                <div className="max-w-xl text-cream">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/70">
                    The compounding asset
                  </div>
                  <h3 className="mt-3 font-serif text-3xl md:text-5xl">
                    Every farmer onboarded sharpens the next institution&apos;s decision.
                  </h3>
                </div>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
