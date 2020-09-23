import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

import theme from '../utils/theme';

function UserImage({ source, name = '', size = 'normal' }) {
  return (
    <View
      style={[
        styles.container,
        size === 'big' && styles.big,
        size === 'small' && styles.small,
      ]}
    >
      {source ? (
        <Image source={{ uri: source }} style={styles.image} />
      ) : (
        <Text fontSize={size === 'small' ? 24 : 30}>
          {name.slice(0, 1).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: theme.colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    resizeMode: 'contain',
  },
  big: {
    width: 80,
    height: 80,
  },
  small: {
    width: 35,
    height: 35,
  },
});
export default UserImage;
