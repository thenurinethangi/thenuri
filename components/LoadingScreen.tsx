"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"

const COUNT = 850

function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3)
}

/* ── CORE ORB: subtle pulsing sphere at centre ── */
function CoreOrb() {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame((state) => {
        if (!ref.current) return
        const pulse = Math.sin(state.clock.elapsedTime * 2.4) * 0.5 + 0.5
        const mat = ref.current.material as THREE.MeshStandardMaterial
        mat.opacity = 0.04 + pulse * 0.09
        ref.current.scale.setScalar(0.9 + pulse * 0.1)
    })
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial
                color="#DDE6EB"
                transparent
                opacity={0.06}
                roughness={0.12}
                metalness={0.45}
            />
        </mesh>
    )
}

/* ── PARTICLE ORB: gather → hold → explode ── */
function ParticleOrb({ onExplodeDone }: { onExplodeDone: () => void }) {
    const pointsRef = useRef<THREE.Points>(null!)
    const startTime = useRef<number | null>(null)
    const fired = useRef(false)

    const GATHER = 2.2
    const HOLD = 3.6
    const EXPLODE = 4.9

    const { startPos, targetPos, currentPos } = useMemo(() => {
        const start = new Float32Array(COUNT * 3)
        const target = new Float32Array(COUNT * 3)

        for (let i = 0; i < COUNT; i++) {
            // Scattered start positions
            start[i * 3]     = (Math.random() - 0.5) * 22
            start[i * 3 + 1] = (Math.random() - 0.5) * 22
            start[i * 3 + 2] = (Math.random() - 0.5) * 22

            // Sphere surface target
            const theta = Math.random() * Math.PI * 2
            const phi   = Math.acos(2 * Math.random() - 1)
            const r     = 1.9 + Math.random() * 0.35
            target[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
            target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            target[i * 3 + 2] = r * Math.cos(phi)
        }

        return { startPos: start, targetPos: target, currentPos: start.slice() as Float32Array }
    }, [])

    useFrame((state) => {
        if (!pointsRef.current) return
        if (startTime.current === null) startTime.current = state.clock.elapsedTime
        const elapsed = state.clock.elapsedTime - startTime.current

        const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
        const pos  = attr.array as Float32Array

        if (elapsed < GATHER) {
            const t = easeInOut(Math.min(elapsed / GATHER, 1))
            for (let i = 0; i < COUNT * 3; i++) {
                pos[i] = startPos[i] + (targetPos[i] - startPos[i]) * t
            }
            pointsRef.current.rotation.y += 0.0035
            pointsRef.current.rotation.x += 0.001
        } else if (elapsed < HOLD) {
            // Hold: just spin
            pointsRef.current.rotation.y += 0.007
            pointsRef.current.rotation.x += 0.002
        } else if (elapsed < EXPLODE) {
            const t = easeOut(Math.min((elapsed - HOLD) / (EXPLODE - HOLD), 1))
            const scale = 1 + t * 20
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3]     = targetPos[i * 3]     * scale
                pos[i * 3 + 1] = targetPos[i * 3 + 1] * scale
                pos[i * 3 + 2] = targetPos[i * 3 + 2] * scale
            }
            pointsRef.current.rotation.y += 0.014
            if (t > 0.78 && !fired.current) {
                fired.current = true
                onExplodeDone()
            }
        } else if (!fired.current) {
            fired.current = true
            onExplodeDone()
        }

        attr.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[currentPos, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.026}
                color="#DDE6EB"
                transparent
                opacity={0.78}
                sizeAttenuation
            />
        </points>
    )
}

/* ── RING: wide orbit ring for depth ── */
function OrbitRing() {
    const ref = useRef<THREE.Points>(null!)
    const RING = 120

    const pos = useMemo(() => {
        const arr = new Float32Array(RING * 3)
        for (let i = 0; i < RING; i++) {
            const angle = (i / RING) * Math.PI * 2
            const r = 2.9 + Math.random() * 0.25
            arr[i * 3]     = r * Math.cos(angle)
            arr[i * 3 + 1] = (Math.random() - 0.5) * 0.22
            arr[i * 3 + 2] = r * Math.sin(angle)
        }
        return arr
    }, [])

    useFrame((_, delta) => {
        if (!ref.current) return
        ref.current.rotation.y += delta * 0.15
        ref.current.rotation.x += delta * 0.04
    })

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[pos, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.018} color="#B8CDD8" transparent opacity={0.28} sizeAttenuation />
        </points>
    )
}

/* ── LOADING SCREEN ── */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [showText, setShowText]   = useState(false)
    const [textLeave, setTextLeave] = useState(false)

    // Text appears during the "hold" phase
    useEffect(() => {
        const show  = setTimeout(() => setShowText(true),  2500)
        const leave = setTimeout(() => setTextLeave(true), 3400) // fade out just before explode
        return () => { clearTimeout(show); clearTimeout(leave) }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@300;400&display=swap');
            `}</style>

            <div aria-hidden style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)",
            }} />

            <div aria-hidden style={{
                position: "absolute",
                bottom: "-180px",
                left: "-160px",
                width: "520px",
                height: "520px",
                background: "rgba(111,162,190,0.1)",
                borderRadius: "50%",
                filter: "blur(80px)",
                pointerEvents: "none",
            }} />

            <div aria-hidden style={{
                position: "absolute",
                top: "-120px",
                right: "-120px",
                width: "420px",
                height: "420px",
                background: "rgba(111,162,190,0.08)",
                borderRadius: "50%",
                filter: "blur(80px)",
                pointerEvents: "none",
            }} />

            {/* Subtle ambient glow behind sphere */}
            <div aria-hidden style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "560px", height: "560px",
                background: "radial-gradient(circle, rgba(111,162,190,0.12) 0%, transparent 65%)",
                pointerEvents: "none",
            }} />

            {/* Three.js */}
            <div style={{ position: "absolute", inset: 0 }}>
                <Canvas camera={{ position: [0, 0, 7.5], fov: 52 }} gl={{ antialias: true }}>
                    <ambientLight intensity={0.62} />
                    <directionalLight position={[6, 6, 4]} intensity={1.1} />
                    <directionalLight position={[-4, -2, -4]} intensity={0.28} color="#a8c0d0" />
                    <CoreOrb />
                    <OrbitRing />
                    <ParticleOrb onExplodeDone={onComplete} />
                </Canvas>
            </div>

            {/* Text overlay */}
            <AnimatePresence>
                {showText && !textLeave && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "relative", zIndex: 10,
                            textAlign: "center", pointerEvents: "none", userSelect: "none",
                        }}
                    >
                        <p style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "9px", letterSpacing: "0.42em",
                            textTransform: "uppercase",
                            color: "rgba(245,245,245,0.38)",
                            margin: "0 0 16px",
                        }}>
                            Portfolio
                        </p>

                        <h1 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 300, fontStyle: "italic",
                            fontSize: "clamp(48px, 7vw, 84px)",
                            letterSpacing: "-0.01em", lineHeight: 1,
                            color: "rgba(245,245,245,0.9)",
                            margin: "0 0 16px",
                        }}>
                            Thenuri
                        </h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                height: "1px",
                                background: "rgba(245,245,245,0.26)",
                                width: "72px",
                                margin: "0 auto 16px",
                                transformOrigin: "center",
                            }}
                        />

                        <p style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "9px", letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "rgba(245,245,245,0.36)",
                            margin: 0,
                        }}>
                            Software Engineer
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
