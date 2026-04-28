"use client";

import { motion } from "framer-motion";
import { Globe2, Sprout, Check } from "lucide-react";
import { openingQuestion } from "@/lib/content";
import { useDoorChoice } from "@/components/ui/DoorChoice";
import SectionLabel from "@/components/ui/SectionLabel";

const icons = { deeper: Sprout, global: Globe2 };

export default function OpeningQuestion() {
  const { choice, setChoice } = useDoorChoice();

  return (
    <section id="opening" className="relative bg-cream-warm py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel index={2}>The Opening Question</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-navy md:text-5xl"
        >
          Bengaluru, 2020. <span className="text-navy/60">{openingQuestion.setup}</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {openingQuestion.doors.map((d, i) => {
            const Icon = icons[d.key as "deeper" | "global"];
            const selected = choice === d.key;
            const dimmed = choice && choice !== d.key;
            return (
              <motion.button
                key={d.key}
                onClick={() => setChoice(selected ? null : (d.key as "deeper" | "global"))}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40, scaleX: 0.7 }}
                whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, rotateX: 4, rotateY: i === 0 ? -2 : 2 }}
                style={{ transformStyle: "preserve-3d" }}
                className={`group relative cursor-pointer rounded-2xl border-2 p-8 text-left transition ${
                  selected
                    ? "border-deepGreen bg-cream"
                    : dimmed
                      ? "border-brown/20 bg-cream/60 opacity-50"
                      : "border-brown/40 bg-cream"
                }`}
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${
                    i === 0 ? "bg-deepGreen/10 text-deepGreen" : "bg-navy/10 text-navy"
                  }`}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-3xl text-navy">{d.title}</h3>
                <p className="mt-3 text-navy/75">{d.body}</p>
                <p className="mt-6 text-sm italic text-navy/55">→ {d.preview}</p>
                {selected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-deepGreen text-cream"
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-14 rounded-xl bg-deepGreen px-8 py-6 text-center font-serif text-lg italic text-cream md:text-xl"
        >
          {openingQuestion.footer}
        </motion.div>

        {choice && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-navy/60"
          >
            You picked <strong className="text-deepGreen">{choice === "deeper" ? "Go Deeper" : "Go Global"}</strong>. We'll come back to that at the end.
          </motion.p>
        )}
      </div>
    </section>
  );
}
