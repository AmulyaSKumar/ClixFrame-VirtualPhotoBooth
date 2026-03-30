# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClixFrame is a virtual photo booth web application built with React + Vite. Users select a template and layout, take photos via webcam with an automatic countdown, then customize with filters and stickers before downloading.

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (opens http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint for .js/.jsx files
```

## Architecture

### App Flow (State Machine in App.jsx)

The app uses a single `currentScreen` state to manage navigation through these screens:
1. **landing** → LandingPage (marketing/intro)
2. **template** → TemplateSelectionPage (choose frame style)
3. **layout** → LayoutSelectionPage (choose photo arrangement) - skipped for templates with `needsLayout: false`
4. **camera** → CameraScreen (webcam capture with countdown)
5. **result** → ResultScreen (preview, filters, stickers, download)

### Key State in App.jsx
- `selectedTemplate` - Frame style (minimal, newspaper, polaroid, film)
- `selectedLayout` - Photo arrangement (strip, grid, etc.)
- `capturedPhotos` - Array of base64 JPEG data URLs
- `totalPhotos` - Derived from layout or template's `fixedPhotos`

### Component Structure

```
src/
├── App.jsx                 # Main state machine, photo capture logic
├── main.jsx               # React entry point
├── styles/globals.css     # Tailwind v4 + custom design system
└── components/
    ├── landing/           # LandingPage, HeroSection, Button, DemoPreview
    ├── templates/
    │   ├── TemplateSelectionPage.jsx
    │   ├── LayoutSelectionPage.jsx
    │   └── shared/
    │       ├── TemplatePreviews.jsx  # All template definitions & preview components
    │       ├── LayoutPreviews.jsx    # All layout definitions & preview components
    │       ├── SelectionCard.jsx
    │       ├── ProgressBar.jsx
    │       └── PersonPlaceholder.jsx
    ├── CameraScreen.jsx   # Webcam access, countdown timer, flash effect
    └── ResultScreen.jsx   # Sticker placement, filters, html2canvas download
```

### Template System

Templates are defined in `src/components/templates/shared/TemplatePreviews.jsx`:
- Categories: `minimal`, `newspaper`, `polaroid`, `film`
- Each template has: `id`, `name`, `description`, `preview` (React component), `needsLayout` (boolean)
- Templates with `needsLayout: false` have `fixedPhotos` count and skip layout selection

Layouts are defined in `src/components/templates/shared/LayoutPreviews.jsx`:
- Options include: classic-strip, grid-2x2, wide-strip, big-plus-two, filmstrip, single-portrait, three-wide, hero-row
- Each layout specifies `photos` count

### Styling

Uses Tailwind CSS v4 with custom design system in `globals.css`:
- Custom fonts: Syne (logo/hero), Outfit (subheading), DM Sans (body), JetBrains Mono (typewriter), Caveat (accent)
- Color palette: `--color-bg`, `--color-ink`, `--color-mid`, `--color-ghost`, `--color-paper`
- Custom animations: typewriter, fade-in, photo-develop, pulse-soft
- Component classes: `.btn-*`, `.card-*`, `.chip-*`, `.photo-frame`

### Photo Capture Flow

1. CameraScreen requests webcam via `getUserMedia`
2. App.jsx runs countdown timer (3 seconds per photo)
3. On countdown=1, flash effect triggers, then `capturePhoto()` draws video frame to hidden canvas
4. Photos stored as base64 JPEGs with mirror transform applied
5. After all photos captured, transitions to ResultScreen

### Download Implementation

ResultScreen uses `html2canvas` to capture the styled photo strip element including:
- Template-specific styling (borders, backgrounds, newspaper text)
- Applied filter (grayscale, sepia, vivid)
- Placed stickers (draggable emojis)
