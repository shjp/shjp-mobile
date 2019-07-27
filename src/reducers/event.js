import {
  CREATE_EVENT,
  GET_EVENT,
  GET_EVENTS
} from '../actions/types';

const getDefaultState = () => ({
  events: [],
  current: null
});

const eventReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return state;
    case GET_EVENT:
      return { ...state, current: action.event };
    case GET_EVENTS:
      return { ...state, events: action.events };
    default:
      return state;
  }
};

export default eventReducer;