import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import UserImage from './UserImage';
import Text from './Text';

function User({ user, onPress = () => null }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <UserImage source={user.picture} name={user.name} />
      <Text style={styles.text} numberOfLines={1}>
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}

function UserWithMessage({ user, navigation }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          title: user.name,
          id: user._id,
          picture: user.picture,
        })
      }
      style={styles.container}
    >
      <UserImage source={user.picture} name={user.name} />
      <View style={styles.fullwidth}>
        <View style={styles.header}>
          <Text style={styles.text} numberOfLines={1}>
            {user.name}
          </Text>
          <Text secondary fontSize={14}>
            {user.date}
          </Text>
        </View>
        <Text secondary style={styles.text} numberOfLines={1}>
          {user.lastMessage || 'Henüz Mesaj Yok'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    // paddingHorizontal: 30,
    // marginBottom: 30,
  },
  fullwidth: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 8,
  },
});

export { User, UserWithMessage };
