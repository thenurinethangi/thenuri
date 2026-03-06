"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = ["Home", "About", "Projects", "Skills", "Education", "Contacts"];

export default function NavigationModal({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.35, delay: 0.15 } },
  };

  const panelVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 18,
        staggerChildren: 0.07,
        delayChildren: 0.25,
      },
    },
    exit: {
      x: "100%",
      transition: { type: "tween", duration: 0.32, ease: [0.4, 0, 1, 1] },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          background: "rgba(35, 52, 62, 0.25)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <motion.aside
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 100,
          height: "100svh",
          width: "clamp(280px, 38vw, 420px)",
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(32px) saturate(1.4)",
          WebkitBackdropFilter: "blur(32px) saturate(1.4)",
          borderLeft: "1px solid rgba(255,255,255,0.22)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 44px 40px",
        }}
      >
        {/* Top row — index label + close */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(245,245,245,0.38)",
            }}
          >
            Menu
          </span>

          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 0,
            }}
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="1" y1="1" x2="17" y2="17" stroke="rgba(245,245,245,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="1" x2="1" y2="17" stroke="rgba(245,245,245,0.7)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {navItems.map((item, i) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === path;

            return (
              <Link href={path} key={i} onClick={onClose} style={{ textDecoration: "none" }}>
                <motion.div
                  variants={itemVariants}
                  whileHover="hovered"
                  initial="rest"
                  animate="rest"
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  {/* Index number */}
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      color: isActive ? "rgba(245,245,245,0.6)" : "rgba(245,245,245,0.22)",
                      flexShrink: 0,
                      transition: "color 0.25s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <motion.span
                    variants={{
                      rest: { x: 0 },
                      hovered: { x: -4 },
                    }}
                    transition={{ duration: 0.22 }}
                    style={{
                      flex: 1,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: isActive ? 400 : 300,
                      fontStyle: isActive ? "italic" : "normal",
                      fontSize: "clamp(28px, 4vw, 38px)",
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                      color: isActive ? "rgba(245,245,245,0.95)" : "rgba(245,245,245,0.45)",
                      transition: "color 0.25s, font-style 0.25s",
                    }}
                  >
                    {item}
                  </motion.span>

                  {/* Arrow — only on active or hover */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0, x: 6 },
                      hovered: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="rgba(245,245,245,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.12)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.28)",
                lineHeight: 1.6,
              }}
            >
              Thenuri<br />
              <span style={{ opacity: 0.6 }}>© {new Date().getFullYear()}</span>
            </span>

            {/* Social links */}
            <div style={{ display: "flex", gap: "18px" }}>
              {["GH", "LI", "TW"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "rgba(245,245,245,0.3)",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.75)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.3)")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}