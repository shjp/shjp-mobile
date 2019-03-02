import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import moment from 'moment';

import * as Mode from '../modes';

const buildAuthorField = (mode, field, state, update) => {
  const author = state[field.key];
  if (!author) {
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
                    Posted by: {author.name}
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

export default buildAuthorField;