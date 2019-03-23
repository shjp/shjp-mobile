import { query, mutate } from '../api/graphql';
import {
  GET_EVENT,
  GET_EVENTS,
  CREATE_EVENT,
  UPDATE_RSVP,
} from './types';
import { withSplash } from './middlewares';

export const getEvents = () => {
  return withSplash(dispatch => {
    return query(`
      events {
        id,
        name,
        description,
        start,
        end,
        deadline,
        allow_maybe,
        location,
        location_description,
        created
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
      })
    );
  });
};

export const getEventDetails = (id) => {
  return withSplash(dispatch => {
    return query(`
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
        },
        rsvps {
          user {
            id
            name
          }
          rsvp
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
  });
};

export const createEvent = ({ name, description }) => {
  return withSplash(dispatch => {
    return mutate(`
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
  });
};

export const editEvent = () => (
  console.error('editEvent not implemented yet')
);

export const updateRSVP = ({ userId, eventId, rsvp }) => {
  return withSplash((dispatch, getState) => {
    const { accessToken } = getState().user;
    return mutate(`
      updateRsvp(
        user_id: "${userId}"
        event_id: "${eventId}"
        rsvp: "${rsvp}"
      ) {
        ref_id
      }
    `, accessToken)
    .then(res => {
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      dispatch({
        type: UPDATE_RSVP,
        result: res.data.updateRsvp.ref_id
      });
    })
    .catch(e => {
      dispatch({
        type: UPDATE_RSVP,
        error: e
      });
    });
  });
}