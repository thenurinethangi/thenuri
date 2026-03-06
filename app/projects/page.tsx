"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { FaGithub } from "react-icons/fa"

/* ─────────────────────────────────────────────
   GRAIN OVERLAY
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
   DATA
───────────────────────────────────────────── */
const projects = [
    {
        index: "01",
        status: "Shipped",
        period: "Jan – Feb 2026",
        title: "Flip",
        subtitle: "Mobile Productivity Platform",
        description: "Scalable architecture for hierarchical task orchestration, independent scheduling, and deep-focus workflows with a Pomodoro-based focus engine.",
        stack: ["React Native", "Expo", "TypeScript", "Firebase", "Redux Toolkit"],
        github: "#",
        demo: null,
        accent: "#ABCDDB",
        letter: "F",
    },
    {
        index: "02",
        status: "Shipped",
        period: "Sep – Oct 2025",
        title: "Wattpad Clone",
        subtitle: "Production Story Platform",
        description: "Full storytelling ecosystem replicating publishing, discovery, monetization, and moderation workflows with a transactional coin and subscription system.",
        stack: ["Java", "Spring Boot", "MySQL", "REST APIs", "JWT"],
        github: "#",
        demo: "#",
        accent: "#BAD5BA",
        letter: "W",
    },
    {
        index: "03",
        status: "Shipped",
        period: "Dec 2025 – Jan 2026",
        title: "Synema",
        subtitle: "Real-Time Cinema Booking",
        description: "Concurrency-safe ticketing platform with Redis distributed locking, Stripe-integrated atomic ticket issuance, and multi-tenant cinema operations.",
        stack: ["React.js", "Node.js", "MongoDB", "Redis", "Express.js"],
        github: "#",
        demo: "#",
        accent: "#DBC4AB",
        letter: "S",
    },
    {
        index: "04",
        status: "In Progress",
        period: "Feb 2026 – Present",
        title: "AI Interview Simulator",
        subtitle: "Dual-Mode Interview Platform",
        description: "AI-driven platform with resume-aware question generation, structured scoring pipeline, and an analytics layer identifying skill gaps and progression.",
        stack: ["Next.js", "Node.js", "MySQL", "OpenAI API"],
        github: "#",
        demo: null,
        accent: "#D1BEDb",
        letter: "A",
    },
]

/* ─────────────────────────────────────────────
   PROJECT ROW
───────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
    const [hovered, setHovered] = useState(false)
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "grid",
                gridTemplateColumns: isEven ? "1fr 1.15fr" : "1.15fr 1fr",
                gap: "0",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                cursor: "default",
                transition: "border-color 0.3s",
                borderColor: hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
            }}
        >
            {/* ── VISUAL PANEL ── */}
            {isEven ? (
                <>
                    <VisualPanel project={project} hovered={hovered} />
                    <InfoPanel project={project} hovered={hovered} isEven={isEven} />
                </>
            ) : (
                <>
                    <InfoPanel project={project} hovered={hovered} isEven={isEven} />
                    <VisualPanel project={project} hovered={hovered} />
                </>
            )}
        </motion.div>
    )
}

