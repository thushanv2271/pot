"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, Twitter, Youtube } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { SITE } from "@/lib/data";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: SITE.socials.github, accent: "hover:text-ink" },
  { icon: Linkedin, label: "LinkedIn", href: SITE.socials.linkedin, accent: "hover:text-electric" },
  { icon: Twitter, label: "Twitter / X", href: SITE.socials.twitter, accent: "hover:text-cyan" },
  { icon: Youtube, label: "YouTube", href: SITE.socials.youtube, accent: "hover:text-violet" },
] as const;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-2 block font-mono text-xs tracking-widest text-faint uppercase transition-colors group-focus-within:text-cyan">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-faint/70 outline-none transition-all duration-300 focus:border-electric/60 focus:bg-white/[0.05] focus:shadow-glow-blue";

/** Stylised Sri Lanka locator — fully self-contained SVG "map". */
function LocationMap() {
  return (
    <div className="glass-deep relative overflow-hidden rounded-3xl p-6">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <svg viewBox="0 0 200 240" className="relative mx-auto h-44 w-auto" role="img" aria-label="Map of Sri Lanka, marking Colombo">
        {/* Simplified Sri Lanka outline */}
        <path
          d="M96 18c10-6 22-4 30 4 9 9 12 22 15 34 3 13 7 26 7 40 0 18-3 36-11 52-7 14-18 26-31 34-9 6-21 9-30 3-9-5-13-16-15-26-3-14-3-29-1-43 2-16 5-32 11-47 6-16 13-33 25-51z"
          fill="rgba(59,130,246,0.08)"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="1.5"
        />
        {/* Colombo pulse (west coast) */}
        <circle cx="72" cy="150" r="5" fill="#22d3ee">
          <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="150" r="12" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="8;20" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
      <p className="relative mt-3 flex items-center justify-center gap-2 text-sm text-dim">
        <MapPin className="h-4 w-4 text-cyan" aria-hidden="true" />
        {SITE.location} · UTC+5:30
      </p>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  /** No backend required: compose a mailto with the form contents. */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${fd.get("name")}`);
    const body = encodeURIComponent(`${fd.get("message")}\n\n— ${fd.get("name")} (${fd.get("email")})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="09 · Contact"
          title={
            <>
              Let&apos;s build something <span className="text-gradient">great</span>
            </>
          }
          lead="Have a role, a project or just an idea worth chasing? My inbox is open."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* --------------------------- Form --------------------------- */}
          <Reveal direction="right">
            <form onSubmit={onSubmit} className="glass-deep border-gradient rounded-3xl p-7 md:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Your name">
                  <input name="name" required placeholder="Ada Lovelace" className={inputCls} />
                </Field>
                <Field label="Your email">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="ada@example.com"
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Message">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the problem you're solving…"
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>
              <div className="mt-7 flex items-center justify-between gap-4">
                <p className="font-mono text-xs text-faint">
                  {sent ? "✓ Opening your mail client…" : "Replies within 24h"}
                </p>
                <Magnetic>
                  <Button type="submit" size="lg" className="group">
                    Send Message
                    <Send
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </Magnetic>
              </div>
            </form>
          </Reveal>

          {/* --------------------- Direct channels ---------------------- */}
          <div className="space-y-5">
            <Reveal direction="left" delay={0.05}>
              <a
                href={`mailto:${SITE.email}`}
                className="glass-deep group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-white/20"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-electric/10 text-electric transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs tracking-wide text-faint">Email me directly</span>
                  <span className="block truncate font-medium text-ink group-hover:text-cyan">
                    {SITE.email}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="glass-deep rounded-2xl p-5">
                <p className="mb-4 text-xs tracking-wide text-faint">Elsewhere on the internet</p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -3 }}
                      className={`glass flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm text-dim transition-colors duration-300 ${s.accent}`}
                    >
                      <s.icon className="h-4 w-4" aria-hidden="true" />
                      {s.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <LocationMap />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
