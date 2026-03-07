"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiPostgresql,
    SiFirebase,
    SiDocker,
    SiGit,
    SiPostman,
    SiGithub,
    SiRedis,
    SiSpring,
    SiPython,
    SiThreedotjs,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

/* GRAIN OVERLAY */
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

const skills = [
    {
        title: "Languages",
        items: [
            { name: "Java", icon: <FaJava /> },
            { name: "Python", icon: <SiPython /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "TypeScript", icon: <SiTypescript /> },
        ],
    },
    {
        title: "Frontend",
        items: [
            { name: "React", icon: <SiReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "React Native", icon: <SiReact /> },
            { name: "Three.js", icon: <SiThreedotjs /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        ],
    },
    {
        title: "Backend",
        items: [
            { name: "Spring Boot", icon: <SiSpring /> },
            { name: "Node.js", icon: <SiNodedotjs /> },
            { name: "Express", icon: <SiExpress /> },
        ],
    },
    {
        title: "Database",
        items: [
            { name: "MySQL", icon: <SiPostgresql /> },
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "Redis", icon: <SiRedis /> },
            { name: "Firebase", icon: <SiFirebase /> },
        ],
    },
    {
        title: "Tools",
        items: [
            { name: "Docker", icon: <SiDocker /> },
            { name: "Git", icon: <SiGit /> },
            { name: "GitHub", icon: <SiGithub /> },
            { name: "Postman", icon: <SiPostman /> },
        ],
    },
]

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 16 } },
}

export default function Skills() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .skills-scroll::-webkit-scrollbar { display: none; }
                .skills-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <section
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "linear-gradient(160deg, #3A5262 0%, #4A6878 18%, #5A7A8C 35%, #6A8FA0 52%, #7EA3B2 66%, #96B4BF 79%, #B2C6CE 90%, #C8D5DA 100%)",
                    color: "white",
                    overflow: "hidden",
                }}
            >
                <GrainOverlay />

                {/* Vignette */}
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

                {/* Ambient glow */}
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", left: "-160px", width: "520px", height: "520px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", right: "-120px", width: "420px", height: "420px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

                {/* Nav */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "32px 44px",
                        pointerEvents: "none",
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="2.25" stroke="rgba(245,245,245,0.3)" strokeWidth="1.5" />
                            <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="500" fill="rgba(245,245,245,0.9)">T</text>
                        </svg>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)" }}>
                            Portfolio
                        </span>
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Open menu"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column" as const, gap: "5px", pointerEvents: "auto" }}
                    >
                        {[0, 1].map((i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scaleX: i === 0 ? 0.65 : 1.25 }}
                                transition={{ duration: 0.25 }}
                                style={{ display: "block", width: i === 0 ? "22px" : "14px", height: "1.5px", background: "rgba(245,245,245,0.75)", borderRadius: "2px", transformOrigin: "left center" }}
                            />
                        ))}
                    </button>
                </motion.nav>

                {/* Scrollable content */}
                <div
                    className="skills-scroll"
                    style={{
                        position: "absolute",
                        inset: 0,
                        overflowY: "auto",
                        zIndex: 10,
                        padding: "140px 44px 100px",
                    }}
                >
                    <div style={{ maxWidth: "860px", margin: "0 auto" }}>

                        {/* Page header */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ marginBottom: "80px" }}
                        >
                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 16px 0" }}>
                                — Technical Stack
                            </p>
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300,
                                fontStyle: "italic",
                                fontSize: "clamp(52px, 8vw, 96px)",
                                lineHeight: 0.92,
                                letterSpacing: "-0.02em",
                                color: "#F5F5F5",
                                margin: "0 0 20px 0",
                                textShadow: "0 2px 40px rgba(40,58,70,0.18)",
                            }}>
                                Core<br />Expertise
                            </h1>
                            <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)" }} />
                        </motion.div>

                        {/* Skill groups */}
                        <div style={{ display: "flex", flexDirection: "column" as const, gap: "72px" }}>
                            {skills.map((group, gi) => (
                                <div key={gi}>
                                    {/* Group header */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.35)" }}>
                                            {String(gi + 1).padStart(2, "0")}
                                        </span>
                                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.12)" }} />
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.45)" }}>
                                            {group.title}
                                        </span>
                                    </div>

                                    {/* Cards */}
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, margin: "-60px" }}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                                            gap: "16px",
                                        }}
                                    >
                                        {group.items.map((skill, si) => (
                                            <motion.div
                                                key={si}
                                                variants={cardVariants}
                                                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                                                style={{
                                                    position: "relative",
                                                    borderRadius: "16px",
                                                    background: "rgba(255,255,255,0.06)",
                                                    backdropFilter: "blur(20px)",
                                                    WebkitBackdropFilter: "blur(20px)",
                                                    border: "1px solid rgba(255,255,255,0.12)",
                                                    padding: "32px 20px 28px",
                                                    display: "flex",
                                                    flexDirection: "column" as const,
                                                    alignItems: "center",
                                                    gap: "16px",
                                                    cursor: "default",
                                                    transition: "background 0.3s, border-color 0.3s",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.1)"
                                                        ; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.22)"
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"
                                                        ; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"
                                                }}
                                            >
                                                {/* Icon */}
                                                <div style={{ fontSize: "36px", color: "rgba(245,245,245,0.75)", lineHeight: 1 }}>
                                                    {skill.icon}
                                                </div>

                                                {/* Name */}
                                                <span style={{
                                                    fontFamily: "'DM Mono', monospace",
                                                    fontSize: "9px",
                                                    letterSpacing: "0.22em",
                                                    textTransform: "uppercase" as const,
                                                    color: "rgba(245,245,245,0.5)",
                                                    textAlign: "center" as const,
                                                }}>
                                                    {skill.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Footer line */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ marginTop: "96px", display: "flex", alignItems: "center", gap: "20px" }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.25)" }}>
                                Always Learning
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