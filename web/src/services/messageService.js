import { API_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${localStorage.token}`,
};

export const fetchMessages = (channelId, dispatch, token) => {
  headers.authorization = `Bearer ${token}`;
  return fetch(API_URL + `/message/${channelId}`, { headers })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: 'SET_MESSAGES', messages: res.messages });
        return true;
      } else {
        return Promise.reject(res.message);
      }
    });
};

export const sendMessage = (to, message) => {
  return fetch(`${API_URL}/message/new`, {
    method: 'POST',
    body: JSON.stringify({
      to,
      message,
    }),
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      return res.success || Promise.reject(res.message);
    });
};
