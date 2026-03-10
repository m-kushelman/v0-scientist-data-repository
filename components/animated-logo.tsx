"use client"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(242, 166, 64, 0.3))",
        }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2A640" />
            <stop offset="100%" stopColor="#E85A4F" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2A640" />
            <stop offset="50%" stopColor="#E07A45" />
            <stop offset="100%" stopColor="#E85A4F" />
          </linearGradient>
        </defs>
        
        {/* Back diamond - orange dominant - spins clockwise */}
        <g className="animate-spin-slow" style={{ transformOrigin: "70px 100px" }}>
          <rect
            x="20"
            y="50"
            width="100"
            height="100"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="8"
            transform="rotate(45 70 100)"
            style={{
              filter: "drop-shadow(0 0 10px rgba(242, 166, 64, 0.5))",
            }}
          />
        </g>
        
        {/* Front diamond - coral dominant - spins counter-clockwise */}
        <g className="animate-spin-slow-reverse" style={{ transformOrigin: "130px 100px" }}>
          <rect
            x="80"
            y="50"
            width="100"
            height="100"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="8"
            transform="rotate(45 130 100)"
            style={{
              filter: "drop-shadow(0 0 10px rgba(232, 90, 79, 0.5))",
            }}
          />
        </g>
      </svg>
    </div>
  )
}
