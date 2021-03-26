import React from 'react';
import {
  CalendarOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Popover } from 'antd';
import menu from '@/config/menu';
import styles from './index.less';
import { withRouter, connect } from 'umi';
import { Logger } from '@/utils/logger';
import { DB } from '@/utils/DB';
import SystemConfig from '@/config/system';

const { SubMenu } = Menu;

const menuConfig = menu.filter((item) => {
  return item.auth;
});
// @withStore(['globalMenuStore'])
@withRouter
// @observer
class Sider extends React.Component {
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    window.app = {
      history: this.props.history,
      DB,
    };
    const routeCaches = DB.get('routeCaches', 'session') || [];
    let pathname = this.props.history.location.pathname;

    //  TODO 这一段逻辑临时逻辑
    //  目前 / 路径会重定向到 /daily/report，所以手动设置一下，保证初始化后的routeCache，后期欢迎页出来以后需要关闭这个逻辑
    if (pathname === '/') pathname = '/daily/report';

    Logger('pathname', pathname);
    const openKeyMenu =
      menuConfig.find((m) => {
        //  需要抽象到 model
        //  m.id: menu.form
        //  pathname: /form/table-list
        return pathname.indexOf(m.id.split('.').pop()) > -1;
      }) || [];
    this.setState({
      defaultKeys: [pathname],
      defaultOpenKeys: [openKeyMenu.id],
    });
    //  如果匹配到属于左侧菜单树
    if (openKeyMenu.subMenu) {
      let menusIncludesCurrentRoute = openKeyMenu.subMenu.find((m) => {
        return m.route === pathname;
      });
      //  如果直接属于菜单树子菜单，则直接填充该子菜单为当前路由
      if (menusIncludesCurrentRoute) {
        this.props.dispatch({
          type: 'menu/asyncUpdateRouteController',
          payload: { currentRoute: menusIncludesCurrentRoute },
        });
      } else {
        //  未匹配到菜单树子菜单，则说明是详情页级别子菜单
        const locationHref = pathname + location.search;
        let routeCacheQueryItem = routeCaches.find((item) => item.route === locationHref);
        //  如果不在路由缓存中（这种场景多发生于从钉钉模板消息中打开）
        if (!routeCacheQueryItem) {
          this.props.dispatch({
            type: 'menu/asyncUpdateRouteController',
            payload: {
              currentRoute: {
                route: locationHref,
                title: '查看',
                parentId: locationHref,
                id: locationHref,
              },
            },
          });
        } else {
          this.props.dispatch({
            type: 'menu/asyncUpdateRouteController',
            payload: {
              currentRoute: routeCacheQueryItem,
            },
          });
        }
      }
    }
  }
  handleChangeMenu = (subM) => {
    // const { currentRoute, routeCaches } = this.props.globalMenuStore.state;
    const { currentRoute, routeCaches } = this.props;
    //  1. 更新store currentRoute
    // this.props.globalMenuStore.updateStore({
    //   currentRoute: subM,
    // });
    this.props.dispatch({
      type: 'menu/asyncUpdateRouteController',
      payload: { currentRoute: subM },
    });

    Logger(
      'Mobx globalMenuStore currentRouter & routeCaches',
      this.props.currentRoute,
      this.props.routeCaches,
    );
  };
  state = {
    collapsed: false,
    defaultKeys: [],
    defaultOpenKeys: [],
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenuList = () => {
    const { currentRoute = {}, routeCaches } = this.props;
    return (
      <Menu
        // defaultSelectedKeys={this.state.defaultKeys}
        // defaultOpenKeys={this.state.defaultOpenKeys}
        // openKeys={[currentRoute.parentId]}
        // selectedKeys={[currentRoute.route]}
        theme="light"
        mode="vertical"
      >
        {menuConfig.map((m, i) => {
          return (
            <SubMenu key={m.id} title={m.title} icon={m.icon}>
              {m.subMenu.map((subM, k) => {
                return (
                  <Menu.Item key={subM.route}>
                    <div onClick={() => this.handleChangeMenu(subM)}>{subM.title}</div>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    );
  };
  render() {
    const { currentRoute = {}, routeCaches, collapsed } = this.props;
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className={styles.gkSider}
        style={{
          boxShadow: '2px 0px 10px rgb(0 21 41 / 8%)',
        }}
        onCollapse={this.toggle}
      >
        <div className={`${styles.slogan} `}>
          <AppstoreOutlined
            style={{
              marginRight: '3px',
              fontSize: '20px',
              color: collapsed ? SystemConfig.theme : 'inherit',
            }}
          />
          {/* {!collapsed && <span className="">数字化运营中心</span>} */}
          {!collapsed && (
            <img className={styles.img} src={require('@/assets/slogan2.png')} alt="" />
          )}
        </div>
        {this.renderMenuList()}
        {/* {menuConfig.map((m, i) => {
          return (
            <Popover placement="right" content={content}>
              <div>{m.title}</div>
            </Popover>
          );
        })} */}
      </Layout.Sider>
    );
  }
}

export default connect(({ menu }) => ({
  currentRoute: menu.currentRoute,
  routeCaches: menu.routeCaches,
  collapsed: menu.collapsed,
}))(withRouter(Sider));
