import React from 'react'

const allStickers = ['⭐', '❤️', '🔥', '✨', '🎉', '😎', '🥰', '😍', '🤩', '🥳', '💕', '🦋', '🌈', '💫', '🎈', '💖', '🎀', '🌟', '💜', '🧡']

function StickerPanel({ onSelect }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {allStickers.map((sticker, index) => (
        <button
          key={index}
          type="button"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl bg-ghost/30 hover:bg-ghost rounded-xl hover:scale-110 active:scale-95 transition-all"
          onClick={() => onSelect?.(sticker)}
        >
          {sticker}
        </button>
      ))}
    </div>
  )
}

export default StickerPanel
