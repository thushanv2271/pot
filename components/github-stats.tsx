"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookMarked, GitCommit, Github, Star, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { SITE } from "@/lib/data";

/* Live data is fetched in the visitor's browser straight from the public
 * GitHub APIs (60 req/h unauthenticated is plenty for a portfolio visit).
 * Every block degrades gracefully: if a request fails we fall back to a
 * static snapshot (stats) or hide the block (contribution graph). */

type GhStats = {
  repos: number;
  followers: number;
  stars: number;
  languages: { name: string; count: number }[];
  recent: { name: string; description: string | null; url: string; language: string | null; stars: number }[];
};

type Contribution = { date: string; count: number; level: number };

// Fallback snapshot shown if the GitHub API is unreachable/rate-limited.
const SNAPSHOT: GhStats = {
  repos: 40,
  followers: 12,
  stars: 20,
  languages: [
    { name: "JavaScript", count: 14 },
    { name: "C#", count: 9 },
    { name: "TypeScript", count: 7 },
    { name: "C++", count: 4 },
    { name: "Python", count: 3 },
  ],
  recent: [],
};

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C#": "#178600",
  "C++": "#f34b7d",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
};

function useGithubData() {
  const [stats, setStats] = useState<GhStats>(SNAPSHOT);
  const [contribs, setContribs] = useState<Contribution[] | null>(null);
  const [totalContribs, setTotalContribs] = useState<number | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${SITE.githubUser}`, { signal: controller.signal }),
          fetch(
            `https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=pushed`,
            { signal: controller.signal }
          ),
        ]);
        if (!userRes.ok || !reposRes.ok) return;
        const user = await userRes.json();
        const repos: {
          name: string;
          description: string | null;
          html_url: string;
          language: string | null;
          stargazers_count: number;
          fork: boolean;
        }[] = await reposRes.json();

        const own = repos.filter((r) => !r.fork);
        const langCount = new Map<string, number>();
        own.forEach((r) => {
          if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
        });

        setStats({
          repos: user.public_repos ?? own.length,
          followers: user.followers ?? 0,
          stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
          languages: Array.from(langCount, ([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6),
          recent: own.slice(0, 4).map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            language: r.language,
            stars: r.stargazers_count,
          })),
        });
        setLive(true);
      } catch {
        /* keep snapshot */
      }
    })();

    (async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}?y=last`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data: { total: Record<string, number>; contributions: Contribution[] } =
          await res.json();
        setContribs(data.contributions);
        setTotalContribs(Object.values(data.total).reduce((a, b) => a + b, 0));
      } catch {
        /* hide graph */
      }
    })();

    return () => controller.abort();
  }, []);

  return { stats, contribs, totalContribs, live };
}

const LEVEL_COLORS = [
  "var(--color-veil)",
  "rgba(59,130,246,0.35)",
  "rgba(59,130,246,0.6)",
  "rgba(34,211,238,0.75)",
  "rgba(34,211,238,1)",
];

/* Perf: one IntersectionObserver on the wrapper and plain CSS transitions
 * with per-column delays — not 371 individually-observed motion elements. */
function ContributionGraph({ contribs }: { contribs: Contribution[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Chunk into weeks of 7 for the classic GitHub grid.
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contribs.length; i += 7) weeks.push(contribs.slice(i, i + 7));

  return (
    <div
      ref={ref}
      className="overflow-x-auto pb-2"
      role="img"
      aria-label="GitHub contribution graph, last 12 months"
    >
      <div className="flex min-w-max gap-[3px]">
        {weeks.map((week, wi) => (
          <div
            key={wi}
            className="flex flex-col gap-[3px] transition-all duration-500 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(8px)",
              transitionDelay: `${Math.min(wi * 12, 700)}ms`,
            }}
          >
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.date}: ${day.count} contributions`}
                className="h-[11px] w-[11px] rounded-[3px]"
                style={{ backgroundColor: LEVEL_COLORS[Math.min(day.level, 4)] }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GithubStats() {
  const { stats, contribs, totalContribs, live } = useGithubData();

  const tiles = [
    { icon: BookMarked, label: "Public Repos", value: stats.repos, accent: "#3b82f6" },
    { icon: Users, label: "Followers", value: stats.followers, accent: "#22d3ee" },
    { icon: Star, label: "Total Stars", value: stats.stars, accent: "#a78bfa" },
    {
      icon: GitCommit,
      label: "Contributions / yr",
      value: totalContribs ?? 800,
      accent: "#34d399",
    },
  ];

  const maxLang = Math.max(...stats.languages.map((l) => l.count), 1);

  return (
    <section id="github" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="07 · Open Source"
          title={
            <>
              Life on <span className="text-gradient">GitHub</span>
            </>
          }
          lead={
            live
              ? "Pulled live from the GitHub API — the graph never lies."
              : "A snapshot of my open-source activity — see the live profile for today's numbers."
          }
        />

        {/* Stat tiles */}
        <Stagger className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => (
            <StaggerItem key={tile.label}>
              <div className="glass-deep group rounded-2xl p-5 text-center transition-all duration-300 hover:border-line-strong md:p-6">
                <tile.icon
                  className="mx-auto mb-3 h-5 w-5 transition-transform duration-300 group-hover:scale-125"
                  style={{ color: tile.accent }}
                  aria-hidden="true"
                />
                <p className="font-display text-3xl font-semibold text-ink">
                  <CountUp value={tile.value} />
                </p>
                <p className="mt-1 text-xs tracking-wide text-faint">{tile.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Contribution graph */}
          <Reveal className="glass-deep rounded-3xl p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display font-semibold text-ink">Contribution graph</h3>
              <span className="font-mono text-xs text-faint">last 12 months</span>
            </div>
            {contribs ? (
              <ContributionGraph contribs={contribs} />
            ) : (
              <div className="grid h-28 place-items-center rounded-xl border border-dashed border-line text-sm text-faint">
                Graph loads live from GitHub — view the profile if it&apos;s shy.
              </div>
            )}
            <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[11px] text-faint">
              Less
              {LEVEL_COLORS.map((c) => (
                <span key={c} className="h-[10px] w-[10px] rounded-[3px]" style={{ backgroundColor: c }} />
              ))}
              More
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.1} className="glass-deep rounded-3xl p-6 md:p-8">
            <h3 className="font-display mb-5 font-semibold text-ink">Most-used languages</h3>
            <div className="space-y-4">
              {stats.languages.map((lang, i) => (
                <div key={lang.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-dim">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: LANG_COLORS[lang.name] ?? "#3b82f6" }}
                        aria-hidden="true"
                      />
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-faint">{lang.count} repos</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.count / maxLang) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${LANG_COLORS[lang.name] ?? "#3b82f6"}cc, ${
                          LANG_COLORS[lang.name] ?? "#3b82f6"
                        }66)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Recent repos (only when live data arrived) */}
        {stats.recent.length > 0 && (
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.recent.map((repo) => (
              <StaggerItem key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group block h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
                >
                  <p className="truncate font-mono text-sm text-ink group-hover:text-cyan">
                    {repo.name}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-faint">
                    {repo.description ?? "No description — the code speaks."}
                  </p>
                  <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-faint">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#3b82f6" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" aria-hidden="true" /> {repo.stars}
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-10 text-center">
          <a
            href={SITE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-dim transition-all duration-300 hover:border-electric/60 hover:text-electric hover:shadow-glow-blue"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Explore the full profile
          </a>
        </Reveal>
      </div>
    </section>
  );
}
