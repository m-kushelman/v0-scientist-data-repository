"use client"

import { useEffect, useState } from "react"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  const [offset, setOffset] = useState(0)
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    let frame = 0
    const animate = () => {
      frame++
      // Breathing animation: diamonds move apart and back together
      const breathe = Math.sin(frame * 0.012) * 15
      setOffset(breathe)
      // Gradient angle shift for shimmer effect
      setGradientAngle((frame * 0.3) % 360)
      requestAnimationFrame(animate)
    }
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Calculate gradient coordinates based on angle
  const rad = (gradientAngle * Math.PI) / 180
  const x1 = 50 + 50 * Math.cos(rad)
  const y1 = 50 + 50 * Math.sin(rad)
  const x2 = 50 + 50 * Math.cos(rad + Math.PI)
  const y2 = 50 + 50 * Math.sin(rad + Math.PI)

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Left diamond gradient - gold to orange with dynamic rotation */}
          <linearGradient
            id="leftGradient"
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
          >
            <stop offset="0%" stopColor="#F5B041" />
            <stop offset="50%" stopColor="#E8893C" />
            <stop offset="100%" stopColor="#D4702C" />
          </linearGradient>
          
          {/* Right diamond gradient - coral to orange with dynamic rotation */}
          <linearGradient
            id="rightGradient"
            x1={`${x2}%`}
            y1={`${y2}%`}
            x2={`${x1}%`}
            y2={`${y1}%`}
          >
            <stop offset="0%" stopColor="#E85A4F" />
            <stop offset="50%" stopColor="#E8713C" />
            <stop offset="100%" stopColor="#F2A640" />
          </linearGradient>

          {/* Subtle glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Left diamond (bottom-left) - pulls down-left when separating */}
        <g filter="url(#glow)">
          <rect
            x="25"
            y="60"
            width="85"
            height="85"
            rx="3"
            fill="none"
            stroke="url(#leftGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `translate(${-offset}px, ${offset}px) rotate(45deg)`,
              transformOrigin: '67.5px 102.5px',
            }}
          />
        </g>

        {/* Right diamond (top-right) - pulls up-right when separating */}
        <g filter="url(#glow)">
          <rect
            x="90"
            y="55"
            width="85"
            height="85"
            rx="3"
            fill="none"
            stroke="url(#rightGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `translate(${offset}px, ${-offset}px) rotate(45deg)`,
              transformOrigin: '132.5px 97.5px',
            }}
          />
        </g>
      </svg>
    </div>
  )
}
