"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/* ─────────────────────────────────────────────
   GRAIN
───────────────────────────────────────────── */
function GrainOverlay() {
    return (
        <div aria-hidden style={{
            position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0.045,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "180px 180px",
        }} />
    )
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
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
        let start = 0; const steps = 40; const inc = value / steps
        const timer = setInterval(() => {
            start += inc
            if (start >= value) { setDisplay(value); clearInterval(timer) }
            else setDisplay(Math.floor(start))
        }, 28)
        return () => clearInterval(timer)
    }, [inView, value])
    return <span ref={ref}>{display}{suffix}</span>
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
    { value: 2,   suffix: "+",  label: "Years Coding" },
    { value: 8,   suffix: "+",  label: "Projects Shipped" },
    { value: 20,  suffix: "+",  label: "Technologies" },
    { value: 100, suffix: "%",  label: "Commitment" },
]

const pillars = [
    { index: "01", title: "Full-Stack Engineering",   body: "React, Next.js, Node.js, Spring Boot, and the MERN stack — building end-to-end platforms that are secure, cloud-ready, and built for real-world scale.", accent: "rgba(171,205,219,0.9)", accentSolid: "#ABCDD4" },
    { index: "02", title: "Mobile & Cross-Platform",  body: "Building mobile applications for both native-specific environments and cross-platform ecosystems, with reliable performance, maintainable architecture, and production readiness.", accent: "rgba(186,213,186,0.9)", accentSolid: "#BAD5BA" },
    { index: "03", title: "AI-Integrated Platforms",  body: "Building AI-integrated platforms to improve decision-making, automate workflows, and deliver smarter user experiences across digital products.", accent: "rgba(209,190,219,0.9)", accentSolid: "#D1BED9" },
]

const services = [
    { index: "01", title: "Web & Mobile Solution Delivery", body: "Delivering modern web and mobile platforms aligned with real business objectives and personal operational requirements.", accent: "rgba(171,205,219,0.9)", accentSolid: "#ABCDD4" },
    { index: "02", title: "Existing Software Upgrades",     body: "Enhancing and modernizing existing software products, including platforms built by me or inherited from other teams.", accent: "rgba(186,213,186,0.9)", accentSolid: "#BAD5BA" },
    { index: "03", title: "Software Consulting",            body: "Providing software consulting to define problem scope, recommend the right technical strategy, and guide practical execution.", accent: "rgba(209,190,219,0.9)", accentSolid: "#D1BED9" },
]

