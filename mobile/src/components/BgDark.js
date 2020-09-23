import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from '../utils/theme';

function BgDark({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    flex: 1,
  },
});
export default BgDark;
