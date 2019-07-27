import {
  HIDE_OVERLAY_MENU,
  HIDE_SNACKBAR,
  HIDE_SPLASH,
  SHOW_OVERLAY_MENU,
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

export const showOverlayMenu = () => {
  return dispatch => {
    dispatch({
      type: SHOW_OVERLAY_MENU,
    });
  }
};

export const hideOverlayMenu = () => {
  return dispatch => {
    dispatch({
      type: HIDE_OVERLAY_MENU,
    });
  };
};
