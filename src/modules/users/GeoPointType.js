import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'GeoPointType',
  fields: {
    lat: {
      type: GraphQLString,
    },
    log: {
      type: GraphQLString,
    },
  },
});
