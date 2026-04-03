import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { useBooth } from '../context/BoothContext'

// Minimal sticker set
const stickers = ['⭐', '❤️', '✨', '🎉', '😎', '💕']

// Filter options
const filters = [
  { name: 'None', style: 'none' },
  { name: 'B&W', style: 'grayscale(100%)' },
  { name: 'Sepia', style: 'sepia(90%)' },
  { name: 'Vivid', style: 'saturate(1.4) contrast(1.1)' },
]

function ResultScreen() {
  // Get data from context
  const {
    capturedPhotos,
    selectedLayout,
    selectedTemplate,
    handleRetakeAll,
    resetBooth,
    totalPhotos,
  } = useBooth()

  const photos = capturedPhotos
  const stripRef = useRef(null)
  const [placedStickers, setPlacedStickers] = useState([])
  const [activeStickerId, setActiveStickerId] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('None')
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [canShare, setCanShare] = useState(false)

  // Check if Web Share API is available
  useEffect(() => {
    setCanShare(!!navigator.share && !!navigator.canShare)
  }, [])

  // Get layout info
  const layoutId = selectedLayout?.id || selectedTemplate?.fixedLayoutId || 'classic-strip'
  const templateId = selectedTemplate?.id || 'clean-white'
  const photoCount = totalPhotos

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
    if (photos.length === 0 || isProcessing) return
    setIsDownloading(true)
    setIsProcessing(true)

    try {
      const stripElement = stripRef.current
      if (!stripElement) return

      // Use html2canvas to capture the rendered element
      const canvas = await html2canvas(stripElement, {
        scale: 2, // Higher resolution for crisp output
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
      setIsProcessing(false)
    }
  }, [photos, templateId, isProcessing])

  // Share handler using Web Share API
  const handleShare = useCallback(async () => {
    if (photos.length === 0 || isProcessing) return
    setIsSharing(true)
    setIsProcessing(true)

    try {
      const stripElement = stripRef.current
      if (!stripElement) return

      // Capture the strip as canvas
      const canvas = await html2canvas(stripElement, {
        scale: 2, // Higher resolution for crisp output
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      })

      // Convert to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0)
      })

      const file = new File([blob], `clixframe-${templateId}-${Date.now()}.png`, { type: 'image/png' })

      // Check if we can share files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My ClixFrame Photo',
          text: 'Check out my photo booth strip from ClixFrame!',
          files: [file],
        })
      } else if (navigator.share) {
        // Fallback: share without file (just link)
        await navigator.share({
          title: 'ClixFrame - Photo Booth',
          text: 'Create fun photo booth strips at ClixFrame!',
          url: window.location.origin,
        })
      }
    } catch (error) {
      // User cancelled share or share failed
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error)
      }
    } finally {
      setIsSharing(false)
      setIsProcessing(false)
    }
  }, [photos, templateId, isProcessing])

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
    <div style={{ minHeight: '100dvh', width: '100%', maxWidth: '100vw', backgroundColor: '#f7f7f5', display: 'flex', flexDirection: 'column', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(1.5rem, 5vw, 3rem)', borderBottom: '1px solid #e8e8e8', backgroundColor: '#fff' }}>
        <button
          onClick={handleRetakeAll}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '13px', padding: '4px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Retake</span>
        </button>

        <Link
          to="/"
          onClick={resetBooth}
          style={{ fontSize: '18px', fontWeight: 500, color: '#0a0a0a', letterSpacing: '-0.02em', textDecoration: 'none' }}
        >
          Clix<span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>frame</span>
        </Link>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Share button - only show on mobile with Web Share API */}
          {canShare && (
            <button
              onClick={handleShare}
              disabled={isProcessing}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', color: '#0a0a0a', padding: '8px 14px', borderRadius: '4px', border: '1px solid #e8e8e8', cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 500, opacity: isProcessing ? 0.5 : 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span className="hidden sm:inline">{isProcessing ? 'Preparing...' : 'Share'}</span>
            </button>
          )}
          {/* Save/Download button */}
          <button
            onClick={handleDownload}
            disabled={isProcessing}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0a0a0a', color: '#fff', padding: '8px 18px', borderRadius: '4px', border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 500, opacity: isProcessing ? 0.5 : 1 }}
          >
            <span>{isProcessing ? 'Preparing...' : 'Save'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Photo Strip Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backgroundColor: '#f7f7f5', minHeight: '50vh' }}>
          <div
            ref={stripRef}
            style={{
              position: 'relative',
              backgroundColor: templateStyles.background,
              border: templateStyles.border || '1px solid #e8e8e8',
              borderRadius: templateCategory === 'newspaper' ? '4px' : templateCategory === 'film' ? '4px' : '12px',
              padding: templateStyles.padding || '16px',
              boxShadow: templateStyles.boxShadow || (templateCategory === 'newspaper' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'),
              ...layoutStyles.wrapper,
            }}
            onPointerDown={() => setActiveStickerId(null)}
          >
            {/* Standard Logo Header (for minimal, polaroid, film templates only) */}
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

        {/* Editing Panel */}
        <div style={{ borderTop: '1px solid #e8e8e8', backgroundColor: '#fff', padding: '24px 16px' }}>
          {/* Layout Info */}
          <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f7f7f5', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Current Style</div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#0a0a0a' }}>
              {selectedTemplate?.name || 'Clean white'}{selectedLayout?.name ? ` · ${selectedLayout.name}` : ''}
            </div>
          </div>

          {/* Filter Section */}
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel>Filter</SectionLabel>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel>Stickers</SectionLabel>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '12px', textAlign: 'center' }}>
              Tap to add, drag to move
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {stickers.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => handleAddSticker(sticker)}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
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

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleRetakeAll}
              style={{
                padding: '12px 24px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                backgroundColor: '#fff',
                color: '#555',
              }}
            >
              Retake Photos
            </button>
            <Link
              to="/"
              onClick={resetBooth}
              style={{
                padding: '12px 24px',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                backgroundColor: '#fff',
                color: '#555',
                textDecoration: 'none',
              }}
            >
              Start New
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
