import React, { useEffect, useRef, useState } from 'react'

function CameraScreen({
  photoNumber = 1,
  totalPhotos = 4,
  countdown = 3,
  isCapturing = true,
  isPaused = false,
  onRetake,
  onCancel,
  onVideoRef,
}) {
  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState('')
  const [flashEffect, setFlashEffect] = useState(false)

  useEffect(() => {
    if (videoRef.current && onVideoRef) {
      onVideoRef(videoRef.current)
    }
  }, [onVideoRef])

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
    let stream

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera is not supported on this browser.')
        return
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          if (onVideoRef) {
            onVideoRef(videoRef.current)
          }
        }
      } catch (error) {
        setCameraError('Unable to access camera. Please allow camera permissions.')
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onVideoRef])

  const allPhotosDone = photoNumber >= totalPhotos && !isCapturing

  return (
    <div className="min-h-screen w-full flex flex-col bg-ink">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => onCancel?.()}
          className="flex items-center gap-2 text-bg/60 hover:text-bg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-body text-sm">Exit</span>
        </button>

        <div className="font-logo text-xl font-bold text-bg tracking-tight">
          Clix<span className="font-accent text-2xl">frame</span>
        </div>

        <div className="flex items-center gap-2 bg-bg/10 px-4 py-2 rounded-full">
          <span className="font-hero text-2xl font-bold text-bg">{photoNumber}</span>
          <span className="text-bg/40">/</span>
          <span className="font-body text-lg text-bg/60">{totalPhotos}</span>
        </div>
      </header>

      {/* Camera Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-ink">
              <div className="text-center space-y-4 p-6">
                <div className="w-16 h-16 mx-auto bg-bg/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="font-hero text-xl font-bold text-bg">Camera Unavailable</h2>
                <p className="font-body text-bg/60 text-sm max-w-xs">{cameraError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="font-subheading text-sm bg-bg text-ink px-6 py-2 rounded-full hover:bg-bg/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                autoPlay
                playsInline
                muted
              />

              {flashEffect && (
                <div className="absolute inset-0 bg-white z-30 animate-flash" />
              )}

              {/* Countdown Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {allPhotosDone ? (
                  <div className="bg-bg/95 backdrop-blur-sm px-8 py-4 rounded-2xl">
                    <span className="font-hero text-4xl sm:text-5xl font-bold text-ink">
                      Done!
                    </span>
                  </div>
                ) : isPaused ? (
                  <div className="text-center bg-ink/80 backdrop-blur-sm px-8 py-6 rounded-2xl">
                    <span className="font-hero text-3xl sm:text-4xl font-bold text-bg block mb-2">
                      Get Ready!
                    </span>
                    <p className="font-body text-sm text-bg/70">
                      Photo {photoNumber} of {totalPhotos}
                    </p>
                  </div>
                ) : isCapturing ? (
                  <div className="relative">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-ink/80 backdrop-blur-md flex items-center justify-center shadow-2xl">
                      <span className="font-hero text-8xl sm:text-9xl font-bold text-bg">
                        {countdown}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Corner Markers */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Status */}
      {!cameraError && (
        <div className="px-6 py-6 text-center">
          <p className="font-body text-bg/70 text-base">
            {allPhotosDone
              ? 'Processing your photo strip...'
              : isCapturing
              ? 'Look at the camera and smile!'
              : 'Getting ready...'}
          </p>
        </div>
      )}
    </div>
  )
}

export default CameraScreen
