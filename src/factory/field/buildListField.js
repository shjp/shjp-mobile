import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import moment from 'moment';

import buildEntryField from './buildEntryField';
import * as Mode from '../modes';

const buildListField = (mode, field, state, update) => {
  if (!state[field.key]) {
    return null;
  }
  const data = state[field.key];
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
                  <Text style={styles.label}>
                    { field.label }
                  </Text>
                  {
                    data
                      .filter(field.filter)
                      .map((dataEntry, index) => buildEntryField(field.model, dataEntry, index))
                  }
                </View>
              );
          }
        })()
      }
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  }
});

export default buildListField;