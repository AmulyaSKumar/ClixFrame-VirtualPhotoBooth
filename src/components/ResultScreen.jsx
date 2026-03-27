import React, { useRef, useState, useCallback } from 'react'
import StickerPanel from './StickerPanel'

function ResultScreen({
  photos = [],
  onRetake,
  selectedTemplate = null,
}) {
  const stripRef = useRef(null)
  const stripSlots = photos.length > 0 ? photos : Array.from({ length: 4 }, (_, index) => `Photo ${index + 1}`)
  const [stickers, setStickers] = useState([])
  const [activeStickerId, setActiveStickerId] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('None')
  const [frameColor, setFrameColor] = useState('white')
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('filter')

  const layout = selectedTemplate?.layout || '4x1'

  const filters = [
    { name: 'None', style: 'none' },
    { name: 'B&W', style: 'grayscale(100%)' },
    { name: 'Sepia', style: 'sepia(90%)' },
    { name: 'Vivid', style: 'saturate(1.4) contrast(1.1)' },
  ]

  const frameColors = [
    { value: 'white', label: 'White', textColor: '#0D0D0D' },
    { value: '#0D0D0D', label: 'Black', textColor: '#FAFAF8' },
    { value: '#F5F0E6', label: 'Cream', textColor: '#0D0D0D' },
    { value: '#FFE4EC', label: 'Pink', textColor: '#0D0D0D' },
    { value: '#E6E6FA', label: 'Lavender', textColor: '#0D0D0D' },
  ]

  const currentFrameColor = frameColors.find(c => c.value === frameColor)
  const currentFilter = filters.find(f => f.name === selectedFilter)

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

  const handleAddSticker = (emoji) => {
    const newSticker = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      emoji,
      x: 60,
      y: 80,
      size: 32,
    }
    setStickers((prev) => [...prev, newSticker])
    setActiveStickerId(newSticker.id)
  }

  const handleStickerDragStart = (event, stickerId) => {
    event.preventDefault()
    event.stopPropagation()

    const stripBounds = stripRef.current?.getBoundingClientRect()
    if (!stripBounds) return

    const targetSticker = stickers.find((item) => item.id === stickerId)
    if (!targetSticker) return

    setActiveStickerId(stickerId)

    const pointerOffsetX = event.clientX - stripBounds.left - targetSticker.x
    const pointerOffsetY = event.clientY - stripBounds.top - targetSticker.y

    const handlePointerMove = (moveEvent) => {
      setStickers((prev) =>
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
    setStickers((prev) => prev.filter((s) => s.id !== stickerId))
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

      ctx.fillStyle = frameColor
      ctx.fillRect(0, 0, stripWidth, stripHeight)

      const textColor = frameColor === '#0D0D0D' ? '#FAFAF8' : '#0D0D0D'
      const borderColor = frameColor === '#0D0D0D' ? 'rgba(250, 250, 248, 0.2)' : 'rgba(13, 13, 13, 0.2)'

      ctx.fillStyle = textColor
      ctx.font = 'bold 24px "Syne", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Clixframe', stripWidth / 2, padding + 30)

      ctx.strokeStyle = borderColor
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

      for (const sticker of stickers) {
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
  }, [photos, selectedFilter, frameColor, stickers, layout])

  const borderStyle = frameColor === '#0D0D0D' ? 'rgba(250, 250, 248, 0.2)' : 'rgba(13, 13, 13, 0.2)'

  const getStripClasses = () => {
    if (layout === '4x1') return 'w-[140px] sm:w-[170px] md:w-[200px]'
    else if (layout === '1x4') return 'w-[260px] sm:w-[320px] md:w-[380px] max-w-[90vw]'
    else return 'w-[170px] sm:w-[200px] md:w-[250px]'
  }

  const getPhotoGridClasses = () => {
    if (layout === '4x1') return 'flex flex-col gap-1.5'
    else if (layout === '1x4') return 'flex flex-row gap-1.5'
    else return 'grid grid-cols-2 gap-1.5'
  }

  const getPhotoClasses = () => {
    if (layout === '1x4') return 'aspect-[3/4] flex-1'
    else return 'aspect-[4/3]'
  }

  return (
    <section className="min-h-screen w-full bg-ink flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-bg/10">
        <button
          type="button"
          className="flex items-center gap-2 text-bg/60 hover:text-bg transition-colors"
          onClick={onRetake}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-body text-sm hidden sm:inline">Retake</span>
        </button>
        <div className="font-logo text-xl font-bold tracking-tight text-bg">
          Clix<span className="font-accent text-2xl">frame</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="font-subheading text-sm font-semibold bg-bg text-ink px-4 sm:px-6 py-2 rounded-full hover:bg-bg/90 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{isDownloading ? 'Saving...' : 'Save'}</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-auto">
        {/* Photo Strip Area */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-ink">
          <div
            ref={stripRef}
            className={`relative p-3 sm:p-4 rounded-xl shadow-2xl ${getStripClasses()}`}
            style={{ backgroundColor: frameColor }}
            onPointerDown={() => setActiveStickerId(null)}
          >
            {/* Logo */}
            <div
              className="text-center pb-2 mb-2 border-b border-dashed"
              style={{ borderColor: borderStyle }}
            >
              <span className="font-logo text-sm sm:text-base font-bold tracking-tight" style={{ color: currentFrameColor?.textColor }}>
                Clix<span className="font-accent text-base sm:text-lg">frame</span>
              </span>
            </div>

            {/* Photos Grid */}
            <div className={getPhotoGridClasses()}>
              {stripSlots.map((photo, index) => (
                <div
                  key={index}
                  className={`${getPhotoClasses()} overflow-hidden bg-gray-200 rounded`}
                  style={{ filter: currentFilter?.style }}
                >
                  {typeof photo === 'string' && photo.startsWith('data:') ? (
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="font-hero text-lg font-bold text-gray-400">{index + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stickers */}
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`absolute cursor-grab active:cursor-grabbing select-none ${activeStickerId === sticker.id ? 'ring-2 ring-blue-500 rounded' : ''}`}
                style={{ left: sticker.x, top: sticker.y, width: sticker.size, height: sticker.size }}
                onPointerDown={(e) => handleStickerDragStart(e, sticker.id)}
              >
                <span className="text-xl">{sticker.emoji}</span>
                {activeStickerId === sticker.id && (
                  <button
                    onClick={() => handleDeleteSticker(sticker.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full shadow"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-full lg:w-[340px] bg-bg flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-ink/10">
            {[
              { id: 'filter', label: 'Filter' },
              { id: 'frame', label: 'Frame' },
              { id: 'sticker', label: 'Stickers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 sm:py-4 font-subheading text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-ink border-b-2 border-ink'
                    : 'text-mid hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-auto">
            {/* Filter Tab */}
            {activeTab === 'filter' && (
              <div className="space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => setSelectedFilter(filter.name)}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all ${
                      selectedFilter === filter.name
                        ? 'bg-ink text-bg'
                        : 'bg-ghost/50 text-ink hover:bg-ghost'
                    }`}
                  >
                    <span className="font-body text-sm sm:text-base">{filter.name}</span>
                    {selectedFilter === filter.name && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Frame Tab */}
            {activeTab === 'frame' && (
              <div className="space-y-3">
                {frameColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setFrameColor(color.value)}
                    className={`w-full flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all ${
                      frameColor === color.value
                        ? 'bg-ink text-bg'
                        : 'bg-ghost/50 text-ink hover:bg-ghost'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-ink/20 flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="font-body text-sm sm:text-base">{color.label}</span>
                    {frameColor === color.value && (
                      <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Stickers Tab */}
            {activeTab === 'sticker' && (
              <div>
                <p className="font-body text-sm text-mid mb-4">Tap to add, drag to move</p>
                <StickerPanel onSelect={handleAddSticker} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultScreen
