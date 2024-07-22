/**
 * @description            format time
 * @param  {Date} str
 * @param  {string} format default YYYY-MM-DD HH:mm:ss
 * @return {string}
 */
export function formatTime(str: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const t = new Date(str)
  const tf = (i: number): string => (i < 10 ? '0' : '') + i

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key): any => {
    switch (key) {
      case 'YYYY':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'DD':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'mm':
        return tf(t.getMinutes())
      case 'ss':
        return tf(t.getSeconds())
      default:
        return ''
    }
  })
}

/**
 * @description            get formatted now time
 * @param  {string} format default YYYY-MM-DD HH:mm:ss
 * @return {string}
 */
export function getNow(format = 'YYYY-MM-DD HH:mm:ss'): string {
  return formatTime(new Date(), format)
}

/**
 * @description         format ago
 * @param  {string} str
 * @return {string}
 */
export function formatAgo(str: string | number | Date): string {
  const date = new Date(Number(str))
  const time = new Date().getTime() - date.getTime()

  if (time < 0) {
    return ''
  }
  if (time / 1000 < 30) {
    return '刚刚'
  }
  if (time / 1000 < 60) {
    return `${Number.parseInt(String(time / 1000), 10)}秒前`
  }
  if (time / 60000 < 60) {
    return `${Number.parseInt(String(time / 60000), 10)}分钟前`
  }
  if (time / 3600000 < 24) {
    return `${Number.parseInt(String(time / 3600000), 10)}小时前`
  }
  if (time / 86400000 < 31) {
    return `${Number.parseInt(String(time / 86400000), 10)}天前`
  }
  if (time / 2592000000 < 12) {
    return `${Number.parseInt(String(time / 2592000000), 10)}个月前`
  }

  return `${Number.parseInt(String(time / 31536000000), 10)}年前`
}
