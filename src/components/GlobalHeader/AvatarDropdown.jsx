import { LogoutOutlined, DingdingOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect, withRouter } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { DB } from '@/utils/DB';
import Cookie from '@/utils/Cookie';
import SystemConfig from '@/config/system';
import { Logout } from '@/utils/logout';
@withRouter
class AvatarDropdown extends React.Component {
  UNSAFE_componentWillMount() {
    const userInfo = DB.get('userInfo');
    //  先屏蔽登录
    // if (!userInfo) {
    //   window.location.href = '/user/login'
    //   // this.handleLogout();
    // }
  }
  handleLogout = () => {
    Logout();
    // Cookie.removeToken();
    // DB.remove('auth');
    // this.props.history.push('/user/login');
  };
  onMenuClick = (event) => {
    const { key } = event;
    if (key === 'logout') {
      this.handleLogout();

      return;
    }
    history.push(`/account/${key}`);
  };

  render() {
    const { menu } = this.props;
    const userInfo = DB.get('userInfo');
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )} */}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return userInfo && userInfo.userName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {/* <Avatar
            size="small"
            className={styles.avatar}
            src={
              userInfo.avatar ||
              'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
            }
            alt="avatar"
          /> */}
          <DingdingOutlined
            style={{ fontSize: '16px', marginRight: '2px', color: SystemConfig.theme }}
          />
          <span className={`${styles.name} anticon`}>{userInfo.userName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default AvatarDropdown;
