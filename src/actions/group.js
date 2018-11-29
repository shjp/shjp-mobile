import { query, mutate } from '../api/graphql';

// Action Types
export const GET_GROUP = "GET_GROUP";
export const GET_GROUPS = "GET_GROUPS";
export const CREATE_GROUP = "CREATE_GROUP";

// Actions
export const getGroups = () =>
  dispatch =>
    query(`
      groups {
        id,
        name,
        description,
        image_url
      }`
    ).then(res =>
      dispatch({
        type: GET_GROUPS,
        groups: res.data.groups
      })
    ).catch(e =>
      dispatch({
        type: GET_GROUPS,
        error: e
      }));

export const getGroupDetails = (id) =>
  dispatch =>
    query(`
      group(
        id: "${id}"
      ) {
        name,
        description,
        image_url,
        members {
          name
        }
      }`
    ).then(res =>
      dispatch({
        type: GET_GROUP,
        group: res.data.group
      })
    ).catch(e =>
      dispatch({
        type: GET_GROUP,
        error: e
      }));

export const createGroup = ({ name, description, imageData }) => {
  console.log('name:', name, 'desc:', description);
  return dispatch =>
    mutate(`
      createGroup(
        name: "${name}"
        description: "${description}"
      ) {
        ref_id
      }`
    ).then(res => {
      console.log('createGroup:res = ', JSON.stringify(res, null, 2));
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