const techPills = ["React", "Next.js", "TypeScript", "Spring Boot", "Node.js", "React Native", "Docker", "AWS", "MySQL", "MongoDB"]

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cvHovered,   setCvHovered]   = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Mono:wght@300;400;500&display=swap');

                .about-scroll::-webkit-scrollbar { display: none; }
                .about-scroll { -ms-overflow-style: none; scrollbar-width: none; }

                /* pill hover */
                .tech-pill {
                    font-family: 'DM Mono', monospace; font-size: 8.5px;
                    letter-spacing: 0.18em; text-transform: uppercase;
                    color: rgba(245,245,245,0.35);
                    padding: 5px 12px;
                    border: 1px solid rgba(245,245,245,0.1);
                    border-radius: 3px;
                    background: rgba(255,255,255,0.03);
                    transition: color 0.22s, border-color 0.22s, background 0.22s;
                    white-space: nowrap; cursor: default;
                }
                .tech-pill:hover {
                    color: rgba(245,245,245,0.72);
                    border-color: rgba(171,205,219,0.3);
                    background: rgba(171,205,219,0.07);
                }

                /* stat card */
                .s-card {
                    padding: 28px 22px; text-align: center;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px; background: rgba(255,255,255,0.03);
                    transition: border-color 0.3s, background 0.3s;
                }
                .s-card:hover {
                    border-color: rgba(171,205,219,0.22);
                    background: rgba(171,205,219,0.05);
                }

                @media (max-width: 780px) {
                    .hero-grid   { grid-template-columns: 1fr !important; gap: 0 !important; }
                    .big-name    { font-size: clamp(72px,18vw,110px) !important; }
                    .hero-right  { padding: 36px 0 0 !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.1) !important; }
                    .cards-3     { grid-template-columns: 1fr !important; }
                    .stats-row   { grid-template-columns: repeat(2,1fr) !important; }
                    .bio-strip   { grid-template-columns: 1fr !important; gap: 24px !important; }
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

                {/* ── NAV ── */}
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

                {/* ── SCROLL ── */}
                <div className="about-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, padding: "120px 44px 100px" }}>
                    <div style={{ maxWidth: "960px", margin: "0 auto" }}>

                        {/* ════════════════════════════════════════
                            SECTION LABEL
                        ════════════════════════════════════════ */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}
                        >
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)" }}>— About</span>
                            {/* <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(245,245,245,0.15), transparent)" }} /> */}
                        </motion.div>

                        {/* ════════════════════════════════════════
                            HERO — giant name LEFT, ruled bio RIGHT
                        ════════════════════════════════════════ */}
                        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1.05fr", gap: "0", marginBottom: "72px", alignItems: "stretch" }}>

                            {/* LEFT: giant editorial name block */}
                            <motion.div
                                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                style={{ paddingRight: "52px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", gap: "32px" }}
                            >
                                {/* Oversize italic name */}
                                <div>
                                    <h1 className="big-name" style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontWeight: 300, fontStyle: "italic",
                                        fontSize: "clamp(72px, 10vw, 118px)",
                                        lineHeight: 0.85, letterSpacing: "-0.03em",
                                        color: "#F5F5F5", margin: "0 0 28px 0",
                                        textShadow: "0 4px 60px rgba(20,38,48,0.22)",
                                    }}>
                                        Thenuri
                                    </h1>

                                    {/* Horizontal rule with dot */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                        <div style={{ width: "28px", height: "1px", background: "rgba(171,205,219,0.5)" }} />
                                        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(171,205,219,0.7)" }} />
                                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                                    </div>

                                    {/* Role badge */}
                                    <div style={{
                                        display: "inline-flex", alignItems: "center", gap: "8px",
                                        padding: "7px 14px",
                                        border: "1px solid rgba(245,245,245,0.13)", borderRadius: "5px",
                                        background: "rgba(255,255,255,0.04)", width: "fit-content",
                                        marginBottom: "28px",
                                    }}>
                                        <motion.div
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                            style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(171,205,219,0.85)", flexShrink: 0 }}
                                        />
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.52)" }}>
                                            SE Undergraduate · Professional Dev
                                        </span>
                                    </div>

                                    {/* Tech pill row */}
                                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
                                        {techPills.map(t => <span key={t} className="tech-pill">{t}</span>)}
                                    </div>
                                </div>

                                {/* CV download */}
                                <motion.a
                                    href="/Thenuri_Nethangi_CV.pdf" download
                                    onHoverStart={() => setCvHovered(true)}
                                    onHoverEnd={() => setCvHovered(false)}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "12px",
                                        fontFamily: "'DM Mono', monospace", fontSize: "9.5px",
                                        letterSpacing: "0.24em", textTransform: "uppercase" as const,
                                        color: cvHovered ? "#F5F5F5" : "rgba(245,245,245,0.7)",
                                        textDecoration: "none",
                                        padding: "13px 26px",
                                        border: `1px solid ${cvHovered ? "rgba(171,205,219,0.5)" : "rgba(245,245,245,0.15)"}`,
                                        borderRadius: "7px",
                                        background: cvHovered ? "rgba(171,205,219,0.12)" : "rgba(255,255,255,0.04)",
                                        transition: "all 0.28s",
                                        cursor: "pointer", width: "fit-content",
                                        position: "relative", overflow: "hidden",
                                    }}
                                >
                                    {cvHovered && (
                                        <motion.div
                                            initial={{ x: "-100%" }} animate={{ x: "100%" }}
                                            transition={{ duration: 0.55 }}
                                            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(171,205,219,0.1), transparent)", pointerEvents: "none" }}
                                        />
                                    )}
                                    <motion.svg animate={{ y: cvHovered ? 2 : 0 }} transition={{ duration: 0.2 }} width="12" height="12" viewBox="0 0 14 14" fill="none">
                                        <path d="M7 1v8M7 9l-3-3M7 9l3-3M1 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                    Download CV
                                </motion.a>
                            </motion.div>

                            {/* CENTRE vertical rule */}
                            <div style={{ background: "rgba(255,255,255,0.1)", width: "1px", alignSelf: "stretch" }} />

                            {/* RIGHT: bio copy */}
                            <motion.div
                                className="hero-right"
                                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.1, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                                style={{ paddingLeft: "52px", display: "flex", flexDirection: "column" as const, gap: "28px", justifyContent: "center" }}
                            >
                                {/* Large italic pull quote */}
                                <p style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 300, fontStyle: "italic",
                                    fontSize: "clamp(19px, 2.1vw, 25px)",
                                    lineHeight: 1.6, letterSpacing: "0.01em",
                                    color: "rgba(245,245,245,0.88)", margin: 0,
                                }}>
                                    Engineering production-grade web, mobile, and desktop platforms with scalable architectures, high-performance interfaces, and intelligent AI/IoT integrations.
                                </p>

                                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

                                <p style={{
                                    fontFamily: "'DM Mono', monospace", fontWeight: 300,
                                    fontSize: "10.5px", lineHeight: 2, letterSpacing: "0.04em",
                                    color: "rgba(245,245,245,0.46)", margin: 0,
                                }}>
                                    Experienced across modern full-stack ecosystems including React, Next.js, React Native, Spring Boot, Node.js, and MERN — delivering secure, cloud-ready platforms built for reliability, extensibility, and real-world scale.
                                </p>

                                {/* Three short fact lines */}
                                <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                                    {[
                                        ["Location",   "Sri Lanka"],
                                        ["Availability","Open to projects"],
                                        ["Focus",       "Full-Stack · Mobile · AI"],
                                    ].map(([k, v]) => (
                                        <div key={k} style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.25)", minWidth: "80px" }}>{k}</span>
                                            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)", alignSelf: "center" }} />
                                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", color: "rgba(245,245,245,0.55)" }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ════════════════════════════════════════
                            STATS STRIP
                        ════════════════════════════════════════ */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className="stats-row"
                            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "76px" }}
                        >
                            {stats.map((s, i) => (
                                <motion.div key={s.label} className="s-card"
                                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                                >
                                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(34px,4vw,46px)", lineHeight: 1, color: "rgba(171,205,219,0.88)", marginBottom: "7px" }}>
                                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                                    </div>
                                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.32)" }}>{s.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ════════════════════════════════════════
                            SERVICES
                        ════════════════════════════════════════ */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}
                            style={{ marginBottom: "52px" }}
                        >
                            <SectionDivider label="Services" />
                            <div className="cards-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                                {services.map((s, i) => <ArchCard key={s.index} item={s} delay={i * 0.1} />)}
                            </div>
                        </motion.div>

                        {/* ════════════════════════════════════════
                            WHAT I BUILD
                        ════════════════════════════════════════ */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}
                            style={{ marginBottom: "80px" }}
                        >
                            <SectionDivider label="What I Build" />
                            <div className="cards-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                                {pillars.map((p, i) => <ArchCard key={p.index} item={p} delay={i * 0.1} withIcon />)}
                            </div>
                        </motion.div>

                        {/* ════════════════════════════════════════
                            FOOTER RULE
                        ════════════════════════════════════════ */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ display: "flex", alignItems: "center", gap: "20px" }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.08)" }} />
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "3px", height: "3px", borderRadius: "50%", border: "1px solid rgba(171,205,219,0.4)" }} />
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.2)" }}>Always Evolving</span>
                                <div style={{ width: "3px", height: "3px", borderRadius: "50%", border: "1px solid rgba(171,205,219,0.4)" }} />
                            </div>
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.08)" }} />
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
   SECTION DIVIDER
