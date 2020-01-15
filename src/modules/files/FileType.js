import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'FileType',
  fields: {
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
    objectId: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});
