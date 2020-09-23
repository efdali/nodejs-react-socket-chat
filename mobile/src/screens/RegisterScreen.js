import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import BgDark from '../components/BgDark';
import Text from '../components/Text';
import Input from '../components/Input';
import Loading from '../components/Loading';

import theme from '../utils/theme';

import { register } from '../services/userService';

function RegisterScreen({ navigation }) {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [loading, setLoading] = useState(false);

  const registerHandler = useCallback(() => {
    setLoading(true);
    register(nick, email, passwd)
      .then(() => {
        ToastAndroid.show(
          'Kayıt başarılı.Giriş Yapabilirsiniz!',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Login');
      })
      .catch((err) => {
        ToastAndroid.show('Hatalı Giriş! ' + err, ToastAndroid.SHORT);
        setLoading(false);
      });
  }, [navigation, nick, email, passwd]);

  return (
    <BgDark>
      {loading && <Loading />}
      <View style={styles.wrapper}>
        <Input
          style={styles.input}
          placeholder="Nick"
          returnKeyLabel="Mail"
          value={nick}
          onChangeText={(text) => setNick(text)}
        />
        <Input
          style={styles.input}
          placeholder="Mail"
          returnKeyLabel="Şifre"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          onPress={registerHandler}
        >
          <Text>Kayıt Ol</Text>
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

export default RegisterScreen;
