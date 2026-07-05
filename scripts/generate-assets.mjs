// Generates the static SVG assets (project covers, favicon, OG image) in the
// site's blue/cyan/violet/emerald palette. Run: `node scripts/generate-assets.mjs`
// Replace any cover with a real screenshot (same filename) whenever you like.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = path.join(root, "public");
mkdirSync(path.join(pub, "projects"), { recursive: true });

const PROJECTS = [
  { slug: "scholar", label: "Scholar Web App", mono: "SW", a: "#3b82f6", b: "#22d3ee", c: "#a78bfa" },
  { slug: "mern", label: "MERN Stack Platform", mono: "MS", a: "#22d3ee", b: "#34d399", c: "#3b82f6" },
  { slug: "hotel", label: "Hotel Management", mono: "HM", a: "#a78bfa", b: "#3b82f6", c: "#22d3ee" },
  { slug: "task", label: "Smart Task Manager", mono: "TM", a: "#34d399", b: "#22d3ee", c: "#a78bfa" },
];

const cover = ({ label, mono, a, b, c }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${label} cover art">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="95"/></filter>
    <radialGradient id="vig" cx="50%" cy="42%" r="78%">
      <stop offset="55%" stop-color="#09090b" stop-opacity="0"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0.82"/>
    </radialGradient>
    <linearGradient id="ln" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${c}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="#0b0b10"/>
  <circle cx="330" cy="290" r="270" fill="${a}" opacity="0.5" filter="url(#blur)"/>
  <circle cx="860" cy="230" r="230" fill="${b}" opacity="0.38" filter="url(#blur)"/>
  <circle cx="640" cy="590" r="300" fill="${c}" opacity="0.34" filter="url(#blur)"/>
  <g stroke="rgba(148,163,184,0.10)" stroke-width="1">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 63}" y1="0" x2="${i * 63}" y2="800"/>`).join("")}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 63}" x2="1200" y2="${i * 63}"/>`).join("")}
  </g>
  <g transform="translate(600,385)">
    <rect x="-140" y="-140" width="280" height="280" rx="56" fill="rgba(255,255,255,0.045)" stroke="url(#ln)" stroke-width="2"/>
    <text x="0" y="34" text-anchor="middle" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="104" font-weight="600" fill="url(#ln)">${mono}</text>
  </g>
  <text x="600" y="640" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-size="26" letter-spacing="10" fill="rgba(232,234,242,0.75)">${label.toUpperCase()}</text>
  <rect width="1200" height="800" fill="url(#vig)"/>
</svg>
`;

for (const p of PROJECTS) {
  writeFileSync(path.join(pub, "projects", `${p.slug}.svg`), cover(p));
  console.log(`✓ projects/${p.slug}.svg`);
}

// Favicon — TV monogram tile
writeFileSync(
  path.join(pub, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#3b82f6"/><stop offset="55%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#a78bfa"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="15" fill="#09090b"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="13.5" fill="none" stroke="url(#g)" stroke-width="3"/>
  <text x="32" y="42.5" text-anchor="middle" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="27" font-weight="700" fill="url(#g)">TV</text>
</svg>
`
);
console.log("✓ favicon.svg");

// Open Graph image (SVG is accepted by most crawlers; swap for PNG if needed)
writeFileSync(
  path.join(pub, "og.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="110"/></filter>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/><stop offset="50%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <circle cx="220" cy="140" r="240" fill="#3b82f6" opacity="0.32" filter="url(#blur)"/>
  <circle cx="1010" cy="500" r="260" fill="#a78bfa" opacity="0.28" filter="url(#blur)"/>
  <g stroke="rgba(148,163,184,0.09)" stroke-width="1">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 63}" y1="0" x2="${i * 63}" y2="630"/>`).join("")}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 63}" x2="1200" y2="${i * 63}"/>`).join("")}
  </g>
  <text x="90" y="255" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="88" font-weight="700" fill="#e8eaf2">Thushan Vithana</text>
  <text x="90" y="340" font-family="'Space Grotesk','Segoe UI',sans-serif" font-size="46" font-weight="500" fill="url(#g)">Software Engineer</text>
  <text x="90" y="420" font-family="'JetBrains Mono',monospace" font-size="24" fill="rgba(154,161,181,0.9)">.NET · React · Next.js · Azure — building software that feels effortless</text>
  <rect x="90" y="470" width="150" height="4" rx="2" fill="url(#g)"/>
</svg>
`
);
console.log("✓ og.svg");
