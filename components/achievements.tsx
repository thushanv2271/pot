"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { ACHIEVEMENTS } from "@/lib/data";

export function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="05 · Milestones"
          title={
            <>
              Achievements & <span className="text-gradient">momentum</span>
            </>
          }
          lead="Proof of work — the milestones collected along the way."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass-deep group relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-white/20 md:p-7"
              >
                <span
                  className="mb-5 grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${item.accent}14`, color: item.accent }}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{item.text}</p>
                {/* corner glow on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: item.accent }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
