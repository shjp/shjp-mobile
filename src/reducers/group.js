import { concat } from 'lodash';
//import Snackbar from 'react-native-snackbar';
import {
  CREATE_GROUP,
  GET_GROUP,
  GET_GROUPS
} from '../actions/types';

const getDefaultState = () => ({
  groups: [],
  current: null
});

const groupReducer = (state = getDefaultState(), action) => {
  /*if (action.error) {
    Snackbar.show({
      title: action.error,
      duration: Snackbar.LENGTH_LONG
    });
    return state;
  }*/
  switch (action.type) {
    case CREATE_GROUP:
      console.log('create_group err: ' + action.error);
      console.log('create_group result: ' + action.result);
      //return { ...state, groups: concat(state.groups, action.result) };
      return state;
    case GET_GROUP:
      console.log('get_group: ', JSON.stringify(action, null, 2));
      return { ...state, current: action.group };
    case GET_GROUPS:
      console.log('get_groups', JSON.stringify(action, null, 2));
      return { ...state, groups: action.groups };
    default:
      return state;
  }
};

export default groupReducer;