import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgLogin(props) {
  return (
    <Svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M27 3v26a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h2v1h18V4H7v3H5V3a1 1 0 011-1h20a1 1 0 011 1zM12.29 20.29l1.42 1.42 5-5a1 1 0 000-1.42l-5-5-1.42 1.42 3.3 3.29H5v2h10.59z"
        data-name={1}
      />
    </Svg>
  );
}

const MemoSvgLogin = React.memo(SvgLogin);
export default MemoSvgLogin;
