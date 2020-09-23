import React from 'react';
import { Text as T } from 'react-native';

import theme from '../utils/theme';
const { colors } = theme;

function Text({
  secondary = false,
  fontSize,
  style,
  children,
  ...props
}) {
  return (
    <T
      style={{
        color: secondary ? colors.textLight : colors.text,
        fontWeight: secondary ? '100' : 'normal',
        fontSize: fontSize ? fontSize : secondary ? 14 : 16,
        ...style,
      }}
      {...props}
    >
      {children}
    </T>
  );
}

export default Text;
