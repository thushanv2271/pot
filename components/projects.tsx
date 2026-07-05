"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check, ExternalLink, Github, Star } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  onPickTech,
  className,
}: {
  project: Project;
  onPickTech: (t: string) => void;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "glass-deep group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:border-white/20",
        className
      )}
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- vector cover art */}
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

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-cyan">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-dim">{project.description}</p>

        <ul className="mt-3.5 space-y-1.5">
          {project.features.slice(0, 3).map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm text-dim">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
              {feat}
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <button
              key={tech}
              onClick={() => onPickTech(tech)}
              className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-dim transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5">
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)",
        }}
      />
    </article>
  );
}

function FilterBar({
  filters,
  filter,
  setFilter,
}: {
  filters: string[];
  filter: string;
  setFilter: (f: string) => void;
}) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2"
      role="group"
      aria-label="Filter projects by technology"
    >
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
  );
}

function Heading() {
  return (
    <div className="text-center">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 font-mono text-xs tracking-widest text-cyan uppercase">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" />
        03 · Projects
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Selected <span className="text-gradient">work</span>
      </h2>
    </div>
  );
}

export function Projects() {
  const filters = useMemo(() => {
    const all = new Set<string>();
    PROJECTS.forEach((p) => p.stack.forEach((s) => all.add(s)));
    return ["All", ...Array.from(all)];
  }, []);

  const [filter, setFilter] = useState("All");
  const [isDesktop, setIsDesktop] = useState(false);
  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.stack.includes(filter));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---- Desktop: pinned section, vertical scroll scrubs the track sideways ---- */
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      setMaxShift(
        Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth)
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible.length, isDesktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, [0.06, 0.94], [0, -maxShift]);
  const x = useSpring(rawX, { stiffness: 220, damping: 34, mass: 0.6 });
  const progressScale = useTransform(scrollYProgress, [0.06, 0.94], [0, 1]);

  if (!isDesktop) {
    /* ------------------------- Mobile: vertical cards ------------------------- */
    return (
      <section id="projects" className="relative scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl space-y-10 px-5">
          <Reveal><Heading /></Reveal>
          <FilterBar filters={filters} filter={filter} setFilter={setFilter} />
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard project={project} onPickTech={setFilter} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Desktop: horizontal scroll-scrubbed gallery ---------------- */
  return (
    <section id="projects" ref={sectionRef} className="relative h-[320vh] scroll-mt-0">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-5 w-full max-w-6xl space-y-4 px-8">
          <Heading />
          <FilterBar filters={filters} filter={filter} setFilter={setFilter} />
        </div>

        <div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-8 px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className={cn("w-[440px] shrink-0", project.featured && "w-[500px]")}
                >
                  <ProjectCard project={project} onPickTech={setFilter} />
                </motion.div>
              ))}
            </AnimatePresence>
            {/* end card: invitation to GitHub */}
            <a
              href="https://github.com/thushanvithana"
              target="_blank"
              rel="noreferrer"
              className="glass border-gradient group flex w-[340px] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl text-center"
            >
              <Github className="h-10 w-10 text-dim transition-all duration-300 group-hover:scale-110 group-hover:text-ink" />
              <p className="font-display text-xl font-semibold">
                More on <span className="text-gradient">GitHub</span>
              </p>
              <p className="max-w-[220px] text-sm text-faint">
                40+ repositories of experiments, systems and learning in public.
              </p>
            </a>
          </motion.div>
        </div>

        {/* scrub progress */}
        <div className="mx-auto mt-6 w-full max-w-6xl px-8">
          <div className="h-px w-full bg-white/[0.08]">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-px origin-left bg-gradient-to-r from-electric via-cyan to-violet"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] tracking-widest text-faint uppercase">
            Keep scrolling — the gallery rides the scrollbar
          </p>
        </div>
      </div>
    </section>
  );
}
