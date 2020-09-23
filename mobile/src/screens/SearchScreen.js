import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { FlatList, View, Alert } from 'react-native';

import { AuthContext } from '../context/AuthContext';

import {
  searchChannel,
  joinToChannel,
  newPrivateChannel,
} from '../services/channelService';

import { searchUser } from '../services/userService';

import { User } from '../components/User';
import Text from '../components/Text';

const listContainerStyle = {
  paddingVertical: 15,
  paddingHorizontal: 30,
};

function SearchScreen({ navigation }) {
  const { searchText } = useContext(AuthContext).state;
  const timeOut = useRef(null);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);

  function fetchResults() {
    searchChannel(searchText)
      .then((res) => setChannels(res))
      .catch((err) => console.warn(err));

    searchUser(searchText)
      .then((res) => setUsers(res))
      .catch((err) => console.warn(err));
  }

  const joinGroupHandler = useCallback((id) => {
    Alert.alert(
      'Emin misiniz?',
      'Gruba katılmak istediğinizden emin misiniz?',
      [
        {
          text: 'Katıl',
          onPress: () => {
            joinToChannel(id)
              .then((group) =>
                navigation.navigate('Chat', {
                  id: group._id,
                  title: group.name,
                }),
              )
              .catch((res) => console.warn(res));
          },
        },
        {
          text: 'Hayır',
        },
      ],
      { cancelable: true },
    );
  }, []);

  const newPrivateChannelHandler = useCallback(
    (id, nick) => {
      Alert.alert(
        'Emin misiniz?',
        'Özel mesaj göndermek istediğinizden emin misiniz?',
        [
          {
            text: 'Gönder',
            onPress: () => {
              newPrivateChannel(id, nick)
                .then(({ group }) =>
                  navigation.navigate('Chat', {
                    id: group._id,
                    title: group.name,
                  }),
                )
                .catch((err) => console.warn(err));
            },
          },
          {
            text: 'Hayır',
          },
        ],
        { cancelable: true },
      );
    },
    [navigation],
  );

  useEffect(() => {
    if (searchText.length === 0) {
      return;
    }

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    timeOut.current = setTimeout(fetchResults, 500);

    return () => {
      clearTimeout(timeOut.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  return (
    <View>
      <FlatList
        ListEmptyComponent={() => <Text>Yok</Text>}
        contentContainerStyle={listContainerStyle}
        data={channels}
        ListHeaderComponent={() => (
          <Text secondary style={{ marginBottom: 8 }}>
            Gruplar
          </Text>
        )}
        renderItem={({ item }) => (
          <User
            user={item}
            onPress={() => joinGroupHandler(item._id)}
          />
        )}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
      <FlatList
        ListEmptyComponent={() => <Text>Yok</Text>}
        contentContainerStyle={listContainerStyle}
        data={users}
        ListHeaderComponent={() => (
          <Text secondary style={{ marginBottom: 8 }}>
            Kullanıcılar
          </Text>
        )}
        renderItem={({ item }) => (
          <User
            user={{
              _id: item._id,
              name: item.nick,
              picture: item.picture,
            }}
            onPress={() =>
              newPrivateChannelHandler(item._id, item.nick)
            }
          />
        )}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
    </View>
  );
}

export default SearchScreen;
