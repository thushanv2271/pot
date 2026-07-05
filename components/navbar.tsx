"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]"
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between px-4 transition-all duration-500 sm:h-16 sm:px-5 md:px-8",
          scrolled &&
            "glass glass-blur mt-3 max-w-5xl rounded-2xl shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)]"
        )}
      >
        {/* Monogram */}
        <a
          href="#top"
          aria-label="Back to top"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <span className="border-gradient relative grid h-9 w-9 place-items-center rounded-xl bg-veil font-mono text-sm text-cyan transition-transform duration-300 group-hover:rotate-6">
            TV
          </span>
          <span className="hidden sm:block">
            thushan<span className="text-electric">.</span>dev
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm text-dim transition-colors hover:text-ink",
                active === link.href && "text-ink"
              )}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-mist"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
          <ThemeToggle className="ml-2" />
          <a
            href={SITE.resume}
            download
            className="ml-2 inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-4 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-glow-blue"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          className="grid h-10 w-10 place-items-center rounded-xl text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass glass-blur mx-3 mt-2 flex max-h-[calc(100dvh-5rem-env(safe-area-inset-top,0px))] flex-col gap-1 overflow-y-auto rounded-2xl p-3 sm:mx-4 md:hidden"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className="rounded-xl px-4 py-3 text-base text-dim transition-colors hover:bg-mist hover:text-ink"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href={SITE.resume}
              download
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-cyan text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
