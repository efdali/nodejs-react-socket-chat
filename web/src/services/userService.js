import { API_URL } from '../utils/constants';

const headers = { 'Content-Type': 'application/json' };
export const login = (nick, password) => {
  return fetch(API_URL + '/user/login', {
    method: 'POST',
    body: JSON.stringify({ nick, password }),
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        return res.token;
      } else {
        return Promise.reject(res.message);
      }
    });
};

export const register = (nick, email, password) => {
  return fetch(API_URL + '/user/register', {
    method: 'POST',
    body: JSON.stringify({ nick, email, password }),
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.success || Promise.reject(res.message);
    });
};

export const searchUser = (s) => {
  return fetch(`${API_URL}/user/search?s=${s}`, {
    headers: { ...headers, authorization: `Bearer ${localStorage.token}` },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) return res.users;
      else return Promise.reject(res.message);
    });
};
