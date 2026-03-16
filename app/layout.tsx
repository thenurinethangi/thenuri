import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PortfolioLoader from "@/components/PortfolioLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thenuri | Portfolio",
  description: "Thenuri Nanayakkara portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-portfolio-loader="checking">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.dataset.portfolioLoader=sessionStorage.getItem("portfolio_loaded")?"ready":"loading";}catch(e){document.documentElement.dataset.portfolioLoader="loading";}})();`,
          }}
        />
        <style>{`
          html[data-portfolio-loader="checking"] #portfolio-app-shell,
          html[data-portfolio-loader="loading"] #portfolio-app-shell {
            opacity: 0;
            pointer-events: none;
          }

          #portfolio-boot-loader {
            position: fixed;
            inset: 0;
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(160deg, #4A6374 0%, #5C7A8C 18%, #6F8E9F 35%, #87A5B5 52%, #A5BDC9 66%, #C2D2DA 79%, #DDE6EB 90%, #EFF3F5 100%);
            transition: opacity 0.35s ease;
          }

          #portfolio-boot-loader::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(40,58,70,0.22) 100%);
          }

          #portfolio-boot-loader::after {
            content: "";
            position: absolute;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(111,162,190,0.16) 0%, transparent 68%);
            filter: blur(18px);
          }

          html[data-portfolio-loader="ready"] #portfolio-boot-loader {
            opacity: 0;
            pointer-events: none;
          }
        `}</style>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="portfolio-boot-loader" aria-hidden>
          <svg width="44" height="44" viewBox="0 0 36 36" fill="none" style={{ position: "relative", zIndex: 1 }}>
            <rect x="0.75" y="0.75" width="34.5" height="34.5" rx="2.25" stroke="rgba(245,245,245,0.34)" strokeWidth="1.5" />
            <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="500" fill="rgba(245,245,245,0.92)">T</text>
          </svg>
        </div>
        <PortfolioLoader>
          {children}
        </PortfolioLoader>
      </body>
    </html>
  );
}
