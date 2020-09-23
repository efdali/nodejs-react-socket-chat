import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, ToastAndroid } from 'react-native';

import { globalContext } from '../context/globalContext';
import { AuthContext } from '../context/AuthContext';

import { fetchChannels } from '../services/channelService';

import { UserWithMessage } from '../components/User';
import Loading from '../components/Loading';

function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const { socket } = useContext(AuthContext).state;
  const {
    user: { id },
  } = useContext(globalContext).state;

  async function getChannels() {
    fetchChannels()
      .then((channels) => {
        setGroups(channels);
        if (socket !== null) {
          socket.emit('all channels', channels, id);
        }
      })
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id]);

  return (
    <>
      {loading && <Loading />}
      <FlatList
        contentContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 30,
        }}
        data={groups}
        renderItem={({ item }) => (
          <UserWithMessage user={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        keyExtractor={(item) => item._id}
        onRefresh={() => getChannels()}
        refreshing={false}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
    </>
  );
}

export default HomeScreen;
