"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { TECH_WALL } from "@/lib/data";

const ACCENTS = ["#3b82f6", "#22d3ee", "#a78bfa", "#34d399"];

/** Interactive technology wall: two counter-scrolling marquee rows that pause
 *  on hover and skew with your scroll velocity — flick the page and the wall
 *  leans into the motion. */
export function TechWall() {
  const half = Math.ceil(TECH_WALL.length / 2);
  const rowA = TECH_WALL.slice(0, half);
  const rowB = TECH_WALL.slice(half);

  // Scroll-velocity → skew: the faster you scroll, the harder the rows lean.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 300, damping: 50 });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [8, -8]);

  return (
    <section id="stack" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="06 · Arsenal"
          title={
            <>
              The <span className="text-gradient">tech stack</span>
            </>
          }
          lead="The tools I reach for when it's time to ship."
        />
      </div>

      {/* Marquee rows — duplicated content for a seamless loop */}
      <motion.div
        className="space-y-5 will-change-transform"
        style={{
          skewX,
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        {[rowA, rowB].map((row, rowIdx) => (
          <div key={rowIdx} className="group flex overflow-hidden">
            <div
              className="animate-marquee flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused]"
              style={rowIdx === 1 ? { animationDirection: "reverse", animationDuration: "36s" } : undefined}
            >
              {[...row, ...row].map((tech, i) => (
                <motion.span
                  key={`${tech}-${i}`}
                  whileHover={{ y: -6, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="glass-deep flex cursor-default items-center gap-0.5 rounded-xl px-4 py-3 font-display text-sm font-medium whitespace-nowrap text-dim transition-colors duration-300 hover:text-ink sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
                  style={{ boxShadow: "var(--shadow-neu)" }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ACCENTS[i % ACCENTS.length] }}
                    aria-hidden="true"
                  />
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
