import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';
import RegionType from '../region/RegionType';

export default new GraphQLObjectType({
  name: 'CityType',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    region: {
      type: GraphQLNonNull(RegionType),
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  },
});
