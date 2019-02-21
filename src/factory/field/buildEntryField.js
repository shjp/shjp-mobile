import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { buildField } from './index';
import { FORM_VIEW } from '../modes';

const buildEntryField = (model, data, index) => {
  return (
    <View style={styles.container} key={index}>
      {
        model.fields.map((field, index) =>
          buildField(FORM_VIEW, field, data, null))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 0
  }
});

export default buildEntryField;