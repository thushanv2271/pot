"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { TECH_WALL } from "@/lib/data";

const ACCENTS = ["#3b82f6", "#22d3ee", "#a78bfa", "#34d399"];

/** Interactive technology wall: two counter-scrolling marquee rows that pause
 *  on hover, plus a full grid of tilt-on-hover cards. */
export function TechWall() {
  const half = Math.ceil(TECH_WALL.length / 2);
  const rowA = TECH_WALL.slice(0, half);
  const rowB = TECH_WALL.slice(half);

  return (
    <section id="stack" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
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
      <div
        className="space-y-5"
        style={{
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
                  className="glass-deep flex cursor-default items-center gap-3 rounded-2xl px-6 py-4 font-display text-base font-medium whitespace-nowrap text-dim transition-colors duration-300 hover:text-ink"
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
      </div>
    </section>
  );
}
