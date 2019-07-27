import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import { getGroups } from '../../actions/group';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import GroupCard from '../../components/group/GroupCard';
import ResourceControlButton from '../../components/common/ResourceControlButton';

class GroupsView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Groups',
    //headerRight: <ResourceControlButton navigation={navigation} link='GroupCreate' icon='plus' />,
    ...baseNavigationOptions(navigation)
  });

  componentDidMount() {
    this.props.getGroups();
  }

  componentWillReceiveProps(props) {
    console.log('groups: ', JSON.stringify(props.groups));
  }

  navigateToGroup(id, name) {
    this.props.navigation.navigate('GroupDetailView', {
      id,
      name,
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
          <TouchableOpacity onPress={() => this.navigateToGroup(group.id, group.name)} key={i} activeOpacity={0.6}>
            <GroupCard
              name={group.name}
              description={group.description}
              imageUrl={group.image_url || ''} />
          </TouchableOpacity>)
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