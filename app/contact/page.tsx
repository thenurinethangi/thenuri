"use client"

import NavigationModal from "@/components/NavigationModal"
import { motion } from "framer-motion"
import { useState } from "react"
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa"
import { GoArrowUpRight } from "react-icons/go"

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="fixed inset-0 bg-gradient-to-b from-[#B0BEC5] to-[#90A4AE] text-white">
                {/* Background Glow */}
                <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

                {/* Fixed Navigation Hamburger */}
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

                <div className="absolute inset-0 w-full h-full overflow-y-auto px-6 md:px-16 pt-12 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between mt-12 md:mt-16 relative z-10">
                        {/* Left Side: Headlines & Socials */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="flex-1 flex flex-col justify-center"
                        >
                            <span className="text-sm font-bold tracking-[0.3em] text-[#F5F5F5] opacity-80 uppercase mb-8 ml-1">
                                Get In Touch
                            </span>

                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black font-space-grotesk tracking-tighter text-[#F5F5F5] leading-[0.85] mb-12 drop-shadow-sm">
                                LET'S <br /> CONNECT
                            </h1>

                            <p className="text-white/80 font-poppins text-lg md:text-xl max-w-lg mb-16 leading-relaxed">
                                Interested in working together or just want to say hi? I'm always open to discussing new projects and opportunities.
                            </p>

                            <div className="flex gap-4">
                                <a href="#" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#111111] flex justify-center items-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaEnvelope className="w-6 h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#111111] flex justify-center items-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#111111] flex justify-center items-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaGithub className="w-6 h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#111111] flex justify-center items-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaInstagram className="w-6 h-6" />
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#111111] flex justify-center items-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Side: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden w-full lg:max-w-[600px]"
                        >
                            <form className="relative z-10 flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>

                                <div className="flex flex-col md:flex-row gap-12 md:gap-8">
                                    <div className="flex flex-col gap-3 flex-1 relative group">
                                        <label htmlFor="first_name" className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold">First Name</label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-white font-poppins"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 flex-1 relative group">
                                        <label htmlFor="last_name" className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Last Name</label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-white font-poppins"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 relative group">
                                    <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-white font-poppins"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 relative group">
                                    <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Message</label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        className="w-full bg-transparent border-b border-white/30 pb-3 outline-none focus:border-white transition-colors text-white font-poppins resize-none"
                                    ></textarea>
                                </div>

                                <button className="self-start mt-4 flex items-center gap-2 text-[#F5F5F5] font-black uppercase tracking-widest text-lg md:text-xl hover:opacity-75 transition-opacity">
                                    Send Message <GoArrowUpRight className="w-6 h-6 stroke-1 inline" />
                                </button>
                            </form>

                            {/* Inner Form Glow */}
                            <div className="absolute -top-32 -right-32 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {isModalOpen && <NavigationModal onClose={() => setIsModalOpen(false)} />}
        </>
    )
}
