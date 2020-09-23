import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { globalContext } from '../context/globalContext';
import { AuthContext } from '../context/AuthContext';

import {
  fetchMessages,
  sendMessage,
} from '../services/messageService';

import Loading from '../components/Loading';
import Input from '../components/Input';
import Text from '../components/Text';
import { Send } from '../components/icons';

import theme from '../utils/theme';
const { colors } = theme;

function ChatScreen({ navigation, route }) {
  const { user } = useContext(globalContext).state;
  const {
    dispatch,
    state: { socket, messages },
  } = useContext(AuthContext);
  const { id } = user;
  const channelId = route.params.id;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const msgList = useRef();

  const newMessageHandler = useCallback(() => {
    if (message.length === 0) {
      return;
    }

    const newMessage = {
      to: channelId,
      viewed: false,
      from: user,
      message,
    };
    socket.emit('new message', newMessage);

    sendMessage(channelId, message).then(() => {
      dispatch({
        type: 'NEW_MESSAGE',
        newMessage: {
          _id: Date.now() + message,
          message,
          from: { _id: id },
        },
      });
      setMessage('');
    });
    // .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT));
  }, [socket, user, message, channelId, id, dispatch]);

  useEffect(() => {
    async function getMessages() {
      fetchMessages(channelId)
        .then((res) => {
          dispatch({ type: 'SET_MESSAGES', messages: res });
        })
        // .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT))
        .finally(() => setLoading(false));
    }

    getMessages();
    dispatch({ type: 'ACTIVE_CHANNEL', id: channelId });
    socket.emit('iam online', channelId, user.nick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, dispatch, socket]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({ type: 'ACTIVE_CHANNEL', id: 0 });
      socket.emit('iamnot online', channelId, user.nick);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <FlatList
        ref={msgList}
        contentContainerStyle={{ paddingTop: 5, flex: 1 }}
        onContentSizeChange={() =>
          msgList.current.scrollToEnd({ animated: false })
        }
        ListEmptyComponent={() => <Text>Henüz Mesaj Yok</Text>}
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.from._id === id && styles.right,
            ]}
          >
            {item.from._id !== id && (
              <Text style={styles.from}>{item.from.nick}</Text>
            )}
            <Text style={styles.messageContent}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        // initialScrollIndex={DATA.length - 1}

        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
      <View style={styles.messageWrapper}>
        <Input
          dark
          style={styles.messageInput}
          placeholder="Mesaj yaz"
          onSubmitEditing={newMessageHandler}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={newMessageHandler}>
          <Send color={colors.primary} width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayDark,
    flex: 1,
  },
  messageContainer: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    minHeight: 40,
    backgroundColor: colors.gray,
    marginBottom: 8,
    marginHorizontal: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  from: {
    fontWeight: 'bold',
  },
  messageContent: {
    fontWeight: '100',
  },
  messageWrapper: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 55,
  },
  messageInput: {
    flex: 1,
  },
});
export default ChatScreen;
