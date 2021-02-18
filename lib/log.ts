import { THEME_TYPE } from './constant'

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info ]
 */
const typeColor = (type = THEME_TYPE.PRIMARY) => {
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
  type: THEME_TYPE
}

/**
 * @description log colorfully
 */
const colorful = (textArr: Array<textClass>) => {
  console.log(
    `%c${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${typeColor(t.type)};`)
  )
}

/**
* @description          capsule log
* @param {String} title title
* @param {String} info  content
* @param {String} type  style
*/
export const capsuleLog = (title: string, info: string, type = THEME_TYPE.PRIMARY): void => {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background: ${typeColor(
      type
    )}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;`,
    'background: transparent'
  )
}

/**
 * @description primary 
 */
export const primaryLog = (text: string) => {
  colorful([{ text, type: THEME_TYPE.PRIMARY }])
}

/**
 * @description success
 */
export const successLog = (text: string) => {
  colorful([{ text, type: THEME_TYPE.SUCCESS }])
}

/**
 * @description warning
 */
export const warningLog = (text: string) => {
  colorful([{ text, type: THEME_TYPE.WARNING }])
}

/**
 * @description danger
 */
export const dangerLog = (text: string) => {
  colorful([{ text, type: THEME_TYPE.DANGER }])
}

/**
 * @description info
 */
export const infoLog = (text: string) => {
  colorful([{ text, type: THEME_TYPE.INFO }])
}
