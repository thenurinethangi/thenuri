"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion, Variants } from "framer-motion"
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
} from "react-icons/si"

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

const skills = [
    {
        title: "Frontend",
        items: [
            { name: "React", icon: <SiReact /> },
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        ],
    },
    {
        title: "Backend",
        items: [
            { name: "Node.js", icon: <SiNodedotjs /> },
            { name: "Express", icon: <SiExpress /> },
        ],
    },
    {
        title: "Database",
        items: [
            { name: "MongoDB", icon: <SiMongodb /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "Firebase", icon: <SiFirebase /> },
        ],
    },
    {
        title: "Tools",
        items: [
            { name: "Docker", icon: <SiDocker /> },
            { name: "Git", icon: <SiGit /> },
        ],
    },
]

export default function Skills() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="fixed inset-0 bg-gradient-to-b from-[#B0BEC5] to-[#90A4AE] text-white">
                <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
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

                    {/* Section Title */}
                    <div className="max-w-6xl mx-auto mb-23">
                        <h2 className="w-[100px] text-4xl md:text-6xl font-black font-space-grotesk tracking-tighter text-[#F5F5F5] drop-shadow-sm mb-4">
                            CORE EXPERTISE
                        </h2>
                        {/* <div className="mt-4 h-[1px] w-27 bg-white/40" /> */}
                    </div>

                    {/* Skills Groups */}
                    <div className="max-w-6xl mx-auto space-y-24">
                        {skills.map((group, index) => (
                            <div key={index}>
                                <h3 className="text-xl uppercase tracking-widest text-white/60 mb-10">
                                    {group.title}
                                </h3>

                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
                                >
                                    {group.items.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            variants={item}
                                            whileHover={{ y: -6 }}
                                            className="
                    group
                    relative
                    rounded-3xl
                    bg-white/5
                    backdrop-blur-xl
                    border border-white/10
                    p-8
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-6
                    transition-all
                    duration-500
                    hover:bg-white/10
                  "
                                        >
                                            <div className="text-5xl text-white/80 transition-transform duration-500 group-hover:scale-110">
                                                {skill.icon}
                                            </div>

                                            <span className="text-xs tracking-widest uppercase text-white/60">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Soft radial glow background */}
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
                </div>
            </section>

            {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
        </>
    )
}