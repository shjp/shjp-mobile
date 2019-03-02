import { query, mutate } from '../api/graphql';

// Action Types
export const GET_EVENT = "GET_EVENT";
export const GET_EVENTS = "GET_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";

// Actions
export const getEvents = () =>
  dispatch =>
    query(`
      events {
        id,
        name,
        description,
        start,
        end,
        deadline,
        allow_maybe,
        location,
        location_description
      }`
    ).then(res =>
      dispatch({
        type: GET_EVENTS,
        events: res.data.events
      })
    ).catch(e =>
      dispatch({
        type: GET_EVENTS,
        error: e
      }));

export const getEventDetails = (id) => {
  return dispatch =>
    query(`
      event(
        id: "${id}"
      ) {
        id,
        name,
        description,
        start,
        end,
        deadline,
        allow_maybe,
        location,
        location_description,
        author {
          name
        }
      }`
    ).then(res => {
      console.log('res:', JSON.stringify(res));
      dispatch({
        type: GET_EVENT,
        event: res.data.event
      });
    }).catch(e => {
      dispatch({
        type: GET_EVENT,
        error: e
      });
    });
};

export const createEvent = ({ name, description }) => {
  return dispatch =>
    mutate(`
      createEvent(
        name: "${name}"
        description: "${description}"
      ) {
        ref_id
      }
    `).then(res => {
      console.log('createEvent:res = ', JSON.stringify(res, null, 2));
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      dispatch({
        type: CREATE_EVENT,
        result: res.data.createEvent.ref_id
      })
    }).catch(e => {
      dispatch({
        type: CREATE_EVENT,
        error: e
      });
    });
}

export const editEvent = () =>
  console.error('editEvent not implemented yet');