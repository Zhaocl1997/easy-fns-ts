/**
 * @description         add a timestamp to a url
 * @param  {String} url 
 * @return {String}
 */
export const addTimeStamp = (url: string): string => {
  let ret = url
  const timestamp = new Date().valueOf()
  if (ret.indexOf('?') > -1) {
    ret = `${ret}&timestamp=${timestamp}`
  } else {
    ret = `${ret}?timestamp=${timestamp}`
  }
  return ret
}

/**
 * @description           add params to a url
 * @param  {String} url   
 * @param  {String} key   
 * @param  {String} value 
 * @return {String}
 */
export const addParams = (url: string, key: string, value: string): string => {
  let ret = url
  if (ret.indexOf('?') > -1) {
    ret = `${ret}&${key}=${value}`
  } else {
    ret = `${ret}?${key}=${value}`
  }
  return ret
}

/**
 * @description         extract url params into object
 * @param  {String} url 
 * @return {Object}     
 */
export const parseParams = (url: string): any => {
  const paramsStr = /.+\?(.+)$/.exec(url)![1]
  const paramsArr = paramsStr.split('&')
  const paramsObj: any = {}

  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      const key: string = param.split('=')[0]
      let val: string | number = param.split('=')[1]
      val = decodeURIComponent(val)
      val = /^\d+$/.test(val) ? parseFloat(val) : val

      paramsObj[key] = val
    } else {
      paramsObj[param] = true
    }
  })

  return paramsObj
}
