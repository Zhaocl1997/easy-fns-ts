import { THEME_TYPE } from './constant';

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | info ]
 */
const typeColor = (type = THEME_TYPE.PRIMARY) => {
  let color = '';
  switch (type) {
    case THEME_TYPE.PRIMARY:
      color = '#409eff';
      break;
    case THEME_TYPE.SUCCESS:
      color = '#67c23a';
      break;
    case THEME_TYPE.WARNING:
      color = '#e6a23c';
      break;
    case THEME_TYPE.DANGER:
      color = '#f56c6c';
      break;
    case THEME_TYPE.INFO:
      color = '#909399';
      break;
    default:
      break;
  }
  return color;
};

interface textClass {
    text: string;
    type: THEME_TYPE;
}

/**
 * @description 打印彩色文字
 */
const colorful = (textArr: Array<textClass>) => {
  console.log(
    `%c${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${typeColor(t.type)};`),
  );
};

export const log = {
  /**
     * @description 打印一个 [ title | text ] 样式的信息
     * @param {String} title title text
     * @param {String} info info text
     * @param {String} type style
     */
  capsule: (title: string, info: string, type = THEME_TYPE.PRIMARY): void => {
    console.log(
      `%c ${title} %c ${info} %c`,
      'background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
      `background: ${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;`,
      'background: transparent',
    );
  },

  /**
     * @description 打印 primary 样式的文字
     */
  primary: (text: string) => {
    colorful([{ text, type: THEME_TYPE.PRIMARY }]);
  },

  /**
     * @description 打印 success 样式的文字
     */
  success: (text: string) => {
    colorful([{ text, type: THEME_TYPE.SUCCESS }]);
  },

  /**
     * @description 打印 warning 样式的文字
     */
  warning: (text: string) => {
    colorful([{ text, type: THEME_TYPE.WARNING }]);
  },

  /**
     * @description 打印 danger 样式的文字
     */
  danger: (text: string) => {
    colorful([{ text, type: THEME_TYPE.DANGER }]);
  },

  /**
     * @description 打印 danger 样式的文字
     */
  info: (text: string) => {
    colorful([{ text, type: THEME_TYPE.INFO }]);
  },
};
