import { toString } from './toString';

export const assertType = <T = unknown>(variable: T, type: string): boolean => {
  // 针对数组
  if (type === 'array') {
    return Array.isArray(variable);
  }
  // 针对 null
  if (type === 'null') {
    return variable === null;
  }
  // 针对一般的，因为 array 和 null 会被识别成 object
  if (['number', 'string', 'boolean', 'undefined'].includes(type)) {
    return typeof variable === type;
  }
  // 对于普通对象，array 和 null 也会当做是对象，所以要加以判断
  if (type === 'object') {
    return (
      !Array.isArray(variable) &&
      variable !== null &&
      typeof variable === 'object'
    );
  }

  // 处理 'xxx[]'
  const arrayMatchResult = /(.*)\[\]/u.exec(type);

  if (arrayMatchResult) {
    // 首先判断变量是不是一个数组，如果不是直接返回
    if (!Array.isArray(variable)) {
      return false;
    }
    // itemType 就是数量里元素的类型
    const itemType = arrayMatchResult[1];

    // 判断数组里的每个变量是不是都是这个类型
    return variable.every((item) => assertType(item, itemType));
  }

  // 匹配 Record<xxx, xxx>
  const objectMatchResult = /Record<(.*), ?(.*)>/u.exec(type);

  if (objectMatchResult) {
    // 判断正常对象，排除 array 和 null
    if (
      typeof variable === 'object' &&
      !Array.isArray(variable) &&
      variable !== null
    ) {
      // key 的类型
      const keyType = objectMatchResult[1];
      // 值的类型
      const contentType = objectMatchResult[2];

      for (const key in variable) {
        // 判断 key
        if (typeof key !== keyType) {
          console.error(`应为 ${type}，但键 ${key} 为 ${typeof key}`);
          return false;
        }

        // 判断值
        if (
          typeof (variable as Record<string | number | symbol, unknown>)[
            key
          ] !== contentType
        ) {
          console.error(
            `应为 ${type}，但值 ${toString(
              (variable as Record<string | number | symbol, unknown>)[key]
            )} 为 ${typeof (
              variable as Record<string | number | symbol, unknown>
            )[key]}`
          );

          return false;
        }
      }

      return true;
    }

    return false;
  }

  console.warn(`未知类型 ${type}`);

  return false;
};
