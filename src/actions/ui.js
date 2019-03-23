import {
  HIDE_SNACKBAR,
  HIDE_SPLASH,
  SHOW_SNACKBAR,
  SHOW_SPLASH,
} from './types';

export const showSnackbar = (options) => (
  dispatch => {
    if (isFinite(options.autoHidingTime)) {
      setTimeout(() => dispatch({
        type: HIDE_SNACKBAR
      }), options.autoHidingTime);
    }
    dispatch({
      type: SHOW_SNACKBAR,
      snackbarOptions: { ...options, visible: true }
    })
  }
);

export const hideSnackbar = () => (
  dispatch => (
    dispatch({
      type: HIDE_SNACKBAR
    })
  )
);

export const showSplash = ({ transparent = true }) => {
  return dispatch => {
    dispatch({
      type: SHOW_SPLASH,
      splashOptions: { transparent },
    });
  };
};

export const hideSplash = () => {
  return dispatch => {
    dispatch({
      type: HIDE_SPLASH
    });
  }
};