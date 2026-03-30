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
// NEWSPAPER TEMPLATES (All 1 photo with newspaper text)
// ============================================

// 5. Front Page - Classic broadsheet style with headline and columns
export function FrontPagePreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fdfcfa',
        border: '1px solid #ccc',
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: '5px',
        overflow: 'hidden',
      }}
    >
      {/* Double rule top */}
      <div style={{ borderTop: '2px double #0a0a0a', marginBottom: '2px' }} />

      {/* Masthead */}
      <div
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textAlign: 'center',
          color: '#0a0a0a',
          textTransform: 'uppercase',
        }}
      >
        THE DAILY TIMES
      </div>

      {/* Double rule bottom */}
      <div style={{ borderBottom: '2px double #0a0a0a', marginTop: '2px', marginBottom: '3px' }} />

      {/* Date line */}
      <div
        style={{
          fontSize: '5px',
          color: '#666',
          textAlign: 'center',
          letterSpacing: '0.05em',
          marginBottom: '4px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Vol. CXII No. 47</span>
        <span>PHOTO EDITION</span>
        <span>Price: 5¢</span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontSize: '8px',
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#0a0a0a',
          textAlign: 'center',
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}
      >
        EXCLUSIVE PORTRAIT
      </div>

      {/* Photo placeholder - single large */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
        <PersonPlaceholder variant={0} width={70} height={55} />
      </div>

      {/* Caption */}
      <div
        style={{
          fontSize: '5px',
          fontStyle: 'italic',
          color: '#555',
          textAlign: 'center',
          marginBottom: '4px',
        }}
      >
        Portrait captured at the grand event
      </div>

      {/* Text columns */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <div style={{ flex: 1, fontSize: '4px', color: '#666', lineHeight: 1.3 }}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
        </div>
        <div style={{ flex: 1, fontSize: '4px', color: '#666', lineHeight: 1.3 }}>
          Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.
        </div>
      </div>
    </div>
  )
}

// 6. Tabloid - Bold modern tabloid style
export function TabloidPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#fff',
        border: '3px solid #0a0a0a',
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Red banner */}
      <div
        style={{
          backgroundColor: '#c00',
          color: '#fff',
          fontSize: '5px',
          fontWeight: 700,
          textAlign: 'center',
          padding: '2px',
          letterSpacing: '0.1em',
        }}
      >
        ★ BREAKING NEWS ★
      </div>

      {/* Masthead */}
      <div
        style={{
          backgroundColor: '#0a0a0a',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 900,
          textAlign: 'center',
          padding: '3px',
          letterSpacing: '-0.02em',
        }}
      >
        THE BUZZ
      </div>

      {/* Photo - large */}
      <div style={{ padding: '4px', backgroundColor: '#fff' }}>
        <PersonPlaceholder variant={1} width={width - 14} height={65} />
      </div>

      {/* Bold headline */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 900,
          lineHeight: 1.1,
          color: '#0a0a0a',
          textAlign: 'center',
          padding: '0 4px',
          textTransform: 'uppercase',
        }}
      >
        CAUGHT ON CAMERA!
      </div>

      {/* Subhead */}
      <div
        style={{
          fontSize: '5px',
          color: '#666',
          textAlign: 'center',
          padding: '2px 4px',
          fontStyle: 'italic',
        }}
      >
        Exclusive photo reveals all — see page 3
      </div>

      {/* Bottom bar */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          fontSize: '4px',
          color: '#888',
          textAlign: 'center',
          padding: '2px',
          marginTop: 'auto',
        }}
      >
        www.thebuzz.com · $1.99
      </div>
    </div>
  )
}

