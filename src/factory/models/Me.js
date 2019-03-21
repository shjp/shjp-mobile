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
      key: 'baptismal_name',
      label: 'Baptismal Name',
      type: 'longtext'
    },
    {
      key: 'birthday',
      label: 'Birthday',
      type: 'date'
    },
    {
      key: 'feastday',
      label: 'Feast Day',
      type: 'date'
    }
  ]
};

export default Me;