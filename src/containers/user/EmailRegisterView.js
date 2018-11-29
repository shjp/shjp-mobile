import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import {
  Icon
} from 'react-native-elements'

import { isEmpty } from 'lodash';

import { clearRegisterForm, updateRegisterForm } from '../../actions/signup';
import {
  errorRegistrationEmailRequired,
  errorRegistrationPasswordRequired
} from '../../configs/errors';

class EmailRegisterView extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);

    this.state = {
      emailError: '',
      passwordError: ''
    };
  }

  next = () => {
    this.validate().then(valid => {
      if (valid) {
        this.props.navigation.navigate('RegisterHelperView');
      }
    });
  };

  back = () => {
    this.props.clearRegisterForm();
    this.props.navigation.goBack();
  };

  validate = () => {
    return new Promise(resolve => {
      const emailError = isEmpty(this.props.email) ? errorRegistrationEmailRequired : '';
      const passwordError = isEmpty(this.props.password) ? errorRegistrationPasswordRequired : '';
      this.setState({
        emailError,
        passwordError
      });
      return resolve(!emailError && !passwordError);
    });
  };

  render() {
    const { email, password } = this.props;
    return (
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.form}>
            <Icon
              containerStyle={styles.formIcon}
              type='font-awesome'
              name='envelope'
              color='#fff'/>
            <TextInput
              style={styles.formText}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
              placeholder='E-mail'
              value={email}
              onChangeText={email => this.props.updateRegisterForm({ email })}/>
          </View>
          <Text style={styles.formError}>
            { this.state.emailError }
          </Text>
          <View style={styles.form}>
            <Icon
              containerStyle={styles.formIcon}
              underlineColorAndroid="transparent"
              type='font-awesome'
              name='lock'
              color='#fff'/>
            <TextInput
              style={styles.formText}
              underlineColorAndroid="transparent"
              placeholder='Password'
              textContentType='password'
              secureTextEntry={true}
              value={password}
              onChangeText={password => this.props.updateRegisterForm({ password })}/>
          </View>
          <Text style={styles.formError}>
            { this.state.passwordError }
          </Text>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={styles.navigationButton}
            activeOpacity={0.7}
            underlayColor='#dd88dd'
            onPress={this.back}>
            <View style={styles.navigationButtonContent}>
              <Icon
                containerStyle={styles.navigationIcon}
                type='font-awesome'
                name='chevron-left'
                color='#fff'
                size={16}/>
              <Text style={styles.navigationText}>Back</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.navigationButton}
            activeOpacity={0.7}
            underlayColor='#dd88dd'
            onPress={this.next}>
            <View style={styles.navigationButtonContent}>
              <Text style={styles.navigationText}>Next</Text>
              <Icon
                containerStyle={styles.navigationIcon}
                type='font-awesome'
                name='chevron-right'
                color='#fff'
                size={16}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#bb55bb',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 300,
    height: 72,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 3,
    padding: 10,
    margin: 10,
  },
  formIcon: {
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    margin: 10
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  navigationButton: {
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa44aa',
  },
  navigationButtonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationText: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 10
  },
  navigationIcon: {
    marginBottom: -2,
    marginHorizontal: 10
  },
  formError: {
    color: '#f00'
  }
})

export default connect(
  state => ({ ...state.signup }),
  { clearRegisterForm, updateRegisterForm }
)(EmailRegisterView);