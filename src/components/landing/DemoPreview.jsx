import React, { useState, useEffect } from 'react'

// Placeholder portraits using CSS gradients and shapes
const placeholderStyles = [
  { bg: 'linear-gradient(135deg, #e8e8e8 0%, #d4d4d4 100%)', accent: '#a0a0a0' },
  { bg: 'linear-gradient(135deg, #f0ece4 0%, #e0dcd4 100%)', accent: '#b8b0a0' },
  { bg: 'linear-gradient(135deg, #e4e8ec 0%, #d4d8dc 100%)', accent: '#a0a8b0' },
  { bg: 'linear-gradient(135deg, #ece8e4 0%, #dcd8d4 100%)', accent: '#b0a8a0' },
]

function PlaceholderPhoto({ index, isActive }) {
  const style = placeholderStyles[index]

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: style.bg }}
    >
      {/* Silhouette shape */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Head */}
        <div
          className="absolute rounded-full"
          style={{
            width: '35%',
            paddingBottom: '35%',
            background: style.accent,
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.6,
          }}
        />
        {/* Shoulders */}
        <div
          className="absolute rounded-t-full"
          style={{
            width: '70%',
            height: '45%',
            background: style.accent,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Subtle texture lines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
          color: '#000',
        }}
      />

      {/* Active indicator glow */}
      {isActive && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  )
}

function DemoPreview({ className = '' }) {
  const [activePhoto, setActivePhoto] = useState(0)

  // Animate through photos
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Photo Strip - Editorial Style */}
      <div className="relative animate-float-slow">
        <div
          className="photo-strip w-full mx-auto p-2 sm:p-2.5"
          style={{ transform: 'rotate(-2deg)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          {/* ClixFrame branding */}
          <div className="text-center pb-1 sm:pb-1.5 mb-1.5 sm:mb-2 border-b border-dashed border-ink/30">
            <span className="font-logo text-[10px] sm:text-xs text-ink tracking-wide">Clixframe</span>
          </div>

          {/* Photo slots */}
          <div className="space-y-1 sm:space-y-1.5">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`photo-strip-slot relative transition-all duration-500 ${
                  index === activePhoto ? 'ring-1 sm:ring-2 ring-ink ring-offset-1 sm:ring-offset-2' : ''
                }`}
              >
                <PlaceholderPhoto index={index} isActive={index === activePhoto} />

                {/* Shimmer effect on active */}
                {index === activePhoto && (
                  <div className="absolute inset-0 shimmer" />
                )}
              </div>
            ))}
          </div>

          {/* Footer branding */}
          <div className="text-center pt-1.5 sm:pt-2 mt-1.5 sm:mt-2 border-t border-dashed border-ink/30">
            <span className="font-typewriter text-[8px] sm:text-[9px] text-mid tracking-widest uppercase">
              clixframe.app
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoPreview
