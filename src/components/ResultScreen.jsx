import React, { useRef, useState, useCallback } from 'react'

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
  const photoCount = selectedLayout?.photos || 4

  // Create photo slots based on layout
  const photoSlots = photos.length > 0
    ? photos.slice(0, photoCount)
    : Array.from({ length: photoCount }, (_, i) => null)

  const currentFilter = filters.find(f => f.name === selectedFilter)

  // Get template category
  const getTemplateCategory = () => {
    if (['clean-white', 'thin-black', 'double-frame', 'arch-top'].includes(templateId)) return 'minimal'
    if (['front-page', 'strip-edition', 'dark-edition', 'gazette'].includes(templateId)) return 'newspaper'
    if (['classic-polaroid', 'scattered-duo', 'wide-polaroid', 'scattered-4'].includes(templateId)) return 'polaroid'
    if (['sprocket-film', 'vintage-film'].includes(templateId)) return 'film'
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
      // Create canvas and render
      const canvas = document.createElement('canvas')
      const stripElement = stripRef.current
      if (!stripElement) return

      // Use html2canvas-like approach with basic canvas
      const rect = stripElement.getBoundingClientRect()
      const scale = 2 // For higher resolution
      canvas.width = rect.width * scale
      canvas.height = rect.height * scale

      const ctx = canvas.getContext('2d')
      ctx.scale(scale, scale)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // For now, create a simple download
      const link = document.createElement('a')
      link.download = `clixframe-${layoutId}-${templateId}.png`

      // Use dom-to-image or similar in production
      // For now, just download the visible element
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }, [photos, layoutId, templateId])

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
        return {
          background: templateId === 'dark-edition' ? '#111' : '#fff',
          textColor: templateId === 'dark-edition' ? '#fff' : '#0a0a0a',
          fontFamily: "Georgia, 'Times New Roman', serif",
          showHeader: true,
          headerStyle: 'newspaper',
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
              borderRadius: templateCategory === 'film' ? '4px' : '12px',
              padding: templateStyles.padding || '16px',
              boxShadow: templateStyles.boxShadow || 'none',
              ...layoutStyles.wrapper,
            }}
            onPointerDown={() => setActiveStickerId(null)}
          >
            {/* Newspaper Header */}
            {templateCategory === 'newspaper' && (
              <div style={{ textAlign: 'center', marginBottom: '12px', fontFamily: templateStyles.fontFamily }}>
                <div style={{ borderTop: '2px double ' + templateStyles.textColor, marginBottom: '4px' }} />
                <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', color: templateStyles.textColor, textTransform: 'uppercase' }}>
                  The Clixframe Times
                </div>
                <div style={{ borderBottom: '2px double ' + templateStyles.textColor, marginTop: '4px', marginBottom: '8px' }} />
                <div style={{ fontSize: '9px', color: templateStyles.textColor, opacity: 0.6 }}>
                  PHOTO EDITION · VOL. I
                </div>
              </div>
            )}

            {/* Standard Logo Header (for non-newspaper) */}
            {templateCategory !== 'newspaper' && (
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
