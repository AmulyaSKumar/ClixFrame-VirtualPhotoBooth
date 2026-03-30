import React from 'react'

// Double border style - nested frames for elegant look
export const doubleBorderConfig = {
  id: 'double',
  name: 'Double Frame',
  desc: 'Elegant nested border',
  padding: { top: 16, right: 16, bottom: 16, left: 16 },
  background: '#FFFFFF',
  borderRadius: 2,
  shadow: '0 2px 12px rgba(0,0,0,0.1)',
  innerBorder: '2px solid #e5e5e5',
  outerBorder: '3px solid #0D0D0D',
}

function DoubleBorder({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-sm ${className}`}
      style={{
        padding: '6px',
        border: '3px solid #0D0D0D',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          padding: '10px',
          border: '2px solid #e5e5e5',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Preview component for template selection
export function DoubleBorderPreview({ isSelected }) {
  const outerBorder = isSelected ? 'border-bg' : 'border-ink'
  const innerBorder = isSelected ? 'border-bg/40' : 'border-ink/20'
  const photoColor = isSelected ? 'bg-bg' : 'bg-ink'

  return (
    <div className={`p-1 border-2 ${outerBorder} rounded-[2px]`}>
      <div className={`p-1.5 border ${innerBorder}`}>
        <div className={`w-6 h-5 sm:w-8 sm:h-6 ${photoColor} rounded-[1px]`} />
      </div>
    </div>
  )
}

export default DoubleBorder
