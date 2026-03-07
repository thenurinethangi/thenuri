"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa"

function GrainOverlay() {
    return (
        <div aria-hidden style={{
            position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", opacity: 0.045,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "180px 180px",
        }} />
    )
}

const socials = [
    { icon: <FaEnvelope />, label: "Email", href: "mailto:thenurinathangi@gmail.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/thenurinanayakkara/" },
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/thenurinethangi" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/thenuri__7/" },
    { icon: <FaFacebook />, label: "Facebook", href: "https://www.facebook.com/thenuri__7/" },
]

/* ─────────────────────────────────────────────
   FIELD
───────────────────────────────────────────── */
function Field({ id, label, type = "text", rows, value, onChange }: { id: string; label: string; type?: string; rows?: number; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
    const [focused, setFocused] = useState(false)

    const base: React.CSSProperties = {
        width: "100%",
        background: focused ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        border: `1px solid ${focused ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)"}`,
        borderRadius: "8px",
        padding: "13px 16px",
        outline: "none",
        color: "rgba(245,245,245,0.95)",
        fontFamily: "'DM Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.05em",
        transition: "all 0.25s",
        resize: "none" as const,
        boxSizing: "border-box" as const,
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor={id} style={{
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                letterSpacing: "0.28em", textTransform: "uppercase" as const,
                color: focused ? "rgba(245,245,245,0.7)" : "rgba(245,245,245,0.45)",
                transition: "color 0.25s",
            }}>
                {label}
            </label>
            {rows
                ? <textarea id={id} rows={rows} style={base} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                : <input id={id} type={type} style={base} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            }
        </div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hoverBtn, setHoverBtn] = useState(false)

    // Form state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSend = (e: React.MouseEvent) => {
        e.preventDefault()
        // Here you would normally handle the API request to send the email

        // Clear all fields
        setFirstName("")
        setLastName("")
        setEmail("")
        setSubject("")
        setMessage("")
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .contact-scroll::-webkit-scrollbar { display: none; }
                .contact-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                @media (max-width: 800px) {
                    .nav-bar { padding: 24px 24px !important; }
                    .contact-header { padding: 110px 24px 0 !important; }
                    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .contact-left { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; padding: 0 0 40px 0 !important; }
                    .contact-right { padding: 40px 0 0 0 !important; }
                    .form-row { grid-template-columns: 1fr !important; }
                    .contact-footer { padding: 0 24px 60px !important; }
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
                    className="nav-bar"
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
                <div className="contact-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10 }}>

                    {/* ── TOP SECTION: headline full width ── */}
                    <motion.div
                        className="contact-header"
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ padding: "140px 44px 0", maxWidth: "1100px", margin: "0 auto" }}
                    >
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 18px 0" }}>
                            — Get In Touch
                        </p>

                        {/* Giant heading */}
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" as const, marginBottom: "32px" }}>
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(56px, 9vw, 110px)",
                                lineHeight: 0.88, letterSpacing: "-0.02em",
                                color: "#F5F5F5", margin: 0,
                                textShadow: "0 2px 40px rgba(20,38,48,0.2)",
                            }}>
                                Let's<br />Connect
                            </h1>

                            {/* Pull quote sits bottom-right of heading */}
                            <p style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(16px, 1.6vw, 20px)",
                                lineHeight: 1.65,
                                color: "rgba(245,245,245,0.55)",
                                maxWidth: "340px",
                                margin: "0 0 12px 0",
                                borderLeft: "2px solid rgba(245,245,245,0.2)",
                                paddingLeft: "20px",
                            }}>
                                Building something? Let's talk. I take on select projects where precision and scale actually matter.
                            </p>
                        </div>

                        {/* Full-width divider */}
                        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "0" }} />
                    </motion.div>

                    {/* ── BOTTOM SECTION: socials + form ── */}
                    <motion.div
                        className="contact-grid"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            maxWidth: "1100px", margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "1fr 1.15fr",
                            gap: "0",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            marginBottom: "60px",
                            padding: "0 44px",
                        }}
                    >
                        {/* LEFT — socials */}
                        <div className="contact-left" style={{
                            borderRight: "1px solid rgba(255,255,255,0.1)",
                            padding: "48px 44px 48px 0",
                            display: "flex", flexDirection: "column" as const, justifyContent: "space-between",
                        }}>
                            <div>
                                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.28)", margin: "0 0 24px 0" }}>
                                    Find me on
                                </p>
                                <div style={{ display: "flex", flexDirection: "column" as const }}>
                                    {socials.map((s, i) => (
                                        <motion.a
                                            key={i}
                                            href={s.href}
                                            target="_blank" rel="noreferrer"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + i * 0.07, duration: 0.45 }}
                                            whileHover="hovered"
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                                padding: "15px 0",
                                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                                                textDecoration: "none", cursor: "pointer",
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                                <span style={{ fontSize: "13px", color: "rgba(245,245,245,0.38)" }}>{s.icon}</span>
                                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.52)" }}>
                                                    {s.label}
                                                </span>
                                            </div>
                                            <motion.div
                                                variants={{ hovered: { x: 2, y: -2, opacity: 1 }, rest: { x: 0, y: 0, opacity: 0.22 } }}
                                                initial="rest" animate="rest"
                                            >
                                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="rgba(245,245,245,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Availability tag */}
                            <div style={{ marginTop: "36px", display: "flex", alignItems: "center", gap: "10px" }}>
                                <motion.div
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(186,213,186,0.9)", flexShrink: 0 }}
                                />
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.35)" }}>
                                    Available for new projects
                                </span>
                            </div>
                        </div>

                        {/* RIGHT — dark form panel */}
                        <div className="contact-right" style={{ padding: "40px 0 40px 48px" }}>
                            <div style={{
                                background: "rgba(255,255,255,0.12)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderRadius: "16px",
                                padding: "36px 36px",
                                display: "flex", flexDirection: "column" as const, gap: "24px",
                                position: "relative", overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.2)",
                                boxShadow: "0 8px 40px rgba(20,38,48,0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
                            }}>
                                {/* Top glint */}
                                <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", pointerEvents: "none" }} />
                                {/* Inner orb */}
                                <div aria-hidden style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                                {/* Form label */}
                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.22)" }} />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.5)" }}>
                                        Send a Message
                                    </span>
                                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.22)" }} />
                                </div>

                                {/* Fields */}
                                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                    <Field id="first_name" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <Field id="last_name" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <Field id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Field id="subject" label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                <Field id="message" label="Message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />

                                {/* Submit */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)" }}>
                                        Reply within 24h
                                    </span>
                                    <motion.button
                                        onHoverStart={() => setHoverBtn(true)}
                                        onHoverEnd={() => setHoverBtn(false)}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSend}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "10px",
                                            background: hoverBtn ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.16)",
                                            border: `1px solid ${hoverBtn ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)"}`,
                                            borderRadius: "8px", padding: "12px 24px",
                                            cursor: "pointer",
                                            transition: "all 0.25s",
                                        }}
                                    >
                                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase" as const, color: hoverBtn ? "#F5F5F5" : "rgba(245,245,245,0.8)", transition: "color 0.25s" }}>
                                            Send
                                        </span>
                                        <motion.div animate={{ x: hoverBtn ? 3 : 0, y: hoverBtn ? -3 : 0 }} transition={{ duration: 0.2 }}>
                                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                                <path d="M1 11L11 1M11 1H4M11 1V8" stroke={hoverBtn ? "#F5F5F5" : "rgba(245,245,245,0.75)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <div className="contact-footer" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 44px 80px", display: "flex", alignItems: "center", gap: "20px" }}>
                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.08)" }} />
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.2)" }}>
                            Always Open to the Right Conversation
                        </span>
                        <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.08)" }} />
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </>
    )
}