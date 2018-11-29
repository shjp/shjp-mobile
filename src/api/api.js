import { isEmpty, isNil, map, omitBy } from 'lodash';
import { LOCAL_URL, DEV_URL } from 'react-native-dotenv';

const URL = DEV_URL;

export const post = async (path, payload) => {
  try {
    const resp = await fetch(`${URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(payload)
    });
    console.log(JSON.stringify(resp, null, 2));
    return resp.json();
  } catch (e) {
    console.log(JSON.stringify(e));
    return e;
  }
};

export const get = async (path, params) => {
  const url = formatQueryParams(`${URL}/${path}`, params);
  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    });
    console.log(`get: ${JSON.stringify(resp, null, 2)}`);
    return resp.json();
  } catch (e) {
    console.log(`Get failed: ${JSON.stringify(e, null, 2)}`);
    return e;
  }
};

const formatQueryParams = (url, queryParams) => {
  // Filter out nil values
  const applicableParams = omitBy(queryParams, isNil);

  // Stringify the query params
  let queryString = map(applicableParams, (val, key) => `${key}=${val.replace(/\s/g, '')}`)
    .join('&');

  return isEmpty(queryString) ? url : `${url}?${queryString}`;
};