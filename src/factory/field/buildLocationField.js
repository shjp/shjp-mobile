import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps';

import * as Mode from '../modes';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const buildLocationField = (mode, field, state, update) => {
  console.log(`building location field | mode: ${mode} | key: ${field.key} | state: ${JSON.stringify(state)} | state[field.key]: ${state[field.key]}`);
  return (
    <View key={field.key} style={styles.container}>
      {
        (() => {
          switch (mode) {
            case Mode.FORM_CREATE:
            case Mode.FORM_EDIT:
              return null;
            case Mode.FORM_VIEW:
              if (!state[field.key]) {
                return null;
              }
              let [lat, lon] = state[field.key].replace(/[\(\)]/g, '').split(',');
              try {
                lat = parseFloat(lat);
                lon = parseFloat(lon);
              } catch (e) {
                console.error('Cannot parse lat or lon:', e);
                return null;
              }
              return (
                <View>
                  <MapView
                    initialRegion={{
                      latitude: lat,
                      longitude: lon,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }}
                    style={styles.map}>
                    <Marker
                      coordinate={{
                        latitude: lat,
                        longitude: lon
                      }}/>
                  </MapView>
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
  map: {
    width: '100%',
    height: 300
  }
});

export default buildLocationField;