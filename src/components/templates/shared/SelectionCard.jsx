import React from 'react'

function SelectionCard({ children, name, description, isSelected, onClick, variant = 'layout' }) {
  // Min heights: layout = 160px, template = 200px
  const minHeight = variant === 'template' ? '200px' : '160px'

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col bg-white text-left"
      style={{
        padding: '14px 12px 12px',
        border: isSelected ? '1.5px solid #0a0a0a' : '1px solid #e8e8e8',
        borderRadius: '12px',
        minHeight,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
        backgroundColor: '#ffffff',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#aaa'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#e8e8e8'
        }
      }}
    >
      {/* Selection Dot */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '7px',
            height: '7px',
            backgroundColor: '#0a0a0a',
            borderRadius: '50%',
          }}
        />
      )}

      {/* Preview Content */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          flex: 1,
          marginBottom: '10px',
        }}
      >
        {children}
      </div>

      {/* Name */}
      <span
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 500,
          color: '#0a0a0a',
          marginTop: '10px',
        }}
      >
        {name}
      </span>

      {/* Description */}
      <span
        style={{
          display: 'block',
          fontSize: '11px',
          color: '#aaa',
          marginTop: '2px',
        }}
      >
        {description}
      </span>
    </button>
  )
}

export default SelectionCard
