import { query, mutate } from '../api/graphql';

// Action Types
export const GET_ANNOUNCEMENT = "GET_ANNOUNCEMENT";
export const GET_ANNOUNCEMENTS = "GET_ANNOUNCEMENTS";
export const CREATE_ANNOUNCEMENT = "CREATE_ANNOUNCEMENT";

// Actions
export const getAnnouncements = () =>
  dispatch =>
    query(`
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
      }));

export const getAnnouncementDetails = (id) =>
  dispatch =>
    query(`
      announcement(
        id: "${id}"
      ) {
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
      }));

export const createAnnouncement = ({ name, content }) => {
  return dispatch =>
    mutate(`
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
};

export const editAnnouncement = () =>
  console.error('editAnnouncement not implemented yet');