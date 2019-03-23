import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
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
        {
          this.props.splashOptions ?
            <View style={this.props.splashOptions.transparent ?
              [styles.splashContainer, styles.splashContainerTransparent] :
              styles.splashContainer}>
              <Image
                style={styles.splash}
                source={require('../../../res/animation.gif')}
                resizeMode='stretch'/>
            </View>
          :
            null
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
    snackbarOptions: state.ui.snackbar,
    splashOptions: state.ui.splash
  }), {
    showSnackbar,
    hideSnackbar
  }
)(GlobalUIWatchdog);