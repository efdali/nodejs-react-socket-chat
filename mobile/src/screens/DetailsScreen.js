import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from 'react-native';

import { getChannelDetails } from '../services/channelService';

import BgDark from '../components/BgDark';
import Loading from '../components/Loading';
import { User } from '../components/User';
import Text from '../components/Text';

import theme from '../utils/theme';
const { colors } = theme;

function DetailsScreen({ route }) {
  const channelId = route.params.id;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (!channelId) {
      ToastAndroid.show(
        'Oppps! Bir hata oluştu.',
        ToastAndroid.SHORT,
      );
      return;
    }
    getChannelDetails(channelId)
      .then((res) => setDetails(res))
      // .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT))
      .finally(() => setLoading(false));
  }, [channelId]);

  return (
    <BgDark>
      {loading && <Loading style={styles.loading} />}
      <View style={styles.infoBox}>
        <Text fontSize={18}>Grup Hakkında</Text>
        <Text style={styles.textContainer} secondary>
          {details.description}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text fontSize={18}>Grup Konusu</Text>
        <Text style={styles.textContainer} secondary>
          {details.subject}
        </Text>
      </View>

      <FlatList
        contentContainerStyle={[styles.infoBox, styles.flat]}
        data={details.users}
        renderItem={({ item }) => (
          <User
            user={{
              _id: item._id,
              name: item.nick,
              picture: item.picture,
            }}
          />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <Text>Sizden başka üye yok</Text>}
        ListHeaderComponent={() => (
          <Text style={styles.flatTitle}>Üyeler</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
    </BgDark>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  textContainer: {
    backgroundColor: colors.inputBg,
    marginTop: 12,
    padding: 5,
    minHeight: 35,
  },
  flat: {
    paddingBottom: 40,
  },
  flatTitle: {
    marginBottom: 12,
    fontSize: 18,
  },
});

export default DetailsScreen;
