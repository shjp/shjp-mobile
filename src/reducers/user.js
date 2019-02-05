import { concat } from 'lodash';
import {
  GET_ME,
  LOGIN
} from '../actions/me';
import {
  GET_USER,
  GET_USERS
} from '../actions/user';

const getDefaultState = () => ({
  accessToken: null,
  me: null,
  current: null,
  users: []
});

const userReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, current: action.user };
    case GET_USERS:
      return { ...state, users: action.users };
    case LOGIN:
      return { ...state, accessToken: action.accessToken };
    case GET_ME:
      return { ...state, me: action.me };
    default:
      return state;
  }
};

export default userReducer;