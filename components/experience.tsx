"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { useMediaQuery } from "@/lib/hooks";
import { EXPERIENCE, type Experience as Job } from "@/lib/data";

function JobContent({ job, index, total, showIndex }: { job: Job; index: number; total: number; showIndex: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-2xl sm:h-12 sm:w-12">
            <Briefcase className="h-5 w-5 text-cyan" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-ink sm:text-xl md:text-2xl">
              {job.role}
            </h3>
            <p className="font-medium text-electric">{job.company}</p>
          </div>
        </div>
        <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] text-cyan sm:px-4 sm:py-1.5 sm:text-xs">
          {job.period}
        </span>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-dim sm:mt-5 md:text-base">
        {job.summary}
      </p>

      <ul className="mt-4 grid gap-2 sm:mt-5 md:grid-cols-2 md:gap-2.5">
        {job.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-dim">
            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
        {job.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-line bg-veil px-2.5 py-1 font-mono text-[11px] text-dim"
          >
            {tech}
          </span>
        ))}
      </div>

      {showIndex && (
        <span className="absolute top-5 right-5 hidden font-mono text-xs text-faint sm:top-7 sm:right-7 md:block">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      )}
    </>
  );
}

function DeckCard({ job, index, total }: { job: Job; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const brightness = useTransform(scrollYProgress, (v) => `brightness(${1 - v * 0.45})`);
  const isLast = index === total - 1;

  return (
    <div ref={ref} className={isLast ? "" : "mb-[12vh] md:mb-[16vh]"}>
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          filter: isLast ? undefined : brightness,
          top: `calc(5rem + ${index * 1.25}rem + env(safe-area-inset-top, 0px))`,
        }}
        className="glass-deep border-gradient sticky origin-top rounded-3xl bg-abyss/80 p-5 will-change-transform sm:p-7 md:p-10"
      >
        <JobContent job={job} index={index} total={total} showIndex />
      </motion.div>
    </div>
  );
}

function MobileCard({ job, index, total }: { job: Job; index: number; total: number }) {
  return (
    <div className="glass-deep border-gradient relative rounded-3xl bg-abyss/80 p-5 sm:p-7">
      <JobContent job={job} index={index} total={total} showIndex={false} />
    </div>
  );
}

export function Experience() {
  const { ready, matches: isDesktop } = useMediaQuery("(min-width: 768px)");
  const showDeck = ready && isDesktop;

  return (
    <section id="experience" className="relative scroll-mt-24 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="04 · Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">built</span>
            </>
          }
          lead={
            showDeck
              ? "Scroll — each chapter stacks over the last."
              : "Three chapters of building, shipping and learning."
          }
        />

        <div className={`relative ${showDeck ? "pb-[10vh]" : "space-y-5"}`}>
          {EXPERIENCE.map((job, i) =>
            showDeck ? (
              <DeckCard key={job.company} job={job} index={i} total={EXPERIENCE.length} />
            ) : (
              <MobileCard key={job.company} job={job} index={i} total={EXPERIENCE.length} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
