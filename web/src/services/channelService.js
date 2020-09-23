import { API_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${localStorage.token}`,
};
export const fetchChannels = (dispatch, token) => {
  headers.authorization = `Bearer ${token}`;
  return fetch(API_URL + '/group', { headers })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const firstChannel = res.channels[0];
        dispatch({ type: 'SET_CHANNEL', channels: res.channels });
        dispatch({
          type: 'CHANGE_ACTIVE_CHANNEL',
          channel: { id: firstChannel._id, name: firstChannel.name },
        });
        return res.channels;
      } else {
        return Promise.reject(res.message);
      }
    });
};

export const searchChannel = (s) => {
  return fetch(`${API_URL}/group/search?s=${s}`, { headers })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        return res.groups;
      } else {
        return Promise.reject(res.message);
      }
    });
};

export const newChannel = (name) => {
  return fetch(`${API_URL}/group/new/public`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) return res.group;
      else return Promise.reject(res.message);
    });
};

export const newPrivateMessage = (id, nick) => {
  return fetch(`${API_URL}/group/new/private`, {
    method: 'POST',
    body: JSON.stringify({ user: id, toNick: nick }),
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) return { new: res.new, channel: res.group };
      else return Promise.reject(res.message);
    });
};

export const joinToChannel = (id) => {
  return fetch(`${API_URL}/group/join/${id}`, {
    method: 'PUT',
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) return res.group;
      else return Promise.reject(res.message);
    });
};

export const getChannelInfo = (id) => {
  return fetch(`${API_URL}/group/${id}`, { headers })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) return res.details;
      else return Promise.reject(res.message);
    });
};
