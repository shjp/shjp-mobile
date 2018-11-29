import React from 'react';
import {
  Image
} from 'react-native';

export const baseNavigationOptions = Object.freeze({
  headerLeft: <Image source={require('../../res/logo.png')} resizeMode="center" style={{left: 4, width: 60, height: 40}} />,
  headerStyle: {
    backgroundColor: '#fff'
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    color: '#000'
  }
});