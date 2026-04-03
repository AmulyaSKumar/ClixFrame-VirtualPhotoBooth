import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useBooth } from './context/BoothContext'
import ScrollToTop from './components/shared/ScrollToTop'
import LandingPage from './components/landing/LandingPage'
import TemplateSelectionPage from './components/templates/TemplateSelectionPage'
import LayoutSelectionPage from './components/templates/LayoutSelectionPage'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'
import PrivacyPage from './components/pages/PrivacyPage'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'

// Route guard for layout page - requires template with needsLayout
function LayoutRoute() {
  const { selectedTemplate } = useBooth()

  if (!selectedTemplate || !selectedTemplate.needsLayout) {
    return <Navigate to="/templates" replace />
  }

  return <LayoutSelectionPage />
}

// Route guard for camera page - requires template (and layout if needed)
function CameraRoute() {
  const { selectedTemplate, selectedLayout } = useBooth()

  if (!selectedTemplate) {
    return <Navigate to="/templates" replace />
  }

  if (selectedTemplate.needsLayout && !selectedLayout) {
    return <Navigate to="/layout" replace />
  }

  return <CameraScreen />
}

// Route guard for result page - requires captured photos
function ResultRoute() {
  const { capturedPhotos } = useBooth()

  if (!capturedPhotos || capturedPhotos.length === 0) {
    return <Navigate to="/" replace />
  }

  return <ResultScreen />
}

function App() {
  const { canvasRef } = useBooth()

  return (
    <div className="min-h-screen w-full">
      <ScrollToTop />
      <canvas ref={canvasRef} className="hidden" />

      <Routes>
        {/* Main booth flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<TemplateSelectionPage />} />
        <Route path="/layout" element={<LayoutRoute />} />
        <Route path="/camera" element={<CameraRoute />} />
        <Route path="/result" element={<ResultRoute />} />

        {/* Static pages */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
