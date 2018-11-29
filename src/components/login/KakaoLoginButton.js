import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';
/*import {
  MKColor
} from 'react-native-material-kit';

import { KakaoThemeButton } from '../custom/buttons';*/

const KakaoLoginButton = ({ login }) =>
  <Text>
    Login
  </Text>;
  /*<KakaoThemeButton
      backgroundColor={MKColor.Yellow}
      onPress={login}
      text="Kakao Login">
  </KakaoThemeButton>;*/

const styles = StyleSheet.create({
  buttonContainer: {
  },
  text: {
    color: 'black'
  }
});

export default KakaoLoginButton;