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
      const breathe = Math.sin(frame * 0.015) * 12
      setOffset(breathe)
      // Gradient angle shift for shimmer effect
      setGradientAngle((frame * 0.4) % 360)
      requestAnimationFrame(animate)
    }
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Calculate gradient coordinates based on angle for shimmer
  const rad = (gradientAngle * Math.PI) / 180
  const x1 = 50 + 50 * Math.cos(rad)
  const y1 = 50 + 50 * Math.sin(rad)
  const x2 = 50 + 50 * Math.cos(rad + Math.PI)
  const y2 = 50 + 50 * Math.sin(rad + Math.PI)

  // Diamond path helper - creates a diamond shape rotated 45 degrees
  // cx, cy = center, size = width/height of the diamond
  const createDiamondPath = (cx: number, cy: number, size: number) => {
    const half = size / 2
    return `M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z`
  }

  return (
    <div className={`${className}`} style={{ overflow: 'visible' }}>
      <svg
        viewBox="-20 -20 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
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
            <stop offset="0%" stopColor="#F5A623" />
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
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Left diamond (positioned lower-left) */}
        <g 
          filter="url(#glow)"
          style={{
            transform: `translate(${-offset}px, ${offset * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            d={createDiamondPath(70, 130, 120)}
            fill="none"
            stroke="url(#leftGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Right diamond (positioned upper-right) */}
        <g 
          filter="url(#glow)"
          style={{
            transform: `translate(${offset}px, ${-offset * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <path
            d={createDiamondPath(130, 70, 120)}
            fill="none"
            stroke="url(#rightGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
