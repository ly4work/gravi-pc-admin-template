import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';
import { withRouter } from 'umi';
import { DB } from '@/utils/DB';
import { getQueryString } from '@/utils/utils';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();

  const handleSubmit = (values) => {
    // const { dispatch } = props;
    // dispatch({
    //   type: 'login/login',
    //   payload: { ...values, type },
    // });
    DB.set('userInfo', {
      ...values,
    });
    props.history.push('/daily/projects');
  };

  useEffect(() => {
    const origin = location.origin;
    const loginRedirectUrl = getQueryString('redirectUrl') || '';
    const REDIRECT_URI = encodeURIComponent(
      `${origin}/user/waiting?redirectUrl=${loginRedirectUrl}`,
    );
    const APPID = 'dingoalydrhs2cc3h9ovba';
    // alert(loginRedirectUrl);
    let obj = DDLogin({
      id: 'login_container',
      goto: encodeURIComponent(
        `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${REDIRECT_URI}`,
      ),
      style: 'border:none;background-color:#FFFFFF;',
      width: '300',
      height: '330',
    });
    let hanndleMessage = function (event) {
      var origin = event.origin;
      console.log('origin', event.origin);
      if (origin == 'https://login.dingtalk.com') {
        //判断是否来自ddLogin扫码事件。
        let loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        console.log('\nloginTmpCode', loginTmpCode, '\n');
        const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${REDIRECT_URI}&loginTmpCode=${loginTmpCode}`;
        window.location.href = url;
      }
    };
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', hanndleMessage, false);
    }
  }, []);
  return (
    <div className={styles.main}>
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', width: '300px' }}>
        打开钉钉扫码登录
      </p>
      <div
        id="login_container"
        style={{ width: '300px', height: '300px', background: '#fff' }}
      ></div>
      {/* <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane key="account" tab={'账户密码登录'} />
          <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: 'pages.login.phoneLogin.tab',
              defaultMessage: '手机号登录',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage content={'账户或密码错误'} />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户名: admin'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder={'密码: admin'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="验证码错误" />
        )}
        {type === 'mobile' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileTwoTone className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailTwoTone className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} 获取验证码`;
                }

                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (mobile) => {
                const result = await getFakeCaptcha(mobile);

                if (result === false) {
                  return;
                }

                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
          </a>
        </div>
      </ProForm> */}
      {/* <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space> */}
    </div>
  );
};

export default withRouter(Login);
// export default connect(({ login, loading }) => ({
//   userLogin: login,
//   submitting: loading.effects['login/login'],
// }))(Login);
