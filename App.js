import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet
} from 'react-native';

import configureStore from './src/store/configure-store';
import AppNavigator from './src/containers/navigation/AppNavigator';
import GlobalUIWatchdog from './src/containers/common/GlobalUIWatchdog';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
          <AppNavigator />
          <GlobalUIWatchdog />
        </>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
