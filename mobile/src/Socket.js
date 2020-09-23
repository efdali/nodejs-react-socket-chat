import React, { useContext, useEffect, useRef } from 'react';
import Snackbar from 'react-native-snackbar';
import io from 'socket.io-client';

import { AuthContext } from './context/AuthContext';

import { SOCKET_URL } from './utils/constants';

function Socket({ children }) {
  const { dispatch, state } = useContext(AuthContext);
  let channelId = useRef(state.activeChannelId);

  useEffect(() => {
    channelId.current = state.activeChannelId;
  }, [state.activeChannelId]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    dispatch({ type: 'SOCKET_CREATED', socket });

    socket.on('new message', ({ message }) => {
      if (message.to === channelId.current) {
        dispatch({
          type: 'NEW_MESSAGE',
          newMessage: {
            _id: Date.now() + message.message,
            message: message.message,
            from: {
              _id: message.from.id,
              nick: message.from.nick,
            },
          },
        });
      } else {
        Snackbar.show({
          text: `${message.from.nick}'den yeni mesaj : ${message.message}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default Socket;
