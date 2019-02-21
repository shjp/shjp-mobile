import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Badge } from 'react-native-elements'
import moment from 'moment';

import * as Mode from '../modes';

const getPillStyle = roleName => {
  switch(roleName) {
    case 'Leader':      return 'success';
    case 'Vice Leader': return 'primary';
    default:            return null;
  }
};

const buildRolePillField = (mode, field, state, update) => {
  if (!state[field.key]) {
    return null;
  }
  if (mode !== Mode.FORM_VIEW){
    return null;
  }
  const pillStyle = getPillStyle(state[field.key]);
  return !pillStyle ? null : (
    <Badge
      key={field.key}
      status={pillStyle}
      value={state[field.key]}
      containerStyle={styles.pillContainer}/>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    marginHorizontal: 6
  }
});

export default buildRolePillField;