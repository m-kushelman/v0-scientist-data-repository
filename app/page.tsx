"use client"

import Link from "next/link"
import { AnimatedLogo } from "@/components/animated-logo"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      {/* Main content - Logo left, text right */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl w-full">
        
        {/* Large Logo on the left */}
        <div className="flex-shrink-0">
          <AnimatedLogo className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
        </div>

        {/* Title, tagline, and buttons on the right */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            style={{ color: "#ffffff" }}
          >
            parallax
          </h1>

          <p 
            className="text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-10"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            The missing half of science.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/search">
              <Button 
                size="lg"
                className="min-w-[160px] h-11 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 bg-spin-gradient text-white border-0"
              >
                Start Searching
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                size="lg"
                variant="outline"
                className="min-w-[160px] h-11 text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/50 border-white/30 bg-transparent text-white"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
