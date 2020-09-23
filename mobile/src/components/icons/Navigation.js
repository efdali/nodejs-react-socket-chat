import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgNavigation(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path d="M12 18a3 3 0 110 6 3 3 0 010-6zm0-9a3 3 0 110 6 3 3 0 010-6zm0-9a3 3 0 110 6 3 3 0 010-6z" />
    </Svg>
  );
}

const MemoSvgNavigation = React.memo(SvgNavigation);
export default MemoSvgNavigation;
