import React from 'react'

// Sprocket film style - film strip with perforations on sides
export const sprocketBorderConfig = {
  id: 'sprocket',
  name: 'Film Strip',
  desc: 'Vintage 35mm look',
  padding: { top: 8, right: 24, bottom: 8, left: 24 },
  background: '#1a1a1a',
  borderRadius: 0,
  shadow: '0 4px 16px rgba(0,0,0,0.3)',
}

function SprocketBorder({ children, className = '' }) {
  return (
    <div
      className={`relative bg-[#1a1a1a] ${className}`}
      style={{
        padding: '8px 24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Left sprocket holes */}
      <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-2">
        {[...Array(8)].map((_, i) => (
          <div key={`l-${i}`} className="w-2 h-3 bg-black rounded-sm" />
        ))}
      </div>

      {/* Right sprocket holes */}
      <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-2">
        {[...Array(8)].map((_, i) => (
          <div key={`r-${i}`} className="w-2 h-3 bg-black rounded-sm" />
        ))}
      </div>

      {children}
    </div>
  )
}

// Preview component for template selection
export function SprocketPreview({ isSelected }) {
  const frameColor = isSelected ? 'bg-bg/20' : 'bg-[#1a1a1a]'
  const holeColor = isSelected ? 'bg-bg/40' : 'bg-black'
  const photoColor = isSelected ? 'bg-bg' : 'bg-ink'

  return (
    <div className={`relative px-3 py-1 ${frameColor} rounded-none`}>
      {/* Left holes */}
      <div className="absolute left-0.5 top-0 bottom-0 flex flex-col justify-around py-1">
        {[1, 2, 3].map((i) => (
          <div key={`l-${i}`} className={`w-1 h-1.5 ${holeColor} rounded-[1px]`} />
        ))}
      </div>
      {/* Right holes */}
      <div className="absolute right-0.5 top-0 bottom-0 flex flex-col justify-around py-1">
        {[1, 2, 3].map((i) => (
          <div key={`r-${i}`} className={`w-1 h-1.5 ${holeColor} rounded-[1px]`} />
        ))}
      </div>
      <div className={`w-8 h-6 sm:w-10 sm:h-8 ${photoColor} rounded-[1px]`} />
    </div>
  )
}

export default SprocketBorder
