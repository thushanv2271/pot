"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { SKILL_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

function levelLabel(level: number) {
  if (level >= 88) return "Expert";
  if (level >= 80) return "Advanced";
  return "Proficient";
}

export function Skills() {
  const [activeId, setActiveId] = useState(SKILL_CATEGORIES[0].id);
  const active = SKILL_CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section id="skills" className="relative scroll-mt-24 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          eyebrow="02 · Skills"
          title={
            <>
              An interactive <span className="text-gradient">skills dashboard</span>
            </>
          }
          lead="Eight disciplines, one obsession: shipping software that feels effortless."
        />

        {/* Category tabs — horizontal scroll on small screens */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-0 sm:mb-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const selected = cat.id === activeId;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`skills-panel-${cat.id}`}
                onClick={() => setActiveId(cat.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors duration-300 sm:px-4 sm:py-2.5",
                  selected ? "text-ink" : "text-dim hover:text-ink"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="glass border-gradient absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <Icon name={cat.icon} className="relative h-4 w-4" />
                <span className="relative">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active category panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`skills-panel-${active.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                whileHover={{ y: -5 }}
                className="glass-deep group rounded-2xl p-5 transition-colors duration-300 hover:border-line-strong"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display font-medium text-ink">{skill.name}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[11px]"
                    style={{ color: active.accent, backgroundColor: `${active.accent}1a` }}
                  >
                    {levelLabel(skill.level)}
                  </span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-mist"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} proficiency`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
                    className="shimmer h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${active.accent}, ${active.accent}99)`,
                    }}
                  />
                </div>
                <p className="mt-2 text-right font-mono text-[11px] text-faint">{skill.level}%</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
