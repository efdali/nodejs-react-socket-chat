import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgBack(props) {
  return (
    <Svg
      viewBox="0 0 477.175 477.175"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z" />
    </Svg>
  );
}

const MemoSvgBack = React.memo(SvgBack);
export default MemoSvgBack;
