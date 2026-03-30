import React from 'react'

function SelectionCard({ children, name, description, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col bg-white rounded-xl transition-all duration-200 text-left"
      style={{
        padding: '14px 12px 12px',
        border: isSelected ? '1.5px solid #0a0a0a' : '1px solid #e8e8e8',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = '#bbb'
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
          className="absolute top-2 right-2 rounded-full"
          style={{
            width: '7px',
            height: '7px',
            backgroundColor: '#0a0a0a',
          }}
        />
      )}

      {/* Preview Content */}
      <div className="w-full flex items-center justify-center mb-3">
        {children}
      </div>

      {/* Name */}
      <span
        className="block"
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: '#0a0a0a',
          marginBottom: '2px',
        }}
      >
        {name}
      </span>

      {/* Description */}
      <span
        className="block"
        style={{
          fontSize: '11px',
          color: '#888',
        }}
      >
        {description}
      </span>
    </button>
  )
}

export default SelectionCard
