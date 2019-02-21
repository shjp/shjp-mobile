import React, { Component } from 'react';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component'

import { showSnackbar, hideSnackbar } from '../../actions/ui';

class GlobalUIWatchdog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SnackBar
          {...this.props.snackbarOptions}
          actionText="OK"
          accentColor="green"
          actionHandler={() => this.props.hideSnackbar()}/>
      </>
    )
  }
}

export default connect(
  state => ({ snackbarOptions: state.ui.snackbar }),
  { showSnackbar, hideSnackbar }
)(GlobalUIWatchdog);