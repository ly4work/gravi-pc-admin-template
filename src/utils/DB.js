/**
 * @(#)2021/02/05.
 * 本地Storage缓存控制
 * @author Liyang
 * Copyright (c) 2021, GOLDKINN. All rights reserved.
 */

import {
  // isArray,
  // pick,
  // map,
  // mergeWith,
  get as lodashGet,
  // isString,
  // isEqual,
  set as lodashSet,
} from 'lodash';

/**
 * lodash的 get函数超集，当取得值为null、 null、undefined,''将返回默认值
 * path支持数组，会依次选取优先级高的放前面
 * @static
 * @param {object} obj 源数据
 * @param {string|array} path 参数路径
 * @param {*} defaultValue 默认值
 * @returns
 *
 */
export const get = function (obj, path, defaultValue) {
  let value = null;
  const rules = [null, 'null', '', undefined];
  const pathList = toArray(path);
  for (let p of pathList) {
    value = lodashGet(obj, p + '', null);
    if (!rules.includes(value)) {
      return value;
    }
  }
  return defaultValue;
};

export const set = function (obj, path, value) {
  if (isEmpty(path)) {
    merge(obj, value);
  } else {
    lodashSet(...arguments);
  }
};
/**
 * 转换成数组
 *
 * @param {*} source
 * @returns
 */
export const toArray = function (source) {
  if (source instanceof Array) {
    return source;
  } else {
    const result = source != null ? [source] : [];
    return result;
  }
};

/**
 * @(#)2021/02/05.
 * DB 缓存控制器
 * @author Liyang
 */
class DB {
  static storeType = 'local';
  static type = {
    session: 'session',
    local: 'local',
  };

  /**
   * 从缓存提取值
   *
   * @static
   * @param {string} key
   * @returns
   * @memberof DB
   */
  static get(key, storeType = 'local') {
    const type = get(DB, 'storeType', storeType);
    const store = storeType === 'local' ? localStorage : sessionStorage;
    let localValue = store.getItem(key);
    return localValue ? JSON.parse(localValue) : null;
  }

  /**
   *
   * 写入缓存
   * @static
   * @param {string} key 键
   * @param {string} value 值
   * @memberof DB
   */
  static set(key, value, storeType = 'local') {
    const type = get(DB, 'storeType', storeType);
    const store = storeType === 'local' ? localStorage : sessionStorage;
    store.setItem(key, JSON.stringify(value));
  }
  /**
   *
   * 清除缓存
   * @static
   * @param {string} key 键
   * @param {string} value 值
   * @memberof DB
   */
  static remove(key, storeType = 'local') {
    const type = get(DB, 'storeType', storeType);
    const store = storeType === 'local' ? localStorage : sessionStorage;
    store.removeItem(key);
  }
}

export { DB };
