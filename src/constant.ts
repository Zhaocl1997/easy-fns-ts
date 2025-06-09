/* 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
export const ALL_STRING = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'

/* 默认去掉敏感符号 */
export const ALL_SYMBOL = '~!@#$%&_-+'

/* 数字字符串 */
export const NUMBER_STRING = '0123456789'

/* macAddress 模板和字符串池 */
export const MAC_ADDRESS_TEMPLATE = 'XX:XX:XX:XX:XX:XX'
export const MAC_ADDRESS_POOL = '0123456789ABCDEF'

/* console.log 类型 */
export enum THEME_TYPE {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info',
}

export type LogType
  = | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | undefined

export const PHONE_PREFIX: string[] = [
  '131',
  '133',
  '138',
  '139',
  '157',
  '175',
  '184',
  '186',
]

export const EMAIL_SUFFIX: string[] = [
  '@chinaunicom.com',
  '@qq.com',
  '@163.com',
  '@gmail.com',
  '@126.com',
  '@foxmail.com',
  '@sina.com',
  '@sohu.com',
  '@sogou.com',
]
