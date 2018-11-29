import React from 'react';
import { connect } from 'react-redux';

import { baseNavigationOptions } from '../../configs/navigationOptions';
import ResourceControlButton from '../../components/common/ResourceControlButton';
import { FORM_VIEW } from '../modes';
import BaseResourceForm from './BaseResourceForm';

const buildViewForm = model => {
  return connect(
    model.mapStateToProps,
    {
      get: model.actions.get
    }
  )(
    class ResourceViewForm extends BaseResourceForm {

      static navigationOptions = ({ navigation }) => ({
        headerTitle: `${model.label}`,
        headerRight: <ResourceControlButton navigation={navigation} link={`${model.label}Edit`} icon='pencil' />,
        ...baseNavigationOptions
      });

      constructor(props) {
        super(props);

        this.model = model;
        this.mode = FORM_VIEW;
        this.state = {};
      }

      componentDidMount() {
        const id = this.props.navigation.getParam('id', null);
        if (!id) {
          console.error('id is null in view form!');
          return;
        }
        this.props.get(id)
          .then(() => {
            console.log(`buildViewForm | props.group: ${JSON.stringify(this.props.current)}`);
            this.setState(this.props.current);
          });
      }

      getSubmitComponent() {
        return null;
      }
    }
  );
};

export default buildViewForm;