import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
//import ImagePicker from 'react-native-image-crop-picker';

//import { ImagePickerButton } from '../../components/custom/buttons';
import * as Mode from '../modes';

const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 200;

/*const pickImage = callback => {
  ImagePicker.openPicker({
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    cropping: true,
    includeBase64: true
  }).then(image => {
    console.log('image: ', image);
    callback(image.data);
  }).catch(() => {}); // ignore
};*/
const pickImage = () => {};

const buildImageField = (mode, field, state, update) => {
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
                  {
                    !state[field.key] ? null :
                    <View style={styles.imagePreviewContainer}>
                      <Image style={styles.imagePreview} resizeMode='contain' source={{uri: `data:image/png;base64,${state[field.key]}`}} />
                    </View>
                  }
                  <View style={styles.imagePickerButtonContainer}>
                    {
                      true ? null :
                      <ImagePickerButton onPress={() => pickImage(data => update({[field.key]: data}))} />
                    }
                  </View>
                </View>
              );
            case Mode.FORM_VIEW:
              if (!state[field.key]) {
                return null;
              }
              return (
                <View>
                  <Image style={styles.imageView} resizeMode='contain' source={{uri: state[field.key]}} />
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
  imagePickerButtonContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  submitButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 16
  },
  imagePreview: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginHorizontal: 'auto'
  },
  imagePreviewContainer: {
    marginHorizontal: 20,
    marginVertical: 16
  },
  imageView: {
    width: 300,
    height: 240,
    marginHorizontal: 'auto'
  },
});

export default buildImageField;