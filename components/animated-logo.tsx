"use client"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  // Diamond A: Largest outer diamond (square rotated 45°)
  // Diamond B: 4/5 of A, shares TOP corner with A
  // Rectangle: Parallel to A's top-right edge, creates Diamond C (4/5 of B) where it intersects B
  //            Starts at A's top-right edge, passes through B, meets A's bottom-right edge

  const sizeA = 200
  const sizeB = sizeA * 0.8 // 160
  const sizeC = sizeB * 0.8 // 128 - the diamond formed by rectangle intersecting B

  const sqrt2 = Math.SQRT2
  const halfDiagA = (sizeA * sqrt2) / 2 // ~141.4
  const halfDiagB = (sizeB * sqrt2) / 2 // ~113.1
  const halfDiagC = (sizeC * sqrt2) / 2 // ~90.5

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

  // Rectangle parallel to A's top-right edge
  // A's top-right edge goes from aTop to aRight (direction: down-right at 45°)
  // The rectangle's long axis is parallel to this edge
  // 
  // The rectangle should:
  // 1. Have one long edge aligned with A's top-right edge
  // 2. Pass through B, creating Diamond C (4/5 of B) at B's right corner area
  // 3. Continue to A's bottom-right edge
  //
  // Width of rectangle (perpendicular to the edge) determines Diamond C size
  // For Diamond C to be 4/5 of B: width = sizeC (the side length, not diagonal)
  
  const rectWidth = sizeC / sqrt2 // Width perpendicular to the 45° edge

  // Direction along A's top-right edge (normalized): (1/sqrt2, 1/sqrt2)
  // Perpendicular direction (inward, toward center): (-1/sqrt2, 1/sqrt2)
  const perpDirX = -1 / sqrt2
  const perpDirY = 1 / sqrt2

  // Rectangle corners:
  // Outer edge aligns with A's top-right edge (from aTop to aRight)
  // Then offset inward by rectWidth to form inner edge
  // Extend the rectangle to also cover A's bottom-right edge (from aRight to aBottom)
  
  // So the rectangle spans from aTop along A's right side to aBottom
  const rect = {
    // Outer corners (on A's right edges)
    p1: aTop,
    p2: aBottom,
    // Inner corners (offset inward by rectWidth)
    p3: { x: aBottom.x + perpDirX * rectWidth, y: aBottom.y + perpDirY * rectWidth },
    p4: { x: aTop.x + perpDirX * rectWidth, y: aTop.y + perpDirY * rectWidth },
  }

  return (
    <div className={`${className}`} style={{ overflow: 'visible' }}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Orange/Gold gradient for Diamond A */}
          <linearGradient id="gradientA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#E8893C" />
          </linearGradient>
          
          {/* Orange gradient for Diamond B */}
          <linearGradient id="gradientB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#E87D3C" />
          </linearGradient>
          
          {/* Coral/Red gradient for Rectangle */}
          <linearGradient id="gradientRect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8713C" />
            <stop offset="100%" stopColor="#E85A4F" />
          </linearGradient>
        </defs>

        {/* Diamond A - Largest outer diamond */}
        <path
          d={`M ${aTop.x} ${aTop.y} L ${aRight.x} ${aRight.y} L ${aBottom.x} ${aBottom.y} L ${aLeft.x} ${aLeft.y} Z`}
          fill="none"
          stroke="url(#gradientA)"
          strokeWidth="12"
          strokeLinejoin="round"
        />

        {/* Diamond B - 4/5 of A, shares top corner */}
        <path
          d={`M ${bTop.x} ${bTop.y} L ${bRight.x} ${bRight.y} L ${bBottom.x} ${bBottom.y} L ${bLeft.x} ${bLeft.y} Z`}
          fill="none"
          stroke="url(#gradientB)"
          strokeWidth="12"
          strokeLinejoin="round"
        />

        {/* Rectangle - parallel to A's right edges, creates Diamond C where it intersects B */}
        <path
          d={`M ${rect.p1.x} ${rect.p1.y} L ${rect.p2.x} ${rect.p2.y} L ${rect.p3.x} ${rect.p3.y} L ${rect.p4.x} ${rect.p4.y} Z`}
          fill="none"
          stroke="url(#gradientRect)"
          strokeWidth="12"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