// 7. Dark Edition - Noir evening paper style
export function DarkEditionPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#0a0a0a',
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Header line */}
      <div style={{ borderBottom: '1px solid #333', marginBottom: '4px', paddingBottom: '3px' }}>
        <div
          style={{
            fontSize: '5px',
            color: '#666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Evening Edition
        </div>
      </div>

      {/* Masthead */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}
      >
        NOIR TIMES
      </div>

      {/* Thin rule */}
      <div style={{ borderBottom: '0.5px solid #444', marginBottom: '6px' }} />

      {/* Photo */}
      <div style={{ marginBottom: '6px' }}>
        <PersonPlaceholder variant={2} width={width - 12} height={60} />
      </div>

      {/* Caption frame */}
      <div style={{ borderLeft: '2px solid #c00', paddingLeft: '6px' }}>
        <div
          style={{
            fontSize: '7px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '2px',
          }}
        >
          Shadows & Light
        </div>
        <div
          style={{
            fontSize: '5px',
            color: '#888',
            lineHeight: 1.4,
            fontStyle: 'italic',
          }}
        >
          A portrait emerges from the darkness, telling stories untold.
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          fontSize: '4px',
          color: '#555',
          marginTop: '6px',
          textAlign: 'right',
        }}
      >
        Continued on A7...
      </div>
    </div>
  )
}

// 8. Vintage Gazette - Old-fashioned gazette with ornate styling
export function GazettePreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#f5f0e6',
        border: '1px solid #c9b99a',
        fontFamily: "Georgia, 'Times New Roman', serif",
        overflow: 'hidden',
      }}
    >
      {/* Ornate top border */}
      <div style={{
        borderBottom: '1px solid #a08060',
        textAlign: 'center',
        padding: '2px 0',
        fontSize: '6px',
        color: '#8a7a5a',
        letterSpacing: '0.3em',
      }}>
        ❧ ❧ ❧
      </div>

      {/* Masthead */}
      <div
        style={{
          fontSize: '9px',
          fontWeight: 700,
          textAlign: 'center',
          color: '#3a3020',
          padding: '4px',
          letterSpacing: '0.08em',
          fontVariant: 'small-caps',
        }}
      >
        The Weekly Gazette
      </div>

      {/* Decorative line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '0 8px',
        marginBottom: '4px',
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#a08060' }} />
        <span style={{ fontSize: '5px', color: '#8a7a5a' }}>Est. 1892</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#a08060' }} />
      </div>

      {/* Photo with border */}
      <div style={{ padding: '0 8px', marginBottom: '4px' }}>
        <div style={{ border: '1px solid #a08060', padding: '3px', backgroundColor: '#fff' }}>
          <PersonPlaceholder variant={3} width={width - 26} height={55} />
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          fontSize: '6px',
          fontStyle: 'italic',
          color: '#5a4a30',
          textAlign: 'center',
          padding: '0 8px',
          marginBottom: '4px',
        }}
      >
        "A Distinguished Portrait"
      </div>

      {/* Article text */}
      <div style={{ padding: '0 8px', fontSize: '4px', color: '#6a5a40', lineHeight: 1.4 }}>
        The esteemed subject was photographed at the occasion of the annual gathering. Those in
        attendance remarked upon the remarkable likeness captured herein.
      </div>

      {/* Bottom ornament */}
      <div style={{
        textAlign: 'center',
        padding: '3px 0',
        fontSize: '5px',
        color: '#8a7a5a',
      }}>
        — ✦ —
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
// COLORFUL TEMPLATES (Fun decorative frames)
// ============================================

// 15. Pink Hearts - Hearts border with pink theme
export function PinkHeartsPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #ffeef8 0%, #fff0f5 100%)',
        border: '3px solid #ff69b4',
        borderRadius: '12px',
        padding: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner hearts */}
      <div style={{ position: 'absolute', top: '4px', left: '6px', fontSize: '12px' }}>💕</div>
      <div style={{ position: 'absolute', top: '4px', right: '6px', fontSize: '12px' }}>💕</div>
      <div style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '12px' }}>💕</div>
      <div style={{ position: 'absolute', bottom: '4px', right: '6px', fontSize: '12px' }}>💕</div>

      {/* Side hearts */}
      <div style={{ position: 'absolute', top: '50%', left: '2px', transform: 'translateY(-50%)', fontSize: '10px' }}>💗</div>
      <div style={{ position: 'absolute', top: '50%', right: '2px', transform: 'translateY(-50%)', fontSize: '10px' }}>💗</div>

      {/* Photo area */}
      <div
        style={{
          width: '100%',
          height: '70%',
          backgroundColor: '#ffb6c1',
          borderRadius: '8px',
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonPlaceholder variant={0} width={width - 30} height={70} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '8px', color: '#d63384', fontStyle: 'italic' }}>
        with love ♡
      </div>
    </div>
  )
}

