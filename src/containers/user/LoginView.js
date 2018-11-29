import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

import { baseNavigationOptions } from '../../configs/navigationOptions';

import { post } from '../../api/api';

class LoginView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Login',
    ...baseNavigationOptions
  });

  goToRegister = () => this.props.navigation.navigate('EmailRegisterView', {
    redirect: this.props.navigation.getParam('redirect', 'Home')
  });

  render() {
    return (
      <View style={styles.page}>
        <TouchableHighlight style={styles.emailLoginContainer}>
          <Text style={styles.buttonText}>Log in with E-mail</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.registerContainer} onPress={() => this.goToRegister()}>
          <Text style={styles.buttonText}>Not a member yet? Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  emailLoginContainer: {
    width: '100%',
    flex: 3,
    backgroundColor: '#bb55bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    width: '100%',
    flex: 3,
    backgroundColor: '#ffe4e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default connect(
  null,
  {}
)(LoginView);