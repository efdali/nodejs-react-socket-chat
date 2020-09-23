import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import { newPublicChannel } from '../services/channelService';

import BgDark from '../components/BgDark';
import Input from '../components/Input';
import Text from '../components/Text';
import Loading from '../components/Loading';

import theme from '../utils/theme';

function NewGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [groupSubject, setGroupSubject] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const newPublicChannelHandler = useCallback(() => {
    if (groupName.length === 0) {
      return;
    }
    setLoading(true);
    newPublicChannel(groupName, groupSubject, groupDesc)
      .then((res) => {
        ToastAndroid.show(
          'Yeni Grup Oluşturuldu',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Chat', {
          title: res.name,
          id: res._id,
          picture: res.picture,
        });
      })
      .catch(() => setLoading(false));
  }, [navigation, groupName, groupSubject, groupDesc]);

  return (
    <BgDark>
      {loading && <Loading />}
      <View style={styles.inputWrapper}>
        <Input
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
          style={styles.input}
          placeholder="Grup Adı"
        />
        <Input
          style={styles.input}
          placeholder="Grup Konusu"
          value={groupSubject}
          onChangeText={(text) => setGroupSubject(text)}
        />
        <Input
          multiple
          numberOfLines={12}
          textAlignVertical="top"
          style={[styles.input, styles.multiple]}
          placeholder="Grup Açıklaması"
          value={groupDesc}
          onChangeText={(text) => setGroupDesc(text)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={newPublicChannelHandler}
        >
          <Text>Oluştur</Text>
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
export default NewGroupScreen;
