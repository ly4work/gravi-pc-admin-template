/**
 * DDScanLogin
 * @description 钉钉扫码登录类
 * @author liyang
 * 2021/03/29
 */

const DDAppConfig = {
  local: {
    APPID: 'dingoalydrhs2cc3h9ovba',
  },
  dev: {
    APPID: 'dingoalydrhs2cc3h9ovba',
  },
  prod: {
    APPID: 'dingoa2a1zxn95vl69t9hj',
  },
};

class DDBaseConfig {
  constructor() {
    // this.ddApp = DDAppConfig[BUILD_ENV]; //  钉钉应用id
  }
  getDDApp() {
    return DDAppConfig[BUILD_ENV];
  }
}

class DDScanLogin extends DDBaseConfig {
  constructor(props) {
    super(props);
    this.ddApp = this.getDDApp();
  }
  init({ APPID = this.ddApp.APPID, redirectUrl, id = 'dd_login_container' }) {
    const ddapp = DDLogin({
      id,
      goto: encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUrl}`,
      ),
      style: 'border:none;background-color:#FFFFFF;',
      width: '300',
      height: '330',
    });
    this.initMessage({ APPID, redirectUrl });
    return ddapp;
  }
  initMessage({ APPID = this.ddApp.APPID, redirectUrl }) {
    let hanndleMessage = function (event) {
      const origin = event.origin;
      console.log('origin', event.origin);
      if (origin == 'https://login.dingtalk.com') {
        //判断是否来自ddLogin扫码事件。
        let loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        console.log('\nloginTmpCode', loginTmpCode, '\n');
        const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUrl}&loginTmpCode=${loginTmpCode}`;
        window.location.href = url;
      }
    };
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', hanndleMessage, false);
    }
  }
}

export default DDScanLogin;
