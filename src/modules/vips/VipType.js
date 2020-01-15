import { GraphQLObjectType, GraphQLNonNull, GraphQLFloat } from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

export default new GraphQLObjectType({
  name: 'VipType',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    order: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    price: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    date: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
    expire: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
  },
});
