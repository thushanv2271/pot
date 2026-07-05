"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EXPERIENCE, type Experience as Job } from "@/lib/data";

/* Sticky card deck: each role pins below the nav and the next one slides up
 * and stacks over it; the covered card recedes (scale + dim) as it's buried.
 * The scrollbar drives everything — no timers, pure scroll choreography. */

function DeckCard({ job, index, total }: { job: Job; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Progress of this card's wrapper leaving the viewport top = how buried it is.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const brightness = useTransform(scrollYProgress, (v) => `brightness(${1 - v * 0.45})`);

  const isLast = index === total - 1;

  return (
    <div ref={ref} className={isLast ? "" : "mb-[16vh]"}>
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          filter: isLast ? undefined : brightness,
          top: `calc(6rem + ${index * 1.75}rem)`,
        }}
        className="glass-deep border-gradient sticky origin-top rounded-3xl bg-abyss/80 p-7 will-change-transform md:p-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="glass grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
              <Briefcase className="h-5 w-5 text-cyan" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                {job.role}
              </h3>
              <p className="font-medium text-electric">{job.company}</p>
            </div>
          </div>
          <span className="rounded-full border border-line px-4 py-1.5 font-mono text-xs text-cyan">
            {job.period}
          </span>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-dim md:text-base">
          {job.summary}
        </p>

        <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
          {job.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-dim">
              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-dim"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* deck position indicator */}
        <span className="absolute top-7 right-7 hidden font-mono text-xs text-faint md:block">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow="04 · Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">built</span>
            </>
          }
          lead="Scroll — each chapter stacks over the last."
        />

        <div className="relative pb-[10vh]">
          {EXPERIENCE.map((job, i) => (
            <DeckCard key={job.company} job={job} index={i} total={EXPERIENCE.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
