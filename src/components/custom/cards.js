import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const defaultImage = require('../../../res/logo.png');

export const TextCard = ({ title, content, children }) =>
  <SHJPBaseCard>
    <View style={textCardStyle.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {children}
    </View>
  </SHJPBaseCard>;

export const ImagePrimaryCard = ({ title, content, imageUri, children }) =>
  <SHJPBaseCard>
    <View style={imagePrimaryStyle.container}>
      <Image style={imagePrimaryStyle.image} source={imageUri ? {uri: imageUri} : defaultImage} />
      <View style={imagePrimaryStyle.titleContainer}>
        <Text style={imagePrimaryStyle.title}>{title}</Text>
      </View>
    </View>
    <Text style={imagePrimaryStyle.content}>{content}</Text>
    {children}
  </SHJPBaseCard>

export const SHJPBaseCard = ({ children, style }) =>
  <View style={[styles.card, style]}>
    {children}
  </View>;

const BORDER_RADIUS = 3;

const textCardStyle = StyleSheet.create({
  container: {
    padding: 12
  }
});

const imagePrimaryStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 240
  },
  image: {
    width: '100%',
    height: 240,
    //borderTopLeftRadius: BORDER_RADIUS,
    //borderTopRightRadius: BORDER_RADIUS
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1.5,
      height: 1.5
    }
  },
  content: {
    color: '#000',
    padding: 6,
    fontSize: 16
  }
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginVertical: 4,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',

    // for Android
    elevation: 3,
    
    // for iOS?
    shadowColor: '#000',
    shadowOffset: {
      height: 3,
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  }
})