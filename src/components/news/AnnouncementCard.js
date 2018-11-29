import React from 'react';
import {
  TextCard
} from '../custom/cards';

const AnnouncementCard = ({ name, content }) => (
  <TextCard
    title={name}
    content={content}/>
);

export default AnnouncementCard;