"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { nationalContext } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function NationalContext() {
  return (
    <section id="context" className="relative bg-cream py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={7}>The National Context</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-3 max-w-3xl font-serif text-3xl text-navy md:text-5xl"
        >
          {nationalContext.title}
        </motion.h2>

        <div className="mt-14 overflow-hidden rounded-2xl ring-1 ring-navy/10">
          <div className="grid grid-cols-2 bg-cream-warm">
            <div className="flex items-center gap-3 px-6 py-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-deepGreen">
                Tailwind
              </div>
              <div className="text-sm text-navy/60">Why it works</div>
              <ArrowRight className="ml-auto h-4 w-4 text-deepGreen" />
            </div>
            <div className="flex items-center gap-3 bg-sand/30 px-6 py-5">
              <Lock className="h-4 w-4 text-deepGreen" />
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-navy">
                Lock-in
              </div>
              <div className="text-sm text-navy/60">Why it&rsquo;s trapped</div>
            </div>
          </div>

          {nationalContext.rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
              className="group grid grid-cols-1 border-t border-navy/10 md:grid-cols-2"
            >
              <div className="bg-offwhite px-6 py-6 transition group-hover:bg-cream-warm">
                <p className="text-navy">
                  <strong className="font-semibold">{r.tailwind.split(":")[0]}:</strong>
                  {r.tailwind.split(":").slice(1).join(":")}
                </p>
              </div>
              <div className="bg-sand/15 px-6 py-6 transition group-hover:bg-sand/30">
                <p className="text-navy/85">{r.lockin}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 rounded-xl bg-navy px-8 py-6 font-serif text-xl text-cream md:text-2xl"
        >
          {nationalContext.footer}
        </motion.div>
      </div>
    </section>
  );
}
