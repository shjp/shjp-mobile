import React from 'react';
import { connect } from 'react-redux';

import { showOverlayMenu } from '../../actions/ui';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import NavigateBackButton from '../../components/common/NavigateBackButton';
import ResourceControlButton from '../../components/common/ResourceControlButton';
import { FORM_VIEW } from '../modes';
import BaseResourceForm from './BaseResourceForm';

const buildViewForm = model => {
  return connect(
    model.mapStateToProps,
    {
      get: model.actions.get,
      showOverlayMenu,
    }
  )(
    class ResourceViewForm extends BaseResourceForm {

      static navigationOptions = ({ navigation }) => ({
        headerTitle: `${model.label}`,
        //headerRight: <ResourceControlButton navigation={navigation} link={`${model.label}Edit`} icon='pencil' />,
        //headerRight: <NavigateBackButton navigation={navigation} />,
        ...baseNavigationOptions(navigation)
      });

      constructor(props) {
        super(props);

        this.model = model;
        this.mode = FORM_VIEW;
        this.state = {
          data: {},
        };
      }

      componentDidMount() {
        this.props.navigation.setParams({
          showOverlayMenu: this.props.showOverlayMenu
        });

        if (this.props.current) {
          this.setState({ data: this.props.current });
          return;
        }
        const id = this.props.navigation.getParam('id', null);
        if (!id) {
          return;
        }
        this.props.get(id)
          .then(() => {
            this.setState({ data: this.props.current });
          });
      }

      componentWillReceiveProps(newProps) {
        this.setState({ data: newProps.current || {} });
      } 

      getSubmitComponent() {
        return null;
      }
    }
  );
};

export default buildViewForm;