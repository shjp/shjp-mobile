import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

const ResourceControlButton = ({ navigation, link, icon, iconType = 'font-awesome' }) =>
  <View style={style.container}>
    <Icon style={style.icon} name={icon} type={iconType} onPress={() => navigation.navigate(link)} />
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

export default ResourceControlButton;