// Action Types
export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";

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