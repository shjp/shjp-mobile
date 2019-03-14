import { query, mutate } from '../api/graphql';

// Action Types
export const GET_GROUP = "GET_GROUP";
export const GET_GROUPS = "GET_GROUPS";
export const CREATE_GROUP = "CREATE_GROUP";

// Actions
export const getGroups = () => (
  dispatch => (
    query(`
      groups {
        id,
        name,
        description,
        image_url
      }`
    )
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        groups: res.data.groups
      })
    )
    .catch(e =>
      dispatch({
        type: GET_GROUPS,
        error: e
      })
    )
  )
);

export const getGroupDetails = (id) => (
  dispatch => (
    query(`
      group(
        id: "${id}"
      ) {
        id,
        name,
        description,
        image_url,
        members {
          id
          name
          status
          role_name
          privilege
        }
      }`
    )
    .then(res =>
      dispatch({
        type: GET_GROUP,
        group: res.data.group
      })
    )
    .catch(e =>
      dispatch({
        type: GET_GROUP,
        error: e
      })
    )
  )
);

export const createGroup = ({ name, description, imageData }) => {
  return dispatch =>
    mutate(`
      createGroup(
        name: "${name}"
        description: "${description}"
      ) {
        ref_id
      }`
    ).then(res => {
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      dispatch({
        type: CREATE_GROUP,
        result: res.data.createGroup.ref_id
      })
    }).catch(e => {
      dispatch({
        type: CREATE_GROUP,
        error: e
      })
    });
};

export const editGroup = ({ name, description, imageData }) =>
  console.error('editGroup not implemented yet');

export const changeGroupMembership = ({ groupId, userId, roleId, status }) => {
  return (dispatch, getState) => {
    const { accessToken } = getState().user;
    return mutate(`
      requestGroupJoin(
        group_id: "${groupId}"
        user_id: "${userId}"
        role_id: "${roleId}"
        status: "${status}"
      ) {
        ref_id
      }
    `, accessToken)
    .then(res => {
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
    });
  };
}