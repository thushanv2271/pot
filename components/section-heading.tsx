import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-14 md:mb-20", centered ? "text-center" : "text-left")}>
      <Reveal>
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 font-mono text-xs tracking-widest text-cyan uppercase"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-dim md:text-lg",
              centered && "mx-auto"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
