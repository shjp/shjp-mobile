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
import { FORM_EDIT } from '../modes';
import BaseResourceForm from './BaseResourceForm';

const buildEditForm = model => {
  console.log('[buildEditForm] model = ', JSON.stringify(model));
  return connect(
    model.mapStateToProps,
    {
      edit: model.actions.edit,
      getAll: model.actions.getAll
    }
  )(
    class ResourceEditForm extends BaseResourceForm {

      static navigationOptions = ({ navigation }) => ({
        headerTitle: `Edit ${model.label}`,
        headerRight: <NavigateBackButton navigation={navigation} />,
        ...baseNavigationOptions
      });

      constructor(props) {
        super(props);

        this.model = model;
        this.mode = FORM_EDIT;
      }

      componentDidMount() {
        console.log('current = ', JSON.stringify(this.props.current));
        this.setState(this.props.current);
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
        console.log('SUBMIT, ', JSON.stringify(this.props));
        this.props.edit(this.state).then(() => {
          /*Snackbar.show({
            title: `Successfully edited ${this.model.label} "${this.state.name}"!`,
            duration: Snackbar.LENGTH_LONG
          });*/
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

export default buildEditForm;