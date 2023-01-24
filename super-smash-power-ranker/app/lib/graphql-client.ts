import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(process.env.START_GG_API_ENDPOINT ?? '', {
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.START_GG_API_KEY ?? ''}`,
  },
});
