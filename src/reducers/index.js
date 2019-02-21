import { combineReducers } from 'redux';

import announcement from './announcement';
import event from './event';
import group from './group';
import user from './user';
import signup from './signup';
import ui from './ui';

const rootReducer = combineReducers({
  announcement,
  event,
  group,
  user,
  signup,
  ui,
});

export default rootReducer;