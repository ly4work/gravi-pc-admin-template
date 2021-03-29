import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const copyright = `${new Date().getFullYear()} 运营中心管理平台`;
  return <DefaultFooter links={[]} copyright={copyright} />;
};
