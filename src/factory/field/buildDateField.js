import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import moment from 'moment';

import * as Mode from '../modes';

const formatDate = date => {
  return moment(date).format('ddd, MMM Do YYYY, hh:mm a');
}

const buildDateField = (mode, field, state, update) => {
  if (!state[field.key]) {
    return null;
  }
  return (
    <View key={field.key} style={styles.container}>
      {
        (() => {
          switch (mode) {
            case Mode.FORM_CREATE:
            case Mode.FORM_EDIT:
              return null;
            case Mode.FORM_VIEW:
              return (
                <View>
                  <Text style={styles.text}>
                    When: {formatDate(state[field.key])}
                  </Text>
                </View>
              );
          }
        })()
      }
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginLeft: 10
  }
});

export default buildDateField;