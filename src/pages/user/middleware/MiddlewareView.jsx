import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { withRouter } from 'umi';
import { DB } from '@/utils/DB';
import { getQueryString } from '@/utils/utils';
import Api from '@/pages/user/middleware/service';
import Cookie from '@/utils/Cookie';

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');
  const redirectUrl =
    decodeURIComponent(decodeURIComponent(getQueryString('redirectUrl') || '')) || '/';
  // alert(redirectUrl);
  useEffect(async () => {
    try {
      const authCode = getQueryString('code');
      const res = await Api.postLogin({
        authCode,
      });
      console.log(res);
      if (res.code === 200) {
        //  缓存用户信息
        DB.set('userInfo', {
          userName: res.data.loginName,
          phone: res.data.mobile,
          unionid: res.data.unionid,
        });
        //  写入dm-Access-Token
        Cookie.setToken(res.data.token);
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={styles.main}>
      <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px' }}>正在登录中...</p>
    </div>
  );
};

export default withRouter(Login);
