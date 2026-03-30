import React from 'react'
import PersonPlaceholder from './PersonPlaceholder'

const SLOT_COLOR = '#d4d4d4'
const SLOT_BORDER = '#c4c4c4'

// ============================================
// MINIMAL TEMPLATES
// ============================================

// 1. Clean White - thin black border
export function CleanWhitePreview({ width = 120, height = 90 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      <rect
        x="8"
        y="8"
        width={width - 16}
        height={height - 16}
        fill={SLOT_COLOR}
        stroke="#0a0a0a"
        strokeWidth="1"
        rx="1"
      />
    </svg>
  )
}

// 2. Thin Black - slightly thicker black border
export function ThinBlackPreview({ width = 120, height = 90 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      <rect
        x="8"
        y="8"
        width={width - 16}
        height={height - 16}
        fill={SLOT_COLOR}
        stroke="#0a0a0a"
        strokeWidth="2"
        rx="1"
      />
    </svg>
  )
}

// 3. Double Frame - nested borders
export function DoubleFramePreview({ width = 120, height = 90 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      {/* Outer border */}
      <rect
        x="6"
        y="6"
        width={width - 12}
        height={height - 12}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="2"
        rx="1"
      />
      {/* Inner border */}
      <rect
        x="12"
        y="12"
        width={width - 24}
        height={height - 24}
        fill={SLOT_COLOR}
        stroke="#ccc"
        strokeWidth="1"
        rx="1"
      />
    </svg>
  )
}

// 4. Arch Top - rounded arch at top
export function ArchTopPreview({ width = 120, height = 90 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#fff" />
      <path
        d={`M12,${height - 8} V28 Q12,8 ${width / 2},8 Q${width - 12},8 ${width - 12},28 V${height - 8} Z`}
        fill={SLOT_COLOR}
        stroke="#0a0a0a"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// ============================================
// NEWSPAPER TEMPLATES
// ============================================

// 5. Front Page
export function FrontPagePreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: '4px',
        overflow: 'hidden',
      }}
    >
      {/* Double rule top */}
      <div style={{ borderTop: '2px double #0a0a0a', marginBottom: '2px' }} />

      {/* Masthead */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textAlign: 'center',
          color: '#0a0a0a',
          textTransform: 'uppercase',
        }}
      >
        THE CLIXFRAME TIMES
      </div>

      {/* Double rule bottom */}
      <div style={{ borderBottom: '2px double #0a0a0a', marginTop: '2px', marginBottom: '3px' }} />

      {/* Date line */}
      <div
        style={{
          fontSize: '5px',
          color: '#777',
          textAlign: 'center',
          letterSpacing: '0.08em',
          marginBottom: '4px',
        }}
      >
        PHOTO EDITION · VOL. I
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {/* Left column - photos */}
        <div style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <PersonPlaceholder variant={0} width={48} height={38} />
          <PersonPlaceholder variant={1} width={48} height={38} />
        </div>

        {/* Right column - text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '7px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#0a0a0a',
              marginBottom: '3px',
            }}
          >
            Breaking News Headline Here
          </div>
          <div
            style={{
              fontSize: '5px',
              lineHeight: 1.4,
              color: '#555',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
          </div>
        </div>
      </div>
    </div>
  )
}

// 6. Strip Edition
export function StripEditionPreview({ width = 130, height = 90 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '5px',
          color: '#777',
          marginBottom: '4px',
          borderBottom: '0.5px solid #aaa',
          paddingBottom: '2px',
        }}
      >
        <span>The Daily</span>
        <span style={{ fontWeight: 700, fontSize: '7px', color: '#0a0a0a' }}>CLIXFRAME</span>
        <span>Vol. I</span>
      </div>

      {/* Photos */}
      <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginBottom: '3px' }}>
        {[0, 1, 2, 3].map((i) => (
          <PersonPlaceholder key={i} variant={i} width={26} height={32} />
        ))}
      </div>

      {/* Captions */}
      <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
        {['I', 'II', 'III', 'IV'].map((num, i) => (
          <div
            key={i}
            style={{
              width: '26px',
              fontSize: '5px',
              fontStyle: 'italic',
              color: '#777',
              textAlign: 'center',
            }}
          >
            Fig. {num}
          </div>
        ))}
      </div>
    </div>
  )
}

