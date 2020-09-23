import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgLock(props) {
  return (
    <Svg
      viewBox="0 0 18 21"
      fill="currentColor"
      className=""
      {...props}
    >
      <Path
        d="M16.071 9h-.964V6.107a6.107 6.107 0 10-12.214 0V9h-.964A1.929 1.929 0 000 10.929v7.714a1.929 1.929 0 001.929 1.929h14.142A1.929 1.929 0 0018 18.643v-7.714A1.929 1.929 0 0016.071 9zm-4.178 0H6.107V6.107a2.893 2.893 0 015.786 0V9z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoSvgLock = React.memo(SvgLock);
export default MemoSvgLock;
