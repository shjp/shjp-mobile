import { AsyncStorage } from 'react-native';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

const getAccessToken = () =>
  AsyncStorage.getItem(ACCESS_TOKEN_KEY);

const setAccessToken = (accessToken) =>
  AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

const clearAccessToken = () =>
  AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

export default {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
};
