import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A single mutable object that the GSAP scroll timeline writes to and the
 * render loop reads from. Decoupling "macro" scroll animation (GSAP) from the
 * per-frame render (useFrame) keeps both buttery smooth and lets us layer the
 * real-time mouse parallax on top without the two systems fighting.
 */
const macro = {
  rotX: 0,
  rotY: 0,
  scale: 1,
  posX: 0,
  posY: 0,
  camZ: 5,
}

// Live, normalised pointer position (-1 .. 1). Read inside useFrame.
const pointer = { x: 0, y: 0 }

// Per-theme scene palette. The canvas itself stays transparent so the themed
// CSS background shows through; only the object + lights change.
const THEME_CONFIG = {
  midnight: {
    objColor: '#15151c',
    rim: '#1f4bff', // deep neon blue
    ambient: 0.15,
    env: ['#ffffff', '#2a4cff', '#7a00ff', '#0a0a0a'],
  },
  bone: {
    objColor: '#1c1814',
    rim: '#ff9d3c', // warm bronze
    ambient: 0.4,
    env: ['#fff6e6', '#ffb04a', '#ff6a3c', '#ece7dd'],
  },
}

function ChromeKnot({ palette }) {
  const group = useRef()
  const material = useRef()
  const { camera } = useThree()

  useFrame((_, delta) => {
    if (!group.current) return

    // --- Liquid surface ---------------------------------------------------
    // The cursor's distance from centre swells the flow, so the chrome ripples
    // harder as you move — like disturbing the surface of liquid metal.
    if (material.current) {
      const stir = Math.min(1, Math.hypot(pointer.x, pointer.y))
      const targetDistort = 0.32 + stir * 0.18
      material.current.distort +=
        (targetDistort - material.current.distort) * (1 - Math.pow(0.02, delta))
    }

    // Smooth, frame-rate independent damping factor.
    const damp = 1 - Math.pow(0.0008, delta)

    // --- Macro timeline (scroll-bound) + mouse parallax (real-time) ---
    // The cursor adds a gentle lean on top of the scrubbed rotation so the
    // scene still feels alive when the user stops scrolling.
    const targetRotX = macro.rotX + pointer.y * 0.25
    const targetRotY = macro.rotY + pointer.x * 0.35
    const targetPosX = macro.posX + pointer.x * 0.15
    const targetPosY = macro.posY - pointer.y * 0.15

    group.current.rotation.x += (targetRotX - group.current.rotation.x) * damp
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * damp
    group.current.position.x += (targetPosX - group.current.position.x) * damp
    group.current.position.y += (targetPosY - group.current.position.y) * damp

    // A whisper of constant rotation keeps the chrome catching light at rest.
    group.current.rotation.z += delta * 0.04

    const s = group.current.scale.x + (macro.scale - group.current.scale.x) * damp
    group.current.scale.setScalar(s)

    // Camera glides toward the scroll-driven depth target.
    camera.position.z += (macro.camZ - camera.position.z) * damp
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <mesh castShadow>
        {/* Heavily tessellated so the liquid displacement reads as smooth flow. */}
        <torusKnotGeometry args={[1, 0.3, 380, 48]} />
        {/* MeshDistortMaterial extends MeshPhysicalMaterial: it keeps the chrome
            PBR + iridescence while adding animated noise-based vertex flow. */}
        <MeshDistortMaterial
          ref={material}
          color={palette.objColor}
          distort={0.32}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          iridescence={1.0}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[120, 900]}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

function Scene({ palette }) {
  const [c0, c1, c2, c3] = palette.env
  return (
    <>
      {/* Sharp white key light from the top-left. */}
      <directionalLight position={[-6, 6, 4]} intensity={3.2} color="#ffffff" />
      {/* Faint rim light from the bottom-right to catch the edges (themed). */}
      <directionalLight position={[6, -5, -3]} intensity={1.6} color={palette.rim} />
      <ambientLight intensity={palette.ambient} />

      <ChromeKnot palette={palette} />

      {/*
        A self-contained studio environment built from light cards — gives the
        physical material something to reflect without fetching an external HDR,
        so reflections look premium even fully offline. Re-keyed per theme so
        the reflections recolour when the palette changes.
      */}
      <Environment key={c0} resolution={256} frames={1}>
        <Lightformer intensity={3} color={c0} position={[-5, 5, 5]} scale={[4, 4, 1]} />
        <Lightformer intensity={2} color={c1} position={[6, -4, -4]} scale={[5, 5, 1]} />
        <Lightformer intensity={0.7} color={c2} position={[0, 0, -6]} scale={[12, 12, 1]} />
        <Lightformer intensity={1} color={c3} position={[0, -6, 2]} scale={[10, 4, 1]} />
      </Environment>
    </>
  )
}

export default function CreativeCanvas({ theme = 'bone' }) {
  const fovRef = useRef()
  const palette = THEME_CONFIG[theme] || THEME_CONFIG.bone

  // --- Pointer parallax ----------------------------------------------------
  useEffect(() => {
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  // --- Scroll-bound GSAP timeline -----------------------------------------
  useEffect(() => {
    // Reset shared state on (re)mount so StrictMode double-invocation is safe.
    Object.assign(macro, { rotX: 0, rotY: 0, scale: 1, posX: 0, posY: 0, camZ: 5 })

    const ctx = gsap.context(() => {
      // scrub: 1.5 gives the whole timeline a heavy, fluid deceleration —
      // animations chase the scrollbar with luxurious momentum.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.scroll-track',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      // Section 1 -> 2: dramatic X/Y tumble + smooth scale expansion.
      tl.to(macro, {
        rotX: Math.PI * 1.4,
        rotY: Math.PI * 1.8,
        scale: 1.7,
      })

      // Section 2 -> 3: heavy camera push-in on the Z-axis toward a detail,
      // while the knot keeps slowly turning.
      tl.to(macro, {
        camZ: 2.4,
        rotY: '+=2.4',
        scale: 1.5,
      })

      // Section 3 -> 4: the object glides off to the far left and pulls back,
      // spinning subtly, opening clean negative space on the right.
      tl.to(macro, {
        posX: -3.4,
        camZ: 3.4,
        rotY: '+=3.2',
        scale: 1.25,
      })

      // 2D typography: slide each section's copy in as it enters the viewport,
      // shifting the active block from left to right down the page.
      gsap.utils.toArray('.section-inner').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el.closest('.section'),
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0.15,
        })
      })
    })

    // Recompute trigger positions once everything (incl. fonts) settles.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <Canvas
      className="creative-canvas"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 38, near: 0.1, far: 100 }}
      onCreated={({ gl, camera }) => {
        // Transparent clear so the themed CSS background shows through.
        gl.setClearColor('#000000', 0)
        fovRef.current = camera
        // R3F resizes the renderer automatically with the canvas element, but
        // we keep the camera aspect locked to the viewport explicitly so the
        // 3D framing never distorts on window resize.
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', onResize)
        onResize()
      }}
    >
      <Scene palette={palette} />
    </Canvas>
  )
}
