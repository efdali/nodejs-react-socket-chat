import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgUser(props) {
  return (
    <Svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M8 9a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm4 1h-1.722a5.44 5.44 0 01-4.556 0H4a4 4 0 00-4 4v.5A1.5 1.5 0 001.5 16h13a1.5 1.5 0 001.5-1.5V14a4 4 0 00-4-4z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoSvgUser = React.memo(SvgUser);
export default MemoSvgUser;
