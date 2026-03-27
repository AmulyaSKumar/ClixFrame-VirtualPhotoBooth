import React, { useState } from 'react'

const templates = [
  {
    id: 'classic-vertical',
    name: 'Classic',
    layout: '4x1',
  },
  {
    id: 'grid',
    name: 'Grid',
    layout: '2x2',
  },
  {
    id: 'horizontal-strip',
    name: 'Wide',
    layout: '1x4',
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
    const boxColor = isSelected ? 'bg-bg' : 'bg-ink/70'

    if (layout === '4x1') {
      return (
        <div className="flex flex-col gap-1 w-10 sm:w-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-full h-2.5 sm:h-3 ${boxColor} rounded-[2px]`} />
          ))}
        </div>
      )
    } else if (layout === '2x2') {
      return (
        <div className="grid grid-cols-2 gap-1 w-10 sm:w-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-[4/3] ${boxColor} rounded-[2px]`} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="flex flex-row gap-1 w-16 sm:w-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex-1 h-6 sm:h-8 ${boxColor} rounded-[2px]`} />
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
        {/* Title */}
        <div className="text-center py-8 sm:py-12">
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight">
            Choose Layout
          </h1>
        </div>

        {/* Category Section */}
        <div className="flex-1 flex flex-col items-center">
          {/* Category Title with Lines */}
          <div className="flex items-center gap-4 w-full max-w-2xl mb-8 sm:mb-10">
            <div className="flex-1 h-[1px] bg-ink/20" />
            <span className="font-subheading text-sm sm:text-base text-mid uppercase tracking-widest">
              Classic Frames
            </span>
            <div className="flex-1 h-[1px] bg-ink/20" />
          </div>

          {/* Frame Options - 3 Horizontal */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-xl">
            {templates.map((template) => {
              const isSelected = selected === template.id
              return (
                <button
                  key={template.id}
                  onClick={() => setSelected(template.id)}
                  className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-ink text-bg shadow-xl scale-[1.02]'
                      : 'bg-ghost/40 text-ink hover:bg-ghost/70'
                  }`}
                >
                  {/* Layout Preview */}
                  <div className="mb-3 sm:mb-4 h-12 sm:h-14 flex items-center justify-center">
                    {renderLayoutPreview(template.layout, isSelected)}
                  </div>

                  {/* Name */}
                  <span className="font-subheading text-sm sm:text-base font-semibold">
                    {template.name}
                  </span>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-bg rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="mt-10 sm:mt-14">
            <button
              onClick={handleContinue}
              disabled={!selected}
              className={`font-subheading text-base font-semibold px-10 sm:px-14 py-3.5 sm:py-4 rounded-full transition-all duration-200 ${
                selected
                  ? 'bg-ink text-bg hover:bg-ink/90 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-ghost text-mid cursor-not-allowed'
              }`}
            >
              {selected ? 'Continue' : 'Select a frame'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TemplateScreen
