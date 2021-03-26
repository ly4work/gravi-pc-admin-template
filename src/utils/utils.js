import { parse } from 'querystring';
import _ from 'lodash';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

const pending = new Map();

function ensureSlash(pathname) {
  return _.first(pathname) === '/' ? pathname : `/${pathname}`;
}

function generateUUID(config) {
  if (config.data) {
    if (_.isObject(config.data)) {
      return ensureSlash(
        `${config.url.replace(config.baseURL, '')}[data=${JSON.stringify(config.data)}][method=${
          config.method
        }]`,
      );
    } else {
      return ensureSlash(
        `${config.url.replace(config.baseURL, '')}[data=${config.data}][method=${config.method}]`,
      );
    }
  }
  return ensureSlash(`${config.url.replace(config.baseURL, '')}[method=${config.method}]`);
}

export const removeRequestWhenFinish = (config) => {
  const uuid = generateUUID(config);
  pending.delete(uuid);
  // window.console.log([...pending.values()]);
};

export const entryUnique = (config, c) => {
  if (config.method === 'get') {
    return; // 暂不处理get请求
  }
  const uuid = generateUUID(config);
  const pend = {
    uuid,
    cancel: c,
    date: new Date().getTime(),
  };
  if (pending.has(uuid)) {
    const exists = pending.get(uuid);
    pending.delete(exists);
    // exists.cancel();
    // window.console.error('repeat request', exists.uuid)
  }
  pending.set(uuid, pend);
};
//对象的深拷贝
export const deepCopy = (obj) => {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};

export function getQueryString(name, url = window.location.search.substr(1)) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = url.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * replaceHTMLTag 将html标签全部替换成空
 * @param {string} str html文本
 * @author liyang
 * 2021/02/26
 */
export function replaceHTMLTag(str) {
  var regx = /<[^>]*>|<\/[^>]*>/gm;
  if (str) return str.replace(regx, '');
  return '';
}

/**
 * replaceBase64 将img标签中的base64去掉
 * @param {string} str html文本
 * @author liyang
 * 2021/03/25
 */
export function replaceBase64(str) {
  var regx = /data:image\/([^;]+).*/i;
  if (str) return str.replace(regx, 'no-url');
  return '';
}
