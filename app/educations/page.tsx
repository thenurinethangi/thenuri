"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { FaGraduationCap, FaCertificate, FaAward } from "react-icons/fa"

const educationData = [
    {
        id: 1,
        type: "degree",
        icon: <FaGraduationCap className="w-6 h-6" />,
        year: "2020 - 2024",
        title: "Bachelor of Science in Software Engineering",
        institution: "University of Technology, Sydney",
        description: "Graduated with Honors. Specialized in distributed systems and artificial intelligence. Led the university coding club and organized three hackathons.",
    },
    {
        id: 2,
        type: "certificate",
        icon: <FaCertificate className="w-6 h-6" />,
        year: "2023",
        title: "AWS Certified Solutions Architect",
        institution: "Amazon Web Services",
        description: "Demonstrated proficiency in designing scalable, highly available, and fault-tolerant systems on AWS.",
    },
    {
        id: 3,
        type: "degree",
        icon: <FaGraduationCap className="w-6 h-6" />,
        year: "2018 - 2020",
        title: "Advanced Diploma in Information Technology",
        institution: "Tech Institute of Excellence",
        description: "Valedictorian. Built foundational skills in web development, database management, and network security.",
    },
    {
        id: 4,
        type: "award",
        icon: <FaAward className="w-6 h-6" />,
        year: "2019",
        title: "First Place - National App Challenge",
        institution: "Tech Innovations Council",
        description: "Developed an award-winning mobile application focused on sustainable urban commuting.",
    },
]

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
}

export default function Educations() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="fixed inset-0 bg-gradient-to-b from-[#B0BEC5] to-[#90A4AE] text-white">
                <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div
                    onClick={() => setIsModalOpen(true)}
                    className="fixed z-50 top-9 right-11 cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="8" y1="15" x2="34" y2="15" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="8" y1="25" x2="34" y2="25" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="absolute inset-0 w-full h-full overflow-y-auto px-6 md:px-16 pt-32 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="max-w-4xl mx-auto relative z-10 w-full pl-0 md:pl-20">
                        {/* Section Title */}
                        <div className="mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tighter text-[#F5F5F5] drop-shadow-sm uppercase"
                            >
                                Education & <br /> Qualifications
                            </motion.h2>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="hidden md:block absolute left-[27px] top-4 bottom-4 w-[2px] bg-white/20 rounded-full" />

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="space-y-12"
                            >
                                {educationData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        className="relative flex flex-col md:flex-row gap-8 md:gap-14 group"
                                    >
                                        {/* Timeline Dot & Icon (Desktop) */}
                                        <div className="hidden md:flex flex-col items-center z-10">
                                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border-[2px] border-white/40 flex justify-center items-center text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:bg-white group-hover:text-[#90A4AE] group-hover:scale-110">
                                                {item.icon}
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 shadow-xl relative overflow-hidden">

                                            {/* Mobile Icon */}
                                            <div className="md:hidden w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex justify-center items-center text-white mb-6">
                                                {item.icon}
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                <h3 className="text-2xl font-bold text-white/90 font-space-grotesk tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <span className="shrink-0 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase text-white/70 whitespace-nowrap">
                                                    {item.year}
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-semibold text-white/60 mb-4 font-poppins">
                                                {item.institution}
                                            </h4>

                                            <p className="text-white/70 leading-relaxed font-poppins">
                                                {item.description}
                                            </p>

                                            {/* Subtle Hover Glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
        </>
    )
}
