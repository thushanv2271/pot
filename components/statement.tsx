"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* Apple-style pinned manifesto: the section is 260vh tall, the sentence is
 * pinned in the middle of the viewport, and the scrollbar scrubs each word
 * from ghost-grey to full brightness, one by one. */

const SENTENCE: { text: string; accent?: boolean }[] = [
  { text: "I" }, { text: "don't" }, { text: "just" }, { text: "write" }, { text: "code." },
  { text: "I" }, { text: "design" }, { text: "how" }, { text: "software" },
  { text: "feels", accent: true }, { text: "—" },
  { text: "fast,", accent: true }, { text: "precise,", accent: true },
  { text: "and" }, { text: "quietly" }, { text: "beautiful.", accent: true },
];

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <span className="relative mx-[0.14em] inline-block">
      {/* ghost layer keeps layout stable */}
      <span aria-hidden="true" className="opacity-10">{children}</span>
      <motion.span
        style={{ opacity, y }}
        className={`absolute inset-0 ${accent ? "text-gradient" : "text-ink"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });

  return (
    <section ref={ref} aria-label="Personal manifesto" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] text-faint uppercase">
            The philosophy
          </p>
          <p className="font-display flex flex-wrap text-4xl leading-[1.18] font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {SENTENCE.map((word, i) => {
              const start = (i / SENTENCE.length) * 0.92;
              const end = start + 0.92 / SENTENCE.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]} accent={word.accent}>
                  {word.text}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
