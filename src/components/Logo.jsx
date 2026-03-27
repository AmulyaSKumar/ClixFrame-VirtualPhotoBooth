import React from 'react'

function Logo({ size = 'md', showText = true, className = '' }) {
  const sizes = {
    xs: { icon: 24, text: 'text-sm' },
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-3xl' },
    xl: { icon: 80, text: 'text-4xl' },
  }

  const { icon: iconSize, text: textSize } = sizes[size] || sizes.md

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Vintage Camera */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer Frame - Camera body */}
        <rect
          x="10"
          y="24"
          width="100"
          height="76"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-ink"
        />

        {/* Camera Lens - Outer */}
        <circle
          cx="60"
          cy="62"
          r="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-ink"
        />

        {/* Camera Lens - Inner */}
        <circle
          cx="60"
          cy="62"
          r="18"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-ink"
        />

        {/* Lens center */}
        <circle cx="60" cy="62" r="8" fill="currentColor" className="text-ink" />

        {/* Lens reflection */}
        <circle cx="56" cy="58" r="3" fill="currentColor" className="text-bg" />

        {/* Viewfinder */}
        <rect x="78" y="32" width="24" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-ink" />

        {/* Flash */}
        <rect x="18" y="32" width="16" height="12" fill="currentColor" className="text-ink" />

        {/* Camera top */}
        <rect x="40" y="14" width="40" height="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink" />

        {/* Shutter button */}
        <circle cx="70" cy="20" r="4" fill="currentColor" className="text-ink" />
      </svg>

      {/* Logo Text - Playfair Display */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-logo font-bold ${textSize} text-ink tracking-tight`}>
            Clixframe
          </span>
        </div>
      )}
    </div>
  )
}

// Compact version for photo strip watermark
export function LogoWatermark({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple camera outline */}
        <rect
          x="10"
          y="24"
          width="100"
          height="76"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-ink"
        />
        <circle
          cx="60"
          cy="62"
          r="24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-ink"
        />
        <circle cx="60" cy="62" r="10" fill="currentColor" className="text-ink" />
        <rect x="40" y="14" width="40" height="12" stroke="currentColor" strokeWidth="3" fill="none" className="text-ink" />
      </svg>
      <span className="font-logo text-xs sm:text-sm font-bold text-ink tracking-tight">
        Clixframe
      </span>
    </div>
  )
}

export default Logo
