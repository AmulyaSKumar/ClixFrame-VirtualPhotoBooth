import React, { useState } from 'react'
import ProgressBar from './shared/ProgressBar'
import SelectionCard from './shared/SelectionCard'
import { templateOptions, allTemplates } from './shared/TemplatePreviews'

const sectionLabels = {
  minimal: 'Minimal',
  newspaper: 'Newspaper',
  polaroid: 'Polaroid',
  film: 'Film',
  signature: 'Signature',
}

function TemplateSelectionPage({
  onContinue,
  onBack,
  initialSelection = 'clean-white',
  currentStep = 1,
  totalSteps = 3,
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(initialSelection)

  const handleContinue = () => {
    const template = allTemplates.find((t) => t.id === selectedTemplate)
    onContinue(template)
  }

  const selectedTemplateData = allTemplates.find((t) => t.id === selectedTemplate)
  const selectedTemplateName = selectedTemplateData?.name || ''
  const needsLayout = selectedTemplateData?.needsLayout !== false

  // Button text changes based on whether template needs layout selection
  const buttonText = needsLayout ? 'Choose layout →' : 'Start camera →'

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
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
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
            Choose your template
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#888',
              margin: 0,
              marginTop: '4px',
            }}
          >
            Frames and borders for your photos
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
        <div style={{ width: '100%' }}>
          {Object.entries(templateOptions).map(([sectionKey, templates]) => (
            <div key={sectionKey} style={{ marginBottom: '24px' }}>
              {/* Section Label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1rem',
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
                  {sectionLabels[sectionKey]}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '0.5px',
                    backgroundColor: '#ddd',
                  }}
                />
              </div>

              {/* Template Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '14px',
                  width: '100%',
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
                      variant="template"
                    >
                      <div
                        style={{
                          height: '130px',
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
          {buttonText}
        </button>
        <p
          style={{
            fontSize: '11px',
            color: '#bbb',
            textAlign: 'center',
            marginTop: '6px',
          }}
        >
          {selectedTemplateName} selected
          {!needsLayout && selectedTemplateData?.fixedPhotos && (
            <span> · {selectedTemplateData.fixedPhotos} photo{selectedTemplateData.fixedPhotos > 1 ? 's' : ''}</span>
          )}
        </p>
      </footer>
    </div>
  )
}

export default TemplateSelectionPage
