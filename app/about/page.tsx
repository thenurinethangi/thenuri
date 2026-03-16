"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function GrainOverlay() {
    return (
        <div aria-hidden style={{
            position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0.045,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "180px 180px",
        }} />
    )
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [display, setDisplay] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.5 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        let start = 0
        const steps = 40
        const inc = value / steps
        const timer = setInterval(() => {
            start += inc
            if (start >= value) { setDisplay(value); clearInterval(timer) }
            else setDisplay(Math.floor(start))
        }, 28)
        return () => clearInterval(timer)
    }, [inView, value])

    return <span ref={ref}>{display}{suffix}</span>
}

const pillars = [
    {
        index: "01",
        title: "Full-Stack Engineering",
        body: "React, Next.js, Node.js, Spring Boot, and the MERN stack — building end-to-end platforms that are secure, cloud-ready, and built for real-world scale.",
        accent: "rgba(171,205,219,0.9)",
    },
    {
        index: "02",
        title: "Mobile & Cross-Platform",
        body: "Building mobile applications for both native-specific environments and cross-platform ecosystems, with reliable performance, maintainable architecture, and production readiness.",
        accent: "rgba(186,213,186,0.9)",
    },
    {
        index: "03",
        title: "AI-Integrated Platforms",
        body: "Building AI-integrated platforms to improve decision-making, automate workflows, and deliver smarter user experiences across digital products.",
        accent: "rgba(209,190,219,0.9)",
    },
]

const services = [
    {
        index: "01",
        title: "Web & Mobile Solution Delivery",
        body: "Delivering modern web and mobile platforms aligned with real business objectives and personal operational requirements.",
        accent: "rgba(171,205,219,0.9)",
    },
    {
        index: "02",
        title: "Existing Software Upgrades",
        body: "Enhancing and modernizing existing software products, including platforms built by me or inherited from other teams.",
        accent: "rgba(186,213,186,0.9)",
    },
    {
        index: "03",
        title: "Software Consulting",
        body: "Providing software consulting to define problem scope, recommend the right technical strategy, and guide practical execution.",
        accent: "rgba(209,190,219,0.9)",
    },
]

const stats = [
    { value: 2, suffix: "+", label: "Years Coding" },
    { value: 8, suffix: "+", label: "Projects Shipped" },
    { value: 20, suffix: "+", label: "Tech Stacks" },
    { value: 100, suffix: "%", label: "Commitment" },
]

