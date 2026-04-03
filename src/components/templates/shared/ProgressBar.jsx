import React from 'react'

const steps = ['Style', 'Layout', 'Camera', 'Done']

function ProgressBar({ currentStep = 1, totalSteps = 3 }) {
  // currentStep: 1 = template, 2 = layout, 3 = camera, 4 = result
  const stepIndex = currentStep - 1

  return (
    <div className="step-bar">
      {steps.slice(0, totalSteps + 1).map((step, i) => {
        const isDone = i < stepIndex
        const isActive = i === stepIndex
        return (
          <div
            key={i}
            className={`step-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
          >
            <div className="step-dot">
              {isDone ? '✓' : i + 1}
            </div>
            <span className="step-label">{step}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ProgressBar
