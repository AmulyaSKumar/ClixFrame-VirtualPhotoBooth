# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClixFrame is a virtual photo booth web application built with React 18 + Vite 5. Users select a template and layout, take photos via webcam with an automatic countdown, then customize with filters and stickers before downloading via html2canvas.

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint for .js/.jsx files
```

## Architecture

### React Router + Context Navigation

The app uses React Router for URL-based navigation and `BoothContext` (`src/context/BoothContext.jsx`) for centralized state management. Route guards in App.jsx enforce the booth flow.

**Routes (App.jsx):**
```
/           → LandingPage
/templates  → TemplateSelectionPage
/layout     → LayoutRoute (guarded - requires template with needsLayout)
/camera     → CameraRoute (guarded - requires template + layout if needed)
/result     → ResultRoute (guarded - requires captured photos)
/privacy, /about, /contact → Static pages
```

**Route Guards:** Components like `LayoutRoute`, `CameraRoute`, `ResultRoute` check context state and redirect via `<Navigate>` if prerequisites aren't met.

### BoothContext (`src/context/BoothContext.jsx`)

Central state provider wrapping the app. Key exports:
- **State:** `photoNumber`, `countdown`, `capturedPhotos`, `isCapturing`, `isPaused`, `selectedTemplate`, `selectedLayout`, `cameraReady`, `totalPhotos`
- **Handlers:** `handleSelectTemplate`, `handleSelectLayout`, `startCamera`, `resetBooth`, `backToTemplate`, `backToLayoutOrTemplate`, `handleRetake`, `handleRetakeAll`
- **Camera refs:** `setVideoElement`, `handleCameraReady`, `handleFacingModeChange`

The countdown timer and photo capture logic runs in a `useEffect` inside BoothContext, triggered when on `/camera` path with `isCapturing=true` and `cameraReady=true`.

### Key Concepts

**Templates** (`src/components/templates/shared/TemplatePreviews.jsx`):
- Define frame styling organized by category: `minimal`, `newspaper`, `polaroid`, `film`
- Properties: `id`, `name`, `description`, `preview` component, `needsLayout`, `fixedPhotos`, `fixedLayoutId`
- Templates with `needsLayout: false` skip layout selection and use `fixedPhotos` count
- Exported as `templateOptions` (by category) and `allTemplates` (flat array)

**Layouts** (`src/components/templates/shared/LayoutPreviews.jsx`):
- Define photo arrangement (classic-strip, grid-2x2, wide-strip, big-plus-two, filmstrip, single-portrait, three-wide, hero-row)
- Each layout specifies `photos` count (1-6) which determines capture session length
- Exported as `layoutOptions` array

**Photo Capture Flow:**
1. CameraScreen requests webcam via `getUserMedia`, reports ready state via `handleCameraReady`
2. BoothContext runs 3-second countdown per photo in a `useEffect` timer (only when `cameraReady=true`)
3. At countdown=1, flash triggers, then `capturePhoto()` draws video frame to hidden canvas
4. Photos stored as base64 JPEGs (mirrored for front camera via `facingModeRef`)
5. 2-second pause between photos, then after `totalPhotos` captured → navigate to `/result`

**Download:** ResultScreen uses html2canvas to capture the styled strip including filters and stickers

### Design System (globals.css)

Tailwind CSS v4 with custom `@theme` block defining:
- **Fonts:** `font-logo`/`font-hero` (Syne), `font-subheading` (Outfit), `font-body` (DM Sans), `font-typewriter` (JetBrains Mono), `font-accent` (Caveat)
- **Colors:** `--color-bg` (#FAFAFA), `--color-ink` (#0D0D0D), `--color-mid` (#5C5C5C), `--color-ghost` (#E8E8E8), `--color-paper` (#F5F5F5)
- **Component classes:** `.btn-*`, `.card-*`, `.chip-*`, `.input`, `.label`, `.landing-*`
- **Animations:** `fade-in`, `fade-up`, `photo-develop`, `typewriter`, `flash`, `countdown-pulse`

### Styling Conventions

- Selection pages use Tailwind classes
- CameraScreen and ResultScreen use inline styles for dynamic/template-specific rendering
- Template preview components render with inline styles for precise control
- Landing page uses dedicated `.landing-*` and `.btn-landing-*` classes
