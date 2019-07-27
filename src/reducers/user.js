import {
  LOAD_ACCESS_TOKEN,
  LOGIN,
  LOGOUT,
  GET_ME,
  GET_USER,
  GET_USERS
} from '../actions/types';

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
    case LOAD_ACCESS_TOKEN:
    case LOGIN:
      return { ...state, accessToken: action.accessToken };
    case LOGOUT:
      return { ...state, accessToken: null, me: null, current: null };
    case GET_ME:
      return { ...state, me: action.me, current: action.me };
    default:
      return state;
  }
};

export default userReducer;