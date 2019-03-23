import { query, mutate } from '../api/graphql';
import {
  GET_USER,
  GET_USERS,
} from './types';
import { withSplash } from './middlewares';

export const getUsers = () => {
  return withSplash(dispatch => {
    return query(`
      users {
        id
        name
        email
        baptismal_name
        birthday
        feastday
      }`
    ).then(res =>
      dispatch({
        type: GET_USERS,
        groups: res.data.users
      })
    ).catch(e =>
      dispatch({
        type: GET_USERS,
        error: e
      })
    );
  });
};

export const getUserDetails = (id) => {
  return withSplash(dispatch => {
    return query(`
      user(
        id: "${id}"
      ) {
        id
        name
        email
        baptismal_name
        birthday
        feastday
      }`
    ).then(res =>
      dispatch({
        type: GET_USER,
        group: res.data.user
      })
    ).catch(e =>
      dispatch({
        type: GET_USER,
        error: e
      })
    );
  });
};

export const createUser = ({}) =>
  console.error('createUser not implemented yet');

export const editUser = ({}) =>
  console.error('editUser not implemented yet');