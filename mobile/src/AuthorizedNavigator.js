import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContextProvider from './context/AuthContext';

import Socket from './Socket';

import withLayout from './hoc/withLayout';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import NewGroupScreen from './screens/NewGroupScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import DetailsScreen from './screens/DetailsScreen';

import NavMenu from './components/NavMenu';
import UserImage from './components/UserImage';
import HeaderSearch from './components/HeaderSearch';
import { Back } from './components/icons';

import theme from './utils/theme';
const { colors } = theme;

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.black,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: '200',
    fontSize: 20,
  },
  headerRight: (props) => <NavMenu {...props} />,
};

export default function AuthorizedNavigator() {
  return (
    <AuthContextProvider>
      <Socket>
        <Stack.Navigator
          screenOptions={screenOptions}
          initialRouteName="Home"
        >
          <Stack.Screen
            options={{
              title: 'Anasayfa',
              headerLeft: () => null,
            }}
            name="Home"
            component={withLayout(HomeScreen)}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route, navigation }) => ({
              title: route.params?.title,
              headerLeft: () => (
                <View
                  style={{
                    marginLeft: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Back color="white" width={16} height={16} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Detail', {
                        title: route.params?.title,
                        id: route.params?.id,
                        picture: route.params?.picture,
                      })
                    }
                  >
                    <UserImage
                      name={route.params?.title}
                      picture={route.params?.picture}
                      size="small"
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Search"
            options={{
              headerTitle: () => <HeaderSearch />,
              headerLeft: () => null,
            }}
            component={withLayout(SearchScreen)}
          />
          <Stack.Screen
            options={{
              title: 'Profil',
            }}
            name="Profile"
            component={withLayout(ProfileScreen)}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Profil Düzenle' }}
          />
          <Stack.Screen
            options={{
              title: 'Grup Oluştur',
            }}
            name="NewGroup"
            component={NewGroupScreen}
          />
          <Stack.Screen
            name="Detail"
            component={DetailsScreen}
            options={({ route }) => ({
              title: route.params?.title,
            })}
          />
        </Stack.Navigator>
      </Socket>
    </AuthContextProvider>
  );
}
