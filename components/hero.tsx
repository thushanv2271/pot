"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
import { useMediaQuery } from "@/lib/hooks";
import { FLOATING_TECH, HERO_CODE, SITE, STATS } from "@/lib/data";

const ROLES = ["Software Engineer", "Full-Stack Developer", ".NET Specialist", "React Craftsman"];

/** Looping typewriter for the rotating role line. */
function Typewriter() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = full.slice(0, text.length + 1);
          setText(next);
          if (next === full) setTimeout(() => setDeleting(true), 1700);
        } else {
          const next = full.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % ROLES.length);
          }
        }
      },
      deleting ? 34 : 62
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span className="font-mono text-cyan">
      {text}
      <span className="animate-blink text-electric">▍</span>
    </span>
  );
}

/** Syntax-tinted code window with staggered line reveal. */
function CodeWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
      className="glass-deep relative rounded-2xl"
      style={{ perspective: 800 }}
    >
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-faint">engineer.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-[13px]">
        {HERO_CODE.map((line, i) => (
          <motion.code
            key={i}
            className="block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.09 }}
          >
            <span className="mr-4 inline-block w-4 select-none text-right text-faint/60">
              {line ? i + 1 : ""}
            </span>
            <SyntaxLine line={line} />
          </motion.code>
        ))}
      </pre>
      {/* glow under the window (gradient — no blur filter) */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-16 -bottom-16 -z-10 h-44 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.07) 45%, transparent 72%)",
        }}
      />
    </motion.div>
  );
}

function SyntaxLine({ line }: { line: string }) {
  // Tiny display-only tokenizer — just enough colour to feel real.
  const parts = line.split(/("[^"]*"|\b(?:const|while)\b|Infinity|engineer|\d+)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        let cls = "text-ink/80";
        if (p.startsWith('"')) cls = "text-emerald";
        else if (p === "const" || p === "while") cls = "text-violet";
        else if (p === "Infinity") cls = "text-cyan";
        else if (p === "engineer") cls = "text-electric";
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
    </>
  );
}

/** Orbiting technology chips around the code window. */
function FloatingChips() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {FLOATING_TECH.map((tech, i) => {
        const positions = [
          { top: "-8%", left: "6%" },
          { top: "4%", right: "-7%" },
          { top: "38%", left: "-11%" },
          { top: "58%", right: "-12%" },
          { bottom: "-9%", left: "16%" },
          { bottom: "6%", right: "8%" },
          { top: "-13%", right: "26%" },
          { bottom: "-14%", right: "38%" },
        ] as const;
        return (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + i * 0.12, duration: 0.5 }}
            style={{
              ...positions[i % positions.length],
              animationDelay: `${-i * 1.3}s`,
            }}
            className="glass animate-float absolute rounded-xl px-3 py-1.5 font-mono text-xs text-dim shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]"
          >
            {tech}
          </motion.span>
        );
      })}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { ready, matches: isMobile } = useMediaQuery("(max-width: 767px)");
  const mobile = !ready || isMobile;
  // Scrub the hero's exit with the scrollbar, Apple-style: while the tall
  // section scrolls, the pinned stage recedes, blurs and splits in parallax.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scaleEnd = mobile ? 0.94 : 0.86;
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleEnd]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, (v) => `blur(${Math.round(v * 12)}px)`);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, mobile ? -60 : -140]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, mobile ? 40 : 160]);
  const codeRotate = useTransform(scrollYProgress, [0, 1], [0, mobile ? 0 : -7]);

  return (
    <section id="top" ref={ref} className="relative h-[125vh] sm:h-[140vh] md:h-[172vh]">
      <motion.div
        style={mobile ? { opacity } : { scale, opacity, filter: blur }}
        className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top,0px))] will-change-transform sm:pt-20"
      >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:gap-12 sm:px-5 md:gap-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ------------------------------- Copy ------------------------------- */}
        <motion.div style={{ y: copyY }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-veil px-3 py-1.5 text-xs text-dim sm:mb-6 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="whitespace-nowrap">Available for opportunities</span>
            <span className="hidden text-faint sm:inline">·</span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" aria-hidden="true" />
              <span className="truncate">{SITE.location}</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display text-[2rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-soft">Hi, I&apos;m</span>
            <br />
            <span className="text-gradient">{SITE.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-base text-dim sm:mt-5 sm:text-lg md:text-xl"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-dim sm:mt-5 sm:text-base"
          >
            {SITE.tagline} Currently crafting production systems at{" "}
            <span className="text-ink">{SITE.company}</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a href="#projects" className="block w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  View Projects
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href={SITE.resume} download className="block w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </Button>
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href="#contact" className="block w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact Me
                </Button>
              </a>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-14 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[10px] tracking-wide text-faint sm:text-xs">{s.label}</dt>
                <dd className="order-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------------------------- Code visual ---------------------------- */}
        <motion.div
          style={{ y: codeY, rotate: codeRotate }}
          className="relative mt-2 w-full sm:mt-0"
        >
          <CodeWindow />
          <FloatingChips />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-cyan" />
        </motion.span>
      </motion.a>
      </motion.div>
    </section>
  );
}
