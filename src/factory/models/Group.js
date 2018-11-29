import {
  createGroup,
  editGroup,
  getGroupDetails,
  getGroups
} from '../../actions/group';
import * as mode from '../modes';
;
const Group = {
  key: 'group',
  label: 'Group',
  labelPlural: 'Groups',
  mapStateToProps: state => ({ current: state.group.current }),
  actions: {
    create: createGroup,
    edit: editGroup,
    get: getGroupDetails,
    getAll: getGroups
  },
  fields: [
    {
      key: 'name',
      label: 'Group Name',
      type: 'text',
      errorKey: 'nameError'
    },
    {
      key: 'description',
      label: 'Group Description',
      type: 'longtext',
      errorKey: 'descriptionError'
    },
    {
      key: 'image_url',
      label: 'Group Image',
      type: 'image'
    }/*,
    {
      key: 'members',
      label: 'Group Members',
      type: 'list',
      exclude: [mode.FORM_CREATE, mode.FORM_EDIT]
    }*/
  ]
};

export default Group;