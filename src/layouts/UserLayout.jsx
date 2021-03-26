import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CompassOutlined } from '@ant-design/icons';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import GlobalFooter from '@/components/GlobalFooter/GlobalFooterView';
import { DebugInsertToken } from '@/components/Debug';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  console.log(BUILD_ENV);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        {BUILD_ENV === 'local' && <DebugInsertToken />}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <div>
                {/* <img alt="logo" className={styles.logo} src={logo} /> */}
                <CompassOutlined style={{ fontSize: '28px', color: '#333', marginRight: '10px' }} />
                <span className={styles.title}>GOLDKINN Digital Operation Center</span>
              </div>
            </div>
            <div className={styles.desc}>数字化运营中心DOC </div>
          </div>
          {children}
        </div>
        <GlobalFooter />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
