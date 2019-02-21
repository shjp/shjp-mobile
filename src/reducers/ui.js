import { concat } from 'lodash';
import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../actions/ui';

const getDefaultState = () => ({
  snackbar: null
});

const uiReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, snackbar: action.snackbarOptions };
    case HIDE_SNACKBAR:
      return { ...state, snackbar: null };
    default:
      return state;
  }
};

export default uiReducer;