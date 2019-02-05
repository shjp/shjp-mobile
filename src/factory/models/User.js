import {
  createUser,
  editUser,
  getUserDetails,
  getUsers
} from '../../actions/user';
import * as mode from '../modes';

const User = {
  key: 'user',
  label: 'User',
  labelPlural: 'Users',
  mapStateToProps: state => ({ current: state.user.current }),
  actions: {
    create: createUser,
    edit: editUser,
    get: getUserDetails,
    getAll: getUsers
  },
  fields: [
    {
      key: 'name',
      label: 'User Name',
      type: 'text',
    },
    {
      key: 'email',
      label: 'User E-mail',
      type: 'longtext',
    },
    {
      key: 'baptismalName',
      label: 'Baptismal Name',
      type: 'longtext'
    },
    {
      key: 'birthday',
      label: 'Birthday',
      type: 'longtext'
    },
    {
      key: 'feastday',
      label: 'Feast Day',
      type: 'longtext'
    }
  ]
};

export default User;