import React, { useState } from 'react'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { templateOptions, allTemplates } from './shared/TemplatePreviews'

const sectionLabels = {
  minimal: 'Minimal',
  newspaper: 'Newspaper',
  polaroid: 'Polaroid',
  film: 'Film',
}

function TemplateSelectionPage({ onContinue, onBack, initialSelection = 'clean-white' }) {
  const [selectedTemplate, setSelectedTemplate] = useState(initialSelection)

  const handleContinue = () => {
    const template = allTemplates.find((t) => t.id === selectedTemplate)
    onContinue(template)
  }

  const selectedTemplateName = allTemplates.find((t) => t.id === selectedTemplate)?.name || ''

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f7f7f5' }}
    >
      {/* Header */}
      <header className="pt-6 pb-4 px-5">
        {/* Back Arrow + Logo */}
        <div className="flex items-center justify-center relative mb-4">
          {/* Back Arrow */}
          <button
            onClick={onBack}
            className="absolute left-0 p-1"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logo */}
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
          <ProgressBar currentStep={2} totalSteps={3} />
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
            Choose your template
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#888',
            }}
          >
            Frames and borders for your photos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="mx-auto" style={{ maxWidth: '640px' }}>
          {Object.entries(templateOptions).map(([sectionKey, templates]) => (
            <div key={sectionKey} className="mb-6">
              {/* Section Label */}
              <div
                className="flex items-center gap-3 mb-3"
                style={{ paddingLeft: '4px' }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {sectionLabels[sectionKey]}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    backgroundColor: '#e0e0e0',
                  }}
                />
              </div>

              {/* Template Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '12px',
                }}
              >
                {templates.map((template) => {
                  const PreviewComponent = template.preview
                  return (
                    <SelectionCard
                      key={template.id}
                      name={template.name}
                      description={template.description}
                      isSelected={selectedTemplate === template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div
                        style={{
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
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
            Continue to camera
          </button>
          <p
            className="text-center mt-3"
            style={{
              fontSize: '11px',
              color: '#bbb',
              letterSpacing: '0.03em',
            }}
          >
            {selectedTemplateName} selected
          </p>
        </div>
      </footer>
    </div>
  )
}

export default TemplateSelectionPage
