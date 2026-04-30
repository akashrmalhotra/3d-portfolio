"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tailoring-themed preloader.
 * Spool unwinds; thread weaves a stitched progress; copy reads "Tailoring your experience."
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let p = 0;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      // ramp to 90% over ~1.4s
      const t = Math.min(1, elapsed / 1400);
      p = t * 90;
      setProgress(p);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onReady = () => {
      // finish to 100, then hide
      const finish = (now: number) => {
        p += 1.5;
        setProgress(Math.min(100, p));
        if (p < 100) raf = requestAnimationFrame(finish);
        else setTimeout(() => setDone(true), 380);
      };
      raf = requestAnimationFrame(finish);
    };

    if (document.readyState === "complete") setTimeout(onReady, 600);
    else window.addEventListener("load", onReady, { once: true });

    // safety net (10s max)
    const safety = window.setTimeout(() => setDone(true), 10000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          {/* Pinstripe pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #0A1F3D 0 1px, transparent 1px 22px)",
            }}
          />

          {/* Spool */}
          <div className="relative mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
              className="relative h-24 w-24"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <radialGradient id="spool" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C9A961" />
                    <stop offset="100%" stopColor="#B89348" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="38" fill="url(#spool)" />
                {Array.from({ length: 28 }).map((_, i) => {
                  const a = (i / 28) * Math.PI * 2;
                  const x1 = 50 + Math.cos(a) * 12;
                  const y1 = 50 + Math.sin(a) * 12;
                  const x2 = 50 + Math.cos(a) * 36;
                  const y2 = 50 + Math.sin(a) * 36;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#0A1F3D"
                      strokeOpacity="0.18"
                      strokeWidth="0.6"
                    />
                  );
                })}
                <circle cx="50" cy="50" r="9" fill="#0A1F3D" />
                <circle cx="50" cy="50" r="3" fill="#F5F1E8" />
              </svg>
            </motion.div>

            {/* Thread coming off the spool */}
            <svg
              className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2"
              width="160"
              height="40"
              viewBox="0 0 160 40"
            >
              <motion.path
                d="M0 20 Q 40 5, 80 22 T 160 18"
                fill="none"
                stroke="#C9A961"
                strokeWidth="1.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Title */}
          <div className="text-center">
            <div className="font-serif text-2xl text-navy md:text-3xl">
              Tailoring your experience
            </div>
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-navy/55">
              Raymond · The Platform Memo
            </div>
          </div>

          {/* Stitched progress */}
          <div className="mt-10 w-72 max-w-[80vw] md:w-96">
            <svg viewBox="0 0 360 14" className="w-full">
              {/* base track */}
              <line
                x1="2"
                y1="7"
                x2="358"
                y2="7"
                stroke="#0A1F3D"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* stitched fill — gold dashes */}
              <line
                x1="2"
                y1="7"
                x2={2 + (progress / 100) * 356}
                y2="7"
                stroke="#C9A961"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              {/* needle head */}
              <g
                transform={`translate(${2 + (progress / 100) * 356} 7)`}
                style={{ transition: "transform 0.15s linear" }}
              >
                <line x1="-12" y1="0" x2="6" y2="0" stroke="#0A1F3D" strokeWidth="1.4" />
                <circle cx="-10" cy="0" r="2" fill="none" stroke="#0A1F3D" strokeWidth="1" />
                <polygon points="6,0 2,-2 2,2" fill="#0A1F3D" />
              </g>
            </svg>
            <div className="mt-2 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.3em] text-navy/55">
              <span>Threading</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
