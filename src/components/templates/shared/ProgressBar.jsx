import React from 'react'

function ProgressBar({ currentStep = 1, totalSteps = 3 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          style={{
            width: '24px',
            height: '2px',
            borderRadius: '1px',
            backgroundColor: i < currentStep ? '#0a0a0a' : '#ddd',
            transition: 'background-color 0.2s ease',
          }}
        />
      ))}
    </div>
  )
}

export default ProgressBar
