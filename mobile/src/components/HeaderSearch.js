import React, { useContext, memo } from 'react';
import { View } from 'react-native';

import { AuthContext } from '../context/AuthContext';

import Input from './Input';

function HeaderSearch() {
  const {
    dispatch,
    state: { searchText },
  } = useContext(AuthContext);

  return (
    <View>
      <Input
        dark
        placeholder="kişi veya grup ara..."
        value={searchText}
        onChangeText={(text) =>
          dispatch({ type: 'SEARCH_TEXT', search: text })
        }
      />
    </View>
  );
}

export default memo(HeaderSearch);
