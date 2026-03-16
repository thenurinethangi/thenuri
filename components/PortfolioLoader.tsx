"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingScreen from "./LoadingScreen"

export default function PortfolioLoader({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<"checking" | "loading" | "ready">("checking")

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("portfolio_loaded")
        setStatus(hasLoaded ? "ready" : "loading")
    }, [])

    const handleComplete = () => {
        sessionStorage.setItem("portfolio_loaded", "1")
        setStatus("ready")
    }

    if (status === "checking") {
        return (
            <div
                aria-hidden
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9998,
                    background: "linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%)",
                }}
            />
        )
    }

    return (
        <>
            <AnimatePresence>
                {status === "loading" && (
                    <LoadingScreen key="loader" onComplete={handleComplete} />
                )}
            </AnimatePresence>
            {status === "ready" ? children : null}
        </>
    )
}
