"use client";

import { motion } from "framer-motion";
import { Compass, Heart, Route } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { ABOUT, SITE } from "@/lib/data";

const STORY = [
  { icon: Heart, title: "Who I am", text: ABOUT.intro, accent: "text-electric" },
  { icon: Route, title: "The journey", text: ABOUT.journey, accent: "text-cyan" },
  { icon: Compass, title: "How I work", text: ABOUT.philosophy, accent: "text-violet" },
] as const;

/** Portrait placeholder — swap the inner block for a real <Image> when ready. */
function Portrait() {
  return (
    <Reveal direction="right" className="relative mx-auto w-full max-w-sm lg:mx-0">
      <div className="border-gradient glass-deep relative aspect-[4/5] overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/15 via-transparent to-violet/15" />
        {/* Monogram placeholder */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-8xl font-bold text-ink/10">TV</span>
          <span className="absolute bottom-6 left-6 right-6 rounded-2xl bg-void/80 px-4 py-3 text-center font-mono text-xs text-dim">
            {SITE.role} · {SITE.company}
          </span>
        </div>
        {/* Scanline sheen */}
        <motion.div
          aria-hidden="true"
          animate={{ y: ["-120%", "220%"] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", repeatDelay: 2 }}
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan/10 to-transparent"
        />
      </div>
      {/* floating accent card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="glass absolute -right-4 -bottom-5 rounded-2xl px-5 py-3.5 shadow-glow-blue md:-right-8"
      >
        <p className="font-mono text-[11px] text-faint">currently at</p>
        <p className="font-display text-sm font-semibold text-ink">{SITE.company}</p>
      </motion.div>
    </Reveal>
  );
}

function Timeline() {
  return (
    <div className="relative mt-20">
      <Reveal>
        <h3 className="font-display mb-10 text-center text-2xl font-semibold">
          The road so far
        </h3>
      </Reveal>
      <div className="relative mx-auto max-w-3xl">
        {/* spine */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-electric via-cyan to-violet md:left-1/2"
        />
        {ABOUT.timeline.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <Reveal
              key={item.year}
              direction={left ? "right" : "left"}
              delay={0.05 * i}
              className={`relative mb-10 pl-12 md:w-1/2 md:pl-0 ${
                left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* node */}
              <span
                className={`absolute top-1.5 left-4 grid h-3 w-3 -translate-x-1/2 place-items-center md:left-auto ${
                  left ? "md:-right-1.5 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                }`}
              >
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-cyan/40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan" />
              </span>
              <p className="font-mono text-xs tracking-widest text-cyan">{item.year}</p>
              <h4 className="font-display mt-1 text-lg font-semibold text-ink">{item.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-dim">{item.text}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="01 · About"
          title={
            <>
              Code as craft. <span className="text-gradient">Restraint as luxury.</span>
            </>
          }
          lead="Engineer by training, craftsman by temperament — here's the story behind the commits."
        />

        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Portrait />

          <div className="space-y-5">
            {STORY.map((block, i) => (
              <Reveal key={block.title} delay={0.08 * i}>
                <div className="glass-deep group rounded-2xl p-6 transition-all duration-300 hover:border-line-strong hover:bg-veil md:p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="glass grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <block.icon className={`h-4.5 w-4.5 ${block.accent}`} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{block.title}</h3>
                  </div>
                  <p className="leading-relaxed text-dim">{block.text}</p>
                </div>
              </Reveal>
            ))}

            {/* fun facts */}
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ABOUT.facts.map((fact) => (
                <StaggerItem key={fact.text}>
                  <div className="glass flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-dim transition-colors duration-300 hover:text-ink">
                    <Icon name={fact.icon} className="h-4 w-4 shrink-0 text-emerald" />
                    {fact.text}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Timeline />
      </div>
    </section>
  );
}
