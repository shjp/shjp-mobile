import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, ButtonGroup, Icon } from 'react-native-elements'
import moment from 'moment';

import { updateRSVP } from '../../actions/event';
import { showSnackbar } from '../../actions/ui';
import * as Mode from '../modes';

const buildRolePillField = (mode, field, state, update) => {
  return <RSVPField key={field.key} data={state[field.key]} event={state}/>;
};

const RSVPField = connect(
  state => ({ me: state.user.me }),
  { updateRSVP, showSnackbar }
)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedValue: null
      };
    }
    options = [
      {
        value: 'yes',
        label: 'Yes',
      },
      {
        value: 'no',
        label: 'No',
      },
      {
        value: 'maybe',
        label: 'Maybe',
      }
    ];
    selectedIndex = () => {
      if (!this.props.me || !this.props.event) {
        return -1;
      }
      const userRsvp = this.props.event.rsvps && this.props.event.rsvps.find(r => r.user.id === this.props.me.id);
      const rsvpValue = this.state.selectedValue || (userRsvp && userRsvp.rsvp);
      return this.options.findIndex(option => option.value === rsvpValue);
    }
    selectOption = (index) => {
      const rsvpValue = this.options[index].value;
      this.props.updateRSVP({
        userId: this.props.me.id,
        eventId: this.props.event.id,
        rsvp: rsvpValue
      })
      .then(() => {
        this.setState(() => ({ selectedValue: rsvpValue }));
        this.props.showSnackbar({ textMessage: `You have ${rsvpValue}'ed to this event.`, autoHidingTime: 3000 });
      });
    }
    render() {
      if (!this.props.me) {
        return null;
      }
      return (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              RSVP
            </Text>
          </View>
          <ButtonGroup
            buttons={this.options.map(option => option.label)/*this.getSelections()*/}
            onPress={this.selectOption}
            selectedIndex={this.selectedIndex()}
            containerStyle={styles.buttonGroup}/>
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    margin: 0,
    marginTop: 20
  },
  labelContainer: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 3,
    padding: 10,
    marginBottom: 0
  },
  label: {
    textAlign: 'center'
  },
  buttonGroup: {
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  buttonContainer: {
    width: '100%',
    padding: 0
  },
  iconContainer: {
    marginLeft: 8
  },
  icon: {
    color: '#fff'
  }
});

export default buildRolePillField;