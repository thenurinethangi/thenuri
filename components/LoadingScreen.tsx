"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as THREE from "three"

const GATHER_END = 2.15
const HOLD_END = 3.45
const EXIT_END = 4.8
const BUBBLE_COUNT = 34

function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3)
}

function GrainOverlay() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 5,
                pointerEvents: "none",
                opacity: 0.045,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "180px 180px",
            }}
        />
    )
}

type BubbleData = {
    start: [number, number, number]
    target: [number, number, number]
    scale: number
    timeOffset: number
}

function LoaderBubble({ bubble }: { bubble: BubbleData }) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const start = useMemo(() => new THREE.Vector3(...bubble.start), [bubble.start])
    const target = useMemo(() => new THREE.Vector3(...bubble.target), [bubble.target])
    const outward = useMemo(() => target.clone().normalize(), [target])

    useFrame((state) => {
        if (!meshRef.current) return

        const elapsed = state.clock.elapsedTime
        const mat = meshRef.current.material as THREE.MeshStandardMaterial
        const next = new THREE.Vector3()

        if (elapsed < GATHER_END) {
            const t = easeInOut(Math.min(elapsed / GATHER_END, 1))
            next.copy(start).lerp(target, t)
            meshRef.current.scale.setScalar(bubble.scale * (0.35 + t * 0.65))
            mat.opacity = 0.16 + t * 0.66
        } else if (elapsed < HOLD_END) {
            const drift = elapsed - GATHER_END
            next.set(
                target.x + Math.cos(drift * 1.1 + bubble.timeOffset) * 0.08,
                target.y + Math.sin(drift * 1.5 + bubble.timeOffset) * 0.12,
                target.z + Math.sin(drift * 0.9 + bubble.timeOffset) * 0.08,
            )
            meshRef.current.scale.setScalar(bubble.scale)
            mat.opacity = 0.82
        } else {
            const t = easeOut(Math.min((elapsed - HOLD_END) / (EXIT_END - HOLD_END), 1))
            next.copy(target).multiplyScalar(1 + t * 3.5).add(outward.clone().multiplyScalar(t * 5.2))
            meshRef.current.scale.setScalar(bubble.scale * (1 - t * 0.58))
            mat.opacity = 0.82 * (1 - t * 0.9)
        }

        meshRef.current.position.lerp(next, 0.16)
    })

    return (
        <mesh ref={meshRef} position={bubble.start} scale={bubble.scale * 0.35}>
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial
                color="#B8CDD8"
                roughness={0.15}
                metalness={0.35}
                opacity={0.18}
                transparent
                envMapIntensity={1.15}
            />
        </mesh>
    )
}

function LoaderBubbleCluster({ onExplodeDone }: { onExplodeDone: () => void }) {
    const groupRef = useRef<THREE.Group>(null)
    const fired = useRef(false)

    const bubbles = useMemo(() => {
        const temp = Array.from({ length: BUBBLE_COUNT }, () => {
            const radius = Math.random() * 1.75
            const theta = Math.random() * 2 * Math.PI
            const phi = Math.acos(2 * Math.random() - 1)

            return {
                start: [
                    (Math.random() - 0.5) * 14,
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 12,
                ] as [number, number, number],
                target: [
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi),
                ] as [number, number, number],
                scale: Math.random() * 0.7 + 0.18,
                timeOffset: Math.random() * Math.PI * 2,
            }
        })

        const center = temp.reduce(
            (acc, bubble) => ({
                x: acc.x + bubble.target[0],
                y: acc.y + bubble.target[1],
                z: acc.z + bubble.target[2],
            }),
            { x: 0, y: 0, z: 0 },
        )

        center.x /= BUBBLE_COUNT
        center.y /= BUBBLE_COUNT
        center.z /= BUBBLE_COUNT

        return temp.map((bubble) => ({
            ...bubble,
            target: [
                bubble.target[0] - center.x,
                bubble.target[1] - center.y,
                bubble.target[2] - center.z,
            ] as [number, number, number],
        }))
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return

        const elapsed = state.clock.elapsedTime
        const pointerX = state.pointer.x * 0.12
        const pointerY = state.pointer.y * 0.1

        groupRef.current.rotation.x += (pointerY - groupRef.current.rotation.x) * 0.04

        if (elapsed < GATHER_END) {
            groupRef.current.rotation.y += 0.005
        } else if (elapsed < HOLD_END) {
            groupRef.current.rotation.y += 0.009
            groupRef.current.position.y = Math.sin(elapsed * 0.7) * 0.12
        } else {
            groupRef.current.rotation.y += 0.016
            groupRef.current.position.y *= 0.9
        }

        groupRef.current.rotation.y += (pointerX - groupRef.current.rotation.y) * 0.025

        if (elapsed > 4.1 && !fired.current) {
            fired.current = true
            onExplodeDone()
        }
    })

    return <group ref={groupRef}>{bubbles.map((bubble, index) => <LoaderBubble key={index} bubble={bubble} />)}</group>
}

function LoaderMark() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
                pointerEvents: "none",
                userSelect: "none",
            }}
        >
            <p
                style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color: "rgba(245,245,245,0.4)",
                    margin: "0 0 16px",
                }}
            >
                Portfolio
            </p>

            <h1
                style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(48px, 7vw, 84px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                    color: "rgba(245,245,245,0.92)",
                    margin: "0 0 16px",
                }}
            >
                Thenuri
            </h1>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    height: "1px",
                    background: "rgba(245,245,245,0.28)",
                    width: "72px",
                    margin: "0 auto 16px",
                    transformOrigin: "center",
                }}
            />

            <p
                style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(245,245,245,0.38)",
                    margin: 0,
                }}
            >
                Software Engineer
            </p>
        </motion.div>
    )
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [showText, setShowText] = useState(false)
    const [textLeave, setTextLeave] = useState(false)

    useEffect(() => {
        const show = setTimeout(() => setShowText(true), 2150)
        const leave = setTimeout(() => setTextLeave(true), 3325)
        return () => {
            clearTimeout(show)
            clearTimeout(leave)
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@300;400&display=swap');
            `}</style>

            <GrainOverlay />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)",
                }}
            />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    bottom: "-180px",
                    left: "-160px",
                    width: "520px",
                    height: "520px",
                    background: "rgba(111,162,190,0.1)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: "-120px",
                    right: "-120px",
                    width: "420px",
                    height: "420px",
                    background: "rgba(111,162,190,0.08)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "560px",
                    height: "560px",
                    background: "radial-gradient(circle, rgba(111,162,190,0.12) 0%, transparent 65%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "absolute", inset: 0 }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} gl={{ antialias: true }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[6, 6, 4]} intensity={1.35} />
                    <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#a8c0d0" />
                    <LoaderBubbleCluster onExplodeDone={onComplete} />
                </Canvas>
            </div>

            <AnimatePresence>{showText && !textLeave && <LoaderMark />}</AnimatePresence>
        </motion.div>
    )
}
