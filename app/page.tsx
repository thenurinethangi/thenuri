"use client";

import NavigationModal from "@/components/NavigationModal";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

const roles = [
  "Software Engineer",
  "Undergraduate Student",
  "Web Developer",
  "Mobile Developer",
];

/* ─────────────────────────────────────────────
   GRAIN OVERLAY  (SVG noise rendered via CSS)
───────────────────────────────────────────── */
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
  );
}

/* ─────────────────────────────────────────────
   3-D BUBBLE CLUSTER
───────────────────────────────────────────── */
function BubbleCluster() {
  const groupRef = useRef<THREE.Group>(null);
  const [spheres, setSpheres] = useState<any[]>([]);

  useEffect(() => {
    const count = 55;
    const temp = Array.from({ length: count }, () => {
      const radius = Math.random() * 1.9;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      return {
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ] as [number, number, number],
        scale: Math.random() * 0.72 + 0.18,
        timeOffset: Math.random() * Math.PI * 2,
      };
    });

    const center = temp.reduce(
      (a, s) => ({ x: a.x + s.position[0], y: a.y + s.position[1], z: a.z + s.position[2] }),
      { x: 0, y: 0, z: 0 }
    );
    center.x /= count; center.y /= count; center.z /= count;

    setSpheres(
      temp.map((s) => ({
        ...s,
        position: [s.position[0] - center.x, s.position[1] - center.y, s.position[2] - center.z] as [number, number, number],
      }))
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18;
    const tx = state.pointer.x * 0.18;
    const ty = state.pointer.y * 0.18;
    groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.y += 0.0008;
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => <Sphere key={i} {...s} />)}
    </group>
  );
}

function Sphere({ position, scale, timeOffset }: { position: [number, number, number]; scale: number; timeOffset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const target = new THREE.Vector3(
      base.x + Math.cos(t + timeOffset) * 0.09,
      base.y + Math.sin(t + timeOffset) * 0.13,
      base.z + Math.sin(t * 0.5 + timeOffset) * 0.09,
    );

    const worldPos = new THREE.Vector3();
    meshRef.current.getWorldPosition(worldPos);

    const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
    const dir = vec.sub(state.camera.position).normalize();
    const dist = (worldPos.z - state.camera.position.z) / dir.z;
    const ptrWorld = state.camera.position.clone().add(dir.multiplyScalar(dist));
    const d = ptrWorld.distanceTo(worldPos);
    const repelR = 3.2;
    if (d < repelR) {
      const rd = worldPos.clone().sub(ptrWorld).normalize();
      if (meshRef.current.parent)
        rd.transformDirection(meshRef.current.parent.matrixWorld.clone().invert());
      target.add(rd.multiplyScalar((repelR - d) * 2.2));
    }

    meshRef.current.position.lerp(target, 0.13);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#B8CDD8"
        roughness={0.15}
        metalness={0.35}
        opacity={0.82}
        transparent
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   ROLE CYCLER  — DM Mono + animated underline
───────────────────────────────────────────── */
function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % roles.length);
        setVisible(true);
      }, 420);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
      {/* accent dash */}
      <span
        style={{
          display: "inline-block",
          width: "28px",
          height: "1px",
          background: "rgba(245,245,245,0.55)",
          flexShrink: 0,
        }}
      />
      <div style={{ position: "relative", overflow: "hidden" }}>
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
          transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'DM Mono', 'Courier New', monospace",
            fontWeight: 300,
            fontSize: "clamp(13px, 1.6vw, 18px)",
            letterSpacing: "0.18em",
            color: "rgba(226,232,240,0.85)",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {roles[idx]}
        </motion.p>
        {/* animated underline */}
        <motion.span
          key={`u-${idx}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{
            display: "block",
            height: "1px",
            background: "rgba(245,245,245,0.4)",
            transformOrigin: "left center",
            marginTop: "3px",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL CTA
───────────────────────────────────────────── */
function ScrollCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: "42px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(245,245,245,0.45)",
        }}
      >
        View Work
      </span>
      {/* animated chevron */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 6L8 11L13 6" stroke="rgba(245,245,245,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NAV — refined logo mark + hamburger
───────────────────────────────────────────── */
function Nav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "32px 44px",
      }}
    >
      {/* Logo mark */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="2.25" stroke="rgba(245,245,245,0.3)" strokeWidth="1.5" />
          <text
            x="50%"
            y="53%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="18"
            fontWeight="500"
            fill="rgba(245,245,245,0.9)"
            letterSpacing="0"
          >
            T
          </text>
        </svg>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,245,245,0.4)",
          }}
        >
          Portfolio
        </span>
      </div>

      {/* Hamburger */}
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            whileHover={{ scaleX: i === 0 ? 0.65 : 1.25 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "block",
              width: i === 0 ? "22px" : "14px",
              height: "1.5px",
              background: "rgba(245,245,245,0.75)",
              borderRadius: "2px",
              transformOrigin: "left center",
            }}
          />
        ))}
      </button>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
      `}</style>

      <main
        style={{
          position: "relative",
          height: "100svh",
          width: "100%",
          overflow: "hidden",
          background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
        }}
      >
        <GrainOverlay />

        <Nav onMenuOpen={() => setIsModalOpen(true)} />

        {/* Soft radial vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)",
          }}
        />

        {/* 3-D Canvas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[6, 6, 4]} intensity={1.4} />
            <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#a8c0d0" />
            <BubbleCluster />
          </Canvas>
        </div>

        {/* Hero text */}
        <div
          style={{
            pointerEvents: "none",
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(-16px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            {/* Pre-title */}
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(10px, 1vw, 12px)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.45)",
                margin: "0 0 18px 0",
              }}
            >
              — Full-Stack Developer
            </p>

            {/* Name */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(72px, 13vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#F5F5F5",
                margin: 0,
                textShadow: "0 2px 40px rgba(40,58,70,0.18)",
              }}
            >
              Thenuri
            </h1>

            {/* Role cycler */}
            <RoleCycler />
          </motion.div>
        </div>

        {/* Scroll CTA */}
        <ScrollCTA />

        {/* Navigation Modal */}
        <AnimatePresence>
          {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
      </main>
    </>
  );
}