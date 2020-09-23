import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import BgDark from '../components/BgDark';
import Input from '../components/Input';
import Text from '../components/Text';

import theme from '../utils/theme';

function EditProfileScreen() {
  return (
    <BgDark>
      <View style={styles.inputWrapper}>
        <View>
          <Text style={styles.inputTitle}>Kullanıcı Adı</Text>
          <Input
            // value={groupName}
            // onChangeText={(text) => setGroupName(text)}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Hakkımda</Text>
          <Input
            // value={groupName}
            // onChangeText={(text) => setGroupName(text)}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <Input
            // value={groupName}
            // onChangeText={(text) => setGroupName(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          // onPress={newPublicChannelHandler}
        >
          <Text>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </BgDark>
  );
}
const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  input: {
    marginBottom: 40,
    borderRadius: 8,
  },
  inputTitle: {
    marginBottom: 5,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 'auto',
    marginBottom: 30,
  },
});

export default EditProfileScreen;
