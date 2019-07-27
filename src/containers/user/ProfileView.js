import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getMe } from '../../actions/me';
import { showOverlayMenu } from '../../actions/ui';
import { baseNavigationOptions } from '../../configs/navigationOptions';

class ProfileView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Profile',
    ...baseNavigationOptions(navigation)
  });

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showOverlayMenu: this.props.showOverlayMenu
    });
  }

  componentDidMount() {
    this.props.getMe();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.me && prevProps.me) {
      // Logged out
      this.props.navigation.navigate('LoginView');
    }
  }

  render() {
    if (!this.props.me) {
      return null;
    }

    const { name, email, baptismal_name, birthday, feastday, groups } = this.props.me; 

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Baptismal Name: {baptismal_name}</Text>
          <Text>Birthday: {birthday}</Text>
          <Text>Feastday: {feastday}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 0,
    top: 0,
    bottom: 0
  },
});

export default connect(
  state => ({ me: state.user.me }),
  { getMe, showOverlayMenu }
)(ProfileView);
