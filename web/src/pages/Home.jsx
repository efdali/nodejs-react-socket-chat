/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useContext, useRef, memo } from 'react';
import io from 'socket.io-client';
import { globalContext } from '../store';
import { SOCKET_URL } from '../utils/constants';
import { fetchChannels } from '../services/channelService';
import { fetchMessages } from '../services/messageService';
import Channels from '../components/Channels';
import { Layout, message, notification } from 'antd';
import Chat from '../components/Chat';
function Home() {
  const context = useContext(globalContext);
  const {
    dispatch,
    state: { activeChannel, user },
  } = context;

  let socket = useRef(context.state.socket);
  let activeChannelId = useRef(activeChannel.id);

  const newMessageHandler = useCallback(
    (data) => {
      const { message } = data;
      console.log(activeChannelId);
      if (activeChannelId.current !== message.to) {
        const key = `notification${Date.now()}`;
        notification.open({
          message: 'Yeni mesaj',
          description: `${message.from.nick} 'den : ${message.message}`,
          key,
          onClick() {
            dispatch({
              type: 'FIND_AND_CHANGE_ACTIVE_CHANNEL',
              id: message.to,
            });
            notification.close(key);
          },
        });
      }
      dispatch({
        type: 'ADD_MESSAGE',
        message,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (socket.current == null) {
      socket.current = io(SOCKET_URL);
      dispatch({ type: 'SOCKET_CREATED', socket });
    }
    socket.current.on('new message', (data) => {
      newMessageHandler(data);
    });

    socket.current.on('online users', (userId) => {
      socket.current.emit('iam online', userId, user.nick);
    });

    socket.current.on('iam online', (nick) => {
      dispatch({ type: 'ADD_ONLINE_USER', nick });
    });

    socket.current.on('new private channel', (channel) => {
      dispatch({ type: 'NEW_CHANNEL', channel });
      socket.current.emit('join channel', channel._id);
    });

    // FETCH CHANNELS
    fetchChannels(dispatch, localStorage.token)
      .then((channels) => {
        socket.current.emit('all channels', channels, user.id);
      })
      .catch((err) => message.error(err));
  }, []);

  // when channel changed, fetch messages that belongs this new channel
  useEffect(() => {
    activeChannelId.current = activeChannel.id;
    console.log('active changes');
    if (activeChannel.id) {
      // FETCH MESSAGES
      fetchMessages(
        activeChannel.id,
        dispatch,
        localStorage.token
      ).catch((err) => message.error(err));

      dispatch({ type: 'CLEAN_ONLINE_USERS' });
      socket.current.emit('online users', activeChannel.id, user.id);
      socket.current.emit('iam online', activeChannel.id, user.nick);
    }
  }, [activeChannel.id]);

  return (
    <>
      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          height: '100%',
          margin: 'auto',
        }}
      >
        <Layout style={{ height: '100%' }}>
          <Channels />
          <Chat />
        </Layout>
      </div>
    </>
  );
}

export default memo(Home);
