"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
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
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
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
      {/* glow under the window */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -bottom-10 -z-10 h-32 rounded-full bg-electric/20 blur-3xl"
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
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ------------------------------- Copy ------------------------------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-sm text-dim"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Available for opportunities
            <span className="text-faint">·</span>
            <MapPin className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
            {SITE.location}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-soft">Hi, I&apos;m</span>
            <br />
            <span className="text-gradient">{SITE.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-lg text-dim md:text-xl"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 max-w-xl leading-relaxed text-dim"
          >
            {SITE.tagline} Currently crafting production systems at{" "}
            <span className="text-ink">{SITE.company}</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#projects">
                <Button size="lg" className="group">
                  View Projects
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={SITE.resume} download>
                <Button variant="glass" size="lg">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact">
                <Button variant="ghost" size="lg">
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
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs tracking-wide text-faint">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-semibold text-ink">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------------------------- Code visual ---------------------------- */}
        <div className="relative">
          <CodeWindow />
          <FloatingChips />
        </div>
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
    </section>
  );
}
