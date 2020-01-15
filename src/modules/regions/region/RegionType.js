import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

export default new GraphQLObjectType({
  name: 'RegionType',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    uf: {
      type: GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  },
});
