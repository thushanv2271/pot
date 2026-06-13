# Thushan Vithana — 3D Portfolio

An interactive, scroll-bound 3D personal portfolio. Dark, minimalist,
luxury-brutalist. Engineering mechanics mimic Apple's smooth, scroll-driven
narrative timeline; the aesthetic is deliberately distinct — deep midnight
black with a single iridescent chrome artefact.

## Stack

- **Vite** + **React** (standard JavaScript, no TypeScript)
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — `Environment` / `Lightformer` helpers
- **three**
- **gsap** + **ScrollTrigger** — the scroll-bound macro timeline

## How it works

- `index.html` → `src/main.jsx` mounts the app.
- `src/App.jsx` lays out two layers:
  - a **fixed** `.canvas-viewport` (`z-index: 1`) holding the persistent 3D scene;
  - a natively scrolling `.scroll-track` (`z-index: 2`) with four `100vh` sections.
- `src/CreativeCanvas.jsx` owns the Three.js scene and the GSAP timeline:
  - A `torusKnotGeometry([1, 0.3, 120, 16])` rendered with a reflective
    `meshPhysicalMaterial` (roughness `0.1`, metalness `0.9`, clearcoat `1.0`,
    iridescence on) for the dark liquid-chrome look.
  - Monochromatic studio lighting: a sharp white key light from the top-left
    and a faint neon-blue rim light from the bottom-right, plus a self-contained
    `Environment` of light cards so reflections work fully offline.
  - A single GSAP `ScrollTrigger` timeline (`scrub: 1.5`) writes to a shared
    `macro` object; `useFrame` reads it and damps toward the targets, layering
    real-time **mouse-move parallax** on top so the scene stays alive at rest.
  - Resize is handled by R3F automatically; the camera aspect is also locked to
    the viewport explicitly so the 3D framing never distorts.

### Scroll choreography

| Transition | 3D behaviour |
|---|---|
| Section 1 → 2 | Dramatic X/Y tumble + smooth scale expansion |
| Section 2 → 3 | Heavy camera push-in on Z toward a detail; copy shifts L→R |
| Section 3 → 4 | Object glides to far-left, subtle spin, opening negative space on the right |

## Run locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Deploy

Any static host works (Vercel, Netlify, GitHub Pages). Build command
`npm run build`, output directory `dist`.
