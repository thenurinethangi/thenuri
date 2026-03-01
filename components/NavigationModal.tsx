"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationModal({ onClose }: { onClose: () => void }) {
    const navItems = ["Home", "About", "Projects", "Skills", "Education", "Contacts"];
    const pathname = usePathname();

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
            <div className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition-transform p-3 bg-white/30 rounded-full shadow-sm hover:bg-white/50 backdrop-blur-md" onClick={() => onClose()}>
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
            <div className="flex flex-col gap-6 w-full px-8">
                {navItems.map((item, index) => {
                    const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                    const isActive = pathname === path;

                    return (
                        <Link href={path} key={index} onClick={() => onClose()} className="block">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, x: -8 }}
                                className="relative flex justify-center w-full group"
                            >
                                <div className="relative inline-flex items-center">
                                    {/* Active glowing indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            className="absolute -left-6 md:-left-8 w-2 md:w-2.5 h-2 md:h-2.5 bg-[#263238] rounded-full shadow-[0_0_12px_rgba(38,50,56,0.9)]"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        />
                                    )}
                                    <span
                                        className={`text-[36px] md:text-[42px] font-black font-space-grotesk cursor-pointer transition-all duration-300 drop-shadow-sm ${isActive
                                                ? "text-[#111111] translate-x-2"
                                                : "text-[#78909C] group-hover:text-[#263238]"
                                            }`}
                                    >
                                        {item}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center text-[#78909C] text-sm font-poppins opacity-70">
                — Navigate to Explore —
            </div>
        </motion.main>
    );
}