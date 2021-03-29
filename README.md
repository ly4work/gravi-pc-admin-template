# gravi-pc-admin-template

> 运营管理后台通用模板，基于 UmiJS+Antd/Antd-Pro

### ✨ 基础核心依赖

- React@16
- Less
- Antd@4 基础组件库
- Antd.Pro@4 高级组件库
- umi 工程构建
- dva 数据管理
- Node@14

### ✨ 三方依赖库/组件库

- braft-editor@2.3.8 富文本编辑器
- braft-extensions@0.1.0 BraftEditor 拓展包

### 🔥版本历史

- 0.1.0 2021/03/29

### ☘️ 目录结构
├── .DS_Store
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── .stylelintrc.js
├── README.md
├── config
│   ├── config.dev.js
│   ├── config.js
│   ├── defaultSettings.js
│   ├── proxy.js
│   └── routes.js
├── docker
│   ├── Dockerfile
│   ├── enterpoint.sh
│   └── nginx.conf
├── jest.config.js
├── jsconfig.json
├── mock
│   ├── listTableList.js
│   ├── notices.js
│   ├── route.js
│   └── user.js
├── package-lock.json
├── package.json
├── public
│   ├── CNAME
│   ├── edit.png
│   ├── favicon.ico
│   ├── form.png
│   ├── gravi.svg
│   ├── home_bg.png
│   ├── home_welcome_logo.png
│   ├── icons
│   │   ├── icon-128x128.png
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── pro_icon.svg
├── src
│   ├── .DS_Store
│   ├── assets
│   │   ├── logo.svg
│   │   ├── slogan.png
│   │   └── slogan2.png
│   ├── components
│   │   ├── Authorized
│   │   ├── Debug
│   │   ├── Editor
│   │   ├── PageLoading
│   │   ├── RichText
│   │   └── SlateEditor
│   ├── config
│   │   ├── icon.jsx
│   │   ├── menu.js
│   │   └── system.js
│   ├── global.jsx
│   ├── global.less
│   ├── hoc
│   │   ├── keepAlive.jsx
│   │   └── withMobxStore.jsx
│   ├── http
│   │   ├── config.js
│   │   └── index.js
│   ├── layouts
│   │   ├── GlobalFooter
│   │   ├── GlobalHeader
│   │   ├── GlobalMenu
│   │   ├── GlobalTabs
│   │   ├── PageLayout
│   │   ├── SpecialLayout
│   │   └── UserLayout
│   ├── manifest.json
│   ├── models
│   │   ├── daily.js
│   │   ├── global.js
│   │   ├── login.js
│   │   ├── menu.js
│   │   ├── setting.js
│   │   └── user.js
│   ├── pages
│   │   ├── account
│   │   ├── admin
│   │   ├── dashboard
│   │   ├── document.ejs
│   │   ├── editor
│   │   ├── exception
│   │   ├── form
│   │   ├── list
│   │   ├── profile
│   │   ├── result
│   │   ├── user
│   │   └── welcome
│   ├── services
│   │   ├── login.js
│   │   └── user.js
│   ├── styles
│   │   └── define.less
│   └── utils
│       ├── Authorized.js
│       ├── Cookie.js
│       ├── DB.js
│       ├── DDScanLogin.js
│       ├── authority.js
│       ├── historyStack.js
│       ├── logger.js
│       ├── logout.js
│       ├── request.js
│       ├── utils.js
│       └── utils.less
└── yarn.lock
### 🧭指令

- `yarn tree`  
  显示目录树

- `yarn install`  
  安装依赖

- `yarn dev:local`  
  启动本地服务，连接 dev 数据库服务，同时将会启动本地 nodejs 服务代理，转发后端请求

- `yarn dev:local-noauth`  
  启动本地服务，连接 dev 数据库服务，同时将会启动本地 nodejs 服务代理，转发后端请求，不校验登录

- `yarn dev:dev` 启动本地服务，连接 dev 数据库服务，请求域名为线上 dev 环境域名

- `yx-build:dev` 执行 dev 环境编译，test/uat/prod 参数同理，对应响应环境，不需要手动执行，推送代码后会执行 CI

### 🛎️编译环境变量参数说明

- BUILD_ENV 数据库连接环境，接口域名
  - local: 本地开发，相对路径，会走 node 的转发代理
  - dev: dev 域名
  - test: test 域名
  - uat: uat 域名
  - prod: prod 域名

### 🎉样式

- 主题色

```javascript
// ./config/defaultSettings.js 里替换 primaryColor值
const proSettings = {
  navTheme: 'dark',
  primaryColor: colorMap.purpleLight2,
  ...,
};
```

- 局部覆盖 antd/antd-pro 组件默认样式

```less
// ./src/global.less 中添加样式
.ant-pro-page-container-children-content {
  margin: 10px 24px 0 !important;
}
```
