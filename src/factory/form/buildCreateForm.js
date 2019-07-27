import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
//import Snackbar from 'react-native-snackbar';

import { baseNavigationOptions } from '../../configs/navigationOptions';
import NavigateBackButton from '../../components/common/NavigateBackButton';
//import { PrimaryFullButton } from '../../components/custom/buttons';
import { FORM_CREATE } from '../modes';
import BaseResourceForm from './BaseResourceForm';

const buildCreateForm = model => {
  return connect(
    model.mapStateToProps,
    {
      create: model.actions.create,
      getAll: model.actions.getAll
    }
  )(
    class ResourceCreateForm extends BaseResourceForm {

      static navigationOptions = ({ navigation }) => ({
        headerTitle: `Create ${model.label}`,
        headerRight: <NavigateBackButton navigation={navigation} />,
        ...baseNavigationOptions(navigation)
      });
    
      constructor(props) {
        super(props);

        this.model = model;
        this.mode = FORM_CREATE;
      }

      getSubmitComponent() {
        return (
          <View style={styles.submitButtonContainer}>
            { true ? null :
              <PrimaryFullButton text='Submit' onPress={() => this.submit()} />
            }
          </View>
        )
      }

      submit() {
        console.log('submit, ', JSON.stringify(this.props, null, 2));
        this.props.create(this.state.data).then(() => {
          /*Snackbar.show({
            title: `Successfully created ${this.model.label} "${this.state.name}"!`,
            duration: Snackbar.LENGTH_LONG
          });*/
          this.props.navigation.goBack();
        }).then(() => this.props.getAll());
      }
    }
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 16
  },
});

export default buildCreateForm;