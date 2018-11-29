import { get, post } from './api';

export const mutate = qry => post('graphql', {
  query: 
    `mutation {
      ${qry}
    }`
});

export const query = qry => get('graphql', {
  query:
    `query {
      ${qry}
    }`
});