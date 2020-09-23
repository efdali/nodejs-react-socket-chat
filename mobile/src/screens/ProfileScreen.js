import React, { useContext, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { globalContext } from '../context/globalContext';

import { deactiveAccount } from '../services/userService';

import UserImage from '../components/UserImage';
import Text from '../components/Text';
import { UserEdit, Trash, Lock } from '../components/icons';

function ProfileScreen({ navigation }) {
  const {
    dispatch,
    state: { user },
  } = useContext(globalContext);

  const removeAccountHandler = useCallback(() => {
    deactiveAccount().then((res) => {
      if (res) {
        Alert.alert(
          'Emin misiniz?',
          'Hesabınızı silmek istediğinizden emin misiniz?',
          [
            {
              text: 'Sil',
              onPress: () => {
                dispatch({ type: 'LOGOUT' });
              },
            },
            {
              text: 'iptal',
            },
          ],
        );
      }
    });
  }, [dispatch]);

  const navigateScreen = useCallback(
    (screenName) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  return (
    <>
      <View style={styles.imgContainer}>
        <UserImage
          size="big"
          // source="https://www.majorscope.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          source={user?.picture}
          name={user.nick}
        />
        <Text>{user.nick}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => navigateScreen('EditProfile')}
        >
          <Text style={styles.actionText}>
            <UserEdit style={styles.icon} /> Kişisel Bilgiler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Text style={styles.actionText}>
            <Lock style={styles.icon} /> Parola Değiştir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={removeAccountHandler}
        >
          <Text style={{ ...styles.actionText, ...styles.red }}>
            <Trash style={[styles.icon, styles.red]} />
            Hesabı Sil
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    alignItems: 'center',
  },
  action: {
    width: '70%',
    marginTop: 25,
  },
  actionText: {
    justifyContent: 'center',
  },
  red: {
    color: 'red',
  },
  icon: {
    color: 'white',
  },
});

export default ProfileScreen;
