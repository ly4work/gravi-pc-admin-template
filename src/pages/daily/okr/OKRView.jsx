import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';
export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="页面找不到啦"
    extra={
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    }
  />
);
