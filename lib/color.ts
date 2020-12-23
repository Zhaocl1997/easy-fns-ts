/**
 * @description             hex to rgb
 * @param  {String} hex
 * @param  {String} opacity
 * @return {String}
 */
export const hexToRgba = (hex: string, opacity: string): string => {
  const baseRGB = `${parseInt(`${hex.slice(1, 3)}`, 16)},${parseInt(
    `${hex.slice(3, 5)}`,
    16
  )},${parseInt(`${hex.slice(5, 7)}`, 16)}`
  return opacity ? `rgba(${baseRGB},${opacity})` : `rgb(${baseRGB})`
}

/**
 * @description         rgb to hex
 * @param  {String} rgb
 * @return {String}
 */
export const rgbToHex = (rgb: string): string => {
  const rgbArr = rgb.includes('a')
    ? rgb.match(/(?<=\()(\d+),(\d+),(\d+),((?:0?\.\d+)|1)(?=\))/)
    : rgb.match(/(?<=\()(\d+),(\d+),(\d+)(?=\))/)
  const r = rgbArr![1]
  const g = rgbArr![2]
  const b = rgbArr![3]
  return `#${((+r << 16) | (+g << 8) | +b).toString(16).toUpperCase()}`
}
