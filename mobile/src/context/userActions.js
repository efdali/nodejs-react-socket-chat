import jwt_decode from 'jwt-decode';

export const loginAction = (token) => {
  const decoded = jwt_decode(token);
  return { type: 'LOGIN', user: decoded };
};
