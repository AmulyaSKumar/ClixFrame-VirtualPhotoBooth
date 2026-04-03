import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooth } from '../../context/BoothContext'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { templateOptions, allTemplates } from './shared/TemplatePreviews'

const sectionLabels = {
  minimal: 'Minimal',
  newspaper: 'Newspaper',
  polaroid: 'Polaroid',
  film: 'Film',
}

function TemplateSelectionPage() {
  const navigate = useNavigate()
  const { handleSelectTemplate, selectedTemplate } = useBooth()
  const [selected, setSelected] = useState(selectedTemplate?.id || 'clean-white')

  const handleContinue = () => {
    const template = allTemplates.find((t) => t.id === selected)
    if (template) {
      handleSelectTemplate(template)
    }
  }

  const selectedTemplateData = allTemplates.find((t) => t.id === selected)
  const selectedTemplateName = selectedTemplateData?.name || ''
  const needsLayout = selectedTemplateData?.needsLayout !== false

  // Button text changes based on whether template needs layout selection
  const buttonText = needsLayout ? 'Choose layout →' : 'Start camera →'

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f5]">
      {/* Header */}
      <header className="bg-[#f7f7f5] border-b border-ink/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Top row: Logo and Nav */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <Link
              to="/"
              className="font-logo text-xl sm:text-2xl font-bold text-ink tracking-tight hover:opacity-70 transition-opacity"
            >
              Clix<span className="font-accent text-2xl sm:text-3xl">frame</span>
            </Link>

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
            <ProgressBar currentStep={1} totalSteps={3} />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="font-hero text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Choose your template
            </h1>
            <p className="font-body text-sm text-mid mt-1">
              Frames and borders for your photos
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-40 overflow-y-auto" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="py-6">
          {Object.entries(templateOptions).map(([sectionKey, templates]) => (
            <div key={sectionKey} className="mb-8">
              {/* Section Label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-typewriter text-xs uppercase tracking-widest text-mid/70">
                  {sectionLabels[sectionKey]}
                </span>
                <div className="flex-1 h-px bg-ink/10" />
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {templates.map((template) => {
                  const PreviewComponent = template.preview
                  return (
                    <SelectionCard
                      key={template.id}
                      name={template.name}
                      description={template.description}
                      isSelected={selected === template.id}
                      onClick={() => setSelected(template.id)}
                      variant="template"
                    >
                      <div className="h-24 sm:h-32 flex items-center justify-center overflow-hidden">
                        <PreviewComponent />
                      </div>
                    </SelectionCard>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sticky Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-ink/10 px-4 sm:px-6 py-4 z-40">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <button
            onClick={handleContinue}
            className="w-full bg-ink text-bg font-subheading text-sm font-semibold py-3.5 sm:py-4 rounded-lg hover:bg-ink/90 transition-colors uppercase tracking-wider"
          >
            {buttonText}
          </button>
          <p className="text-center text-xs text-mid mt-2">
            {selectedTemplateName} selected
            {!needsLayout && selectedTemplateData?.fixedPhotos && (
              <span> · {selectedTemplateData.fixedPhotos} photo{selectedTemplateData.fixedPhotos > 1 ? 's' : ''}</span>
            )}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TemplateSelectionPage
