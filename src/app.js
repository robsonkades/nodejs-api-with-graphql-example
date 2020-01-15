import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import * as Sentry from '@sentry/node';

import './database';

import schema from './schema';

import { checkAccess } from './modules/auth/AuthResolver';

// Sentry.init({
//   dsn: 'https://a96ad7fb0a8f48a79db70c57693ac402@sentry.io/1879003',
// });

const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'development',
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await checkAccess(token);
    return { user };
  },
});

export default server;
