import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooth } from '../context/BoothContext'

// Check if we're on HTTPS or localhost
const isSecureContext = () => {
  return window.isSecureContext ||
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
}

// Prompt text changes per shot
const promptTexts = {
  1: 'Look at the camera and smile!',
  2: 'Try a different expression',
  3: 'One more — make it fun!',
  4: 'Last one — give it your best!',
}

function CameraScreen() {
  // Get everything from context
  const {
    photoNumber,
    totalPhotos,
    countdown,
    isCapturing,
    isPaused,
    setVideoElement,
    handleCameraReady,
    handleFacingModeChange,
    backToLayoutOrTemplate,
  } = useBooth()

  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState('')
  const [errorType, setErrorType] = useState('') // 'permission', 'http', 'not-supported', 'generic'
  const [flashEffect, setFlashEffect] = useState(false)
  const [countdownKey, setCountdownKey] = useState(0)
  const [facingMode, setFacingMode] = useState('user') // 'user' = front, 'environment' = back
  const [cameraReady, setCameraReady] = useState(false)
  const streamRef = useRef(null)

  // Pass video ref to context
  useEffect(() => {
    if (videoRef.current && setVideoElement) {
      setVideoElement(videoRef.current)
    }
  }, [setVideoElement])

  // Notify parent of initial facing mode
  useEffect(() => {
    if (handleFacingModeChange) {
      handleFacingModeChange(facingMode)
    }
  }, []) // Only on mount

  // Track countdown changes for fade animation
  useEffect(() => {
    setCountdownKey((prev) => prev + 1)
  }, [countdown])

  useEffect(() => {
    if (countdown === 1 && isCapturing) {
      const flashTimer = setTimeout(() => {
        setFlashEffect(true)
        setTimeout(() => setFlashEffect(false), 150)
      }, 900)
      return () => clearTimeout(flashTimer)
    }
  }, [countdown, isCapturing])

  useEffect(() => {
    const startCamera = async () => {
      // Check for HTTPS first
      if (!isSecureContext()) {
        setCameraError('Camera requires a secure connection (HTTPS).')
        setErrorType('http')
        setCameraReady(false)
        if (handleCameraReady) handleCameraReady(false)
        return
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera is not supported on this browser.')
        setErrorType('not-supported')
        return
      }

      // Stop existing stream before starting new one
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      setCameraReady(false)
      setCameraError('')
      setErrorType('')

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })

        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          if (setVideoElement) {
            setVideoElement(videoRef.current)
          }
          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true)
            if (handleCameraReady) {
              handleCameraReady(true)
            }
          }
        }
      } catch (error) {
        setCameraReady(false)
        if (handleCameraReady) handleCameraReady(false)

        // Detect specific error types
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setCameraError('Camera access was denied.')
          setErrorType('permission')
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          setCameraError('No camera found on this device.')
          setErrorType('not-found')
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          setCameraError('Camera is in use by another app.')
          setErrorType('in-use')
        } else {
          setCameraError('Unable to access camera.')
          setErrorType('generic')
        }
      }
    }

    startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode, setVideoElement, handleCameraReady])

  const allPhotosDone = photoNumber >= totalPhotos && !isCapturing

  // Toggle between front and back camera
  const toggleCamera = () => {
    setFacingMode((prev) => {
      const newMode = prev === 'user' ? 'environment' : 'user'
      if (handleFacingModeChange) {
        handleFacingModeChange(newMode)
      }
      return newMode
    })
  }

  // Handle exit/cancel
  const handleCancel = () => {
    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    backToLayoutOrTemplate()
  }

  // Progress dots component
  const ProgressDots = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px',
      }}
    >
      {Array.from({ length: totalPhotos }, (_, i) => {
        const isCompleted = i < photoNumber - 1 || (i === photoNumber - 1 && allPhotosDone)
        const isCurrent = i === photoNumber - 1 && !allPhotosDone
        const isUpcoming = i >= photoNumber

        return (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isCompleted || isCurrent ? '#0a0a0a' : '#ddd',
              position: 'relative',
            }}
          >
            {isCurrent && isCapturing && !isPaused && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  animation: 'pulse-ring 1.5s ease-out infinite',
                }}
              />
            )}
          </div>
        )
      })}
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(10, 10, 10, 0.3);
          }
          70% {
            box-shadow: 0 0 0 6px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )

  return (
    <div
      className="camera-screen-container"
      style={{
        minHeight: '100dvh', // Modern dynamic viewport height
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f5',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        paddingTop: 'env(safe-area-inset-top, 0)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          paddingBottom: '8px',
        }}
      >
        {/* Left buttons group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Exit Button */}
          <button
            onClick={handleCancel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              fontSize: '13px',
              padding: '4px',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Exit</span>
          </button>

          {/* Camera Toggle Button */}
          <button
            onClick={toggleCamera}
            disabled={!cameraReady}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: cameraReady ? 'pointer' : 'not-allowed',
              color: cameraReady ? '#555' : '#bbb',
              fontSize: '12px',
              padding: '6px 10px',
              transition: 'all 0.15s ease',
            }}
            title={facingMode === 'user' ? 'Switch to back camera' : 'Switch to front camera'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Camera flip/switch icon */}
              <path d="M16 3h5v5" />
              <path d="M8 21H3v-5" />
              <path d="M21 3l-7 7" />
              <path d="M3 21l7-7" />
            </svg>
            <span style={{ marginLeft: '2px' }}>{facingMode === 'user' ? 'Rear' : 'Front'}</span>
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}
        >
          Clix
          <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            frame
          </span>
        </Link>

        {/* Photo Counter */}
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#888',
          }}
        >
          {photoNumber} / {totalPhotos}
        </span>
      </header>

      {/* Progress Dots */}
      <ProgressDots />

      {/* Camera Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 0',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            maxHeight: 'min(70vh, 70dvh, 500px)', // Use dvh for iOS Safari
            aspectRatio: '4 / 3',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e8e8e8',
            backgroundColor: '#000',
          }}
        >
          {cameraError ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f7f7f5',
              }}
            >
              <div style={{ textAlign: 'center', padding: '24px', maxWidth: '320px' }}>
                {/* Icon based on error type */}
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    margin: '0 auto 20px',
                    backgroundColor: errorType === 'http' ? '#fef3c7' : errorType === 'permission' ? '#fee2e2' : '#e8e8e8',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {errorType === 'permission' ? (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                  ) : errorType === 'http' ? (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </div>

                {/* Title based on error type */}
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0a0a0a', marginBottom: '8px' }}>
                  {errorType === 'permission' && 'Camera Access Blocked'}
                  {errorType === 'http' && 'Secure Connection Required'}
                  {errorType === 'not-found' && 'No Camera Found'}
                  {errorType === 'in-use' && 'Camera Busy'}
                  {errorType === 'not-supported' && 'Camera Not Supported'}
                  {errorType === 'generic' && 'Camera Unavailable'}
                </h2>

                {/* Error message */}
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: 1.5 }}>
                  {cameraError}
                </p>

                {/* Instructions based on error type */}
                <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#0a0a0a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    How to fix:
                  </p>
                  {errorType === 'permission' && (
                    <ol style={{ fontSize: '13px', color: '#555', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                      <li>Click the camera icon in your browser's address bar</li>
                      <li>Select "Allow" for camera access</li>
                      <li>Refresh this page</li>
                    </ol>
                  )}
                  {errorType === 'http' && (
                    <ol style={{ fontSize: '13px', color: '#555', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                      <li>Make sure the URL starts with <strong>https://</strong></li>
                      <li>If using localhost, camera should work</li>
                      <li>Contact site admin if HTTPS is not available</li>
                    </ol>
                  )}
                  {errorType === 'not-found' && (
                    <ol style={{ fontSize: '13px', color: '#555', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                      <li>Connect a webcam to your device</li>
                      <li>Check if camera is enabled in system settings</li>
                      <li>Try using a different browser</li>
                    </ol>
                  )}
                  {errorType === 'in-use' && (
                    <ol style={{ fontSize: '13px', color: '#555', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                      <li>Close other apps using the camera (Zoom, Teams, etc.)</li>
                      <li>Close other browser tabs with camera access</li>
                      <li>Refresh this page</li>
                    </ol>
                  )}
                  {(errorType === 'not-supported' || errorType === 'generic') && (
                    <ol style={{ fontSize: '13px', color: '#555', margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
                      <li>Try using Chrome, Safari, or Firefox</li>
                      <li>Update your browser to the latest version</li>
                      <li>Check your device's camera permissions</li>
                    </ol>
                  )}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      backgroundColor: '#fff',
                      color: '#555',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      backgroundColor: '#0a0a0a',
                      color: '#fff',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                }}
                autoPlay
                playsInline
                muted
              />

              {/* Loading overlay while waiting for camera */}
              {!cameraReady && !cameraError && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <p style={{ color: '#fff', marginTop: '16px', fontSize: '14px' }}>
                    Waiting for camera...
                  </p>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {/* Flash Effect */}
              {flashEffect && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#fff',
                    zIndex: 30,
                  }}
                />
              )}

              {/* Countdown - Top Right */}
              {isCapturing && !isPaused && !allPhotosDone && cameraReady && (
                <div
                  key={countdownKey}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '48px',
                      fontWeight: 600,
                      color: '#fff',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      lineHeight: 1,
                    }}
                  >
                    {countdown}
                  </span>
                </div>
              )}

              {/* Done Overlay */}
              {allPhotosDone && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#fff',
                      padding: '16px 32px',
                      borderRadius: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '28px',
                        fontWeight: 500,
                        color: '#0a0a0a',
                      }}
                    >
                      Done!
                    </span>
                  </div>
                </div>
              )}

              {/* Get Ready - Top Right */}
              {isPaused && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    textAlign: 'right',
                  }}
                >
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#fff',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                      display: 'block',
                    }}
                  >
                    Get Ready!
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#fff',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    Photo {photoNumber} of {totalPhotos}
                  </span>
                </div>
              )}

              {/* Corner Guides (Viewfinder brackets) */}
              <div style={{ position: 'absolute', inset: '16px', pointerEvents: 'none' }}>
                {/* Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '20px',
                    height: '20px',
                    borderTop: '2px solid rgba(255, 255, 255, 0.7)',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.7)',
                  }}
                />
                {/* Top Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '20px',
                    height: '20px',
                    borderTop: '2px solid rgba(255, 255, 255, 0.7)',
                    borderRight: '2px solid rgba(255, 255, 255, 0.7)',
                  }}
                />
                {/* Bottom Left */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '20px',
                    height: '20px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.7)',
                  }}
                />
                {/* Bottom Right */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '20px',
                    height: '20px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
                    borderRight: '2px solid rgba(255, 255, 255, 0.7)',
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Prompt Text */}
      {!cameraError && (
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '32px',
            marginTop: '-8px',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              color: '#555',
              margin: 0,
            }}
          >
            {!cameraReady
              ? 'Please allow camera access to continue...'
              : allPhotosDone
              ? 'Processing your photo strip...'
              : isPaused
              ? 'Get ready for the next shot...'
              : promptTexts[photoNumber] || 'Look at the camera and smile!'}
          </p>
        </div>
      )}
    </div>
  )
}

export default CameraScreen
