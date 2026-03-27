import React, { useState } from 'react'

const allStickers = ['⭐', '❤️', '🔥', '✨', '🎉', '😎', '🥰', '😍', '🤩', '🥳', '💕', '🦋', '🌈', '💫', '🎈', '💖']

function StickerPanel({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-1">
      {allStickers.map((sticker, index) => (
        <button
          key={index}
          type="button"
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-lg sm:text-xl hover:scale-125 active:scale-95 transition-transform"
          onClick={() => onSelect?.(sticker)}
        >
          {sticker}
        </button>
      ))}
    </div>
  )
}

export default StickerPanel
