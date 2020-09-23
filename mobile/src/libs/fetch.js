import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../utils/constants';

async function fetcha(url, options = {}, field = '') {
  const token = await AsyncStorage.getItem('token');
  return fetch(API_URL + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    ...options,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        return field ? res[field] : res;
      }
      return Promise.reject(res.message);
    })
    .catch((err) => {
      ToastAndroid.show(err, ToastAndroid.SHORT);
      // TODO
      if (
        typeof err === 'string' &&
        err.includes('TokenExpiredError')
      ) {
        console.warn('Here we go again');
      } else {
        return Promise.reject(err);
      }
    });
}

export default fetcha;
