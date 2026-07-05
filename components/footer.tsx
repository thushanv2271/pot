import { ArrowUp, Github, Heart, Linkedin, Twitter, Youtube } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";

const SOCIALS = [
  { icon: Github, href: SITE.socials.github, label: "GitHub" },
  { icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: SITE.socials.twitter, label: "Twitter" },
  { icon: Youtube, href: SITE.socials.youtube, label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* top glow line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#top" className="font-display text-xl font-semibold tracking-tight">
              thushan<span className="text-electric">.</span>dev
            </a>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-faint">
              {SITE.role} — crafting fast, elegant software from {SITE.location}.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="grid grid-cols-3 gap-x-10 gap-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-dim transition-colors hover:text-cyan">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="glass grid h-10 w-10 place-items-center rounded-xl text-dim transition-all duration-300 hover:-translate-y-1 hover:text-ink hover:shadow-glow-blue"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              className="glass ml-2 grid h-10 w-10 place-items-center rounded-xl text-cyan transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-cyan"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-7 text-xs text-faint md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with Next.js &amp;
            <Heart className="h-3.5 w-3.5 fill-red-500/80 text-red-500/80" aria-hidden="true" />
            <span className="sr-only">love</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
