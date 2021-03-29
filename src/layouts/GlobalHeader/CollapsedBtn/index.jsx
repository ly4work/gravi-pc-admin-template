/**
 * CollapsedBtn 折叠菜单按钮
 * @author liyang
 * 2021/03/01
 */
import React from 'react';
import { withRouter, connect } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.less';
const CollapsedBtn = (props) => {
  const { collapsed, dispatch } = props;
  const toggle = () => {
    dispatch({
      type: 'menu/updateCollapsed',
      payload: { collapsed: !collapsed },
    });
  };
  return (
    <div className={styles.gkFolder}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
    </div>
  );
};

export default connect(({ menu }) => ({
  collapsed: menu.collapsed,
}))(CollapsedBtn);
