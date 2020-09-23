import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgTrash(props) {
  return (
    <Svg
      viewBox="0 0 16 19"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M1.143 16.571a1.714 1.714 0 001.714 1.714h10.286a1.714 1.714 0 001.714-1.714v-12H1.143v12zm9.714-9.143a.571.571 0 111.143 0v8a.571.571 0 11-1.143 0v-8zm-3.429 0a.571.571 0 111.143 0v8a.571.571 0 11-1.143 0v-8zM4 7.429a.571.571 0 111.143 0v8a.571.571 0 11-1.143 0v-8zm11.429-6.286h-4.286l-.336-.668A.857.857 0 0010.039 0H5.957a.847.847 0 00-.764.475l-.336.668H.571A.571.571 0 000 1.714v1.143a.571.571 0 00.571.571h14.858A.571.571 0 0016 2.857V1.714a.571.571 0 00-.571-.571z"
        fill="#EC6262"
      />
    </Svg>
  );
}

const MemoSvgTrash = React.memo(SvgTrash);
export default MemoSvgTrash;
