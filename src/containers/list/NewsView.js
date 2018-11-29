import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import { getAnnouncements } from '../../actions/announcement';
import { getEvents } from '../../actions/event';
import { baseNavigationOptions } from '../../configs/navigationOptions';
import ResourceControlButton from '../../components/common/ResourceControlButton';
import NewsCard from '../../components/news/NewsCard';

// TODO: take sort criteria
const mergeNewsEntities = (announcements, events) => [].concat(
  (announcements || []).map(a => Object.assign({}, a, { newsType: 'announcement' })),
  (events || []).map(e => Object.assign({}, e, { newsType: 'event' }))
);

class NewsView extends Component {

  constructor(props) {
    super(props);

    this.news = [];
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'News',
    headerRight: <ResourceControlButton navigation={navigation} link='EventCreate' icon='plus' />,
    ...baseNavigationOptions
  });

  componentDidMount() {
    this.props.getAnnouncements();
    this.props.getEvents();
  }

  componentWillReceiveProps(props) {
    this.news = mergeNewsEntities(props.announcements, props.events);
  }

  navigateToNews(news) {
    const { newsType, id } = news;
    const viewName = newsType === 'event' ? 'EventView' : 'AnnouncementView';
    this.props.navigation.navigate(viewName, {
      id
    });
  }

  render() {
    if (!this.news.length) {
      return null;
    }

    return (
      <ScrollView>
      {
        this.news.map((n, i) =>
          <TouchableHighlight onPress={() => this.navigateToNews(n)} key={i}>
            <NewsCard {...n}/>
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
  state => ({
    announcements: state.announcement.announcements,
    events: state.event.events
  }), { 
    getAnnouncements,
    getEvents
  },
)(NewsView);