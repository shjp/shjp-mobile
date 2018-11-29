import { concat } from 'lodash';
import {
  CREATE_ANNOUNCEMENT,
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS
} from '../actions/announcement';

const getDefaultState = () => ({
  announcements: [],
  current: null
});

const announcementReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT:
      return state;
    case GET_ANNOUNCEMENTS:
      return { ...state, announcements: action.announcements };
    case GET_ANNOUNCEMENT:
      return { ...state, current: action.announcement };
    default:
      return state;
  }
};

export default announcementReducer;