import { DB } from './DB';
import Cookie from './Cookie';

//  周报系统登录
export const Logout = () => {
  const redirectUrl = encodeURIComponent(encodeURIComponent(window.location.href));
  DB.remove('userInfo');
  DB.remove('auth');
  Cookie.removeToken();
  window.location.href = `/user/login?redirectUrl=${redirectUrl}`;
};

//  中台登录
export const SSOLogin = (url = window.location.href) => {
  const redirectUrl = encodeURIComponent(url);
  window.location.href = `http://operations-test.gaojin.com.cn/#/?redirectUrl=${redirectUrl}`;
};
