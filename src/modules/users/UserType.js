import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

import PhotoType from '../photos/PhotoType';
import VideoType from '../videos/VideoType';
import CityType from '../regions/city/CityType';

export default new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLUUID),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    geolocation: {
      type: GraphQLString,
    },
    premium: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    phone: {
      type: GraphQLNonNull(GraphQLString),
    },
    avatarUrl: {
      type: GraphQLNonNull(GraphQLString),
    },
    sex: {
      type: GraphQLNonNull(GraphQLString),
    },
    city: {
      type: GraphQLNonNull(CityType),
    },
    verify: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
    photos: {
      type: GraphQLList(PhotoType),
    },
    videos: {
      type: GraphQLList(VideoType),
    },
  },
});
