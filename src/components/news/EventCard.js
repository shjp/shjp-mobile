import React from 'react';
import {
  TextCard
} from '../custom/cards';

const EventCard = ({ name, description }) => (
  <TextCard
    title={name}
    content={description}/>
);

export default EventCard;