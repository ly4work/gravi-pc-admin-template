import http from '@/http';

export default class Api {
  // 获取用户信息
  static LOGIN_DINGDING_URL = '/daily-man/dd/getUserInfo';
  static postLogin(params) {
    return http.post(
      Api.LOGIN_DINGDING_URL,
      {},
      {
        params,
      },
    );
  }
}
