import React, { useState } from 'react'

const templates = [
  {
    id: 'classic-vertical',
    name: 'Classic',
    layout: '4x1',
    description: 'Vertical strip',
    icon: (
      <div className="flex flex-col gap-1.5 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full h-4 bg-current rounded-sm opacity-60" />
        ))}
      </div>
    ),
  },
  {
    id: 'horizontal-strip',
    name: 'Wide',
    layout: '1x4',
    description: 'Horizontal strip',
    icon: (
      <div className="flex flex-row gap-1.5 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 h-12 bg-current rounded-sm opacity-60" />
        ))}
      </div>
    ),
  },
  {
    id: 'grid',
    name: 'Grid',
    layout: '2x2',
    description: 'Square collage',
    icon: (
      <div className="grid grid-cols-2 gap-1.5 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square bg-current rounded-sm opacity-60" />
        ))}
      </div>
    ),
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

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-mid hover:text-ink transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-body text-sm">Back</span>
        </button>

        <div className="font-logo text-xl font-bold tracking-tight">
          Clix<span className="font-accent text-2xl">frame</span>
        </div>

        <div className="w-16" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="font-hero text-4xl sm:text-5xl font-bold text-ink mb-3 tracking-tight">
            Pick a Layout
          </h1>
          <p className="font-body text-mid text-base sm:text-lg">
            How should your photos be arranged?
          </p>
        </div>

        {/* Template Cards */}
        <div className="w-full max-w-3xl grid grid-cols-3 gap-4 sm:gap-6 mb-12">
          {templates.map((template) => {
            const isSelected = selected === template.id
            return (
              <button
                key={template.id}
                onClick={() => setSelected(template.id)}
                className={`group relative aspect-[3/4] rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-ink text-bg scale-[1.02] shadow-xl'
                    : 'bg-ghost/50 text-ink hover:bg-ghost hover:scale-[1.01]'
                }`}
              >
                {/* Icon */}
                <div className="w-12 sm:w-16 mb-4 sm:mb-6">
                  {template.icon}
                </div>

                {/* Name */}
                <h3 className="font-subheading text-lg sm:text-xl font-semibold mb-1">
                  {template.name}
                </h3>

                {/* Description */}
                <p className={`font-body text-xs sm:text-sm ${isSelected ? 'text-bg/70' : 'text-mid'}`}>
                  {template.description}
                </p>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-bg rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className={`font-subheading text-base font-medium px-12 py-4 rounded-full transition-all duration-300 ${
            selected
              ? 'bg-ink text-bg hover:bg-ink/90 hover:scale-[1.02] shadow-lg'
              : 'bg-ghost text-mid cursor-not-allowed'
          }`}
        >
          {selected ? 'Continue' : 'Select a layout'}
        </button>
      </main>
    </div>
  )
}

export default TemplateScreen
