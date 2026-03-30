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
          <ProgressBar currentStep={2} totalSteps={3} />
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
          Continue to camera
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
        </p>
      </footer>
    </div>
  )
}

export default TemplateSelectionPage
