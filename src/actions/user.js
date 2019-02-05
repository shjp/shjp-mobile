import { query, mutate } from '../api/graphql';

// Action Types
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";

// Actions
export const getUsers = () =>
  dispatch =>
    query(`
      users {
        id
        name
        email
        baptismalName
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
      }));

export const getUserDetails = (id) =>
  dispatch =>
    query(`
      user(
        id: "${id}"
      ) {
        name
        email
        baptismalName
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
      }));

export const createUser = ({}) =>
  console.error('createUser not implemented yet');

export const editUser = ({}) =>
  console.error('editUser not implemented yet');