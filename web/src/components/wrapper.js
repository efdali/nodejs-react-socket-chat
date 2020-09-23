import React from 'react';
import { Layout } from 'antd';
function wrapper(WrappedComponent) {
  return function Wrapper() {
    return (
      <Layout style={{ height: '100%' }}>
        <WrappedComponent />
      </Layout>
    );
  };
}

export default wrapper;
