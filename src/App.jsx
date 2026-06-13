import React, { Suspense, useEffect, useState } from 'react'
import CreativeCanvas from './CreativeCanvas.jsx'
import Logo from './Logo.jsx'

/**
 * Project data. Each `cover` points at public/projects/<slug>.svg — drop a real
 * screenshot in with the same filename to replace the generated cover art.
 */
const PROJECTS = [
  {
    slug: 'scholar',
    name: 'Scholar Web App',
    blurb:
      'A school-management platform — React + Material UI dashboard backed by a C# (.NET) server. Policy, contributions and admin in one minimal interface.',
    stack: ['React', 'Material UI', 'TypeScript', 'C# / .NET'],
    href: 'https://github.com/thushanvithana/ScholarWebApp',
    featured: true,
  },
  {
    slug: 'mern',
    name: 'MERN Stack Platform',
    blurb:
      'Full-stack JavaScript application built on the MongoDB · Express · React · Node stack — my deep-dive into end-to-end web engineering.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    href: 'https://github.com/thushanvithana/MERN-STACK',
  },
  {
    slug: 'hotel',
    name: 'Hotel Management System',
    blurb:
      'A C++ reservation and operations system implemented with multiple classic design patterns — an exercise in clean, extensible architecture.',
    stack: ['C++', 'OOP', 'Design Patterns'],
    href: 'https://github.com/thushanvithana/Hotel-Management-System',
  },
  {
    slug: 'task',
    name: 'Smart Task Manager',
    blurb:
      'A productivity app with a C# service layer and a JavaScript frontend — task tracking with a fast, focused UI.',
    stack: ['C# / .NET', 'JavaScript', 'REST'],
    href: 'https://github.com/thushanvithana/SmartTaskManagerFrontend',
  },
]

/**
 * App layout follows the Apple-style scroll narrative:
 *  - A FIXED .canvas-viewport (z-index 1) holds the persistent 3D scene.
 *  - A natively scrolling .scroll-track (z-index 2) layers 4 full-height
 *    text sections on top. The scrollbar drives the GSAP timeline inside
 *    CreativeCanvas, so the chrome object and the copy move as one story.
 */
export default function App() {
  // Two themes: 'bone' (warm light editorial) and 'midnight' (the original
  // dark luxury look). Persisted so the choice sticks between visits.
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'bone'
    return localStorage.getItem('tv-theme') || 'bone'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('tv-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'bone' ? 'midnight' : 'bone'))

  return (
    <div className="app">
      <header className="top-bar">
        <Logo className="brand-logo" />
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Switch theme"
        >
          {theme === 'bone' ? 'Midnight ◑' : 'Bone ◐'}
        </button>
      </header>

      {/* Layer 1 — the fixed, ever-present 3D stage. */}
      <div className="canvas-viewport">
        <Suspense fallback={null}>
          <CreativeCanvas theme={theme} />
        </Suspense>
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </div>

      {/* Layer 2 — the scrolling narrative. */}
      <main className="scroll-track">
        {/* 1 — HERO */}
        <section className="section section--hero">
          <div className="section-inner align-left">
            <p className="eyebrow">Sri Lanka · Software Engineer</p>
            <h1 className="display">
              THUSHAN<br />VITHANA
            </h1>
            <p className="lede">
              I build at the seam where engineering precision meets
              expressive, tactile interfaces.
            </p>
            <span className="scroll-hint">Scroll ↓</span>
          </div>
        </section>

        {/* 2 — ABOUT */}
        <section className="section section--about">
          <div className="section-inner align-left">
            <p className="eyebrow">01 — Ethos</p>
            <h2 className="headline">
              Code as craft.<br />Restraint as luxury.
            </h2>
            <p className="body">
              Associate Software Engineer at Azend Technologies. Full-stack by
              trade — Python, JavaScript and the MERN stack — but drawn to the
              edges: real-time graphics, motion, and the open-source ethos of
              GNU/Linux and the Free Software community.
            </p>
          </div>
        </section>

        {/* 3 — CAPABILITIES */}
        <section className="section section--work">
          <div className="section-inner align-right">
            <p className="eyebrow">02 — Capabilities</p>
            <h2 className="headline">What I shape</h2>
            <ul className="skill-grid">
              <li>React · Node.js</li>
              <li>Python · C++ · Java</li>
              <li>MongoDB · Firebase</li>
              <li>Three.js · R3F · GSAP</li>
              <li>System Design</li>
              <li>Motion & Interaction</li>
            </ul>
          </div>
        </section>

        {/* 4 — PROJECTS + CONTACT (negative space on the right) */}
        <section className="section section--contact">
          <div className="section-inner section-inner--wide align-right">
            <p className="eyebrow">03 — Selected Work</p>

            <div className="project-grid">
              {PROJECTS.map((p) => (
                <a
                  key={p.slug}
                  className={`project-card${p.featured ? ' project-card--featured' : ''}`}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="card-media">
                    <img src={`projects/${p.slug}.svg`} alt={`${p.name} cover`} loading="lazy" />
                    {p.featured && <span className="card-badge">Featured</span>}
                  </div>
                  <div className="card-body">
                    <h3 className="card-name">{p.name}</h3>
                    <p className="card-blurb">{p.blurb}</p>
                    <ul className="card-stack">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <span className="card-cta">View on GitHub ↗</span>
                  </div>
                </a>
              ))}
            </div>

            <nav className="links">
              <a href="https://github.com/thushanvithana" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://twitter.com/VithanaThushan" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.youtube.com/@ThushanVithana" target="_blank" rel="noreferrer">YouTube</a>
              <a href="mailto:thushan.v@azendtech.com">Email</a>
            </nav>
            <p className="signoff">© 2026 Thushan Vithana — Designed &amp; built in the dark.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
