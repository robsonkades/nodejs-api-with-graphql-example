import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';

export default new GraphQLObjectType({
  name: 'PhotoType',
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
  },
});
