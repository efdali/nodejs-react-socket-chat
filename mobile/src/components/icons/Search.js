import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgSearch(props) {
  return (
    <Svg
      viewBox="0 0 16 18"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M15.782 14.835l-3.115-3.115a.749.749 0 00-.531-.219h-.509a6.5 6.5 0 10-1.127 1.125v.509a.749.749 0 00.219.531l3.116 3.116a.746.746 0 001.059 0l.884-.884a.754.754 0 000-1.063h.004zM6.5 11.5a4 4 0 110-8 4 4 0 010 8z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoSvgSearch = React.memo(SvgSearch);
export default MemoSvgSearch;
