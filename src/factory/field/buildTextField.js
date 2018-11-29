import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as Mode from '../modes';

const buildTextField = (mode, field, state, update) => {
  console.log(`building text field | mode: ${mode} | key: ${field.key} | state: ${JSON.stringify(state)} | state[field.key]: ${state[field.key]}`);
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
                  <Text style={styles.label}>
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
    color: '#333',
    lineHeight: 20,
    fontSize: 20,
    paddingBottom: 12,
    paddingLeft: 6
  },
  inputContainer: {
    marginVertical: 10,
    marginLeft: 20,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 0.5,
    height: 36,
    paddingTop: 2,
    top: 0
  }
});

export default buildTextField;