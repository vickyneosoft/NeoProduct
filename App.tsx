/**
 * @format
 */

import React, { Suspense } from 'react';
import {
  StatusBar,
  Platform
} from 'react-native';

import { Provider } from 'react-redux';
import LazyLoader from './components/LazyLoader';
import colors from './constants/colors';
import MainNavigation from './navigation/MainNavigation';
import { store } from './store';

const backgroundStyle = {
  backgroundColor: colors.red
};

const barStyle = Platform.OS === "android" ? 'light-content' : 'dark-content'

const App = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Provider store={store}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MainNavigation />
      </Provider>
    </Suspense>
  );
};

export default App;
