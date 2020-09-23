import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgRegister(props) {
  return (
    <Svg
      viewBox="0 0 30 30"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path d="M14 23c0-3.539 2.047-6.591 5.017-8.062.409-.57.785-1.273.855-1.89.354-.027.91-.352 1.074-1.635.088-.689-.262-1.076-.474-1.198 0 0 .528-1.003.528-2.214 0-2.428-.953-4.5-3-4.5 0 0-.711-1.5-3-1.5-4.242 0-6 2.721-6 6 0 1.104.528 2.214.528 2.214-.212.122-.562.51-.474 1.198.164 1.283.72 1.608 1.074 1.635C10.263 14.245 11.55 15.777 12 16v2c-1 3-9 1-9 8h11.523A8.956 8.956 0 0114 23z" />
      <Path d="M23 16a7 7 0 100 14 7 7 0 000-14zm3 8h-2v2a1 1 0 11-2 0v-2h-2a1 1 0 110-2h2v-2a1 1 0 112 0v2h2a1 1 0 110 2z" />
    </Svg>
  );
}

const MemoSvgRegister = React.memo(SvgRegister);
export default MemoSvgRegister;
