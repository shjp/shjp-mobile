import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Icon
} from 'react-native-elements'
import { connect } from 'react-redux';

import { SHJPBaseCard } from '../../components/custom/cards';
import { baseNavigationOptions } from '../../configs/navigationOptions';

import { post } from '../../api/api';

class LoginView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Login',
    ...baseNavigationOptions
  });

  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.navigate('UserView', {
        id: this.props.user.id
      });
    }
  }

  goToEmailLogin = () => this.props.navigation.navigate('EmailLoginView', {
    redirect: this.props.navigation.getParam('redirect', 'Home')
  })

  goToRegister = () => this.props.navigation.navigate('EmailRegisterView', {
    redirect: this.props.navigation.getParam('redirect', 'Home')
  });

  render() {
    return (
      <View style={styles.page}>
        <TouchableOpacity style={styles.emailLoginContainer} onPress={() => this.goToEmailLogin()}>
          <SHJPBaseCard style={styles.buttonCard}>
            <Text style={styles.buttonText}>Log in with E-mail</Text>
            <Icon containerStyle={styles.buttonIcon} type='font-awesome' name='envelope' color='#000' size={40}/>
          </SHJPBaseCard>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerContainer} onPress={() => this.goToRegister()}>
          <SHJPBaseCard style={styles.buttonCard}>
            <Text style={styles.buttonText}>Not a member yet? Register</Text>
            <Icon containerStyle={styles.buttonIcon} type='font-awesome' name='vcard' color='#000' size={40}/>
          </SHJPBaseCard>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    width: '100%',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCard: {
    height: '98%',
    width: '98%',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonIcon: {
    marginVertical: 12
  }
});

export default connect(
  state => ({ user: state.user.current }),
  {}
)(LoginView);