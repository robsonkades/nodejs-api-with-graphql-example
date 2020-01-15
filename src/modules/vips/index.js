import { GraphQLList, GraphQLInputObjectType } from 'graphql';

import VipType from './VipType';

import { getUsersVipAsyncCache } from '../users/UserResolver';

import { CityTypeInput, RegionTypeInput } from '../filters';

export const queries = {
  vips: {
    type: GraphQLList(VipType),
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

export const mutations = {};
