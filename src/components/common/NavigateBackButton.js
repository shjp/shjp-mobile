import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

const NavigateBackButton = ({ navigation }) =>
  <View style={style.container}>
    <Icon style={style.icon} name='arrow-left' type="font-awesome" onPress={() => navigation.goBack()} />
  </View>;

const style = StyleSheet.create({
  container: {
    marginRight: 12
  },
  icon: {
    margin: 4,
    fontSize: 20
  }
});

export default NavigateBackButton;