// 16. Blue Stars - Stars border with blue theme
export function BlueStarsPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #e6f3ff 0%, #f0f8ff 100%)',
        border: '3px solid #4169e1',
        borderRadius: '12px',
        padding: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner stars */}
      <div style={{ position: 'absolute', top: '3px', left: '5px', fontSize: '14px' }}>⭐</div>
      <div style={{ position: 'absolute', top: '3px', right: '5px', fontSize: '14px' }}>⭐</div>
      <div style={{ position: 'absolute', bottom: '3px', left: '5px', fontSize: '14px' }}>⭐</div>
      <div style={{ position: 'absolute', bottom: '3px', right: '5px', fontSize: '14px' }}>⭐</div>

      {/* Small stars */}
      <div style={{ position: 'absolute', top: '30%', left: '2px', fontSize: '8px' }}>✨</div>
      <div style={{ position: 'absolute', top: '60%', right: '2px', fontSize: '8px' }}>✨</div>

      {/* Photo area */}
      <div
        style={{
          width: '100%',
          height: '70%',
          backgroundColor: '#87ceeb',
          borderRadius: '8px',
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonPlaceholder variant={1} width={width - 30} height={70} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '8px', color: '#4169e1', fontWeight: 600 }}>
        shine bright ★
      </div>
    </div>
  )
}

// 17. Northern Lights - Aurora gradient effect
export function NorthernLightsPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(180deg, #0c1445 0%, #1a237e 20%, #4a148c 40%, #7b1fa2 60%, #00695c 80%, #004d40 100%)',
        borderRadius: '12px',
        padding: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora waves */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: 0,
        right: 0,
        height: '20px',
        background: 'linear-gradient(90deg, transparent, rgba(0,255,128,0.3), rgba(0,200,255,0.3), transparent)',
        filter: 'blur(4px)',
      }} />
      <div style={{
        position: 'absolute',
        top: '25px',
        left: 0,
        right: 0,
        height: '15px',
        background: 'linear-gradient(90deg, transparent, rgba(255,0,255,0.2), rgba(0,255,200,0.2), transparent)',
        filter: 'blur(3px)',
      }} />

      {/* Photo area */}
      <div
        style={{
          width: '100%',
          height: '70%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonPlaceholder variant={2} width={width - 30} height={70} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '8px', color: '#b2dfdb', fontStyle: 'italic' }}>
        ✦ aurora dreams ✦
      </div>
    </div>
  )
}

// 18. Rainbow Frame - Colorful rainbow border
export function RainbowFramePreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
        borderRadius: '12px',
        padding: '4px',
        position: 'relative',
      }}
    >
      {/* Inner white container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          borderRadius: '9px',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Photo area */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(45deg, #ffe0e0, #ffe0ff, #e0e0ff, #e0ffff, #e0ffe0, #ffffe0)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PersonPlaceholder variant={3} width={width - 34} height={80} />
        </div>

        {/* Rainbow emoji row */}
        <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '10px', letterSpacing: '2px' }}>
          🌈✨🌈
        </div>
      </div>
    </div>
  )
}

