import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

export const globalContext = createContext();

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const decoded = jwt_decode(token);
        if (Date.now() < decoded.exp * 1000) {
          dispatch({
            type: 'RESTORE_TOKEN',
            user: decoded,
            isAuthenticated: true,
          });
        } else {
          dispatch({
            type: 'RESTORE_TOKEN',
            user: null,
            isAuthenticated: false,
          });
          await AsyncStorage.removeItem('token');
        }
      } else {
        dispatch({
          type: 'RESTORE_TOKEN',
          user: null,
          isAuthenticated: false,
        });
      }
    }
    getToken();
  }, []);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
}
