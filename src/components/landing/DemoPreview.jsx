import React, { useState, useEffect } from 'react'

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
        <div className="photo-strip w-full mx-auto p-2 sm:p-2.5" style={{ transform: 'rotate(-2deg)' }}>
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
                {/* Photo number overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-paper">
                  <span className="font-hero text-lg sm:text-xl md:text-2xl text-ink">
                    {['I', 'II', 'III', 'IV'][index]}
                  </span>
                </div>

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
