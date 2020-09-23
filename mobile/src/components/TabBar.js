import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { Login, Register } from './icons';

import theme from '../utils/theme';
const { colors } = theme;

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions =
    descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabBarItem}
            key={label}
          >
            {label === 'Login' && (
              <Login
                width={30}
                height={30}
                color={isFocused ? colors.text : colors.gray}
              />
            )}
            {label === 'Register' && (
              <Register
                width={30}
                height={30}
                color={isFocused ? colors.text : colors.gray}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 58,
    backgroundColor: colors.black,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 58,
  },
});

export default TabBar;
