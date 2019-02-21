import { query, mutate } from '../api/graphql';

// Action Types
export const CLEAR_REGISTER_FORM = "CLEAR_REGISTER_FORM";
export const CREATE_EMAIL_USER = "CREATE_EMAIL_USER";
export const GET_ME = "GET_ME";
export const LOGIN = "LOGIN";
export const UPDATE_REGISTER_FORM = "UPDATE_REGISTER_FORM";

// Actions
export const emailLogin = (email, password) => (
  dispatch => {
    return mutate(`
      login(
        accountType: "email",
        email: "${email}",
        password: "${password}"
      ) {
        key
      }
    `)
    .then(res => {
      dispatch({
        type: LOGIN,
        accessToken: res.data.login.key
      });
    })
    .catch(e => (
      dispatch({
        type: LOGIN,
        error: e
      })
    ));
  }
);

export const getMe = () => (
  (dispatch, getState) => {
    const { accessToken } = getState().user;
    return query(`
      me {
        id
        accountType
        name
        email
        baptismalName
        birthday
        feastday
        groups {
          name
          privilege
          status
          role_name
        }
      }
    `, accessToken)
    .then(res => {
      dispatch({
        type: GET_ME,
        me: res.data.me
      });
    })
    .catch(e => {
      dispatch({
        type: GET_ME,
        error: e
      });
    });
  }
)

export const clearRegisterForm = () => (
  dispatch => dispatch({
    type: CLEAR_REGISTER_FORM
  })
);

export const emailRegister = () => (
  (dispatch, getState) => {
    const { name, email, password, baptismalName, birthday, feastday } = getState().signup;
    const baptismalNameField = baptismalName ? `baptismalName: ${baptismalName},` : '';
    const birthdayField = birthday ? `birthday: ${birthday},` : '';
    const feastdayField = feastday ? `feastday: ${feastday},` : '';
    return mutate(`
      createUser(
        name: "${name}",
        email: "${email}",
        password: "${password}",
        ${baptismalNameField}
        ${birthdayField}
        ${feastdayField}
      ) {
        ref_id
      }
    `).then(res => {
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      return dispatch({
        type: CREATE_EMAIL_USER,
        ref: res.data.createUser.ref_id
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
