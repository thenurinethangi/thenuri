"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import NavigationModal from "@/components/NavigationModal";
import Link from "next/link";

const skillsData = [
    { category: "Languages", icon: "💻", items: ["Java", "Python", "JavaScript (ES6+)", "TypeScript"] },
    { category: "Frontend", icon: "✨", items: ["React.js", "Next.js", "React Native", "Three.js", "Tailwind CSS", "HTML5", "CSS3"] },
    { category: "Backend", icon: "⚙️", items: ["Node.js", "Express.js", "Spring Boot", "Hibernate"] },
    { category: "Databases", icon: "🗄️", items: ["MySQL", "MongoDB", "Redis", "Firebase Firestore"] },
    { category: "Cloud", icon: "☁️", items: ["Docker", "Firebase Auth", "Firebase Hosting"] },
    { category: "Tools", icon: "🛠️", items: ["Git", "GitHub", "Postman", "Figma"] },
    { category: "Architecture", icon: "💡", items: ["REST APIs", "Microservices", "JWT Authentication", "Scalable System Design"] }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } }
};

export default function Skills() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="relative h-screen w-full bg-gradient-to-b from-[#B0BEC5] to-[#FFFFFF] overflow-hidden selection:bg-[#546E7A] selection:text-white flex justify-center">

            {/* Background Watermark effect - Huge Text */}
            <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <h1 className="text-[25vw] font-black font-space-grotesk whitespace-nowrap text-[#111111]">
                    SKILLS
                </h1>
            </div>

            {/* Navigation Header */}
            <div className="fixed top-9 left-12 z-50 cursor-pointer hover:scale-105 transition-transform duration-300">
                <Link href="/">
                    <svg width="43" height="43" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="46" stroke="#F5F5F5" strokeWidth="3" fill="#F5F5F5" />
                        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, sans-serif" fontSize="65" fontWeight="400" fill="#B0BEC5" letterSpacing="-2">
                            T.
                        </text>
                    </svg>
                </Link>
            </div>

            <div
                onClick={() => setIsModalOpen(true)}
                className="fixed z-50 top-9 right-11 cursor-pointer hover:scale-110 transition-transform duration-300"
            >
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <line x1="8" y1="15" x2="34" y2="15" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="8" y1="25" x2="34" y2="25" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 text-center shrink-0"
                >
                    <h2 className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tighter text-[#F5F5F5] drop-shadow-sm mb-4">
                        MY EXPERTISE
                    </h2>
                    <p className="text-[#546E7A] font-poppins text-lg max-w-2xl mx-auto">
                        A curated toolkit of modern technologies I use to build robust, scalable, and visually stunning applications.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-[1400px] auto-rows-max pb-32"
                >
                    {skillsData.map((group, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`p-6 md:p-8 rounded-[32px] bg-white/20 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col gap-6 transition-all duration-300 ${idx === 1 || idx === 6 ? 'md:col-span-2' : ''
                                } ${idx === 1 ? 'xl:col-span-3' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{group.icon}</span>
                                <h3 className="text-2xl font-black font-space-grotesk text-[#37474F] tracking-tight">
                                    {group.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {group.items.map((skill, sIdx) => (
                                    <motion.div
                                        key={sIdx}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, backgroundColor: "#F5F5F5", color: "#111111" }}
                                        className="px-4 py-2 bg-white/40 border border-white/60 rounded-full shadow-sm text-[#455A64] font-poppins text-sm md:text-base font-medium cursor-default transition-colors duration-300"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </main>
    );
}