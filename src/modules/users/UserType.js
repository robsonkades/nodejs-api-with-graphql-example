import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import GraphQLUUID from 'graphql-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

import PhotoType from './PhotoType';
import VideoType from './VideoType';
import GeoPointType from './GeoPointType';
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
    geopoint: {
      type: GeoPointType,
    },
    phone: {
      type: GraphQLNonNull(GraphQLString),
    },
    avatarUrl: {
      type: GraphQLString,
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
    photos: {
      type: GraphQLList(PhotoType),
    },
    videos: {
      type: GraphQLList(VideoType),
    },
    vips: {
      type: new GraphQLObjectType({
        name: 'UserVipExpireType',
        fields: {
          expire: {
            type: GraphQLDateTime,
          },
        },
      }),
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLDateTime),
    },
  },
});
