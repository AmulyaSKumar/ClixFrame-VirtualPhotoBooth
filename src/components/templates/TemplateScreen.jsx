import React, { useState } from 'react'

const templates = [
  {
    id: 'classic-vertical',
    name: 'Classic',
    layout: '4x1',
    desc: 'Vertical strip',
  },
  {
    id: 'grid',
    name: 'Grid',
    layout: '2x2',
    desc: '2x2 collage',
  },
  {
    id: 'horizontal-strip',
    name: 'Wide',
    layout: '1x4',
    desc: 'Horizontal strip',
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
    const boxColor = isSelected ? 'bg-bg' : 'bg-ink'

    if (layout === '4x1') {
      return (
        <div className="flex flex-col gap-[3px] w-8 sm:w-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-full h-2 sm:h-2.5 ${boxColor} rounded-[2px]`} />
          ))}
        </div>
      )
    } else if (layout === '2x2') {
      return (
        <div className="grid grid-cols-2 gap-[3px] w-8 sm:w-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-square ${boxColor} rounded-[2px]`} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="flex flex-row gap-[3px] w-14 sm:w-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex-1 h-5 sm:h-6 ${boxColor} rounded-[2px]`} />
          ))}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-ink/10">
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
      <main className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight mb-2">
            Choose Layout
          </h1>
          <p className="font-body text-mid text-sm sm:text-base">
            Select your photo strip style
          </p>
        </div>

        {/* Category Title with Lines */}
        <div className="flex items-center gap-4 w-full max-w-lg mb-6 sm:mb-8">
          <div className="flex-1 h-[1px] bg-ink/15" />
          <span className="font-subheading text-xs sm:text-sm text-mid uppercase tracking-[0.2em]">
            Classic Frames
          </span>
          <div className="flex-1 h-[1px] bg-ink/15" />
        </div>

        {/* Frame Options - 3 Horizontal */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mb-10 sm:mb-12">
          {templates.map((template) => {
            const isSelected = selected === template.id
            return (
              <button
                key={template.id}
                onClick={() => setSelected(template.id)}
                className={`relative flex flex-col items-center p-3 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-ink text-bg border-ink shadow-lg'
                    : 'bg-paper text-ink border-transparent hover:border-ink/20 hover:shadow-md'
                }`}
              >
                {/* Layout Preview */}
                <div className="h-10 sm:h-12 flex items-center justify-center mb-2 sm:mb-3">
                  {renderLayoutPreview(template.layout, isSelected)}
                </div>

                {/* Name */}
                <span className="font-subheading text-sm sm:text-base font-semibold mb-0.5">
                  {template.name}
                </span>

                {/* Description */}
                <span className={`font-body text-[10px] sm:text-xs ${isSelected ? 'text-bg/60' : 'text-mid'}`}>
                  {template.desc}
                </span>

                {/* Selected Checkmark */}
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-bg border-2 border-ink rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`font-subheading text-sm sm:text-base font-semibold px-8 sm:px-12 py-3 sm:py-3.5 rounded-full transition-all duration-200 ${
            selected
              ? 'bg-ink text-bg hover:bg-ink/90 shadow-lg hover:shadow-xl'
              : 'bg-ghost text-mid cursor-not-allowed'
          }`}
        >
          {selected ? 'Continue' : 'Select a frame'}
        </button>
      </main>
    </div>
  )
}

export default TemplateScreen
