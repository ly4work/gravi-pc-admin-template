/**
 * @(#)2021/02/15.
 * Cookie 类控制器
 * @author Liyang
 * Copyright (c) 2021, GOLDKINN. All rights reserved.
 */

import Cookies from 'universal-cookie';

export default class Cookie {
  static DEFAULT_EXPIRES = 60 * 60 * 24 * 3;
  static ACCESS_TOKEN = 'auth';
  static _instance = new Cookies();
  /**
   * cookie.set
   * @param {string} name Key
   * @param {string} value cookie值
   * @param {object} options cookie配置
   */
  static set(name, value, options) {
    Cookie._instance.set(name, value, options);
  }
  /**
   * cookie.remove
   * @param {string} name Key
   * @param {string} value cookie值
   * @param {object} options cookie配置
   */
  static remove(name, value, options) {
    Cookie._instance.remove(name, value, options);
  }
  /**
   * cookie.get
   * @param {string} name Key
   * @param {string} value cookie值
   * @param {object} options cookie配置
   */
  static get(name, value, options) {
    return Cookie._instance.get(name, value, options);
  }
  /**
   * setToken 设置dm-access-token
   * @param {string} token token的值
   * @param {string|int} expires token的过期时间
   */
  static setToken(token, expires = Cookie.DEFAULT_EXPIRES) {
    const expirationDate = new Date(Date.now() + expires * 1000);
    Cookie.set(Cookie.ACCESS_TOKEN, token, {
      path: '/',
      expires: expirationDate,
    });
  }
  /**
   * removeToken 移除dm-access-token
   */
  static removeToken() {
    Cookie.remove(Cookie.ACCESS_TOKEN, {
      path: '/',
    });
  }
  /**
   * getToken 获取dm-access-token
   */
  static getToken() {
    return Cookie.get(Cookie.ACCESS_TOKEN);
  }
}
