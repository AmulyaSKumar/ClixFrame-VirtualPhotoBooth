import React from 'react'

// Polaroid style - thick white border with extra space at bottom
export const polaroidBorderConfig = {
  id: 'polaroid',
  name: 'Polaroid',
  desc: 'Classic instant film',
  padding: { top: 12, right: 12, bottom: 40, left: 12 },
  background: '#FFFFFF',
  borderRadius: 4,
  shadow: '0 4px 20px rgba(0,0,0,0.15)',
}

function PolaroidBorder({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-sm shadow-lg ${className}`}
      style={{
        padding: '12px 12px 40px 12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      {children}
    </div>
  )
}

// Preview component for template selection
export function PolaroidPreview({ isSelected }) {
  const bgColor = isSelected ? 'bg-bg' : 'bg-ink'
  const borderColor = isSelected ? 'border-bg/30' : 'border-ink/20'

  return (
    <div className={`p-1.5 pb-3 rounded-sm ${isSelected ? 'bg-bg/20' : 'bg-white'} border ${borderColor}`}>
      <div className={`w-8 h-6 sm:w-10 sm:h-8 ${bgColor} rounded-[1px]`} />
    </div>
  )
}

export default PolaroidBorder
