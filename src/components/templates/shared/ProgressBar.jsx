import React from 'react'

function ProgressBar({ currentStep = 1, totalSteps = 3 }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className="h-0.5 w-6 rounded-sm transition-colors duration-200"
          style={{
            backgroundColor: i < currentStep ? '#0a0a0a' : '#ddd',
          }}
        />
      ))}
    </div>
  )
}

export default ProgressBar
