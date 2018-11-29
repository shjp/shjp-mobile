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
import DateTimePicker from 'react-native-modal-datetime-picker';

import { isNil } from 'lodash';

import { clearRegisterForm, emailRegister, updateRegisterForm } from '../../actions/signup';

class RegisterHelperView extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);

    this.state = {
      birthdayPickerVisible: false,
      feastdayPickerVisible: false,
    };
  }

  formatDate = date => !date ? 'Pick a date' : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  isFormEmpty = () =>
    !this.props.baptismalName
    && !this.props.birthday
    && !this.props.feastday;

  onBirthdayPicked = birthday => {
    this.props.updateRegisterForm({ birthday });
    this.setState(() => ({ birthdayPickerVisible: false }));
  };

  onFeastdayPicked = feastday => {
    this.props.updateRegisterForm({ feastday});
    this.setState(() => ({ feastdayPickerVisible: false }));
  };

  back = () => this.props.navigation.goBack();

  submit = () => {
    this.props.emailRegister().then(() => {
      this.props.clearRegisterForm();
    });
  };

  render() {
    const { baptismalName, birthday, feastday } = this.props;
    return (
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.formText}
              underlineColorAndroid="transparent"
              placeholder='Baptismal name (optional)'
              value={baptismalName}
              onChangeText={baptismalName => this.props.updateRegisterForm({ baptismalName })}/>
          </View>
          <TouchableHighlight onPress={() => this.setState(() => ({ birthdayPickerVisible: true }))}>
            <View style={styles.form}>
              <Text style={birthday ? styles.formText : styles.formPlaceholderText}>
                {
                  birthday ?
                    ` Birthday: ${this.formatDate(birthday)}`
                  :
                    'Pick your birthday (optional)'
                }
              </Text>
              <DateTimePicker
                isVisible={this.state.birthdayPickerVisible}
                onConfirm={this.onBirthdayPicked}
                onCancel={() => this.setState(() => ({ birthdayPickerVisible: false }))}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState(() => ({ feastdayPickerVisible: true }))}>
            <View style={styles.form}>
              <Text style={this.state.feastday ? styles.formText : styles.formPlaceholderText}>
                {
                  feastday ?
                    ` Feast Day: ${this.formatDate(feastday)}`
                  :
                    'Pick your feast day (optional)'
                }
              </Text>
              <DateTimePicker
                isVisible={this.state.feastdayPickerVisible}
                onConfirm={this.onFeastdayPicked}
                onCancel={() => this.setState(() => ({ feastdayPickerVisible: false }))}/>
            </View>
          </TouchableHighlight>
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
            onPress={this.submit}>
            <View style={styles.navigationButtonContent}>
              <Text style={styles.navigationText}>{ this.isFormEmpty() ? 'Skip for now' : 'Register' }</Text>
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
  formPlaceholderText: {
    flex: 1,
    color: '#ccc',
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
})

export default connect(
  state => ({ ...state.signup }),
  { clearRegisterForm, emailRegister, updateRegisterForm }
)(RegisterHelperView);