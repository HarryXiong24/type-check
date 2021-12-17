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
  // 针对其他
  if (['number', 'string', 'boolean', 'undefined'].includes(type)) {
    return typeof variable === type;
  }
  // 对于对象，array 和 null 也会当做是对象，所以要加以判断
  if (type === 'object') {
    return (
      !Array.isArray(variable) &&
      variable !== null &&
      typeof variable === 'object'
    );
  }

  // 匹配 xxx[]
  const arrayMatchResult = /(.*)\[\]/u.exec(type);

  if (arrayMatchResult) {
    if (!Array.isArray(variable)) {
      return false;
    }
    // itemType 就是类型
    const itemType = arrayMatchResult[1];

    return variable.every((item) => assertType(item, itemType));
  }

  // 匹配 Record<xxx, xxx>
  const objectMatchResult = /Record<(.*), ?(.*)>/u.exec(type);

  if (objectMatchResult) {
    if (
      typeof variable === 'object' &&
      !Array.isArray(variable) &&
      variable !== null
    ) {
      const keyType = objectMatchResult[1];
      const contentType = objectMatchResult[2];

      for (const key in variable) {
        if (typeof key !== keyType) {
          console.error(`应为 ${type}，但键 ${key} 为 ${typeof key}`);
          return false;
        }

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
