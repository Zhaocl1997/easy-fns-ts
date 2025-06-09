import { error } from './error'

/**
 * @description             hex to rgb
 * @param  {string} hex
 * @param  {string} opacity
 * @return {string}
 */
export function hexToRgb(hex: string, opacity?: string): string {
  const baseRGB = `${Number.parseInt(`${hex.slice(1, 3)}`, 16)},${Number.parseInt(
    `${hex.slice(3, 5)}`,
    16,
  )},${Number.parseInt(`${hex.slice(5, 7)}`, 16)}`
  return opacity ? `rgba(${baseRGB},${opacity})` : `rgb(${baseRGB})`
}

/**
 * @description         rgb to hex
 * @param  {string} rgb
 * @return {string}
 */
export function rgbToHex(rgb: string): string {
  const rgbArr = rgb.includes('a')
    ? rgb.match(/(?<=\()(\d+),(\d+),(\d+),(0?\.\d+|1)(?=\))/)
    : rgb.match(/(?<=\()(\d+),(\d+),(\d+)(?=\))/)
  const r = rgbArr![1]
  const g = rgbArr![2]
  const b = rgbArr![3]
  return `#${((+r << 16) | (+g << 8) | +b).toString(16).toUpperCase()}`
}

/**
 * @description             percent to rgb
 * @param  {number} percent
 * @return {string}
 */
export function percentToRgb(percent: string | number): string {
  percent = Number(percent)

  if (percent > 100 || percent < 0) {
    error('Color', 'Percent should be in [0, 100]')
  }

  let r
  let g

  if (percent < 50) {
    // green to yellow
    r = Math.floor(255 * (percent / 50))
    g = 255
  }
  else {
    // yellow to red
    r = 255
    g = Math.floor(255 * ((50 - (percent % 50)) / 50))
  }

  return `rgb(${r}, ${g}, 0)`
}

/**
 * @description adjust a color by amount, positive means lighter, negative means darker
 */
export function adjustColor(color: string, amount: number): string {
  return `#${
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          `0${
            Math.min(255, Math.max(0, Number.parseInt(color, 16) + amount)).toString(16)}`
        ).slice(-2))}`
}
