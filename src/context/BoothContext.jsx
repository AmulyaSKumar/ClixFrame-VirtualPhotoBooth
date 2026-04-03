import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BoothContext = createContext(null)

export function BoothProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Core state
  const [photoNumber, setPhotoNumber] = useState(1)
  const [countdown, setCountdown] = useState(3)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedLayout, setSelectedLayout] = useState(null)
  const [cameraReady, setCameraReady] = useState(false)

  // Refs
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const facingModeRef = useRef('user')

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
    if (!videoRef.current) {
      console.error('Video ref not set')
      return null
    }

    const video = videoRef.current
    const canvas = canvasRef.current

    if (!canvas) {
      console.error('Canvas ref not set')
      return null
    }

    // Ensure video has valid dimensions
    if (!video.videoWidth || !video.videoHeight) {
      console.error('Video dimensions not available')
      return null
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

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
    // Only run on camera page when capturing, not paused, and camera is ready
    if (location.pathname !== '/camera' || !isCapturing || isPaused || !cameraReady) {
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1
        }

        // Capture photo
        const photoData = capturePhoto()

        if (!photoData) {
          console.error('Failed to capture photo')
          // Don't add null photo, just continue
          return 3 // Reset countdown
        }

        setCapturedPhotos((prevPhotos) => {
          const newPhotos = [...prevPhotos, photoData]

          if (newPhotos.length >= totalPhotos) {
            setIsCapturing(false)
            setTimeout(() => {
              navigate('/result')
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
  }, [location.pathname, isCapturing, isPaused, cameraReady, capturePhoto, totalPhotos, navigate])

  // Stop countdown when all photos captured
  useEffect(() => {
    if (capturedPhotos.length >= totalPhotos && capturedPhotos.length > 0) {
      setIsCapturing(false)
    }
  }, [capturedPhotos.length, totalPhotos])

  // Handle template selection and navigation
  const handleSelectTemplate = useCallback((template) => {
    setSelectedTemplate(template)

    if (template.needsLayout === true) {
      navigate('/layout')
    } else {
      // Template has fixed layout - go directly to camera
      setSelectedLayout(null)
      // Reset camera state
      setPhotoNumber(1)
      setCountdown(3)
      setCapturedPhotos([])
      setIsCapturing(true)
      setIsPaused(false)
      setCameraReady(false)
      navigate('/camera')
    }
  }, [navigate])

  // Handle layout selection and navigation to camera
  const handleSelectLayout = useCallback((layout) => {
    setSelectedLayout(layout)
    // Reset camera state and start
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCameraReady(false)
    navigate('/camera')
  }, [navigate])

  // Start camera with reset state (used for retake)
  const startCamera = useCallback(() => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCameraReady(false)
    navigate('/camera')
  }, [navigate])

  // Reset booth state and go to landing
  const resetBooth = useCallback(() => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(false)
    setIsPaused(false)
    setSelectedTemplate(null)
    setSelectedLayout(null)
    setCameraReady(false)
    navigate('/')
  }, [navigate])

  // Go back to template selection
  const backToTemplate = useCallback(() => {
    setSelectedLayout(null)
    setIsCapturing(false)
    setCameraReady(false)
    navigate('/templates')
  }, [navigate])

  // Go back to layout or template (depending on template)
  const backToLayoutOrTemplate = useCallback(() => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(false)
    setIsPaused(false)
    setCameraReady(false)

    if (selectedTemplate?.needsLayout === true) {
      navigate('/layout')
    } else {
      navigate('/templates')
    }
  }, [navigate, selectedTemplate])

  // Retake single photo
  const handleRetake = useCallback(() => {
    setCountdown(3)
    setIsPaused(false)
  }, [])

  // Retake all photos
  const handleRetakeAll = useCallback(() => {
    setPhotoNumber(1)
    setCountdown(3)
    setCapturedPhotos([])
    setIsCapturing(true)
    setIsPaused(false)
    setCameraReady(false)
    navigate('/camera')
  }, [navigate])

  const value = {
    // State
    photoNumber,
    countdown,
    capturedPhotos,
    isCapturing,
    isPaused,
    selectedTemplate,
    selectedLayout,
    cameraReady,
    totalPhotos,

    // Refs
    canvasRef,

    // Setters
    setSelectedTemplate,
    setSelectedLayout,

    // Handlers
    setVideoElement,
    handleCameraReady,
    handleFacingModeChange,
    handleSelectTemplate,
    handleSelectLayout,
    startCamera,
    resetBooth,
    backToTemplate,
    backToLayoutOrTemplate,
    handleRetake,
    handleRetakeAll,
  }

  return (
    <BoothContext.Provider value={value}>
      {children}
    </BoothContext.Provider>
  )
}

export function useBooth() {
  const context = useContext(BoothContext)
  if (!context) {
    throw new Error('useBooth must be used within a BoothProvider')
  }
  return context
}

export default BoothContext
