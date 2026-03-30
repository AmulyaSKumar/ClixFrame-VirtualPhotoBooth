import React from 'react'

// Slot color for layout previews
const SLOT_COLOR = '#d4d4d4'
const SLOT_BORDER = '#c4c4c4'

// 1. Classic Strip - 4 photos stacked vertically
export function ClassicStripPreview({ width = 50, height = 100 }) {
  const slotHeight = (height - 12) / 4
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="4"
          y={4 + i * (slotHeight + 2)}
          width={width - 8}
          height={slotHeight - 2}
          fill={SLOT_COLOR}
          stroke={SLOT_BORDER}
          strokeWidth="0.5"
          rx="2"
        />
      ))}
    </svg>
  )
}

// 2. Grid 2x2 - 4 photos in square grid
export function Grid2x2Preview({ width = 80, height = 80 }) {
  const slotSize = (width - 14) / 2
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 1].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={4 + col * (slotSize + 4)}
            y={4 + row * (slotSize + 4)}
            width={slotSize}
            height={slotSize}
            fill={SLOT_COLOR}
            stroke={SLOT_BORDER}
            strokeWidth="0.5"
            rx="2"
          />
        ))
      )}
    </svg>
  )
}

// 3. Wide Strip - 4 photos side by side
export function WideStripPreview({ width = 120, height = 40 }) {
  const slotWidth = (width - 18) / 4
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={4 + i * (slotWidth + 3)}
          y="4"
          width={slotWidth}
          height={height - 8}
          fill={SLOT_COLOR}
          stroke={SLOT_BORDER}
          strokeWidth="0.5"
          rx="2"
        />
      ))}
    </svg>
  )
}

// 4. Big + Two - 1 large left, 2 small stacked right
export function BigPlusTwoPreview({ width = 100, height = 70 }) {
  const bigWidth = width * 0.6 - 6
  const smallWidth = width * 0.4 - 6
  const smallHeight = (height - 12) / 2
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Big photo left */}
      <rect
        x="4"
        y="4"
        width={bigWidth}
        height={height - 8}
        fill={SLOT_COLOR}
        stroke={SLOT_BORDER}
        strokeWidth="0.5"
        rx="2"
      />
      {/* Small photos right */}
      <rect
        x={bigWidth + 8}
        y="4"
        width={smallWidth}
        height={smallHeight}
        fill={SLOT_COLOR}
        stroke={SLOT_BORDER}
        strokeWidth="0.5"
        rx="2"
      />
      <rect
        x={bigWidth + 8}
        y={smallHeight + 8}
        width={smallWidth}
        height={smallHeight}
        fill={SLOT_COLOR}
        stroke={SLOT_BORDER}
        strokeWidth="0.5"
        rx="2"
      />
    </svg>
  )
}

// 5. Filmstrip - 6 photos with sprocket holes
export function FilmstripPreview({ width = 50, height = 110 }) {
  const slotHeight = (height - 20) / 6
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Dark background */}
      <rect x="0" y="0" width={width} height={height} fill="#222" rx="2" />

      {/* Sprocket holes left */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <rect
          key={`l-${i}`}
          x="3"
          y={6 + i * 9.5}
          width="4"
          height="6"
          fill="#111"
          rx="1"
        />
      ))}

      {/* Sprocket holes right */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <rect
          key={`r-${i}`}
          x={width - 7}
          y={6 + i * 9.5}
          width="4"
          height="6"
          fill="#111"
          rx="1"
        />
      ))}

      {/* Photo slots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="10"
          y={6 + i * (slotHeight + 1.5)}
          width={width - 20}
          height={slotHeight - 1}
          fill={SLOT_COLOR}
          rx="1"
        />
      ))}
    </svg>
  )
}

// 6. Single Portrait - 1 large centered photo
export function SinglePortraitPreview({ width = 60, height = 90 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect
        x="6"
        y="6"
        width={width - 12}
        height={height - 12}
        fill={SLOT_COLOR}
        stroke={SLOT_BORDER}
        strokeWidth="0.5"
        rx="3"
      />
    </svg>
  )
}

// 7. Three Wide - 3 photos side by side
export function ThreeWidePreview({ width = 110, height = 45 }) {
  const slotWidth = (width - 14) / 3
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={4 + i * (slotWidth + 3)}
          y="4"
          width={slotWidth}
          height={height - 8}
          fill={SLOT_COLOR}
          stroke={SLOT_BORDER}
          strokeWidth="0.5"
          rx="2"
        />
      ))}
    </svg>
  )
}

// 8. Hero + Row - 1 large top, 3 small bottom
export function HeroRowPreview({ width = 100, height = 80 }) {
  const heroHeight = height * 0.55 - 6
  const smallHeight = height * 0.45 - 6
  const smallWidth = (width - 14) / 3
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Hero photo top */}
      <rect
        x="4"
        y="4"
        width={width - 8}
        height={heroHeight}
        fill={SLOT_COLOR}
        stroke={SLOT_BORDER}
        strokeWidth="0.5"
        rx="2"
      />
      {/* Small photos bottom */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={4 + i * (smallWidth + 3)}
          y={heroHeight + 8}
          width={smallWidth}
          height={smallHeight}
          fill={SLOT_COLOR}
          stroke={SLOT_BORDER}
          strokeWidth="0.5"
          rx="2"
        />
      ))}
    </svg>
  )
}

// Export all layouts with metadata
export const layoutOptions = [
  {
    id: 'classic-strip',
    name: 'Classic strip',
    description: '4 photos stacked vertically',
    preview: ClassicStripPreview,
    photos: 4,
  },
  {
    id: 'grid-2x2',
    name: 'Grid 2×2',
    description: '4 photos in a square grid',
    preview: Grid2x2Preview,
    photos: 4,
  },
  {
    id: 'wide-strip',
    name: 'Wide strip',
    description: '4 photos side by side',
    preview: WideStripPreview,
    photos: 4,
  },
  {
    id: 'big-plus-two',
    name: 'Big + two',
    description: '1 large, 2 small stacked',
    preview: BigPlusTwoPreview,
    photos: 3,
  },
  {
    id: 'filmstrip',
    name: 'Filmstrip',
    description: '6 photos with sprocket holes',
    preview: FilmstripPreview,
    photos: 6,
  },
  {
    id: 'single-portrait',
    name: 'Single portrait',
    description: '1 large photo centered',
    preview: SinglePortraitPreview,
    photos: 1,
  },
  {
    id: 'three-wide',
    name: 'Three wide',
    description: '3 photos horizontally',
    preview: ThreeWidePreview,
    photos: 3,
  },
  {
    id: 'hero-row',
    name: 'Hero + row',
    description: '1 large top, 3 small below',
    preview: HeroRowPreview,
    photos: 4,
  },
]
