import { toString } from './utils/toString';
import { fork } from './fork';

export interface TypeOption<T = unknown> {
  type: string | string[];
  enum?: T[];
  additional?: T[];
}

// 检查类型
export const checkType = <T = unknown>(
  variable: T,
  type: string[] | string | TypeOption<T>,
  variableName = ''
): boolean => {
  // 处理 'object' 或者 ['string', 'number', 'boolean'] 这样的
  if (typeof type === 'string' || Array.isArray(type)) {
    return fork<T>(variable, type, variableName);
  }

  // 处理 { type: 'boolean', enum: [true], additional: [] } 这样的
  if (typeof type === 'object') {
    // 判断是否有枚举式的类型
    if (type.enum) {
      if (type.enum.includes(variable)) {
        return true;
      }

      console.error(
        `${variableName} 应为 ${type.enum.join(
          '、'
        )} 中之一，但此处为 ${toString(variable)}`
      );

      return false;
    }

    // 判断是否有 additional
    if (
      type.additional &&
      type.additional.some((value) => variable === value)
    ) {
      return true;
    }

    // 没有特殊配置的话，直接走 fork 链路判断
    return fork<T>(variable, type.type, variableName);
  }

  console.error(`未知类型配置 ${toString(type)}`);

  return false;
};

// 检查对象里的类型
export const checkKeys = <T = unknown>(
  obj: T,
  config: Record<string, string[] | string | TypeOption>,
  objName = ''
): boolean => {
  if (typeof obj === 'object' && obj !== null) {
    const configKeys = Object.keys(config);

    for (const key in obj) {
      if (config[key]) {
        if (
          checkType(
            (obj as Record<string | number | symbol, unknown>)[key],
            config[key],
            `${objName ? `${objName}.` : ''}${key}`
          )
        ) {
          configKeys.splice(configKeys.indexOf(key), 1);

          continue;
        }

        return false;
      }

      console.error(`${objName} 不应存在 ${key}`);

      return false;
    }

    const unfindKeys = configKeys.filter((key) => {
      const type = config[key];

      return typeof type === 'string'
        ? type !== 'undefined'
        : Array.isArray(type)
        ? !type.some((typeItem) => typeItem === 'undefined')
        : typeof type.type === 'string'
        ? type.type !== 'undefined'
        : !type.type.some((typeItem) => typeItem === 'undefined');
    });

    if (unfindKeys.length === 0) return true;

    console.error(`${objName} 未找到 ${unfindKeys.toString()}`);

    return false;
  }

  console.error(`${objName} 应为 object，但其类型为 ${typeof obj}`);

  return false;
};
