import {
  createGroup,
  editGroup,
  getGroupDetails,
  getGroups
} from '../../actions/group';
import * as mode from '../modes';
import UserEntry from './UserEntry';

const MeInGroup = (group, me) => {
  return me && group && group.members.find(member => member.id === me.id);
};

const canJoinGroup = (group, me) => {
  return me && group && !MeInGroup(group, me)
}

const Group = {
  key: 'group',
  label: 'Group',
  labelPlural: 'Groups',
  mapStateToProps: state => ({
    current: Object.assign({},
      state.group.current,
      {
        membership: MeInGroup(state.group.current, state.user.me),
        joinGroup: !canJoinGroup(state.group.current, state.user.me) ? null : {
          groupId: state.group.current.id,
          userId: state.user.me.id,
          roleId: '04a7c9c6-4e2b-4e76-ae73-712886325da1',
          status: 'pending'
        }
      })
  }),
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
      key: 'membership',
      label: 'Group Membership',
      type: 'membership'
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
    },
    {
      key: 'members',
      label: 'Group Members',
      type: 'list',
      model: UserEntry,
      filter: member => member.status !== 'pending',
      exclude: [mode.FORM_CREATE, mode.FORM_EDIT]
    },
    {
      key: 'joinGroup',
      label: 'Join this Group',
      type: 'join'
    }
  ]
};

export default Group;