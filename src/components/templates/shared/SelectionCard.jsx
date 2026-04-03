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
        border: isSelected ? '2px solid #0a0a0a' : '1px solid #e8e8e8',
        borderRadius: '12px',
        minHeight,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        backgroundColor: '#ffffff',
        boxShadow: isSelected ? '0 0 0 3px rgba(10, 10, 10, 0.1)' : 'none',
        // Compensate for border width change to prevent layout shift
        margin: isSelected ? '0' : '0.5px',
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
      {/* Selection Checkmark Badge */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '22px',
            height: '22px',
            backgroundColor: '#0a0a0a',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
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