───────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.32em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.28)", whiteSpace: "nowrap" as const }}>
                {label}
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>
    )
}

/* ─────────────────────────────────────────────
   ARCH CARD
   Architectural card — accent line on left edge,
   index/title/body with icon option.
───────────────────────────────────────────── */
const pillarIcons: Record<string, string> = {
    "01": `<path d="M4 6h16M4 12h10" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" fill="none"/><polyline points="16 15 19 12 16 9" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" fill="none"/>`,
    "02": `<rect x="7" y="2" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.35" fill="none"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/>`,
    "03": `<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.35" fill="none"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" fill="none"/>`,
}

function ArchCard({
    item, delay, withIcon = false,
}: {
    item: { index: string; title: string; body: string; accent: string; accentSolid: string }
    delay: number
    withIcon?: boolean
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "36px 30px 38px 34px",
                background: hovered ? "#1C2B33" : "rgba(255,255,255,0.035)",
                position: "relative", overflow: "hidden",
                transition: "background 0.38s",
                cursor: "default",
            }}
        >
            {/* Left accent bar */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, height: hovered ? "60%" : "24px" }}
                transition={{ duration: 0.38 }}
                style={{
                    position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                    width: "2px",
                    background: `linear-gradient(180deg, transparent, ${item.accentSolid}, transparent)`,
                    borderRadius: "2px",
                    pointerEvents: "none",
                }}
            />

            {/* Top edge glow */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: hovered ? `linear-gradient(90deg, transparent, ${item.accent.replace("0.9", "0.25")}, transparent)` : "transparent",
                transition: "background 0.38s", pointerEvents: "none",
            }} />

            {/* Accent orb top-right */}
            <div aria-hidden style={{
                position: "absolute", top: "-24px", right: "-24px", width: "110px", height: "110px",
                background: `radial-gradient(circle, ${item.accent.replace("0.9", "0.1")} 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0.25, transition: "opacity 0.38s", pointerEvents: "none",
            }} />

            {/* Icon box — only on "What I Build" */}
            {withIcon && (
                <div style={{
                    width: "32px", height: "32px",
                    border: `1px solid ${hovered ? item.accent.replace("0.9", "0.3") : "rgba(245,245,245,0.09)"}`,
                    borderRadius: "6px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: hovered ? item.accent.replace("0.9", "0.08") : "rgba(255,255,255,0.03)",
                    marginBottom: "18px",
                    transition: "all 0.3s",
                    color: hovered ? item.accentSolid : "rgba(245,245,245,0.28)",
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: pillarIcons[item.index] ?? "" }} />
                </div>
            )}

            {/* Index + dash */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "8.5px",
                    letterSpacing: "0.26em", textTransform: "uppercase" as const,
                    color: hovered ? item.accentSolid : "rgba(245,245,245,0.2)",
                    transition: "color 0.3s",
                }}>{item.index}</span>
                <div style={{ width: "14px", height: "1px", background: hovered ? item.accent.replace("0.9", "0.45") : "rgba(245,245,245,0.1)", transition: "background 0.3s" }} />
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400, fontSize: "clamp(16px, 1.7vw, 19px)",
                lineHeight: 1.2, letterSpacing: "-0.01em",
                color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.8)",
                margin: "0 0 14px 0", transition: "color 0.3s",
            }}>{item.title}</h3>

            {/* Animated divider */}
            <motion.div
                animate={{ width: hovered ? "38px" : "18px", background: hovered ? item.accentSolid : "rgba(245,245,245,0.15)" }}
                transition={{ duration: 0.35 }}
                style={{ height: "1px", marginBottom: "14px" }}
            />

            {/* Body */}
            <p style={{
                fontFamily: "'DM Mono', monospace", fontWeight: 300,
                fontSize: "10.5px", lineHeight: 1.95, letterSpacing: "0.03em",
                color: "rgba(245,245,245,0.4)", margin: 0,
            }}>{item.body}</p>
        </motion.div>
    )
}