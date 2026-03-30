import React from 'react'

// Background color variations for different photos
const bgVariants = [
  '#e8e4df', // warm tan
  '#dfe4e8', // cool blue-grey
  '#e2e8df', // sage green
  '#e8dfe4', // dusty rose
  '#e4e4e4', // neutral grey
]

function PersonPlaceholder({ variant = 0, width = 60, height = 80, className = '' }) {
  const bg = bgVariants[variant % bgVariants.length]

  // Scale factors based on dimensions
  const scaleX = width / 60
  const scaleY = height / 80

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 80"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect width="60" height="80" fill={bg} />

      {/* Hair */}
      <ellipse cx="30" cy="22" rx="14" ry="12" fill="#4a4a4a" />

      {/* Face */}
      <ellipse cx="30" cy="28" rx="11" ry="13" fill="#e8c99a" />

      {/* Eyes */}
      <circle cx="25" cy="26" r="1.5" fill="#3a3a3a" />
      <circle cx="35" cy="26" r="1.5" fill="#3a3a3a" />

      {/* Smile */}
      <path
        d="M26 32 Q30 35 34 32"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Body/Shoulders */}
      <ellipse cx="30" cy="65" rx="20" ry="22" fill="#c9b8a8" />
    </svg>
  )
}

export default PersonPlaceholder
