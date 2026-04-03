import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooth } from '../../context/BoothContext'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { layoutOptions } from './shared/LayoutPreviews'

function LayoutSelectionPage() {
  const navigate = useNavigate()
  const { handleSelectLayout, backToTemplate, selectedLayout } = useBooth()
  const [selected, setSelected] = useState(selectedLayout?.id || 'classic-strip')

  const handleContinue = () => {
    const layout = layoutOptions.find((l) => l.id === selected)
    if (layout) {
      handleSelectLayout(layout)
    }
  }

  const handleBack = () => {
    backToTemplate()
  }

  const selectedLayoutData = layoutOptions.find((l) => l.id === selected)
  const selectedLayoutName = selectedLayoutData?.name || ''
  const photoCount = selectedLayoutData?.photos || 4

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f5]">
      {/* Header */}
      <header className="bg-[#f7f7f5] border-b border-ink/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Top row: Back, Logo and Nav */}
          <div className="flex items-center justify-between mb-4">
            {/* Back + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-mid hover:text-ink transition-colors"
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
                <span className="font-typewriter text-xs uppercase tracking-wider hidden sm:inline">Back</span>
              </button>
              <Link
                to="/"
                className="font-logo text-xl sm:text-2xl font-bold text-ink tracking-tight hover:opacity-70 transition-opacity"
              >
                Clix<span className="font-accent text-2xl sm:text-3xl">frame</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/about"
                className="font-typewriter text-xs text-mid hover:text-ink transition-colors uppercase tracking-wider"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="font-typewriter text-xs text-mid hover:text-ink transition-colors uppercase tracking-wider"
              >
                Privacy
              </Link>
              <Link
                to="/contact"
                className="font-typewriter text-xs text-mid hover:text-ink transition-colors uppercase tracking-wider"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar currentStep={2} totalSteps={3} />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="font-hero text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Choose your layout
            </h1>
            <p className="font-body text-sm text-mid mt-1">
              Pick how your photos are arranged
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-28 overflow-y-auto" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div className="py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
            {layoutOptions.map((layout) => {
              const PreviewComponent = layout.preview
              return (
                <SelectionCard
                  key={layout.id}
                  name={layout.name}
                  description={layout.description}
                  isSelected={selected === layout.id}
                  onClick={() => setSelected(layout.id)}
                  variant="layout"
                >
                  <div className="h-20 sm:h-24 flex items-center justify-center">
                    <PreviewComponent />
                  </div>
                </SelectionCard>
              )
            })}
          </div>
        </div>
      </main>

      {/* Sticky Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-ink/10 px-4 sm:px-6 py-4 z-40">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <button
            onClick={handleContinue}
            className="w-full bg-ink text-bg font-subheading text-sm font-semibold py-3.5 sm:py-4 rounded-lg hover:bg-ink/90 transition-colors uppercase tracking-wider"
          >
            Start camera →
          </button>
          <p className="text-center text-xs text-mid mt-2">
            {selectedLayoutName} selected · {photoCount} photo{photoCount > 1 ? 's' : ''}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LayoutSelectionPage
