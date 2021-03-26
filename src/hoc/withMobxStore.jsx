import React from 'react';
export default (storeMap) => {
  return (WrappedComponent) => {
    return class HOC extends React.Component {
      render() {
        return <WrappedComponent {...this.props} {...storeMap} />;
      }
    };
  };
};
