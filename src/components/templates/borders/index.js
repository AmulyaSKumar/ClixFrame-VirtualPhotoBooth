export { default as PolaroidBorder, PolaroidPreview, polaroidBorderConfig } from './PolaroidBorder'
export { default as SprocketBorder, SprocketPreview, sprocketBorderConfig } from './SprocketBorder'
export { default as DoubleBorder, DoubleBorderPreview, doubleBorderConfig } from './DoubleBorder'
export { default as CleanWhiteBorder, CleanWhitePreview, cleanWhiteBorderConfig } from './CleanWhiteBorder'

export const borderThemes = [
  {
    id: 'polaroid',
    name: 'Polaroid',
    desc: 'Classic instant film',
  },
  {
    id: 'sprocket',
    name: 'Film Strip',
    desc: 'Vintage 35mm look',
  },
  {
    id: 'double',
    name: 'Double Frame',
    desc: 'Elegant nested border',
  },
  {
    id: 'clean-white',
    name: 'Clean White',
    desc: 'Minimal modern',
  },
]
