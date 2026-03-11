"use client"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  // Diamond A: Largest outer diamond (square rotated 45°)
  // Diamond B: 4/5 of A, shares TOP corner with A
  // Rectangle: Wide rectangle using A's top-right edge as one side, extends outward

  const sizeA = 200
  const sizeB = sizeA * 0.8 // 160

  const sqrt2 = Math.SQRT2
  const halfDiagA = (sizeA * sqrt2) / 2 // ~141.4
  const halfDiagB = (sizeB * sqrt2) / 2 // ~113.1

  // Center of Diamond A
  const centerAx = 200
  const centerAy = 200

  // Diamond A corners
  const aTop = { x: centerAx, y: centerAy - halfDiagA }
  const aRight = { x: centerAx + halfDiagA, y: centerAy }
  const aBottom = { x: centerAx, y: centerAy + halfDiagA }
  const aLeft = { x: centerAx - halfDiagA, y: centerAy }

  // Diamond B shares TOP corner with A, centered below that
  const centerBx = aTop.x
  const centerBy = aTop.y + halfDiagB

  const bTop = aTop
  const bRight = { x: centerBx + halfDiagB, y: centerBy }
  const bBottom = { x: centerBx, y: centerBy + halfDiagB }
  const bLeft = { x: centerBx - halfDiagB, y: centerBy }

  // Rectangle that overlaps the diamonds - flipped over the top-right edge
  const edgeDirX = -1 / sqrt2
  const edgeDirY = -1 / sqrt2
  const perpInX = -1 / sqrt2
  const perpInY = 1 / sqrt2
  // rectWidth so leftmost corner (p3) is at same height as small diamond's left/right corners (centerBy)
  const rectWidth = (centerBy - (aRight.y + edgeDirY * sizeB)) * sqrt2

  const rect = {
    p1: aRight,
    p2: { x: aRight.x + edgeDirX * sizeB, y: aRight.y + edgeDirY * sizeB },
    p3: {
      x: aRight.x + edgeDirX * sizeB + perpInX * rectWidth,
      y: aRight.y + edgeDirY * sizeB + perpInY * rectWidth,
    },
    p4: { x: aRight.x + perpInX * rectWidth, y: aRight.y + perpInY * rectWidth },
  }

  return (
    <div className={`${className}`} style={{ overflow: "visible" }}>
      <style>{`
        /* Timeline: 0-10% assembled | 10-18% separate+shrink | 18-55% helix orbit | 55-65% rejoin+grow | 65-100% assembled */
        /* Helix: 3 shapes at 120° apart orbit around vertical pole, with spiral drift */
        @keyframes logo-helix-a {
          0%, 10% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          16% { transform: translate(70px, -15px) scale(0.32) rotate(20deg); opacity: 0.9; }
          18% { transform: translate(80px, 0px) scale(0.28) rotate(30deg); opacity: 0.8; }
          28% { transform: translate(0px, 88px) scale(0.28) rotate(120deg); opacity: 0.8; }
          38% { transform: translate(-80px, 18px) scale(0.28) rotate(210deg); opacity: 0.8; }
          48% { transform: translate(0px, -72px) scale(0.28) rotate(300deg); opacity: 0.8; }
          55% { transform: translate(70px, -15px) scale(0.32) rotate(360deg); opacity: 0.9; }
          65%, 100% { transform: translate(0, 0) scale(1) rotate(360deg); opacity: 1; }
        }
        @keyframes logo-helix-b {
          0%, 10% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          16% { transform: translate(-40px, 68px) scale(0.32) rotate(20deg); opacity: 0.9; }
          18% { transform: translate(-40px, 69px) scale(0.28) rotate(30deg); opacity: 0.8; }
          28% { transform: translate(-40px, -61px) scale(0.28) rotate(120deg); opacity: 0.8; }
          38% { transform: translate(40px, -61px) scale(0.28) rotate(210deg); opacity: 0.8; }
          48% { transform: translate(40px, 69px) scale(0.28) rotate(300deg); opacity: 0.8; }
          55% { transform: translate(-40px, 68px) scale(0.32) rotate(360deg); opacity: 0.9; }
          65%, 100% { transform: translate(0, 0) scale(1) rotate(360deg); opacity: 1; }
        }
        @keyframes logo-helix-rect {
          0%, 10% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          16% { transform: translate(-40px, -68px) scale(0.32) rotate(20deg); opacity: 0.9; }
          18% { transform: translate(-40px, -69px) scale(0.28) rotate(30deg); opacity: 0.8; }
          28% { transform: translate(40px, -69px) scale(0.28) rotate(120deg); opacity: 0.8; }
          38% { transform: translate(40px, 61px) scale(0.28) rotate(210deg); opacity: 0.8; }
          48% { transform: translate(-40px, 61px) scale(0.28) rotate(300deg); opacity: 0.8; }
          55% { transform: translate(-40px, -68px) scale(0.32) rotate(360deg); opacity: 0.9; }
          65%, 100% { transform: translate(0, 0) scale(1) rotate(360deg); opacity: 1; }
        }
        .logo-shape-a {
          transform-origin: 200px 200px;
          animation: logo-helix-a 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .logo-shape-b {
          transform-origin: 200px 200px;
          animation: logo-helix-b 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .logo-shape-rect {
          transform-origin: 200px 200px;
          animation: logo-helix-rect 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Same gradient as Start Searching button: #F2A640 to #E85A4F */}
          <linearGradient id="logoGradientAnimated" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2A640" />
            <stop offset="50%" stopColor="#ED7B4A" />
            <stop offset="100%" stopColor="#E85A4F" />
            <animate attributeName="x1" values="0%;15%;0%;20%;0%" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="y1" values="100%;85%;100%;80%;100%" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="x2" values="100%;85%;100%;80%;100%" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="0%;15%;0%;20%;0%" dur="2.5s" repeatCount="indefinite" />
          </linearGradient>
        </defs>

        <g className="logo-shape-a">
          <path
            d={`M ${aTop.x} ${aTop.y} L ${aRight.x} ${aRight.y} L ${aBottom.x} ${aBottom.y} L ${aLeft.x} ${aLeft.y} Z`}
            fill="none"
            stroke="url(#logoGradientAnimated)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>
        <g className="logo-shape-b">
          <path
            d={`M ${bTop.x} ${bTop.y} L ${bRight.x} ${bRight.y} L ${bBottom.x} ${bBottom.y} L ${bLeft.x} ${bLeft.y} Z`}
            fill="none"
            stroke="url(#logoGradientAnimated)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>
        <g className="logo-shape-rect">
          <path
            d={`M ${rect.p1.x} ${rect.p1.y} L ${rect.p2.x} ${rect.p2.y} L ${rect.p3.x} ${rect.p3.y} L ${rect.p4.x} ${rect.p4.y} Z`}
            fill="none"
            stroke="url(#logoGradientAnimated)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
