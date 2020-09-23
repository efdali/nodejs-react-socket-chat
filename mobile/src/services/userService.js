import fetcha from '../libs/fetch';

export const login = (nick, password) => {
  return fetcha(
    '/user/login',
    {
      method: 'POST',
      body: JSON.stringify({ nick, password }),
    },
    'token',
  );
};

export const register = (nick, email, password) => {
  return fetcha('/user/register', {
    method: 'POST',
    body: JSON.stringify({ nick, email, password }),
  });
};

export const searchUser = async (s) => {
  return fetcha(`/user/search?s=${s}`, {}, 'users');
};

export const deactiveAccount = () => {
  return fetcha('/user/deactive', { method: 'POST' });
};