// 19. Confetti Party - Fun party confetti frame
export function ConfettiPartyPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
        border: '3px solid #ffc107',
        borderRadius: '12px',
        padding: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti pieces */}
      <div style={{ position: 'absolute', top: '5px', left: '10px', fontSize: '10px' }}>🎊</div>
      <div style={{ position: 'absolute', top: '8px', right: '15px', fontSize: '8px' }}>🎉</div>
      <div style={{ position: 'absolute', top: '20px', left: '5px', fontSize: '6px', color: '#e91e63' }}>●</div>
      <div style={{ position: 'absolute', top: '15px', right: '8px', fontSize: '6px', color: '#2196f3' }}>●</div>
      <div style={{ position: 'absolute', bottom: '25px', left: '8px', fontSize: '6px', color: '#4caf50' }}>●</div>
      <div style={{ position: 'absolute', bottom: '20px', right: '10px', fontSize: '6px', color: '#9c27b0' }}>●</div>
      <div style={{ position: 'absolute', bottom: '5px', left: '15px', fontSize: '10px' }}>🎈</div>
      <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '10px' }}>🎀</div>

      {/* Photo area */}
      <div
        style={{
          width: '100%',
          height: '68%',
          backgroundColor: '#fff',
          borderRadius: '8px',
          marginTop: '14px',
          border: '2px dashed #ff9800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonPlaceholder variant={0} width={width - 34} height={65} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '8px', color: '#e65100', fontWeight: 700 }}>
        🎉 PARTY TIME! 🎉
      </div>
    </div>
  )
}

// 20. Flower Garden - Floral decorative frame
export function FlowerGardenPreview({ width = 120, height = 140 }) {
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
        border: '3px solid #81c784',
        borderRadius: '12px',
        padding: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flower decorations */}
      <div style={{ position: 'absolute', top: '2px', left: '8px', fontSize: '12px' }}>🌸</div>
      <div style={{ position: 'absolute', top: '4px', right: '10px', fontSize: '10px' }}>🌺</div>
      <div style={{ position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px' }}>🌼</div>
      <div style={{ position: 'absolute', bottom: '2px', left: '10px', fontSize: '10px' }}>🌷</div>
      <div style={{ position: 'absolute', bottom: '4px', right: '8px', fontSize: '12px' }}>🌻</div>
      <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px' }}>🌹</div>
      <div style={{ position: 'absolute', top: '50%', left: '2px', transform: 'translateY(-50%)', fontSize: '8px' }}>🍃</div>
      <div style={{ position: 'absolute', top: '50%', right: '2px', transform: 'translateY(-50%)', fontSize: '8px' }}>🍃</div>

      {/* Photo area */}
      <div
        style={{
          width: '100%',
          height: '68%',
          backgroundColor: '#fff',
          borderRadius: '8px',
          marginTop: '14px',
          border: '2px solid #a5d6a7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PersonPlaceholder variant={1} width={width - 34} height={65} />
      </div>

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '8px', color: '#388e3c', fontStyle: 'italic' }}>
        bloom & grow 🌿
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
      description: '1 photo · Classic broadsheet',
      preview: FrontPagePreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'tabloid',
      name: 'Tabloid',
      description: '1 photo · Bold headlines',
      preview: TabloidPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'dark-edition',
      name: 'Dark edition',
      description: '1 photo · Noir evening paper',
      preview: DarkEditionPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'gazette',
      name: 'Vintage gazette',
      description: '1 photo · Old-fashioned style',
      preview: GazettePreview,
      needsLayout: false,
      fixedPhotos: 1,
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
  colorful: [
    {
      id: 'pink-hearts',
      name: 'Pink hearts',
      description: '1 photo · Love & hearts',
      preview: PinkHeartsPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'blue-stars',
      name: 'Blue stars',
      description: '1 photo · Starry frame',
      preview: BlueStarsPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'northern-lights',
      name: 'Northern lights',
      description: '1 photo · Aurora effect',
      preview: NorthernLightsPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'rainbow-frame',
      name: 'Rainbow',
      description: '1 photo · Colorful border',
      preview: RainbowFramePreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'confetti-party',
      name: 'Confetti party',
      description: '1 photo · Celebration',
      preview: ConfettiPartyPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
    {
      id: 'flower-garden',
      name: 'Flower garden',
      description: '1 photo · Floral frame',
      preview: FlowerGardenPreview,
      needsLayout: false,
      fixedPhotos: 1,
    },
  ],
}

// Flat list of all templates
export const allTemplates = [
  ...templateOptions.minimal,
  ...templateOptions.newspaper,
  ...templateOptions.polaroid,
  ...templateOptions.film,
  ...templateOptions.colorful,
]
