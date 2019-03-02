import {
  createEvent,
  editEvent,
  getEventDetails,
  getEvents
} from '../../actions/event';
import * as mode from '../modes';
;
const Event = {
  key: 'event',
  label: 'Event',
  labelPlural: 'Events',
  mapStateToProps: state => ({ current: state.event.current }),
  actions: {
    create: createEvent,
    edit: editEvent,
    get: getEventDetails,
    getAll: getEvents
  },
  fields: [
    {
      key: 'name',
      label: 'Event Title',
      type: 'text',
      errorKey: 'nameError'
    },
    {
      key: 'author',
      label: 'Event Author',
      type: 'author'
    },
    {
      key: 'start',
      label: 'Start',
      type: 'date',
    },
    {
      key: 'end',
      label: 'End',
      type: 'date'
    },
    {
      key: 'deadline',
      label: 'Deadline',
      type: 'date'
    },
    {
      key: 'description',
      label: 'Event Description',
      type: 'longtext',
      errorKey: 'contentError'
    },
    {
      key: 'location',
      label: 'Event Location',
      type: 'location',
      errorKey: 'locationError'
    },
    {
      key: 'location_description',
      label: 'Event Location Description',
      type: 'longtext',
      errorKey: 'locationDescriptionError'
    }
  ]
};

export default Event;