import {
  CLEAR_REGISTER_FORM,
  UPDATE_REGISTER_FORM
} from '../actions/types';

const getDefaultState = () => ({
  name: '',
  email: '',
  password: '',
  baptismalName: '',
  birthday: null,
  feastday: null
});

const signup = (state = getDefaultState(), action) => {
  switch (action.type) {
    case CLEAR_REGISTER_FORM:
      return getDefaultState();
    case UPDATE_REGISTER_FORM:
      return { ...state, ...action.prop };
    default:
      return state;
  }
};

export default signup;