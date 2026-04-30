"use client";

/**
 * Vertical stitched scroll rail.
 * - SVG dashed line stitches itself as you scroll.
 * - Section dots (numbered, tailoring style); active dot is a gold knot.
 * - Replaces both the old top scroll bar and rail dots with a single
 *   coherent "thread stitching down the side" visual.
 */

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { sections } from "@/lib/content";

export default function StitchedRail() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.5 });
  const dashOffset = useTransform(sp, (p) => `${(1 - p) * 1000}`);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((x): x is HTMLElement => Boolean(x));
    const obs = new IntersectionObserver(
      (entries) => {
        let top: { i: number; r: number } | null = null;
        entries.forEach((e) => {
          const i = els.indexOf(e.target as HTMLElement);
          if (i < 0 || !e.isIntersecting) return;
          if (!top || e.intersectionRatio > top.r) top = { i, r: e.intersectionRatio };
        });
        if (top !== null) setActive((top as { i: number }).i);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top progress bar (slim gold thread) */}
      <motion.div
        aria-hidden
        style={{ scaleX: sp, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-[55] h-[2px] w-full bg-gold"
      />

      {/* Vertical stitched rail */}
      <nav
        aria-label="Section progress"
        className="fixed right-6 top-1/2 z-[40] hidden -translate-y-1/2 lg:block"
      >
        <div className="relative flex h-[60vh] flex-col items-center">
          {/* the stitching */}
          <svg
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
            width="14"
            height="100%"
            viewBox="0 0 14 1000"
            preserveAspectRatio="none"
          >
            <line
              x1="7"
              y1="0"
              x2="7"
              y2="1000"
              stroke="#0A1F3D"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <motion.line
              x1="7"
              y1="0"
              x2="7"
              y2="1000"
              stroke="#C9A961"
              strokeWidth="1.6"
              strokeDasharray="8 6"
              strokeLinecap="round"
              style={{
                strokeDashoffset: dashOffset,
              }}
            />
          </svg>

          <div className="relative flex flex-1 flex-col justify-between py-4">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                aria-label={`Jump to ${s.label}`}
                aria-current={i === active ? "true" : undefined}
                className="group relative flex items-center"
              >
                {/* dot */}
                <span
                  className={`relative z-10 block h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    i === active
                      ? "scale-150 border-gold bg-gold shadow-[0_0_0_4px_rgba(201,169,97,0.18)]"
                      : i < active
                      ? "border-gold/80 bg-gold/80"
                      : "border-navy/40 bg-cream"
                  }`}
                />
                {/* tooltip */}
                <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-navy/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream opacity-0 shadow-lg transition group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
