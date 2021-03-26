import React from 'react';
import { KeepAlive } from 'umi';

export default (WrappedComponent) => {
  return class HOC extends React.Component {
    render() {
      return (
        <KeepAlive>
          <WrappedComponent {...this.props} />
        </KeepAlive>
      );
    }
  };
};
