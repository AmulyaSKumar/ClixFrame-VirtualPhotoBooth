import React from 'react'

// Clean white style - minimal white border, modern look
export const cleanWhiteBorderConfig = {
  id: 'clean-white',
  name: 'Clean White',
  desc: 'Minimal modern',
  padding: { top: 10, right: 10, bottom: 10, left: 10 },
  background: '#FFFFFF',
  borderRadius: 8,
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
}

function CleanWhiteBorder({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-lg ${className}`}
      style={{
        padding: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {children}
    </div>
  )
}

// Preview component for template selection
export function CleanWhitePreview({ isSelected }) {
  const bgColor = isSelected ? 'bg-bg/20' : 'bg-white'
  const photoColor = isSelected ? 'bg-bg' : 'bg-ink'
  const shadow = isSelected ? '' : 'shadow-sm'

  return (
    <div className={`p-1.5 rounded-md ${bgColor} ${shadow}`}>
      <div className={`w-8 h-6 sm:w-10 sm:h-8 ${photoColor} rounded-[3px]`} />
    </div>
  )
}

export default CleanWhiteBorder
