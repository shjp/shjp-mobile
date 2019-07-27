import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import SnackBar from 'react-native-snackbar-component'

import { loadAccessToken, getMe } from '../../actions/me';
import { showOverlayMenu, showSnackbar, hideSnackbar } from '../../actions/ui';
import OverlayMenu from '../../containers/common/OverlayMenu';

class GlobalListener extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._loadMe();
  }

  _loadMe() {
    return this.props.loadAccessToken().then(() => {
      if (this.props.accessToken) {
        this.props.getMe();
      }
    });
  }

  render() {
    return (
      <>
        <SnackBar
          {...this.props.snackbarOptions}
          actionText="OK"
          accentColor="green"
          actionHandler={() => this.props.hideSnackbar()}/>
        {
          this.props.overlayMenu && (
            <OverlayMenu/>
          )
        }
        {
          this.props.splashOptions && (
            <View style={this.props.splashOptions.transparent ?
              [styles.splashContainer, styles.splashContainerTransparent] :
              styles.splashContainer}>
              <Image
                style={styles.splash}
                source={require('../../../res/splash.gif')}
                resizeMode='stretch'/>
            </View>
          )
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  splashContainerTransparent: {
    opacity: 0.9
  },
  splash: {
    position: 'absolute',
    top: -150,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }
});

export default connect(
  state => ({
    accessToken: state.user.accessToken,
    overlayMenu: state.ui.overlayMenu,
    snackbarOptions: state.ui.snackbar,
    splashOptions: state.ui.splash,
  }), {
    loadAccessToken,
    getMe,
    showSnackbar,
    hideSnackbar,
    showOverlayMenu,
  }
)(GlobalListener);