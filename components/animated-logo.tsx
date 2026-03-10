"use client"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  // Diamond measurements - all rotated 45 degrees
  // Diamond A is the largest
  // Diamond B is 4/5 of A, shares top corner with A
  // Diamond C is 4/5 of B, formed by a parallelogram that:
  //   - Shares its full edge with A's top-right edge
  //   - Intersects B to form diamond C at B's right corner
  //   - Continues to meet A's bottom-right edge

  const sizeA = 200 // Diamond A side length (larger)
  const sizeB = sizeA * 0.8 // Diamond B = 4/5 of A = 160
  const sizeC = sizeB * 0.8 // Diamond C = 4/5 of B = 128

  // For a diamond (square rotated 45°), the half-diagonal = side * sqrt(2) / 2
  const sqrt2 = Math.SQRT2
  const halfDiagA = (sizeA * sqrt2) / 2
  const halfDiagB = (sizeB * sqrt2) / 2
  const halfDiagC = (sizeC * sqrt2) / 2

  // Center point for Diamond A
  const centerAx = 180
  const centerAy = 180

  // Diamond A corners (top, right, bottom, left)
  const aTop = { x: centerAx, y: centerAy - halfDiagA }
  const aRight = { x: centerAx + halfDiagA, y: centerAy }
  const aBottom = { x: centerAx, y: centerAy + halfDiagA }
  const aLeft = { x: centerAx - halfDiagA, y: centerAy }

  // Diamond B shares TOP corner with A
  // So B's top = A's top, and B is centered below that point
  const centerBx = aTop.x
  const centerBy = aTop.y + halfDiagB
  
  const bTop = aTop // Shared with A
  const bRight = { x: centerBx + halfDiagB, y: centerBy }
  const bBottom = { x: centerBx, y: centerBy + halfDiagB }
  const bLeft = { x: centerBx - halfDiagB, y: centerBy }

  // Diamond C is 4/5 of B and is centered at B's right corner
  // The parallelogram creates C where it intersects B
  const centerCx = bRight.x + halfDiagC
  const centerCy = bRight.y
  
  const cTop = { x: centerCx, y: centerCy - halfDiagC }
  const cRight = { x: centerCx + halfDiagC, y: centerCy }
  const cBottom = { x: centerCx, y: centerCy + halfDiagC }
  const cLeft = bRight // C's left = B's right

  // The parallelogram that forms Diamond C:
  // - Top edge runs along A's top-right edge (from A's top to A's right)
  // - Has width equal to C's diagonal (to form diamond C inside B)
  // - Bottom edge connects to A's bottom-right edge (from A's right to A's bottom)
  
  // Parallelogram corners:
  // Top-left: A's top corner
  // Top-right: offset from A's top by the parallelogram width perpendicular to A's edge
  // This creates a band along A's top-right and bottom-right edges

  // Width of parallelogram (perpendicular to edge) = halfDiagC * sqrt2 to create diamond C
  const bandWidth = sizeC / sqrt2

  // The parallelogram follows A's right edges
  // Top-left start at A's top
  // Offset perpendicular to the top-right edge (which goes down-right at 45°)
  // Perpendicular direction is up-right (45° rotated)
  
  const perpX = bandWidth / sqrt2
  const perpY = -bandWidth / sqrt2

  const para = {
    p1: aTop, // Start at A's top
    p2: { x: aTop.x + perpX, y: aTop.y - perpY }, // Offset perpendicular (towards top-right)
    p3: { x: aBottom.x + perpX, y: aBottom.y - perpY }, // Follow down to A's bottom level
    p4: aBottom, // End at A's bottom
  }

  return (
    <div className={`${className}`} style={{ overflow: 'visible' }}>
      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Orange/Gold gradient */}
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#E8893C" />
          </linearGradient>
          
          {/* Coral/Red gradient */}
          <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="50%" stopColor="#E8713C" />
            <stop offset="100%" stopColor="#E85A4F" />
          </linearGradient>
        </defs>

        {/* Diamond A - Largest outer diamond */}
        <path
          d={`M ${aTop.x} ${aTop.y} L ${aRight.x} ${aRight.y} L ${aBottom.x} ${aBottom.y} L ${aLeft.x} ${aLeft.y} Z`}
          fill="none"
          stroke="url(#orangeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Diamond B - Medium, shares top corner with A */}
        <path
          d={`M ${bTop.x} ${bTop.y} L ${bRight.x} ${bRight.y} L ${bBottom.x} ${bBottom.y} L ${bLeft.x} ${bLeft.y} Z`}
          fill="none"
          stroke="url(#orangeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Parallelogram that creates Diamond C - runs along A's right edges through B */}
        <path
          d={`M ${para.p1.x} ${para.p1.y} L ${para.p2.x} ${para.p2.y} L ${para.p3.x} ${para.p3.y} L ${para.p4.x} ${para.p4.y} Z`}
          fill="none"
          stroke="url(#coralGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
