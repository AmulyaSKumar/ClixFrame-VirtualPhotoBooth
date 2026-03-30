import React, { useEffect, useRef, useState } from 'react'

// Prompt text changes per shot
const promptTexts = {
  1: 'Look at the camera and smile!',
  2: 'Try a different expression',
  3: 'One more — make it fun!',
  4: 'Last one — give it your best!',
}

function CameraScreen({
  photoNumber = 1,
  totalPhotos = 4,
  countdown = 3,
  isCapturing = true,
  isPaused = false,
  onRetake,
  onCancel,
  onVideoRef,
  onCameraReady,
  onFacingModeChange,
}) {
  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState('')
  const [flashEffect, setFlashEffect] = useState(false)
  const [countdownKey, setCountdownKey] = useState(0)
  const [facingMode, setFacingMode] = useState('user') // 'user' = front, 'environment' = back
  const [cameraReady, setCameraReady] = useState(false)
  const streamRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && onVideoRef) {
      onVideoRef(videoRef.current)
    }
  }, [onVideoRef])

  // Notify parent of initial facing mode
  useEffect(() => {
    if (onFacingModeChange) {
      onFacingModeChange(facingMode)
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
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera is not supported on this browser.')
        return
      }

      // Stop existing stream before starting new one
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      setCameraReady(false)
      setCameraError('')

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
          if (onVideoRef) {
            onVideoRef(videoRef.current)
          }
          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true)
            if (onCameraReady) {
              onCameraReady(true)
            }
          }
        }
      } catch (error) {
        setCameraError('Unable to access camera. Please allow camera permissions.')
        setCameraReady(false)
        if (onCameraReady) {
          onCameraReady(false)
        }
      }
    }

    startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode, onVideoRef, onCameraReady])

  const allPhotosDone = photoNumber >= totalPhotos && !isCapturing

  // Toggle between front and back camera
  const toggleCamera = () => {
    setFacingMode((prev) => {
      const newMode = prev === 'user' ? 'environment' : 'user'
      if (onFacingModeChange) {
        onFacingModeChange(newMode)
      }
      return newMode
    })
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
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f7f5',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
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
            onClick={() => onCancel?.()}
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
        <span
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
          }}
        >
          Clix
          <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            frame
          </span>
        </span>

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
            maxHeight: '70vh',
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
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 16px',
                    backgroundColor: '#e8e8e8',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#0a0a0a',
                    marginBottom: '8px',
                  }}
                >
                  Camera Unavailable
                </h2>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#888',
                    maxWidth: '280px',
                    margin: '0 auto 16px',
                  }}
                >
                  {cameraError}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    backgroundColor: '#0a0a0a',
                    color: '#fff',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
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
