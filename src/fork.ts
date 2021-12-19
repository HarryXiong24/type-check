import { assertType } from './utils/assertType';
import { toString } from './utils/toString';

export const fork = <T = unknown>(
  variable: T,
  type: string[] | string,
  variableName = ''
): boolean => {
  // 处理 'object'
  if (typeof type === 'string') {
    if (assertType(variable, type)) {
      return true;
    }

    console.error(
      `${variableName} 应为 ${type}，但此处为 ${toString(variable)}`
    );

    return false;
  }

  // 处理 ['string', 'number', 'boolean'] 这样的
  if (Array.isArray(type)) {
    if (type.some((typeItem) => assertType(variable, typeItem))) return true;

    console.error(
      `${variableName} 应为 ${type.toString()}，但此处为 ${toString(variable)}`
    );

    return false;
  }

  console.error(`未知类型配置 ${toString(type)}`);

  return false;
};
