import React from 'react';
import { Tabs } from 'antd';
import { withRouter, connect } from 'umi';
import { Logger } from '@/utils/logger';
import styles from './index.less';
const { TabPane } = Tabs;

// @withStore(['globalMenuStore'])
@withRouter
// @observer
class GlobalTabs extends React.Component {
  newTabIndex = 0;

  state = {
    // activeKey: '/',
    // panes: [],
  };
  UNSAFE_componentWillMount() {}
  onChange = (activeTabKey) => {
    const { routeCaches } = this.props;
    this.props.dispatch({
      type: 'menu/asyncUpdateRouteController',
      payload: { currentRoute: routeCaches.find((r) => r.route === activeTabKey) },
    });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = (targetKey) => {
    const { routeCaches, currentRoute = {} } = this.props;

    //  只剩一个tab时不允许关闭
    if (routeCaches.length <= 1) {
      return void 0;
    }
    const index = routeCaches.findIndex((r) => r.route === targetKey);

    Logger('删除tab index', index);
    let nextCurRoute = '';

    //  当点击的是当前tab
    if (routeCaches[index] && currentRoute.route === routeCaches[index].route) {
      //  如果是第一个tab, currenTab取其后一个
      routeCaches.splice(index, 1);
      if (index === 0) {
        nextCurRoute = routeCaches[0];
      } else {
        // 非第一个则取前面一个
        nextCurRoute = routeCaches[index - 1];
      }
    } else {
      routeCaches.splice(index, 1);

      nextCurRoute = currentRoute;
    }

    Logger('after closed routeCache', routeCaches);

    this.props.dispatch({
      type: 'menu/asyncUpdateRouteController',
      payload: { routeCaches: [...routeCaches], currentRoute: nextCurRoute },
    });
    Logger('after updateStore nextCurRoute ', nextCurRoute.route);
  };
  render() {
    const { currentRoute = {}, routeCaches } = this.props;
    // console.log(routeCaches);
    return (
      <div style={{ padding: '12px 24px 0', position: 'relative' }}>
        <Tabs
          type="editable-card"
          onChange={this.onChange}
          activeKey={currentRoute.route}
          hideAdd
          onEdit={this.onEdit}
          className={styles.gkTabs}
        >
          {routeCaches.map((r) => {
            return (
              <TabPane tab={r.title} key={r.route} closable={r.closable}>
                {/* {pane.content} */}
              </TabPane>
            );
          })}
        </Tabs>
        <div className={styles.gkTabHold}></div>
      </div>
    );
  }
}

// export default GlobalTabs;
export default connect(({ menu }) => ({
  currentRoute: menu.currentRoute,
  routeCaches: menu.routeCaches,
}))(withRouter(GlobalTabs));
