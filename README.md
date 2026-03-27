# Photobooth App

A clean React + Vite photobooth UI project with Start, Camera, Result, filters, stickers, and lightweight modern animations.

## Project Structure

```
photoboot/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   ├── globals.css
    │   ├── container.css
    │   ├── card.css
    │   ├── button.css
    │   └── transitions.css
    └── components/
        ├── StartScreen.jsx
        ├── StartScreen.css
        ├── CameraScreen.jsx
        ├── CameraScreen.css
        ├── FilterSelector.jsx
        ├── FilterSelector.css
        ├── ResultScreen.jsx
        ├── ResultScreen.css
        ├── StickerPanel.jsx
        └── StickerPanel.css
```

## Run

```bash
npm install
npm run dev
```

## Notes

- `src/App.jsx` is the single app entry used by `src/main.jsx`.
- Duplicate, unused, and generated summary/example files were removed to keep the workspace minimal.
