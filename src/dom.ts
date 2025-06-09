import { error } from './error'
import { trimSpaceAside } from './string'

/**
 * @description toggle class
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function toggleClass(ele: HTMLElement, cls: string, flag: boolean): void {
  if (flag) {
    addClass(ele, cls)
  }
  else {
    removeClass(ele, cls)
  }
}

/**
 * @description Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
  if (!ele || !cls)
    return false
  if (cls.includes(' '))
    error('dom', 'className should not contain space.')
  if (ele.classList) {
    return ele.classList.contains(cls)
  }
  return ` ${ele.className} `.includes(` ${cls} `)
}

/**
 * @description Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string): void {
  if (!ele)
    return
  let curClass = ele.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (ele.classList) {
      ele.classList.add(clsName)
    }
    else if (!hasClass(ele, clsName)) {
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
export function removeClass(ele: HTMLElement, cls: string): void {
  if (!ele || !cls)
    return
  const classes = cls.split(' ')
  let curClass = ` ${ele.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (ele.classList) {
      ele.classList.remove(clsName)
    }
    else if (hasClass(ele, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!ele.classList) {
    ele.className = trimSpaceAside(curClass)
  }
}

/**
 * @description Add event listener
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} handler
 */
export function on<K extends keyof WindowEventMap>(element: HTMLElement | Document | Window, event: K, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, options)
  }
}

/**
 * @description Remove event listener
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} handler
 */
export function off<K extends keyof WindowEventMap>(element: HTMLElement | Document | Window, event: K, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, options)
  }
}
