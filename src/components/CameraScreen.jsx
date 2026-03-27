import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

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
    <section className="min-h-screen w-full flex flex-col bg-ink">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-bg/10">
        <button
          type="button"
          className="font-typewriter text-xs text-bg/70 hover:text-bg transition-colors"
          onClick={() => onCancel?.()}
        >
          &larr; Exit
        </button>

        <div className="font-logo text-lg text-bg font-bold">
          Clix<span className="font-accent">frame</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-hero text-xl text-bg">{photoNumber}</span>
          <span className="text-bg/50">/</span>
          <span className="font-hero text-lg text-bg/70">{totalPhotos}</span>
        </div>
      </header>

      {/* Camera Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl aspect-[4/3] bg-black overflow-hidden">
          {cameraError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-ink">
              <div className="text-center space-y-4 p-6">
                <div className="text-5xl">!</div>
                <h2 className="font-hero text-xl text-bg">Camera Unavailable</h2>
                <p className="text-bg/70 text-sm">{cameraError}</p>
                <button
                  type="button"
                  className="font-typewriter text-xs bg-bg text-ink px-4 py-2"
                  onClick={() => window.location.reload()}
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
                  <span className="font-hero text-6xl sm:text-7xl text-white font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                    Done!
                  </span>
                ) : isPaused ? (
                  <div className="text-center">
                    <span className="font-hero text-4xl sm:text-5xl text-white font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                      Get Ready!
                    </span>
                    <p className="font-typewriter text-sm text-white/80 mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      Photo {photoNumber} of {totalPhotos}
                    </p>
                  </div>
                ) : isCapturing ? (
                  <span
                    className="font-hero text-[12rem] sm:text-[16rem] text-white font-bold leading-none"
                    style={{ textShadow: '0 0 60px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.9)' }}
                  >
                    {countdown}
                  </span>
                ) : null}
              </div>

              {/* Corner Markers */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/60" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/60" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/60" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/60" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Status */}
      {!cameraError && (
        <div className="px-4 py-4 text-center border-t border-bg/10">
          <p className="font-body text-bg/80 text-sm">
            {allPhotosDone
              ? 'Processing your photo strip...'
              : isCapturing
              ? 'Look at the camera and smile!'
              : 'Getting ready...'}
          </p>
        </div>
      )}
    </section>
  )
}

export default CameraScreen
