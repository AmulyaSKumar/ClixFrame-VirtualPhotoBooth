import React, { useRef, useState, useCallback } from 'react'
import html2canvas from 'html2canvas'

// Minimal sticker set
const stickers = ['⭐', '❤️', '✨', '🎉', '😎', '💕']

// Filter options
const filters = [
  { name: 'None', style: 'none' },
  { name: 'B&W', style: 'grayscale(100%)' },
  { name: 'Sepia', style: 'sepia(90%)' },
  { name: 'Vivid', style: 'saturate(1.4) contrast(1.1)' },
]

function ResultScreen({
  photos = [],
  onRetake,
  selectedLayout = null,
  selectedTemplate = null,
}) {
  const stripRef = useRef(null)
  const [placedStickers, setPlacedStickers] = useState([])
  const [activeStickerId, setActiveStickerId] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('None')
  const [isDownloading, setIsDownloading] = useState(false)

  // Get layout info
  const layoutId = selectedLayout?.id || 'classic-strip'
  const templateId = selectedTemplate?.id || 'clean-white'
  const photoCount = selectedLayout?.photos || selectedTemplate?.fixedPhotos || 4

  // Create photo slots based on layout
  const photoSlots = photos.length > 0
    ? photos.slice(0, photoCount)
    : Array.from({ length: photoCount }, (_, i) => null)

  const currentFilter = filters.find(f => f.name === selectedFilter)

  // Get template category
  const getTemplateCategory = () => {
    if (['clean-white', 'thin-black', 'double-frame', 'arch-top'].includes(templateId)) return 'minimal'
    if (['front-page', 'tabloid', 'dark-edition', 'gazette'].includes(templateId)) return 'newspaper'
    if (['classic-polaroid', 'scattered-duo', 'wide-polaroid', 'scattered-4'].includes(templateId)) return 'polaroid'
    if (['sprocket-film', 'vintage-film'].includes(templateId)) return 'film'
    if (['pink-hearts', 'blue-stars', 'northern-lights', 'rainbow-frame', 'confetti-party', 'flower-garden'].includes(templateId)) return 'colorful'
    return 'minimal'
  }

  const templateCategory = getTemplateCategory()

  // Sticker handlers
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

  const handleAddSticker = (emoji) => {
    const newSticker = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      emoji,
      x: 60,
      y: 80,
      size: 32,
    }
    setPlacedStickers((prev) => [...prev, newSticker])
    setActiveStickerId(newSticker.id)
  }

  const handleStickerDragStart = (event, stickerId) => {
    event.preventDefault()
    event.stopPropagation()

    const stripBounds = stripRef.current?.getBoundingClientRect()
    if (!stripBounds) return

    const targetSticker = placedStickers.find((item) => item.id === stickerId)
    if (!targetSticker) return

    setActiveStickerId(stickerId)

    const pointerOffsetX = event.clientX - stripBounds.left - targetSticker.x
    const pointerOffsetY = event.clientY - stripBounds.top - targetSticker.y

    const handlePointerMove = (moveEvent) => {
      setPlacedStickers((prev) =>
        prev.map((item) => {
          if (item.id !== stickerId) return item
          const maxX = stripBounds.width - item.size
          const maxY = stripBounds.height - item.size
          const nextX = clamp(moveEvent.clientX - stripBounds.left - pointerOffsetX, 0, maxX)
          const nextY = clamp(moveEvent.clientY - stripBounds.top - pointerOffsetY, 0, maxY)
          return { ...item, x: nextX, y: nextY }
        })
      )
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handleDeleteSticker = (stickerId) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== stickerId))
    setActiveStickerId(null)
  }

  // Download handler
  const handleDownload = useCallback(async () => {
    if (photos.length === 0) return
    setIsDownloading(true)

    try {
      const stripElement = stripRef.current
      if (!stripElement) return

      // Use html2canvas to capture the rendered element
      const canvas = await html2canvas(stripElement, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: null, // Use element's background
        logging: false,
      })

      // Create download link
      const link = document.createElement('a')
      link.download = `clixframe-${templateId}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }, [photos, templateId])

  // Render photo with filter
  const renderPhoto = (photo, index, style = {}) => (
    <div
      key={index}
      style={{
        overflow: 'hidden',
        backgroundColor: '#e8e8e8',
        borderRadius: '4px',
        filter: currentFilter?.style !== 'none' ? currentFilter?.style : 'none',
        ...style,
      }}
    >
      {photo ? (
        <img
          src={photo}
          alt={`Photo ${index + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#aaa' }}>{index + 1}</span>
        </div>
      )}
    </div>
  )

  // Get layout-specific grid styles
  const getLayoutStyles = () => {
    // Newspaper templates - all have 1 photo with custom rendering
    if (templateCategory === 'newspaper') {
      return {
        container: { display: 'flex' },
        photo: { aspectRatio: '4 / 3', width: '100%' },
        wrapper: { width: '280px' },
        isNewspaper: true,
      }
    }

    // Colorful templates - all have 1 photo with custom rendering
    if (templateCategory === 'colorful') {
      return {
        container: { display: 'flex' },
        photo: { aspectRatio: '4 / 3', width: '100%' },
        wrapper: { width: '300px' },
        isColorful: true,
      }
    }

    switch (layoutId) {
      case 'classic-strip':
        return {
          container: { display: 'flex', flexDirection: 'column', gap: '6px' },
          photo: { aspectRatio: '4 / 3' },
          wrapper: { width: '180px' },
        }
      case 'grid-2x2':
        return {
          container: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' },
          photo: { aspectRatio: '1' },
          wrapper: { width: '220px' },
        }
      case 'wide-strip':
        return {
          container: { display: 'flex', flexDirection: 'row', gap: '6px' },
          photo: { aspectRatio: '3 / 4', flex: 1 },
          wrapper: { width: '360px' },
        }
      case 'big-plus-two':
        return {
          container: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '6px' },
          photo: { aspectRatio: '4 / 3' },
          wrapper: { width: '280px' },
          custom: true,
        }
      case 'filmstrip':
        return {
          container: { display: 'flex', flexDirection: 'column', gap: '4px' },
          photo: { aspectRatio: '4 / 3' },
          wrapper: { width: '160px' },
          filmStyle: true,
        }
      case 'single-portrait':
        return {
          container: { display: 'flex' },
          photo: { aspectRatio: '3 / 4', width: '100%' },
          wrapper: { width: '200px' },
        }
      case 'three-wide':
        return {
          container: { display: 'flex', flexDirection: 'row', gap: '6px' },
          photo: { aspectRatio: '3 / 4', flex: 1 },
          wrapper: { width: '300px' },
        }
      case 'hero-row':
        return {
          container: { display: 'flex', flexDirection: 'column', gap: '6px' },
          photo: { aspectRatio: '4 / 3' },
          wrapper: { width: '260px' },
          custom: true,
        }
      default:
        return {
          container: { display: 'flex', flexDirection: 'column', gap: '6px' },
          photo: { aspectRatio: '4 / 3' },
          wrapper: { width: '180px' },
        }
    }
  }

  const layoutStyles = getLayoutStyles()

  // Get template-specific styles
  const getTemplateStyles = () => {
    switch (templateCategory) {
      case 'newspaper':
        // Each newspaper template has its own background
        let bgColor = '#fff'
        if (templateId === 'dark-edition') bgColor = '#0a0a0a'
        else if (templateId === 'gazette') bgColor = '#f5f0e6'
        else if (templateId === 'front-page') bgColor = '#fdfcfa'

        return {
          background: bgColor,
          textColor: templateId === 'dark-edition' ? '#fff' : '#0a0a0a',
          fontFamily: "Georgia, 'Times New Roman', serif",
          border: templateId === 'gazette' ? '2px solid #c9b99a' : templateId === 'tabloid' ? '3px solid #0a0a0a' : '1px solid #ccc',
        }
      case 'polaroid':
        return {
          background: '#fff',
          padding: '12px 12px 32px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          showCaption: true,
        }
      case 'film':
        return {
          background: templateId === 'sprocket-film' ? '#111' : '#faf8f4',
          showSprockets: templateId === 'sprocket-film',
          border: templateId === 'vintage-film' ? '3px solid #ccc0a8' : 'none',
        }
      case 'colorful':
        // Each colorful template has unique styling
        const colorfulStyles = {
          'pink-hearts': {
            background: 'linear-gradient(135deg, #ffeef8 0%, #fff0f5 100%)',
            border: '4px solid #ff69b4',
          },
          'blue-stars': {
            background: 'linear-gradient(135deg, #e6f3ff 0%, #f0f8ff 100%)',
            border: '4px solid #4169e1',
          },
          'northern-lights': {
            background: 'linear-gradient(180deg, #0c1445 0%, #1a237e 20%, #4a148c 40%, #7b1fa2 60%, #00695c 80%, #004d40 100%)',
            border: 'none',
          },
          'rainbow-frame': {
            background: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            border: 'none',
            padding: '6px',
          },
          'confetti-party': {
            background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
            border: '4px solid #ffc107',
          },
          'flower-garden': {
            background: 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)',
            border: '4px solid #81c784',
          },
        }
        return colorfulStyles[templateId] || { background: '#fff', border: '1px solid #e8e8e8' }
      default:
        return {
          background: '#fff',
          border: templateId === 'double-frame' ? '3px double #0a0a0a' : '1px solid #e8e8e8',
        }
    }
  }

  const templateStyles = getTemplateStyles()

  // Render the photo strip based on layout
  const renderPhotoStrip = () => {
    // Newspaper templates - each has unique frame with 1 photo
    if (templateCategory === 'newspaper') {
      const photo = photoSlots[0]

      // Front Page - Classic broadsheet
      if (templateId === 'front-page') {
        return (
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {/* Double rule top */}
            <div style={{ borderTop: '3px double #0a0a0a', marginBottom: '4px' }} />

            {/* Masthead */}
            <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.08em', textAlign: 'center', color: '#0a0a0a', textTransform: 'uppercase' }}>
              THE DAILY TIMES
            </div>

            {/* Double rule bottom */}
            <div style={{ borderBottom: '3px double #0a0a0a', marginTop: '4px', marginBottom: '6px' }} />

            {/* Date line */}
            <div style={{ fontSize: '9px', color: '#666', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Vol. CXII No. 47</span>
              <span>PHOTO EDITION</span>
              <span>Price: 5¢</span>
            </div>

            {/* Headline */}
            <div style={{ fontSize: '14px', fontWeight: 700, textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase' }}>
              EXCLUSIVE PORTRAIT REVEALED
            </div>

            {/* Photo */}
            <div style={{ marginBottom: '8px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%' })}
            </div>

            {/* Caption */}
            <div style={{ fontSize: '10px', fontStyle: 'italic', textAlign: 'center', color: '#555', marginBottom: '10px' }}>
              Portrait captured at the grand event — Photo by Staff
            </div>

            {/* Text columns */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, fontSize: '8px', color: '#444', lineHeight: 1.4 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              <div style={{ flex: 1, fontSize: '8px', color: '#444', lineHeight: 1.4 }}>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        )
      }

      // Tabloid - Bold modern style
      if (templateId === 'tabloid') {
        return (
          <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            {/* Red banner */}
            <div style={{ backgroundColor: '#c00', color: '#fff', fontSize: '10px', fontWeight: 700, textAlign: 'center', padding: '4px', letterSpacing: '0.1em', marginBottom: '0' }}>
              ★ BREAKING NEWS ★
            </div>

            {/* Masthead */}
            <div style={{ backgroundColor: '#0a0a0a', color: '#fff', fontSize: '22px', fontWeight: 900, textAlign: 'center', padding: '6px', letterSpacing: '-0.02em' }}>
              THE BUZZ
            </div>

            {/* Photo */}
            <div style={{ padding: '10px 0' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%' })}
            </div>

            {/* Bold headline */}
            <div style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1.1, color: '#0a0a0a', textAlign: 'center', textTransform: 'uppercase', marginBottom: '6px' }}>
              CAUGHT ON CAMERA!
            </div>

            {/* Subhead */}
            <div style={{ fontSize: '10px', color: '#666', textAlign: 'center', fontStyle: 'italic', marginBottom: '8px' }}>
              Exclusive photo reveals all — see inside for more
            </div>

            {/* Bottom bar */}
            <div style={{ backgroundColor: '#f5f5f5', fontSize: '8px', color: '#888', textAlign: 'center', padding: '4px', borderTop: '1px solid #ddd' }}>
              www.thebuzz.com · $1.99 · Your source for the latest
            </div>
          </div>
        )
      }

      // Dark Edition - Noir evening paper
      if (templateId === 'dark-edition') {
        return (
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {/* Header line */}
            <div style={{ borderBottom: '1px solid #333', marginBottom: '8px', paddingBottom: '6px' }}>
              <div style={{ fontSize: '9px', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Evening Edition
              </div>
            </div>

            {/* Masthead */}
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', marginBottom: '8px' }}>
              NOIR TIMES
            </div>

            {/* Thin rule */}
            <div style={{ borderBottom: '0.5px solid #444', marginBottom: '12px' }} />

            {/* Photo */}
            <div style={{ marginBottom: '12px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%' })}
            </div>

            {/* Caption frame */}
            <div style={{ borderLeft: '3px solid #c00', paddingLeft: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '4px' }}>
                Shadows & Light
              </div>
              <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.4, fontStyle: 'italic' }}>
                A portrait emerges from the darkness, telling stories untold and secrets revealed.
              </div>
            </div>

            {/* Bottom text */}
            <div style={{ fontSize: '8px', color: '#555', marginTop: '12px', textAlign: 'right' }}>
              Continued on A7...
            </div>
          </div>
        )
      }

      // Gazette - Vintage old-fashioned
      if (templateId === 'gazette') {
        return (
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {/* Ornate top border */}
            <div style={{ borderBottom: '1px solid #a08060', textAlign: 'center', padding: '4px 0', fontSize: '10px', color: '#8a7a5a', letterSpacing: '0.3em' }}>
              ❧ ❧ ❧
            </div>

            {/* Masthead */}
            <div style={{ fontSize: '16px', fontWeight: 700, textAlign: 'center', color: '#3a3020', padding: '8px', letterSpacing: '0.08em', fontVariant: 'small-caps' }}>
              The Weekly Gazette
            </div>

            {/* Decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#a08060' }} />
              <span style={{ fontSize: '9px', color: '#8a7a5a' }}>Est. 1892</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#a08060' }} />
            </div>

            {/* Photo with border */}
            <div style={{ border: '2px solid #a08060', padding: '6px', backgroundColor: '#fff', marginBottom: '10px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%' })}
            </div>

            {/* Caption */}
            <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#5a4a30', textAlign: 'center', marginBottom: '8px' }}>
              "A Distinguished Portrait"
            </div>

            {/* Article text */}
            <div style={{ fontSize: '9px', color: '#6a5a40', lineHeight: 1.5 }}>
              The esteemed subject was photographed at the occasion of the annual gathering. Those in attendance remarked upon the remarkable likeness captured herein.
            </div>

            {/* Bottom ornament */}
            <div style={{ textAlign: 'center', padding: '6px 0', fontSize: '10px', color: '#8a7a5a' }}>
              — ✦ —
            </div>
          </div>
        )
      }
    }

    // Colorful templates - each has unique decorative frame with 1 photo
    if (templateCategory === 'colorful') {
      const photo = photoSlots[0]

      // Pink Hearts
      if (templateId === 'pink-hearts') {
        return (
          <div style={{ position: 'relative' }}>
            {/* Corner hearts */}
            <div style={{ position: 'absolute', top: '-5px', left: '5px', fontSize: '20px', zIndex: 1 }}>💕</div>
            <div style={{ position: 'absolute', top: '-5px', right: '5px', fontSize: '20px', zIndex: 1 }}>💕</div>
            <div style={{ position: 'absolute', bottom: '35px', left: '5px', fontSize: '20px', zIndex: 1 }}>💕</div>
            <div style={{ position: 'absolute', bottom: '35px', right: '5px', fontSize: '20px', zIndex: 1 }}>💕</div>
            {/* Side hearts */}
            <div style={{ position: 'absolute', top: '50%', left: '-5px', transform: 'translateY(-50%)', fontSize: '16px', zIndex: 1 }}>💗</div>
            <div style={{ position: 'absolute', top: '50%', right: '-5px', transform: 'translateY(-50%)', fontSize: '16px', zIndex: 1 }}>💗</div>

            {/* Photo */}
            <div style={{ marginBottom: '12px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%', borderRadius: '8px' })}
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#d63384', fontStyle: 'italic' }}>
              with love ♡
            </div>
          </div>
        )
      }

      // Blue Stars
      if (templateId === 'blue-stars') {
        return (
          <div style={{ position: 'relative' }}>
            {/* Corner stars */}
            <div style={{ position: 'absolute', top: '-8px', left: '5px', fontSize: '24px', zIndex: 1 }}>⭐</div>
            <div style={{ position: 'absolute', top: '-8px', right: '5px', fontSize: '24px', zIndex: 1 }}>⭐</div>
            <div style={{ position: 'absolute', bottom: '30px', left: '5px', fontSize: '24px', zIndex: 1 }}>⭐</div>
            <div style={{ position: 'absolute', bottom: '30px', right: '5px', fontSize: '24px', zIndex: 1 }}>⭐</div>
            {/* Small sparkles */}
            <div style={{ position: 'absolute', top: '30%', left: '-8px', fontSize: '14px', zIndex: 1 }}>✨</div>
            <div style={{ position: 'absolute', top: '60%', right: '-8px', fontSize: '14px', zIndex: 1 }}>✨</div>

            {/* Photo */}
            <div style={{ marginBottom: '12px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%', borderRadius: '8px' })}
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#4169e1', fontWeight: 600 }}>
              shine bright ★
            </div>
          </div>
        )
      }

      // Northern Lights
      if (templateId === 'northern-lights') {
        return (
          <div style={{ position: 'relative' }}>
            {/* Aurora waves effect */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: 0,
              right: 0,
              height: '30px',
              background: 'linear-gradient(90deg, transparent, rgba(0,255,128,0.4), rgba(0,200,255,0.4), transparent)',
              filter: 'blur(8px)',
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              top: '10px',
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(90deg, transparent, rgba(255,0,255,0.3), rgba(0,255,200,0.3), transparent)',
              filter: 'blur(6px)',
              zIndex: 1,
            }} />

            {/* Photo */}
            <div style={{ marginTop: '20px', marginBottom: '12px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%' })}
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#b2dfdb', fontStyle: 'italic' }}>
              ✦ aurora dreams ✦
            </div>
          </div>
        )
      }

      // Rainbow Frame
      if (templateId === 'rainbow-frame') {
        return (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '12px' }}>
            {/* Photo with pastel background */}
            <div style={{
              background: 'linear-gradient(45deg, #ffe0e0, #ffe0ff, #e0e0ff, #e0ffff, #e0ffe0, #ffffe0)',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '12px',
            }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%', borderRadius: '6px' })}
            </div>

            {/* Rainbow emoji row */}
            <div style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }}>
              🌈✨🌈
            </div>
          </div>
        )
      }

      // Confetti Party
      if (templateId === 'confetti-party') {
        return (
          <div style={{ position: 'relative' }}>
            {/* Confetti decorations */}
            <div style={{ position: 'absolute', top: '-5px', left: '15px', fontSize: '18px', zIndex: 1 }}>🎊</div>
            <div style={{ position: 'absolute', top: '-5px', right: '20px', fontSize: '16px', zIndex: 1 }}>🎉</div>
            <div style={{ position: 'absolute', top: '25px', left: '0px', fontSize: '10px', color: '#e91e63', zIndex: 1 }}>●</div>
            <div style={{ position: 'absolute', top: '20px', right: '5px', fontSize: '10px', color: '#2196f3', zIndex: 1 }}>●</div>
            <div style={{ position: 'absolute', bottom: '50px', left: '5px', fontSize: '10px', color: '#4caf50', zIndex: 1 }}>●</div>
            <div style={{ position: 'absolute', bottom: '45px', right: '10px', fontSize: '10px', color: '#9c27b0', zIndex: 1 }}>●</div>
            <div style={{ position: 'absolute', bottom: '25px', left: '20px', fontSize: '18px', zIndex: 1 }}>🎈</div>
            <div style={{ position: 'absolute', bottom: '28px', right: '15px', fontSize: '18px', zIndex: 1 }}>🎀</div>

            {/* Photo */}
            <div style={{ backgroundColor: '#fff', border: '3px dashed #ff9800', borderRadius: '8px', padding: '6px', marginBottom: '12px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%', borderRadius: '4px' })}
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#e65100', fontWeight: 700 }}>
              🎉 PARTY TIME! 🎉
            </div>
          </div>
        )
      }

      // Flower Garden
      if (templateId === 'flower-garden') {
        return (
          <div style={{ position: 'relative' }}>
            {/* Flower decorations */}
            <div style={{ position: 'absolute', top: '-8px', left: '10px', fontSize: '20px', zIndex: 1 }}>🌸</div>
            <div style={{ position: 'absolute', top: '-5px', right: '15px', fontSize: '18px', zIndex: 1 }}>🌺</div>
            <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', fontSize: '18px', zIndex: 1 }}>🌼</div>
            <div style={{ position: 'absolute', bottom: '25px', left: '15px', fontSize: '18px', zIndex: 1 }}>🌷</div>
            <div style={{ position: 'absolute', bottom: '28px', right: '10px', fontSize: '20px', zIndex: 1 }}>🌻</div>
            <div style={{ position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', fontSize: '18px', zIndex: 1 }}>🌹</div>
            <div style={{ position: 'absolute', top: '50%', left: '-5px', transform: 'translateY(-50%)', fontSize: '14px', zIndex: 1 }}>🍃</div>
            <div style={{ position: 'absolute', top: '50%', right: '-5px', transform: 'translateY(-50%)', fontSize: '14px', zIndex: 1 }}>🍃</div>

            {/* Photo */}
            <div style={{ backgroundColor: '#fff', border: '3px solid #a5d6a7', borderRadius: '8px', padding: '6px', marginBottom: '12px' }}>
              {renderPhoto(photo, 0, { aspectRatio: '4 / 3', width: '100%', borderRadius: '4px' })}
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', fontSize: '14px', color: '#388e3c', fontStyle: 'italic' }}>
              bloom & grow 🌿
            </div>
          </div>
        )
      }
    }

    // Special layout: big-plus-two (1 large + 2 small)
    if (layoutId === 'big-plus-two') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '6px' }}>
          <div style={{ gridRow: 'span 2' }}>
            {renderPhoto(photoSlots[0], 0, { aspectRatio: '3 / 4', height: '100%' })}
          </div>
          <div>{renderPhoto(photoSlots[1], 1, { aspectRatio: '4 / 3' })}</div>
          <div>{renderPhoto(photoSlots[2], 2, { aspectRatio: '4 / 3' })}</div>
        </div>
      )
    }

    // Special layout: hero-row (1 large top + 3 small bottom)
    if (layoutId === 'hero-row') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div>{renderPhoto(photoSlots[0], 0, { aspectRatio: '16 / 9' })}</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1 }}>
                {renderPhoto(photoSlots[i], i, { aspectRatio: '1' })}
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Filmstrip with sprockets
    if (layoutId === 'filmstrip' && templateStyles.showSprockets) {
      return (
        <div style={{ position: 'relative', padding: '8px 16px' }}>
          {/* Sprocket holes */}
          <div style={{ position: 'absolute', left: '4px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ width: '6px', height: '8px', backgroundColor: '#000', borderRadius: '1px' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', right: '4px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ width: '6px', height: '8px', backgroundColor: '#000', borderRadius: '1px' }} />
            ))}
          </div>
          {/* Photos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {photoSlots.map((photo, i) => renderPhoto(photo, i, { aspectRatio: '4 / 3' }))}
          </div>
        </div>
      )
    }

    // Standard layouts
    return (
      <div style={layoutStyles.container}>
        {photoSlots.map((photo, i) => renderPhoto(photo, i, layoutStyles.photo))}
      </div>
    )
  }

  // Section label component
  const SectionLabel = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <span style={{ fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#aaa', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: '0.5px', backgroundColor: '#ddd' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f7f7f5', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(1.5rem, 5vw, 3rem)', borderBottom: '1px solid #e8e8e8', backgroundColor: '#fff' }}>
        <button
          onClick={onRetake}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '13px', padding: '4px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Retake</span>
        </button>

        <span style={{ fontSize: '18px', fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
          Clix<span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>frame</span>
        </span>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0a0a0a', color: '#fff', padding: '8px 18px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, opacity: isDownloading ? 0.5 : 1 }}
        >
          <span>{isDownloading ? 'Saving...' : 'Save'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        {/* Left Column - Photo Strip */}
        <div style={{ flex: '0 0 60%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', backgroundColor: '#f7f7f5' }}>
          <div
            ref={stripRef}
            style={{
              position: 'relative',
              backgroundColor: templateStyles.background,
              border: templateStyles.border || '1px solid #e8e8e8',
              borderRadius: templateCategory === 'newspaper' ? '4px' : templateCategory === 'film' ? '4px' : templateCategory === 'colorful' ? '16px' : '12px',
              padding: templateStyles.padding || '16px',
              boxShadow: templateStyles.boxShadow || (templateCategory === 'newspaper' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'),
              ...layoutStyles.wrapper,
            }}
            onPointerDown={() => setActiveStickerId(null)}
          >
            {/* Standard Logo Header (for minimal, polaroid, film templates only) */}
            {templateCategory !== 'newspaper' && templateCategory !== 'colorful' && (
              <div style={{ textAlign: 'center', paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px dashed #e8e8e8' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: templateStyles.textColor || '#0a0a0a', letterSpacing: '-0.02em' }}>
                  Clix<span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>frame</span>
                </span>
              </div>
            )}

            {/* Photos */}
            {renderPhotoStrip()}

            {/* Polaroid Caption */}
            {templateCategory === 'polaroid' && (
              <div style={{ textAlign: 'center', marginTop: '8px', fontStyle: 'italic', fontSize: '11px', color: '#888', fontFamily: 'Georgia, serif' }}>
                memories
              </div>
            )}

            {/* Placed Stickers */}
            {placedStickers.map((sticker) => (
              <div
                key={sticker.id}
                style={{
                  position: 'absolute',
                  left: sticker.x,
                  top: sticker.y,
                  width: sticker.size,
                  height: sticker.size,
                  cursor: 'grab',
                  userSelect: 'none',
                  outline: activeStickerId === sticker.id ? '2px solid #0a0a0a' : 'none',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                }}
                onPointerDown={(e) => handleStickerDragStart(e, sticker.id)}
              >
                <span style={{ fontSize: '24px' }}>{sticker.emoji}</span>
                {activeStickerId === sticker.id && (
                  <button
                    onClick={() => handleDeleteSticker(sticker.id)}
                    style={{ position: 'absolute', top: '-8px', right: '-8px', width: '18px', height: '18px', backgroundColor: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Editing Panel */}
        <div style={{ flex: '0 0 40%', borderLeft: '1px solid #e8e8e8', backgroundColor: '#fff', padding: '2rem 1.5rem', overflowY: 'auto' }}>
          {/* Layout Info */}
          <div style={{ marginBottom: '24px', padding: '12px', backgroundColor: '#f7f7f5', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Current Style</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#0a0a0a' }}>
              {selectedLayout?.name || 'Classic strip'} · {selectedTemplate?.name || 'Clean white'}
            </div>
          </div>

          {/* Filter Section */}
          <div style={{ marginBottom: '32px' }}>
            <SectionLabel>Filter</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {filters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setSelectedFilter(filter.name)}
                  style={{
                    padding: '8px 16px',
                    border: selectedFilter === filter.name ? '1px solid #0a0a0a' : '1px solid #e8e8e8',
                    borderRadius: '99px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    backgroundColor: selectedFilter === filter.name ? '#0a0a0a' : '#fff',
                    color: selectedFilter === filter.name ? '#fff' : '#555',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stickers Section */}
          <div>
            <SectionLabel>Stickers</SectionLabel>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '12px' }}>
              Tap to add, drag to move
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {stickers.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => handleAddSticker(sticker)}
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    backgroundColor: '#f7f7f5',
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
