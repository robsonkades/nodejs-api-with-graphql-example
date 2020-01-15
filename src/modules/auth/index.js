import { GraphQLString, GraphQLInputObjectType } from 'graphql';

import { AuthType, AuthUser, ConfirmationType } from './AuthType';
import {
  registerUser,
  confirmUserRegistration,
  resendConfirmationCode,
  createSession,
  refreshSession,
} from './AuthResolver';

export const queries = {};

export const mutations = {
  registerUser: {
    type: AuthUser,
    resolve: registerUser,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'RegisterInput',
          fields: {
            username: {
              type: GraphQLString,
            },
            password: {
              type: GraphQLString,
            },
            phone: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
  confirmRegistration: {
    type: ConfirmationType,
    resolve: confirmUserRegistration,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'ConfirmRegistrationInput',
          fields: {
            code: {
              type: GraphQLString,
            },
            username: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
  resendConfirmationCode: {
    type: ConfirmationType,
    resolve: resendConfirmationCode,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'ResendConfirmationCodeInput',
          fields: {
            username: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
  createSession: {
    type: AuthType,
    resolve: createSession,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'SessionInput',
          fields: {
            username: {
              type: GraphQLString,
            },
            password: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
  refreshSession: {
    type: AuthType,
    resolve: refreshSession,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'RefreshSessionInput',
          fields: {
            username: {
              type: GraphQLString,
            },
            token: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
};
