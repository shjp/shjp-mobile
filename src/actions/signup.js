import { mutate } from '../api/graphql';

// Action Types
export const CLEAR_REGISTER_FORM = "CLEAR_REGISTER_FORM";
export const CREATE_EMAIL_USER = "CREATE_EMAIL_USER";
export const UPDATE_REGISTER_FORM = "UPDATE_REGISTER_FORM";

// Actions
export const clearRegisterForm = () => (
  dispatch => dispatch({
    type: CLEAR_REGISTER_FORM
  })
);

export const emailRegister = () => (
  (dispatch, getState) => {
    const { email, password, baptismalName, birthday, feastday } = getState().signup;
    return mutate(`
      createUser(
        email: "${email}",
        password: "${password}",
        baptismalName: "${baptismalName}",
        birthday: ${birthday ? '"'+birthday.getUTCMilliseconds()+'"' : "null"},
        feastday: ${feastday ? '"'+feastday.getUTCMilliseconds()+'"' : "null"}
      )
    `).then(res => {
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      return dispatch({
        type: CREATE_EMAIL_USER,
        ref: res.ref
      });
    });
  }
);

export const updateRegisterForm = prop => (
  dispatch => dispatch({
    type: UPDATE_REGISTER_FORM,
    prop
  })
);
