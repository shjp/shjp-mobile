import {
  HIDE_SPLASH,
  SHOW_SPLASH,
} from './types';

/**
 * Higher order function that dispatches the action to show splash
 * and then hides the splash when the createAction resolves.
 *
 * @param {Function} createAction - The thunk function that takes dispatch and getState functions as arguments.
 */
export const withSplash = createAction => (dispatch, getState) => {
  dispatch({
    type: SHOW_SPLASH,
    splashOptions: { transparent: true },
  });
  return createAction(dispatch, getState).then(() => {
    dispatch({
      type: HIDE_SPLASH
    });
  });
}