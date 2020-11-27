/**
 * @description         给url添加时间戳参数
 * @param  {String} url 目标地址
 * @return {String}
 */
export const addTimeStamp = (url: string): string => {
  let ret = url;
  const timestamp = new Date().valueOf();
  if (ret.indexOf('?') > -1) {
    ret = `${ret}&timestamp=${timestamp}`;
  } else {
    ret = `${ret}?timestamp=${timestamp}`;
  }
  return ret;
};

/**
 * @description           给url添加参数
 * @param  {String} url   目标地址
 * @param  {String} key   参数key值
 * @param  {String} value 参数value值
 * @return {String}
 */
export const addParams = (url: string, key: string, value: string): string => {
  let ret = url;
  if (ret.indexOf('?') > -1) {
    ret = `${ret}&${key}=${value}`;
  } else {
    ret = `${ret}?${key}=${value}`;
  }
  return ret;
};

/**
 * @description         提取url参数
 * @param  {String} url 目标地址
 * @return {Object}     参数对象
 */
export const parseParams = (url: string): unknown => {
  const paramsStr = /.+\?(.+)$/.exec(url)![1];
  const paramsArr = paramsStr.split('&');
  const paramsObj: { [index: string]: any } = {};

  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      const key:string = param.split('=')[0];
      let val:string|number = param.split('=')[1];
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;

      paramsObj[key] = val;
    } else {
      paramsObj[param] = true;
    }
  });

  return paramsObj;
};
