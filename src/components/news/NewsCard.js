import React from 'react';
import AnnouncementCard from './AnnouncementCard';
import EventCard from './EventCard';

const NewsCard = props => {
  switch (props.newsType) {
    case 'announcement': return <AnnouncementCard {...props}/>;
    case 'event': return <EventCard {...props}/>;
    default:
      console.error('NewsCard received unexpected type:', props.newsType);
      return null;
  }
}

export default NewsCard;