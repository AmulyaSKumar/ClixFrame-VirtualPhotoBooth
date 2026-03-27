import React, { useState } from 'react'

const templates = [
  {
    id: 'classic-vertical',
    name: 'Classic Strip',
    layout: '4x1',
  },
  {
    id: 'horizontal-strip',
    name: 'Wide Strip',
    layout: '1x4',
  },
  {
    id: 'grid',
    name: 'Grid',
    layout: '2x2',
  },
]

function TemplateScreen({ onSelectTemplate, onBack }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleSelect = (template) => {
    setSelectedTemplate(template.id)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.id === selectedTemplate)
      onSelectTemplate(template)
    }
  }

  const renderPreview = (layout, isSelected) => {
    const baseClass = "bg-ink/20 border border-ink/40"

    if (layout === '4x1') {
      return (
        <div className="flex flex-col gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-10 h-7 ${baseClass}`} />
          ))}
        </div>
      )
    } else if (layout === '1x4') {
      return (
        <div className="flex flex-row gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-7 h-10 ${baseClass}`} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-8 h-8 ${baseClass}`} />
          ))}
        </div>
      )
    }
  }

  return (
    <section className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
        <button
          type="button"
          className="font-typewriter text-xs text-mid hover:text-ink transition-colors"
          onClick={onBack}
        >
          &larr; Back
        </button>
        <span className="font-logo text-lg text-ink font-bold">
          Clix<span className="font-accent">frame</span>
        </span>
        <div className="w-12" />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-hero text-2xl sm:text-3xl text-ink mb-2">Choose Layout</h1>
          <p className="font-body text-mid text-sm">Select your photo strip style</p>
        </div>

        {/* Template Options */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleSelect(template)}
                className={`relative flex flex-col items-center p-5 sm:p-6 border-2 transition-all ${
                  isSelected
                    ? 'border-ink bg-paper'
                    : 'border-ink/20 bg-bg hover:border-ink/50'
                }`}
              >
                {/* Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-ink flex items-center justify-center">
                    <svg className="w-3 h-3 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Preview */}
                <div className="mb-4">
                  {renderPreview(template.layout, isSelected)}
                </div>

                {/* Name */}
                <span className="font-typewriter text-xs text-ink uppercase tracking-wider">
                  {template.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`font-typewriter text-sm bg-ink text-bg px-8 py-3 transition-all ${
            !selectedTemplate ? 'opacity-30 cursor-not-allowed' : 'hover:bg-ink/80'
          }`}
        >
          Start Camera
        </button>
      </div>
    </section>
  )
}

export default TemplateScreen
