import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, Button, Icon } from 'react-native-elements'

import { changeGroupMembership, getGroupDetails } from '../../actions/group';
import { showSnackbar } from '../../actions/ui';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import { SHJPBaseCard } from '../../components/custom/cards';

class GroupDetailView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('name') || 'Group Details',
    ...baseNavigationOptions(navigation)
  });

  _requestJoinGroup = () => {
    const groupJoinPayload = {
      groupId: this.props.group.id,
      userId: this.props.me.id,
      roleId: '00000000-0000-0000-0000-000000000000',
      status: 'pending',
    };

    this.props.changeGroupMembership(groupJoinPayload)
      .then(() => {
        this.props.showSnackbar({ textMessage: 'Request to join the group has been sent.', autoHidingTime: 5000 });
      });
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', null);
    if (id) {
      this.props.getGroupDetails(id);
    }
  }

  render() {
    if (!this.props.group) {
      return null;
    }

    const { name, description, image_url, members } = this.props.group;
    const membership = this.props.me && members.find(member => member.id === this.props.me.id);
    const isMemberOfGroup = membership && membership !== 'pending';

    return (
      <SHJPBaseCard style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>
            {name}
          </Text>
          {
            isMemberOfGroup && (
              <View style={styles.membershipContainer}>
                <Badge
                  status="success"
                  value="You are a member of this group"
                  badgeStyle={styles.badge}
                  containerStyle={styles.badgeContainer}/>
              </View>
            )
          }
          <Text style={styles.text}>
            {description}
          </Text>
          <Image
            style={styles.imageView}
            resizeMode='contain'
            source={{uri: image_url}}
          />
          {
            this.props.me && (
              <View>
                <Text style={styles.label}>
                  Members
                </Text>
                {
                  members
                    .filter(member => member.status !== 'pending')
                    .map((member, index) => (
                      <View
                        key={index}
                        style={styles.memberEntryContainer}
                      >
                        <Text>
                          {member.name}
                        </Text>
                        {
                          GRUOP_MEMBERSHIP_PILL_STYLE[member.role_name] && (
                            <Badge
                              status={GRUOP_MEMBERSHIP_PILL_STYLE[member.role_name]}
                              value={member.role_name}
                              containerStyle={styles.pillContainer}
                            />
                          )
                        }
                      </View>
                    ))
                }
                {
                  !membership && (
                    <Button
                      title="Join this group"
                      containerStyle={styles.joinButtonContainer}
                      onPress={this._requestJoinGroup}
                    />
                  )
                }
                {
                  membership === 'pending' && (
                    <Button
                      title="Join request sent"
                      type="outline"
                      iconRight
                      icon={
                        <Icon
                          name="check"
                          size={15}
                          iconStyle={styles.joinButtonIcon}
                          containerStyle={styles.joinButtonIconContainer}
                        />
                      }
                      containerStyle={styles.joinButtonContainer}
                    />
                  )
                }
              </View>
            )
          }
        </ScrollView>
      </SHJPBaseCard>
    );
  }
}

const GRUOP_MEMBERSHIP_PILL_STYLE = Object.freeze({
  'Leader': 'success',
  'Vice Leader': 'primary',
});

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 0,
    top: 0,
    bottom: 0
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  membershipContainer: {
    alignItems: 'flex-start'
  },
  badgeContainer: {
    marginVertical: 4
  },
  badge: {
    paddingVertical: 12,
    paddingHorizontal: 4
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  imageView: {
    width: 300,
    height: 240,
    marginHorizontal: 'auto'
  },
  memberEntryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  pillContainer: {
    marginHorizontal: 6
  },
  joinButtonContainer: {
    marginVertical: 20
  },
  joinButtonIconContainer: {
    marginLeft: 8,
  },
  joinButtonIcon: {
    color: '#2196f3'
  }
});

export default connect(
  state => ({ group: state.group.current, me: state.user.me }),
  { changeGroupMembership, getGroupDetails, showSnackbar }
)(GroupDetailView);
