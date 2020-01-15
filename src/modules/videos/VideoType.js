import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

export default new GraphQLObjectType({
  name: 'VideoType',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  },
});
