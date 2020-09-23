import React, { useContext } from 'react';

import UnauthorizeNavigator from './UnauthorizeNavigator';
import AuthorizedNavigator from './AuthorizedNavigator';

import { globalContext } from './context/globalContext';
import SplashScreen from './screens/SplashScreen';

export default function Navigation() {
  const { isLoading, isAuthenticated } = useContext(
    globalContext,
  ).state;

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? (
    <AuthorizedNavigator />
  ) : (
    <UnauthorizeNavigator />
  );
}
