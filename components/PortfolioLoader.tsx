"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingScreen from "./LoadingScreen"

export default function PortfolioLoader({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<"checking" | "loading" | "ready">(() => {
        if (typeof document === "undefined") return "checking"
        return document.documentElement.dataset.portfolioLoader === "ready" ? "ready" : "loading"
    })

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("portfolio_loaded")
        const nextStatus = hasLoaded ? "ready" : "loading"
        document.documentElement.dataset.portfolioLoader = nextStatus
        setStatus(nextStatus)
    }, [])

    const handleComplete = () => {
        sessionStorage.setItem("portfolio_loaded", "1")
        document.documentElement.dataset.portfolioLoader = "ready"
        setStatus("ready")
    }

    return (
        <>
            <AnimatePresence>
                {status === "loading" && (
                    <LoadingScreen key="loader" onComplete={handleComplete} />
                )}
            </AnimatePresence>
            <div
                id="portfolio-app-shell"
                style={{
                    opacity: status === "ready" ? 1 : 0,
                    transition: "opacity 0.45s ease",
                }}
            >
                {children}
            </div>
        </>
    )
}