// 7. Dark Edition
export function DarkEditionPreview({ width = 120, height = 100 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#111',
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: '6px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Headline */}
      <div
        style={{
          fontSize: '8px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '4px',
        }}
      >
        Evening Edition
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        <PersonPlaceholder variant={2} width={55} height={60} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              fontSize: '5px',
              color: '#888',
              lineHeight: 1.4,
            }}
          >
            Lorem ipsum dolor sit amet
          </div>
          <PersonPlaceholder variant={3} width={40} height={28} />
        </div>
      </div>
    </div>
  )
}

// 8. 3-Column Gazette
export function GazettePreview({ width = 130, height = 110 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: 'hidden',
      }}
    >
      {/* Banner */}
      <div
        style={{
          backgroundColor: '#0a0a0a',
          color: '#fff',
          fontSize: '7px',
          fontWeight: 700,
          textAlign: 'center',
          padding: '3px 4px',
          letterSpacing: '0.1em',
        }}
      >
        THE CLIXFRAME GAZETTE
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: '5px',
          color: '#888',
          textAlign: 'center',
          padding: '2px',
          borderBottom: '0.5px solid #ddd',
        }}
      >
        All the moments fit to print
      </div>

      {/* Columns */}
      <div style={{ display: 'flex', gap: '3px', padding: '4px' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <PersonPlaceholder variant={i} width={34} height={42} />
            <div
              style={{
                fontSize: '5px',
                fontStyle: 'italic',
                color: '#777',
                marginTop: '2px',
              }}
            >
              Portrait No. {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// POLAROID TEMPLATES
// ============================================

// 9. Classic Polaroid
export function ClassicPolaroidPreview({ width = 90, height = 110 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        padding: '6px 6px 20px 6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <PersonPlaceholder variant={0} width={width - 12} height={height - 32} />
      <div
        style={{
          fontSize: '6px',
          fontStyle: 'italic',
          color: '#777',
          textAlign: 'center',
          marginTop: '4px',
          fontFamily: "Georgia, serif",
        }}
      >
        Summer '24
      </div>
    </div>
  )
}

// 10. Scattered Duo
export function ScatteredDuoPreview({ width = 120, height = 90 }) {
  return (
    <div style={{ width, height, position: 'relative' }}>
      {/* Polaroid 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5px',
          top: '10px',
          width: '55px',
          backgroundColor: '#fff',
          padding: '4px 4px 14px 4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          transform: 'rotate(-4deg)',
        }}
      >
        <PersonPlaceholder variant={0} width={47} height={40} />
      </div>

      {/* Polaroid 2 */}
      <div
        style={{
          position: 'absolute',
          right: '5px',
          top: '5px',
          width: '55px',
          backgroundColor: '#fff',
          padding: '4px 4px 14px 4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
          transform: 'rotate(3deg)',
        }}
      >
        <PersonPlaceholder variant={1} width={47} height={40} />
      </div>
    </div>
  )
}

// 11. Wide Polaroid
export function WidePolaroidPreview({ width = 120, height = 85 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        padding: '5px 5px 16px 5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <PersonPlaceholder variant={2} width={width - 10} height={height - 28} />
      <div
        style={{
          fontSize: '6px',
          fontStyle: 'italic',
          color: '#777',
          textAlign: 'center',
          marginTop: '3px',
          fontFamily: "Georgia, serif",
        }}
      >
        memories
      </div>
    </div>
  )
}

// 12. Scattered 4
export function Scattered4Preview({ width = 120, height = 100 }) {
  const polaroids = [
    { x: 0, y: 5, rotate: -2, variant: 0 },
    { x: 60, y: 15, rotate: 1.5, variant: 1 },
    { x: 5, y: 50, rotate: 3, variant: 2 },
    { x: 62, y: 55, rotate: -1, variant: 3 },
  ]

  return (
    <div style={{ width, height, position: 'relative' }}>
      {polaroids.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: '50px',
            backgroundColor: '#fff',
            padding: '3px 3px 10px 3px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <PersonPlaceholder variant={p.variant} width={44} height={32} />
        </div>
      ))}
    </div>
  )
}

// ============================================
// FILM TEMPLATES
// ============================================

// 13. Sprocket Film
export function SprocketFilmPreview({ width = 120, height = 50 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Dark background */}
      <rect x="0" y="0" width={width} height={height} fill="#111" rx="2" />

      {/* Sprocket holes top */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={`t-${i}`}
          x={6 + i * 9.5}
          y="3"
          width="5"
          height="4"
          fill="#000"
          rx="1"
        />
      ))}

      {/* Sprocket holes bottom */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={`b-${i}`}
          x={6 + i * 9.5}
          y={height - 7}
          width="5"
          height="4"
          fill="#000"
          rx="1"
        />
      ))}

      {/* Photo slots */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={10 + i * 27}
          y="11"
          width="23"
          height={height - 22}
          fill={SLOT_COLOR}
          rx="1"
        />
      ))}
    </svg>
  )
}

