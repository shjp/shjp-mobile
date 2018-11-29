import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';

import { SHJPBaseCard } from '../../components/custom/cards';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import NavigateBackButton from '../../components/common/NavigateBackButton';
import { buildField } from '../field';

export default class BaseResourceForm extends Component {

  constructor(props) {
    super(props);

    this.mode = 'BASE';
    this.state = {};
  }

  render() {
    console.log(`BaseResourceForm.render | state: ${JSON.stringify(this.state)}`);
    return (
      <SHJPBaseCard style={styles.container}>
        <ScrollView>
          {
            this.model.fields
              .filter(field => !field.exclude || !field.exclude.includes(this.mode))
              .map(field => buildField(this.mode, field, Object.assign({}, this.state), (val) => this.setState(val)))
          }
          {
            this.getSubmitComponent()
          }
        </ScrollView>
      </SHJPBaseCard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
});