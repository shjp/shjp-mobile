import {
  createAnnouncement,
  editAnnouncement,
  getAnnouncementDetails,
  getAnnouncements
} from '../../actions/announcement';
;
const Announcement = {
  key: 'announcement',
  label: 'Announcement',
  labelPlural: 'Announcements',
  mapStateToProps: state => ({ current: state.announcement.current }),
  actions: {
    create: createAnnouncement,
    edit: editAnnouncement,
    get: getAnnouncementDetails,
    getAll: getAnnouncements
  },
  fields: [
    {
      key: 'name',
      label: 'Announcement Title',
      type: 'text',
      errorKey: 'nameError'
    },
    {
      key: 'content',
      label: 'Announcement Content',
      type: 'longtext',
      errorKey: 'contentError'
    }
  ]
};

export default Announcement;