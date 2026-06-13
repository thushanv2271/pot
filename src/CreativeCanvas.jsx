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
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return

    timeRef.current += delta

    // Smooth, frame-rate independent damping factor.
    const damp = 1 - Math.pow(0.0008, delta)

    // --- Macro timeline (scroll-bound) + mouse parallax (real-time) ---
    const targetRotX = macro.rotX + pointer.y * 0.25
    const targetRotY = macro.rotY + pointer.x * 0.35
    const targetPosX = macro.posX + pointer.x * 0.15
    const targetPosY = macro.posY - pointer.y * 0.15

    group.current.rotation.x += (targetRotX - group.current.rotation.x) * damp
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * damp
    group.current.position.x += (targetPosX - group.current.position.x) * damp
    group.current.position.y += (targetPosY - group.current.position.y) * damp

    // Slow, fluid drift — liquid feels heavier than chrome.
    group.current.rotation.z += delta * 0.018

    // Gentle bobbing to sell the liquid weight.
    group.current.position.y += Math.sin(timeRef.current * 0.6) * 0.002

    const s = group.current.scale.x + (macro.scale - group.current.scale.x) * damp
    group.current.scale.setScalar(s)

    camera.position.z += (macro.camZ - camera.position.z) * damp
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <mesh castShadow>
        <torusKnotGeometry args={[1, 0.32, 200, 32]} />
        <meshPhysicalMaterial
          color="#a8d8ff"
          roughness={0}
          metalness={0}
          transmission={0.97}
          ior={1.45}
          thickness={2.0}
          attenuationColor="#004a99"
          attenuationDistance={0.6}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 500]}
          envMapIntensity={2.5}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Bright white key from upper-left for sharp caustic-like highlights. */}
      <directionalLight position={[-6, 6, 4]} intensity={4} color="#e8f4ff" />
      {/* Deep teal rim to catch the transmission edges. */}
      <directionalLight position={[6, -5, -3]} intensity={2} color="#00aaff" />
      <ambientLight intensity={0.3} />

      <ChromeKnot />

      <Environment resolution={512} frames={1}>
        {/* Bright sky card — gives the liquid something bright to refract. */}
        <Lightformer
          intensity={5}
          color="#cceeff"
          position={[-5, 5, 5]}
          scale={[6, 6, 1]}
        />
        {/* Deep blue fill. */}
        <Lightformer
          intensity={3}
          color="#0066cc"
          position={[6, -4, -4]}
          scale={[5, 5, 1]}
        />
        {/* Soft purple back-light adds depth to the refraction. */}
        <Lightformer
          intensity={1.5}
          color="#3300aa"
          position={[0, 0, -6]}
          scale={[12, 12, 1]}
        />
        {/* Dark floor card keeps the underside moody. */}
        <Lightformer
          intensity={0.5}
          color="#020a14"
          position={[0, -6, 2]}
          scale={[10, 4, 1]}
        />
      </Environment>
    </>
  )
}

export default function CreativeCanvas() {
  const fovRef = useRef()

  useEffect(() => {
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useEffect(() => {
    Object.assign(macro, { rotX: 0, rotY: 0, scale: 1, posX: 0, posY: 0, camZ: 5 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.scroll-track',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      tl.to(macro, {
        rotX: Math.PI * 1.4,
        rotY: Math.PI * 1.8,
        scale: 1.7,
      })

      tl.to(macro, {
        camZ: 2.4,
        rotY: '+=2.4',
        scale: 1.5,
      })

      tl.to(macro, {
        posX: -3.4,
        camZ: 3.4,
        rotY: '+=3.2',
        scale: 1.25,
      })

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
