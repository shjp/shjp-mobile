import { query, mutate } from '../api/graphql';
import {
  CLEAR_REGISTER_FORM,
  CREATE_EMAIL_USER,
  GET_ME,
  LOGIN,
  UPDATE_REGISTER_FORM,
} from './types';
import { withSplash } from './middlewares';

export const emailLogin = (email, password) => {
  return withSplash(dispatch => {
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
  });
};

export const getMe = () => {
  return withSplash((dispatch, getState) => {
    const { accessToken } = getState().user;
    return query(`
      me {
        id
        accountType
        name
        email
        baptismal_name
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
  });
};

export const clearRegisterForm = () => (
  dispatch => dispatch({
    type: CLEAR_REGISTER_FORM
  })
);

export const emailRegister = () => {
  return withSplash((dispatch, getState) => {
    const { name, email, password, baptismalName, birthday, feastday } = getState().signup;
    const baptismalNameField = baptismalName ? `baptismal_name: "${baptismalName}",` : '';
    const birthdayField = birthday ? `birthday: "${birthday.toISOString()}",` : '';
    const feastdayField = feastday ? `feastday: "${feastday.toISOString()}",` : '';
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
  });
};

export const updateRegisterForm = prop => (
  dispatch => dispatch({
    type: UPDATE_REGISTER_FORM,
    prop
  })
);
