import SSOLogin from 'gj-sso-sdk'
//  系统登录
export const Logout = () => {
  SSOLogin.configSSO({
    env: BUILD_ENV
  })
};
