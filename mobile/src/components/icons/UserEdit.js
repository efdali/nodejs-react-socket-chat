import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgUserEdit(props) {
  return (
    <Svg
      viewBox="0 0 20 16"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M7 8a4 4 0 100-8 4 4 0 000 8zm2.8 1h-.522a5.44 5.44 0 01-4.556 0H4.2A4.2 4.2 0 000 13.2v1.3A1.5 1.5 0 001.5 16h8.591a1.5 1.5 0 01-.081-.666l.213-1.9.038-.347.247-.247 2.416-2.416A4.158 4.158 0 009.8 9zm1.416 4.541L11 15.447a.499.499 0 00.55.55l1.9-.213 4.31-4.31-2.234-2.239-4.31 4.306zM19.782 8.4L18.6 7.219a.749.749 0 00-1.056 0L16.36 8.4l-.128.128 2.244 2.241 1.306-1.306a.753.753 0 000-1.059V8.4z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoSvgUserEdit = React.memo(SvgUserEdit);
export default MemoSvgUserEdit;
