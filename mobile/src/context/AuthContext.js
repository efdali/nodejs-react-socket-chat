import React, { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const initialState = {
  socket: null,
  searchText: '',
  messages: [],
  activeChannelId: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SOCKET_CREATED':
      return {
        ...state,
        socket: action.socket,
      };
    case 'ACTIVE_CHANNEL':
      return {
        ...state,
        activeChannelId: action.id,
      };
    case 'SEARCH_TEXT':
      return {
        ...state,
        searchText: action.search,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.messages,
      };
    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
