import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import {
  ImagePrimaryCard
} from '../custom/cards';

const GroupCard = ({ name, description, imageUrl }) => (
  <ImagePrimaryCard
    title={name}
    content={description}
    imageUri={imageUrl} />
);

const styles = StyleSheet.create({
});

export default GroupCard;