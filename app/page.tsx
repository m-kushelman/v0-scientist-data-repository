"use client"

import Link from "next/link"
import { AnimatedLogo } from "@/components/animated-logo"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      {/* Subtle background effects with pulsing glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: "#F2A640" }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ backgroundColor: "#E85A4F", animationDelay: "1.5s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo and Title Row */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
          <AnimatedLogo className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ 
              color: "#ffffff",
              textShadow: "0 0 60px rgba(242, 166, 64, 0.3)"
            }}
          >
            parallax
          </h1>
        </div>

        {/* Tagline */}
        <p 
          className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-12"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          the missing half of science
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/search">
            <Button 
              size="lg"
              className="min-w-[180px] h-12 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 bg-spin-gradient text-white border-0"
            >
              Start Searching
            </Button>
          </Link>
          <Link href="/signup">
            <Button 
              size="lg"
              variant="outline"
              className="min-w-[180px] h-12 text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/50 border-white/30 bg-transparent text-white"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom subtle decoration */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ 
          background: "linear-gradient(90deg, transparent 0%, rgba(242, 166, 64, 0.3) 50%, transparent 100%)"
        }}
      />
    </div>
  )
}
