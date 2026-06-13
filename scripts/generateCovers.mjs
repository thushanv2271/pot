// Generates dark, iridescent SVG cover art for each project.
// Run once: `node scripts/generateCovers.mjs`. Output -> public/projects/*.svg
// Replace any generated file with a real screenshot (same filename) later.
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'projects')
mkdirSync(outDir, { recursive: true })

const projects = [
  { slug: 'scholar', no: '01', name: 'SCHOLAR', tag: 'React · Material UI · C#', a: '#1f4bff', b: '#00e0c6', c: '#7a00ff' },
  { slug: 'mern', no: '02', name: 'MERN STACK', tag: 'MongoDB · Express · React · Node', a: '#7a00ff', b: '#ff2db5', c: '#1f4bff' },
  { slug: 'hotel', no: '03', name: 'HOTEL SYSTEM', tag: 'C++ · Design Patterns', a: '#ffae00', b: '#ff4d2d', c: '#7a00ff' },
  { slug: 'task', no: '04', name: 'TASK MANAGER', tag: 'C# · JavaScript', a: '#00e0c6', b: '#1f4bff', c: '#00ff85' },
]

const blob = (cx, cy, r, fill, opacity) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" filter="url(#blur)"/>`

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="90"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.7"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.a}" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="${p.b}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${p.c}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="#0a0a0a"/>

  <!-- iridescent light blobs -->
  ${blob(360, 300, 280, p.a, 0.55)}
  ${blob(820, 240, 240, p.b, 0.45)}
  ${blob(640, 560, 320, p.c, 0.40)}

  <!-- faint technical grid -->
  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
    ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="800"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 120}" x2="1200" y2="${i * 120}"/>`).join('')}
  </g>

  <rect width="1200" height="800" fill="url(#vig)"/>
  <rect width="1200" height="800" filter="url(#grain)" opacity="0.5"/>

  <!-- giant index numeral -->
  <text x="60" y="700" font-family="Times New Roman, serif" font-size="360"
        fill="#ffffff" fill-opacity="0.06" font-weight="400">${p.no}</text>

  <!-- title -->
  <text x="60" y="430" font-family="Times New Roman, serif" font-size="118"
        fill="url(#sheen)" letter-spacing="2">${p.name}</text>
  <text x="64" y="490" font-family="Helvetica, Arial, sans-serif" font-size="26"
        fill="#cfcfca" letter-spacing="6" text-transform="uppercase">${p.tag.toUpperCase()}</text>

  <!-- corner ticks -->
  <g stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" fill="none">
    <path d="M40 40 h40 M40 40 v40"/>
    <path d="M1160 760 h-40 M1160 760 v-40"/>
  </g>
</svg>`
  writeFileSync(join(outDir, `${p.slug}.svg`), svg)
  console.log('wrote', `public/projects/${p.slug}.svg`)
}
