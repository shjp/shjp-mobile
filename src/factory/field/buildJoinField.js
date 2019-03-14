import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements'

import { changeGroupMembership, getGroupDetails } from '../../actions/group';
import { showSnackbar } from '../../actions/ui';

const buildJoinField = (mode, field, state, update) => {
  return <JoinField key={field.key} data={state[field.key]} membership={state.membership}/>;
};

const JoinField = connect(
  state => ({ groupId:  state.group.current && state.group.current.id }),
  { changeGroupMembership, getGroupDetails, showSnackbar }
)(
  class extends Component {
    constructor(props) {
      super(props);
    }
    requestJoinGroup = () => {
      this.props.changeGroupMembership(this.props.data)
        .then(() => {
          this.props.showSnackbar({ textMessage: 'Request to join the group has been sent.', autoHidingTime: 5000 });
          this.props.getGroupDetails(this.props.groupId);
        });
    }
    render() {
      if (this.props.membership && this.props.membership.status === 'pending') {
        return (
          <View>
            <Button
              title="Join request sent"
              type="outline"
              iconRight
              icon={
                <Icon
                  name="check"
                  size={15}
                  iconStyle={styles.icon}
                  containerStyle={styles.iconContainer}
                />
              }
              containerStyle={styles.buttonContainer}/>
          </View>
        );
      }
      if (this.props.data) {
        return (
          <View key={this.props.key}>
            <Button
              title="Join this group"
              containerStyle={styles.buttonContainer}
              onPress={this.requestJoinGroup}/>
          </View>
        );
      }
      return null;
    }
  }
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20
  },
  iconContainer: {
    marginLeft: 8,
  },
  icon: {
    color: '#2196f3'
  }
});

export default buildJoinField;