"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Github, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const filters = useMemo(() => {
    const all = new Set<string>();
    PROJECTS.forEach((p) => p.stack.forEach((s) => all.add(s)));
    return ["All", ...Array.from(all)];
  }, []);

  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.stack.includes(filter));

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="03 · Projects"
          title={
            <>
              Selected <span className="text-gradient">work</span>
            </>
          }
          lead="A few of the things I've designed, engineered and shipped — every repo open for inspection."
        />

        {/* Tech filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by technology">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300",
                filter === f
                  ? "border-electric/60 bg-electric/10 text-electric shadow-glow-blue"
                  : "border-line text-dim hover:border-white/25 hover:text-ink"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
                className={cn(
                  "glass-deep group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:border-white/20",
                  project.featured && "md:col-span-2 md:flex-row"
                )}
              >
                {/* Cover */}
                <div
                  className={cn(
                    "relative overflow-hidden",
                    project.featured ? "md:w-1/2" : "aspect-[3/2]"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- vector cover art, no optimization needed */}
                  <img
                    src={`/projects/${project.slug}.svg`}
                    alt={`${project.name} cover art`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  {project.featured && (
                    <span className="glass absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-cyan">
                      <Star className="h-3 w-3 fill-cyan" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className={cn("flex flex-1 flex-col p-6 md:p-8", project.featured && "md:w-1/2")}>
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-cyan md:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-dim md:text-[15px]">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {project.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-dim">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-dim transition-colors hover:border-cyan/50 hover:text-cyan"
                      >
                        {tech}
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink transition-all duration-300 hover:border-electric/60 hover:text-electric hover:shadow-glow-blue"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      GitHub
                    </a>
                    <a
                      href={project.demo ?? project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-dim transition-colors duration-300 hover:text-cyan"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Live Demo
                    </a>
                  </div>
                </div>

                {/* hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)",
                  }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
