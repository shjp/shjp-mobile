import { query, mutate } from '../api/graphql';
import {
  GET_ANNOUNCEMENT,
  GET_ANNOUNCEMENTS,
  CREATE_ANNOUNCEMENT,
} from './types';
import { withSplash } from './middlewares';

export const getAnnouncements = () => {
  return withSplash(dispatch => {
    return query(`
      announcements {
        id,
        name,
        content
      }`
    ).then(res =>
      dispatch({
        type: GET_ANNOUNCEMENTS,
        announcements: res.data.announcements
      })
    ).catch(e =>
      dispatch({
        type: GET_ANNOUNCEMENTS,
        error: e
      })
    );
  });
};

export const getAnnouncementDetails = (id) => {
  return withSplash(dispatch => {
    return query(`
      announcement(
        id: "${id}"
      ) {
        id,
        name,
        content,
        creator {
          name
        }
      }`
    ).then(res =>
      dispatch({
        type: GET_ANNOUNCEMENT,
        announcement: res.data.announcement
      })
    ).catch(e =>
      dispatch({
        type: GET_ANNOUNCEMENT,
        error: e
      })
    );
  });
};

export const createAnnouncement = ({ name, content }) => {
  return withSplash(dispatch => {
    return mutate(`
      createAnnouncement(
        name: "${name}"
        content: "${content}"
      ) {
        ref_id
      }
    `).then(res => {
      console.log('createAnnouncement:res = ', JSON.stringify(res, null, 2));
      if (res.errors && res.errors.length) {
        return Promise.reject(res.errors);
      }
      dispatch({
        type: CREATE_ANNOUNCEMENT,
        result: res.data.createAnnouncement.ref_id
      })
    }).catch(e => {
      dispatch({
        type: CREATE_ANNOUNCEMENT,
        error: e
      })
    });
  });
};

export const editAnnouncement = () =>
  console.error('editAnnouncement not implemented yet');