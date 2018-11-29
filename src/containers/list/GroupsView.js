import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import { getGroups } from '../../actions/group';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import GroupCard from '../../components/group/GroupCard';
import ResourceControlButton from '../../components/common/ResourceControlButton';

class GroupsView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Groups',
    headerRight: <ResourceControlButton navigation={navigation} link='GroupCreate' icon='plus' />,
    ...baseNavigationOptions
  });

  componentDidMount() {
    this.props.getGroups();
  }

  componentWillReceiveProps(props) {
    console.log('groups: ', JSON.stringify(props.groups));
  }

  navigateToGroup(id) {
    this.props.navigation.navigate('GroupView', {
      id
    });
  }

  render() {
    if (!this.props.groups) {
      return null;
    }

    return (
      <ScrollView>
      {
        this.props.groups.map((group, i) =>
          <TouchableHighlight onPress={() => this.navigateToGroup(group.id)} key={i}>
            <GroupCard
              name={group.name}
              description={group.description}
              imageUrl={group.image_url || ''} />
          </TouchableHighlight>)
      }
      </ScrollView>
    )
  }
}

const style = {
  header: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default connect(
  state => ({ groups: state.group.groups }),
  { getGroups },
)(GroupsView);