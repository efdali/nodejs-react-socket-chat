import React, { createContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

const globalContext = createContext();
const { Provider } = globalContext;

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'SOCKET_CREATED':
      return {
        ...state,
        socket: action.socket,
      };
    case 'LOGIN':
      const user = jwt_decode(action.user);
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case 'SET_CHANNEL':
      return {
        ...state,
        channels: action.channels,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.messages,
      };
    case 'CHANGE_ACTIVE_CHANNEL':
      return {
        ...state,
        onlineUsers: [],
        activeChannel: action.channel,
      };
    case 'FIND_AND_CHANGE_ACTIVE_CHANNEL':
      const find = state.channels.find((channel) => channel._id === action.id);
      return {
        ...state,
        onlineUsers: [],
        activeChannel: { id: find._id, name: find.name },
      };
    case 'ADD_MESSAGE':
      if (state.activeChannel.id !== action.message.to) {
        return state;
      }
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'NEW_CHANNEL':
      return {
        ...state,
        channels: [action.channel, ...state.channels],
      };
    case 'ADD_ONLINE_USER':
      return {
        ...state,
        onlineUsers: [action.nick, ...state.onlineUsers],
      };
    case 'CLEAN_ONLINE_USERS':
      return {
        ...state,
        onlineUsers: [],
      };
    default:
      return state;
  }
};
function StateProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { globalContext, StateProvider };
