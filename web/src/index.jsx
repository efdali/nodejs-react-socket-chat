import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import jwt_decode from 'jwt-decode';
//Store
import { StateProvider } from './store';

const initialState = {
  isAuthenticated: false,
  user: {},
  channels: [],
  activeChannel: {},
  onlineUsers: [],
  messages: [],
  socket: null,
};

if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  if (Date.now() < decoded.exp * 1000) {
    initialState.isAuthenticated = true;
    initialState.user = decoded;
  } else {
    localStorage.removeItem('token');
  }
}

ReactDOM.render(
  <StateProvider initialState={initialState}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
