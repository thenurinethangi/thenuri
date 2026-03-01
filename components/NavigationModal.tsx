"use client";

import { motion, Variants } from "framer-motion";

export default function NavigationModal({ onClose }: { onClose: () => void }) {
    const navItems = ["Home", "Projects", "Skills", "Education", "Contacts"];

    // Animation settings for the whole menu sliding in
    const menuVariants: Variants = {
        hidden: { x: "100%", borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%" },
        visible: {
            x: 0,
            borderTopLeftRadius: "0%",
            borderBottomLeftRadius: "0%",
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
                staggerChildren: 0.1, // Wait and stagger each child item
                delayChildren: 0.15
            }
        },
        exit: {
            x: "100%",
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            transition: { type: "tween", duration: 0.3, ease: "easeInOut" }
        }
    };

    // Animation settings for each individual link
    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.main
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 right-0 z-[100] h-screen w-[300px] md:w-[340px] overflow-hidden bg-white/20 backdrop-blur-2xl border-l border-white/40 flex justify-center items-center shadow-[0_0_40px_rgba(0,0,0,0.1)]"
        >
            {/* Close Button */}
            <div className="absolute top-8 right-8 cursor-pointer hover:scale-110 transition-transform p-3 bg-white/30 rounded-full shadow-sm hover:bg-white/50 backdrop-blur-md" onClick={() => onClose()}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="6"
                        y1="6"
                        x2="26"
                        y2="26"
                        stroke="#263238"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="26"
                        y1="6"
                        x2="6"
                        y2="26"
                        stroke="#263238"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-10 text-center w-full px-8">
                {navItems.map((item, index) => (
                    <motion.p
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, color: "#111111", x: -8 }}
                        className="text-[36px] md:text-[42px] font-black text-[#546E7A] font-space-grotesk cursor-pointer transition-colors drop-shadow-sm"
                    >
                        {item}
                    </motion.p>
                ))}
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center text-[#78909C] text-sm font-poppins opacity-70">
                — Navigate to Explore —
            </div>
        </motion.main>
    );
}