import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Group } from './icons';

import theme from '../utils/theme';
const { colors } = theme;

function NewGroupBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.floatIconContainer}
      onPress={() => navigation.navigate('NewGroup')}
    >
      <Group width={22} height={22} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatIconContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewGroupBtn;
