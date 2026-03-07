"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

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
const education = [
    {
        year: "Feb 2024 – Present",
        title: "Graduate Diploma In Software Engineering",
        institution: "Institute of Software Engineering (IJSE)",
        description: "Focused on scalable system design and enterprise architecture. Specialized in advanced full-stack engineering principles.",
        type: "degree",
        accent: "rgba(171,205,219,0.9)",
    },
    {
        year: "Feb 2023 – Feb 2024",
        title: "Diploma In English Language And Literature",
        institution: "Aquinas College of Higher Studies",
        description: "Refined professional communication and critical analysis.",
        type: "certificate",
        accent: "rgba(186,213,186,0.9)",
    },
    {
        year: "Jan 2008 – Jan 2022",
        title: "G.C.E. Advanced Level — Science Stream",
        institution: "Matara Central College",
        description: "Completed secondary education in the Science stream.",
        type: "degree",
        accent: "rgba(171,205,219,0.9)",
    },
]

const awards = [
    {
        year: "2024",
        title: "Genesys III Hackathon — First Runner-Up",
        body: "Secured First Runner-Up position competing against top engineering teams.",
        accent: "rgba(219,196,171,0.9)",
    },
    {
        year: "2025",
        title: "Circle Edge — Finalist",
        body: "Selected as a finalist in the Circle Edge 2025 national competition.",
        accent: "rgba(219,196,171,0.9)",
    },
]

/* ─────────────────────────────────────────────
   EDUCATION ROW
───────────────────────────────────────────── */
function EduRow({ item, index }: { item: typeof education[0]; index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderBottom: "1px solid rgba(255,255,255,0.09)",
                padding: "36px 0",
                display: "grid",
                gridTemplateColumns: "160px 1fr auto",
                gap: "40px",
                alignItems: "start",
                cursor: "default",
                transition: "border-color 0.3s",
                borderColor: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)",
                position: "relative",
            }}
        >
            {/* Hover left accent bar */}
            <motion.div
                animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                    position: "absolute", left: "-44px", top: "36px", bottom: "36px",
                    width: "2px",
                    background: item.accent,
                    transformOrigin: "top",
                    borderRadius: "2px",
                }}
            />

            {/* Year + type */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "4px" }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: hovered ? "rgba(245,245,245,0.55)" : "rgba(245,245,245,0.3)",
                    transition: "color 0.3s",
                    lineHeight: 1.5,
                }}>
                    {item.year}
                </span>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "8px",
                    letterSpacing: "0.26em", textTransform: "uppercase" as const,
                    color: hovered ? item.accent : "rgba(245,245,245,0.2)",
                    transition: "color 0.3s",
                }}>
                    {item.type}
                </span>
            </div>

            {/* Main content */}
            <div>
                <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontStyle: hovered ? "italic" : "normal",
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.88)",
                    margin: "0 0 8px 0",
                    transition: "font-style 0.3s, color 0.3s",
                }}>
                    {item.title}
                </h3>
                <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "9px",
                    letterSpacing: "0.2em", textTransform: "uppercase" as const,
                    color: "rgba(245,245,245,0.32)",
                    margin: "0 0 16px 0",
                }}>
                    {item.institution}
                </p>
                <p style={{
                    fontFamily: "'DM Mono', monospace", fontWeight: 300,
                    fontSize: "11px", lineHeight: 1.9,
                    letterSpacing: "0.03em",
                    color: "rgba(245,245,245,0.4)",
                    margin: 0,
                    maxWidth: "520px",
                }}>
                    {item.description}
                </p>
            </div>

            {/* Right arrow — appears on hover */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
                transition={{ duration: 0.22 }}
                style={{ paddingTop: "6px" }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke={item.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   AWARD ROW
───────────────────────────────────────────── */
function AwardRow({ item, index }: { item: typeof awards[0]; index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderBottom: "1px solid rgba(255,255,255,0.09)",
                padding: "28px 0",
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "40px",
                alignItems: "center",
                cursor: "default",
                position: "relative",
            }}
        >
            {/* Hover accent bar */}
            <motion.div
                animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                    position: "absolute", left: "-44px", top: "28px", bottom: "28px",
                    width: "2px",
                    background: item.accent,
                    transformOrigin: "top",
                    borderRadius: "2px",
                }}
            />

            {/* Year */}
            <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                letterSpacing: "0.14em",
                color: hovered ? "rgba(245,245,245,0.55)" : "rgba(245,245,245,0.28)",
                transition: "color 0.3s",
            }}>
                {item.year}
            </span>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Trophy dot */}
                    <div style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        background: hovered ? item.accent : "rgba(245,245,245,0.25)",
                        flexShrink: 0,
                        transition: "background 0.3s",
                        boxShadow: hovered ? `0 0 8px ${item.accent}` : "none",
                    }} />
                    <h3 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontStyle: hovered ? "italic" : "normal",
                        fontSize: "clamp(17px, 1.8vw, 22px)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        color: hovered ? "#F5F5F5" : "rgba(245,245,245,0.82)",
                        margin: 0,
                        transition: "font-style 0.3s, color 0.3s",
                    }}>
                        {item.title}
                    </h3>
                </div>
                <p style={{
                    fontFamily: "'DM Mono', monospace", fontWeight: 300,
                    fontSize: "10.5px", lineHeight: 1.8,
                    letterSpacing: "0.03em",
                    color: "rgba(245,245,245,0.35)",
                    margin: "0 0 0 19px",
                }}>
                    {item.body}
                </p>
            </div>
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
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
                <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(20,38,48,0.28) 100%)" }} />
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", right: "-160px", width: "520px", height: "520px", background: "rgba(111,162,190,0.1)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", left: "-120px", width: "420px", height: "420px", background: "rgba(111,162,190,0.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

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

                {/* SCROLL */}
                <div className="edu-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, padding: "130px 44px 100px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", paddingLeft: "44px" }}>

                        {/* Header */}
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
                                fontSize: "clamp(52px, 8vw, 88px)",
                                lineHeight: 0.92, letterSpacing: "-0.02em",
                                color: "#F5F5F5", margin: "0 0 24px 0",
                                textShadow: "0 2px 40px rgba(20,38,48,0.18)",
                            }}>
                                Education &<br />Qualifications
                            </h1>
                            <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)" }} />
                        </motion.div>

                        {/* ── EDUCATION SECTION ── */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            style={{ marginBottom: "72px" }}
                        >
                            {/* Section label */}
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "8px" }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                    Academic
                                </span>
                                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                            </div>

                            {/* Top border */}
                            <div style={{ height: "1px", background: "rgba(255,255,255,0.09)", marginBottom: "0" }} />

                            {/* Rows */}
                            {education.map((item, i) => (
                                <EduRow key={i} item={item} index={i} />
                            ))}
                        </motion.div>

                        {/* ── AWARDS SECTION ── */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}
                        >
                            {/* Section label */}
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "8px" }}>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                    Recognitions
                                </span>
                                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                            </div>

                            {/* Top border */}
                            <div style={{ height: "1px", background: "rgba(255,255,255,0.09)" }} />

                            {awards.map((item, i) => (
                                <AwardRow key={i} item={item} index={i} />
                            ))}
                        </motion.div>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
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