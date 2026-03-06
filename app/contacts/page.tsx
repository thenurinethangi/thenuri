"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa"

/* ─────────────────────────────────────────────
   GRAIN OVERLAY
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
    )
}

const socials = [
    { icon: <FaEnvelope />, label: "Email", href: "mailto:" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
    { icon: <FaGithub />, label: "GitHub", href: "#" },
    { icon: <FaInstagram />, label: "Instagram", href: "#" },
    { icon: <FaFacebook />, label: "Facebook", href: "#" },
]

/* ─────────────────────────────────────────────
   FIELD COMPONENT
───────────────────────────────────────────── */
function Field({ id, label, type = "text", rows }: { id: string; label: string; type?: string; rows?: number }) {
    const [focused, setFocused] = useState(false)

    const borderColor = focused ? "rgba(245,245,245,0.65)" : "rgba(245,245,245,0.18)"

    const baseStyle: React.CSSProperties = {
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${borderColor}`,
        paddingBottom: "10px",
        outline: "none",
        color: "rgba(245,245,245,0.92)",
        fontFamily: "'DM Mono', monospace",
        fontSize: "13px",
        letterSpacing: "0.05em",
        transition: "border-color 0.25s",
        resize: "none" as const,
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label
                htmlFor={id}
                style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: focused ? "rgba(245,245,245,0.55)" : "rgba(245,245,245,0.32)",
                    transition: "color 0.25s",
                }}
            >
                {label}
            </label>
            {rows ? (
                <textarea
                    id={id}
                    rows={rows}
                    style={baseStyle}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    style={baseStyle}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}
        </div>
    )
}

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hoverBtn, setHoverBtn] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .contact-scroll::-webkit-scrollbar { display: none; }
                .contact-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <section
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
                    color: "white",
                    overflow: "hidden",
                }}
            >
                <GrainOverlay />

                {/* Vignette */}
                <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%)" }} />

                {/* Ambient glows */}
                <div aria-hidden style={{ position: "absolute", bottom: "-180px", left: "-160px", width: "520px", height: "520px", background: "rgba(255,255,255,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />
                <div aria-hidden style={{ position: "absolute", top: "-120px", right: "-120px", width: "420px", height: "420px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 1 }} />

                {/* Nav */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0,
                        zIndex: 50,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "32px 44px",
                        pointerEvents: "none",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", pointerEvents: "auto" }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="2.25" stroke="rgba(245,245,245,0.3)" strokeWidth="1.5" />
                            <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="18" fontWeight="500" fill="rgba(245,245,245,0.9)">T</text>
                        </svg>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)" }}>Portfolio</span>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Open menu"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column" as const, gap: "5px", pointerEvents: "auto" }}
                    >
                        {[0, 1].map((i) => (
                            <motion.span key={i} whileHover={{ scaleX: i === 0 ? 0.65 : 1.25 }} transition={{ duration: 0.25 }}
                                style={{ display: "block", width: i === 0 ? "22px" : "14px", height: "1.5px", background: "rgba(245,245,245,0.75)", borderRadius: "2px", transformOrigin: "left center" }}
                            />
                        ))}
                    </button>
                </motion.nav>

                {/* Scrollable content */}
                <div
                    className="contact-scroll"
                    style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10, padding: "130px 44px 80px" }}
                >
                    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                            gap: "80px",
                            alignItems: "start",
                        }}>

                            {/* LEFT — headline + socials */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{ display: "flex", flexDirection: "column" as const }}
                            >
                                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 18px 0" }}>
                                    — Get In Touch
                                </p>

                                <h1 style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 300,
                                    fontStyle: "italic",
                                    fontSize: "clamp(56px, 8vw, 96px)",
                                    lineHeight: 0.9,
                                    letterSpacing: "-0.02em",
                                    color: "#F5F5F5",
                                    margin: "0 0 24px 0",
                                    textShadow: "0 2px 40px rgba(40,58,70,0.18)",
                                }}>
                                    Let's<br />Connect
                                </h1>

                                <div style={{ height: "1px", width: "48px", background: "rgba(245,245,245,0.3)", marginBottom: "32px" }} />

                                <p style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontWeight: 300,
                                    fontSize: "12px",
                                    lineHeight: 1.9,
                                    letterSpacing: "0.04em",
                                    color: "rgba(245,245,245,0.55)",
                                    maxWidth: "380px",
                                    margin: "0 0 52px 0",
                                }}>
                                    Interested in working together or just want to say hi? I'm always open to discussing new projects and opportunities.
                                </p>

                                {/* Social links */}
                                <div style={{ display: "flex", flexDirection: "column" as const }}>
                                    {socials.map((s, i) => (
                                        <motion.a
                                            key={i}
                                            href={s.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                                            whileHover="hovered"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "14px 0",
                                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                                textDecoration: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                <span style={{ fontSize: "14px", color: "rgba(245,245,245,0.45)" }}>{s.icon}</span>
                                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.55)" }}>
                                                    {s.label}
                                                </span>
                                            </div>
                                            <motion.div
                                                variants={{ hovered: { x: 2, y: -2, opacity: 1 }, rest: { opacity: 0.3 } }}
                                                initial="rest" animate="rest"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="rgba(245,245,245,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.div>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* RIGHT — form */}
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(28px)",
                                    WebkitBackdropFilter: "blur(28px)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: "20px",
                                    padding: "48px 44px",
                                    display: "flex",
                                    flexDirection: "column" as const,
                                    gap: "36px",
                                    position: "relative" as const,
                                    overflow: "hidden",
                                }}
                            >
                                <div aria-hidden style={{ position: "absolute", top: "-80px", right: "-80px", width: "240px", height: "240px", background: "rgba(255,255,255,0.04)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

                                {/* Form header rule */}
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                        Send a Message
                                    </span>
                                    <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.1)" }} />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                                    <Field id="first_name" label="First Name" />
                                    <Field id="last_name" label="Last Name" />
                                </div>
                                <Field id="email" label="Email Address" type="email" />
                                <Field id="message" label="Message" rows={4} />

                                {/* Submit row */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.22)" }}>
                                        I'll reply within 24h
                                    </span>
                                    <motion.button
                                        onHoverStart={() => setHoverBtn(true)}
                                        onHoverEnd={() => setHoverBtn(false)}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={(e) => e.preventDefault()}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            background: hoverBtn ? "rgba(245,245,245,0.12)" : "rgba(245,245,245,0.07)",
                                            border: `1px solid ${hoverBtn ? "rgba(245,245,245,0.3)" : "rgba(245,245,245,0.15)"}`,
                                            borderRadius: "8px",
                                            padding: "12px 22px",
                                            cursor: "pointer",
                                            transition: "background 0.25s, border-color 0.25s",
                                        }}
                                    >
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.8)" }}>
                                            Send
                                        </span>
                                        <motion.div animate={{ x: hoverBtn ? 3 : 0, y: hoverBtn ? -3 : 0 }} transition={{ duration: 0.2 }}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="rgba(245,245,245,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </>
    )
}