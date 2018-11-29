import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

const configureStore = (initialState) => createStoreMiddleware(rootReducer, initialState)

export default configureStore;