"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  ClipReveal,
  HorizontalScroll,
  MaskText,
  VelocityMarquee,
} from "@/components/ui/Cinematic";
import { Parallax, TiltCard } from "@/components/ui/Scroll";

const tiles = [
  {
    src: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1600&q=80",
    title: "Lab to Field",
    caption:
      "Sat2Farm models begin as instrumented experiments — leaf, root, spectra — and graduate into APIs that institutions trust.",
    badge: "01 · R&D",
    tone: "from-skyblue/60 via-sage/30 to-cream",
    stat: "1,420",
    statLabel: "Spectral signatures · India",
  },
  {
    src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80",
    title: "Drones, Soil, Satellites",
    caption:
      "From a 600 km orbit down to a 30 m hover, the same algorithm reads NPK, NDVI and moisture — then translates pixels into decisions.",
    badge: "02 · Field Layer",
    tone: "from-deepGreen/40 via-sage/20 to-cream",
    stat: "27M",
    statLabel: "Hectares mapped",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    title: "An AgriTech Trust Lattice",
    caption:
      "Credit, advisory, insurance, supply-chain — every node compounds into a single trust graph that institutions underwrite against.",
    badge: "03 · Trust Graph",
    tone: "from-navy/80 via-navy-light/60 to-deepGreen/40",
    stat: "₹2,400 Cr",
    statLabel: "Underwritten exposure",
  },
];

export default function AgriTechVision() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);

  return (
    <>
      {/* Velocity marquee announces the section */}
      <div
        aria-hidden
        className="border-y border-navy/10 bg-cream py-6 font-serif text-5xl italic text-navy md:text-7xl"
      >
        <VelocityMarquee baseVelocity={3}>
          <span className="mx-6">Lab</span>
          <span className="mx-6 text-deepGreen">·</span>
          <span className="mx-6">Field</span>
          <span className="mx-6 text-deepGreen">·</span>
          <span className="mx-6">Orbit</span>
          <span className="mx-6 text-deepGreen">·</span>
          <span className="mx-6">Balance Sheet</span>
          <span className="mx-6 text-deepGreen">·</span>
        </VelocityMarquee>
      </div>

      {/* Editorial header */}
      <section
        ref={headerRef}
        id="vision"
        className="relative overflow-hidden bg-cream pt-32 md:pt-40"
      >
        <motion.div
          aria-hidden
          style={{ x: bgX, y: bgY }}
          className="pattern-topo absolute inset-0 -z-10 opacity-60"
        />
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel index={8}>The AgriTech Vision</SectionLabel>
          <motion.h2
            style={{ y: headlineY }}
            className="mt-4 max-w-5xl font-serif text-3xl text-navy md:text-6xl lg:text-7xl"
          >
            <MaskText text="Three layers, one trust stack — from leaf, to orbit, to balance sheet." />
          </motion.h2>
          <div className="mt-6 max-w-2xl text-lg text-navy/65">
            <MaskText
              text="What you're looking at on this page is the same product, photographed at three altitudes. The lab, the field, the network — each a different surface of the same algorithmic promise."
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* Pinned horizontal scroll cinematic */}
      <HorizontalScroll panels={tiles.length + 1} className="bg-cream">
        {tiles.map((t, i) => (
          <Panel key={t.title} tile={t} index={i} />
        ))}
        <ClosingPanel />
      </HorizontalScroll>

      {/* Wide parallax billboard image */}
      <section className="bg-cream pb-24 pt-12">
        <div className="mx-auto max-w-6xl px-6">
          <Parallax speed={0.4}>
            <ClipReveal
              direction="up"
              className="relative h-[60vh] overflow-hidden rounded-3xl ring-1 ring-navy/10"
            >
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
                    <MaskText text="Every farmer onboarded sharpens the next institution's decision." />
                  </h3>
                </div>
              </div>
            </ClipReveal>
          </Parallax>
        </div>
      </section>
    </>
  );
}

function Panel({
  tile,
  index,
}: {
  tile: (typeof tiles)[number];
  index: number;
}) {
  return (
    <div className="relative flex h-screen w-screen shrink-0 items-center px-6 md:px-20">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image side */}
        <TiltCard
          intensity={8}
          className="relative h-[60vh] overflow-hidden rounded-3xl ring-1 ring-navy/10"
          data-cursor="view"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={tile.src}
            alt={tile.title}
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-25%" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform" }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${tile.tone} mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <div className="absolute left-6 top-6 rounded-full bg-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream backdrop-blur">
            {tile.badge}
          </div>
        </TiltCard>

        {/* Text side */}
        <div className="text-navy">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-deepGreen">
            Layer {String(index + 1).padStart(2, "0")} / {String(tiles.length).padStart(2, "0")}
          </div>
          <h3 className="mt-4 font-serif text-4xl md:text-6xl">
            <MaskText text={tile.title} />
          </h3>
          <div className="mt-6 max-w-md text-lg text-navy/70">
            <MaskText text={tile.caption} delay={0.2} />
          </div>
          <div className="mt-10 flex items-end gap-6 border-t border-navy/15 pt-6">
            <div className="font-serif text-5xl text-navy md:text-7xl">{tile.stat}</div>
            <div className="pb-2 text-xs uppercase tracking-[0.2em] text-navy/55">
              {tile.statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClosingPanel() {
  return (
    <div className="relative flex h-screen w-screen shrink-0 items-center justify-center bg-navy text-cream">
      <div className="max-w-3xl px-6 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cream/60">
          The thesis
        </div>
        <h3 className="mt-6 font-serif text-4xl md:text-6xl">
          <MaskText text="Not a satellite company. A trust company that happens to look at satellites." />
        </h3>
      </div>
    </div>
  );
}
