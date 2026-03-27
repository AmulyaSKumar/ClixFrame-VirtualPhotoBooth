import React, { useState } from 'react'

const templates = [
  {
    id: 'classic-vertical',
    name: 'Classic Strip',
    layout: '4x1',
    description: '4 photos stacked vertically',
  },
  {
    id: 'horizontal-strip',
    name: 'Wide Strip',
    layout: '1x4',
    description: '4 photos in a row',
  },
  {
    id: 'grid',
    name: 'Grid',
    layout: '2x2',
    description: '2x2 photo collage',
  },
]

function TemplateScreen({ onSelectTemplate, onBack }) {
  const [selected, setSelected] = useState(null)

  const handleContinue = () => {
    if (selected) {
      const template = templates.find((t) => t.id === selected)
      onSelectTemplate(template)
    }
  }

  const renderLayoutPreview = (layout, isSelected) => {
    const baseColor = isSelected ? 'bg-bg/80' : 'bg-ink/20'

    if (layout === '4x1') {
      return (
        <div className="flex flex-col gap-1.5 w-16 sm:w-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-full h-3 sm:h-4 ${baseColor} rounded-sm`} />
          ))}
        </div>
      )
    } else if (layout === '1x4') {
      return (
        <div className="flex flex-row gap-1.5 w-full max-w-[140px] sm:max-w-[180px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex-1 h-10 sm:h-12 ${baseColor} rounded-sm`} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-2 gap-1.5 w-20 sm:w-24">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-[4/3] ${baseColor} rounded-sm`} />
          ))}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-mid hover:text-ink transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-body text-sm hidden sm:inline">Back</span>
        </button>

        <div className="font-logo text-xl sm:text-2xl font-bold tracking-tight">
          Clix<span className="font-accent text-2xl sm:text-3xl">frame</span>
        </div>

        <div className="w-12 sm:w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-5 sm:px-8 pb-8">
        {/* Title Section */}
        <div className="text-center py-6 sm:py-10">
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-2 tracking-tight">
            Choose Your Layout
          </h1>
          <p className="font-body text-mid text-sm sm:text-base">
            Select how your photos will be arranged
          </p>
        </div>

        {/* Template Options */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl space-y-3 sm:space-y-4">
            {templates.map((template) => {
              const isSelected = selected === template.id
              return (
                <button
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                  className={`w-full flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-ink text-bg shadow-lg'
                      : 'bg-ghost/40 text-ink hover:bg-ghost/70'
                  }`}
                >
                  {/* Layout Preview */}
                  <div className="flex items-center justify-center w-24 sm:w-32 flex-shrink-0">
                    {renderLayoutPreview(template.layout, isSelected)}
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <h3 className="font-subheading text-lg sm:text-xl font-semibold mb-0.5">
                      {template.name}
                    </h3>
                    <p className={`font-body text-sm ${isSelected ? 'text-bg/70' : 'text-mid'}`}>
                      {template.description}
                    </p>
                  </div>

                  {/* Check Icon */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? 'bg-bg' : 'border-2 border-ink/20'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="mt-8 sm:mt-10">
            <button
              onClick={handleContinue}
              disabled={!selected}
              className={`font-subheading text-base font-semibold px-10 sm:px-14 py-3.5 sm:py-4 rounded-full transition-all duration-200 ${
                selected
                  ? 'bg-ink text-bg hover:bg-ink/90 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-ghost text-mid cursor-not-allowed'
              }`}
            >
              {selected ? 'Start Capturing' : 'Select a layout'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TemplateScreen
