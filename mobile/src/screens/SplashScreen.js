import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import BgDark from '../components/BgDark';
import Text from '../components/Text';
import { Logo } from '../components/icons';

function SplashScreen() {
  return (
    <BgDark>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo width={256} height={256} />
        <Text style={{ marginVertical: 15 }}>Mobile</Text>
        <ActivityIndicator color="blue" size="large" />
      </View>
    </BgDark>
  );
}

export default SplashScreen;
