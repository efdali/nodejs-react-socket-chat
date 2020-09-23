import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgGroup(props) {
  return (
    <Svg viewBox="0 0 16 9" fill="currentColor" {...props}>
      <Path
        d="M5.333 3.333h-2v-2H2v2H0v1.333h2v2h1.333v-2h2V3.333zM12 4a2 2 0 10-.607-3.907 3.29 3.29 0 01.6 1.907 3.354 3.354 0 01-.6 1.907c.196.062.401.094.607.093zM8.667 4a2 2 0 10-1.85-1.233A1.992 1.992 0 008.667 4zm4.413 1.44A2.467 2.467 0 0114 7.333v1.333h2V7.333c0-1.026-1.58-1.66-2.92-1.893zm-4.413-.107c-1.333 0-4 .667-4 2v1.333h8V7.333c0-1.333-2.667-2-4-2z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoSvgGroup = React.memo(SvgGroup);
export default MemoSvgGroup;
