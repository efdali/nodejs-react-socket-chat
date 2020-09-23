import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import theme from '../utils/theme';

function Loading() {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 9999,
        flex: 1,
        backgroundColor: theme.colors.inputBg,
        opacity: 0.6,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default Loading;
