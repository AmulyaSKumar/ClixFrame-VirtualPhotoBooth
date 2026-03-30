import React, { useRef, useState, useCallback } from 'react'

// Minimal sticker set (4-6 stickers)
const stickers = ['⭐', '❤️', '✨', '🎉', '😎', '💕']

// B&W compliant frame options
const frameOptions = [
  { id: 'none', name: 'None', color: 'transparent', border: true },
  { id: 'white', name: 'Border', color: '#ffffff', border: true },
  { id: 'newspaper', name: 'Newspaper', color: '#f5f5f0', border: true },
  { id: 'polaroid', name: 'Polaroid', color: '#ffffff', border: false, padding: true },
]

function ResultScreen({
  photos = [],
  onRetake,
  selectedTemplate = null,
}) {
  const stripRef = useRef(null)
  const stripSlots = photos.length > 0 ? photos : Array.from({ length: 4 }, (_, index) => `Photo ${index + 1}`)
  const [placedStickers, setPlacedStickers] = useState([])
  const [activeStickerId, setActiveStickerId] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('None')
  const [selectedFrame, setSelectedFrame] = useState('white')
  const [isDownloading, setIsDownloading] = useState(false)

  const layout = selectedTemplate?.layout || '4x1'

  const filters = [
    { name: 'None', style: 'none' },
    { name: 'B&W', style: 'grayscale(100%)' },
    { name: 'Sepia', style: 'sepia(90%)' },
    { name: 'Vivid', style: 'saturate(1.4) contrast(1.1)' },
  ]

  const currentFilter = filters.find(f => f.name === selectedFilter)
  const currentFrame = frameOptions.find(f => f.id === selectedFrame)

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

  const getCanvasDimensions = () => {
    const padding = 20
    const headerHeight = 50
    const photoGap = 6

    if (layout === '4x1') {
      const stripWidth = 440
      const photoWidth = stripWidth - (padding * 2)
      const photoHeight = photoWidth * 0.75
      const stripHeight = headerHeight + (photoHeight * 4) + (photoGap * 3) + (padding * 2)
      return { stripWidth, stripHeight, photoWidth, photoHeight, padding, headerHeight, photoGap }
    } else if (layout === '1x4') {
      const stripHeight = 260
      const photoHeight = stripHeight - headerHeight - (padding * 2)
      const photoWidth = photoHeight * 0.75
      const stripWidth = (photoWidth * 4) + (photoGap * 3) + (padding * 2)
      return { stripWidth, stripHeight, photoWidth, photoHeight, padding, headerHeight, photoGap }
    } else {
      const stripWidth = 500
      const photoWidth = (stripWidth - (padding * 2) - photoGap) / 2
      const photoHeight = photoWidth * 0.75
      const stripHeight = headerHeight + (photoHeight * 2) + photoGap + (padding * 2)
      return { stripWidth, stripHeight, photoWidth, photoHeight, padding, headerHeight, photoGap }
    }
  }

  const getPhotoPosition = (index, dims) => {
    const { photoWidth, photoHeight, padding, headerHeight, photoGap } = dims

    if (layout === '4x1') {
      return { x: padding, y: headerHeight + padding + 10 + (index * (photoHeight + photoGap)) }
    } else if (layout === '1x4') {
      return { x: padding + (index * (photoWidth + photoGap)), y: headerHeight + padding }
    } else {
      const row = Math.floor(index / 2)
      const col = index % 2
      return {
        x: padding + (col * (photoWidth + photoGap)),
        y: headerHeight + padding + 10 + (row * (photoHeight + photoGap))
      }
    }
  }

  const handleDownload = useCallback(async () => {
    if (photos.length === 0) return
    setIsDownloading(true)

    try {
      const dims = getCanvasDimensions()
      const { stripWidth, stripHeight, photoWidth, photoHeight, padding, headerHeight } = dims

      const canvas = document.createElement('canvas')
      canvas.width = stripWidth
      canvas.height = stripHeight
      const ctx = canvas.getContext('2d')

      const frameColor = currentFrame?.color || '#ffffff'
      ctx.fillStyle = frameColor === 'transparent' ? '#ffffff' : frameColor
      ctx.fillRect(0, 0, stripWidth, stripHeight)

      ctx.fillStyle = '#0a0a0a'
      ctx.font = '500 24px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Clixframe', stripWidth / 2, padding + 30)

      ctx.strokeStyle = 'rgba(10, 10, 10, 0.15)'
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(padding, headerHeight + padding)
      ctx.lineTo(stripWidth - padding, headerHeight + padding)
      ctx.stroke()
      ctx.setLineDash([])

      const photoPromises = photos.map((photoSrc, index) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            const pos = getPhotoPosition(index, dims)
            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = photoWidth
            tempCanvas.height = photoHeight
            const tempCtx = tempCanvas.getContext('2d')

            if (selectedFilter === 'B&W') tempCtx.filter = 'grayscale(100%)'
            else if (selectedFilter === 'Sepia') tempCtx.filter = 'sepia(90%)'
            else if (selectedFilter === 'Vivid') tempCtx.filter = 'saturate(1.4) contrast(1.1)'

            const imgAspect = img.width / img.height
            const slotAspect = photoWidth / photoHeight
            let sx, sy, sw, sh

            if (imgAspect > slotAspect) {
              sh = img.height
              sw = sh * slotAspect
              sx = (img.width - sw) / 2
              sy = 0
            } else {
              sw = img.width
              sh = sw / slotAspect
              sx = 0
              sy = (img.height - sh) / 2
            }

            tempCtx.drawImage(img, sx, sy, sw, sh, 0, 0, photoWidth, photoHeight)
            ctx.drawImage(tempCanvas, pos.x, pos.y)
            resolve()
          }
          img.onerror = () => resolve()
          img.src = photoSrc
        })
      })

      await Promise.all(photoPromises)

      const displayWidth = layout === '4x1' ? 220 : layout === '1x4' ? 400 : 280
      const scaleX = stripWidth / displayWidth
      const scaleY = stripHeight / (stripRef.current?.offsetHeight || stripHeight)

      for (const sticker of placedStickers) {
        ctx.font = `${sticker.size * scaleX}px serif`
        ctx.textAlign = 'left'
        ctx.fillText(sticker.emoji, sticker.x * scaleX, (sticker.y + sticker.size) * scaleY)
      }

      const link = document.createElement('a')
      link.download = `clixframe-photostrip.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }, [photos, selectedFilter, currentFrame, placedStickers, layout])

  const getStripClasses = () => {
    if (layout === '4x1') return { width: '180px', maxWidth: '220px' }
    else if (layout === '1x4') return { width: '320px', maxWidth: '400px' }
    else return { width: '200px', maxWidth: '280px' }
  }

  const getPhotoGridStyles = () => {
    if (layout === '4x1') return { display: 'flex', flexDirection: 'column', gap: '6px' }
    else if (layout === '1x4') return { display: 'flex', flexDirection: 'row', gap: '6px' }
    else return { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }
  }

  const getPhotoStyles = () => {
    if (layout === '1x4') return { aspectRatio: '3 / 4', flex: 1 }
    else return { aspectRatio: '4 / 3' }
  }

  const stripDimensions = getStripClasses()

  // Section label component
  const SectionLabel = ({ children }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
      }}
    >
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: '#aaa',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: '0.5px',
          backgroundColor: '#ddd',
        }}
      />
    </div>
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f7f7f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px clamp(1.5rem, 5vw, 3rem)',
          borderBottom: '1px solid #e8e8e8',
          backgroundColor: '#fff',
        }}
      >
        {/* Retake Button */}
        <button
          onClick={onRetake}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#888',
            fontSize: '13px',
            padding: '4px',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Retake</span>
        </button>

        {/* Logo */}
        <span
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
          }}
        >
          Clix
          <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            frame
          </span>
        </span>

        {/* Save Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#0a0a0a',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            opacity: isDownloading ? 0.5 : 1,
          }}
        >
          <span>{isDownloading ? 'Saving...' : 'Save'}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </button>
      </header>

      {/* Main Content - Split Layout */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {/* Left Column - Photo Strip (60%) */}
        <div
          style={{
            flex: '0 0 60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundColor: '#f7f7f5',
          }}
        >
          {/* Strip Container Card */}
          <div
            ref={stripRef}
            style={{
              position: 'relative',
              backgroundColor: currentFrame?.color || '#ffffff',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              padding: currentFrame?.padding ? '20px 12px 32px' : '16px',
              ...stripDimensions,
            }}
            onPointerDown={() => setActiveStickerId(null)}
          >
            {/* Logo */}
            <div
              style={{
                textAlign: 'center',
                paddingBottom: '8px',
                marginBottom: '8px',
                borderBottom: '1px dashed #e8e8e8',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#0a0a0a',
                  letterSpacing: '-0.02em',
                }}
              >
                Clix
                <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                  frame
                </span>
              </span>
            </div>

            {/* Photos Grid */}
            <div style={getPhotoGridStyles()}>
              {stripSlots.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    ...getPhotoStyles(),
                    overflow: 'hidden',
                    backgroundColor: '#e8e8e8',
                    borderRadius: '4px',
                    filter: currentFilter?.style !== 'none' ? currentFilter?.style : 'none',
                  }}
                >
                  {typeof photo === 'string' && photo.startsWith('data:') ? (
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e8e8e8',
                      }}
                    >
                      <span style={{ fontSize: '18px', fontWeight: 500, color: '#aaa' }}>
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

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
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#0a0a0a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Editing Panel (40%) */}
        <div
          style={{
            flex: '0 0 40%',
            borderLeft: '1px solid #e8e8e8',
            backgroundColor: '#fff',
            padding: '2rem 1.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Filter Section */}
          <div style={{ marginBottom: '32px' }}>
            <SectionLabel>Filter</SectionLabel>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
              }}
            >
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

          {/* Frame Section */}
          <div style={{ marginBottom: '32px' }}>
            <SectionLabel>Frame</SectionLabel>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
              }}
            >
              {frameOptions.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    maxWidth: '80px',
                    border: selectedFrame === frame.id ? '2px solid #0a0a0a' : '1px solid #e8e8e8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: frame.color === 'transparent' ? '#f7f7f5' : frame.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '8px',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '32px',
                      backgroundColor: '#ddd',
                      borderRadius: '2px',
                      border: frame.border ? '1px solid #bbb' : 'none',
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#888' }}>{frame.name}</span>
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
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
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
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
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
