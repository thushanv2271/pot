"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { EXPERIENCE } from "@/lib/data";

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
          lead="From first principles to production — the roles that shaped how I engineer."
        />

        <div className="relative">
          {/* animated spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-electric via-cyan to-violet/40"
          />

          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.company} delay={0.06 * i} className="relative pl-16">
                {/* node */}
                <span className="absolute top-1 left-0 grid h-10 w-10 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-electric/15 [animation-duration:3s]" />
                  <span className="glass border-gradient relative grid h-10 w-10 place-items-center rounded-full">
                    <Briefcase className="h-4 w-4 text-cyan" aria-hidden="true" />
                  </span>
                </span>

                <div className="glass-deep group rounded-2xl p-6 transition-all duration-300 hover:border-white/20 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-ink">{job.role}</h3>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-cyan">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-electric">{job.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-dim md:text-[15px]">{job.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-dim">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-dim transition-colors duration-300 group-hover:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
