"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaGraduationCap, FaCertificate, FaAward } from "react-icons/fa"

/* ─────────────────────────────────────────────
   GRAIN OVERLAY
───────────────────────────────────────────── */
function GrainOverlay() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0.045,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat", backgroundSize: "180px 180px",
            }}
        />
    )
}

const typeConfig: Record<string, { label: string; accent: string }> = {
    degree: { label: "Degree", accent: "rgba(171,205,219,0.9)" },
    certificate: { label: "Certificate", accent: "rgba(186,213,186,0.9)" },
    award: { label: "Award", accent: "rgba(219,196,171,0.9)" },
}

const educationData = [
    {
        id: 1, type: "degree",
        year: "Feb 2024 - Present",
        title: "Graduate Diploma In Software Engineering",
        institution: "Institute of Software Engineering (IJSE)",
        description: "Focused on scalable system design and enterprise architecture. Specialized in advanced full-stack engineering principles.",
    },
    {
        id: 2, type: "certificate",
        year: "Feb 2023 - Feb 2024",
        title: "Diploma In English Language And Literature",
        institution: "Aquinas College of Higher Studies",
        description: "Refined professional communication and critical analysis.",
    },
    {
        id: 3, type: "certificate",
        year: "Jan 2008 - Jan 2022",
        title: "G. C. E. Advanced Level - Science Stream (2022)",
        institution: "Matara Central College",
        description: "Completed secondary education in the Science stream.",
    },
    {
        id: 4, type: "award",
        year: "2024",
        title: "Genesys III Hackathon — First Runner-Up",
        institution: "CERTIFICATIONS & AWARDS",
        description: "Secured First Runner-Up position in the Genesys III Hackathon 2024.",
    },
    {
        id: 5, type: "award",
        year: "2025",
        title: "Circle Edge — Finalist",
        institution: "CERTIFICATIONS & AWARDS",
        description: "Selected as a finalist in the Circle Edge 2025 competition.",
    },
]

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function EducationCard({ item, index }: { item: typeof educationData[0]; index: number }) {
    const [hovered, setHovered] = useState(false)
    const cfg = typeConfig[item.type]

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? "#1C2B33" : "rgba(255,255,255,0.07)",
                border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.11)"}`,
                borderRadius: "16px",
                padding: "40px 44px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "background 0.4s, border-color 0.4s",
                boxShadow: hovered ? "0 24px 64px rgba(20,35,44,0.35)" : "none",
            }}
        >
            {/* Top highlight on hover */}
            {hovered && (
                <div aria-hidden style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 100%)",
                    pointerEvents: "none",
                }} />
            )}

            {/* Orb */}
            <div aria-hidden style={{
                position: "absolute", top: "-40px", right: "-40px",
                width: "160px", height: "160px",
                background: `radial-gradient(circle, ${cfg.accent.replace("0.9", "0.07")} 0%, transparent 70%)`,
                pointerEvents: "none",
                transition: "opacity 0.4s",
                opacity: hovered ? 1 : 0.4,
            }} />

            {/* Top row: type badge + year */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase" as const,
                    color: cfg.accent,
                    padding: "5px 12px",
                    border: `1px solid ${cfg.accent.replace("0.9", "0.25")}`,
                    borderRadius: "4px",
                    background: cfg.accent.replace("0.9", "0.07"),
                }}>
                    {cfg.label}
                </span>
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "rgba(245,245,245,0.35)",
                }}>
                    {item.year}
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontStyle: hovered ? "italic" : "normal",
                fontSize: "clamp(20px, 2.2vw, 26px)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.88)",
                margin: "0 0 10px 0",
                transition: "font-style 0.3s",
            }}>
                {item.title}
            </h3>

            {/* Institution */}
            <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "rgba(245,245,245,0.38)",
                margin: "0 0 20px 0",
            }}>
                {item.institution}
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "20px" }} />

            {/* Description */}
            <p style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "11.5px",
                lineHeight: 1.9,
                letterSpacing: "0.03em",
                color: "rgba(245,245,245,0.48)",
                margin: 0,
            }}>
                {item.description}
            </p>
        </motion.div>
    )
}

export default function Education() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .edu-scroll::-webkit-scrollbar { display: none; }
                .edu-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <section style={{
                position: "fixed", inset: 0,
                background: "linear-gradient(160deg, #3A5262 0%, #4A6878 18%, #5A7A8C 35%, #6A8FA0 52%, #7EA3B2 66%, #96B4BF 79%, #B2C6CE 90%, #C8D5DA 100%)",
                color: "white", overflow: "hidden",
            }}>
                <GrainOverlay />

                {/* Vignette */}
                <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)" }} />

                {/* Glows */}
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", right: "-160px", width: "520px", height: "520px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", left: "-120px", width: "420px", height: "420px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

                {/* ── NAV ── */}
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

                {/* ── SCROLLABLE CONTENT ── */}
                <div className="edu-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, padding: "130px 44px 100px" }}>
                    <div style={{ maxWidth: "980px", margin: "0 auto" }}>

                        {/* Page header */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ marginBottom: "72px" }}
                        >
                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 16px 0" }}>
                                — Background
                            </p>
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(52px, 8vw, 96px)",
                                lineHeight: 0.92, letterSpacing: "-0.02em",
                                color: "#F5F5F5", margin: "0 0 20px 0",
                                textShadow: "0 2px 40px rgba(40,58,70,0.18)",
                            }}>
                                Education &<br />Qualifications
                            </h1>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)" }} />
                                {/* Legend */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    {Object.entries(typeConfig).map(([key, val]) => (
                                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: val.accent }} />
                                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.35)" }}>{val.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Cards grid — 2 columns on wide, 1 on narrow */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
                            gap: "24px",
                        }}>
                            {educationData.map((item, i) => (
                                <EducationCard key={item.id} item={item} index={i} />
                            ))}
                        </div>

                        {/* Footer rule */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "20px" }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.22)" }}>
                                Always Growing
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