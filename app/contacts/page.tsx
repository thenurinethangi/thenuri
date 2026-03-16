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
    { icon: <FaEnvelope />, label: "Email", sub: "thenurinathangi@gmail.com", href: "mailto:thenurinathangi@gmail.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", sub: "/in/thenurinanayakkara", href: "https://www.linkedin.com/in/thenurinanayakkara/" },
    { icon: <FaGithub />, label: "GitHub", sub: "/thenurinethangi", href: "https://github.com/thenurinethangi" },
    { icon: <FaInstagram />, label: "Instagram", sub: "@thenuri__7", href: "https://www.instagram.com/thenuri__7/" },
    { icon: <FaFacebook />, label: "Facebook", sub: "@thenuri__7", href: "https://www.facebook.com/thenuri__7/" },
]

/* ─────────────────────────────────────────────
   UNDERLINE FIELD — cleaner than box inputs
───────────────────────────────────────────── */
function Field({
    id, label, type = "text", rows, value, onChange,
}: {
    id: string; label: string; type?: string; rows?: number
    value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
    const [focused, setFocused] = useState(false)
    const hasValue = value.length > 0

    const inputStyle: React.CSSProperties = {
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${focused ? "rgba(245,245,245,0.55)" : "rgba(245,245,245,0.15)"}`,
        padding: "10px 0 10px",
        outline: "none",
        color: "rgba(245,245,245,0.92)",
        fontFamily: "'DM Mono', monospace",
        fontSize: "11.5px",
        letterSpacing: "0.05em",
        transition: "border-color 0.25s",
        resize: "none" as const,
        boxSizing: "border-box" as const,
        caretColor: "rgba(171,205,219,0.9)",
    }

    return (
        <div style={{ position: "relative", paddingTop: "18px" }}>
            {/* floating label */}
            <label htmlFor={id} style={{
                position: "absolute",
                top: focused || hasValue ? "0px" : "28px",
                left: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: focused || hasValue ? "8px" : "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase" as const,
                color: focused ? "rgba(171,205,219,0.8)" : "rgba(245,245,245,0.35)",
                transition: "all 0.22s ease",
                pointerEvents: "none",
            }}>
                {label}
            </label>
            {rows
                ? <textarea id={id} rows={rows} style={inputStyle} value={value}
                    onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                : <input id={id} type={type} style={inputStyle} value={value}
                    onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            }
            {/* animated underline accent */}
            <motion.div
                animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                    position: "absolute", bottom: 0, left: 0,
                    width: "100%", height: "1px",
                    background: "rgba(171,205,219,0.75)",
                    transformOrigin: "left",
                }}
            />
        </div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hoverBtn, setHoverBtn] = useState(false)
    const [sent, setSent] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName]   = useState("")
    const [email, setEmail]         = useState("")
    const [subject, setSubject]     = useState("")
    const [message, setMessage]     = useState("")

    const handleSend = (e: React.MouseEvent) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 3000)
        setFirstName(""); setLastName(""); setEmail(""); setSubject(""); setMessage("")
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
                .contact-scroll::-webkit-scrollbar { display: none; }
                .contact-scroll { -ms-overflow-style: none; scrollbar-width: none; }

                .social-row:hover .social-label { color: rgba(245,245,245,0.85) !important; }
                .social-row:hover .social-sub   { color: rgba(171,205,219,0.65) !important; }
                .social-row:hover .social-icon  { color: rgba(245,245,245,0.7) !important; }
                .social-row:hover .social-arrow { opacity: 1 !important; transform: translate(2px,-2px) !important; }

                @media (max-width: 860px) {
                    .contact-body { grid-template-columns: 1fr !important; }
                    .contact-left { border-right: none !important; padding-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; padding-bottom: 48px !important; }
                    .form-row     { grid-template-columns: 1fr !important; }
                    .page-wrap    { padding: 120px 24px 80px !important; }
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

                {/* ── NAV — identical to original ── */}
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
                <div className="contact-scroll" style={{ position: "absolute", inset: 0, overflowY: "auto", zIndex: 10 }}>
                    <div className="page-wrap" style={{ maxWidth: "1060px", margin: "0 auto", padding: "130px 44px 100px" }}>

                        {/* ── PAGE LABEL ── */}
                        <motion.p
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.4)", margin: "0 0 20px 0" }}
                        >
                            — Get In Touch
                        </motion.p>

                        {/* ── HERO HEADING + pull quote ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" as const, marginBottom: "40px" }}
                        >
                            <h1 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(54px, 9vw, 108px)",
                                lineHeight: 0.88, letterSpacing: "-0.02em",
                                color: "#F5F5F5", margin: 0,
                                textShadow: "0 2px 40px rgba(20,38,48,0.2)",
                            }}>
                                Let's<br />Connect
                            </h1>
                            <p style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 300, fontStyle: "italic",
                                fontSize: "clamp(15px, 1.5vw, 19px)",
                                lineHeight: 1.7,
                                color: "rgba(245,245,245,0.5)",
                                maxWidth: "320px",
                                margin: "0 0 10px 0",
                            }}>
                                Building something? Let's talk. I take on select projects where precision and scale actually matter.
                            </p>
                        </motion.div>

                        {/* Full-width rule */}
                        <motion.div
                            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "52px", transformOrigin: "left" }}
                        />

                        {/* ── BODY: socials LEFT | form RIGHT ── */}
                        <motion.div
                            className="contact-body"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "0" }}
                        >
                            {/* ══ LEFT — socials ══ */}
                            <div className="contact-left" style={{
                                borderRight: "1px solid rgba(255,255,255,0.08)",
                                paddingRight: "52px",
                                display: "flex", flexDirection: "column" as const, justifyContent: "space-between",
                            }}>
                                <div>
                                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.25)", margin: "0 0 28px 0" }}>
                                        Find me on
                                    </p>

                                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
                                        {socials.map((s, i) => (
                                            <motion.a
                                                key={i}
                                                href={s.href}
                                                target="_blank" rel="noreferrer"
                                                className="social-row"
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.65 + i * 0.07, duration: 0.45 }}
                                                style={{
                                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                                    padding: "16px 0",
                                                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                                                    textDecoration: "none", cursor: "pointer",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                    {/* icon in a tiny box */}
                                                    <div style={{
                                                        width: "30px", height: "30px",
                                                        border: "1px solid rgba(245,245,245,0.1)",
                                                        borderRadius: "6px",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        background: "rgba(255,255,255,0.04)",
                                                        flexShrink: 0,
                                                        transition: "all 0.2s",
                                                    }}>
                                                        <span className="social-icon" style={{ fontSize: "11px", color: "rgba(245,245,245,0.32)", transition: "color 0.2s" }}>{s.icon}</span>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
                                                        <span className="social-label" style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.52)", transition: "color 0.2s" }}>
                                                            {s.label}
                                                        </span>
                                                        <span className="social-sub" style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.08em", color: "rgba(245,245,245,0.22)", transition: "color 0.2s" }}>
                                                            {s.sub}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="social-arrow" style={{ opacity: 0.18, transition: "opacity 0.2s, transform 0.2s" }}>
                                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                        <path d="M1 11L11 1M11 1H4M11 1V8" stroke="rgba(245,245,245,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* availability pill */}
                                {/* <div style={{ marginTop: "40px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 16px", border: "1px solid rgba(186,213,186,0.2)", borderRadius: "6px", background: "rgba(186,213,186,0.06)", width: "fit-content" }}>
                                    <motion.div
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                        style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(186,213,186,0.9)", flexShrink: 0 }}
                                    />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(186,213,186,0.65)" }}>
                                        Available for new projects
                                    </span>
                                </div> */}
                            </div>

                            {/* ══ RIGHT — form ══ */}
                            <div style={{ paddingLeft: "52px" }}>

                                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.25)", margin: "0 0 36px 0" }}>
                                    Send a Message
                                </p>

                                <div style={{ display: "flex", flexDirection: "column" as const, gap: "28px" }}>
                                    {/* Name row */}
                                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                                        <Field id="first_name" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        <Field id="last_name"  label="Last Name"  value={lastName}  onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <Field id="email"   label="Email Address" type="email" value={email}   onChange={(e) => setEmail(e.target.value)} />
                                    <Field id="subject" label="Subject"                    value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    <Field id="message" label="Message"        rows={4}    value={message} onChange={(e) => setMessage(e.target.value)} />
                                </div>

                                {/* Submit row */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.3)" }}>
                                        Reply within 24h
                                    </span>

                                    <AnimatePresence mode="wait">
                                        {sent ? (
                                            <motion.div
                                                key="sent"
                                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                                            >
                                                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                                    <path d="M2 7l4 4 6-6" stroke="rgba(186,213,186,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(186,213,186,0.8)" }}>
                                                    Sent
                                                </span>
                                            </motion.div>
                                        ) : (
                                            <motion.button
                                                key="btn"
                                                onHoverStart={() => setHoverBtn(true)}
                                                onHoverEnd={() => setHoverBtn(false)}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={handleSend}
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "10px",
                                                    background: hoverBtn ? "rgba(171,205,219,0.15)" : "rgba(255,255,255,0.07)",
                                                    border: `1px solid ${hoverBtn ? "rgba(171,205,219,0.4)" : "rgba(255,255,255,0.15)"}`,
                                                    borderRadius: "7px", padding: "12px 22px",
                                                    cursor: "pointer", transition: "all 0.25s",
                                                }}
                                            >
                                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9.5px", letterSpacing: "0.24em", textTransform: "uppercase" as const, color: hoverBtn ? "#F5F5F5" : "rgba(245,245,245,0.72)", transition: "color 0.25s" }}>
                                                    Send Message
                                                </span>
                                                <motion.div animate={{ x: hoverBtn ? 3 : 0, y: hoverBtn ? -3 : 0 }} transition={{ duration: 0.2 }}>
                                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                        <path d="M1 11L11 1M11 1H4M11 1V8" stroke={hoverBtn ? "#F5F5F5" : "rgba(245,245,245,0.6)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </motion.div>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── FOOTER ── */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ marginTop: "64px", display: "flex", alignItems: "center", gap: "20px" }}
                        >
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.07)" }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(245,245,245,0.2)" }}>
                                Always Open to the Right Conversation
                            </span>
                            <div style={{ flex: 1, height: "1px", background: "rgba(245,245,245,0.07)" }} />
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