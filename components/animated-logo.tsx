"use client"

import { useEffect, useState } from "react"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  const [breathe, setBreathe] = useState(0)
  const [gradientOffset, setGradientOffset] = useState(0)

  useEffect(() => {
    let frame = 0
    const animate = () => {
      frame++
      // Breathing animation for subtle movement
      setBreathe(Math.sin(frame * 0.02) * 8)
      // Gradient shift for shimmer
      setGradientOffset((frame * 0.5) % 360)
      requestAnimationFrame(animate)
    }
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Gradient coordinates for shimmer effect
  const rad = (gradientOffset * Math.PI) / 180
  const g1 = { x1: 50 + 40 * Math.cos(rad), y1: 50 + 40 * Math.sin(rad), x2: 50 + 40 * Math.cos(rad + Math.PI), y2: 50 + 40 * Math.sin(rad + Math.PI) }

  // Diamond measurements
  // Diamond A is the largest, B is 4/5 of A, C is 4/5 of B
  const sizeA = 140 // Diamond A side length
  const sizeB = sizeA * 0.8 // Diamond B = 4/5 of A
  const sizeC = sizeB * 0.8 // Diamond C = 4/5 of B

  // For a diamond rotated 45 degrees, half-diagonal = size / sqrt(2) * sqrt(2)/2 = size/2
  const halfA = sizeA / 2
  const halfB = sizeB / 2
  const halfC = sizeC / 2

  // Position Diamond A - center it
  const aTop = { x: 100, y: 30 }  // Top corner of A
  const aRight = { x: 100 + halfA, y: 30 + halfA }
  const aBottom = { x: 100, y: 30 + sizeA }
  const aLeft = { x: 100 - halfA, y: 30 + halfA }

  // Diamond B shares TOP corner with A
  const bTop = aTop  // Same top corner
  const bRight = { x: bTop.x + halfB, y: bTop.y + halfB }
  const bBottom = { x: bTop.x, y: bTop.y + sizeB }
  const bLeft = { x: bTop.x - halfB, y: bTop.y + halfB }

  // Diamond C shares RIGHTMOST corner with B
  const cLeft = bRight  // C's left corner = B's right corner
  const cTop = { x: cLeft.x + halfC, y: cLeft.y - halfC }
  const cRight = { x: cLeft.x + sizeC, y: cLeft.y }
  const cBottom = { x: cLeft.x + halfC, y: cLeft.y + halfC }

  // Create diamond path from 4 corners
  const diamondPath = (top: {x: number, y: number}, right: {x: number, y: number}, bottom: {x: number, y: number}, left: {x: number, y: number}) => 
    `M ${top.x} ${top.y} L ${right.x} ${right.y} L ${bottom.x} ${bottom.y} L ${left.x} ${left.y} Z`

  return (
    <div className={`${className}`} style={{ overflow: 'visible' }}>
      <svg
        viewBox="0 0 250 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Orange/Gold gradient for left diamonds (A and B) */}
          <linearGradient
            id="orangeGradient"
            x1={`${g1.x1}%`}
            y1={`${g1.y1}%`}
            x2={`${g1.x2}%`}
            y2={`${g1.y2}%`}
          >
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="50%" stopColor="#E8893C" />
            <stop offset="100%" stopColor="#D4702C" />
          </linearGradient>
          
          {/* Coral/Red gradient for right diamond (C) */}
          <linearGradient
            id="coralGradient"
            x1={`${g1.x2}%`}
            y1={`${g1.y2}%`}
            x2={`${g1.x1}%`}
            y2={`${g1.y1}%`}
          >
            <stop offset="0%" stopColor="#E85A4F" />
            <stop offset="50%" stopColor="#E8713C" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>

          {/* Subtle glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Diamond A - Largest, outer diamond */}
        <g 
          filter="url(#glow)"
          style={{
            transform: `translate(${-breathe * 0.3}px, ${breathe * 0.3}px)`,
          }}
        >
          <path
            d={diamondPath(aTop, aRight, aBottom, aLeft)}
            fill="none"
            stroke="url(#orangeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Diamond B - Medium, shares top with A */}
        <g 
          filter="url(#glow)"
          style={{
            transform: `translate(${breathe * 0.2}px, ${-breathe * 0.2}px)`,
          }}
        >
          <path
            d={diamondPath(bTop, bRight, bBottom, bLeft)}
            fill="none"
            stroke="url(#orangeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Diamond C - Smallest, shares left corner with B's right */}
        <g 
          filter="url(#glow)"
          style={{
            transform: `translate(${breathe * 0.5}px, ${-breathe * 0.1}px)`,
          }}
        >
          <path
            d={diamondPath(cTop, cRight, cBottom, cLeft)}
            fill="none"
            stroke="url(#coralGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
