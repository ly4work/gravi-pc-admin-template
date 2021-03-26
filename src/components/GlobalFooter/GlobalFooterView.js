import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const copyright = `${new Date().getFullYear()} 高金实业集团数字化运营中心`;
  return <DefaultFooter links={[]} copyright={copyright} />;
};
