import React, { useEffect, useState, useRef, useCallback } from 'react'
import LandingPage from './components/landing/LandingPage'
import TemplateScreen from './components/templates/TemplateScreen'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing') // Start with landing page
  const [photoNumber, setPhotoNumber] = useState(1)
  const [countdown, setCountdown] = useState(3)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [isPaused, setIsPaused] = useState(false) // Pause between shots
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Set video ref from CameraScreen
  const setVideoElement = useCallback((videoElement) => {
    videoRef.current = videoElement
  }, [])

  // Capture photo from video stream
  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return null

    const video = videoRef.current
    const canvas = canvasRef.current

    if (!canvas) return null

    // Set canvas size to match video
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    const ctx = canvas.getContext('2d')

    // Flip horizontally to match mirror view
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    return canvas.toDataURL('image/jpeg', 0.9)
  }, [])

  // Main countdown and capture logic
  useEffect(() => {
    if (currentScreen !== 'camera' || !isCapturing || isPaused) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1
        }

        // Countdown reached 0, capture photo
        const photoData = capturePhoto()

        setCapturedPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos, photoData]

          // Check if we've captured all 4 photos
          if (newPhotos.length >= 4) {
            // Stop capturing and go to result screen
            setIsCapturing(false)
            setTimeout(() => {
              setCurrentScreen('result')
            }, 800) // Brief delay to show the last capture
          } else {
            // Pause between shots - show "Get Ready" message
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setCountdown(3)
            }, 2000) // 2 second pause between shots
          }

          return newPhotos
        })

        setPhotoNumber((currentPhoto) => {
          if (currentPhoto < 4) {
            return currentPhoto + 1
          }
          return currentPhoto // Stay at 4, don't reset
        })

        return prev // Keep current value during pause
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentScreen, isCapturing, isPaused, capturePhoto])

  // Stop countdown when all photos captured
  useEffect(() => {
    if (capturedPhotos.length >= 4) {
      setIsCapturing(false)
    }
  }, [capturedPhotos.length])

  // Navigate from landing to template selection
  const handleStartFromLanding = () => {
    setCurrentScreen('template')
  }

  // Navigate from template selection to camera
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCurrentScreen('camera')
  }

  const handleBackToLanding = () => {
    setCurrentScreen('landing')
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(false)
    setIsPaused(false)
    setSelectedTemplate(null)
  }

  const handleBackToTemplate = () => {
    setCurrentScreen('template')
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(false)
    setIsPaused(false)
  }

  const handleRetake = () => {
    // Retake current photo - reset countdown
    setCountdown(3)
    setIsPaused(false)
  }

  const handleRetakeAll = () => {
    // Go back to camera and retake all photos
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCurrentScreen('camera')
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Landing Page */}
      {currentScreen === 'landing' && (
        <LandingPage onStartBooth={handleStartFromLanding} />
      )}

      {/* Template Selection Screen */}
      {currentScreen === 'template' && (
        <TemplateScreen
          onSelectTemplate={handleSelectTemplate}
          onBack={handleBackToLanding}
        />
      )}

      {/* Photo Booth Screens */}
      {(currentScreen === 'camera' || currentScreen === 'result') && (
        <div key={currentScreen} className="animate-fade-in">
          {currentScreen === 'camera' && (
            <CameraScreen
              photoNumber={photoNumber}
              totalPhotos={4}
              countdown={countdown}
              isCapturing={isCapturing}
              isPaused={isPaused}
              onRetake={handleRetake}
              onCancel={handleBackToTemplate}
              onVideoRef={setVideoElement}
              selectedTemplate={selectedTemplate}
            />
          )}

          {currentScreen === 'result' && (
            <ResultScreen
              photos={capturedPhotos}
              onRetake={handleRetakeAll}
              selectedTemplate={selectedTemplate}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