// 14. Vintage Film
export function VintageFilmPreview({ width = 120, height = 90 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#faf8f4',
        border: '2px solid #ccc0a8',
        padding: '8px',
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          width: '100%',
          height: height - 36,
          backgroundColor: SLOT_COLOR,
        }}
      />
      <div
        style={{
          fontSize: '6px',
          fontStyle: 'italic',
          color: '#777',
          textAlign: 'center',
          marginTop: '4px',
        }}
      >
        Kodak moment
      </div>
    </div>
  )
}

// ============================================
// EXPORT ALL TEMPLATES WITH METADATA
// ============================================

export const templateOptions = {
  minimal: [
    {
      id: 'clean-white',
      name: 'Clean white',
      description: 'Plain thin black border',
      preview: CleanWhitePreview,
      needsLayout: true,
    },
    {
      id: 'thin-black',
      name: 'Thin black',
      description: 'Slightly thicker border',
      preview: ThinBlackPreview,
      needsLayout: true,
    },
    {
      id: 'double-frame',
      name: 'Double frame',
      description: 'Nested border effect',
      preview: DoubleFramePreview,
      needsLayout: true,
    },
    {
      id: 'arch-top',
      name: 'Arch top',
      description: 'Rounded arch shape',
      preview: ArchTopPreview,
      needsLayout: true,
    },
  ],
  newspaper: [
    {
      id: 'front-page',
      name: 'Front page',
      description: 'Classic newspaper layout',
      preview: FrontPagePreview,
      needsLayout: true,
    },
    {
      id: 'strip-edition',
      name: 'Strip edition',
      description: 'Horizontal photo strip',
      preview: StripEditionPreview,
      needsLayout: true,
    },
    {
      id: 'dark-edition',
      name: 'Dark edition',
      description: 'Dark themed newspaper',
      preview: DarkEditionPreview,
      needsLayout: true,
    },
    {
      id: 'gazette',
      name: '3-column gazette',
      description: 'Three portrait layout',
      preview: GazettePreview,
      needsLayout: true,
    },
  ],
  polaroid: [
    {
      id: 'classic-polaroid',
      name: 'Classic polaroid',
      description: '1 photo · Instant film style',
      preview: ClassicPolaroidPreview,
      needsLayout: false,
      fixedPhotos: 1,
      fixedLayoutId: 'single-portrait',
    },
    {
      id: 'scattered-duo',
      name: 'Scattered duo',
      description: '2 photos · Overlapping cards',
      preview: ScatteredDuoPreview,
      needsLayout: false,
      fixedPhotos: 2,
      fixedLayoutId: 'scattered-duo',
    },
    {
      id: 'wide-polaroid',
      name: 'Wide polaroid',
      description: '1 photo · Landscape',
      preview: WidePolaroidPreview,
      needsLayout: false,
      fixedPhotos: 1,
      fixedLayoutId: 'wide-single',
    },
    {
      id: 'scattered-4',
      name: 'Scattered 4',
      description: '4 photos · Rotated cards',
      preview: Scattered4Preview,
      needsLayout: false,
      fixedPhotos: 4,
      fixedLayoutId: 'grid-2x2',
    },
  ],
  film: [
    {
      id: 'sprocket-film',
      name: 'Sprocket film',
      description: '35mm film strip style',
      preview: SprocketFilmPreview,
      needsLayout: true,
    },
    {
      id: 'vintage-film',
      name: 'Vintage film',
      description: 'Aged cream border',
      preview: VintageFilmPreview,
      needsLayout: true,
    },
  ],
}

// Flat list of all templates
export const allTemplates = [
  ...templateOptions.minimal,
  ...templateOptions.newspaper,
  ...templateOptions.polaroid,
  ...templateOptions.film,
]
