import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';

import { logout } from '../../actions/me';
import { hideOverlayMenu, showSnackbar } from '../../actions/ui';

class OverlayMenu extends Component {
  constructor(props) {
    super(props);
  }

  menus = [
    {
      title: 'Logout',
      callback: () => {
        this.props.logout();
        this.props.showSnackbar({ textMessage: 'You have been logged out', autoHidingTime: 5000 });
      },
    },
    {
      title: 'Close',
      callback: () => {},
    }
  ];

  _performAction = (action) => () => {
    action();
    this.props.hideOverlayMenu();
  };

  render() {
    return (
      <Overlay
        isVisible
        onBackdropPress={this.props.hideOverlayMenu}
        height='auto'
      >
        <View>
          {
            this.menus.map((menu, index) => (
              <ListItem
                key={index}
                title={menu.title}
                onPress={this._performAction(menu.callback)}
              />
            ))
          }
        </View>
      </Overlay>
    );
  }
}

export default connect(
  null,
  { hideOverlayMenu, logout, showSnackbar }
)(OverlayMenu);
