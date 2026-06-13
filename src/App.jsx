import React, { Suspense } from 'react'
import CreativeCanvas from './CreativeCanvas.jsx'

/**
 * App layout follows the Apple-style scroll narrative:
 *  - A FIXED .canvas-viewport (z-index 1) holds the persistent 3D scene.
 *  - A natively scrolling .scroll-track (z-index 2) layers 4 full-height
 *    text sections on top. The scrollbar drives the GSAP timeline inside
 *    CreativeCanvas, so the chrome object and the copy move as one story.
 */
export default function App() {
  return (
    <div className="app">
      <header className="top-bar">
        <span className="brand">TV</span>
        <span className="brand-meta">Creative Technologist · 2026</span>
      </header>

      {/* Layer 1 — the fixed, ever-present 3D stage. */}
      <div className="canvas-viewport">
        <Suspense fallback={null}>
          <CreativeCanvas />
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
          <div className="section-inner align-right">
            <p className="eyebrow">03 — Selected Work</p>
            <ul className="project-list">
              <li>
                <a href="https://github.com/thushanvithana/MERN-STACK" target="_blank" rel="noreferrer">
                  <span className="proj-name">MERN Stack Platform</span>
                  <span className="proj-meta">Full-stack · JavaScript</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/thushanvithana/Hotel-Management-System" target="_blank" rel="noreferrer">
                  <span className="proj-name">Hotel Management System</span>
                  <span className="proj-meta">C++ · Design Patterns</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/thushanvithana/Build-a-Virtual-World" target="_blank" rel="noreferrer">
                  <span className="proj-name">Build a Virtual World</span>
                  <span className="proj-meta">A-Frame · WebXR</span>
                </a>
              </li>
            </ul>

            <nav className="links">
              <a href="https://github.com/thushanvithana" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://twitter.com/VithanaThushan" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.youtube.com/@ThushanVithana" target="_blank" rel="noreferrer">YouTube</a>
              <a href="mailto:thushan.v@azendtech.com">Email</a>
            </nav>
            <p className="signoff">© 2026 Thushan Vithana — Designed & built in the dark.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
