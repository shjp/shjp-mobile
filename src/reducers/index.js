import { combineReducers } from 'redux';

import announcement from './announcement';
import event from './event';
import group from './group';
import user from './user';
import signup from './signup';

const rootReducer = combineReducers({
  announcement,
  event,
  group,
  user,
  signup,
});

export default rootReducer;