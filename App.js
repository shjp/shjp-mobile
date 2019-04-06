import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Asset, AppLoading, SplashScreen } from 'expo';

import configureStore from './src/store/configure-store';
import AppNavigator from './src/containers/navigation/AppNavigator';
import GlobalUIWatchdog from './src/containers/common/GlobalUIWatchdog';

const store = configureStore();

export default class App extends Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
    splashFinished: false,
  };

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./res/splash.gif');
    return Asset.fromModule(gif).downloadAsync()
  }

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    this.setState(() => ({ isAppReady: true }));
    setTimeout(() => {
      this.setState(() => ({ splashFinished: true }));
    }, 4500);
  }

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady || !this.state.splashFinished) {
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({ splashFinished: true })}>
          <View style={styles.container}>
            <Image
              source={require('./res/splash.gif')}
              onLoad={this._cacheResourcesAsync}
              resizeMode='stretch'
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }

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
    backgroundColor: '#fff',
  }
});
