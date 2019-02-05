import { get, post } from './api';

export const mutate = (qry, authToken) => post('graphql', {
  query: 
    `mutation {
      ${qry}
    }`
}, {
  'Auth-Token': authToken
});

export const query = (qry, authToken) => get('graphql', {
  query:
    `query {
      ${qry}
    }`
}, {
  'Auth-Token': authToken
});