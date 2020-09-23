import React from 'react';

import BgDark from '../components/BgDark';
import NewGroupBtn from '../components/NewGroupBtn';

function withLayout(WrappedComponent) {
  return function WithLayout(props) {
    return (
      <BgDark>
        <WrappedComponent {...props} />
        <NewGroupBtn />
      </BgDark>
    );
  };
}

export default withLayout;
