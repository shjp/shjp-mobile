import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export const baseNavigationOptions = navigation => Object.freeze({
  headerLeft: (
    <Image
      source={require('../../res/logo.png')}
      resizeMode="center"
      style={styles.headerLeft}
    />
  ),
  headerRight: navigation.getParam('showOverlayMenu') && (
    <Icon
      containerStyle={styles.headerRight}
      name='bars'
      type='font-awesome'
      onPress={navigation.getParam('showOverlayMenu')}
    />
  ),
  headerStyle: {
    backgroundColor: '#fff'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    color: '#000'
  }
});

const styles = StyleSheet.create({
  headerLeft: {
    left: 4,
    width: 60,
    height: 40,
  },
  headerRight: {
    marginRight: 20,
  },
});
