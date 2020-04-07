import { GraphQLString, GraphQLList, GraphQLInputObjectType } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';

import { ForbiddenError } from 'apollo-server';
import UserType from './UserType';
import {
  saveUser,
  getUsersAsyncCache,
  getUsersVipAsyncCache,
} from './UserResolver';

import {
  InputFilterString,
  InputFilterBoolean,
  InputPagination,
  InputFilterOrder,
  InputFilterDateTime,
  CityTypeInput,
  RegionTypeInput,
  GeoPointTypeInput,
  InputSex,
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
                  sex: {
                    type: InputSex,
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
  vips: {
    type: GraphQLList(UserType),
    resolve: (_, input, context) => {
      return getUsersVipAsyncCache(input, context);
    },
    args: {
      filters: {
        type: new GraphQLInputObjectType({
          name: 'TableUserVipFiltersInput',
          fields: {
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
            city_id: {
              type: GraphQLUUID,
            },
            sex: {
              type: InputSex,
            },
            geopoint: {
              type: GeoPointTypeInput,
            },
          },
        }),
      },
    },
  },
};
