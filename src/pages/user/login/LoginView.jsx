import React, { useEffect, useState } from 'react';
import {
  AlipayCircleOutlined,
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  TaobaoCircleOutlined,
  WechatOutlined,
  UserOutlined,
  WeiboCircleOutlined,
  DingdingOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs, Spin, Button } from 'antd';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';
import { withRouter } from 'umi';
import { DB } from '@/utils/DB';
import { getQueryString } from '@/utils/utils';
import DDScanLogin from '@/utils/DDScanLogin';

const DDApp = new DDScanLogin();

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
  const [scanType, setScanType] = useState(false);
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
    props.history.push('/');
  };

  const handleCheckScanLoginType = () => {
    if (!scanType) {
      setTimeout(() => {
        ddLoginInit();
      }, 500);
    }
    setScanType(!scanType);
  };
  const ddLoginInit = () => {
    const origin = location.origin;
    const loginRedirectUrl = getQueryString('redirectUrl') || '';
    const REDIRECT_URI = encodeURIComponent(
      `${origin}/user/waiting?redirectUrl=${loginRedirectUrl}`,
    );
    DDApp.init({
      redirectUrl: REDIRECT_URI,
    });
  };
  useEffect(() => {
    if (scanType) {
      ddLoginInit();
    }
  }, []);
  return (
    <div className={styles.main}>
      {scanType ? (
        <div>
          <p className={styles.ddLoginTitle}>
            打开钉钉扫码登录
            <Button
              onClick={handleCheckScanLoginType}
              className={styles.backNormalLogin}
              type="text"
            >
              返回账号登录
            </Button>
          </p>
          <div id="dd_login_container" className={styles.ddLoginContainer}>
            <Spin size="size" />
          </div>
        </div>
      ) : (
        <ProForm
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
        </ProForm>
      )}

      <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
        <AlipayCircleOutlined className={styles.icon} />
        <WechatOutlined className={styles.icon} />
        <DingdingOutlined className={styles.icon} onClick={handleCheckScanLoginType} />
      </Space>
    </div>
  );
};

export default withRouter(Login);
// export default connect(({ login, loading }) => ({
//   userLogin: login,
//   submitting: loading.effects['login/login'],
// }))(Login);
