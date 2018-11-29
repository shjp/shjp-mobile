import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export const ResourceFormField = ({
  label,
  onChangeText,
  validationError,
  numberOfLines
}) =>
  <SHJPBaseFormField
    label={label}
    labelStyle={style.resourceFormFieldLabel}
    inputStyle={style.ResourceFormFieldInput}
    onChangeText={onChangeText}
    validationError={validationError}
    numberOfLines={numberOfLines} />;

const SHJPBaseFormField = ({
  label,
  labelStyle,
  inputStyle,
  onChangeText,
  validationError,
  numberOfLines
}) =>
  <View>
    <FormLabel labelStyle={labelStyle}>{label}</FormLabel>
    <FormInput
      inputStyle={inputStyle}
      onChangeText={onChangeText}
      numberOfLines={numberOfLines} />
    {
      validationError ?
        <FormValidationMessage>{validationError}</FormValidationMessage> : null
    }
  </View>;

const style = StyleSheet.create({
  resourceFormFieldLabel: {
    fontSize: 12
  },
  ResourceFormFieldInput: {
    color: '#000'
  }
});