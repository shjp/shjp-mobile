import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Badge } from 'react-native-elements'
import moment from 'moment';

import * as Mode from '../modes';

const buildMembershipField = (mode, field, state, update) => {
  const membership = state[field.key];
  if (!membership || membership.status === 'pending') {
    return null;
  }
  console.log('[buildMembershipField] val =', state[field.key]);
  return (
    <View key={field.key} style={styles.container}>
      <Badge
        status="success"
        value="You are a member of this group"
        badgeStyle={styles.badge}
        containerStyle={styles.badgeContainer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start'
  },
  badgeContainer: {
    marginVertical: 4
  },
  badge: {
    paddingVertical: 12,
    paddingHorizontal: 4
  }
});

export default buildMembershipField;