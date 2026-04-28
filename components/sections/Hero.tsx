"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Satellite } from "lucide-react";
import { useRef } from "react";
import { hero } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 240]), {
    stiffness: 100,
    damping: 26,
  });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.6, 0]);
  const bgYLeft = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgYRight = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const satY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const satRot = useTransform(scrollYProgress, [0, 1], [0, 25]);

  const words = hero.title.split(" ");
  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Split background with parallax */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <motion.div style={{ y: bgYLeft }} className="pattern-topo relative">
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ scale: 1.04 }}
            animate={{ scale: [1.04, 1.0, 1.04] }}
            transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
        <motion.div style={{ y: bgYRight }} className="pattern-iso relative">
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{ backgroundPositionX: ["0px", "40px"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            style={{ y: satY, rotate: satRot }}
            className="absolute right-[14%] top-[18%]"
          >
            <Satellite className="h-12 w-12 text-deepGreen" strokeWidth={1.6} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating title card with scroll fade-out */}
      <motion.div
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        className="relative mx-auto w-full max-w-5xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-offwhite/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,30,61,0.35)] ring-1 ring-navy/5 backdrop-blur-sm md:p-12"
        >
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-navy md:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0, rotateX: -40 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-3 inline-block"
                style={{ transformOrigin: "0% 100%" }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 text-lg text-navy/70 md:text-xl"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-navy/50"
        >
          <div>scroll</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-2 h-6 w-px bg-navy/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
