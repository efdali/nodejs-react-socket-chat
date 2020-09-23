import React, { useState, useCallback, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { globalContext } from '../context/globalContext';
import { loginAction } from '../context/userActions';

import BgDark from '../components/BgDark';
import Text from '../components/Text';
import Input from '../components/Input';
import Loading from '../components/Loading';

import theme from '../utils/theme';

import { login } from '../services/userService';

function LoginScreen() {
  const { dispatch } = useContext(globalContext);
  const [nick, setNick] = useState('');
  const [passwd, setPasswd] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = useCallback(() => {
    if (!nick && !passwd) {
      return;
    }

    setLoading(true);
    login(nick, passwd)
      .then(async (res) => {
        await AsyncStorage.setItem('token', res);
        return res;
      })
      .then((res) => {
        setLoading(false);
        dispatch(loginAction(res));
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }, [nick, passwd, dispatch]);

  return (
    <BgDark>
      {loading && <Loading />}
      <View style={styles.wrapper}>
        <Input
          style={styles.input}
          placeholder="Nick"
          returnKeyLabel="Şifre"
          value={nick}
          onChangeText={(text) => setNick(text)}
        />
        <Input
          style={styles.input}
          placeholder="Şifre"
          returnKeyLabel="Giriş"
          secureTextEntry
          value={passwd}
          onChangeText={(text) => setPasswd(text)}
        />
        <TouchableOpacity
          disabled={loading}
          style={styles.btn}
          onPress={loginHandler}
        >
          <Text>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </BgDark>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 15, marginTop: 60 },
  input: { marginBottom: 15, borderRadius: 6 },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
