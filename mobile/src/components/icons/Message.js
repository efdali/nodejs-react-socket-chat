import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgMessage(props) {
  return (
    <Svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M18 0H2A2 2 0 00.01 2L0 20l4-4h14a2.006 2.006 0 002-2V2a2.006 2.006 0 00-2-2zm-2 12H4v-2h12v2zm0-3H4V7h12v2zm0-3H4V4h12v2z"
        fill="#5A5A5A"
      />
    </Svg>
  );
}

const MemoSvgMessage = React.memo(SvgMessage);
export default MemoSvgMessage;
