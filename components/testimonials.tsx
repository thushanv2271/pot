"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const count = TESTIMONIALS.length;

  const paginate = useCallback(
    (dir: number) => setIndex(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );

  // Gentle auto-advance; pauses whenever the user interacts (via key change).
  useEffect(() => {
    const t = setInterval(() => paginate(1), 7000);
    return () => clearInterval(t);
  }, [paginate, index]);

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow="08 · Kind Words"
          title={
            <>
              What people <span className="text-gradient">say</span>
            </>
          }
        />

        <div className="relative">
          <div className="glass-deep border-gradient relative min-h-[280px] overflow-hidden rounded-3xl p-8 md:min-h-[240px] md:p-12">
            <Quote
              className="absolute top-7 left-8 h-10 w-10 text-electric/20 md:h-14 md:w-14"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
                className="relative pt-8 md:pt-6 md:pl-16"
              >
                <blockquote className="text-lg leading-relaxed text-ink/90 md:text-xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-electric/30 to-violet/30 font-display text-sm font-semibold text-ink"
                  >
                    {current.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-ink">{current.name}</span>
                    <span className="block text-sm text-faint">{current.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="glass grid h-11 w-11 place-items-center rounded-full text-dim transition-all duration-300 hover:text-ink hover:shadow-glow-blue"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-400",
                    i === index ? "w-8 bg-gradient-to-r from-electric to-cyan" : "w-2 bg-mist hover:bg-line-strong"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="glass grid h-11 w-11 place-items-center rounded-full text-dim transition-all duration-300 hover:text-ink hover:shadow-glow-blue"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
