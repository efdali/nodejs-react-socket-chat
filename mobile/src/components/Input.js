import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import theme from '../utils/theme';
const { colors } = theme;

function Input({ dark = false, style = {}, ...props }) {
  return (
    <TextInput
      style={[styles.input, dark && styles.inputDark, style]}
      placeholderTextColor={colors.textLight}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    color: colors.text,
  },
  inputDark: {
    backgroundColor: colors.black,
  },
});
export default Input;
