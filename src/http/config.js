// import profile from './profile';
import { Logger } from '@/utils/logger';
const NODE_ENV = process.env.NODE_ENV;
// const BUILD_ENV = process.env.BUILD_ENV;

const domainMap = {
  local: '',
  dev: 'http://gateway-dev.gaojin.com.cn',
  test: 'http://gateway-dev.gaojin.com.cn',
  uat: 'http://gateway-dev.gaojin.com.cn',
  prod: 'http://gateway-dev.gaojin.com.cn',
};

export const domain = domainMap[BUILD_ENV];
export const basePath = `/api`;
const baseURL = `${domain}${basePath}`;

Logger(`编译环境 NODE_ENV`, NODE_ENV);
Logger(`数据库连接环境 BUILD_ENV`, BUILD_ENV);
Logger(`接口域名 DOMAIN`, domain);

export default { baseURL };

//  token名和cookie名
export const tokenHeaderMap = {
  DDingAuthHeader: 'auth',
  SSOAuthHeader: 'Access-Token',
};

//  路径白名单，不校验登录
export const whiteList = [/login/g, /waiting/g, /sso/g];

//  sso名单，需要使用中台token
export const ssoList = [/sso/g];
