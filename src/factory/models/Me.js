/*import {
  getMe
} from '../../actions/me';
import * as mode from '../modes';*/

const Me = {
  key: 'me',
  label: 'My Profile',
  labelPlural: 'Users',
  mapStateToProps: state => ({ current: state.user.me }),
  actions: {
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

export default Me;