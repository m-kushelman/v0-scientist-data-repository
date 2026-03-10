"use client"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        <defs>
          {/* Animated gradient for the back diamond (orange to coral) */}
          <linearGradient id="gradientBack" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2A640">
              <animate
                attributeName="stop-color"
                values="#F2A640;#E07A45;#F2A640"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#E07A45">
              <animate
                attributeName="stop-color"
                values="#E07A45;#F2A640;#E07A45"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          {/* Animated gradient for the front diamond (coral to orange) */}
          <linearGradient id="gradientFront" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E07A45">
              <animate
                attributeName="stop-color"
                values="#E07A45;#E85A4F;#E07A45"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#E85A4F">
              <animate
                attributeName="stop-color"
                values="#E85A4F;#E07A45;#E85A4F"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Back diamond (left/bottom) - orange */}
        <rect
          x="30"
          y="50"
          width="90"
          height="90"
          fill="none"
          stroke="url(#gradientBack)"
          strokeWidth="8"
          transform="rotate(45 75 95)"
        />
        
        {/* Front diamond (right/top) - coral */}
        <rect
          x="80"
          y="50"
          width="90"
          height="90"
          fill="none"
          stroke="url(#gradientFront)"
          strokeWidth="8"
          transform="rotate(45 125 95)"
        />
      </svg>
    </div>
  )
}
