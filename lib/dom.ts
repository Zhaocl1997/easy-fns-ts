import { trimSpaceAside } from './string'
import { e } from './error'

/**
 * @description toggle class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const toggleClass = (
  ele: HTMLElement,
  cls: string,
  flag: boolean
): void => {
  flag ? addClass(ele, cls) : removeClass(ele, cls)
}

/**
 * @description Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export const hasClass = (ele: HTMLElement, cls: string): boolean => {
  if (!ele || !cls) return false
  if (cls.indexOf(' ') !== -1) e('dom', 'className should not contain space.')
  if (ele.classList) {
    return ele.classList.contains(cls)
  }
  return ` ${ele.className} `.indexOf(` ${cls} `) > -1
}

/**
 * @description Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const addClass = (ele: HTMLElement, cls: string): void => {
  if (!ele) return
  let curClass = ele.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (ele.classList) {
      ele.classList.add(clsName)
    } else if (!hasClass(ele, clsName)) {
      curClass += ` ${clsName}`
    }
  }
  if (!ele.classList) {
    ele.className = curClass
  }
}

/**
 * @description Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export const removeClass = (ele: HTMLElement, cls: string): void => {
  if (!ele || !cls) return
  const classes = cls.split(' ')
  let curClass = ` ${ele.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (ele.classList) {
      ele.classList.remove(clsName)
    } else if (hasClass(ele, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!ele.classList) {
    ele.className = trimSpaceAside(curClass)
  }
}

/**
 * @description add event listener
 * @param {HTMLElement} element
 * @param {String} event
 * @param {Function} handler
 */
export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

/**
 * @description remove event listener
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} handler
 */
export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}
