import React, { useState } from 'react'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { layoutOptions } from './shared/LayoutPreviews'

function LayoutSelectionPage({
  onContinue,
  onBack,
  initialSelection = 'classic-strip',
  currentStep = 2,
  totalSteps = 3,
}) {
  const [selectedLayout, setSelectedLayout] = useState(initialSelection)

  const handleContinue = () => {
    const layout = layoutOptions.find((l) => l.id === selectedLayout)
    onContinue(layout)
  }

  const selectedLayoutData = layoutOptions.find((l) => l.id === selectedLayout)
  const selectedLayoutName = selectedLayoutData?.name || ''
  const photoCount = selectedLayoutData?.photos || 4

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: '#f7f7f5',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
      }}
    >
      {/* Header */}
      <header style={{ paddingTop: '24px', paddingBottom: '16px' }}>
        {/* Back Arrow + Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '16px',
          }}
        >
          {/* Back Arrow */}
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 0,
              padding: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#888',
              fontSize: '13px',
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
            <span>Back</span>
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
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Choose your layout
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#888',
              margin: 0,
              marginTop: '4px',
            }}
          >
            Pick how your photos are arranged
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          paddingBottom: '120px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '14px',
            width: '100%',
          }}
        >
          {layoutOptions.map((layout) => {
            const PreviewComponent = layout.preview
            return (
              <SelectionCard
                key={layout.id}
                name={layout.name}
                description={layout.description}
                isSelected={selectedLayout === layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                variant="layout"
              >
                <div
                  style={{
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PreviewComponent />
                </div>
              </SelectionCard>
            )
          })}
        </div>
      </main>

      {/* Sticky Footer CTA */}
      <footer
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTop: '0.5px solid #e8e8e8',
          padding: '1rem 2rem',
          marginLeft: 'calc(-1 * clamp(1.5rem, 5vw, 3rem))',
          marginRight: 'calc(-1 * clamp(1.5rem, 5vw, 3rem))',
        }}
      >
        <button
          onClick={handleContinue}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: '#0a0a0a',
            color: '#fff',
            padding: '14px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Start camera →
        </button>
        <p
          style={{
            fontSize: '11px',
            color: '#bbb',
            textAlign: 'center',
            marginTop: '6px',
          }}
        >
          {selectedLayoutName} selected · {photoCount} photo{photoCount > 1 ? 's' : ''}
        </p>
      </footer>
    </div>
  )
}

export default LayoutSelectionPage
