import React, { useState } from 'react'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { layoutOptions } from './shared/LayoutPreviews'

function LayoutSelectionPage({ onContinue, onBack, initialSelection = 'classic-strip' }) {
  const [selectedLayout, setSelectedLayout] = useState(initialSelection)

  const handleContinue = () => {
    const layout = layoutOptions.find((l) => l.id === selectedLayout)
    onContinue(layout)
  }

  const selectedLayoutName = layoutOptions.find((l) => l.id === selectedLayout)?.name || ''

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f7f7f5' }}
    >
      {/* Header */}
      <header className="pt-6 pb-4 px-5">
        {/* Logo */}
        <div className="text-center mb-4">
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
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
        <div className="mb-6">
          <ProgressBar currentStep={1} totalSteps={3} />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              marginBottom: '6px',
            }}
          >
            Choose your layout
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#888',
            }}
          >
            Pick how your photos are arranged
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-4 overflow-y-auto">
        <div
          className="mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '12px',
            maxWidth: '640px',
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
              >
                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PreviewComponent />
                </div>
              </SelectionCard>
            )
          })}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="px-5 pb-6 pt-4" style={{ backgroundColor: '#f7f7f5' }}>
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full"
            style={{
              backgroundColor: '#0a0a0a',
              color: '#fff',
              padding: '13px 36px',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Continue →
          </button>
          <p
            className="text-center mt-3"
            style={{
              fontSize: '11px',
              color: '#bbb',
              letterSpacing: '0.03em',
            }}
          >
            {selectedLayoutName} selected
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LayoutSelectionPage
