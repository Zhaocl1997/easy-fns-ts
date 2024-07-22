import type { LogType } from './constant'
import { THEME_TYPE } from './constant'

/**
 * @description 返回这个样式的颜色值
 * @param {string} type 样式名称 [ primary | success | warning | danger | info ]
 */
function typeColor(type: string = THEME_TYPE.PRIMARY): string {
  let color = ''
  switch (type) {
    case THEME_TYPE.PRIMARY:
      color = '#409eff'
      break
    case THEME_TYPE.SUCCESS:
      color = '#67c23a'
      break
    case THEME_TYPE.WARNING:
      color = '#e6a23c'
      break
    case THEME_TYPE.DANGER:
      color = '#f56c6c'
      break
    case THEME_TYPE.INFO:
      color = '#909399'
      break
    default:
      break
  }
  return color
}

interface textClass {
  text: string
  type: LogType
}

/**
 * @description log colorfully
 */
function colorful(textArr: textClass[]): void {
  console.log(
    `%c${textArr.map(t => t.text || '').join('%c')}`,
    ...textArr.map(t => `color: ${typeColor(t.type)};`),
  )
}

interface capsuleLogType {
  title: string
  info: string
  type?: LogType
}

/**
 * @description          capsule log
 * @param {string} title title
 * @param {string} info  content
 * @param {string} type  style
 */
export function capsuleLog(params: capsuleLogType): void {
  const { title, info, type = THEME_TYPE.PRIMARY } = params

  console.log(
    `%c ${title} %c ${info} %c`,
    'background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background: ${typeColor(
      type,
    )}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;`,
    'background: transparent',
  )
}

/**
 * @description primary
 */
export function primaryLog(text: string): void {
  colorful([{ text, type: THEME_TYPE.PRIMARY }])
}

/**
 * @description success
 */
export function successLog(text: string): void {
  colorful([{ text, type: THEME_TYPE.SUCCESS }])
}

/**
 * @description warning
 */
export function warningLog(text: string): void {
  colorful([{ text, type: THEME_TYPE.WARNING }])
}

/**
 * @description danger
 */
export function dangerLog(text: string): void {
  colorful([{ text, type: THEME_TYPE.DANGER }])
}

/**
 * @description info
 */
export function infoLog(text: string): void {
  colorful([{ text, type: THEME_TYPE.INFO }])
}
