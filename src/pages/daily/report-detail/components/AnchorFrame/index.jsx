/**
 * AnchorFrame 大纲组件，位于页面的左侧，通常用于文档展示类型页面
 * @author liyang
 * 2021/02/26
 */
import React, { Component, useState, useEffect } from 'react';
import { Anchor } from 'antd';
import styles from './index.less';
const { Link } = Anchor;

const AnchorFrame = (props) => {
  const [targetOffset, setTargetOffset] = useState(undefined);
  const { list } = props;
  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);
  return (
    <Anchor targetOffset={targetOffset}>
      {list.map((item) => {
        return (
          <Link
            key={item.id}
            href={`#${item.id}`}
            title={item.title}
            className={styles.gkAnchorLink}
          >
            {item.children &&
              item.children.map((c) => {
                return <Link key={c.id} href={`#${c.id}`} title={c.title} />;
              })}
          </Link>
        );
      })}
    </Anchor>
  );
};

export default AnchorFrame;
