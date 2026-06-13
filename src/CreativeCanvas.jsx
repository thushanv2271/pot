import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
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

function ChromeKnot() {
  const group = useRef()
  const { camera } = useThree()

  useFrame((_, delta) => {
    if (!group.current) return

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
        <torusKnotGeometry args={[1, 0.3, 120, 16]} />
        <meshPhysicalMaterial
          color="#15151c"
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

function Scene() {
  return (
    <>
      {/* Sharp white key light from the top-left. */}
      <directionalLight position={[-6, 6, 4]} intensity={3.2} color="#ffffff" />
      {/* Faint deep neon-blue rim light from the bottom-right to catch edges. */}
      <directionalLight position={[6, -5, -3]} intensity={1.6} color="#1f4bff" />
      <ambientLight intensity={0.15} />

      <ChromeKnot />

      {/*
        A self-contained studio environment built from light cards — gives the
        physical material something to reflect without fetching an external HDR,
        so reflections look premium even fully offline.
      */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          intensity={3}
          color="#ffffff"
          position={[-5, 5, 5]}
          scale={[4, 4, 1]}
        />
        <Lightformer
          intensity={2}
          color="#2a4cff"
          position={[6, -4, -4]}
          scale={[5, 5, 1]}
        />
        <Lightformer
          intensity={0.7}
          color="#7a00ff"
          position={[0, 0, -6]}
          scale={[12, 12, 1]}
        />
        <Lightformer
          intensity={1}
          color="#0a0a0a"
          position={[0, -6, 2]}
          scale={[10, 4, 1]}
        />
      </Environment>
    </>
  )
}

export default function CreativeCanvas() {
  const fovRef = useRef()

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
        gl.setClearColor('#0a0a0a', 1)
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
      <Scene />
    </Canvas>
  )
}