export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cvHovered, setCvHovered] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .about-scroll::-webkit-scrollbar { display: none; }
                .about-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                @media (max-width: 720px) {
                    .about-hero { grid-template-columns: 1fr !important; gap: 48px !important; }
                    .about-pillars { grid-template-columns: 1fr !important; }
                    .about-services { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <section style={{
                position: "fixed", inset: 0,
                background: "linear-gradient(160deg, #3A5262 0%, #4A6878 18%, #5A7A8C 35%, #6A8FA0 52%, #7EA3B2 66%, #96B4BF 79%, #B2C6CE 90%, #C8D5DA 100%)",
                color: "white", overflow: "hidden",
            }}>
                <GrainOverlay />

                <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(20,38,48,0.28) 100%)" }} />
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", left: "-160px", width: "520px", height: "520px", background: "rgba(111,162,190,0.1)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", right: "-120px", width: "420px", height: "420px", background: "rgba(111,162,190,0.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

                {/* NAV */}
                <motion.nav
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 44px", pointerEvents: "none" }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="2.25" stroke="rgba(245,245,245,0.3)" strokeWidth="1.5" />
                            <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="500" fill="rgba(245,245,245,0.9)">T</text>
                        </svg>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)" }}>Portfolio</span>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} aria-label="Open menu"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column" as const, gap: "5px", pointerEvents: "auto" }}>
                        {[0, 1].map((i) => (
                            <motion.span key={i} whileHover={{ scaleX: i === 0 ? 0.65 : 1.25 }} transition={{ duration: 0.25 }}
                                style={{ display: "block", width: i === 0 ? "22px" : "14px", height: "1.5px", background: "rgba(245,245,245,0.75)", borderRadius: "2px", transformOrigin: "left center" }} />
                        ))}
                    </button>
                </motion.nav>

                {/* SCROLL CONTENT */}
                <div className="about-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, padding: "130px 44px 100px" }}>
                    <div style={{ maxWidth: "920px", margin: "0 auto" }}>

                        {/* ── PAGE LABEL ── */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 20px 0" }}
                        >
                            — About
                        </motion.p>

                        {/* ── HERO SPLIT ── */}
                        <div className="about-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginBottom: "88px" }}>

                            {/* Left */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: "flex", flexDirection: "column" as const, gap: "32px" }}
                            >
                                <h1 style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 300, fontStyle: "italic",
                                    fontSize: "clamp(60px, 8vw, 96px)",
                                    lineHeight: 0.9, letterSpacing: "-0.02em",
                                    color: "#F5F5F5", margin: 0,
                                    textShadow: "0 2px 40px rgba(20,38,48,0.18)",
                                }}>
                                    Thenuri
                                </h1>

                                <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)" }} />

                                {/* Role tag */}
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: "10px",
                                    padding: "8px 16px",
                                    border: "1px solid rgba(245,245,245,0.14)",
                                    borderRadius: "6px",
                                    background: "rgba(255,255,255,0.05)",
                                    width: "fit-content",
                                }}>
                                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(171,205,219,0.9)", flexShrink: 0 }} />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.55)" }}>
                                        Software Engineering Undergraduate | Professional Developer
                                    </span>
                                </div>

                                {/* CV button */}
                                <motion.a
                                    href="/Thenuri_Nethangi_CV.pdf"
                                    download
                                    onHoverStart={() => setCvHovered(true)}
                                    onHoverEnd={() => setCvHovered(false)}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "12px",
                                        fontFamily: "'DM Mono', monospace", fontSize: "10px",
                                        letterSpacing: "0.24em", textTransform: "uppercase" as const,
                                        color: cvHovered ? "#F5F5F5" : "rgba(245,245,245,0.7)",
                                        textDecoration: "none",
                                        padding: "14px 28px",
                                        border: `1px solid ${cvHovered ? "rgba(171,205,219,0.55)" : "rgba(245,245,245,0.16)"}`,
                                        borderRadius: "8px",
                                        background: cvHovered ? "rgba(171,205,219,0.14)" : "rgba(255,255,255,0.05)",
                                        transition: "all 0.28s",
                                        cursor: "pointer",
                                        width: "fit-content",
                                    }}
                                >
                                    <motion.svg
                                        animate={{ y: cvHovered ? 2 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        width="13" height="13" viewBox="0 0 14 14" fill="none"
                                    >
                                        <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                    Download CV
                                </motion.a>
                            </motion.div>

                            {/* Right — bio */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: "flex", flexDirection: "column" as const, gap: "24px", paddingTop: "12px" }}
                            >
                                <p style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 300, fontStyle: "italic",
                                    fontSize: "clamp(19px, 2.2vw, 24px)",
                                    lineHeight: 1.6, letterSpacing: "0.01em",
                                    color: "rgba(245,245,245,0.85)",
                                    margin: 0,
                                }}>
                                    Engineering production-grade web, mobile, and desktop platforms with scalable architectures, high-performance interfaces, and intelligent AI/IoT integrations.
                                </p>

                                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

                                <p style={{
                                    fontFamily: "'DM Mono', monospace", fontWeight: 300,
                                    fontSize: "11px", lineHeight: 2,
                                    letterSpacing: "0.04em",
                                    color: "rgba(245,245,245,0.48)",
                                    margin: 0,
                                }}>
                                    Experienced across modern full-stack ecosystems including React, Next.js, React Native, Spring Boot, Node.js, and MERN — delivering secure, cloud-ready platforms built for reliability, extensibility, and real-world scale.
                                </p>
                            </motion.div>
                        </div>

                        {/* ── STATS STRIP ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                            style={{ marginBottom: "80px" }}
                        >
                            <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                                {stats.map((s, i) => (
                                    <motion.div
                                        key={s.label}
                                        className="stat-card"
                                        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                                    >
                                        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 1, color: "rgba(171,205,219,0.85)", marginBottom: "8px" }}>
                                            <AnimatedCounter value={s.value} suffix={s.suffix} />
                                        </div>
                                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.35)" }}>
                                            {s.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── WHAT I BUILD ── */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ marginTop: "84px", marginBottom: "42px" }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                    Services
                                </span>
                                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                            </div>

                            {/* <p style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "10px",
                                letterSpacing: "0.08em",
                                lineHeight: 1.9,
                                color: "rgba(245,245,245,0.5)",
                                margin: "0 0 20px 0",
                                textTransform: "uppercase" as const,
                            }}>
                                Delivered across web, mobile, and AI-integrated workflows.
                            </p> */}

                            <div className="about-services" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                                {services.map((service, i) => (
                                    <ServicePanel key={service.index} item={service} delay={i * 0.1} />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Section label */}
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px" }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                    What I build
                                </span>
                                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                            </div>

                            {/* Pillars */}
                            <div className="about-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                                {pillars.map((p, i) => (
                                    <PillarPanel key={p.index} item={p} delay={i * 0.1} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Footer rule */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ marginTop: "88px", display: "flex", alignItems: "center", gap: "20px" }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.22)" }}>
                                Always Evolving
                            </span>
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                        </motion.div>

                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </>
    )
}

