import React from 'react';
import RightContent from '@/layouts/GlobalHeader/GlobalHeaderView.jsx';
import CollapsedBtn from '@/layouts/GlobalHeader/CollapsedBtn';
import logo from '../../assets/logo.svg';
import GlobalTabs from '../GlobalTabs/GlobalTabsView';
import GlobalMenu from '../GlobalMenu/GlobalMenuView';
import GlobalFooter from '@/layouts/GlobalFooter/GlobalFooterView';
import { Logger } from '@/utils/logger';
import { Layout } from 'antd';
import styles from './index.less';

const { Header } = Layout;
class PageLayout extends React.Component {
  componentDidMount() {
    Logger('当前运行环境', BUILD_ENV);
  }
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100%' }}>
        <GlobalMenu />
        <Layout className="site-layout">
          <Header className={styles.gHeader}>
            <CollapsedBtn />
            <RightContent />
          </Header>
          <GlobalTabs />
          {children}
          <GlobalFooter />
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;
