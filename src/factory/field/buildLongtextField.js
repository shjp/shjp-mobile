import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as Mode from '../modes';

const buildLongtextField = (mode, field, state, update) => {
  return (
    <View key={field.key} style={styles.container}>
      {
        (() => {
          switch (mode) {
            case Mode.FORM_CREATE:
            case Mode.FORM_EDIT:
              return (
                <View>
                  <FormLabel labelStyle={styles.label}>{field.label}</FormLabel>
                  <FormInput
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={text => update({ [field.key]: text })}
                    value={state[field.key]} />
                  {
                    state[field.errorKey] ?
                      <FormValidationMessage>{state[field.errorKey]}</FormValidationMessage> : null
                  }
                </View>
              );
            case Mode.FORM_VIEW:
              return (
                <View>
                  <Text style={styles.textView}>
                    {state[field.key]}
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
  container: {
    marginVertical: 6,
    marginHorizontal: 2
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  input: {

  },
  textView: {
    fontSize: 16,
    color: '#000'
  },
  inputContainer: {
    marginVertical: 10,
    marginLeft: 20,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 0.5,
    height: 60
  }
});

export default buildLongtextField;