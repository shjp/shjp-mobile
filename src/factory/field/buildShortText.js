import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as Mode from '../modes';

const buildShortTextField = (mode, field, state, update) => {
  if (mode !== Mode.FORM_VIEW) {
    return null;
  }
  return (
    <Text key={field.key} style={styles.label}>
      {state[field.key]}
    </Text>
  );
};

const styles = StyleSheet.create({
});

export default buildShortTextField;