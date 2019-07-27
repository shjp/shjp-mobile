import {
  SHOW_OVERLAY_MENU,
  HIDE_OVERLAY_MENU,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_SPLASH,
  HIDE_SPLASH,
} from '../actions/types';

const getDefaultState = () => ({
  overlayMenu: null,
  snackbar: null,
  splash: null,
});

const uiReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case SHOW_OVERLAY_MENU:
      return { ...state, overlayMenu: {} };
    case HIDE_OVERLAY_MENU:
      return { ...state, overlayMenu: null };
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