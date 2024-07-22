export const regex = {
  url: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])?$/,

  phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,

  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,

  macAddress: /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i,

  id: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}([\dX])$)/i,

  number: /^\d+$/,

  letter: /^[a-z]+$/i,

  ip4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})$/,

  ip6: /^((([0-9A-F]{1,4}:){7}[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){6}:[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){5}:([0-9A-F]{1,4}:)?[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){4}:([0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){3}:([0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){2}:([0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-F]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-F]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-F]{1,4}::([0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4})|(::([0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4})|(([0-9A-F]{1,4}:){1,7}:))$/i,

  external: /^(https?:|mailto:|tel:)/,

  browser: {
    IE: /(?:msie|trident.*rv).([\d.]+)/,
    Edge: /edge.([\d.]+)/,
    Chrome: /chrome.([\d.]+)/,
    Firefox: /firefox.([\d.]+)/,
    Opera: /opera.([\d.]+)/,
    Safari: /(?:safari|version).([\d.]+)/,
  },

  color: {
    hex: /^#([0-9A-f]{3}|[0-9A-f]{6})$/,
    rgb: /(rgb\((((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*)?\))|(rgba\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*(0?\.\d*|0(\.\d*)?|1)?\))/,
  },

  uuid: /\w{8}(-\w{4}){3}-\w{12}/,
}

export const regexTest = {
  isUrl: (val: string): boolean => regex.url.test(val),
  isPhone: (val: string): boolean => regex.phone.test(val),
  isEmail: (val: string): boolean => regex.email.test(val),
  isMacAddress: (val: string): boolean => regex.macAddress.test(val),
  isId: (val: string): boolean => regex.id.test(val),
  isNumber: (val: any): boolean => regex.number.test(val),
  isLetter: (val: string): boolean => regex.letter.test(val),
  isExternal: (val: string): boolean => regex.external.test(val),
  isRGB: (val: string): boolean => regex.color.rgb.test(val),
  isHEX: (val: string): boolean => regex.color.hex.test(val),
  isUUID: (val: string): boolean => regex.uuid.test(val),
}
