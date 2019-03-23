import { concat } from 'lodash';
import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_SPLASH,
  HIDE_SPLASH,
} from '../actions/types';

const getDefaultState = () => ({
  snackbar: null,
  splash: null,
});

const uiReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, snackbar: action.snackbarOptions };
    case HIDE_SNACKBAR:
      return { ...state, snackbar: null };
    case SHOW_SPLASH:
      return { ...state, splash: action.splashOptions };
    case HIDE_SPLASH:
      return { ...state, splash: null };
    default:
      return state;
  }
};

export default uiReducer;