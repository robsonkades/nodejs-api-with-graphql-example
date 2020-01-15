import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

export const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: {
    accessToken: {
      type: GraphQLNonNull(GraphQLString),
    },
    refreshToken: {
      type: GraphQLNonNull(GraphQLString),
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    expiration: {
      type: GraphQLNonNull(GraphQLInt),
    },
    sub: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export const AuthUser = new GraphQLObjectType({
  name: 'AuthUser',
  fields: {
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    userConfirmed: {
      type: GraphQLBoolean,
    },
  },
});

export const ConfirmationType = new GraphQLObjectType({
  name: 'ConfirmationType',
  fields: {
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});
