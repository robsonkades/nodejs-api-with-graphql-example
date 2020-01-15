import { GraphQLString, GraphQLList, GraphQLInputObjectType } from 'graphql';

import { ForbiddenError } from 'apollo-server';
import UserType from './UserType';
import { saveUser, getUsersAsyncCache } from './UserResolver';

import {
  InputFilterString,
  InputFilterBoolean,
  InputPagination,
  InputFilterOrder,
  InputFilterDateTime,
  InputFilterSex,
  CityTypeInput,
  RegionTypeInput,
} from '../filters';

export const queries = {
  users: {
    type: GraphQLList(UserType),
    resolve: (_, input, context) => {
      return getUsersAsyncCache(input, context);
    },
    args: {
      pagination: {
        type: InputPagination,
      },
      order: {
        type: new GraphQLInputObjectType({
          name: 'TableUserOrderFilterInput',
          fields: {
            name: {
              type: InputFilterOrder,
            },
            description: {
              type: InputFilterOrder,
            },
            geolocation: {
              type: InputFilterOrder,
            },
            premium: {
              type: InputFilterOrder,
            },
            sex: {
              type: InputFilterOrder,
            },
            phone: {
              type: InputFilterOrder,
            },
            createdAt: {
              type: InputFilterOrder,
            },
            verify: {
              type: InputFilterOrder,
            },
            updatedAt: {
              type: InputFilterOrder,
            },
          },
        }),
      },
      filters: {
        type: new GraphQLInputObjectType({
          name: 'TableUserFiltersInput',
          fields: {
            userFilter: {
              type: new GraphQLInputObjectType({
                name: 'TableUserFilterInput',
                fields: {
                  name: {
                    type: InputFilterString,
                  },
                  geolocation: {
                    type: InputFilterString,
                  },
                  premium: {
                    type: InputFilterBoolean,
                  },
                  sex: {
                    type: InputFilterSex,
                  },
                  phone: {
                    type: InputFilterString,
                  },
                  verify: {
                    type: InputFilterBoolean,
                  },
                  createdAt: {
                    type: InputFilterDateTime,
                  },
                  updatedAt: {
                    type: InputFilterDateTime,
                  },
                },
              }),
            },
            regionFilter: {
              type: RegionTypeInput,
            },
            cityFilter: {
              type: CityTypeInput,
            },
          },
        }),
      },
    },
  },
};

export const mutations = {
  saveUser: {
    type: UserType,
    resolve: (_, input, context) => {
      if (context.user === null) {
        throw new ForbiddenError("You don't have permission to access.");
      }
      return saveUser(context, input);
    },
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'UserInput',
          fields: {
            name: {
              type: GraphQLString,
            },
            description: {
              type: GraphQLString,
            },
            city: {
              type: CityTypeInput,
            },
            sex: {
              type: InputFilterSex,
            },
            geolocation: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
  },
};
