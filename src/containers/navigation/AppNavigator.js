import React from 'react';
import {
  Text
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import GroupDetailView from '../group/GroupDetailView';
import GroupsView from '../group/GroupsView';
import NewsView from '../news/NewsView';
import LoginView from '../user/LoginView';
import ProfileView from '../user/ProfileView';
import EmailLoginView from '../user/EmailLoginView';
import EmailRegisterView from '../user/EmailRegisterView';
import RegisterHelperView from '../user/RegisterHelperView';

import * as FormFactory from '../../factory/form';
import {
  Announcement,
  Event,
  Group,
  User,
  Me
} from '../../factory/models';

const AppNavigator = createMaterialBottomTabNavigator({
  Groups: {
    screen: createStackNavigator({
      GroupsView,
      GroupDetailView,
      GroupCreate: FormFactory.createForm(Group),
      GroupEdit: FormFactory.editForm(Group)
    }, {
      initialRouteName: 'GroupsView'
    }),
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => <Icon name='users' type='font-awesome' color={tintColor}/>
    })
  },
  News: {
    screen: createStackNavigator({
      NewsView,
      AnnouncementView: FormFactory.viewForm(Announcement),
      AnnouncementCreate: FormFactory.createForm(Announcement),
      AnnouncementEdit: FormFactory.editForm(Announcement),
      EventView: FormFactory.viewForm(Event),
      EventCreate: FormFactory.createForm(Event),
      EventEdit: FormFactory.editForm(Event)
    }, {
      initialRouteName: 'NewsView'
    }),
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => <Icon name='md-calendar' type='ionicon' color={tintColor}/>
    })
  },
  User: {
    screen: createStackNavigator({
      LoginView,
      EmailLoginView,
      EmailRegisterView,
      RegisterHelperView,
      ProfileView,
    }, {
      initialRouteName: 'LoginView'
    }),
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => <Icon name='user' type='font-awesome' color={tintColor}/>
    })
  }
}, {
  shifting: true,
  initialRouteName: 'Groups',
  activeColor: '#f0edf6',
  inactiveColor: '#454545',
  barStyle: { backgroundColor: '#111211' },
  tabBarOptions: {
    showLabel: true,
    showIcon: true,
    iconStyle: { color: '#ffffff' }
  }
});

export default createAppContainer(AppNavigator);