function VisualPanel({ project, hovered }: { project: typeof projects[0]; hovered: boolean }) {
    return (
        <div style={{
            position: "relative",
            background: hovered ? "#1C2B33" : "rgba(255,255,255,0.04)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            minHeight: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "background 0.5s",
        }}>
            {/* Giant background letter */}
            <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(180px, 22vw, 280px)",
                lineHeight: 1,
                color: hovered
                    ? project.accent.replace(")", ", 0.12)").replace("rgb", "rgba").replace("#", "rgba(")
                    : "rgba(255,255,255,0.04)",
                userSelect: "none",
                letterSpacing: "-0.05em",
                transition: "color 0.5s",
                // hex to rgba trick via filter
                filter: "none",
                position: "absolute",
            }}
                // Use a simpler approach for hex color with opacity
                className=""
            >
                <span style={{ color: hovered ? "transparent" : "transparent",
                    WebkitTextStroke: `1px ${hovered ? project.accent.replace(/.$/, "28)").replace("#", "rgba(").replace("rgba(", "rgba(") : "rgba(255,255,255,0.06)"}`,
                    fontSize: "clamp(180px, 22vw, 280px)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    transition: "all 0.5s",
                }}>
                    {project.letter}
                </span>
            </span>

            {/* Index + period stacked bottom-left */}
            <div style={{
                position: "absolute", bottom: "32px", left: "36px",
                display: "flex", flexDirection: "column", gap: "6px",
            }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "9px",
                    letterSpacing: "0.28em", textTransform: "uppercase" as const,
                    color: "rgba(245,245,245,0.25)",
                }}>
                    {project.index}
                </span>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "9px",
                    letterSpacing: "0.16em",
                    color: "rgba(245,245,245,0.22)",
                }}>
                    {project.period}
                </span>
            </div>

            {/* Status dot top-right */}
            <div style={{
                position: "absolute", top: "28px", right: "28px",
                display: "flex", alignItems: "center", gap: "7px",
            }}>
                <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: project.status === "In Progress" ? project.accent : "rgba(245,245,245,0.3)",
                    boxShadow: project.status === "In Progress" ? `0 0 8px ${project.accent}88` : "none",
                }} />
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "9px",
                    letterSpacing: "0.22em", textTransform: "uppercase" as const,
                    color: project.status === "In Progress" ? project.accent : "rgba(245,245,245,0.3)",
                }}>
                    {project.status}
                </span>
            </div>

            {/* Tech pills bottom — visible on hover */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "absolute", bottom: "32px", right: "28px",
                    display: "flex", flexWrap: "wrap" as const, gap: "6px",
                    maxWidth: "60%", justifyContent: "flex-end",
                }}
            >
                {project.stack.map((t) => (
                    <span key={t} style={{
                        fontFamily: "'DM Mono', monospace", fontSize: "8px",
                        letterSpacing: "0.16em", textTransform: "uppercase" as const,
                        color: "rgba(245,245,245,0.5)",
                        padding: "4px 9px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "3px",
                        background: "rgba(0,0,0,0.2)",
                    }}>
                        {t}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

function InfoPanel({ project, hovered, isEven }: { project: typeof projects[0]; hovered: boolean; isEven: boolean }) {
    return (
        <div style={{
            padding: "52px 56px",
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
            gap: "0",
            borderLeft: isEven ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRight: isEven ? "1px solid rgba(255,255,255,0.08)" : "none",
            background: "transparent",
            minHeight: "340px",
        }}>
            {/* Subtitle */}
            <p style={{
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                letterSpacing: "0.28em", textTransform: "uppercase" as const,
                color: hovered ? project.accent : "rgba(245,245,245,0.32)",
                margin: "0 0 14px 0",
                transition: "color 0.3s",
            }}>
                {project.subtitle}
            </p>

            {/* Title */}
            <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(36px, 4.5vw, 62px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#F5F5F5",
                margin: "0 0 28px 0",
                textShadow: "0 2px 30px rgba(40,58,70,0.15)",
            }}>
                {project.title}
            </h2>

            {/* Divider */}
            <motion.div
                animate={{ width: hovered ? "64px" : "32px", background: hovered ? project.accent : "rgba(245,245,245,0.25)" }}
                transition={{ duration: 0.35 }}
                style={{ height: "1px", marginBottom: "24px" }}
            />

            {/* Description */}
            <p style={{
                fontFamily: "'DM Mono', monospace", fontWeight: 300,
                fontSize: "11px", lineHeight: 1.95,
                letterSpacing: "0.04em",
                color: "rgba(245,245,245,0.5)",
                margin: "0 0 36px 0",
                maxWidth: "400px",
            }}>
                {project.description}
            </p>

            {/* Actions */}
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <a href={project.github} target="_blank" rel="noreferrer"
                    style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        fontFamily: "'DM Mono', monospace", fontSize: "9px",
                        letterSpacing: "0.24em", textTransform: "uppercase" as const,
                        color: "rgba(245,245,245,0.55)",
                        textDecoration: "none",
                        padding: "9px 18px",
                        border: "1px solid rgba(255,255,255,0.14)",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.04)",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.background = "rgba(255,255,255,0.1)"
                        el.style.color = "rgba(245,245,245,0.9)"
                        el.style.borderColor = "rgba(255,255,255,0.3)"
                    }}
                    onMouseLeave={e => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.background = "rgba(255,255,255,0.04)"
                        el.style.color = "rgba(245,245,245,0.55)"
                        el.style.borderColor = "rgba(255,255,255,0.14)"
                    }}
                >
                    <FaGithub style={{ fontSize: "12px" }} />
                    Source
                </a>

                {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer"
                        style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            fontFamily: "'DM Mono', monospace", fontSize: "9px",
                            letterSpacing: "0.24em", textTransform: "uppercase" as const,
                            color: project.accent,
                            textDecoration: "none",
                            padding: "9px 18px",
                            border: `1px solid ${project.accent}44`,
                            borderRadius: "6px",
                            background: `${project.accent}11`,
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.background = `${project.accent}22`
                            el.style.borderColor = `${project.accent}88`
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLAnchorElement
                            el.style.background = `${project.accent}11`
                            el.style.borderColor = `${project.accent}44`
                        }}
                    >
                        Live Demo
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                ) : (
                    <span style={{
                        fontFamily: "'DM Mono', monospace", fontSize: "9px",
                        letterSpacing: "0.2em", textTransform: "uppercase" as const,
                        color: "rgba(245,245,245,0.2)",
                    }}>
                        — No Demo
                    </span>
                )}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .proj-scroll::-webkit-scrollbar { display: none; }
                .proj-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                @media (max-width: 680px) {
                    .proj-row { grid-template-columns: 1fr !important; }
                    .proj-row > div:first-child { min-height: 200px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
                }
            `}</style>

            <section style={{
                position: "fixed", inset: 0,
                background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
                color: "white", overflow: "hidden",
            }}>
                <GrainOverlay />

                <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)" }} />
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", left: "-160px", width: "520px", height: "520px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", right: "-120px", width: "420px", height: "420px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

                {/* NAV */}
                <motion.nav
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "32px 44px", pointerEvents: "none",
                    }}
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

                {/* SCROLLABLE */}
                <div className="proj-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, paddingTop: "110px" }}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ padding: "0 44px 60px", maxWidth: "980px", margin: "0 auto" }}
                    >
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 16px 0" }}>
                            — Selected Work
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "16px" }}>
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(52px, 8vw, 96px)",
                                lineHeight: 0.92, letterSpacing: "-0.02em",
                                color: "#F5F5F5", margin: 0,
                                textShadow: "0 2px 40px rgba(40,58,70,0.18)",
                            }}>
                                Projects
                            </h1>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(245,245,245,0.28)", paddingBottom: "8px" }}>
                                {String(projects.length).padStart(2, "0")} works
                            </span>
                        </div>
                        <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)", marginTop: "20px" }} />
                    </motion.div>

                    {/* Full-width project rows */}
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        {projects.map((project, i) => (
                            <ProjectRow key={project.index} project={project} index={i} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div style={{ padding: "60px 44px 100px", display: "flex", alignItems: "center", gap: "20px", maxWidth: "980px", margin: "0 auto" }}>
                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.22)" }}>Always Building</span>
                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </>
    )
}