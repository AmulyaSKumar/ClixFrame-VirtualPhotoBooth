import React, { useEffect, useState, useRef, useCallback } from 'react'
import LandingPage from './components/landing/LandingPage'
import TemplateSelectionPage from './components/templates/TemplateSelectionPage'
import LayoutSelectionPage from './components/templates/LayoutSelectionPage'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [photoNumber, setPhotoNumber] = useState(1)
  const [countdown, setCountdown] = useState(3)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedLayout, setSelectedLayout] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const facingModeRef = useRef('user') // Track current camera facing mode

  // Get total photos - from layout if available, else from template's fixed count, else 4
  const totalPhotos = selectedLayout?.photos || selectedTemplate?.fixedPhotos || 4

  // Set video ref from CameraScreen
  const setVideoElement = useCallback((videoElement) => {
    videoRef.current = videoElement
  }, [])

  // Handle camera ready state from CameraScreen
  const handleCameraReady = useCallback((ready) => {
    setCameraReady(ready)
  }, [])

  // Handle facing mode changes from CameraScreen
  const handleFacingModeChange = useCallback((mode) => {
    facingModeRef.current = mode
  }, [])

  // Capture photo from video stream
  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return null

    const video = videoRef.current
    const canvas = canvasRef.current

    if (!canvas) return null

    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    const ctx = canvas.getContext('2d')

    // Only mirror for front camera (user facing)
    if (facingModeRef.current === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    ctx.setTransform(1, 0, 0, 1, 0, 0)

    return canvas.toDataURL('image/jpeg', 0.9)
  }, [])

  // Main countdown and capture logic
  useEffect(() => {
    if (currentScreen !== 'camera' || !isCapturing || isPaused || !cameraReady) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1
        }

        const photoData = capturePhoto()

        setCapturedPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos, photoData]

          if (newPhotos.length >= totalPhotos) {
            setIsCapturing(false)
            setTimeout(() => {
              setCurrentScreen('result')
            }, 800)
          } else {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setCountdown(3)
            }, 2000)
          }

          return newPhotos
        })

        setPhotoNumber((currentPhoto) => {
          if (currentPhoto < totalPhotos) {
            return currentPhoto + 1
          }
          return currentPhoto
        })

        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentScreen, isCapturing, isPaused, cameraReady, capturePhoto, totalPhotos])

  // Stop countdown when all photos captured
  useEffect(() => {
    if (capturedPhotos.length >= totalPhotos) {
      setIsCapturing(false)
    }
  }, [capturedPhotos.length, totalPhotos])

  // Navigate from landing to template selection (Step 1)
  const handleStartFromLanding = () => {
    setCurrentScreen('template')
  }

  // Navigate from template selection
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)

    // If template needs layout selection, go to layout page
    // Otherwise, go directly to camera
    if (template.needsLayout) {
      setCurrentScreen('layout')
    } else {
      // Template has fixed layout - go directly to camera
      setSelectedLayout(null) // Clear any previous layout
      startCamera()
    }
  }

  // Navigate from layout selection to camera
  const handleSelectLayout = (layout) => {
    setSelectedLayout(layout)
    startCamera()
  }

  // Start camera with reset state
  const startCamera = () => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCameraReady(false)
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
    setSelectedLayout(null)
  }

  const handleBackToTemplate = () => {
    setCurrentScreen('template')
    setSelectedLayout(null)
  }

  const handleBackToLayoutOrTemplate = () => {
    // If template needs layout, go back to layout selection
    // Otherwise go back to template selection
    if (selectedTemplate?.needsLayout) {
      setCurrentScreen('layout')
    } else {
      setCurrentScreen('template')
    }
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(false)
    setIsPaused(false)
  }

  const handleRetake = () => {
    setCountdown(3)
    setIsPaused(false)
  }

  const handleRetakeAll = () => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCurrentScreen('camera')
  }

  // Determine total steps for progress bar
  const getTotalSteps = () => {
    if (selectedTemplate?.needsLayout === false) {
      return 2 // Template → Camera (no layout step)
    }
    return 3 // Template → Layout → Camera
  }

  return (
    <div className="min-h-screen w-full">
      <canvas ref={canvasRef} className="hidden" />

      {/* Landing Page */}
      {currentScreen === 'landing' && (
        <LandingPage onStartBooth={handleStartFromLanding} />
      )}

      {/* Template Selection Screen (Step 1) */}
      {currentScreen === 'template' && (
        <TemplateSelectionPage
          onContinue={handleSelectTemplate}
          onBack={handleBackToLanding}
          initialSelection={selectedTemplate?.id || 'clean-white'}
          currentStep={1}
          totalSteps={3}
        />
      )}

      {/* Layout Selection Screen (Step 2 - only for templates that need it) */}
      {currentScreen === 'layout' && (
        <LayoutSelectionPage
          onContinue={handleSelectLayout}
          onBack={handleBackToTemplate}
          initialSelection={selectedLayout?.id || 'classic-strip'}
          currentStep={2}
          totalSteps={3}
        />
      )}

      {/* Photo Booth Screens */}
      {(currentScreen === 'camera' || currentScreen === 'result') && (
        <div key={currentScreen} className="animate-fade-in">
          {currentScreen === 'camera' && (
            <CameraScreen
              photoNumber={photoNumber}
              totalPhotos={totalPhotos}
              countdown={countdown}
              isCapturing={isCapturing}
              isPaused={isPaused}
              onRetake={handleRetake}
              onCancel={handleBackToLayoutOrTemplate}
              onVideoRef={setVideoElement}
              onCameraReady={handleCameraReady}
              onFacingModeChange={handleFacingModeChange}
              selectedLayout={selectedLayout}
              selectedTemplate={selectedTemplate}
            />
          )}

          {currentScreen === 'result' && (
            <ResultScreen
              photos={capturedPhotos}
              onRetake={handleRetakeAll}
              selectedLayout={selectedLayout}
              selectedTemplate={selectedTemplate}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
