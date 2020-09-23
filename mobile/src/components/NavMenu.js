import React, { useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu, { MenuItem } from 'react-native-material-menu';

import Text from './Text';
import { Navigation, Search, User, Group, Home } from './icons';

import theme from '../utils/theme';

function NavMenu() {
  const menu = useRef();
  const nav = useNavigation();

  const navigateHandler = useCallback(
    (routeName) => {
      nav.navigate(routeName);
      menu.current.hide();
    },
    [nav],
  );

  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        ref={menu}
        button={
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => menu.current.show()}
          >
            <Navigation width={18} height={18} color="white" />
          </TouchableOpacity>
        }
      >
        <MenuItem
          style={styles.menuItem}
          onPress={() => navigateHandler('Search')}
        >
          <Search style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Ara</Text>
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          onPress={() => navigateHandler('Profile')}
        >
          <User style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Profilim</Text>
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          onPress={() => navigateHandler('Home')}
        >
          <Home style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Anasayfa</Text>
        </MenuItem>
        <MenuItem
          style={styles.menuItem}
          onPress={() => navigateHandler('NewGroup')}
        >
          <Group style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>Grup Oluştur</Text>
        </MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: theme.colors.inputBg,
  },
  menuBtn: {
    marginRight: 12,
  },
  menuItem: {},
  menuItemIcon: {
    color: theme.colors.text,
    width: 16,
    height: 16,
  },
  menuItemText: {},
});

export default NavMenu;