/* ─────────────────────────────────────────────
   PILLAR PANEL — flush grid cell, no card border
───────────────────────────────────────────── */
function PillarPanel({ item, delay }: { item: typeof pillars[0]; delay: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "40px 36px",
                background: hovered ? "#1C2B33" : "rgba(255,255,255,0.04)",
                position: "relative", overflow: "hidden",
                transition: "background 0.4s",
                cursor: "default",
            }}
        >
            {/* Top highlight on hover */}
            {hovered && (
                <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${item.accent.replace("0.9", "0.3")}, transparent)`, pointerEvents: "none" }} />
            )}

            {/* Accent orb */}
            <div aria-hidden style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "100px", height: "100px",
                background: `radial-gradient(circle, ${item.accent.replace("0.9", "0.12")} 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0.3,
                transition: "opacity 0.4s",
                pointerEvents: "none",
            }} />

            {/* Index */}
            <span style={{
                display: "block",
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                letterSpacing: "0.26em", textTransform: "uppercase" as const,
                color: hovered ? item.accent : "rgba(245,245,245,0.22)",
                marginBottom: "20px",
                transition: "color 0.3s",
            }}>
                {item.index}
            </span>

            {/* Title */}
            <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "clamp(17px, 1.8vw, 20px)",
                lineHeight: 1.2, letterSpacing: "-0.01em",
                color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.82)",
                margin: "0 0 16px 0",
                transition: "font-style 0.3s, color 0.3s",
            }}>
                {item.title}
            </h3>

            {/* Divider */}
            <motion.div
                animate={{ width: hovered ? "36px" : "20px", background: hovered ? item.accent : "rgba(245,245,245,0.18)" }}
                transition={{ duration: 0.35 }}
                style={{ height: "1px", marginBottom: "16px" }}
            />

            {/* Body */}
            <p style={{
                fontFamily: "'DM Mono', monospace", fontWeight: 300,
                fontSize: "10.5px", lineHeight: 1.9,
                letterSpacing: "0.03em",
                color: "rgba(245,245,245,0.42)",
                margin: 0,
            }}>
                {item.body}
            </p>
        </motion.div>
    )
}

function ServicePanel({ item, delay }: { item: typeof services[0]; delay: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "40px 36px",
                background: hovered ? "#1C2B33" : "rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s",
                cursor: "default",
            }}
        >
            {hovered && (
                <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${item.accent.replace("0.9", "0.3")}, transparent)`, pointerEvents: "none" }} />
            )}

            <div aria-hidden style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "100px", height: "100px",
                background: `radial-gradient(circle, ${item.accent.replace("0.9", "0.12")} 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0.3,
                transition: "opacity 0.4s",
                pointerEvents: "none",
            }} />

            <span style={{
                display: "block",
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.26em",
                textTransform: "uppercase" as const,
                color: hovered ? item.accent : "rgba(245,245,245,0.22)",
                marginBottom: "20px",
                transition: "color 0.3s",
            }}>
                {item.index}
            </span>

            <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.8vw, 20px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.82)",
                margin: "0 0 16px 0",
                transition: "color 0.3s",
            }}>
                {item.title}
            </h3>

            <motion.div
                animate={{ width: hovered ? "36px" : "20px", background: hovered ? item.accent : "rgba(245,245,245,0.18)" }}
                transition={{ duration: 0.35 }}
                style={{ height: "1px", marginBottom: "16px" }}
            />

            <p style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "10.5px",
                lineHeight: 1.9,
                letterSpacing: "0.03em",
                color: "rgba(245,245,245,0.42)",
                margin: 0,
            }}>
                {item.body}
            </p>
        </motion.div>
    )
}