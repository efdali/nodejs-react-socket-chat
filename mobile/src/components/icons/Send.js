import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgSend(props) {
  return (
    <Svg
      viewBox="0 0 30 27"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M0 27l29.25-13.5L0 0v10.5l20.953 3L0 16.5V27z"
        fill="#5084FF"
      />
    </Svg>
  );
}

const MemoSvgSend = React.memo(SvgSend);
export default MemoSvgSend;
