"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Kinetic typography interlude before the contact section: two oversized
 * lines slide in opposite directions as the scrollbar moves — pure scrub,
 * award-site style. The outlined line uses a text stroke; the filled line
 * carries the gradient. */
export function KineticDivider() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-14%", "6%"]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.15, 0.5, 0.15]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative select-none overflow-hidden py-14 sm:py-20 md:py-28"
    >
      <motion.div
        style={{
          opacity: glow,
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.08) 45%, transparent 72%)",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <motion.p
        style={{ x: xLeft }}
        className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-bold tracking-tight whitespace-nowrap text-transparent"
      >
        <span style={{ WebkitTextStroke: "1.5px var(--stroke-faint)" }}>
          LET&apos;S BUILD · LET&apos;S BUILD · LET&apos;S BUILD
        </span>
      </motion.p>
      <motion.p
        style={{ x: xRight }}
        className="text-gradient font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-bold tracking-tight whitespace-nowrap"
      >
        SOMETHING GREAT · SOMETHING GREAT
      </motion.p>
    </section>
  );
}
